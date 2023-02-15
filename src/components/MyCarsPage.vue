<template>
  <div>
    <b-overlay :show="myCarsLoaded" style="min-height: 20vw;" class="mb-4">
      <div class="mt-5">
        <b-breadcrumb :items="breadcrumbs">

        </b-breadcrumb>
        <h2>Мої оголошення</h2>
      </div>
      <car-card-list show-new-car-card :cars="myCars"></car-card-list>

    </b-overlay>
  </div>
</template>

<script>

import CarCardList from "@/components/parts/CarCardList.vue";

export default {
  name: "MyCars",
  components: {CarCardList},
  metaInfo() {
    return {
      title: "Мої автомобілі - B*Cars Shop",
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
    this.updateMyCarsList()
  },

  data: function () {
    return {
      myCarsLoaded: true,
      myCars: [],
      breadcrumbs: [
        {
          text: 'Головна',
          href: '/'
        },
        {
          text: 'Мої автомобілі',
          active: true
        }
      ],
    }
  },
  methods: {
    updateMyCarsList() {
      this.promoCarsLoaded = true
      this.$axios.get(`/api/private/car/my-list`)
          .then(response => {
            //console.log(response.data)
            this.myCars = response.data;

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
            console.log(err)

          })
          .finally(() => {
            this.myCarsLoaded = false
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