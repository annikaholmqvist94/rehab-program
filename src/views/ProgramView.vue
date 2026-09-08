<script setup>
import { reactive, ref } from 'vue'
import { useExercises } from '../composables/useExercises.js'
import { useProfile } from '../composables/useProfile.js'
import { exerciseCategories, effortLevels, getCategory } from '../constants/exerciseCategories.js'

const { exercises, addExercise, updateExercise, removeExercise, toggleDone } = useExercises()
const { isProfileComplete } = useProfile()

function emptyForm() {
  return { name: '', sets: null, reps: null, note: '', category: exerciseCategories[0].value }
}

const newExercise = reactive(emptyForm())
const editingId = ref(null)

function handleSubmit() {
  if (editingId.value === null) {
    addExercise(newExercise)
  } else {
    updateExercise(editingId.value, newExercise)
    editingId.value = null
  }
  Object.assign(newExercise, emptyForm())
}

function startEdit(exercise) {
  editingId.value = exercise.id
  Object.assign(newExercise, {
    name: exercise.name,
    sets: exercise.sets,
    reps: exercise.reps,
    note: exercise.note,
    category: exercise.category,
  })
}

function cancelEdit() {
  editingId.value = null
  Object.assign(newExercise, emptyForm())
}

function confirmRemove(id) {
  if (confirm('Ta bort övningen? Det går inte att ångra.')) {
    if (editingId.value === id) {
      cancelEdit()
    }
    removeExercise(id)
  }
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
      <h2>{{ editingId === null ? 'Lägg till övning' : 'Redigera övning' }}</h2>
      <form @submit.prevent="handleSubmit">
        <label>
          Övning
          <input v-model="newExercise.name" type="text" required />
        </label>

        <label>
          Kategori
          <select v-model="newExercise.category">
            <option v-for="category in exerciseCategories" :key="category.value" :value="category.value">
              {{ category.icon }} {{ category.label }}
            </option>
          </select>
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

        <div>
          <button type="submit">{{ editingId === null ? 'Lägg till övning' : 'Spara ändringar' }}</button>
          <button v-if="editingId !== null" type="button" @click="cancelEdit">Avbryt</button>
        </div>
      </form>
    </section>

    <section>
      <h2>Dina övningar</h2>

      <p v-if="exercises.length === 0">Inga övningar tillagda ännu.</p>

      <ul v-else>
        <li v-for="exercise in exercises" :key="exercise.id">
          <div>
            <span>{{ getCategory(exercise.category)?.icon }}</span>
            <RouterLink :to="{ name: 'exercise-detail', params: { id: exercise.id } }">
              {{ exercise.name }}
            </RouterLink>
            ({{ exercise.sets }}x{{ exercise.reps }})
            <span v-if="exercise.done">✓ Klar</span>

            <label v-if="exercise.done">
              Ansträngning
              <select v-model="exercise.effort">
                <option :value="null" disabled>Välj...</option>
                <option v-for="level in effortLevels" :key="level.value" :value="level.value">
                  {{ level.label }}
                </option>
              </select>
            </label>
          </div>

          <div>
            <button type="button" @click="toggleDone(exercise.id)">
              {{ exercise.done ? 'Ångra' : 'Markera klar' }}
            </button>
            <button type="button" @click="startEdit(exercise)">Redigera</button>
            <button type="button" @click="confirmRemove(exercise.id)">Ta bort</button>
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

form > div {
  display: flex;
  gap: var(--space-2);
}

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
