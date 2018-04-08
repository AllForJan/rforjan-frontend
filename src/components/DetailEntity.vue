<template>
    <div class="DetailEntity">

      <div class="h5">Všetky podané žiadosti</div>

      <el-table class="mb-3" :data="ziadosti">
        <el-table-column type="expand">
          <template slot-scope="scope">
            <el-table :data="scope.row.ziadosti" header-cell-class-name="no-wrap">
              <el-table-column className="no-break" label="Lokalita" prop="lokalita" />
              <el-table-column className="no-break" label="Diel" prop="diel" />
              <el-table-column className="no-break" label="Kultura" prop="kultura" />
              <el-table-column className="no-break" label="Pocet ziadosti" prop="pocet_ziadosti" />
              <el-table-column className="no-break" label="Vymera ziadosti" prop="vymera_ziadosti" />
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
            <el-table :data="scope.row.prijimatel" header-cell-class-name="no-wrap">
              <el-table-column className="no-break" label="Psc" prop="psc" />
              <el-table-column className="no-break" label="Obec" prop="obec" />
              <el-table-column className="no-break" label="Opatrenie" prop="opatrenie" />
              <el-table-column className="no-break" label="Pocet_prijmov" prop="pocet_prijmov" />
              <el-table-column className="no-break" label="Suma_prijmov" prop="suma_prijmov" />
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
