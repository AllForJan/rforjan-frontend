<template>
  <div class="Detail p-3">
    <div v-if="activeView == 'entita'">
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

    <div v-else-if="activeView === 'kulturnyDiel'">
      <div v-if="kulturnyDiel">
        <el-row>
          <el-col :span="24">
            <h1 class="h5 mb-3">
              Kulturny diel
              <strong>{{ kulturnyDiel.lokalita }}-{{ kulturnyDiel.diel }}</strong>
            </h1>

            <el-tabs v-model="activeTab" @tab-click="handleSelectTab">
              <el-tab-pane label="Žiadatelia" name="ziadatelia">
                <el-table :data="tableData">
                  <el-table-column type="expand">
                    <template slot-scope="props">
                      <el-table :data="props.row.yearData">
                        <el-table-column cell-class-name="no-wrap" label="Name" prop="ziadatel">
                          <template slot-scope="scope">
                            <a href @click.prevent="showEntityDetails(scope.row.entityId)">
                              {{ scope.row.ziadatel }}
                            </a>
                          </template>
                        </el-table-column>

                        <el-table-column cell-class-name="no-wrap" label="ICO" prop="ico" />

                        <el-table-column cell-class-name="no-wrap" label="Počet žiadosti" prop="pocet_ziadosti" />

                        <el-table-column cell-class-name="no-wrap" label="Celková výmera" prop="celkova_vymera" />

                        <el-table-column cell-class-name="no-wrap" label="Prijimatel?" prop="isPrijimatel" />
                      </el-table>
                    </template>
                  </el-table-column>
                  <el-table-column label="Rok" prop="year"/>
                </el-table>
              </el-tab-pane>

              <el-tab-pane label="Parcely" name="parcely">

              </el-tab-pane>
            </el-tabs>
          </el-col>
        </el-row>
      </div>
      <div v-else>
        Vyberte si kulturny diel kliknutím na mapu
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';

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
    },

    data() {
      return {
        activeView: 'kulturnyDiel',
        activeTab: 'ziadatelia',
        selectedParcel: null,
        entita: null
      }
    },

    computed: mapGetters({
      kulturnyDiel: 'kulturnyDiel',
      data: 'ziadost',
      tableData: 'detailTableData',
    }),

    methods: {
      handleSelectTab(e) {
        console.log(e)
      },

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

