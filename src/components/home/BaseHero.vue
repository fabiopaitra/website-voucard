<template lang="pug">
.hero.has-background.is-dark.has-curve
  img.hero-background(alt="Voucard", src="@/assets/images/voucard-darkbg-mountains.jpg")
  .hero-body.has-text-centered-mobile
    .columns.container.content.is-vcentered
      .column.is-5.is-offset-1(data-aos='fade-up', data-aos-offset='100', data-aos-delay='0', data-aos-duration='800' data-aos-easing='ease-in-out-quad')
        span.tag.is-rounded.is-outlined.has-text-weight-bold Em breve.
          span.has-text-weight-normal(style="margin-left:10px") Ajude a construir o seu novo cartão
        h1.title.is-size-1.is-size-2-mobile.is-spaced
          | O cartão que te leva a novos horizontes
        h2.subtitle.is-size-4.is-size-4-mobile.has-text-weight-normal.has-text-grey-lighter
          | Compre o quanto quiser pagando 
          strong apenas uma 
          | taxa de IOF.
        BaseFormSubmit      
        BaseCheckBenefits
      .column.is-offset-1.is-4.is-hidden-mobile(data-aos='fade-up', data-aos-offset='100', data-aos-delay='500', data-aos-duration='800' data-aos-easing='ease-in-out-quad')
        picture
          source.has-image-shadow(type="image/webp" srcset="@/assets/images/voucard-app-card.webp" alt="Web aplicativo Voucard") 
          img.has-image-shadow(src="@/assets/images/voucard-app-card.png" alt="Web aplicativo Voucard")
  

</template>

<script>
export default {
  components: {
    BaseCheckBenefits,
    BaseFormSubmit,
  },
  name: 'BaseHero',
  props: {
    email: null,
    feedback: null,
  },
};
import BaseCheckBenefits from '@/components/home/BaseCheckBenefits.vue';
import BaseFormSubmit from '@/components/BaseFormSubmit.vue';
</script>