import { useLocalStorage } from './useLocalStorage.js'

// Modul-nivå: skapas en gång, delas av alla komponenter som anropar useExercises()
const exercises = useLocalStorage('rehab-exercises', [])

let nextId =
  exercises.value.length === 0 ? 1 : Math.max(...exercises.value.map((exercise) => exercise.id)) + 1

function addExercise({ name, sets, reps, note }) {
  exercises.value.push({
    id: nextId++,
    name,
    sets,
    reps,
    note,
    done: false,
  })
}

function removeExercise(id) {
  exercises.value = exercises.value.filter((exercise) => exercise.id !== id)
}

function toggleDone(id) {
  const exercise = exercises.value.find((exercise) => exercise.id === id)
  if (exercise) {
    exercise.done = !exercise.done
  }
}

function getExerciseById(id) {
  return exercises.value.find((exercise) => exercise.id === Number(id))
}

export function useExercises() {
  return {
    exercises,
    addExercise,
    removeExercise,
    toggleDone,
    getExerciseById,
  }
}
