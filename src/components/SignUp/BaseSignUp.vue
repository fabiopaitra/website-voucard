<template lang="pug">  
.column.hero.is-fullheight
  .hero-body
    .column.is-8.is-offset-2
      h2.title.is-4 Seja um dos primeiros a testar
      h3.subtitle.is-6 Sem necessidade de comprovação de crédito. Apenas análise cadastral.
      .content
        form(@submit.prevent='newUser')
          .field.content
            //- label.label Nome *
            .control.has-icons-left
              input.input.is-info(type='text', placeholder='Como você gostaria de ser chamado?' v-model='preferredName' @blur='$v.preferredName.$touch()' :class='{"is-danger" : $v.preferredName.$error}')
              span.icon.is-small.is-left
                i.fas.fa-user
              p.help.is-danger(v-if='$v.preferredName.$error') Precisamos do seu primeiro nome.
          .field.content
            //- label.label E-mail *
            .control.has-icons-left
              input.input.is-info(type='email', placeholder='E-mail' v-model='email' @blur='$v.email.$touch()' :class='{"is-danger" : $v.email.$error}' )
              span.icon.is-small.is-left
                i.fas.fa-envelope
              p.help.is-danger(v-if='$v.email.$error') Precisamos de um e-mail válido.
          .field.content
            //- label.label Password *
            .control.has-icons-left
              input.input.is-info(type='password', placeholder='Password' v-model='password' @blur='$v.password.$touch()' :class='{"is-danger" : $v.password.$error}' )
              span.icon.is-small.is-left
                i.fas.fa-key
              p.help.is-danger(v-if='$v.password.$error') O password deve ter pelo menos 6 caracteres.
          .field.content
            //- label.label Confirme seu Password *
            .control.has-icons-left
              input.input.is-info(type='password', placeholder='Confirme seu Password' v-model='confirmPassword' @blur='$v.confirmPassword.$touch()' :class='{"is-danger" : $v.confirmPassword.$error}' )
              span.icon.is-small.is-left
                i.fas.fa-key
              p.help.is-danger(v-if='$v.confirmPassword.$error') Os passwords devem coincidir.
            ul.help
              li De preferência números letras
              li Evite combinações fáceis ou parte dos seus documentos
              li Não use números em sequência
          .field  
            .buttons.control
            input.button.is-primary.is-fullwidth.is-large(type='submit', value='Quero meu cartão' :disabled='$v.$invalid')
          p.help.is-danger(v-if='feedback') {{ feedback }}
          p.is-size-7 Ao criar uma conta do VouCard, você concorda em aceitar os termos de serviço do cliente da VouCard.
          hr
          p.is-size-7 Estamos comprometidos com sua privacidade. A VouCard usa as informações que você nos fornece para contatá-lo com relação aos nossos conteúdos, produtos e serviços relevantes. Você pode cancelar a assinatura dessas comunicações quando quiser. Para mais informações, confira nossa Política de privacidade.




</template>

<script>
import db from '@/firebase/init';
import firebase from 'firebase';
import { TheMask } from 'vue-the-mask';
import { required, email, minLength, sameAs } from 'vuelidate/lib/validators';

export default {
  name: 'BaseSignUp',
  components: {
    TheMask,
  },
  data() {
    return {
      email: null,
      preferredName: null,
      taxID: null,
      feedback: null,
      password: null,
      confirmPassword: null,
      status: 'created',
      user: firebase.auth().currentUser,
    };
  },
  created() {
    return {
      // user: firebase.auth().currentUser,
    };
  },
  validations: {
    email: {
      required,
      email,
    },
    preferredName: {
      required,
    },
    password: {
      required,
      minLen: minLength(6),
    },
    confirmPassword: {
      required,
      sameAs: sameAs('password'),
    },
  },
  methods: {
    newUser() {
      const ref = db.collection('users');
      ref.get().then((doc) => {
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
                preferredName: this.preferredName,
                taxID: this.taxID,
                status: this.status,
              })
              .then(() => {
                const user = firebase.auth().currentUser;
                user
                  .sendEmailVerification()
                  .then((log) => {
                    console.log(log);
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              });
          })
          .then(() => {
            this.$router.push({ name: 'Registration' });
          })
          .catch((err) => {
            console.log(err);
          });
      });
    },
  },
};
</script>