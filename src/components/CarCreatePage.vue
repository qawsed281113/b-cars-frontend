<template>
  <div class="mt-5">
    <b-breadcrumb :items="breadcrumbs"></b-breadcrumb>
    <b-row class="mt-4">
      <b-col md="7">
        <b-form @submit="onSubmit" @reset="onReset">
          <b-row>
            <b-col md="8">
              <b-form-group
                  label="Mодель"
                  label-for="car-title"
              >
                <b-form-input
                    id="car-title"
                    v-model="car.title"
                    type="text"
                    placeholder="Модель"
                    required
                ></b-form-input>
              </b-form-group>
            </b-col>
            <b-col md="4">
              <b-form-group
                  label="Рік"
                  label-for="car-year"
              >
                <b-form-input
                    id="car-year"
                    v-model="car.year"
                    type="number"
                    step="1"
                    min="1950"
                    max="3000"
                    placeholder="Рік випуску"
                    required
                ></b-form-input>
              </b-form-group>
            </b-col>
            <b-col md="12">
              <b-form-group
                  label="Опис"
                  label-for="car-description"
              >
                <b-form-textarea
                    id="car-description"
                    v-model="car.description"
                    rows="5"
                    placeholder="Опис"
                ></b-form-textarea>
              </b-form-group>
            </b-col>
          </b-row>


          <b-row>
            <b-col md="4">
              <b-form-group
                  label="Пробіг"
                  label-for="car-mileage"
              >
                <b-form-input
                    id="car-mileage"
                    v-model="car.mileage"
                    type="number"
                    step="1"
                    min="0"
                    placeholder="Пробіг"

                    required
                ></b-form-input>
              </b-form-group>
            </b-col>

            <b-col md="4">
              <b-form-group
                  id="input-group-3"
                  label="Коробка передач"
                  label-for="input-3"
              >
                <b-form-select
                    id="input-3"
                    v-model="car.transmission"
                    :options="formOptions.transmissionTypes"
                    class="form-select"
                >

                </b-form-select>
              </b-form-group>
            </b-col>

            <b-col md="4">
              <b-form-group
                  label="Вид палива"
                  label-for="fuel"
              >
                <b-form-select
                    id="fuel"
                    required
                    v-model="car.fuel"
                    :options="formOptions.fuelTypes"
                    class="form-select"
                >

                </b-form-select>
              </b-form-group>
            </b-col>


          </b-row>

          <b-row>
            <b-col md="4">
              <b-form-group
                  label="Ціна"
                  label-for="car-price-usd"
              >
                <b-form-input
                    id="car-price-usd"
                    v-model="car.priceUsd"
                    type="number"
                    step="1"
                    min="0"
                    placeholder="Ціна"
                    required
                ></b-form-input>
              </b-form-group>
            </b-col>

            <b-col md="8">
              <b-form-group
                  label="Місто"
                  label-for="car-city"
              >
                <b-form-input
                    id="car-city"
                    v-model="car.city"
                    type="text"
                    placeholder="Місто"
                    required
                ></b-form-input>
              </b-form-group>
            </b-col>
          </b-row>

          <p class="text-danger" v-for="(error, index) in errors" :key="`err-${index}`">
            {{ error }}
          </p>

          <div class="mt-4 mb-4">
            <b-button class="m-1" :disabled="!carChanged" type="submit" variant="outline-primary">Зберегти
            </b-button>
            <b-button class="m-1" :disabled="!carChanged" type="reset" variant="outline-danger">Скинути
            </b-button>
          </div>

        </b-form>
      </b-col>
    </b-row>


  </div>
</template>

<script>
import moment from "moment/moment";
import _ from "underscore";

export default {
  name: "CarCreatePage",
  metaInfo() {
    return {
      title: `${this.carTitle} - B*Cars Shop`,
      //title: `111 B*Cars Shop`,
      meta: [
        // { name: 'description', content:  'Epiloge is about connecting in your field of interest. Our vision is to help people share their knowledge, work, projects, papers and ideas and build their network through what they do rather where they live, study or work.'},
        // { property: 'og:title', content: "Epiloge - Build your network in your field of interest"},
        // { property: 'og:site_name', content: 'Epiloge'},
        // {property: 'og:type', content: 'website'},
        // {name: 'robots', content: 'index,follow'}
      ]
    }
  },
  filters: {
    dateTime: function (date) {
      return moment().locale('uk-UA').utc(date).calendar()
    },
  },
  computed: {
    breadcrumbs() {
      return [
        {
          text: 'Головна',
          href: '/'
        },
        {
          text: 'Мої автомобілі',
          href: "/my-cars",
        },
        {
          text: "Створення",
          active: true
        }
      ]
    },
    carTitle: function () {
      if (this.isEmpty(this.car.title)) {
        return "Нова машина"
      }
      return this.car.title
    },
    carChanged: function () {
      return !_.isEqual(this.car, this.carOriginal)
    },
  },
  data: function () {
    return {
      loaded: true,
      car: {},
      errors: [],
      carOriginal: {
        title: null,
        description: null,
        priceUsd: null,
        mileage: null,
        city: null,
        transmission: null,
        fuel: null,
        year: null
      },
      formOptions: {
        fuelTypes: [
        ],
        transmissionTypes: [
        ],
      }
    }
  },
  mounted() {
    this.loaded = true;
    this.loadFormOptions()
    this.car = structuredClone(this.carOriginal)
  },
  methods: {
    isEmpty(str) {
      return (!str || str.length === 0)
    },
    onSubmit(event) {
      event.preventDefault()
      //alert(JSON.stringify(this.car))
      this.postCar()
    },
    onReset(event) {
      event.preventDefault()
      // Reset our form values
      this.car = structuredClone(this.carOriginal)
    },
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
    postCar() {
      this.errors = []
      this.loaded = true
      this.$axios.post(`/api/private/car`, this.car)
          .then(response => {
            console.log(response.data)
            this.$router.push(`/edit-car/car-name/${response.data.id}`)
          })
          .catch(err => {
            this.errors = [err.response.data.title]
            this.$swal({
              title: 'Не збережено',
              //text: "Saved",
              icon: 'error',
              confirmButtonText: "Ok"
            })
            console.log(err)
          })
          .finally(() => {
            this.loaded = false
          })
    },
  },
  beforeRouteUpdate(to, from, next) {
    next()
  }
}
</script>

<style scoped>

</style>