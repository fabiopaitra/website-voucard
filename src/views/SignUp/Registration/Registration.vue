<template lang="pug">
section.columns.is-marginless
  BaseHeaderSignup
  BaseRegistration

  
</template>

<script>
import BaseRegistration from '@/components/SignUp/Registration/BaseRegistration.vue';
import BaseHeaderSignup from '@/components/SignUp/BaseHeaderSignup.vue';
import { Component, Vue } from 'vue-property-decorator';
@Component({
  components: {
    BaseRegistration,
    BaseHeaderSignup,
  },
})
export default class SignUp extends Vue {}
</script>