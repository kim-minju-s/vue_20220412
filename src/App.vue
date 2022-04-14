<template>
  <div>
    <img alt="Vue logo" src="./assets/logo.png" style="width:50px" />
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> |
    <router-link to="/board">Board</router-link> |
    <router-link to="/mqtt">Mqtt</router-link> |
    <router-link to="/join">Join</router-link> |
    <router-link to="/login">Login</router-link> |
    <router-link to="/mypage">Mypage</router-link> |
    <router-link to="/buy">Buy</router-link> |
    <hr />

    <router-view></router-view>
  </div>
</template>

<script>
export default {
  setup () {

    return {}
  }
}
</script>

<style>

</style>