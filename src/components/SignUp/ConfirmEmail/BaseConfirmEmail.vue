<template lang="pug">
section.columns.is-marginless
    .column.hero.is-fullheight.is-link.is-bold.is-one-third
      .hero-head
        router-link.navbar-item(:to="{ name: 'Home' }")
          img(src='@/assets/images/voucard-logo-darkbg.svg')      
      .hero-body
        .section.has-text-white.has-text-centered
          h1.subtitle.is-4 A Voucard vai ajudar milhares de pessoas realizarem compras no exterior, com a menor taxa de IOF e pagando apenas uma vez.
    .column.hero.is-fullheight
      .hero-head
        .navbar.navbar-end
          p.navbar-item Já possui conta?
          span.navbar-item
            a.button.is-link.is-outlined
              span.icon: i.fa.fa-sign-in
              span Entrar
      .hero-body.has-text-centered(v-if='profile')
        .column.is-8.is-offset-2
          h2.title.is-size-1 Olá, {{ profile.firstName }}.
          h3.subtitle.is-3.is-spaced Por favor, confirme seu e-mail.
          p.title.is-size-1.has-text-success.is-spaced: i.fas.fa-check-circle.is-spaced
          p.subtitle.is-size-5.is-spaced Enviamos um e-mail para você no {{ profile.email }}. 
          p.is-size-5 Verifique sua caixa de entrada e siga as instruções de validação por e-mail.
          .section: router-link.has-text-centered(:to="{ name: 'Registration' }") Test link for backend validation (continue to registration)
</template>

<script>
import db from '@/firebase/init';
import firebase, { auth } from 'firebase';

export default {
  name: 'BaseApproval',
  props: {},
  data() {
    return {
      profile: null,
    };
  },
  methods: {},
  created() {
    const ref = db.collection('users');
    ref
      .doc(firebase.auth().currentUser.uid)
      .get()
      .then((user) => {
        this.profile = user.data();
      })
      .catch((err) => {
        this.feedback = err.message;
      });
  },
};
</script>