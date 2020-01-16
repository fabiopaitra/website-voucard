<template lang="pug">
.columns.is-small.is-hidden-mobile(style="margin-top:10px")
  .column.is-narrow.is-paddingless(style="margin-left:10px")
    p
      span.icon.has-text-success
        i.far.fa-check-circle
      | Menor IOF
  .column.is-narrow.is-paddingless(style="margin-left:10px")
    p
      span.icon.has-text-success
        i.far.fa-check-circle
      | Disponível globalmente 
  .column.is-narrow.is-paddingless(style="margin-left:10px")
    p
      span.icon.has-text-success
        i.far.fa-check-circle
      | Aprovação rápida 

      
</template>

<script lang="ts">
export default {
  name: 'BaseCheckBenefits',
};
</script>
