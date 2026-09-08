export const exerciseCategories = [
  { value: 'ben', label: 'Ben', icon: '🦵' },
  { value: 'rygg', label: 'Rygg', icon: '🦴' },
  { value: 'axel-arm', label: 'Axel/Arm', icon: '💪' },
  { value: 'core', label: 'Core/Bål', icon: '🔥' },
  { value: 'rorlighet', label: 'Rörlighet', icon: '🤸' },
]

export function getCategory(value) {
  return exerciseCategories.find((category) => category.value === value)
}

export const effortLevels = [
  { value: 1, label: '1 – Mycket lätt' },
  { value: 2, label: '2 – Lätt' },
  { value: 3, label: '3 – Måttlig' },
  { value: 4, label: '4 – Tung' },
  { value: 5, label: '5 – Maximal' },
]
