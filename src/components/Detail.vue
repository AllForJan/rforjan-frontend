<template>
  <div class="Detail p-3">
    <div v-if="kulturnyDiel">
      <el-row>
        <el-col :span="24">
          <h1 class="h5 mb-3">
            Kulturny diel
            <strong>{{ kulturnyDiel.lokalita }}-{{ kulturnyDiel.diel }}</strong>
          </h1>
          <el-table :data="tableData">
            <el-table-column
              type="expand"
            >
              <template slot-scope="props">
                <el-table :data="props.row.yearData">
                  <el-table-column label="Name" prop="ziadatel" />
                  <el-table-column label="ICO" prop="ico" />
                  <el-table-column label="Počet žiadosti" prop="pocet_ziadosti" />
                  <el-table-column label="Celková výmera" prop="celkova_vymera" />
                  <el-table-column label="Prijimatel?" prop="isPrijimatel" />
                </el-table>
              </template>
            </el-table-column>
            <el-table-column
              label="Rok"
              prop="year"
            />
          </el-table>
        </el-col>
      </el-row>
    </div>
    <div v-else>
      Vyberte si kulturny diel kliknutím na mapu
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';

  export default {
    computed: mapGetters({
      kulturnyDiel: 'kulturnyDiel',
      data: 'ziadost',
      tableData: 'detailTableData',
    }),
  }
</script>


<style lang="scss" scoped>
  .Detail {
    flex: 1;
    height: calc(100vh - 56px);
    overflow-y: auto;
  }
</style>

