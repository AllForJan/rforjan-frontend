<template>
  <div class="Detail p-3">
    <div v-if="activeView == 'entita'" key="activeView">
      <div class="d-flex align-items-center mb-3">
        <h1 class="h5 mb-0">
          Detail entity
        </h1>

        <a href @click.prevent class="d-inline-flex align-items-center ml-auto" @click="closeEntityDetail()">
          <!--<Icon icon="" size="xl" />-->
          Naspäť
        </a>
      </div>
      <DetailEntity :entita="entita" v-if="entita" key="entita" />
      <Spinner v-else key="entita">Nahrávam…</Spinner>
    </div>

    <div v-else-if="activeView === 'kulturnyDiel'" key="activeView">
      <div v-if="kulturnyDiel">
        <el-row>
          <el-col :span="24">
            <h1 class="h5 mb-3">
              Kulturny diel
              <strong>{{ kulturnyDiel.lokalita }}-{{ kulturnyDiel.diel }}</strong>
            </h1>

            <el-tabs v-model="activeTab">
              <el-tab-pane label="Žiadosti o dotácie" name="ziadatelia">

                <el-table :data="tableData" empty-text="Žiadne záznamy" cell-class-name="no-wrap" header-cell-class-name="no-wrap">
                  <el-table-column type="expand">
                    <template slot-scope="scope">
                      <el-table :data="scope.row.ziadosti">
                        <el-table-column class-name="no-break" label="Name" prop="ziadatel">
                          <template slot-scope="scope">
                            <a href @click.prevent="showEntityDetails(scope.row.entityId)">
                              {{ scope.row.ziadatel }}
                            </a>
                          </template>
                        </el-table-column>
                        <el-table-column class-name="no-break" label="IČO" prop="ico" align="center" />
                        <el-table-column class-name="no-break" label="Počet žiadosti" prop="pocet_ziadosti" align="center" />
                        <el-table-column class-name="no-break" label="Celková výmera" prop="celkova_vymera" align="center" />
                        <el-table-column class-name="no-break" label="Dostáva dotáciu" align="center">
                          <template slot-scope="scope">
                            {{ scope.row.isPrijimatel ? 'áno' : 'nie' }}
                          </template>
                        </el-table-column>
                      </el-table>
                    </template>
                  </el-table-column>

                  <el-table-column label="Rok" prop="year"/>

                  <el-table-column align="center" label="Počet žiadostí">
                    <template slot-scope="scope">
                      {{ scope.row.ziadosti.length || 0 }}
                    </template>
                  </el-table-column>
                </el-table>
              </el-tab-pane>

              <el-tab-pane label="Parcely " name="parcely">
                <el-table :data="parcely">
                  <el-table-column label="Číslo parcely" prop="parcel_number" />
                  <el-table-column label="Majitelia">
                    <template slot-scope="scope">
                      <Owner :owners="scope.row.owners" />
                    </template>
                  </el-table-column>
                </el-table>
              </el-tab-pane>
            </el-tabs>
          </el-col>
        </el-row>
      </div>

      <div v-else>
        <div class="text-center py-5">
          Vyberte si kulturny diel kliknutím na mapu
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import Owner from './Owner';

  import Service from '../services/Service'
  import bus from '../bus'

  import DetailEntity from './DetailEntity'
  import Icon from './Icon'
  import Spinner from './Spinner'

  export default {
    components: {
      DetailEntity,
      Icon,
      Spinner,
      Owner
    },

    data() {
      return {
        activeView: 'kulturnyDiel',
        activeTab: 'ziadatelia',
        selectedParcel: null,
        entita: null
      }
    },

    computed: {
      ...mapGetters([
        'kulturnyDiel',
        'ziadosti'
      ]),

      tableData() {
        const tableData = Object.entries(this.ziadosti).map(([year, ziadatel]) => {
          const ziadosti = []

          Object.entries(ziadatel).forEach(([entityId, entity]) => {
            entity.ziadosti.forEach((ziadost) => {
              const isPrijimatel = entity.prijimatelia.length > 0

              ziadosti.push({...ziadost, entityId, isPrijimatel})
            })
          })

          return {year, ziadosti}
        })

        tableData.sort((a, b) => b.year.localeCompare(a.year))

        return tableData
      }
    },

    methods: {
      async showEntityDetails(entityId) {
        this.activeView = 'entita'

        try {
          this.entita = await Service.loadEntity(entityId)
        } catch (e) {
          this.entita = null
        }
      },

      closeEntityDetail() {
        this.activeView = 'kulturnyDiel'
      }
    },

    mounted() {
      bus.$on('selectParcel', (parcel) => {
        console.log(parcel)
      })
    },

    watch: {
      kulturnyDiel() {
        this.activeTab = 'ziadatelia'
        this.activeView = 'kulturnyDiel'
      }
    }
  }
</script>


<style lang="scss" scoped>
  .Detail {
    flex: 1;
    height: calc(100vh - 56px);
    overflow-y: auto;
  }
</style>

