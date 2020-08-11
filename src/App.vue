<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link>|
      <router-link to="/about">About</router-link>
    </div>-->
    <Navbar />
    <router-view />
  </div>
</template>
<script>
import Navbar from "@/components/Navbar.vue";
export default {
  components: {
    Navbar,
  },
};
</script>
<style>
body,
html {
  background: rgb(20, 17, 88);
  background: linear-gradient(
    115deg,
    rgba(20, 17, 88, 1) 0%,
    rgba(3, 70, 148, 1) 45%,
    rgba(0, 116, 255, 1) 100%
  );
  height: 100%;
  width: 100%;
}
</style>
