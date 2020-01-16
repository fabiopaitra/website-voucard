<template lang="pug">
section.section.container.content.has-text-centered
  .columns
    .column(data-aos='fade-right', data-aos-offset='200', data-aos-delay='0', data-aos-duration='800' data-aos-easing='ease-in-out-quad')
      figure.image.is-96x96.has-image-centered
        img(src="@/assets/images/icon-multimoeda.svg", alt="Multimoeda")
      h3.title.is-4.has-text-weight-light Multimoeda
      p Carregue e use em Dólar Americano (USD), Euro (EUR), Libra Esterlina (GBP) e mais.
    .column(data-aos='fade-top', data-aos-offset='200', data-aos-delay='400', data-aos-duration='800' data-aos-easing='ease-in-out-quad')
      figure.image.is-96x96.has-image-centered
        img.image(src="@/assets/images/icon-seguranca.svg", alt="Segurança e facilidade")
      h3.title.is-4.has-text-weight-light Seguro, fácil e rápido
      p Cadastra-se em 5 minutos, carregue seu cartão e use-o.
    .column(data-aos='fade-left', data-aos-offset='200', data-aos-delay='800', data-aos-duration='800' data-aos-easing='ease-in-out-quad')
      figure.image.is-96x96.has-image-centered
        img.image(src="@/assets/images/icon-melhor-cambio.svg", alt="Melhor câmbio")
      h3.title.is-4.has-text-weight-light Melhor câmbio
      p Compre mais e pague menos em taxas.
    

</template>

<script lang="ts">
export default {
  name: 'benefits',
};
</script>
