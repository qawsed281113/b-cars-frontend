<template>
  <div id="app">
    <page-header></page-header>
    <b-container style="min-height: 88.9vh">
      <router-view></router-view>
    </b-container>
    <page-footer></page-footer>
<!--    <img alt="Vue logo" src="./assets/logo.png">-->
<!--    <HelloWorld msg="Welcome to Your Vue.js App"/>-->
  </div>
</template>

<script>
//import HelloWorld from './components/HelloWorld.vue'
//import HomePage from './components/HomePage.vue'
import PageHeader from "@/components/common/PageHeader";
import PageFooter from "@/components/common/PageFooter";
//import SearchResultsPage from './components/SearchResultsPage.vue'

export default {
  name: 'App',
  components: {
    PageFooter,
    PageHeader
    //HomePage, SearchResultsPage
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*text-align: center;*/
  color: #2c3e50;
  /*margin-top: 60px;*/
}
</style>
