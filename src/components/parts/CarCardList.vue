<template>
  <div>
    <b-row class="mt-4">
      <b-col md="4" v-if="showNewCarCard">
        <new-car-card></new-car-card>
      </b-col>
      <b-col md="4" v-for="car in cars" :key="car.Id">
        <car-card :car="car"/>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import CarCard from "@/components/parts/CarCard.vue";
import NewCarCard from "@/components/parts/NewCarCard";

export default {
  name: "CarCardList",
  components: {NewCarCard, CarCard},
  props: {
    cars: Array,
    showNewCarCard: {type: Boolean, default: false}
  },
  data() {
    return {
      //cars:

    }
  }
}
</script>

<style scoped>

</style>