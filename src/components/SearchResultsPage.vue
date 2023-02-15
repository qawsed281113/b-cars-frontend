<template>
  <div class="mt-5">
    <b-breadcrumb :items="breadcrumbs"></b-breadcrumb>
    <b-overlay :show="loaded" style="min-height: 20vw;" class="mb-4">
      <div class="mt-4">
        <h2>Результати пошуку</h2>
      </div>
      <div v-if="cars.length > 0">
        <car-card-list :cars="cars"></car-card-list>
      </div>
      <div v-if="cars.length === 0">
        <b-jumbotron header="Нічого не знайдено" lead="Пошук не дав резульатів">
          <p>Спробуйте змінити умови пошуку та спробувати знову</p>
          <b-link class="btn btn-primary" href="/">Шукати знову</b-link>
        </b-jumbotron>
      </div>

    </b-overlay>
  </div>
</template>

<script>
import CarCardList from "@/components/parts/CarCardList";

export default {
  name: "SearchResultsPage",
  components: {CarCardList},
  metaInfo() {
    return {
      title: `Пошук - B*Cars Shop`,
      meta: [
        // { name: 'description', content:  'Epiloge is about connecting in your field of interest. Our vision is to help people share their knowledge, work, projects, papers and ideas and build their network through what they do rather where they live, study or work.'},
        // { property: 'og:title', content: "Epiloge - Build your network in your field of interest"},
        // { property: 'og:site_name', content: 'Epiloge'},
        // {property: 'og:type', content: 'website'},
        // {name: 'robots', content: 'index,follow'}
      ]
    }
  },
  data: function () {
    return {
      loaded: true,
      cars: [],
    }
  },
  computed: {
    breadcrumbs() {
      return [
        {
          text: 'Головна',
          href: '/'
        },
        {
          text: 'Результати пошуку',
          active: true
        }
      ]
    }
  },
  methods: {
    loadResults() {
      this.loaded = true
      this.$axios.get(`/api/public/car/search`, {params: this.$route.query})
          .then(response => {
            //console.log(response.data)
            this.cars = response.data;
          })
          .catch(err => {
            console.log(err)
          })
          .finally(() => {
            this.loaded = false
          })
    },
  },
  mounted() {
    this.loadResults()
  },
}
</script>

<style scoped>

</style>