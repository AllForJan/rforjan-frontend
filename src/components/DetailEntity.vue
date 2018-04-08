<template>
    <div class="DetailEntity">
      <div class="h5">Všetky podané žiadosti</div>

      <el-table class="mb-3" :data="ziadosti">
        <el-table-column type="expand">
          <template slot-scope="scope">
            <el-table :data="scope.row.ziadosti">
              <el-table-column label="Ziadatel" prop="ziadatel" />
              <el-table-column label="ICO" prop="ico" />
              <el-table-column label="Lokalita" prop="lokalita" />
              <el-table-column label="Diel" prop="diel" />
              <el-table-column label="Kultura" prop="kultura" />
              <el-table-column label="Pocet ziadosti" prop="pocet_ziadosti" />
              <el-table-column label="Vymera ziadosti" prop="vymera_ziadosti" />
            </el-table>
          </template>
        </el-table-column>

        <el-table-column label="Rok" prop="year"/>
      </el-table>

      <div class="h5">
        Potecionálne dotácie pre entitu
      </div>

      <el-table :data="prijimatel">
        <el-table-column type="expand">
          <template slot-scope="scope">
            <el-table :data="scope.row.prijimatel">
              <el-table-column label="Ziadatel" prop="ziadatel" />
              <el-table-column label="Ico" prop="ico" />
              <el-table-column label="Psc" prop="psc" />
              <el-table-column label="Obec" prop="obec" />
              <el-table-column label="Opatrenie" prop="opatrenie" />
              <el-table-column label="Pocet_prijmov" prop="pocet_prijmov" />
              <el-table-column label="Suma_prijmov" prop="suma_prijmov" />
            </el-table>
          </template>
        </el-table-column>

        <el-table-column label="Rok" prop="year"/>
      </el-table>
    </div>
</template>

<script>
	export default {
		name: '',

		components: {
    },

		props: {
      entita: true
    },

		data() {
			return {}
		},

		computed: {
      ziadosti() {
        return Object.entries(this.entita.ziadosti).map(([year, ziadosti]) => {
          return {year, ziadosti}
        })
      },

      prijimatel() {
        return Object.entries(this.entita.prijimatel).map(([year, prijimatel]) => {
          return {year, prijimatel}
        })
      }
    },

		methods: {},
	}
</script>

<style lang="scss" scoped>
</style>
