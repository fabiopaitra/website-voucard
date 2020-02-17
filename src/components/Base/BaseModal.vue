<template lang="pug">
transition(name='modal')
  .modal.is-active
    .modal-background
    .modal-content
      p.image.is-4by3
        img(:src='this.passportURL')
    .modal-header
      slot(name='header')
        | default header
    .modal-body
      slot(name='body')
        | default body
    .modal-footer
      slot(name='footer')
        | default footer
    button.modal-close.is-large(@click="$emit('close')")
         
  
</template>

<script>
export default {
  name: 'BaseModal',
  data() {
    return {
      passportURL: null,
    };
  },
  methods: {
    // showModal(passportURL) {
    //   console.log(passportURL, this.passportURL);
    //   this.passportURL = passportURL;
    // },
  },
};
</script>

<style>
</style>