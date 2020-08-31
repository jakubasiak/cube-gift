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
        <label for="participant">Participant</label>
        <input
          type="text"
          name="participant"
          ref="participantField"
          v-model="participant"
          @input="searchUser($event)"
        />
      </div>

      <div class="flex-container">
        <button
          v-for="user in participantsSearchResult"
          :key="user.uid"
          class="btn blue"
          @click="addParticipant(user)"
        >{{user.username}}</button>
      </div>

      <ul v-if="participants.length > 0" class="collection">
        <li
          v-for="participant in participants"
          :key="participant.uid"
          class="collection-item blue-text text-darken-4"
        >
          <div class="flex-container-between">
            <span>{{participant.username}}</span>
            <button class="btn blue" @click="removeParticipant(participant)">Remove</button>
          </div>
        </li>
      </ul>

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
import moment from "moment";

export default {
  name: "NewProject",
  data() {
    return {
      title: null,
      description: null,
      participants: [],
      participantsSearchResult: [],
      participant: null,
      feedback: null,
      creator: null,
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
    create() {
      if (!this.title || !this.description || this.participants.length === 0) {
        this.feedback = "You have to fill the form first";
      } else {
        this.feedback = null;
        db.collection("projects")
          .add({
            title: this.title,
            description: this.description,
            participants: [
              ...this.participants.map((p) => p.uid),
              this.creator.uid,
            ],
            creator: this.creator.uid,
            creationDate: moment().toISOString(),
          })
          .then((docRef) => {
            this.$router.push("/");
          })
          .catch((err) => {
            console.log(err);
            this.feedback = err.message;
          });
      }
    },
    addParticipant(user) {
      this.participants.push(user);
      this.participantsSearchResult = [];
      this.participant = null;
      this.$refs.participantField.focus();
    },
    removeParticipant(user) {
      this.participants = this.participants.filter((u) => u.uid !== user.uid);
    },
    searchUser(event) {
      if (this.participant.length > 0) {
        db.collection("users")
          .where("username", ">=", this.participant)
          .limit(5)
          .get()
          .then((querySnapshot) => {
            this.participantsSearchResult = [];
            querySnapshot.forEach((doc) => {
              this.participantsSearchResult.push({ ...doc.data() });
            });
            this.participantsSearchResult = this.participantsSearchResult.filter(
              (x) =>
                this.participants.filter((p) => p.uid === x.uid).length <= 0 &&
                x.uid !== this.creator.uid
            );
          })
          .catch((err) => {
            console.log(err);
            this.feedback = err.message;
          });
      }
    },
  },
  created() {
    this.creator = firebase.auth().currentUser;
  },
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

.new-project .flex-container {
  display: flex;
  justify-content: left;
  align-items: center;
}

.new-project .flex-container-between {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.btn {
  margin: 2px;
}

.collection {
  margin-top: 15px;
}
</style>