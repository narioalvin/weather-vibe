<template>
  <!-- (c) ammap.com | SVG weather icons -->
  <svg
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    :viewBox="viewBox"
    :width="width"
    :height="height"
  >
    <defs>
      <filter id="blur" width="200%" height="200%">
        <feGaussianBlur in="SourceAlpha" stdDeviation="3" />
        <feOffset dx="0" dy="4" result="offsetblur" />
        <feComponentTransfer>
          <feFuncA type="linear" slope="0.05" />
        </feComponentTransfer>
        <feMerge>
          <feMergeNode />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
    <g filter="url(#blur)" id="rainy-6">
      <g transform="translate(20,10)">
        <g>
          <path
            d="M47.7,35.4c0-4.6-3.7-8.2-8.2-8.2c-1,0-1.9,0.2-2.8,0.5c-0.3-3.4-3.1-6.2-6.6-6.2c-3.7,0-6.7,3-6.7,6.7c0,0.8,0.2,1.6,0.4,2.3    c-0.3-0.1-0.7-0.1-1-0.1c-3.7,0-6.7,3-6.7,6.7c0,3.6,2.9,6.6,6.5,6.7l17.2,0C44.2,43.3,47.7,39.8,47.7,35.4z"
            fill="white"
            stroke="#d9d9d9"
            stroke-linejoin="round"
            stroke-width="1.2"
            transform="translate(-20,-11)"
          />
        </g>
      </g>
      <g transform="translate(31,46), rotate(10)">
        <line
          class="am-weather-rain-1"
          fill="none"
          stroke="white"
          stroke-dasharray="4,4"
          stroke-linecap="round"
          stroke-width="2"
          transform="translate(-4,1)"
          x1="0"
          x2="0"
          y1="0"
          y2="8"
        />
        <line
          class="am-weather-rain-2"
          fill="none"
          stroke="white"
          stroke-dasharray="4,4"
          stroke-linecap="round"
          stroke-width="2"
          transform="translate(0,-1)"
          x1="0"
          x2="0"
          y1="0"
          y2="8"
        />
        <line
          class="am-weather-rain-1"
          fill="none"
          stroke="white"
          stroke-dasharray="4,4"
          stroke-linecap="round"
          stroke-width="2"
          transform="translate(4,0)"
          x1="0"
          x2="0"
          y1="0"
          y2="8"
        />
      </g>
    </g>
  </svg>
</template>

<script>
export default {
  name: 'Rainy6',
  props: ['size'],
  viewBox: '',
  width: '',
  height: '',
  created() {
    if (this.size === 'large') {
    this.viewBox = '0 0 60 65';
      this.width = '60';
      this.height = '60';
    } else {
      this.viewBox = '0 0 55 55';
      this.width = '40';
      this.height = '40';
    }
  },
};
</script>

<style lang="css">
@keyframes am-weather-rain {
  0% {
    stroke-dashoffset: 0;
  }

  100% {
    stroke-dashoffset: -100;
  }
}

.am-weather-rain-1 {
  -webkit-animation-name: am-weather-rain;
  -moz-animation-name: am-weather-rain;
  -ms-animation-name: am-weather-rain;
  animation-name: am-weather-rain;
  -webkit-animation-duration: 8s;
  -moz-animation-duration: 8s;
  -ms-animation-duration: 8s;
  animation-duration: 8s;
  -webkit-animation-timing-function: linear;
  -moz-animation-timing-function: linear;
  -ms-animation-timing-function: linear;
  animation-timing-function: linear;
  -webkit-animation-iteration-count: infinite;
  -moz-animation-iteration-count: infinite;
  -ms-animation-iteration-count: infinite;
  animation-iteration-count: infinite;
}

.am-weather-rain-2 {
  -webkit-animation-name: am-weather-rain;
  -moz-animation-name: am-weather-rain;
  -ms-animation-name: am-weather-rain;
  animation-name: am-weather-rain;
  -webkit-animation-delay: 0.25s;
  -moz-animation-delay: 0.25s;
  -ms-animation-delay: 0.25s;
  animation-delay: 0.25s;
  -webkit-animation-duration: 8s;
  -moz-animation-duration: 8s;
  -ms-animation-duration: 8s;
  animation-duration: 8s;
  -webkit-animation-timing-function: linear;
  -moz-animation-timing-function: linear;
  -ms-animation-timing-function: linear;
  animation-timing-function: linear;
  -webkit-animation-iteration-count: infinite;
  -moz-animation-iteration-count: infinite;
  -ms-animation-iteration-count: infinite;
  animation-iteration-count: infinite;
}
</style>
