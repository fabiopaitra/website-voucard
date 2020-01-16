<template lang="pug">
  div.has-background-light
    header
      mainHeader
      BaseHero
    main
      article
        benefits
    footer
      mainFooter

</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import mainHeader from '@/components/BaseMainHeader.vue';
import BaseHero from '@/components/home/BaseHero.vue';
import benefits from '@/components/home/BaseBenefits.vue';
import chartsHow from '@/components/home/BaseChartsHow.vue';
import price from '@/components/home/BasePrice.vue';
import teamMembers from '@/components/home/BaseTeamMembers.vue';
import lastCta from '@/components/home/BaseLastCta.vue';
import mainFooter from '@/components/BaseMainFooter.vue';

@Component({
  components: {
    mainHeader,
    BaseHero,
    benefits,
    chartsHow,
    teamMembers,
    price,
    lastCta,
    mainFooter,
  },
})
export default class Home extends Vue {}
</script>
