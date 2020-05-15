<template>
  <div>
    <div id="snow"></div>
    <!-- <div id="snow2"></div>
    <div id="snow3"></div> -->
  </div>
</template>

<script>
export default {
  name: 'Rain'
};
</script>

<style lang="scss">
:root {
  --speed: 10s;
  --coloring: #ffffff;
  --direction: 2000;
}

@function multiple-box-shadow($n) {
  $value: '#{random(2000)}px #{random(2000)}px var(--coloring)';
  @for $i from 2 through $n {
    $value: '#{$value} , #{random(2000)}px #{random(2000)}px var(--coloring)';
  }
  @return unquote($value);
}

$shadows-small: multiple-box-shadow(700);
$shadows-medium: multiple-box-shadow(400);
$shadows-big: multiple-box-shadow(200);

html {
  height: 100%;
}

#snow {
  width: 2px;
  height: 2px;
  background: transparent;
  box-shadow: $shadows-small;
  animation: animStar linear infinite;
  animation-duration: var(--speed);
  border-radius: 100%;

  &:after {
    content: ' ';
    position: absolute;
    top: -2000px;
    width: 2px;
    height: 2px;
    background: transparent;
    box-shadow: $shadows-small;
    border-radius: 100%;
  }
}
#snow2 {
  width: 4px;
  height: 4px;
  background: transparent;
  box-shadow: $shadows-medium;
  animation: animStar linear infinite;
  animation-duration: calc(var(--speed) * 2);
  border-radius: 100%;

  &:after {
    content: ' ';
    position: absolute;
    top: 2000px;
    width: 4px;
    height: 4px;
    background: transparent;
    box-shadow: $shadows-medium;
    border-radius: 100%;
  }
}
#snow3 {
  width: 6px;
  height: 6px;
  background: transparent;
  box-shadow: $shadows-big;
  animation: animStar linear infinite;
  animation-duration: calc(var(--speed) * 4);
  border-radius: 100%;

  &:after {
    content: ' ';
    position: absolute;
    top: -2000px;
    width: 6px;
    height: 6px;
    background: transparent;
    box-shadow: $shadows-big;
    border-radius: 100%;
  }
}

@keyframes animStar {
  from {
    transform: translateY(0px);
  }
  to {
    transform: translateY(2000px);
  }
}

.controls {
  border: 1px solid green;
  position: absolute;
  padding: 25px 35px;
  border-radius: 5px;
  left: 5%;
  top: 5%;
  background: #3d3d3d;

  label {
    margin-top: 10px;
    color: var(--coloring);
    font-size: 20px;
    display: block;
    color: #f47820;
  }

  #speed {
    transform: rotateY(180deg);
  }
}
</style>
