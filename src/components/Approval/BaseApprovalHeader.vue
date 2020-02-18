<template lang="pug">
section.hero.is-link.is-bold
  .hero-head
    router-link.navbar-item(:to="{ name: 'Home' }")
      img(src='@/assets/images/voucard-logo-darkbg.svg')      
  .hero-body
    .section
      h1.title.is-2 Know Your Customer Process
  .hero-foot
    nav.tabs.is-boxed
      .container
        ul
          li(:class='{ "is-active": statusTab.Registered }')
            a(@click='showRegistered()') Registered
          li(:class='{ "is-active": statusTab.Contact }')
            a(@click='showContact();') Contact
          li(:class='{ "is-active": statusTab.Refused }')
            a(@click='showRefused()') Refused
          li(:class='{ "is-active": statusTab.Approved }')
            a(@click='showApproved()') Approved
    

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
      statusTab: {
        Registered: true,
        Contact: false,
        Refused: false,
        Approved: false,
      },
    };
  },
  methods: {
    showRegistered() {
      this.statusTab.Registered = true;
      this.statusTab.Contact = false;
      this.statusTab.Refused = false;
      this.statusTab.Approved = false;
      this.$store.commit('registeredTab');
    },
    showContact() {
      this.statusTab.Registered = false;
      this.statusTab.Contact = true;
      this.statusTab.Refused = false;
      this.statusTab.Approved = false;
      this.$store.commit('contactTab');
    },
    showRefused() {
      this.statusTab.Registered = false;
      this.statusTab.Contact = false;
      this.statusTab.Refused = true;
      this.statusTab.Approved = false;
      this.$store.commit('refusedTab');
    },
    showApproved() {
      this.statusTab.Registered = false;
      this.statusTab.Contact = false;
      this.statusTab.Refused = false;
      this.statusTab.Approved = true;
      this.$store.commit('approvedTab');
    },
  },
};
</script>