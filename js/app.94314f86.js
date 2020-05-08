(function(t){function e(e){for(var a,r,i=e[0],c=e[1],u=e[2],l=0,p=[];l<i.length;l++)r=i[l],Object.prototype.hasOwnProperty.call(s,r)&&s[r]&&p.push(s[r][0]),s[r]=0;for(a in c)Object.prototype.hasOwnProperty.call(c,a)&&(t[a]=c[a]);d&&d(e);while(p.length)p.shift()();return o.push.apply(o,u||[]),n()}function n(){for(var t,e=0;e<o.length;e++){for(var n=o[e],a=!0,i=1;i<n.length;i++){var c=n[i];0!==s[c]&&(a=!1)}a&&(o.splice(e--,1),t=r(r.s=n[0]))}return t}var a={},s={app:0},o=[];function r(e){if(a[e])return a[e].exports;var n=a[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,r),n.l=!0,n.exports}r.m=t,r.c=a,r.d=function(t,e,n){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},r.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,e){if(1&e&&(t=r(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var a in t)r.d(n,a,function(e){return t[e]}.bind(null,a));return n},r.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="/weather-vibe/";var i=window["webpackJsonp"]=window["webpackJsonp"]||[],c=i.push.bind(i);i.push=e,i=i.slice();for(var u=0;u<i.length;u++)e(i[u]);var d=c;o.push([0,"chunk-vendors"]),n()})({0:function(t,e,n){t.exports=n("56d7")},"0dad":function(t,e,n){t.exports=n.p+"img/cloudy-night-2.bfb351b2.svg"},"228ef":function(t,e,n){t.exports=n.p+"img/thunder.c6779920.svg"},"3d9c":function(t,e,n){t.exports=n.p+"img/night.644849c6.svg"},"4bea":function(t,e,n){t.exports=n.p+"img/weather_sagittarius.166882bc.svg"},"55c3":function(t,e,n){t.exports=n.p+"img/cloudy-day-2.eb5ccd91.svg"},5631:function(t,e,n){t.exports=n.p+"img/rainy-7.07aa3f06.svg"},"56d7":function(t,e,n){"use strict";n.r(e);n("e260"),n("e6cf"),n("cca6"),n("a79d");var a=n("2b0e"),s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{on:{click:function(e){return t.away()}}},[t.showLoader?a("div",{staticClass:"loader"},[a("div",[a("p",[t._v("Getting your current location...")]),a("b-spinner",{attrs:{variant:"success",type:"grow",label:"Spinning"}})],1)]):t._e(),a("div",{class:t.background,attrs:{id:"app"}},[a("main",[a("div",{staticClass:"search-box"},[a("div",{on:{click:function(t){return t.stopPropagation()}}},[t.showResutLoader?a("div",{staticClass:"loader-gif search-loader"},[a("span"),a("span")]):t._e(),a("input",{directives:[{name:"model",rawName:"v-model",value:t.query,expression:"query"}],staticClass:"search-bar",attrs:{type:"text",placeholder:"Search"},domProps:{value:t.query},on:{keyup:[function(e){return t.search(t.query)},function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.fetchWeather(e)}],input:function(e){e.target.composing||(t.query=e.target.value)}}}),t.showResult?a("div",{staticClass:"result"},t._l(t.searchResults.list,(function(e){return a("div",{key:e.id,staticClass:"result-content",on:{click:function(n){return t.searchForecast(e)}}},[a("div",{staticClass:"left"},[a("img",{attrs:{src:"http://openweathermap.org/img/wn/"+e.weather[0].icon+".png"}})]),a("div",{staticClass:"right"},[a("span",{staticClass:"name"},[t._v(" "+t._s(e.name)+", "+t._s(e.sys.country)+" ")]),a("br"),a("span",{staticClass:"degrees",style:[e.main.temp>=20?{background:"#fed766"}:{background:"#63ace5"}]},[t._v(t._s(Math.round(e.main.temp))+"°c")]),a("br"),a("span",{staticClass:"add-info"},[t._v("Temperature from "+t._s(Math.round(e.main.temp_min))+" to "+t._s(Math.round(e.main.temp_max))+"°c ")])])])})),0):t._e()])]),"undefined"!=typeof t.weather.main?a("div",{staticClass:"weather-wrap"},[a("div",{staticClass:"location-box"},[a("div",{staticClass:"location"},[t._v(" "+t._s(t.weather.name)+", "+t._s(t.weather.sys.country)+" ")]),a("div",{staticClass:"date"},[t._v(t._s(t.date))])]),a("div",{staticClass:"weather-box"},[a("div",{staticClass:"weather",staticStyle:{"text-transform":"capitalize"}},[t._v(" "+t._s(t.weather.weather[0].description)+" ")]),a("div",{staticStyle:{height:"110px",position:"relative",bottom:"10px"}},[a("img",{attrs:{width:"150",src:n("eb36")("./"+t.weather.$$icon+".svg")}})]),a("div",{staticClass:"temp"},[t._v(t._s(Math.round(t.weather.main.temp))+"°c")])])]):t._e(),a("div",{staticClass:"forecast"},[t.showForecastLoader?a("b-spinner",{staticClass:"forecast-loader",attrs:{variant:"light",type:"grow",label:"Spinning"}}):t._e(),a("div",{staticClass:"forecast-body",attrs:{role:"tab"}},t._l(t.forecast,(function(e,s){return a("div",{directives:[{name:"b-toggle",rawName:"v-b-toggle",value:s,expression:"index"}],key:s,staticClass:"forecast-content",attrs:{block:""}},[a("div",{staticClass:"forecast-data",on:{click:function(n){return t.forecastCollapse(e)}}},[a("div",{staticClass:"forecast-left"},[a("div",[a("font-awesome-icon",{staticClass:"when-closed",attrs:{icon:["fas","chevron-right"]}}),a("font-awesome-icon",{staticClass:"when-opened",attrs:{icon:["fas","chevron-down"]}}),a("span",[t._v(t._s(e.day))])],1),a("span",{staticClass:"forecast-img"},[a("img",{attrs:{width:"45",src:n("eb36")("./"+e.firstWeather.$$icon+".svg")}})])]),a("div",{staticClass:"forecast-right"},[a("span",[t._v(t._s(Math.round(e.firstWeather.main.temp_max)))]),a("span",[t._v(t._s(Math.round(e.firstWeather.main.temp_min))+"°c")])])]),a("b-collapse",{staticClass:"collapse-body",attrs:{id:s,accordion:"my-accordion",role:"tabpanel"}},t._l(e.upcoming,(function(e,s){return a("div",{key:s,staticClass:"collapse-content"},[a("div",{staticClass:"left"},[a("span",[t._v(t._s(e.$$time))]),a("span",{staticClass:"upcoming-img"},[a("img",{attrs:{width:"45",src:n("eb36")("./"+e.$$icon+".svg")}})])]),a("div",{staticClass:"right"},[a("span",[t._v(t._s(Math.round(e.main.temp_max)))]),a("span",[t._v(t._s(Math.round(e.main.temp_min))+"°c")])])])})),0)],1)})),0)],1)])])])},o=[],r=(n("99af"),n("4160"),n("d81d"),n("13d5"),n("b0c0"),n("d3b7"),n("159b"),n("f9e3"),n("2dd8"),n("3a34")),i=n.n(r),c={name:"app",components:{},data:function(){return{weatherApiKey:"7d405bcc899a649d1f85f0ee632f9323",weatherApiUrlBase:"https://api.openweathermap.org/data/2.5/",timezoneApiKey:"XKNEC6T9OXH5",timezoneUrlBase:"https://api.timezonedb.com/v2.1/get-time-zone",timezone:null,date:null,query:"",weather:{},audio:null,showLoader:!1,background:"",searchResults:[],showResult:!1,showResutLoader:!1,forecast:{},showForecast:!1,showForecastLoader:!1,forecastIcon:""}},mounted:function(){},created:function(){var t=this;this.showLoader=!0,this.showForecastLoader=!0;var e=new i.a;console.log(e),navigator.geolocation&&navigator.geolocation.getCurrentPosition((function(e){fetch("".concat(t.weatherApiUrlBase,"weather?lat=").concat(e.coords.latitude,"&lon=").concat(e.coords.longitude,"&units=metric&appid=").concat(t.weatherApiKey)).then((function(t){return t.json()})).then(t.getTimezone(e.coords.latitude,e.coords.longitude)).then((function(e){t.setResults(e)}))}))},methods:{getWeatherIcon:function(t){switch(t.weather[0].icon){case"01d":return"day";case"02d":return"cloudy-day-3";case"03d":return t.clouds.all<50?"cloudy-day-3":"cloudy";case"04d":return"cloudy";case"09d":return"rainy-6";case"10d":return"rainy-1";case"11d":return"thunder";case"13d":return"snowy-6";case"50d":return"cloudy-day-1";case"01n":return"night";case"02n":return"cloudy-night-3";case"03n":return t.clouds.all<50?"cloudy-night-3":"cloudy";case"04n":return"cloudy-night-3";case"09n":return"rainy-6";case"10n":return"rainy-6";case"11n":return"thunder";case"13n":return"snowy-6";default:return"cloudy-night-1"}},search:function(t){t.length<3?this.showResult=!1:(this.showResutLoader=!0,this.fetchWeather())},away:function(){this.showResult=!1,this.query=""},forecastCollapse:function(){},searchForecast:function(t){fetch("".concat(this.weatherApiUrlBase,"forecast?q=").concat(t.name,"&units=metric&APPID=").concat(this.weatherApiKey)).then((function(t){return t.json()})).then(this.insertToForecast)},insertToForecast:function(t){var e=this,n=t.list.map((function(t){var n=new Date(t.dt_txt);return t["$$time"]=n.toLocaleTimeString(navigator.language,{hour:"2-digit",minute:"2-digit"}),t["$$day"]=e.dateBuilder(t.dt_txt,"search"),t["$$icon"]=e.getWeatherIcon(t),t})).reduce((function(t,e){return t[e.$$day]=t[e.$$day]||[],t[e.$$day]["day"]=e.$$day,t[e.$$day]["firstWeather"]={},t[e.$$day]["upcoming"]=[],t[e.$$day].push(e),t[e.$$day].forEach((function(n){t[e.$$day]["upcoming"].push(n)})),t[e.$$day]["firstWeather"]=t[e.$$day][0],t}),{});this.forecast=n,document.querySelector(".forecast-body").style.animation="animUp .5s forwards ease-out",this.showForecastLoader=!1},fetchWeather:function(){var t=this;fetch("".concat(this.weatherApiUrlBase,"find?q=").concat(this.query,"&units=metric&APPID=").concat(this.weatherApiKey)).then((function(t){return t.json()})).then((function(e){setTimeout((function(){t.showResutLoader=!1}),500),setTimeout((function(){t.showResult=!0}),500),t.searchResults=e}))},getTimezone:function(t,e){var n=this;fetch("".concat(this.timezoneUrlBase,"?key=").concat(this.timezoneApiKey,"&format=json&by=position&lat=").concat(t,"&lng=").concat(e)).then((function(t){return t.json()})).then((function(t){n.timezone=t,n.date=n.dateBuilder(t.formatted,"normal")}))},setResults:function(t){var e=this;t["$$icon"]=this.getWeatherIcon(t),this.weather=t,this.getTimezone(t.coord.lat,t.coord.lon);var n=new Date;n=n.toLocaleTimeString("en-GB"),n.substring(0,2)>=18&&this.weather.main.temp>16?this.background="night":this.background="warm",this.searchForecast(this.weather),setTimeout((function(){e.showLoader=!1}),100)},dateBuilder:function(t,e){var n=new Date(t),a=["January","February","March","April","May","June","July","August","September","October","November","December"],s=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],o=s[n.getDay()],r=n.getDate(),i=a[n.getMonth()],c=n.getFullYear();return"search"===e?"".concat(o):"".concat(o," ").concat(r," ").concat(i," ").concat(c)}}},u=c,d=(n("5c0b"),n("2877")),l=Object(d["a"])(u,s,o,!1,null,null,null),p=l.exports,h=n("ecee"),f=n("c074"),g=n("f2d1"),y=n("b702"),v=n("ad3d"),m=n("5843"),w=n("1947"),b=n("39ba"),_=n("01e3");h["c"].add(f["a"],g["a"],y["a"]),a["a"].component("font-awesome-icon",v["a"]),a["a"].component("b-collapse",m["a"]),a["a"].component("b-button",w["a"]),a["a"].directive("b-toggle",b["e"]),a["a"].component("b-spinner",_["a"]),a["a"].config.productionTip=!1,new a["a"]({render:function(t){return t(p)}}).$mount("#app")},"5c0b":function(t,e,n){"use strict";var a=n("9c0c"),s=n.n(a);s.a},"79d1":function(t,e,n){t.exports=n.p+"img/snowy-3.7e41a803.svg"},"87f9":function(t,e,n){t.exports=n.p+"img/rainy-2.4db3bb83.svg"},"94dd":function(t,e,n){t.exports=n.p+"img/rainy-3.6b26f41e.svg"},"94ff":function(t,e,n){t.exports=n.p+"img/cloudy-night-1.650295f2.svg"},"9b47":function(t,e,n){t.exports=n.p+"img/cloudy.0cdd15c4.svg"},"9c0c":function(t,e,n){},a25f:function(t,e,n){t.exports=n.p+"img/snowy-4.a7c18901.svg"},a278:function(t,e,n){t.exports=n.p+"img/snowy-6.34f01c18.svg"},a457:function(t,e,n){t.exports=n.p+"img/cloudy-day-1.1191a395.svg"},a716:function(t,e,n){t.exports=n.p+"img/rainy-1.63ae52f4.svg"},ab34:function(t,e,n){t.exports=n.p+"img/rainy-4.a2ad31f8.svg"},ac30:function(t,e,n){t.exports=n.p+"img/snowy-1.9c9caa01.svg"},ad92:function(t,e,n){t.exports=n.p+"img/weather_sunset.cf01f54e.svg"},b7d1:function(t,e,n){t.exports=n.p+"img/day.255a951b.svg"},cf77:function(t,e,n){t.exports=n.p+"img/rainy-5.447a97d2.svg"},d219:function(t,e,n){t.exports=n.p+"img/snowy-2.6ad23580.svg"},d874:function(t,e,n){t.exports=n.p+"img/snowy-5.06848045.svg"},e061:function(t,e,n){t.exports=n.p+"img/rainy-6.f1fe2b22.svg"},e398:function(t,e,n){t.exports=n.p+"img/weather-sprite.663621ef.svg"},eb36:function(t,e,n){var a={"./cloudy-day-1.svg":"a457","./cloudy-day-2.svg":"55c3","./cloudy-day-3.svg":"ec45","./cloudy-night-1.svg":"94ff","./cloudy-night-2.svg":"0dad","./cloudy-night-3.svg":"eeef","./cloudy.svg":"9b47","./day.svg":"b7d1","./night.svg":"3d9c","./rainy-1.svg":"a716","./rainy-2.svg":"87f9","./rainy-3.svg":"94dd","./rainy-4.svg":"ab34","./rainy-5.svg":"cf77","./rainy-6.svg":"e061","./rainy-7.svg":"5631","./snowy-1.svg":"ac30","./snowy-2.svg":"d219","./snowy-3.svg":"79d1","./snowy-4.svg":"a25f","./snowy-5.svg":"d874","./snowy-6.svg":"a278","./thunder.svg":"228ef","./weather-sprite.svg":"e398","./weather.svg":"f625","./weather_sagittarius.svg":"4bea","./weather_sunset.svg":"ad92"};function s(t){var e=o(t);return n(e)}function o(t){if(!n.o(a,t)){var e=new Error("Cannot find module '"+t+"'");throw e.code="MODULE_NOT_FOUND",e}return a[t]}s.keys=function(){return Object.keys(a)},s.resolve=o,t.exports=s,s.id="eb36"},ec45:function(t,e,n){t.exports=n.p+"img/cloudy-day-3.01b47e10.svg"},eeef:function(t,e,n){t.exports=n.p+"img/cloudy-night-3.3e64e0ed.svg"},f625:function(t,e,n){t.exports=n.p+"img/weather.53c3118d.svg"}});
//# sourceMappingURL=app.94314f86.js.map