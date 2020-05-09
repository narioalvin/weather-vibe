import Vue from 'vue';
import App from './App.vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { VBToggle, BButton, BCollapse, BSpinner } from 'bootstrap-vue';

import Cloudy from '@/components/gifs/Cloudy.vue';
import CloudyDay3 from '@/components/gifs/CloudyDay3.vue';
import CloudyNight1 from '@/components/gifs/CloudyNight1.vue';
import CloudyNight3 from '@/components/gifs/CloudyNight3.vue';
import Day from '@/components/gifs/Day.vue';
import Night from '@/components/gifs/Night.vue';
import Rainy1 from '@/components/gifs/Rainy1.vue';
import Rainy6 from '@/components/gifs/Rainy6.vue';
import Snowy6 from '@/components/gifs/Snowy6.vue';
import Thunder from '@/components/gifs/Thunder.vue';

library.add(fas, fab, far);

Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.component('b-collapse', BCollapse);
Vue.component('b-button', BButton);
Vue.directive('b-toggle', VBToggle);
Vue.component('b-spinner', BSpinner);

Vue.component('CloudyDay3', CloudyDay3);
Vue.component('Cloudy', Cloudy);
Vue.component('CloudyNight1', CloudyNight1);
Vue.component('CloudyNight3', CloudyNight3);
Vue.component('Day', Day);
Vue.component('Night', Night);
Vue.component('Rainy1', Rainy1);
Vue.component('Rainy6', Rainy6);
Vue.component('Snowy6', Snowy6);
Vue.component('Thunder', Thunder);

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount('#app');
