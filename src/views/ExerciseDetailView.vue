<script setup>
import { computed } from 'vue'
import { useExercises } from '../composables/useExercises.js'

const props = defineProps(['id'])
const { getExerciseById, toggleDone, removeExercise } = useExercises()

const exercise = computed(() => getExerciseById(props.id))
</script>

<template>
  <section v-if="exercise">
    <h1>{{ exercise.name }}</h1>
    <p>{{ exercise.sets }} sets x {{ exercise.reps }} reps</p>
    <p v-if="exercise.note">Kommentar: {{ exercise.note }}</p>
    <p>Status: {{ exercise.done ? 'Klar' : 'Ej klar' }}</p>

    <button type="button" @click="toggleDone(exercise.id)">
      {{ exercise.done ? 'Ångra' : 'Markera klar' }}
    </button>
    <button type="button" @click="removeExercise(exercise.id)">Ta bort</button>
  </section>

  <section v-else>
    <h1>Övningen hittades inte</h1>
    <p>Den kan ha tagits bort.</p>
  </section>

  <RouterLink :to="{ name: 'program' }">Tillbaka till programmet</RouterLink>
</template>

<style scoped>
</style>
