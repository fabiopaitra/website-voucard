<template lang="pug">
.column.is-paddingless.is-one-third
  .hero.is-fullheight.is-link.is-bold.is-hidden-mobile
    .level.section
      .level-item
        router-link(:to="{ name: 'Home' }")
          img(src='@/assets/images/voucard-logo-darkbg.svg')      
    .hero-body
      .section.has-text-white.has-text-centered
        h1.subtitle.is-4 A Voucard vai ajudar milhares de pessoas realizarem compras no exterior, com a menor taxa de IOF e pagando apenas uma vez.
  .navbar.is-dark.is-hidden-tablet(role="navigation", aria-label="main navigation")
    .level
      .level-item
        .navbar-brand
          router-link.navbar-item(:to="{ name: 'Home' }")
            img(src='@/assets/images/voucard-logo-darkbg.svg')

  
</template>

<script>
export default { name: 'BaseHeaderSignup' };
</script>

<style>
</style>