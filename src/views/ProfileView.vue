<script setup>
import { useProfile } from '../composables/useProfile.js'

const { profile, isProfileComplete } = useProfile()
</script>

<template>
  <h1>Profil</h1>

  <p v-if="isProfileComplete">Hej {{ profile.name }}! Ditt mål: {{ profile.goal || 'inget satt än' }}.</p>
  <p v-else>Fyll i ditt namn för att komma igång med programmet.</p>

  <section>
    <h2>Dina uppgifter</h2>
    <form @submit.prevent>
      <label>
        Namn
        <input v-model="profile.name" type="text" />
      </label>

      <label>
        Mål
        <input v-model="profile.goal" type="text" placeholder="t.ex. återgå till löpning" />
      </label>

      <label>
        Svårighetsnivå
        <select v-model="profile.difficulty">
          <option value="nybörjare">Nybörjare</option>
          <option value="medel">Medel</option>
          <option value="avancerad">Avancerad</option>
        </select>
      </label>
    </form>
  </section>
</template>

<style scoped>
</style>
