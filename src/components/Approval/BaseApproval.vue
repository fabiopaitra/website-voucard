<template lang="pug">
section.section
  .tile.is-ancestor(style="flex-wrap: wrap;")
    .tile.is-3(v-for='(user, index) in users' :key='index', v-if='user.status === changeStatus')
      .tile.is-parent
        article.tile.is-child
          .card
            a.card-image(@click="$emit('modalHandler', user.passportURL, user.firstName)")
              figure.image.is-4by3
                img(:src='user.passportURL')
            .card-content
              .media
                a.media-left(@click="$emit('modalHandler', user.selfieURL)")
                  figure.image.is-48x48
                    img(:src='user.selfieURL')
                .media-content
                  p.title.is-4 {{ user.firstName }} {{ user.lastName }}
                  p.subtitle.is-6
                    a(:href='`mailto:${user.email}`') {{ user.email }}
              .content.is-small
                .tags.has-addons
                  span.tag.is-grey {{ user.taxID }} 
                  span.tag.is-success(v-if='user.status === "Approved"') {{ user.status }}
                  span.tag.is-danger(v-else-if='user.status === "Refused"') {{ user.status }}
                  span.tag.is-warning(v-else-if='user.status === "Contact"') {{ user.status }}
                  span.tag.is-link(v-else-if='user.status === "Registered"') {{ user.status }}
                  span.tag.is-info(v-else-if='user.status === "Created"') {{ user.status }}
                ul
                  li
                    span.icon
                      i.fas.fa-cloud
                    span {{ user.id }} 
                  li
                    span.icon
                      i.fas.fa-phone
                    span {{ user.phoneNumber }}
                  li
                    span.icon
                      i.fas.fa-map
                    span {{`${user.address.street}, ${user.address.number}. ${user.address.complement} CEP: ${user.address.postcode}. ${user.address.suburb} - ${user.address.city} ${user.address.state}, ${user.address.country}.`}}
                  li  
                    span.icon
                      i.fas.fa-id-card
                    time(:datetime='user.DOB') {{ user.DOB | moment }} 
            footer.card-footer
              a.card-footer-item.has-text-success(@click='approveItem(user)') Approve
              a.card-footer-item.has-text-warning(@click='contactItem(user)') Contact
              a.card-footer-item.has-text-danger(@click='refuseItem(user)') Refuse
</template>

<script>
import db from '@/firebase/init';
import firebase, { auth } from 'firebase';
import BaseModal from '@/components/Base/BaseModal.vue';
import { mapGetters } from 'vuex';
import axios from 'axios';
import * as moment from 'moment';

export default {
  name: 'BaseApproval',
  components: { BaseModal },
  props: {},
  data() {
    return {
      users: [],
    };
  },
  filters: {
    moment: (date) => {
      return moment(date.toDate()).format('YYYY-MM-DD');
    },
  },
  created() {
    const ref = db.collection('users');
    ref.get().then((snapshot) => {
      snapshot.forEach((doc) => {
        const user = doc.data();
        user.id = doc.id;
        this.users.push(user);
      });
    });
  },
  methods: {
    async approveItem(user) {
      await db.collection('users').doc(user.id).update({ status: 'Approved' });
      user.status = 'Approved';
      const getUSD = firebase.functions().httpsCallable('getUSD');
      getUSD().then((result) => {
        console.log(result.data);
      }).catch((err) => {
        console.log(err);
      });
    },
    contactItem(user) {
      db.collection('users')
        .doc(user.id)
        .update({
          status: 'Contact',
        })
        .then(() => {
          user.status = 'Contact';
        });
    },
    refuseItem(user) {
      db.collection('users')
        .doc(user.id)
        .update({
          status: 'Refused',
        })
        .then(() => {
          user.status = 'Refused';
        });
    },
  },
  computed: {
    ...mapGetters(['changeStatus']),
  },
};
</script>
<style lang="sass">
ul
  margin-left: 0 !important
li
  list-style-type: none
</style>