import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProgramView from '../views/ProgramView.vue'
import ExerciseDetailView from '../views/ExerciseDetailView.vue'
import ProfileView from '../views/ProfileView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/program', name: 'program', component: ProgramView },
    { path: '/program/:id', name: 'exercise-detail', component: ExerciseDetailView, props: true },
    { path: '/profil', name: 'profile', component: ProfileView },
  ],
})

export default router
