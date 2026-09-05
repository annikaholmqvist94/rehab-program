import { computed } from 'vue'
import { useLocalStorage } from './useLocalStorage.js'

const profile = useLocalStorage('rehab-profile', {
  name: '',
  goal: '',
  difficulty: 'nybörjare',
})

const isProfileComplete = computed(() => profile.value.name.trim().length > 0)

export function useProfile() {
  return { profile, isProfileComplete }
}