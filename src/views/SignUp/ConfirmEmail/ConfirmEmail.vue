<template lang="pug">
div
  BaseConfirmEmail

  
</template>

<script>
import BaseConfirmEmail from '@/components/SignUp/ConfirmEmail/BaseConfirmEmail.vue';
import BaseSignUp from '@/components/SignUp/BaseSignUp.vue';

import { Component, Vue } from 'vue-property-decorator';
import db from '@/firebase/init';
import firebase from 'firebase';
@Component({
  components: {
    BaseConfirmEmail,
  },
})
export default class ConfirmEmail extends Vue {}
</script>