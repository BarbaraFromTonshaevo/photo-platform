<template>
  <div>
    <header class="header">header</header>
    <slot />
    <footer class="footer">footer</footer>
  </div>
</template>

<style lang="scss">
.footer {
  color: var(--accent);
}
</style>
