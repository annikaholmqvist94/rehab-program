<script setup>
import { reactive } from 'vue'
import { useExercises } from '../composables/useExercises.js'
import { useProfile } from '../composables/useProfile.js'

const { exercises, addExercise, removeExercise, toggleDone } = useExercises()
const { isProfileComplete } = useProfile()

const newExercise = reactive({ name: '', sets: null, reps: null, note: '' })

function handleAddExercise() {
  addExercise(newExercise)
  Object.assign(newExercise, { name: '', sets: null, reps: null, note: '' })
}
</script>

<template>
  <h1>Mitt program</h1>

  <section v-if="!isProfileComplete">
    <h2>Profil krävs</h2>
    <p>Du behöver skapa en profil innan du kan bygga ditt program.</p>
    <RouterLink :to="{ name: 'profile' }">Gå till profil</RouterLink>
  </section>

  <template v-else>
    <section>
      <h2>Lägg till övning</h2>
      <form @submit.prevent="handleAddExercise">
        <label>
          Övning
          <input v-model="newExercise.name" type="text" required />
        </label>

        <label>
          Sets
          <input v-model.number="newExercise.sets" type="number" min="1" />
        </label>

        <label>
          Reps
          <input v-model.number="newExercise.reps" type="number" min="1" />
        </label>

        <label>
          Kommentar
          <input v-model="newExercise.note" type="text" placeholder="valfritt" />
        </label>

        <button type="submit">Lägg till övning</button>
      </form>
    </section>

    <section>
      <h2>Dina övningar</h2>

      <p v-if="exercises.length === 0">Inga övningar tillagda ännu.</p>

      <ul v-else>
        <li v-for="exercise in exercises" :key="exercise.id">
          <div>
            <RouterLink :to="{ name: 'exercise-detail', params: { id: exercise.id } }">
              {{ exercise.name }}
            </RouterLink>
            ({{ exercise.sets }}x{{ exercise.reps }})
            <span v-if="exercise.done">✓ Klar</span>
          </div>

          <div>
            <button type="button" @click="toggleDone(exercise.id)">
              {{ exercise.done ? 'Ångra' : 'Markera klar' }}
            </button>
            <button type="button" @click="removeExercise(exercise.id)">Ta bort</button>
          </div>
        </li>
      </ul>
    </section>
  </template>
</template>

<style scoped>
form { display: flex;
  flex-direction: column;
  gap: var(--space-3); }

label { display: flex; flex-direction: column; gap: var(--space-1); }

ul { list-style: none; display: flex; flex-direction: column; gap: var(--space-2); }

li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: var(--space-3);
  background-color: var(--color-primary-light);
  padding: var(--space-3);
  border-radius: var(--radius);
}

li > div:last-child {
  display: flex;
  gap: var(--space-2);
}
</style>
