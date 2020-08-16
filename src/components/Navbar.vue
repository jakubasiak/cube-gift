<template>
  <nav class="transparent">
    <div class="nav-wrapper container">
      <router-link :to="{ name: 'Home'}" class="brand-logo">GIFT</router-link>
      <ul id="nav-mobile" class="right hide-on-med-and-down">
        <li v-if="!this.user">
          <router-link :to="{name: 'Signup'}">Signup</router-link>
        </li>
        <li v-if="!this.user">
          <router-link :to="{name: 'Login'}">Login</router-link>
        </li>
        <li v-if="this.user">
          <router-link :to="{name: 'NewProject'}" class="btn blue">
            New project<i class="material-icons right">add</i>
          </router-link>
        </li>
        <li v-if="this.user">
          <router-link :to="{name: 'ProjectList'}">Project list</router-link>
        </li>
        <li v-if="this.user" style="margin-right: 5em;">
          <router-link :to="{name: 'WishList'}">Wish list</router-link>
        </li>
        <li v-if="this.user">
          <a>{{this.user.email}}</a>
        </li>
        <li v-if="this.user">
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
    return {
      user: null
    };
  },
  methods: {
    logout() {
      firebase.auth().signOut()
      .then(() => {
        this.$router.push({name: 'Login'});
      })
    }
  },
  created() {
    firebase.auth().onAuthStateChanged(user => {
      if(user) {
        this.user = user;
      } else {
        this.user = null;
      }
    })
  }
}
</script>

<style>
</style>