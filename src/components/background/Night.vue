<template>
  <div id="page">
    <div id="stars"></div>
    <div id="stars2"></div>
    <div id="stars3"></div>
  </div>
</template>

<script>
export default {
  name: 'NightStars',
};
</script>

<style lang="sass" scoped>
#page
    height: 100vh;
    position: absolute;
    width: 100%;
    overflow: hidden;

@function multiple-box-shadow ($n)
  $value: '#{random(2000)}px #{random(2000)}px #FFF'
  @for $i from 2 through $n
    $value: '#{$value} , #{random(2000)}px #{random(2000)}px #FFF'

  @return unquote($value)

$shadows-small:  multiple-box-shadow(700)
$shadows-medium: multiple-box-shadow(200)
$shadows-big:    multiple-box-shadow(100)

#stars
  width: 1px
  height: 1px
  background: transparent
  box-shadow: $shadows-small
  animation			: animStar 50s linear infinite

  &:after
    content: " "
    position: absolute
    top: 2000px
    width: 1px
    height: 1px
    background: transparent
    box-shadow: $shadows-small

#stars2
  width: 2px
  height: 2px
  background: transparent
  box-shadow: $shadows-medium
  animation			: animStar 100s linear infinite

  &:after
    content: " "
    position: absolute
    top: 2000px
    width: 2px
    height: 2px
    background: transparent
    box-shadow: $shadows-medium

#stars3
  width: 3px
  height: 3px
  background: transparent
  box-shadow: $shadows-big
  animation			: animStar 150s linear infinite

  &:after
    content: " "
    position: absolute
    top: 2000px
    width: 3px
    height: 3px
    background: transparent
    box-shadow: $shadows-big
@keyframes animStar
  from
    transform: translateY(0px)
  to
    transform: translateY(-2000px)
</style>
