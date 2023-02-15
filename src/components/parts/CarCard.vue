<template>

  <b-card
      :img-src="car.mainImage.src"
      img-alt="Image"
      img-top
      tag="div"
      class="mb-4"
  >
    <b-link :href="car | carToUrl" class="car-title">
      <b-card-title class="">{{ car.title }} ({{car.year}})</b-card-title>
    </b-link>
    <b-card-text>
      <div class="price">
        <span class="price-usd">{{ car.priceUsd }} $</span>
        <span class="point">•</span>
        <span class="price-uah">{{ car.priceUah }} грн</span>
      </div>
      <div class="info">
        <b-row>
          <b-col md="6">
            {{ car.mileage }}
          </b-col>
          <b-col md="6">
            {{ car.city }}
          </b-col>
          <b-col md="6">
            {{ car.fuel }}
          </b-col>
          <b-col md="6">
            {{ car.transmission }}
          </b-col>
        </b-row>
      </div>

    </b-card-text>
    <template #footer>
      <div class="text-muted small">
        {{ car.createdAt | dateTimeUa }}
      </div>
    </template>
    <!--            <b-button href="#" variant="primary">Go somewhere</b-button>-->
    <!--            <template #footer>-->
    <!--              Hello-->
    <!--            </template>-->
  </b-card>

</template>

<script>
//import moment from "moment";

export default {
  name: "CarCard",
  props: {
    car: {
      type: Object,
      required: true,
    }
  },
  methods: {

  }
}
</script>

<style scoped>
.price-usd {
  font-size: 150%;
  font-weight: bold;
  color: green;
}

.point {
  margin-left: 10px;
  margin-right: 10px;
}

.car-title {
  text-decoration: none;
  color: black;
}
</style>