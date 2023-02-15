import Vue from 'vue'
import App from './App.vue'
import {BootstrapVue, IconsPlugin} from 'bootstrap-vue'
import axios from "axios";
import VueRouter from "vue-router";
import VueMeta from 'vue-meta'
import VueSwal from 'vue-swal'
import UploadImage from 'vue-upload-image'
import AuthService from "@/services/AuthService";


Vue.use(VueMeta)

Vue.config.productionTip = false


let myAxios = axios
myAxios.defaults.baseURL = 'https://localhost:7168'
Vue.prototype.$axios = myAxios
Vue.prototype.$http = myAxios;
Vue.prototype.$authService = new AuthService(myAxios)


// Import Bootstrap and BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import HomePage from "@/components/HomePage";
import SearchResultsPage from "@/components/SearchResultsPage";
import CarPage from "@/components/CarPage";
import CarEditPage from "@/components/CarEditPage";
import moment from "moment/moment";
import MyCarsPage from "@/components/MyCarsPage";
import CarCreatePage from "@/components/CarCreatePage";

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(VueRouter)
Vue.use(VueSwal)
Vue.component('upload-image', UploadImage)

const routes = [
    {path: '/', component: HomePage},
    {path: '/results', component: SearchResultsPage},
    {path: '/my-cars', component: MyCarsPage},
    {path: '/car/*/:id', component: CarPage},
    {path: '/edit-car/*/:id', component: CarEditPage},
    {path: '/new-car', component: CarCreatePage},

    //{ path: '/', component: DashBoardPage },
    //{ path: '/orders', component: OrdersPage },
    //{ path: '/clients', component: ClientsPage },
]

const router = new VueRouter({
    mode: 'history',
    routes // сокращённая запись для `routes: routes`
})

function translit(text) {
    var transl = [];
    transl['А'] = 'A';
    transl['а'] = 'a';
    transl['Б'] = 'B';
    transl['б'] = 'b';
    transl['В'] = 'V';
    transl['в'] = 'v';
    transl['Г'] = 'H';
    transl['г'] = 'h';
    transl['Ґ'] = 'G';
    transl['ґ'] = 'g';
    transl['Д'] = 'D';
    transl['д'] = 'd';
    transl['Е'] = 'E';
    transl['е'] = 'e';
    transl['Є'] = 'Ye';
    transl['є'] = 'ie';
    transl['Ж'] = 'Zh';
    transl['ж'] = 'zh';
    transl['З'] = 'Z';
    transl['з'] = 'z';
    transl['И'] = 'Y';
    transl['и'] = 'y';
    transl['І'] = 'I';
    transl['і'] = 'i';
    transl['Ї'] = 'Yi';
    transl['ї'] = 'i';
    transl['Й'] = 'Y';
    transl['й'] = 'i';
    transl['К'] = 'K';
    transl['к'] = 'k';
    transl['Л'] = 'L';
    transl['л'] = 'l';
    transl['М'] = 'M';
    transl['м'] = 'm';
    transl['Н'] = 'N';
    transl['н'] = 'n';
    transl['О'] = 'O';
    transl['о'] = 'o';
    transl['П'] = 'P';
    transl['п'] = 'p';
    transl['Р'] = 'R';
    transl['р'] = 'r';
    transl['С'] = 'S';
    transl['с'] = 's';
    transl['Т'] = 'T';
    transl['т'] = 't';
    transl['У'] = 'U';
    transl['у'] = 'u';
    transl['Ф'] = 'F';
    transl['ф'] = 'f';
    transl['Х'] = 'Kh';
    transl['х'] = 'kh';
    transl['Ц'] = 'Ts';
    transl['ц'] = 'ts';
    transl['Ч'] = 'Ch';
    transl['ч'] = 'ch';
    transl['Ш'] = 'Sh';
    transl['ш'] = 'sh';
    transl['Щ'] = 'Shсh';
    transl['щ'] = 'shсh';
    transl['Ю'] = 'Yu';
    transl['ю'] = 'iu';
    transl['Я'] = 'Ya';
    transl['я'] = 'ia';
    transl[' '] = '-';
    transl['+'] = '';
    transl[','] = '';
    transl['\''] = '';
    transl['ь'] = '';
    transl['’'] = '';
    transl['.'] = '-';
    transl['’'] = '';

    var result = '';
    for (let i = 0; i < text.length; i++) {
        if (transl[text[i]] !== undefined) {
            result += transl[text[i]];
        } else {
            result += text[i];
        }
    }
    return result
}

Vue.filter('carToUrl', function (car) {
    let seo = translit(car.title).toLowerCase()
    return `/car/${seo}/${car.id}`
})
Vue.filter('carToEditUrl', function (car) {
    let seo = translit(car.title).toLowerCase()
    return `/edit-car/${seo}/${car.id}`
})
Vue.filter('dateTimeUa', function (date) {
    //console.log(date)
    //return date
    return moment(date).locale('uk-UA').calendar()
},)

new Vue({
    el: '#app',
    router,
    //i18n,
    render: h => h(App)
})
