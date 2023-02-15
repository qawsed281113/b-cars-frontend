<template>
  <div class="mt-5">
    <b-breadcrumb :items="breadcrumbs"></b-breadcrumb>
    <b-row>
      <b-col md="5">
        <b-carousel
            id="images"
            v-model="slide"
            :interval="4000"
            controls
            fade
            indicators
            background="#ababab"
            v-if="car.images.length > 0"
            img-height="480"
            style="text-shadow: 1px 1px 2px #333;"
            @sliding-start="onSlideStart"
            @sliding-end="onSlideEnd">
          <b-carousel-slide v-for="image in car.images"
                            :key="image.id"
                            :img-src="image.src">
          </b-carousel-slide>
        </b-carousel>
        <!--        <b-img :src="car.mainImageSrc" rounded style="width: 100%"></b-img>-->
      </b-col>
      <b-col md="7">
        <b-card tag="div" class="mb-4">

          <b-card-title title-tag="h1" class="">{{ car.title }} - {{ car.year }}

          </b-card-title>

          <b-card-text>
            <div class="price-usd">
              {{ car.priceUsd }} $ <span class="price-uah"> {{ car.priceUah }} грн.</span>
            </div>

            <div class="info">
              <b-table :items="carInfoItems" thead-class="d-none">

              </b-table>
            </div>

            <div>Зв'язатися з продавцем:</div>
            <b-link class="btn btn-info btn-outline-" :href="'tel://' + car.user.phoneNumber">{{
                car.user.phoneNumber
              }}
            </b-link>
          </b-card-text>
          <template #footer>
            <div class="text-muted small">
              Створено: {{ car.createdAt | dateTimeUa }}
            </div>
            <div class="text-muted small">
              Оновлено: {{ car.updatedAt | dateTimeUa }}
            </div>
            <b-link v-if="canEdit" :href="car| carToEditUrl" class="btn btn-danger">Редагувати</b-link>
          </template>
        </b-card>
      </b-col>
    </b-row>

  </div>
</template>

<script>
import moment from "moment/moment";

export default {
  name: "CarPage",
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
  data: function () {
    return {
      loaded: true,
      car: {
        "id": null,
        "title": "",
        "mileage": null,
        "transmission": null,
        "city": null,
        "year": null,
        "fuel": null,
        "priceUah": null,
        "priceUsd": null,
        "createdAt": null,
        "updatedAt": null,
        "mainImageSrc": null,
        "user": {
          "id": null,
          "login": null,
          "phoneNumber": null
        },
        "images": []
      },
      slide: 0,
      sliding: null,
    }
  },
  mounted() {
    this.loaded = true;
    this.loadCar(this.$route.params.id)
  },
  computed: {
    breadcrumbs() {
      return [
        {
          text: 'Головна',
          href: '/'
        },
        {
          text: this.carTitle,
          active: true
        }
      ]
    },
    carTitle: function () {
      if (this.isEmpty(this.car?.title)) {
        return ""
      }
      return `${this.car.title} (${this.car?.year})`
    },
    canEdit() {
      return this.$authService.canEdit(this.car)
    },
    carInfoItems() {
      return [
        {name: "Марка", value: this.car.title},
        {name: "Рік випуску", value: this.car.year},
        {name: "Пробіг", value: `${this.mileageRound(this.car.mileage)} тис.км.`},
        {name: "Коробка передач", value: this.car.transmission},
        {name: "Паливо", value: this.car.fuel},
        {name: "Місто", value: this.car.city},
      ]
    },
  },
  methods: {
    isEmpty(str) {
      return (!str || str.length === 0)
    },
    onSlideStart(/*slide*/) {
      //console.log(slide)
      //this.sliding = true
    },
    onSlideEnd(/*slide*/) {
      //console.log(slide)
      //this.sliding = false
    },
    mileageRound(mileage) {
      if (mileage == null) {
        return null
      }
      return Math.round(((mileage / 1000) + Number.EPSILON) * 100) / 100
    },

    loadCar(id) {
      this.loaded = true
      this.$axios.get(`/api/public/car?id=${id}`)
          .then(response => {
            //console.log(response.data)
            this.car = response.data;

          })
          .catch(err => {
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
h1 {
  font-size: 35px;
}

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
</style>