<template>
  <div class="wish-list container">
    <form @submit.prevent="addToWishList" class="card-panel grey lighten-5 blue-text text-darken-4">
      <h2 class="center">Add gift to your wish list</h2>

      <div class="field">
        <label for="name">Name</label>
        <input
          type="text"
          name="name"
          @blur="$v.name.$touch()"
          v-model="name"
          :class="{invalid: !$v.name.required && $v.name.$dirty}"
        />
        <ul class="helper-text red-text text-darken-2">
          <li class="valign-wrapper" v-if="!$v.name.required && $v.name.$dirty">
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
        <label for="link">Link</label>
        <input type="text" name="link" v-model="link" />
      </div>

      <div class="field">
        <label for="price">Estimated price</label>
        <input type="text" name="price" v-model="price" />
      </div>

      <div v-if="this.feedback" class="helper-text red-text text-darken-2">
        <p>{{this.feedback}}</p>
      </div>

      <div class="field center">
        <button type="submite" class="btn blue" :disabled="$v.$invalid && $v.$anyDirty">Add to list</button>
        <button class="btn blue" @click="reset">Reset</button>
      </div>
    </form>

    <div class="card-panel grey lighten-5 blue-text text-darken-4">
      <div
        v-for="(item, index) in wishList"
        :key="index"
        class="collection-item blue-text text-darken-4 card-panel"
      >
        <div class="flex-container">
          <div>
            <label>Name</label>
            <div>{{item.name}}</div>
            <label>Description</label>
            <div>{{item.description}}</div>
            <label>Link</label>
            <div>{{item.link}}</div>
            <label>Price</label>
            <div>{{item.price}}</div>
          </div>
          <div>
            <button class="btn blue" @click="reset">Remove</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { required, email, minLength, sameAs } from "vuelidate/lib/validators";
import { db } from "@/firebase/init";
import firebase from "firebase";
import "firebase/firestore";

export default {
  name: "WishList",
  data() {
    return {
      name: null,
      description: null,
      link: null,
      price: null,
      feedback: null,
      wishList: [],
      currentUserId: null,
    };
  },
  validations: {
    name: {
      required,
    },
    description: {
      required,
    },
  },
  methods: {
    addToWishList() {
      if (this.name && this.description && this.currentUserId) {
        this.feedback = null;
        const gift = {
          name: this.name,
          description: this.description,
          link: this.link,
          price: this.price,
          creator: this.currentUserId,
          owner: null,
          projects: [],
        };

        db.collection("gifts")
          .add(gift)
          .then((docRef) => {
            this.reset();
            this.wishList.unshift({ ...gift, id: docRef.id });
            console.log(this.wishList);
          })
          .catch((err) => {
            console.log(err);
            this.feedback = err.message;
          });
      }
    },
    reset() {
      this.name = null;
      this.description = null;
      this.link = null;
      this.price = null;
    },
  },
  created() {
    this.currentUserId = firebase.auth().currentUser.uid;
    db.collection("gifts")
      .where("creator", "==", this.currentUserId)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          this.wishList.push({ ...doc.data(), id: doc.id });
        });
      })
      .catch((err) => {
        console.log(err);
        this.feedback = err.message;
      });
  },
};
</script>

<style scoped>
.wish-list {
  max-width: 800px;
  margin-top: 50px;
}

.wish-list h2 {
  font-size: 2.4em;
}

.wish-list .field {
  margin-bottom: 0.5em;
}

.wish-list .validation-text {
  margin-left: 0.5em;
}

.wish-list .btn {
  margin: 1em;
  width: 10em;
}

.flex-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>