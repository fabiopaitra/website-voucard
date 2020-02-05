<template lang="pug">
section.columns.is-marginless
  BaseHeaderSignup
  BaseSignUp
</template>

<script>
import BaseSignUp from '@/components/SignUp/BaseSignUp.vue';
import { Component, Vue } from 'vue-property-decorator';
import BaseHeaderSignup from '@/components/SignUp/BaseHeaderSignup';
@Component({
  components: {
    BaseSignUp,
    BaseHeaderSignup,
  },
})
export default class SignUp extends Vue {}
</script>