<template lang="pug">
transition(name='modal')
  .modal.is-active
    .modal-background(@click="$emit('close')")
    .modal-card
      header.modal-card-head
        slot(name='header')
        p.modal-card-title
        button.delete(aria-label = 'Close', @click="$emit('close')")
      section.modal-card-body
        slot(name='body')
          | default body
      footer.modal-card-foot
        slot(name='footer')
          button.button.is-success(@click="$emit('close')") Salvar alterações
          button.button(@click="$emit('close')") Cancelar
          
      

    
         
  
</template>

<script>
export default {
  name: 'BaseModal',
  data() {
    return {};
  },
  props: {
    imageURL: null,
  },
};
</script>

<style lang="sass">
.modal
  position: fixed !important

</style>