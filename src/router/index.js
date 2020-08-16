import Vue from 'vue';
import VueRouter from 'vue-router';
import firebase from 'firebase';
import Home from '../views/Home.vue';
import Signup from "@/views/Signup.vue";
import Login from "@/views/Login.vue";
import ProjectList from "@/views/ProjectList.vue";
import WishList from "@/views/WishList.vue";
import NewProject from "@/views/NewProject.vue";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: "/signup",
    name: "Signup",
    component: Signup,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/project-list",
    name: "ProjectList",
    component: ProjectList,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/wish-list",
    name: "WishList",
    component: WishList,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/new-project",
    name: "NewProject",
    component: NewProject,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  routes
});

router.beforeEach((to, from, next) => {
  // check to see if routs requires auth
  if (to.matched.some(rec => rec.meta.requiresAuth)) {
    // check auth state of user
    let user = firebase.auth().currentUser;
    if (user) {
      // user signed in, proceed to route
      next();
    } else {
      // no user signed in, redirect to login
      next({ name: 'Login' });
    }
  } else {
    next();
  }
})

export default router
