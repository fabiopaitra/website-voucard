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
      .hero-body(v-if='this.profile')
        .column.is-8.is-offset-2
          h2.title.is-4 {{ profile.firstName}}, vamos começar!
          h3.subtitle.is-6 Para continuar, preencha as informações abaixo.
          .content
            form(@submit.prevent='newUser')
              .field.content
                label.label Celular *
                .control.has-icons-left
                  the-mask.input.is-info(mask='## #####-####', type='tel', masked=true, placeholder='11 99999-9999' v-model='phoneNumber')
                  span.icon.is-small.is-left
                    i.fas.fa-mobile-alt
              .field.content
                label.label Data de nascimento *
                .control.has-icons-left
                  the-mask.input.is-info(mask='##/##/####', type='text', pattern='[0-9\/]*', masked=true, placeholder='99/99/9999', v-model='DOB')
                  span.icon.is-small.is-left
                    i.fas.fa-id-card
              .field.content
                label.label CEP *
                .control.has-icons-left
                  the-mask.input.is-info(type='text', pattern='[0-9-]*', mask='#####-###' masked=true placeholder='Inserir meu CEP' v-model='CEP')
                  span.icon.is-small.is-left
                    i.fas.fa-map-marker-alt
              .field.content
                label.label Endereço *
                .control.has-icons-left
                  input.input.is-info(type='text', placeholder='Inserir meu Endereço' v-model='address')
                  span.icon.is-small.is-left
                    i.fas.fa-map
              .field.content
                label.label Password *
                .control.has-icons-left
                  input.input.is-info(type='password', placeholder='Inserir meu Password' v-model='password')
                  span.icon.is-small.is-left
                    i.fas.fa-key
                ul.help
                  li Apenas números
                  li Evite combinações fáceis ou parte dos seus documentos
                  li Não use números em sequência
              h3.is-size-5.is-paddingless Documentos
              p Para completar seu cadastro, precisamos apenas do seu passaporte e uma selfie.
              .columns
                .column
                  .field
                    .file.is-boxed.has-name
                      label.file-label
                        input.file-input(type='file', v-once='passport', @change='uploadPassport')
                        span.file-cta
                          span.file-icon
                            i.fas.fa-upload
                          span.file-label
                            | Passaporte
                        span.file-name {{ passport.name }}
                .column
                  .field
                    .file.is-boxed.has-name
                      label.file-label
                        input.file-input(type='file', name='selfie', @change='uploadSelfie')
                        span.file-cta
                          span.file-icon
                            i.fas.fa-upload
                          span.file-label
                            | Selfie
                        span.file-name {{ selfie.name }}


              .field  
                .buttons.control
                input.button.is-primary.is-fullwidth.is-large(type='submit', value='Solicitar meu Voucard')
              p.help.is-danger(v-if='feedback') {{ feedback }}
              p.is-size-7 Ao criar uma conta do Voucard, você concorda em aceitar os termos de serviço do cliente da Voucard.
              hr
              p.is-size-7 Estamos comprometidos com sua privacidade. A Voucard usa as informações que você nos fornece para contatá-lo com relação aos nossos conteúdos, produtos e serviços relevantes. Você pode cancelar a assinatura dessas comunicações quando quiser. Para mais informações, confira nossa Política de privacidade.




</template>

<script>
import db from '@/firebase/init';
// import firebase from 'firebase';
import * as firebase from 'firebase';
import { TheMask } from 'vue-the-mask';
import BaseSignUp from '@/components/SignUp/BaseSignUp.vue';

export default {
  name: 'BaseRegistration',
  components: { TheMask, BaseSignUp },
  data() {
    return {
      address: null,
      phoneNumber: null,
      CEP: null,
      DOB: null,
      feedback: null,
      password: null,
      profile: null,
      passport: {},
      selfie: {},
      file: null,
    };
  },
  methods: {
    uploadPassport(event) {
      const file = event.target.files[0];
      console.log(file);
      const storageRef = firebase.storage().ref(`${firebase.auth().currentUser.uid}/${file.name}`);
      storageRef.put(file);
      this.passport = { name: file.name, type: file.type, size: file.size };
    },
    uploadSelfie(event) {
      const file = event.target.files[0];
      console.log(file);
      const storageRef = firebase.storage().ref(`${firebase.auth().currentUser.uid}/${file.name}`);
      storageRef.put(file);
      this.selfie = { name: file.name, type: file.type, size: file.size };
    },
    newUser() {
      if (this.phoneNumber && this.DOB && this.CEP && this.address && this.password) {
        const ref = db.collection('users').doc(this.DOB);
        ref
          .get()
          .then((doc) => {
            if (doc.exists) {
              this.feedback = 'Este CPF já possui cadastro';
            } else {
              db.collection('users')
                .doc(firebase.auth().currentUser.uid)
                .set(
                  {
                    address: this.address,
                    phoneNumber: this.phoneNumber,
                    CEP: this.CEP,
                    DOB: this.DOB,
                  },
                  { merge: true },
                );
            }
          })
          .catch((err) => {
            this.feedback = err;
          });
      } else {
        this.feedback = 'Você deve preencher todos os campos';
      }
    },
  },
  created() {
    const ref = db.collection('users');
    ref
      .doc(firebase.auth().currentUser.uid)
      .get()
      .then((user) => {
        this.profile = user.data();
        if (this.profile) {
          console.log('profile com info');
          this.DOB = this.profile.DOB;
          this.CEP = this.profile.CEP;
          this.address = this.profile.address;
          this.phoneNumber = this.profile.phoneNumber;
        } else {
          console.log('profile sem info');
        }
      });
  },
};
</script>