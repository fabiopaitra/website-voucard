<template lang="pug">
section.section
  .tile.is-ancestor(style="flex-wrap: wrap;")
    .tile.is-3(v-for='(user, index) in users' :key='index')
      .tile.is-parent
        article.tile.is-child
          .card
            a.card-image(@click="$emit('show', user.passportURL)")
              figure.image.is-4by3
                img(:src='user.passportURL')
            .card-content
              .media
                a.media-left(:href='user.selfieURL', target='selfie')
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
                      i.fas.fa-phone
                    span {{ user.phoneNumber }}
                  li
                    span.icon
                      i.fas.fa-cloud
                    span {{ user.id }}  
                  li  
                    span.icon
                      i.fas.fa-map-marker-alt
                    span {{ user.CEP }}
                  li
                    span.icon
                      i.fas.fa-map
                    span {{ user.address}}
                  li  
                    span.icon
                      i.fas.fa-id-card
                    time(:datetime='user.DOB') {{ user.DOB }}
            footer.card-footer
              a.card-footer-item.has-text-success(@click='approveItem(user)') Approve
              a.card-footer-item.has-text-warning(@click='contactItem(user)') Contact
              a.card-footer-item.has-text-danger(@click='refuseItem(user)') Refuse
</template>

<script>
import db from '@/firebase/init';
import firebase, { auth } from 'firebase';
import BaseModal from '@/components/Base/BaseModal.vue';

export default {
  name: 'BaseApproval',
  components: { BaseModal },
  props: {},
  data() {
    return {
      users: [],
      show: '',
    };
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
    approveItem(user) {
      db.collection('users')
        .doc(user.id)
        .update({
          status: 'Approved',
        })
        .then(() => {
          user.status = 'Approved';
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
};
</script>
<style lang="sass" scoped>
ul
  margin-left: 0 !important
li 
  list-style-type: none

</style>