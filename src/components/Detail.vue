<template>
  <div class="Detail p-3">
    <el-row>
      <!-- <el-col :span="24">
        <h1>Detail</h1>
      <el-table>
        <el-table-column
          type="expand"
          label="Year"
          prop="year"
        >
        </el-table-column>
        <el-table-column
          label="Date"
          prop="date">
        </el-table-column>
        <el-table-column
          label="Name"
          prop="name">
        </el-table-column>
      </el-table> -->

        <!-- <el-collapse v-model="expandedYears">
          <el-collapse-item v-for="(value, key) in data" :title="key" :key="key" :name="key">
            <el-table :data="value">
              <el-table-column
                prop="ico"
                label="ICO"
              />
              <el-table-column
                prop="diel"
                label="Diel"
              />
            </el-table>
          </el-collapse-item>
        </el-collapse> -->

        <!-- <ul>
          <li v-for="(value, key) in data" :key="key">
            {{key}}
            <el-table :data="value">
              <el-table-column
                prop="ico"
                label="ICO"
              />
            </el-table>
          </li>
        </ul> -->
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';

  export default {
    computed: mapGetters({
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

