<template>
  <div class="Detail p-3">
    <el-row>
      <el-col :span="24">
        <h1 class="h5 mb-3">
          Kulturny diel
          <strong>{{ kulturnyDiel.lokalita }}-{{ kulturnyDiel.diel }}</strong>
        </h1>

        <el-table :data="table">
          <el-table-column
            type="expand"
          >
            <template slot-scope="props">
              <el-table :data="props.row.yearData">
                <el-table-column label="Name" prop="name" />
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
</template>

<script>
  import { mapGetters } from 'vuex';

  export default {
    data: () => ({
      table: [
        {
          year: 2017,
          yearData: [
            { name: 'Nejake meno', ico: '12345', pocet_ziadosti: 2, celkova_vymera: 3.3, isPrijimatel: 'Áno' },
          ]
        },
        {
          year: 2018,
          yearData: [
            {name: 'name2', ico: '22345', pocet_ziadosti: 2, celkova_vymera: 3.3, isPrijimatel: '-' },
          ]
        },
      ],
    }),
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

