<template lang="pug">
div
  BaseApprovalHeader
  BaseApproval

  
</template>

<script>
import BaseApprovalHeader from '@/components/Approval/BaseApprovalHeader.vue';
import BaseApproval from '@/components/Approval/BaseApproval.vue';

import { Component, Vue } from 'vue-property-decorator';
import db from '@/firebase/init';
import firebase from 'firebase';
@Component({
  components: {
    BaseApproval,
    BaseApprovalHeader,
  },
})
export default class Approval extends Vue {}
</script>