<template>
  <div class="signup container">
    <form @submit.prevent="signup" class="card-panel grey lighten-5 blue-text text-darken-4">
      <h2 class="center">Signup</h2>

      <div class="field">
        <label for="username">Username</label>
        <input
          type="text"
          name="username"
          @blur="$v.username.$touch()"
          v-model="username"
          :class="{invalid: !$v.username.required && $v.username.$dirty}"
        />
        <ul class="helper-text red-text text-darken-2">
          <li class="valign-wrapper" v-if="!$v.username.required && $v.username.$dirty">
            <i class="tiny material-icons">error</i>
            <span class="validation-text">Field is required</span>
          </li>
        </ul>
      </div>

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
          <li class="valign-wrapper" v-if="!$v.password.minLength && $v.password.$dirty">
            <i class="tiny material-icons">error</i>
            <span class="validation-text">The password should have at least 8 characters</span>
          </li>
        </ul>
      </div>

      <div class="field">
        <label for="confirmPassword">Confirm password</label>
        <input
          type="password"
          name="confirmPassword"
          @blur="$v.confirmPassword.$touch()"
          v-model="confirmPassword"
          :class="{invalid: $v.confirmPassword.$error}"
        />
        <ul class="helper-text red-text text-darken-2">
          <li class="valign-wrapper" v-if="!$v.confirmPassword.sameAs && $v.confirmPassword.$dirty">
            <i class="tiny material-icons">error</i>
            <span class="validation-text">The confirmed password should be the same as password</span>
          </li>
        </ul>
      </div>

      <div v-if="this.feedback" class="helper-text red-text text-darken-2">
        <p>{{this.feedback}}</p>
      </div>

      <div class="field center">
        <button class="btn blue" :disabled="$v.$invalid && $v.$anyDirty">Signup</button>
      </div>
    </form>
  </div>
</template>

<script>
import { required, email, minLength, sameAs } from "vuelidate/lib/validators";
import { db } from "@/firebase/init";
import firebase from "firebase";
import "firebase/firestore";

export default {
  name: "Signup",
  data() {
    return {
      username: null,
      email: null,
      password: null,
      confirmPassword: null,
      feedback: null,
    };
  },
  validations: {
    username: {
      required,
    },
    email: {
      required,
      email,
    },
    password: {
      required,
      minLength: minLength(8),
    },
    confirmPassword: {
      sameAs: sameAs("password"),
    },
  },
  methods: {
    signup() {
      this.feedback = null;
      if (this.email && this.password)
        firebase
          .auth()
          .createUserWithEmailAndPassword(this.email, this.password)
          .then((cred) => {
            cred.user.updateProfile({
              displayName: this.username,
            });
            db.collection("users").add({
              username: this.username,
              email: this.email,
              uid: cred.user.uid,
            });
          })
          .then(() => {
            this.$router.push({ name: "Home" });
          })
          .catch((err) => {
            console.log(err);
            this.feedback = err.message;
          });
    },
  },
};
</script>

<style scoped>
.signup {
  max-width: 800px;
  margin-top: 50px;
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