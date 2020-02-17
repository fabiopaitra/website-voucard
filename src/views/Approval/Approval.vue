<template lang="pug">
div(:class='{ "scroll-lock": scrollLock }')
  BaseModal(v-if='showModal', @close='closeModal()', :imageURL = 'imageURL')
    div(slot = 'header')
      //- p.modal-card-title Nome
    div(slot = 'body')
      p.image.is-4by3
        img(:src='imageURL')
  BaseApprovalHeader
  BaseApproval(@modalHandler='getImageURL($event, imageURL, firstName)')

  
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
      firstName: null,
      scrollLock: false,
    };
  },
  methods: {
    getImageURL(imageURL, firstName) {
      this.imageURL = imageURL;
      this.firstName = firstName;
      this.showModal = true;
      this.scrollLock = true;
    },
    closeModal() {
      this.showModal = false;
      this.scrollLock = false;
    },
  },
})
export default class Approval extends Vue {}
</script>

<style lang="sass">
.scroll-lock
  position: fixed !important
</style>