<template>
  <div id="page">
    <div class="cloud cloud1">
      <img src="../../assets/img/cloud1.png" />
    </div>

     <!-- <div class="cloud cloud2">
      <img src="../../assets/img/cloud1.png" />
    </div> -->
    <!-- <div class="cloud cloud-2">
    <img src="http://i967.photobucket.com/albums/ae160/mykyrIacos_bucket/TUBES%20NUAGES/Jillcreation-overlay-cloud.png">
  </div>
  
  <div class="cloud cloud-3">
    <img src="https://images.unsplash.com/photo-1536532184021-da5392b55da1?ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80">
  </div>
  
  <div class="cloud cloud-4">
    <img src="http://www.ricardominhava.com/img/nuvem6.png">
  </div> -->
  </div>
</template>

<script>
export default {
  name: 'CloudyBackground',
};
</script>

<style lang="less" scoped>
#page {
  background-color: #d6eef4;
  background-image: linear-gradient(315deg, #d6eef4 0%, #9ad5e4 74%);
  height: 100vh;
  position: absolute;
      z-index: -1;
}

div.cloud {
   animation: marquee 200s linear infinite;

    // transform: translate(17%, 0);

      > img {
      transform: translate(0, -25%);
    }

  //  &.cloud-2 {
  //     // margin-top: -500px;
  //     // opacity: 0.6;
  //     animation-delay: 0.75s;
  //     animation-duration: 15s;
  //  }
}

// .cloud1 img {
//   max-width: 30%;
// }

// .marquee {
//   background-color: #66d1ff;
//   background-image: linear-gradient(315deg, #66d1ff 0%, #00b4ff 74%);
//   width: 100%;
//   margin: 0 auto;
//   //white-space: nowrap; // for text content
//   overflow: hidden;
//   box-sizing: border-box;

//   div.cloud {
//     position: absolute;
//     top: 0;
//     left: 0;
//     right: 0;
//     bottom: 0;
//     width: 100%;
//     height: 100%;
//     display: inline-block;
//     opacity: 0.35;
//     //width: 100%;
//     padding-left: 100%;
//     animation: marquee 10s linear infinite;

//     > img {
//       max-width: 100%;
//     }

//     &:hover {
//       //animation-play-state: paused
//     }

//     &.cloud-2 {
//       margin-top: -500px;
//       opacity: 0.6;
//       animation-delay: 0.75s;
//       animation-duration: 15s;
//     }

//     &.cloud-3 {
//       margin-top: 150px;
//       opacity: 0.3;
//       animation-delay: 1.25s;
//       animation-duration: 18s;
//     }

//     &.cloud-4 {
//       margin-top: -400px;
//       opacity: 0.2;
//       animation-delay: 1.5s;
//       animation-duration: 25s;
//     }
//   }
// }

/* Make it move */
@keyframes marquee {
   0% {
    transform: translate(17%, 0);
   }
  100% {
     transform: translate(-92%, 0);
   }
 }
</style>
    
    