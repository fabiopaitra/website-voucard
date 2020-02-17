<template lang="pug">
div
  BaseModal(v-if='showModal', @close='showModal = false')
    h3(slot='header') custom header
  BaseApprovalHeader
  BaseApproval(@show='showModal($event, imageURL)')

  
</template>

<script>
import BaseApprovalHeader from '@/components/Approval/BaseApprovalHeader.vue';
import BaseApproval from '@/components/Approval/BaseApproval.vue';
import BaseModal from '@/components/Base/BaseModal.vue';

import { Component, Vue } from 'vue-property-decorator';
import db from '@/firebase/init';
import firebase from 'firebase';
@Component({
  components: {
    BaseApprovalHeader,
    BaseApproval,
    BaseModal,
  },
  data() {
    return {
      showModal: false,
      imageURL: null,
    };
  },
  methods: {
    showModal(imageURL) {
      console.log(imageURL, this.imageURL);
      imageURL = this.imageURL;
    },
  },
})
export default class Approval extends Vue {}
</script>