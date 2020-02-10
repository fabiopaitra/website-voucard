<template lang="pug">
.column
  //- TODO .hero-body(v-if='this.profile') 
  .hero-body
    .column.is-8.is-offset-2
      h2.title.is-4 {{ user.displayName}}, vamos começar!
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
          h3.is-size-5.is-paddingless Documentos
          p Para completar seu cadastro, precisamos apenas do seu passaporte e uma selfie.
          .columns.is-mobile
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
            input.button.is-primary.is-fullwidth.is-large(type='submit', value='Solicitar meu VouCard')
          p.help.is-danger(v-if='feedback') {{ feedback }}
          p.is-size-7 Ao criar uma conta do VouCard, você concorda em aceitar os termos de serviço do cliente da VouCard.
          hr
          p.is-size-7 Estamos comprometidos com sua privacidade. A Voucard usa as informações que você nos fornece para contatá-lo com relação aos nossos conteúdos, produtos e serviços relevantes. Você pode cancelar a assinatura dessas comunicações quando quiser. Para mais informações, confira nossa Política de privacidade.




</template>

<script>
import db from '@/firebase/init';
import firebase from 'firebase';
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
      passportURL: null,
      selfie: {},
      selfieURL: null,
      file: null,
      status: 'registered',
      user: firebase.auth().currentUser,
    };
  },
  methods: {
    uploadPassport(event) {
      const file = event.target.files[0];
      const storageRef = firebase.storage().ref(`${this.user.uid}/passport-${file.name}`);
      const uploadTask = storageRef.put(file);
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          uploadTask.snapshot.ref.getDownloadURL().then((passportDownloadURL) => {
            this.passport = {
              passportURL: passportDownloadURL,
              name: file.name,
              type: file.type,
              size: file.size,
            };
          });
        },
        (err) => {
          // Handle unsuccessful uploads
          this.feedback = err.message;
        },
      );
    },
    uploadSelfie(event) {
      const file = event.target.files[0];
      const storageRef = firebase.storage().ref(`${this.user.uid}/selfie-${file.name}`);
      const uploadTask = storageRef.put(file);
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          uploadTask.snapshot.ref.getDownloadURL().then((selfieDownloadURL) => {
            this.selfie = {
              selfieURL: selfieDownloadURL,
              name: file.name,
              type: file.type,
              size: file.size,
            };
          });
        },
        (err) => {
          // Handle unsuccessful uploads
          this.feedback = err.message;
        },
      );
    },
    newUser() {
      if (this.phoneNumber && this.DOB && this.CEP && this.address) {
        db.collection('users')
          .doc(this.user.uid)
          .set(
            {
              address: this.address,
              phoneNumber: this.phoneNumber,
              CEP: this.CEP,
              DOB: this.DOB,
              selfieURL: this.selfie.selfieURL,
              passportURL: this.passport.passportURL,
            },
            {
              merge: true,
            },
          )
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
      .doc(this.user.uid)
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