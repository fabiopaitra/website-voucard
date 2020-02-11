<template lang="pug">
.column.hero.is-fullheight
  .hero-body.has-text-centered
    .column.is-8.is-offset-2
      h2.title.is-size-1 Tudo certo!
      p.title.is-size-1.has-text-success.is-spaced: i.fas.fa-check-circle.is-spaced 
      h3.subtitle.is-3.is-spaced Já estamos verificando seu cadastro.
      p.is-size-5 Se tudo estiver correto, enviaremos o cartão nas próximas semanas.
</template>

<script>
import db from '@/firebase/init';
import firebase, { auth } from 'firebase';

export default {
  name: 'BaseApproval',
};
</script>