<template lang="pug">
section.section.container.content
  h2.title.is-2.is-spaced.has-text-centered.has-text-weight-light
    | Da Austrália para o Brasil
  p.subtitle.has-text-centered
    | Formada por profissional conceituados em suas áreas que se conheceram buscando inovar em outros países, o Casahub está sempre em busca de soluções para ajudar a desenvolver soluções para o ramo habitacional.
  .columns
    .column
      .message.is-link
        .message-header.padding-02
        .message-body.has-background-white.has-text-centered
          picture.image.is-200x200.has-image-centered
            source(type="image/webp" srcset="../../assets/images/rafaela-tulio.webp", alt="Rafaela Tulio - CEO")
            img(src="../../assets/images/rafaela-tulio.jpg", alt="Rafaela Tulio - CEO")
          p.title.is-4 Rafaela Túlio
          p.subtitle.is-6 CEO
            p.has-text-dark Responsável desempenho no direcionamento de campanhas e da equipe de vendas no processo de conversão.
    .column
      .message.is-danger
        .message-header.padding-02
        .message-body.has-background-white.has-text-centered
          picture.image.is-200x200.has-image-centered
            source(type="image/webp" srcset="../../assets/images/fabio-paitra.webp", alt="Fabio Paitra - CMO")
            img(src="../../assets/images/fabio-paitra.jpg", alt="Fabio Paitra - CMO")
          p.title.is-4 Fabio Paitra
          p.subtitle.is-6 CMO
            p.has-text-dark Responsável desempenho no direcionamento de campanhas e da equipe de vendas no processo de conversão.
    .column
      .message.is-info
        .message-header.padding-02
        .message-body.has-background-white.has-text-centered
          picture.image.is-200x200.has-image-centered
            source(type="image/webp" srcset="../../assets/images/elliot-braham.webp", alt="Elliot Braham - CTO")
            img(src="../../assets/images/elliot-braham.jpg", alt="Elliot Braham - CTO")
          p.title.is-4 Elliot Braham
          p.subtitle.is-6 CTO
            p.has-text-dark Responsável desempenho no direcionamento de campanhas e da equipe de vendas no processo de conversão.
</template>

<script lang="ts">
export default {
  name: 'teamMembers',
};
</script>
