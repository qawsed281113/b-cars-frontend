<template>
  <div>
    <div class="mt-4 mb-4">
      <b-form @submit="onSubmit" @reset="onReset">
        <b-row>
          <b-col md="7" lg="9">
            <!--            Title-->
            <b-form-group
                id="input-group-1"
                label="Mодель"
                label-for="input-1"
            >
              <b-form-input
                  id="input-1"
                  v-model="form.title"
                  type="text"
                  placeholder="Модель"
                  required
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col md="5" lg="3">
            <!--            Year-->
            <b-form-group
                label="Рік"
                label-for="car-year"
            >
              <b-form-input
                  id="car-year"
                  v-model="form.year"
                  type="number"
                  step="1"
                  min="1950"
                  max="3000"
                  placeholder="Рік випуску"
              ></b-form-input>
            </b-form-group>
          </b-col>
        </b-row>

        <b-row>
          <b-col md="4">
            <b-form-group
                id="input-group-2"
                label="Вид палива"
                label-for="input-2"
            >
              <b-form-select
                  id="input-2"
                  v-model="form.fuel"
                  :options="formOptions.fuelTypes"
                  class="form-select"
              >

              </b-form-select>
            </b-form-group>
          </b-col>
          <b-col md="5">
            <b-form-group
                id="input-group-3"
                label="Коробка передач"
                label-for="input-3"
            >
              <b-form-select
                  id="input-3"
                  v-model="form.transmission"
                  :options="formOptions.transmissionTypes"
                  class="form-select"
              >
              </b-form-select>
            </b-form-group>
          </b-col>
          <b-col md="3">
            <b-form-group
                label="Максимальна ціна"
                label-for="car-price-usd"
            >
              <b-form-input
                  id="car-price-usd"
                  v-model="form.maxPrice"
                  type="number"
                  step="1"
                  min="0"
                  placeholder="Ціна"
              ></b-form-input>
            </b-form-group>
          </b-col>
        </b-row>


        <div class="mt-4 mb-4">
          <b-button class="m-1" type="submit" variant="primary">Пошук</b-button>
          <b-button class="m-1" type="reset" variant="danger">Скинути</b-button>
        </div>

      </b-form>
<!--      <b-card class="mt-3" header="Form Data Result">-->
<!--        <pre class="m-0">{{ form }}</pre>-->
<!--      </b-card>-->
    </div>
  </div>
</template>

<script>
export default {
  name: "SearchForm",
  data() {
    return {
      form: this.getClearForm(),
      formOptions: {
        fuelTypes: [
        ],
        transmissionTypes: [
        ],

      }
    }
  },
  mounted() {
    this.loadFormOptions()
  },
  methods: {
    loadFormOptions() {
      this.$axios.get(`/api/public/data/form`)
          .then(response => {
            //console.log(response.data)
            this.formOptions = response.data;
          })
          .catch(err => {
            console.log(err)
          })
          .finally(() => {

          })
    },
    getClearForm() {
      return {
        title: null,
        transmission: null,
        fuel: null,
        year: null,
        maxPrice: null,
      }
    },
    onSubmit(event) {
      event.preventDefault()
      this.$router.push({path: "/results", query: this.form})
      //alert(JSON.stringify(this.form))
    },
    onReset(event) {
      event.preventDefault()
      // Reset our form values
      this.form = this.getClearForm()
    }
  }
}
</script>

<style scoped>

</style>