<template lang="pug">
section.columns.is-marginless
  BaseHeaderSignup
  BaseConfirmEmail
</template>

<script>
import BaseConfirmEmail from '@/components/SignUp/ConfirmEmail/BaseConfirmEmail.vue';
import BaseHeaderSignup from '@/components/SignUp/BaseHeaderSignup.vue';

import { Component, Vue } from 'vue-property-decorator';
import db from '@/firebase/init';
import firebase from 'firebase';
@Component({
  components: {
    BaseConfirmEmail,
    BaseHeaderSignup,
  },
})
export default class ConfirmEmail extends Vue {}
</script>