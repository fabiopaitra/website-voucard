<template lang="pug">
.container.content(style="z-index:100;")
  .columns
    .column.is-uppercase
      h2.title.is-7.has-text-centered.has-text-weight-normal
        | Integrado com dezenas de plataformas
  .columns.is-mobile.is-vcentered.column
    .column
      picture
        source(type="image/webp" srcset='@/assets/images/certificados/olx.webp', alt="OLX")
        img(src='@/assets/images/certificados/olx.png', alt='OLX')
    .column.is-hidden-mobile
      picture
        source(type="image/webp" srcset='@/assets/images/certificados/imovelweb.webp', alt="Imóvel Web")
        img(src='@/assets/images/certificados/imovelweb.png', alt="Imóvel Web")
    .column
      picture
        source(type="image/webp" srcset='@/assets/images/certificados/vivareal.webp', alt="Viva Real")
        img(src='@/assets/images/certificados/vivareal.png', alt="Viva Real")
    .column
      picture
        source(type="image/webp" srcset='@/assets/images/certificados/zap.webp', alt="Zap Imóveis")
        img(src='@/assets/images/certificados/zap.png', alt="Zap Imóveis")
    .column
      picture
        source(type="image/webp" srcset='@/assets/images/certificados/mercadolivre.webp', alt="Mercado Livre")
        img(src='@/assets/images/certificados/mercadolivre.png', alt="Mercado Livre")

      
</template>

<script lang="ts">
export default {
  name: 'BaseBrands',
};
</script>
