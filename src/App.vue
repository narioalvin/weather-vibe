<template>
  <div @click="away()">
    <!-- v-if="!proceed" -->
    <div class="loader" v-if="showLoader">
        <!-- <div class="form-item" v-if="!showLoader">
          <input
            type="text"
            id="user"
            name="user"
            v-model="userName"
            required
          />
          <label for="user"><h6>What is your name?</h6></label>
          <font-awesome-icon
            @click="arrowClick()"
            class="arrow-name"
            :class="userName.length > 0 ? 'arrow-blue' : 'arrow-gray'"
            :icon="['fas', 'arrow-circle-right']"
          />
        </div> -->
        <div>
          <p>Getting your current location...</p>
          <b-spinner variant="success" type="grow" label="Spinning"></b-spinner>
        </div>
    </div>
    <main :class="background.main">
      <Night v-if="background.main === 'night'" />
      <div
        style="height: 62vh; display: flex; align-items: center; justify-content: center;
    flex-direction: column;"
        v-if="typeof weather.main != 'undefined'"
      >
        <h1 style="text-transform: capitalize;">{{ background.message }} {{ userName }}!</h1>
        <!-- <h5>{{ date }}</h5> -->
        <h5 style="text-transform: capitalize;">
          {{ weather.name }} - {{ weather.weather[0].description }}
        </h5>
        <div>
          <h1 style="font-size: 45px;">
            {{ Math.round(weather.main.temp) }}°c
          </h1>
          <!-- <component :is="weather.$$icon" :size="weather.$$size"></component> -->
        </div>

        <img
          class="sunny"
          :src="require('./assets/img/' + background.centerImage + '.svg')"
        />

        <div style="position: relative; top: 10px">
          <span>Play some Music</span>
          <font-awesome-icon
            class="mp3Button"
            @click="play()"
            :icon="
              isMp3Playing ? ['fas', 'pause-circle'] : ['fas', 'play-circle']
            "
          />
        </div>
      </div>
      <div style="display: flex; align-items: center; justify-content: center;">
        <div class="forecast">
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
                  <span>{{ Math.round(item.firstWeather.main.temp_max) }}</span>
                  <span
                    >{{ Math.round(item.firstWeather.main.temp_min) }}°c</span
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
                    <span>{{ Math.round(collapseItem.main.temp_max) }}</span>
                    <span>{{ Math.round(collapseItem.main.temp_min) }}°c</span>
                  </div>
                </div>
              </b-collapse>
            </div>
          </div>
        </div>
      </div>
    </main>
    <!-- <CloudyBackground /> -->
    <!-- <div class="loader" v-if="showLoader">
      <div>
        <p>Getting your current location...</p>
        <b-spinner variant="success" type="grow" label="Spinning"></b-spinner>
      </div>
    </div> -->

    <!-- <div id="app" :class="background">
      <main>
        <div class="search-box">
          <div @click="$event.stopPropagation()">
            <div class="loader-gif search-loader" v-if="showResutLoader">
              <span></span>
              <span></span>
            </div>
            <input
              type="text"
              class="search-bar"
              placeholder="Search"
              v-model="query"
              v-on:keyup="search(query)"
              @keyup.enter="fetchWeather"
            />
            <div class="result" v-if="showResult">
              <div
                class="result-content"
                v-for="item in searchResults.list"
                :key="item.id"
                @click="searchForecast(item)"
              >
                <div class="left">
                  <img
                    v-bind:src="
                      'http://openweathermap.org/img/wn/' +
                        item.weather[0].icon +
                        '.png'
                    "
                  />
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
                  ><br />
                  <span class="add-info"
                    >Temperature from {{ Math.round(item.main.temp_min) }} to
                    {{ Math.round(item.main.temp_max) }}°c
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="forecast">
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
              </div>
         
            </div>
          </div>
        </div>
      </main>
    </div> -->
  </div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

import Night from '@/components/background/Night.vue';

export default {
  name: 'app',
  components: {
    Night
  },
  data() {
    return {
      weatherApiKey: '7d405bcc899a649d1f85f0ee632f9323',
      weatherApiUrlBase: 'https://api.openweathermap.org/data/2.5/',
      timezoneApiKey: 'XKNEC6T9OXH5',
      timezoneUrlBase: 'https://api.timezonedb.com/v2.1/get-time-zone',
      geoPlugin: 'https://www.geoplugin.net/json.gp',
      timezone: null,
      date: null,
      query: '',
      weather: {},
      showLoader: false,
      background: {},
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
      audio: new Audio(require('./assets/mp3/NoBetter.mp3')),
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
    //   `https://api.openweathermap.org/data/2.5/weather?q=Makati City&units=metric&appid=${this.weatherApiKey}`
    // )
    //   .then((results) => {
    //     return results.json();
    //   })
    //   .then((results) => {
    //     // console.log(results);
    //     this.setResults(results);
    //   });

    fetch(this.geoPlugin)
      .then((results) => {
        return results.json();
      })
      .then((result) => {

        return result;
      })
      .then((location) => {
        fetch(
          `${this.weatherApiUrlBase}weather?q=${location.geoplugin_city}&units=metric&appid=${this.weatherApiKey}`
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
    arrowClick() {
      this.proceed = true;
    },
    play() {
      this.isMp3Playing = !this.isMp3Playing;

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
          return 'cloudy-day-1';
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
        this.fetchWeather();
      }
    },
    away() {
      this.showResult = false;
      this.query = '';
    },
    forecastCollapse() {},
    searchForecast(item) {
      fetch(
        `${this.weatherApiUrlBase}forecast?q=${item.name}&units=metric&APPID=${this.weatherApiKey}`
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
      this.showForecastLoader = false;
    },
    fetchWeather() {
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
          this.searchResults = results;
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
          return result;
        });
    },
    setResults(results) {
      results['$$icon'] = this.getWeatherIcon(results);
      results['$$size'] = 'large';
      this.weather = results;

      //TODO get timezone on different countries

      this.getTimezone(results.coord.lat, results.coord.lon);

      let time = new Date().getHours();

      switch (true) {
          case time >= 6 && time < 12:
          this.background = {
            main: 'morning',
            centerImage: 'morning',
            message: 'Good Morning, ',
          };
          break;
        case time >= 12 && time < 15:
          this.background = {
            main: 'afternoon',
            centerImage: 'relax',
            message: 'Good Afternoon, ',
          };
          break;
        case time >= 15 && time < 18:
           this.background = {
            main: 'sunset',
            centerImage: 'sunset',
            message: 'Good Afternoon, ',
          };
          break;
        case time >= 18:
          this.background = {
            main: 'night',
            centerImage: 'night',
            message: 'Good Evening, ',
          };
          break;
  
      }

      this.searchForecast(this.weather);

      setTimeout(() => {
        this.showLoader = false;
      }, 100);
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
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  overflow: hidden;
}

body {
  font-family: 'montserrat', sans-serif;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  margin-bottom: 0;
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

$focus: #485461;
$base: #999;

.form-item {
  position: relative;
  margin-bottom: 0.5em;

  label,
  input {
    display: inline-block;
    transition: all 150ms;
    -webkit-appearance: none;
  }

  input {
    -webkit-appearance: none;
    border-radius: 0;
    border: 0;

    outline: 0;
    margin-top: 8px;
    padding: 6px 0;
    background-image: linear-gradient(transparent, transparent);
    border-bottom: 1px solid #485461;
    line-height: 20px;
    font-size: 14px;
    color: #222;
    cursor: auto;
    width: 260px;

    &:valid + label {
      color: $base;
      transform: translateY(-17px) scale(0.75);
    }

    &:focus + label {
      color: $base;
      transform: translateY(-17px) scale(0.75);
    }

    &:focus {
      outline: none;
      border-color: $focus;

      + label {
        color: $focus;
      }
    }
  }

  label {
    position: absolute;
    top: 12px;
    left: 0;
    padding: 0 2px;
    line-height: 20px;
    font-size: 14px;
    letter-spacing: 0.125em;
    color: $base;
    background: #fff;
    pointer-events: none;
    transform-origin: left center;
    transform: translateY(0) scale(1);
  }
}

.mp3Button {
  font-size: 20px;
  margin-left: 10px;
  cursor: pointer;
}

.sunny {
  width: 100%;
  height: 220px;
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

.morning {
  background: linear-gradient(130deg, #fdb813, #fdf86d, #a4bfef, #bddcf1);
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

.search-box {
  width: 100%;
  margin-bottom: 30px;
  display: flex;
  justify-content: center;
}

.search-box .result {
  position: absolute;
  width: 325px;
  background: #ffffff;
  border-radius: 0 0 10px 10px;
  border: none;
  padding: 20px 10px;
  overflow-y: auto;
  max-height: 260px;
  z-index: 9999;
  animation-name: search;
  animation-duration: 0.5s;
}

@keyframes search {
  from {
    max-height: 0px;
  }

  to {
    max-height: 260px;
  }
}

.forecast {
  height: 320px;
  width: 410px;
  border-radius: 5px;
  font-size: 15px;
  position: relative;
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

.forecast-content .forecast-data,
.collapse-body .collapse-content {
  display: flex;
  margin: 0 15px;
}

.collapse-body {
  background: rgba(0, 0, 0, 0.1);
  padding: 5px 5px 10px 22px;
}

.collapse-content .left {
  height: 40px;
  flex: 2;
  font-size: 13px;
}

.collapse-content .right {
  height: 40px;
  flex: 0.6;
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
  border-bottom: 1px solid #e7eff6;
  margin-bottom: 10px;
  cursor: pointer;
}

.result-content:last-child {
  border-bottom: 0;
  margin-bottom: 0;
}

.result-content .left {
  height: 80px;
  width: 25%;
}

.result-content .right {
  height: 80px;
  width: 75%;
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

.search-box .search-bar {
  display: block;
  width: 325px;
  padding: 5px;
  color: #ffffff;
  font-size: 16px;
  appearance: none;
  border: none;
  outline: none;
  border-bottom: 1px solid rgba(255, 255, 255, 0.85);
  background: none;
  transition: 0.4s;
}
.search-box .search-bar:focus {
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

@media (max-width: 360px) {
  .sunny {
    height: 160px;
  }
}


@media (max-width: 768px) {
  h1 {
   font-size: 28px;
  }
}
</style>
