<template>
  <div class="new-project container">
    <form @submit.prevent="create" class="card-panel grey lighten-5 blue-text text-darken-4">
      <h2 class="center">Create new project</h2>

      <div class="field">
        <label for="title">Title</label>
        <input
          type="text"
          name="title"
          @blur="$v.title.$touch()"
          v-model="title"
          :class="{invalid: !$v.title.required && $v.title.$dirty}"
        />
        <ul class="helper-text red-text text-darken-2">
          <li class="valign-wrapper" v-if="!$v.title.required && $v.title.$dirty">
            <i class="tiny material-icons">error</i>
            <span class="validation-text">Field is required</span>
          </li>
        </ul>
      </div>

      <div class="field">
        <label for="description">Description</label>
        <textarea
          name="description"
          @blur="$v.description.$touch()"
          v-model="description"
          class="materialize-textarea"
          :class="{invalid: $v.description.$error}"
        />
        <ul class="helper-text red-text text-darken-2">
          <li class="valign-wrapper" v-if="!$v.description.required && $v.description.$dirty">
            <i class="tiny material-icons">error</i>
            <span class="validation-text">Field is required</span>
          </li>
        </ul>
      </div>

      <div class="field">
        <label for="autocomplete-input">Participant</label>
        <input
          type="text"
          name="participant"
          class="autocomplete"
          v-model="participant"
          @input="updateOptions($event)"
        />
        <ul class="helper-text red-text text-darken-2">
          <li class="valign-wrapper" v-if="!$v.title.required && $v.title.$dirty">
            <i class="tiny material-icons">error</i>
            <span class="validation-text">Field is required</span>
          </li>
        </ul>
      </div>

      <div v-if="this.feedback" class="helper-text red-text text-darken-2">
        <p>{{this.feedback}}</p>
      </div>

      <div class="field center">
        <button class="btn blue" :disabled="$v.$invalid && $v.$anyDirty">Create</button>
      </div>
    </form>
  </div>
</template>

<script>
import { required, email, minLength, sameAs } from "vuelidate/lib/validators";
import { db } from "@/firebase/init";
import firebase from "firebase";

export default {
  name: "NewProject",
  data() {
    return {
      title: null,
      description: null,
      participants: [],
      participant: null,
      feedback: null,
      options: [
        { id: 1, name: "abc" },
        { id: 2, name: "def" },
      ],
    };
  },
  validations: {
    title: {
      required,
    },
    description: {
      required,
    },
  },
  methods: {
    create() {},
    updateOptions(event) {
      if (this.participant.length > 0) {
        db.collection("users")
          .where("username", ">=", this.participant)
          .get()
          .then((querySnapshot) => {
            this.participants = [];
            querySnapshot.forEach((doc) => {
              this.participants.push({ ...doc.data() });
            });
            console.log(this.participants);
          })
          .catch((err) => {
            console.log(err);
            this.feedback = err.message;
          });
      }
    },
  },
  created() {},
};
</script>

<style scoped>
.new-project {
  max-width: 800px;
  margin-top: 50px;
}

.new-project h2 {
  font-size: 2.4em;
}

.new-project .field {
  margin-bottom: 0.5em;
}

.new-project .validation-text {
  margin-left: 0.5em;
}
</style>