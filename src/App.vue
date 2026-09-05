<script setup>
</script>

<template>
  <header>
    <nav>
      <RouterLink :to="{ name: 'home' }">Hem</RouterLink>
      <RouterLink :to="{ name: 'program' }">Program</RouterLink>
      <RouterLink :to="{ name: 'profile' }">Profil</RouterLink>
    </nav>
  </header>

  <main>
    <RouterView />
  </main>
</template>

<style scoped>
</style>