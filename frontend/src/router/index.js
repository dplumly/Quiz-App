import { createRouter, createWebHistory } from "vue-router";
import Attract from "@/views/Attract.vue";
import Instructions from "@/views/Instructions.vue";
import Quiz from "@/views/Quiz.vue";
import Results from "@/views/Results.vue";

const routes = [
  { path: "/", name: "attract", component: Attract },
  { path: "/instructions", name: "instructions", component: Instructions },
  { path: "/quiz", name: "quiz", component: Quiz },
  { path: "/results", name: "results", component: Results },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;