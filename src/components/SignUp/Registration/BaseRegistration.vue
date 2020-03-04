<template lang="pug">
.column
  .hero-body
    .column.is-8.is-offset-2
      h2.title.is-4 Olá, vamos continuar.
      h3.subtitle.is-6 Para concluir seu cadastro, preencha as informações abaixo.
      .content
        form(@submit.prevent='registerUser')
          .field.content
            //- label.label Celular *
            .control.has-icons-left
              input.input.is-info(type='text', placeholder='Nome completo igual ao passaporte' v-model='legalName' @blur='$v.legalName.$touch()' :class='{"is-danger" : $v.legalName.$error}')
              span.icon.is-small.is-left
                i.fas.fa-user
              p.help.is-danger(v-if='$v.phoneNumber.$error') Precisamos do seu nome completo igual ao passaporte
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
              datepicker(:language='ptBR', input-class='input is-info', placeholder='Data de nascimento', v-model='DOB')
              span.icon.is-small.is-left
                i.fas.fa-id-card
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
          .field.content
            //- label.label CPF *
            .control.has-icons-left
              the-mask.input.is-info(mask='###.###.###-##', type='tel', masked=true, placeholder='CPF' v-model='taxID' @blur.native='$v.taxID.$touch()' :class='{"is-danger" : $v.taxID.$error}')
              span.icon.is-small.is-left
                i.fas.fa-id-card
              p.help.is-danger(v-if='$v.taxID.$error') Aqui precisamos de um CPF válido.
          h3.is-size-5.is-paddingless Documentos
          p Para completar seu cadastro, precisamos apenas do seu passaporte e uma selfie.
          .columns.is-mobile
            .column
              .field(style='width: 122px')
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
import { required, minLength } from 'vuelidate/lib/validators';
import moment from 'moment';
import { validate as validateCPF } from 'gerador-validador-cpf';
import Datepicker from 'vuejs-datepicker';
import { ptBR } from 'vuejs-datepicker/dist/locale';

export default {
  name: 'BaseRegistration',
  components: { TheMask, BaseSignUp, Datepicker },
  data() {
    return {
      ptBR,
      legalName: null,
      phoneNumber: null,
      CEP: null,
      address: null,
      DOB: null,
      taxID: null,
      feedback: null,
      passport: {},
      selfie: {},
      file: null,
      status: 'Registered',
    };
  },
  validations: {
    legalName: {
      required,
      minLen: minLength(13),
    },
    phoneNumber: {
      required,
      minLen: minLength(13),
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
    taxID: {
      required,
      validateCPF,
    },
  },
  methods: {
    uploadPassport(event) {
      const user = firebase.auth().currentUser;
      const file = event.target.files[0];
      const storageRef = firebase.storage().ref(`${user.uid}/passport-${file.name}`);
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
      const user = firebase.auth().currentUser;
      const file = event.target.files[0];
      const storageRef = firebase.storage().ref(`${user.uid}/selfie-${file.name}`);
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
    registerUser() {
      const user = firebase.auth().currentUser;
      db.collection('users')
        .doc(user.uid)
        .set(
          {
            legalName: this.legalName,
            phoneNumber: this.phoneNumber,
            CEP: this.CEP,
            address: this.address,
            DOB: new Date(this.DOB),
            taxID: this.taxID,
            passportURL: this.passport.passportURL,
            selfieURL: this.selfie.selfieURL,
            status: this.status,
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
  computed: {},
};
</script>