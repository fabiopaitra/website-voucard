<template lang="pug">
.navbar.is-dark(role="navigation", aria-label="main navigation")
  .container
    .navbar-brand
      router-link.navbar-item(:to="{ name: 'Home' }")
        img(src='@/assets/images/voucard-logo-darkbg.svg')
      .navbar-item.is-hidden-desktop
        .columns.is-mobile
          .column
            router-link.button.is-primary(:to="{ name: 'SignUp' }") 
              strong Quero meu cartão
      a.navbar-burger(role='button', aria-label='menu', aria-expanded='false', data-target='navbarBasicExample')
        span(aria-hidden='true')
        span(aria-hidden='true')
        span(aria-hidden='true')    
    .navbar-menu
      .navbar-start
      .navbar-end
        .navbar-item
          .buttons
            a.button.is-primary.is-outlined(disabled)
              strong Log in
            router-link.button.is-primary(:to="{ name: 'SignUp' }") 
              strong Quero meu cartão

</template>

<script>
export default {
  name: 'mainHeader',
};
</script>
