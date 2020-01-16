<template lang="pug">
  div.has-background-light
    header
      BaseMainHeader
      BaseHero
    main
      article
        BaseBenefits
    footer
      BaseMainFooter

</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import BaseMainHeader from '@/components/BaseMainHeader.vue';
import BaseHero from '@/components/home/BaseHero.vue';
import BaseBenefits from '@/components/home/BaseBenefits.vue';
import BaseMainFooter from '@/components/BaseMainFooter.vue';

@Component({
  components: {
    BaseMainHeader,
    BaseHero,
    BaseBenefits,
    BaseMainFooter,
  },
})
export default class Home extends Vue {}
</script>
