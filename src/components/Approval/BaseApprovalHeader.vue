<template lang="pug">
section.hero.is-link.is-bold
  .hero-head
    router-link.navbar-item(:to="{ name: 'Home' }")
      img(src='@/assets/images/voucard-logo-darkbg.svg')      
  .hero-body
    .section
      h1.title.is-2 Know Your Customer Process (KYC)
  .hero-foot
    nav.tabs.is-boxed
      .container
        ul
          li.is-active
            a Pending
          li
            a Approved
    

</template>

<script>
import db from '@/firebase/init';
import firebase, { auth } from 'firebase';

export default {
  name: 'BaseApprovalHeader',
  props: {},
  data() {
    return {
      profile: null,
    };
  },
};
</script>