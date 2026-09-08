<script setup>
import { computed } from 'vue'
import { useProfile } from '../composables/useProfile.js'
import { useExercises } from '../composables/useExercises.js'
import { exerciseCategories } from '../constants/exerciseCategories.js'

const { profile, isProfileComplete } = useProfile()
const { exercises } = useExercises()

const completedCount = computed(() => exercises.value.filter((exercise) => exercise.done).length)

const progressPercent = computed(() => {
  if (exercises.value.length === 0) return 0
  return Math.round((completedCount.value / exercises.value.length) * 100)
})

const categoryBreakdown = computed(() =>
  exerciseCategories
    .map((category) => ({
      ...category,
      count: exercises.value.filter((exercise) => exercise.category === category.value).length,
    }))
    .filter((category) => category.count > 0),
)

const averageEffort = computed(() => {
  const rated = exercises.value.filter((exercise) => exercise.done && exercise.effort !== null)
  if (rated.length === 0) return null
  const total = rated.reduce((sum, exercise) => sum + exercise.effort, 0)
  return (total / rated.length).toFixed(1)
})
</script>

<template>
  <h1>Hem</h1>

  <section v-if="isProfileComplete">
    <h2>Hej {{ profile.name }}</h2>
  </section>
  <section v-else>
    <p><RouterLink :to="{ name: 'profile' }">Gå till profil</RouterLink> för att komma igång.</p>
  </section>

  <section v-if="exercises.length > 0">
    <h2>Framsteg</h2>
    <div class="progress-track">
      <div class="progress-fill" :style="{ width: progressPercent + '%' }"></div>
    </div>
    <p>{{ completedCount }} av {{ exercises.length }} övningar klara ({{ progressPercent }}%)</p>
    <p v-if="averageEffort">Genomsnittlig ansträngning: {{ averageEffort }} / 5</p>
  </section>
  <section v-else>
    <h2>Kom igång</h2>
    <p>Du har inga övningar ännu.</p>
  </section>

  <section v-if="categoryBreakdown.length > 0">
    <h2>Fördelning</h2>
    <ul>
      <li v-for="category in categoryBreakdown" :key="category.value">
        {{ category.icon }} {{ category.label }}: {{ category.count }}
      </li>
    </ul>
  </section>

  <section>
    <h2>Genvägar</h2>
    <div class="shortcuts">
      <RouterLink :to="{ name: 'program' }" class="shortcut-card">Lägg till övning</RouterLink>
      <RouterLink :to="{ name: 'profile' }" class="shortcut-card">Uppdatera profil</RouterLink>
    </div>
  </section>
</template>

<style scoped>
.progress-track {
  background-color: var(--color-primary-light);
  border-radius: var(--radius);
  height: 0.75rem;
  overflow: hidden;
}

.progress-fill {
  background-color: var(--color-primary);
  height: 100%;
  transition: width 0.3s ease;
}

ul {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
}

.shortcuts {
  display: flex;
  gap: var(--space-3);
}

.shortcut-card {
  flex: 1;
  text-align: center;
  padding: var(--space-3);
  background-color: var(--color-primary-light);
  border-radius: var(--radius);
  text-decoration: none;
  font-weight: 500;
}
</style>
