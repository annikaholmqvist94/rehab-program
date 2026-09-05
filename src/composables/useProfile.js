import { reactive, computed } from 'vue'

const profile = reactive({
  name: '',
  goal: '',
  difficulty: 'nybörjare',
})

const isProfileComplete = computed(() => profile.name.trim().length > 0)

export function useProfile() {
  return { profile, isProfileComplete }
}