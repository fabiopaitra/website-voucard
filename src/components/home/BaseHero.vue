<template lang="pug">
section
  BaseConfirmRegModal(v-show='showModal' @close='showModal = false')
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
          section
            .content
              form#app(@submit.prevent='addEmail')
                .field.has-addons.is-hidden-mobile
                  .control.is-expanded.has-icons-left
                    label
                      input.input.is-primary.is-medium(type='email', v-model='email', name='email', placeholder='E-mail')
                      span.icon.is-small.is-left
                        i.fas.fa-envelope
                    p.help.is-danger(v-if='feedback') Email inválido
                  .control
                    label
                      input.button.is-primary.is-medium(type='submit', value='Quero meu convite')
              form(@submit.prevent='addEmail')
                .field.is-hidden-tablet
                  .control.is-expanded.has-icons-left
                    label
                      input.input.is-primary.is-medium(type='email', v-model='email', placeholder='E-mail')
                      span.icon.is-small.is-left
                        i.fas.fa-envelope
                    .buttons
                    input.button.is-primary.is-fullwidth.is-medium(type='submit', value='Quero meu convite')
                  p.help.is-danger(v-if='feedback') Email inválido
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
    BaseConfirmRegModal,
  },
  data() {
    return {
      email: null,
      feedback: null,
      showModal: null,
    };
  },
  name: 'BaseHero',
  props: {
    email: null,
    feedback: null,
  },
  methods: {
    addEmail() {
      if (this.email) {
        this.feedback = null;
        (this.showModal = true),
          window.dataLayer.push({
            event: 'new_subscriber',
            ecommerce: {
              currencyCode: 'BRL',
              checkout: {
                actionField: { step: 1, option: 'Sign Up' },
                products: {
                  name: 'Beta Users Form',
                  id: Math.random(),
                  price: 10.25,
                  brand: 'Voucard',
                  category: 'Email Subscription',
                  variant: 'Starter Beta',
                },
              },
            },
          });
        this.$router.push({ name: 'Home' }).catch((err) => {
          console.log(err);
          // TODO SEND EVENT TO TAG MANAGER
          // TODO OPEN THANK YOU MODAL
          // TODO CHECK IF USER IS ALREADY SIGN UP
          // TODO CHECK IF EMAIL IS ALREADY REGISTERED
        });
      } else {
        this.feedback = 'Insira seu e-mail';
      }
    },
  },
};
import BaseConfirmRegModal from '@/components/BaseConfirmRegModal.vue';
import BaseCheckBenefits from '@/components/home/BaseCheckBenefits.vue';
</script>