<template>
  <nav class="transparent">
    <div class="nav-wrapper container">
      <a href="#" class="brand-logo">Gift</a>
      <ul id="nav-mobile" class="right hide-on-med-and-down">
        <li>
          <router-link :to="{name: 'Signup'}">Signup</router-link>
        </li>
        <li>
          <a href="">Login</a>
        </li>
        <li>
          <a @click="logout">Logout</a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import firebase from 'firebase'

export default {
  name: "Navbar",
  data() {
    return {};
  },
  methods: {
    logout() {
      firebase.auth().signOut()
      .then(() => {
        this.$router.push({name: 'Signup'});
      })
    }
  }
}
</script>

<style>
</style>