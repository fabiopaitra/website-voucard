<template lang="pug">
trasition(name='modal')
  .modal.is-active
    .modal-background(aria-label='close' @click="$emit('close')")
    .modal-card
      header.modal-card-head
        p.modal-card-title
        button.delete(aria-label='close' @click="$emit('close')")
      section.modal-card-body
        .content.has-text-centered
          p.title.is-size-1.has-text-success: i.fas.fa-check-circle
          p.title.is-size-3 Seu nome já está na lista de espera
          p.subtitle.is-size-5 Assim que começarmos a liberar o VOUCARD para novos usuários, você vai ser um dos primeiros a saber.
          p.is-subtitle.is-size-5.is-paddingless.is-marginless.has-text-weight-semibold.is-dark Elliot Braham,
          p.is-italic.help.is-paddingless.is-marginless Founder, Voucard
      footer.modal-card-foot

</template>

<script>
export default {
  name: 'BaseConfirmRegModal',
  props: {},
  data() {
    return {};
  },
  methods: {},
};
</script>

<style>
.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>