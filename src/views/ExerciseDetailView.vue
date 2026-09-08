<script setup>
import { computed } from 'vue'
import { useExercises } from '../composables/useExercises.js'
import { getCategory, effortLevels } from '../constants/exerciseCategories.js'

const props = defineProps(['id'])
const { getExerciseById, toggleDone, removeExercise } = useExercises()

const exercise = computed(() => getExerciseById(props.id))

function confirmRemove(id) {
  if (confirm('Ta bort övningen? Det går inte att ångra.')) {
    removeExercise(id)
  }
}

function effortLabel(value) {
  return effortLevels.find((level) => level.value === value)?.label ?? 'Ej satt'
}
</script>

<template>
  <section v-if="exercise">
    <h1>{{ getCategory(exercise.category)?.icon }} {{ exercise.name }}</h1>
    <p>{{ getCategory(exercise.category)?.label }}</p>
    <p>{{ exercise.sets }} sets x {{ exercise.reps }} reps</p>
    <p v-if="exercise.note">Kommentar: {{ exercise.note }}</p>
    <p>Status: {{ exercise.done ? 'Klar' : 'Ej klar' }}</p>
    <p v-if="exercise.done">Ansträngning: {{ effortLabel(exercise.effort) }}</p>

    <button type="button" @click="toggleDone(exercise.id)">
      {{ exercise.done ? 'Ångra' : 'Markera klar' }}
    </button>
    <button type="button" @click="confirmRemove(exercise.id)">Ta bort</button>
  </section>

  <section v-else>
    <h1>Övningen hittades inte</h1>
    <p>Den kan ha tagits bort.</p>
  </section>

  <RouterLink :to="{ name: 'program' }">Tillbaka till programmet</RouterLink>
</template>

<style scoped>
</style>
