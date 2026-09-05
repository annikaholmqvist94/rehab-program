<script setup>
import { computed } from 'vue'
import { useProfile } from '../composables/useProfile.js'
import { useExercises } from '../composables/useExercises.js'

const { profile, isProfileComplete } = useProfile()
const { exercises } = useExercises()

const completedCount = computed(() => exercises.value.filter(e => e.done).length)
</script>

<template>

  <h1>Hem</h1>
  <section v-if="isProfileComplete">
    <h2>Hej {{ profile.name }}</h2>
  </section>
  <section v-else>
    <p><RouterLink :to="{ name: 'profile' }">Gå till profil</RouterLink> för att komma igång.</p>
  </section>
  <section>
    <h2>Status</h2>
    <p>Du har {{ exercises.length }} övningar totalt.</p>
    <p>{{ completedCount }} av dem är klara.</p>
  </section>

</template>

<style scoped>

</style>