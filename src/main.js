import Vue from 'vue'
import App from './App.vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { VBToggle, BButton, BCollapse, BSpinner} from 'bootstrap-vue'

library.add(fas, fab, far)

Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.component('b-collapse', BCollapse)
Vue.component('b-button', BButton)
Vue.directive('b-toggle', VBToggle)
Vue.component('b-spinner', BSpinner)

Vue.config.productionTip = false


new Vue({
  render: h => h(App),
}).$mount('#app')
