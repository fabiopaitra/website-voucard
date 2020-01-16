<template lang="pug">
div
  BaseSignUp

  
</template>

<script>
import BaseSignUp from '@/components/SignUp/BaseSignUp.vue';
import { Component, Vue } from 'vue-property-decorator';
@Component({
  components: {
    BaseSignUp,
  },
})
export default class SignUp extends Vue {}
</script>