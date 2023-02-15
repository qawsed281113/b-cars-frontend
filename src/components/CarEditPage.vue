<template>
  <div class="mt-5">
    <b-breadcrumb :items="breadcrumbs"></b-breadcrumb>
    <b-row class="mt-4">

      <b-col>
        <b-img :src="car.mainImage.src" style="width: 100%" fluid :alt="car.title" class="mb-2"></b-img>

      </b-col>
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
    <b-row class="mt-5">
      <b-col md="5">
        <b-carousel v-if="car.images.length > 0"
                    id="images"
                    v-model="slide"
                    :interval="4000"
                    controls
                    fade
                    indicators
                    background="#ababab"
                    img-width="1024"
                    img-height="480"
                    style="text-shadow: 1px 1px 2px #333;"
                    @sliding-start="onSlideStart"
                    @sliding-end="onSlideEnd">
          <b-carousel-slide v-for="image in car.images"
                            :key="image.id"
                            :img-src="image.src">
            <b-button v-if="!image.isMain" @click="setMainImage(image)" variant="primary" class="m-2">Set main
            </b-button>
            <b-button @click="deleteImage(image)" variant="danger" class="m-2">Delete</b-button>

          </b-carousel-slide>
        </b-carousel>
      </b-col>
      <b-col md="7">
        <upload-image is="upload-image"
                      :url="uploadImageUrl"
                      :max_files="5"
                      name="files[]"
                      :resize_enabled="true"
                      :resize_max_width="640"
                      class="img-upload"
                      v-on:upload-image-attemp="uploadImageSubmit"
                      v-on:upload-image-submit="uploadImageSubmit"
                      v-on:upload-image-success="uploadImageSuccess"
                      v-on:upload-image-failure="uploadImageFailure"
        ></upload-image>
      </b-col>
    </b-row>


  </div>
</template>

<script>
import moment from "moment/moment";
import _ from 'underscore';
//import UploadFilesService from "@/services/UploadFilesService";

export default {
  name: "CarPage",
  metaInfo() {
    return {
      title: `${this.car?.title} - B*Cars Shop`,
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
    carTitle: function () {
      if (this.isEmpty(this.car?.title)) {
        return ""
      }
      return `${this.car.title} (${this.car?.year})`
    },
    breadcrumbs() {
      return [
        {
          text: 'Головна',
          href: '/'
        },
        {
          text: this.carTitle,
          active: true
        },
        {
          text: "Редагування",
          active: true
        }
      ]
    },
    carChanged: function () {
      return !_.isEqual(this.car, this.carOriginal)
    },
    uploadImageUrl: function () {
      return `/api/private/image?carId=${this.car.id}`
    }
  },
  data: function () {
    return {
      errors: [],
      slide: 0,
      sliding: null,
      loaded: true,
      car: {
        title: null,
        mainImage: {
          id: 0,
          src: null
        },
        images: []
      },
      carOriginal: {
        title: null
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
    this.loaded = true
    this.loadFormOptions()
    this.loadCar(this.$route.params.id)
  },
  methods: {
    isEmpty(str) {
      return (!str || str.length === 0)
    },
    deleteImage(image) {
      console.log(image)
      this.$axios.delete(`/api/private/image?imageId=${image.id}`)
          .then(() => {
            this.loaded = true;
            this.loadCar(this.$route.params.id)
          }).catch(e => {
        console.log(e)
      })

    },
    setMainImage(image) {
      console.log(image)
      this.$axios.post(`/api/private/image/set-main?imageId=${image.id}`)
          .then(() => {
            this.loaded = true;
            this.loadCar(this.$route.params.id)
          }).catch(e => {
        console.log(e)
      })

    },

    onSlideStart(/*slide*/) {
      //console.log(slide)
      this.sliding = true
    },
    onSlideEnd(/*slide*/) {
      //console.log(slide)
      this.sliding = false
    },
    uploadImageSuccess(result) {
      console.log(result[0])
      console.log(result[1])
      this.$router.go()
    },
    uploadImageFailure(result) {
      console.log(result[0])
      console.log(result[1])
    },
    uploadImageSubmit(images) {
      console.log(images)
      //await UploadFilesService.upload(images)
      // images.forEach(i => {
      //   UploadFilesService.upload(i)
      //
      // })
    },

    onSubmit(event) {
      event.preventDefault()
      //alert(JSON.stringify(this.car))
      this.putCar()
    },
    onReset(event) {
      event.preventDefault()
      // Reset our form values
      this.car = structuredClone(this.carOriginal)
    },
    mileageRound(mileage) {
      return Math.round(((mileage / 1000) + Number.EPSILON) * 100) / 100
    },
    carInfoItems() {
      return [
        {name: "Марка", value: this.car.title},
        {name: "Пробіг", value: `${this.mileageRound(this.car.mileage)} тис.км.`},
        {name: "Коробка передач", value: this.car.transmission},
        {name: "Паливо", value: this.car.fuel},
        {name: "Місто", value: this.car.city},
      ]
    },
    putCar() {
      this.loaded = true
      this.$axios.put(`/api/private/car`, this.car)
          .then(response => {
            console.log(response.data)
            this.car = response.data;
            this.carOriginal = structuredClone(this.car);
            this.$swal({
              title: 'Збережено',
              //text: "Saved",
              icon: 'success',
              confirmButtonText: "Ok"
            })

          })
          .catch(err => {
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
    loadCar(id) {
      this.loaded = true
      this.$axios.get(`/api/private/car?id=${id}`)
          .then(response => {
            //console.log(response.data)
            this.car = response.data;
            this.carOriginal = structuredClone(this.car);
          })
          .catch(err => {
            if (err.response.status === 401) {
              this.$authService.logout()
              this.$router.push("/");
              this.$swal({
                title: 'Помилка',
                text: "Ви не авторизовані",
                icon: 'error',
                button: "Ok"
              })
            }
            if (err.response.status === 403) {
              this.$router.push("/");
              this.$swal({
                title: 'Помилка',
                text: err.response.data.error,
                icon: 'error',
                button: "Ok"
              })
            }
            //console.log(err)

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
.price-usd {
  margin-left: 2em;
  color: green;
  font-weight: bold;
  font-size: 30px;
}

.price-uah {
  margin-left: 4em;
  color: grey;
  font-size: 15px;
}

.img-upload {
  border: 1px solid lightgray;
}
</style>