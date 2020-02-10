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
              input.input.is-info(type='text', placeholder='Nome' v-model='firstName' @blur='$v.firstName.$touch()' :class='{"is-danger" : $v.firstName.$error}')
              span.icon.is-small.is-left
                i.fas.fa-user
              p.help.is-danger(v-if='$v.firstName.$error') Digite seu nome corretamente.
          .field.content
            //- label.label Sobrenome *
            .control.has-icons-left
              input.input.is-info(type='text', placeholder='Sobrenome Completo' v-model='lastName' @blur='$v.lastName.$touch()' :class='{"is-danger" : $v.lastName.$error}')
              span.icon.is-small.is-left
                i.fas.fa-user
              p.help.is-danger(v-if='$v.lastName.$error') Digite seu sobrenome corretamente.
          .field.content
            //- label.label CPF *
            .control.has-icons-left
              the-mask.input.is-info(mask='###.###.###-##', type='text', masked=true, placeholder='CPF', v-model='taxID' @blur.native='$v.taxID.$touch()' :class='{"is-danger" : $v.taxID.$error}')
              span.icon.is-small.is-left
                i.fas.fa-id-card
              p.help.is-danger(v-if='$v.taxID.$error') Seu CPF deve possuir 11 dígitos.
          .field.content
            //- label.label E-mail *
            .control.has-icons-left(:class='{"has-icons-right": $v.email.$error}')
              input.input.is-info(type='email', placeholder='E-mail' v-model='email' @blur='$v.email.$touch()' :class='{"is-danger" : $v.email.$error}' )
              span.icon.is-small.is-left
                i.fas.fa-envelope
              span.icon.is-small.is-right(v-if='$v.email.$error')
                i.fas.fa-exclamation-triangle
              p.help.is-danger(v-if='$v.email.$error') Insira um e-mail válido.
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
import axios from 'axios';

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
    firstName: {
      required,
    },
    lastName: {
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
    taxID: {
      required,
      minLen: minLength(14),
      // unique: (val) => {
      //   if (val === '') {
      //     console.log('entrou no true');
      //     return true;
      //   } else {
      //     console.log('entrou no false');
      // db.collection('users')
      //   .where('taxID', '==', val)
      //   .then((res) => {
      //     console.log(res);
      //     return false;
      // return axios
      //   .get('https://firestore.googleapis.com/v1/projects/vou-card/databases/users/taxID')
      //   .then((res) => {
      //     console.log(res);
      //   return false;
      // });
      // }
      // },
    },
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