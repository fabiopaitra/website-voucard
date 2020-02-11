<template lang="pug">
section.section
  .tile.is-ancestor(style="flex-wrap: wrap;")
    .tile.is-3(v-for='user in users' :key='user.id')
      .tile.is-parent
        article.tile.is-child
          .card
            a.card-image(:href='user.passportURL', target='passport')
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
              .content
                .tags.has-addons
                  span.tag.is-dark {{ user.taxID }} 
                  span.tag.is-info {{ user.id }}
                p.icon.has-text-grey
                  i.fas.fa-phone
                | {{ user.phoneNumber }}
                p.icon.has-text-grey
                  i.fas.fa-map-marker-alt
                | {{ user.CEP }}
                .columns
                  .column
                    p.icon.has-text-grey
                      i.fas.fa-map
                    |  {{ user.address}}
                .columns
                  .column
                    p.icon.has-text-grey
                      i.fas.fa-id-card
                    time(:datetime='user.DOB') {{ user.DOB }}
            footer.card-footer
              a.card-footer-item.has-text-success(href='#') Approve
              a.card-footer-item(href='#') Contact
              a.card-footer-item.has-text-danger(href='#') Refuse
</template>

<script>
import db from '@/firebase/init';
import firebase, { auth } from 'firebase';

export default {
  name: 'BaseApproval',
  props: {},
  data() {
    return {
      users: [],
    };
  },
  created() {
    db.collection('users')
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          const user = doc.data();
          user.id = doc.id;

          this.users.push(user);
        });
      });
  },
};
</script>