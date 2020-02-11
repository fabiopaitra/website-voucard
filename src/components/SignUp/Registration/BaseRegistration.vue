<template lang="pug">
.column
  .hero-body
    .column.is-8.is-offset-2
      h2.title.is-4 Olá, vamos continuar.
      h3.subtitle.is-6 Para concluir seu cadastro, preencha as informações abaixo.
      .content
        form(@submit.prevent='newUser')
          .field.content
            //- label.label Celular *
            .control.has-icons-left
              the-mask.input.is-info(mask='## #####-####', type='tel', masked=true, placeholder='Celular' v-model='phoneNumber' @blur.native='$v.phoneNumber.$touch()' :class='{"is-danger" : $v.phoneNumber.$error}')
              span.icon.is-small.is-left
                i.fas.fa-mobile-alt
              p.help.is-danger(v-if='$v.phoneNumber.$error') Precisamos do seu telefone celular
          .field.content
            //- label.label Data de nascimento *
            .control.has-icons-left
              the-mask.input.is-info(mask='##/##/####', type='tel', masked=true, placeholder='Data de nascimento', v-model='DOB' @blur.native='$v.DOB.$touch()' :class='{"is-danger" : $v.DOB.$error}')
              span.icon.is-small.is-left
                i.fas.fa-id-card
              p.help.is-danger(v-if='$v.DOB.$error') Precisamos da sua data de nascimento.
              
          .field.content
            //- label.label CEP *
            .control.has-icons-left
              the-mask.input.is-info(type='tel', mask='#####-###' masked=true, placeholder='CEP' v-model='CEP' @blur.native='$v.CEP.$touch()' :class='{"is-danger" : $v.CEP.$error}')
              span.icon.is-small.is-left
                i.fas.fa-map-marker-alt
              p.help.is-danger(v-if='$v.CEP.$error') Precisamos do seu CEP.
          .field.content
            //- label.label Endereço *
            .control.has-icons-left
              input.input.is-info(type='text', placeholder='Endereço' v-model='address' @blur='$v.address.$touch()' :class='{"is-danger" : $v.address.$error}')
              span.icon.is-small.is-left
                i.fas.fa-map
              p.help.is-danger(v-if='$v.address.$error') Precisamos do seu endereço completo.
          h3.is-size-5.is-paddingless Documentos
          p Para completar seu cadastro, precisamos apenas do seu passaporte e uma selfie.
          .columns.is-mobile
            .column
              .field(style='width: 123px')
                .file.is-boxed.has-name
                  label.file-label
                    input.file-input(type='file', v-once='passport', @change='uploadPassport' @blur='$v.passport.$touch()' :class='{"is-danger" : $v.passport.$error}')
                    span.file-cta
                      span.file-icon
                        i.fas.fa-upload
                      span.file-label
                        | Passaporte
                    span.file-name {{ passport.name }}
                    p.help.is-danger(v-if='$v.passport.$error') Precisamos de uma foto do seu passaporte
            .column
              .field(style='width: 123px')
                .file.is-boxed.has-name
                  label.file-label
                    input.file-input(type='file', name='selfie', @change='uploadSelfie' @blur='$v.selfie.$touch()' :class='{"is-danger" : $v.selfie.$error}')
                    span.file-cta
                      span.file-icon
                        i.fas.fa-upload
                      span.file-label
                        | Selfie
                    span.file-name {{ selfie.name }}
                    p.help.is-danger(v-if='$v.selfie.$error') Precisamos da sua selfie.
          .field  
            .buttons.control
              input.button.is-primary.is-fullwidth.is-large(type='submit', value='Solicitar meu VouCard' :disabled='$v.$invalid')
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
import { required, minLength, minValue } from 'vuelidate/lib/validators';

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
      passport: {},
      passportURL: null,
      selfie: {},
      selfieURL: null,
      file: null,
      status: 'registered',
      user: firebase.auth().currentUser,
    };
  },
  validations: {
    phoneNumber: {
      required,
      minLen: minLength(13),
    },
    DOB: {
      required,
      minLen: minLength(10),
    },
    CEP: {
      required,
      minLen: minLength(9),
    },
    address: {
      required,
      minLen: minLength(15),
    },
    passport: {
      required,
    },
    selfie: {
      required,
    },
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
        .then(() => {
          this.$router.push({ name: 'ConfirmEmail' });
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>