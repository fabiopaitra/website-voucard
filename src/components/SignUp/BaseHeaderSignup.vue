<template lang="pug">
.column.hero.is-fullheight.is-link.is-bold.is-one-third
  .hero-head
    router-link.navbar-item(:to="{ name: 'Home' }")
      img(src='@/assets/images/voucard-logo-darkbg.svg')      
  .hero-body
    .section.has-text-white.has-text-centered
      h1.subtitle.is-4 A Voucard vai ajudar milhares de pessoas realizarem compras no exterior, com a menor taxa de IOF e pagando apenas uma vez.

  
</template>

<script>
export default { name: 'BaseHeaderSignup' };
</script>

<style>
</style>