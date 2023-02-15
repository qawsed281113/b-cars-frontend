<template>
  <div class="mt-3">
    <h1>Пошук</h1>
    <b-row>
      <b-col md="12">
        <b-row>
          <b-col md="3">
            <b-img class="p-4 img-fluid" src="/images/logo.jpg"></b-img>
          </b-col>
          <b-col md="9">
            <search-form></search-form>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
    <b-overlay :show="promoCarsLoaded" style="min-height: 20vw;" class="mb-4">
      <div>
        <h2>Нові оголошення</h2>
      </div>
      <car-card-list :cars="promoCars"></car-card-list>

    </b-overlay>
  </div>
</template>

<script>

import CarCardList from "@/components/parts/CarCardList.vue";
import SearchForm from "@/components/parts/SearchForm";

export default {
  name: "HomePage",
  components: {SearchForm, CarCardList},
  metaInfo() {
    return {
      title: "B*Cars Shop",
      meta: [
        // { name: 'description', content:  'Epiloge is about connecting in your field of interest. Our vision is to help people share their knowledge, work, projects, papers and ideas and build their network through what they do rather where they live, study or work.'},
        // { property: 'og:title', content: "Epiloge - Build your network in your field of interest"},
        // { property: 'og:site_name', content: 'Epiloge'},
        // {property: 'og:type', content: 'website'},
        // {name: 'robots', content: 'index,follow'}
      ]
    }
  },
  mounted() {
    this.updatePromoCarsList()
  },

  data: function () {
    return {
      promoCarsLoaded: true,
      promoCars: [],
    }
  },
  methods: {
    updatePromoCarsList() {
      this.promoCarsLoaded = true
      this.$axios.get(`/api/public/promo/cars`)
          .then(response => {
            //console.log(response.data)
            this.promoCars = response.data;

          })
          .catch(err => {
            console.log(err)

          })
          .finally(() => {
            this.promoCarsLoaded = false
          })
    },
  }
}
</script>

<style scoped>
.price-usd {
  font-size: 150%;
  font-weight: bold;
  color: green;
}
</style>