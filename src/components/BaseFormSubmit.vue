<template lang="pug">
.content
  form#app(@submit.prevent='addEmail')
    .field.has-addons.is-hidden-mobile
      .control.is-expanded.has-icons-left
        label
          input.input.is-primary.is-medium(type='email', v-model='email', name='email', placeholder='E-mail')
          span.icon.is-small.is-left
            i.fas.fa-envelope
        p.help.is-danger(v-if='feedback') Email inválido
      .control
        label
          input.button.is-primary.is-medium(type='submit', value='Quero meu convite')
  form(@submit.prevent='addEmail')
    .field.is-hidden-tablet
      .control.is-expanded.has-icons-left
        label
          input.input.is-primary.is-medium(type='email', v-model='email', placeholder='E-mail')
          span.icon.is-small.is-left
            i.fas.fa-envelope
        .buttons
        input.button.is-primary.is-fullwidth.is-medium(type='submit', value='Quero meu convite')
      p.help.is-danger(v-if='feedback') Email inválido
</template>

<script>
import db from '@/firebase/init';

export default {
  name: 'BaseFormSubmit',
  data() {
    return {
      email: null,
      feedback: null,
    };
  },
  methods: {
    addEmail() {
      if (this.email) {
        this.feedback = null;
        window.dataLayer.push({
          event: 'new_subscriber',
          ecommerce: {
            currencyCode: 'BRL',
            checkout: {
              actionField: { step: 1, option: 'Sign Up' },
              products: {
                name: 'Beta Users Form',
                id: Math.random(),
                price: 10.25,
                brand: 'Voucard',
                category: 'Email Subscription',
                variant: 'Starter Beta',
              },
            },
          },
        });
        this.$router.push({ name: 'Home' }).catch(err => {
          console.log(err);
          // TODO SEND EVENT TO TAG MANAGER
          // TODO OPEN THANK YOU MODAL
          // TODO CHECK IF USER IS ALREADY SIGN UP
          // TODO CHECK IF EMAIL IS ALREADY REGISTERED
        });
      } else {
        this.feedback = 'Insira seu e-mail';
      }
    },
  },
};
</script>