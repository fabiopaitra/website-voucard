<template lang="pug">
section.hero.is-fullheight.is-light
  .columns.is-marginless
    .column.is-fullheight.hero.is-link.is-bold.is-one-third
      .columns.section.is-centered
        .column.is-half
          router-link.navbar-item(:to="{ name: 'Home' }")
            img(src='@/assets/images/voucard-logo-darkbg.svg')
      .columns.hero-body
        .column.section.has-text-white.has-text-centered
          h1.subtitle.is-4 A Voucard vai ajudar milhares de imobiliárias fazer uma 
            strong.has-text-white melhor gestão dos canais 
            | todos os anos.
    .column
      .hero-head.columns
        .column.navbar
          .navbar-end
            p.navbar-item Já possui conta?
            span.navbar-item
              a.button.is-link.is-outlined
                span.icon
                  i.fa.fa-sign-in
                span Entrar

      .hero-body
        .columns.section
          .column.is-8.is-offset-2
            h2.title.is-4 Cria sua conta gratuita
            h3.subtitle.is-6 Gratuito para sempre. Sem necessidade de cartão de crédito.
            .content
              form(@submit.prevent='addEmail')
                .field.content
                  label.label Nome *
                  .control.has-icons-left
                    input.input.is-info(type='text', placeholder='João' v-model='firstName')
                    span.icon.is-small.is-left
                      i.fas.fa-user
                .field.content
                  label.label Sobrenome *
                  .control.has-icons-left
                    input.input.is-info(type='text', placeholder='Tribiane da Silva' v-model='lastName')
                    span.icon.is-small.is-left
                      i.fas.fa-user
                .field.content
                  label.label CPF *
                  .control.has-icons-left
                    the-mask.input.is-info(mask='###.###.###-##', type='text', masked=false, placeholder='Inserir meu CPF', v-model='taxID')
                    span.icon.is-small.is-left
                      i.fas.fa-user
                .field.content
                  label.label E-mail *
                  .control.has-icons-left
                    input.input.is-info(type='email', placeholder='Inserir meu E-mail' v-model='email')
                    span.icon.is-small.is-left
                      i.fas.fa-envelope
                .field.content
                  label.label Password *
                  .control.has-icons-left
                    input.input.is-info(type='password', placeholder='Inserir meu Password' v-model='password')
                    span.icon.is-small.is-left
                      i.fas.fa-key
                .field  
                  .buttons.control
                  input.button.is-primary.is-fullwidth(type='submit', value='Participar do beta')
                //- p.help.is-danger Email inválido
                p.is-size-7 Ao criar uma conta do Voucard, você concorda em aceitar os termos de serviço do cliente da Voucard.
                hr
                p.is-size-7 Estamos comprometidos com sua privacidade. A Voucard usa as informações que você nos fornece para contatá-lo com relação aos nossos conteúdos, produtos e serviços relevantes. Você pode cancelar a assinatura dessas comunicações quando quiser. Para mais informações, confira nossa Política de privacidade.




</template>

<script>
import db from '@/firebase/init';
import { TheMask } from 'vue-the-mask';

export default {
  name: 'BaseSignUp',
  components: { TheMask },
  data() {
    return {
      email: null,
      firstName: null,
      lastName: null,
      password: null,
      feedback: null,
      taxID: null,
    };
  },
  methods: {
    newUser() {
      if (this.email || this.firstName || this.lastName || this.password) {
        this.feedback = null;
        db.collection('users')
          .add({
            email: this.email,
            firstName: this.firstName,
            lastName: this.lastName,
            password: this.password,
          })
          .then(() => {});
      }
    },
    else() {
      this.feedback = 'Insira seu e-mail';
    },
  },
};
</script>