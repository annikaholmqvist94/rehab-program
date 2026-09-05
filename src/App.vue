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
header {
  background-color: var(--color-surface);
  border-bottom: 1px solid var(--color-border);
  padding: var(--space-3) var(--space-4);
}

nav {
  display: flex;
  gap: var(--space-4);
}

nav a {
  text-decoration: none;
  font-weight: 500;
}

nav a.router-link-active {
  color: var(--color-text);
  border-bottom: 2px solid var(--color-primary);
}

main {
  max-width: 40rem;
  margin: 0 auto;
  padding: var(--space-4);
}
</style>