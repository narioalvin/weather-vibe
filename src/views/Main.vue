<template>
  <div @click="away()">
    <div class="loader" v-if="showLoader">
      <div>
        <p>Getting your current location...</p>
        <b-spinner variant="success" type="grow" label="Spinning"></b-spinner>
      </div>
    </div>
    <main class="parent" :class="background.main">
      <Rain v-if="background.main === 'raining'" />
      <NightStars v-if="background.main === 'night'" />
      <div class="animated" v-if="typeof weather.main != 'undefined'">
        <b-modal ref="search-modal" id="search-modal" hide-footer>
          <div @click="$event.stopPropagation()">
            <input
              id="search"
              type="text"
              class="search-bar"
              placeholder="Search"
              v-model="query"
              v-on:keyup="search(query)"
              @keyup.enter="searchPlaces"
            />
            <div class="result" v-if="showResult">
              <div
                class="result-content"
                v-for="item in searchResults"
                :key="item.id"
                @click="fetchWeather(item)"
              >
                <div class="left">
                  <component :is="item.$$icon" :size="item.$$size"></component>
                </div>
                <div class="right">
                  <span class="name">
                    {{ item.name }}, {{ item.sys.country }} </span
                  ><br />
                  <span
                    class="degrees"
                    :style="[
                      item.main.temp >= 20
                        ? { background: '#fed766' }
                        : { background: '#63ace5' },
                    ]"
                    >{{ Math.round(item.main.temp) }}°c</span
                  ><b-spinner
                    v-if="item.$$loading"
                    class="search-spinner"
                    variant="light"
                    label="Spinning"
                  ></b-spinner
                  ><br />
                  <span class="add-info"
                    >Temperature from {{ Math.round(item.main.temp_min) }} to
                    {{ Math.round(item.main.temp_max) }}°c
                  </span>
                </div>
              </div>
            </div>
          </div>
        </b-modal>

        <section class="one">
          <b-button v-b-modal.search-modal class="search" @click="modalClick"
            ><font-awesome-icon class="search-icon" :icon="['fas', 'search']"
          /></b-button>

          <h1 style="text-transform: capitalize;">
            {{ city }}
          </h1>
          <h5 class="wow" style="text-transform: capitalize;">
            {{ weather.weather[0].description }}
          </h5>
          <div style="display: flex;">
            <h1 style="font-size: 42px;">
              {{ Math.round(weather.main.temp) }}°c
            </h1>
            <component :is="weather.$$icon" :size="weather.$$size"></component>
          </div>
        </section>

        <section class="two">
          <img
            v-if="background.centerImage !== ''"
            class="sunny"
            :src="require('../assets/img/' + background.centerImage + '.svg')"
          />
          <button id="tooltip-target-1" class="mp3Button">
            <font-awesome-icon
              class="play-icon"
              @click="play()"
              :icon="
                isMp3Playing ? ['fas', 'pause-circle'] : ['fas', 'play-circle']
              "
            />
          </button>
          <b-tooltip target="tooltip-target-1" triggers="hover" placement="top">
            Play some music
          </b-tooltip>
        </section>

        <section class="three">
          <div
            style="display: flex; align-items: center; justify-content: center;"
          >
            <div class="forecast animated">
              <b-spinner
                class="forecast-loader"
                variant="light"
                type="grow"
                label="Spinning"
                v-if="showForecastLoader"
              ></b-spinner>
              <div class="forecast-body" role="tab">
                <div
                  class="forecast-content"
                  v-for="(item, index) in forecast"
                  :key="index"
                  v-b-toggle="index"
                  block
                >
                  <div class="forecast-data" @click="forecastCollapse(item)">
                    <div class="forecast-left">
                      <div>
                        <font-awesome-icon
                          class="when-closed"
                          :icon="['fas', 'chevron-right']"
                        />
                        <font-awesome-icon
                          class="when-opened"
                          :icon="['fas', 'chevron-down']"
                        />
                        <span>{{ item.day }}</span>
                      </div>

                      <span class="forecast-img">
                        <component
                          :is="item.firstWeather.$$icon"
                          :size="item.firstWeather.$$size"
                        ></component>
                      </span>
                    </div>
                    <div class="forecast-right">
                      <span>{{
                        Math.round(item.firstWeather.main.temp_max)
                      }}</span>
                      <span
                        >{{
                          Math.round(item.firstWeather.main.temp_min)
                        }}°c</span
                      >
                    </div>
                  </div>
                  <b-collapse
                    :id="index"
                    accordion="my-accordion"
                    role="tabpanel"
                    class="collapse-body"
                  >
                    <div
                      class="collapse-content"
                      v-for="(collapseItem, index) in item.upcoming"
                      :key="index"
                      @click="$event.stopPropagation()"
                      @mouseover="collapseOver(collapseItem)"
                      @mouseout="collapseOut()"
                    >
                      <div class="left">
                        <span>{{ collapseItem.$$time }}</span>
                        <span class="upcoming-img">
                          <component
                            :is="collapseItem.$$icon"
                            :size="collapseItem.$$icon.$$size"
                          ></component>
                        </span>
                      </div>
                      <div class="right">
                        <span>{{
                          Math.round(collapseItem.main.temp_max)
                        }}</span>
                        <span
                          >{{ Math.round(collapseItem.main.temp_min) }}°c</span
                        >
                      </div>
                    </div>
                  </b-collapse>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  </div>
</template>

<script>
import NightStars from '@/components/background/Night.vue';
import Rain from '@/components/background/Rain.vue';

export default {
  name: 'Main',
  components: {
    NightStars,
    Rain,
  },
  data() {
    return {
      weatherApiKey: process.env.VUE_APP_WEATHERAPIKEY,
      weatherApiUrlBase: 'https://api.openweathermap.org/data/2.5/',
      timezoneApiKey: process.env.VUE_APP_TIMEZONEAPIKEY,
      timezoneUrlBase: 'https://api.timezonedb.com/v2.1/get-time-zone',
      ipDataBaseUrl: 'https://api.ipdata.co',
      ipDataKey: process.env.VUE_APP_IPDATAKEY,
      timezone: null,
      currentDate: null,
      query: '',
      weather: {},
      weatherOver: {},
      showLoader: false,
      background: {},
      backgroundOver: {},
      searchResults: [],
      showResult: false,
      showResutLoader: false,
      forecast: {},
      showForecast: false,
      showForecastLoader: false,
      forecastIcon: '',
      selected: '',
      isMp3Playing: false,
      userName: '',
      proceed: false,
      city: '',
      audio: new Audio(require('../assets/mp3/StillDreaming.mp3')),
    };
  },
  created() {
    this.background = {
      main: '',
      centerImage: '',
      message: '',
    };

    this.showLoader = true;
    this.showForecastLoader = true;

    // fetch(
    //   `${this.weatherApiUrlBase}weather?q=Makati City&units=metric&appid=${this.weatherApiKey}`
    // )
    //   .then((result) => {
    //     return result.json();
    //   })
    //   .then((results) => {
    //     this.setResults(results);
    //   });

    fetch(`${this.ipDataBaseUrl}?api-key=${this.ipDataKey}`)
      .then((results) => {
        return results.json();
      })
      .then((result) => {
        return result;
      })
      .then((location) => {
        fetch(
          `${this.weatherApiUrlBase}weather?q=${location.city}&units=metric&appid=${this.weatherApiKey}`
        )
          .then((result) => {
            return result.json();
          })
          .then((results) => {
            this.setResults(results);
          });
      });
  },
  methods: {
    fetchWeather(value) {
      value.$$loading = true;
      fetch(
        `${this.weatherApiUrlBase}weather?id=${value.id}&units=metric&appid=${this.weatherApiKey}`
      )
        .then((result) => {
          return result.json();
        })
        .then((results) => {
          this.setResults(results);
        });
    },
    modalClick() {
      setTimeout(() => {
        document.getElementById('search').focus();
      }, 300);
    },
    setAnimation() {
      const items = document.querySelectorAll('.animated');

      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.intersectionRatio > 0) {
            entry.target.style.animation = `animUp .5s forwards ease-out`;
          }
        });
      });

      items.forEach((item) => {
        observer.observe(item);
      });
    },
    collapseOver(value) {
      this.weather = value;
      this.weather.$$size = 'large';

      let t = value.dt_txt.split(/[- :]/);
      const d = new Date(t[0], t[1] - 1, t[2], t[3], t[4], t[5]);
      const time = new Date(d).getHours();
      this.background = this.setBackground(time);
    },
    collapseOut() {
      this.background = this.backgroundOver;
      this.weather = this.weatherOver;
    },
    arrowClick() {
      this.proceed = true;
    },
    play() {
      this.isMp3Playing = !this.isMp3Playing;
      this.audio.volume = 0.2;
      if (this.isMp3Playing) {
        this.audio.play();
      } else {
        this.audio.pause();
      }
    },
    getWeatherIcon(value) {
      switch (value.weather[0].icon) {
        case '01d':
          return 'Day';
        case '02d':
          return 'CloudyDay3';
        case '03d':
          return value.clouds.all < 50 ? 'CloudyDay3' : 'Cloudy';
        case '04d':
          return 'Cloudy';
        case '09d':
          return 'Rainy6';
        case '10d':
          return 'Rainy1';
        case '11d':
          return 'Thunder';
        case '13d':
          return 'Snowy6';
        case '50d':
          return 'Cloudy';
        case '01n':
          return 'Night';
        case '02n':
          return 'CloudyNight3';
        case '03n':
          return value.clouds.all < 50 ? 'CloudyNight3' : 'Cloudy';
        case '04n':
          return 'CloudyNight3';
        case '09n':
          return 'Rainy6';
        case '10n':
          return 'Rainy6';
        case '11n':
          return 'Thunder';
        case '13n':
          return 'Snowy6';
        default:
          return 'CloudyNight1';
      }
    },
    search(query) {
      if (query.length < 3) {
        this.showResult = false;
      } else {
        this.showResutLoader = true;
        this.searchPlaces();
      }
    },
    away() {
      this.showResult = false;
      this.query = '';
    },
    forecastCollapse() {},
    searchForecast(item) {
      fetch(
        `${this.weatherApiUrlBase}forecast?id=${item.id}&units=metric&APPID=${this.weatherApiKey}`
      )
        .then((result) => {
          return result.json();
        })
        .then(this.insertToForecast);
    },
    insertToForecast(results) {
      const forecast = results.list
        .map((result) => {
          let t = result.dt_txt.split(/[- :]/);
          const d = new Date(t[0], t[1] - 1, t[2], t[3], t[4], t[5]);
          const actiondate = new Date(d);

          result['$$time'] = actiondate.toLocaleTimeString(navigator.language, {
            hour: '2-digit',
            minute: '2-digit',
          });
          result['$$day'] = this.dateBuilder(result.dt_txt, 'search');
          result['$$icon'] = this.getWeatherIcon(result);
          result['$$size'] = 'small';

          this.showLoader = false;
          this.setAnimation();
          return result;
        })
        .reduce(function(r, a) {
          r[a.$$day] = r[a.$$day] || [];
          r[a.$$day]['day'] = a.$$day;
          r[a.$$day]['firstWeather'] = {};
          r[a.$$day]['upcoming'] = [];

          r[a.$$day].push(a);

          r[a.$$day].forEach((element) => {
            r[a.$$day]['upcoming'].push(element);
          });
          r[a.$$day]['firstWeather'] = r[a.$$day][0];
          // console.log(r);
          return r;
        }, {});

      this.forecast = forecast;
      // console.log(forecast)
      this.showForecastLoader = false;
      this.$refs['search-modal'].hide();
    },
    searchPlaces() {
      fetch(
        `${this.weatherApiUrlBase}find?q=${this.query}&units=metric&APPID=${this.weatherApiKey}`
      )
        .then((result) => {
          return result.json();
        })
        .then((results) => {
          setTimeout(() => {
            this.showResutLoader = false;
          }, 500);
          setTimeout(() => {
            this.showResult = true;
          }, 500);
          this.searchResults = results.list.map((result) => {
            result['$$icon'] = this.getWeatherIcon(result);
            result['$$size'] = 'large';
            result['$$loading'] = false;
            return result;
          });
        });
    },
    getTimezone(lat, long) {
      fetch(
        `${this.timezoneUrlBase}?key=${this.timezoneApiKey}&format=json&by=position&lat=${lat}&lng=${long}`
      )
        .then((result) => {
          return result.json();
        })
        .then((result) => {
          this.currentDate = result;
          let t = result.formatted.split(/[- :]/);
          const d = new Date(t[0], t[1] - 1, t[2], t[3], t[4], t[5]);
          const time = new Date(d).getHours();
          this.backgroundOver = this.background = this.setBackground(time);
        });
    },
    setResults(result) {
      result['$$icon'] = this.getWeatherIcon(result);
      result['$$size'] = 'large';
      this.weather = result;

      this.weatherOver = result;
      this.city = result.name;

      this.getTimezone(result.coord.lat, result.coord.lon);
      this.searchForecast(this.weather);
    },
    setBackground(time) {
      if (this.weather.weather[0].main === 'Rain') {
        return {
          main: 'raining',
          centerImage: 'raining',
          message: 'Good Morning, ',
        };
      } else {
        switch (true) {
          case time >= 6 && time < 12:
            return {
              main: 'morning',
              centerImage: 'morning',
              message: 'Good Morning, ',
            };
          case time >= 12 && time < 15:
            return {
              main: 'afternoon',
              centerImage: 'relax',
              message: 'Good Afternoon, ',
            };
          case time >= 15 && time < 18:
            return {
              main: 'sunset',
              centerImage: 'sunset',
              message: 'Good Afternoon, ',
            };
          case (time >= 0 && time < 6) || time >= 18:
            return {
              main: 'night',
              centerImage: 'night',
              message: 'Good Evening, ',
            };
        }
      }
    },
    dateBuilder(value, type) {
      let t = value.split(/[- :]/);
      const d = new Date(t[0], t[1] - 1, t[2], t[3], t[4], t[5]);
      const actiondate = new Date(d);

      let months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ];
      let days = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
      ];
      let day = days[actiondate.getDay()];
      let date = actiondate.getDate();
      let month = months[actiondate.getMonth()];
      let year = actiondate.getFullYear();

      if (type === 'search') {
        return `${day}`;
      } else {
        return `${day} ${date} ${month} ${year}`;
      }
    },
  },
};
</script>

<style lang="scss">
.parent {
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow-y: hidden;
  animation: gradient 15s ease infinite;
  color: #fefefe;
}

.one {
  height: 22vh;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex-direction: column;
  text-align: center;
}

.two {
  height: 40vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  align-content: flex-start;
  padding: 0 20px;
}

.three {
  position: relative;
  z-index: 9999999;
  height: 38vh;
  display: flex;
  justify-content: center;
  align-items: flex-start;
}

.search-spinner {
  position: absolute;
  right: 6%;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  margin-bottom: 0;
}

.search {
  position: absolute;
  right: 4%;
  font-size: 23px;
  top: 5%;
}

::placeholder {
  color: #ffffff;
  opacity: 1;
}

/* width */
::-webkit-scrollbar {
  display: none !important;
}

.arrow-name {
  position: relative;
  right: 20px;
  font-size: 20px;
  cursor: pointer;
  transition: 0.3s;
}

.arrow-blue {
  color: #4dabf7;
}

.arrow-gray {
  color: #bfbfbf;
}

.mp3Button {
  background: none;
  height: 33px;
  padding: 0;
  width: 35px;
  border-radius: 50%;
  border: none;
  margin-top: 7px;
}

.mp3Button .play-icon {
  font-size: 26px;
  color: #ffffff;
}

.mp3Button:hover,
.search-icon:hover {
  opacity: 0.7;
  background: none;
}

.mp3Button:focus,
.mp3Button:active,
.search,
.search:hover,
.search:focus,
.search:active {
  outline: none !important;
  background: none !important;
  border: 0 !important;
  box-shadow: none !important;
}

.search {
  padding: 0;
}

.sunny {
  width: 100%;
  height: 200px;
}

.scrolling-wrapper {
  overflow-x: scroll;
  overflow-y: hidden;
  white-space: nowrap;

  .card {
    display: inline-block;
    background: none !important;
    border: none;
    padding: 10px;

    h5 {
      margin: auto;
      color: #fefefe;
    }
  }
}

.collapsed > .forecast-data .forecast-left .when-opened,
:not(.collapsed) > .forecast-data .forecast-left .when-closed {
  display: none;
}

.forecast-left .when-opened,
.forecast-left .when-closed {
  font-size: 13px;
  margin-right: 10px;
}

#app {
  background-size: cover;
  background-position: bottom;
  transition: 0.4s;
}

.raining {
  background: linear-gradient(130deg, #8b939a, #5b6467, #2d3436, #2f4353);
  background-size: 400% 400%;
}

.morning {
  background: linear-gradient(130deg, #ffad42, #fdf86d, #a4bfef, #bddcf1);
  background-size: 400% 400%;
}

.afternoon {
  background: linear-gradient(130deg, #f39f86, #f9d976, #ee7752, #e73c7e);
  background-size: 400% 400%;
}

.sunset {
  background: linear-gradient(130deg, #fc575e, #ee7752, #923993, #1d2951);
  background-size: 400% 400%;
}

.night {
  background: linear-gradient(130deg, #485461, #0d324d, #7f5a83, #380036);
  background-size: 400% 400%;
}

main {
  height: 100vh;
  animation: gradient 15s ease infinite;
  color: #fefefe;
}

@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

.nav-link {
  padding: 1px 3px !important;
  font-size: 14px;
}

.result {
  margin-top: 20px;
  z-index: 9999;
}

.forecast {
  // height: 320px;
  width: 410px;
  border-radius: 5px;
  font-size: 15px;
  position: relative;
}

.forecast:after {
  background: white;
  box-shadow: inset 0 0 0 200px rgba(255, 255, 255, 0.05);
  filter: blur(10px);
}

.forecast-body {
  overflow-y: auto;
  max-height: 330px;
}

.forecast-content {
  cursor: pointer;
}

.forecast-content .forecast-data {
  display: flex;
  margin: 0 15px;
}

.collapse-body .collapse-content {
  display: flex;
}

.collapse-body {
  background: rgba(0, 0, 0, 0.1);
  cursor: default;
}

.collapse-content:hover {
  background: rgba(0, 0, 0, 0.4);
}

.collapse-content .left {
  height: 40px;
  flex: 2;
  font-size: 13px;
  margin-left: 38px;
}

.collapse-content .right {
  height: 40px;
  flex: 0.65;
  margin-right: 15px;
}

.collapse-content .right,
.collapse-content .left {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.forecast div .forecast-left,
.forecast div .forecast-right {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.forecast div .forecast-left {
  height: 40px;
  flex: 2;
}

.forecast div .forecast-right {
  height: 40px;
  flex: 0.6;
}

.forecast-img,
.upcoming-img {
  position: relative;
  right: 70px;
}

.result-content {
  display: flex;
  // border-top: 1px solid #e7eff6;
  padding-top: 10px;
  cursor: pointer;
}

.result-content:hover {
  background: rgba(0, 0, 0, 0.15);
  transition: 0.4s;
}

.result-content .left {
  height: 80px;
  width: 18%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.result-content .right {
  height: 80px;
  width: 75%;
  padding-left: 25px;
}

.result-content .right .name {
  font-weight: 600;
}

.result-content .right .degrees {
  font-size: 13px;
  color: #ffffff;
  padding: 1px 13px;
  border-radius: 13px;
  line-height: 1.6;
  min-width: 50px;
  display: inline-block;
}

.result-content .right .add-info {
  font-size: 12px;
}

.modal-header {
  border-bottom: 0;
  padding: 13px;
}

.modal-body {
  padding-top: 0;
}

.modal-content {
  min-height: 150px;
  background-color: #fde7f9;
  background-image: linear-gradient(315deg, #fde7f9 0%, #aacaef 74%);
  color: white;
  border: 0;
}

.search-bar {
  border-radius: 0 !important;

  border: 0;

  display: block;
  width: 250px;
  padding: 5px;
  color: #ffffff;
  font-size: 16px;
  appearance: none;
  outline: none;
  margin: 0 auto;
  border-bottom: 1px solid rgba(255, 255, 255, 0.85);
  background: none;
  transition: 0.4s;
}
.search-bar:focus {
  border-bottom: 1px solid #ffffff;
}
.location-box .location {
  color: #ffffff;
  font-size: 32px;
  font-weight: 500;
  text-align: center;
  text-shadow: 2px 2px rgba(0, 0, 0, 0.25);
  border-radius: 16px;
}
.location-box .date {
  color: #ffffff;
  font-size: 20px;
  font-weight: 300;
  text-align: center;
}
.weather-box {
  text-align: center;
}
.weather-box .temp {
  display: inline-block;
  color: #fff;
  font-size: 37px;
  font-weight: 900;
  border-radius: 16px;
}
.weather-box .weather {
  color: #fff;
  font-size: 19px;
  font-weight: normal;
}

.forecast-loader {
  position: absolute;
  left: 45%;
  top: 45%;
}

.loader {
  display: flex;
  position: absolute;
  justify-content: center;
  height: 100vh;
  background: white;
  width: 100%;
  align-items: center;
  text-align: center;
  z-index: 99999999;
}

.main-loader,
.main-loader span {
  width: 100px;
  height: 100px;
  margin-top: 20px;
}

.search-loader,
.search-loader span {
  width: 35px;
  height: 35px;
  position: absolute;
  transform: translate(280px, -6%);
}

.search-loader span {
  background: #ffffff !important;
}

.loader-gif {
  display: inline-block;
  padding: 0px;
  text-align: left;
}
.loader-gif span {
  position: absolute;
  display: inline-block;
  border-radius: 100%;
  background: rgba(135, 211, 124, 1);
  -webkit-animation: loader-gif 1.5s linear infinite;
  animation: loader-gif 1.5s linear infinite;
}
.loader-gif span:last-child {
  animation-delay: -0.9s;
  -webkit-animation-delay: -0.9s;
}
@keyframes loader-gif {
  0% {
    transform: scale(0, 0);
    opacity: 0.8;
  }
  100% {
    transform: scale(1, 1);
    opacity: 0;
  }
}
@-webkit-keyframes loader-gif {
  0% {
    -webkit-transform: scale(0, 0);
    opacity: 0.8;
  }
  100% {
    -webkit-transform: scale(1, 1);
    opacity: 0;
  }
}

@keyframes animUp {
  from {
    transform: translateY(30px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.animated {
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
  opacity: 0;
}

@media (max-width: 360px) {
  .sunny {
    height: 160px;
  }
}

@media (max-width: 768px) {
  h1 {
    font-size: 35px;
  }

  .sunny {
    height: 170px;
  }

  .search {
    right: 5%;
    top: 3%;
  }
}

@media (min-width: 360px) {
  .forecast {
    width: 350px;
  }
}

@media (min-width: 450px) {
  .forecast {
    width: 400px;
  }
}
</style>
