<template>
  <div class="signup container">
    <form @submit.prevent="login" class="card-panel grey lighten-5 blue-text text-darken-4">
      <h2 class="center">Login</h2>

      <div class="field">
        <label for="email">Email</label>
        <input
          type="email"
          name="email"
          @blur="$v.email.$touch()"
          v-model="email"
          :class="{invalid: $v.email.$error}"
        />
        <ul class="helper-text red-text text-darken-2">
          <li class="valign-wrapper" v-if="!$v.email.required && $v.email.$dirty">
            <i class="tiny material-icons">error</i>
            <span class="validation-text">Field is required</span>
          </li>
          <li class="valign-wrapper" v-if="!$v.email.email && $v.email.$dirty">
            <i class="tiny material-icons">error</i>
            <span class="validation-text">Field should contains a valid email</span>
          </li>
        </ul>
      </div>

      <div class="field">
        <label for="password">Password</label>
        <input
          type="password"
          name="password"
          @blur="$v.password.$touch()"
          v-model="password"
          :class="{invalid: $v.password.$error}"
        />
        <ul class="helper-text red-text text-darken-2">
          <li class="valign-wrapper" v-if="!$v.password.required && $v.password.$dirty">
            <i class="tiny material-icons">error</i>
            <span class="validation-text">Field is required</span>
          </li>
        </ul>
      </div>

      <div v-if="this.feedback" class="helper-text red-text text-darken-2">
        <p>{{this.feedback}}</p>
      </div>

      <div class="field center">
        <button class="btn blue" :disabled="$v.$invalid && $v.$anyDirty">Login</button>
      </div>
    </form>
  </div>
</template>

<script>
import { required, email } from "vuelidate/lib/validators";
import { db } from '@/firebase/init'
import firebase from 'firebase'

export default {
  name: "Login",
  data() {
    return {
      email: null,
      password: null,
      feedback: null,
    };
  },
  validations: {
    email: {
      required,
      email,
    },
    password: {
      required
    },
  },
  methods: {
    login() {
        if(this.email && this.password) {
            firebase.auth().signInWithEmailAndPassword(this.email, this.password)
            .then(cred => {
                this.$router.push({name: 'Home'});
            })
            .catch(err => {
                this.feedback = err.message;
            });
            this.feedback = null;
        } else {
            this.feedback = "Please fill in both fields"
        }

    },
  },
};
</script>

<style scoped>
.signup {
  max-width: 800px;
  margin-top: 5%;
}

.signup h2 {
  font-size: 2.4em;
}

.signup .field {
  margin-bottom: 0.5em;
}

.signup .validation-text {
  margin-left: 0.5em;
}
</style>