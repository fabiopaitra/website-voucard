<template lang="pug">
div
  BaseApprovalProcess

  
</template>

<script>
import BaseApprovalProcess from '@/components/SignUp/BaseApprovalProcess.vue';
import { Component, Vue } from 'vue-property-decorator';
@Component({
  components: {
    BaseApprovalProcess,
  },
})
export default class ApprovalProcess extends Vue {}
</script>