<template lang="pug">
div
  BaseRegistration

  
</template>

<script>
import BaseRegistration from '@/components/SignUp/Registration/BaseRegistration.vue';
import { Component, Vue } from 'vue-property-decorator';
@Component({
  components: {
    BaseRegistration,
  },
})
export default class SignUp extends Vue {}
</script>