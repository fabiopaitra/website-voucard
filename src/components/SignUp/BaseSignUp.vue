<template lang="pug">  
.column.hero.is-fullheight
  .hero-body
    .column.is-8.is-offset-2
      h2.title.is-4 Seja um dos primeiros a testar
      h3.subtitle.is-6 Sem necessidade de comprovação de crédito. Apenas análise cadastral.
      .content
        form(@submit.prevent='newUser')
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
              the-mask.input.is-info(mask='###.###.###-##', type='text', masked=true, placeholder='Inserir meu CPF', v-model='taxID')
              span.icon.is-small.is-left
                i.fas.fa-id-card
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
            ul.help
              li De preferência números letras
              li Evite combinações fáceis ou parte dos seus documentos
              li Não use números em sequência
          .field  
            .buttons.control
            input.button.is-primary.is-fullwidth.is-large(type='submit', value='Quero meu cartão')
          p.help.is-danger(v-if='feedback') {{ feedback }}
          p.is-size-7 Ao criar uma conta do Voucard, você concorda em aceitar os termos de serviço do cliente da Voucard.
          hr
          p.is-size-7 Estamos comprometidos com sua privacidade. A Voucard usa as informações que você nos fornece para contatá-lo com relação aos nossos conteúdos, produtos e serviços relevantes. Você pode cancelar a assinatura dessas comunicações quando quiser. Para mais informações, confira nossa Política de privacidade.




</template>

<script>
import db from '@/firebase/init';
import firebase from 'firebase';
import { TheMask } from 'vue-the-mask';

export default {
  name: 'BaseSignUp',
  components: {
    TheMask,
  },
  data() {
    return {
      email: null,
      firstName: null,
      lastName: null,
      taxID: null,
      feedback: null,
      password: null,
      status: 'created',
      user: firebase.auth().currentUser,
    };
  },
  created() {
    return {
      // user: firebase.auth().currentUser,
    };
  },
  mounted() {
    console.log(this.user.uid);
  },
  methods: {
    newUser() {
      if (this.email && this.firstName && this.lastName && this.taxID) {
        this.feedback = null;
        const ref = db.collection('users');
        ref.get().then((doc) => {
          if (doc.exists) {
            this.feedback = 'Este CPF já possui cadastro';
          } else {
            firebase
              .auth()
              .createUserWithEmailAndPassword(this.email, this.password)
              .catch((err) => {
                this.feedback = err.message;
              })
              .then(() => {
                db.collection('users')
                  .doc(firebase.auth().currentUser.uid)
                  .set({
                    email: this.email,
                    firstName: this.firstName,
                    lastName: this.lastName,
                    taxID: this.taxID,
                  })
                  .then(() => {
                    firebase.auth().currentUser.updateProfile({
                      displayName: this.firstName,
                    });
                  });
              })
              .then(() => {
                this.$router.push({ name: 'ConfirmEmail' });
              })
              .catch((err) => {
                this.feedback = err.message;
              });
          }
        });
      } else {
        this.feedback = 'Você deve preencher todos os campos';
      }
    },
  },
};
</script>