<template lang="pug">
.column.hero.is-fullheight
  //- TODO fix .hero-body.has-text-centered(v-if='profile')
  .hero-body.has-text-centered
    .column.is-8.is-offset-2
      h2.title.is-size-1 Olá, {{ profile.firstName }}.
      h3.subtitle.is-3.is-spaced Por favor, verifique seu e-mail.
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
    db.collection('users')
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