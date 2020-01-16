<template lang="pug">
section.section
  
    .columns.is-vcentered
      .column.is-half.is-paddingless
        picture.image.is-16by9
          source(type="image/webp", srcset="../../assets/images/relatorios-consolidados-small.webp 640w, ../../assets/images/relatorios-consolidados-large.webp 1030w" alt="Relatórios Consolidados")
          img(src="../../assets/images/relatorios-consolidados.jpg" alt="Relatórios Consolidados")

      .column.is-one-third.card.b-corner
        .card-content
          picture
            source(type="image/webp", srcset="../../assets/images/relatorios-consolidados-icon.webp",  alt="Relatórios consolidados ícone")
            img(src="../../assets/images/relatorios-consolidados-icon.png", alt="Relatórios consolidados ícone")
          h4.title.is-size-1.has-text-weight-light Relatório consolidado
          p
            strong Entenda a performance 
            | dos seus anúncios em um relatório completo de acordo com as necessidades da sua imobiliária. Entenda a performance dos seus anúncios em um relatório completo de acordo com as necessidades da sua imobiliária.
    section.margin-3
      .columns.is-vcentered
        .column.is-offset-2.one-third.card.t-corner
          .card-content
            picture
              source(type="image/webp", srcset="../../assets/images/automacao-anuncios-icon.webp", alt="Automação de anúncios ícone")
              img(src="../../assets/images/automacao-anuncios-icon.png", alt="Automação de anúncios ícone")
            h4.title.is-size-1.has-text-weight-light Automação de anúncios
            p
              strong Entenda a performance 
              | dos seus anúncios em um relatório completo de acordo com as necessidades da sua imobiliária. Entenda a performance dos seus anúncios em um relatório completo de acordo com as necessidades da sua imobiliária.            
        .column.is-half.is-paddingless
          picture.image.is-16by9
            source(type="image/webp" srcset="../../assets/images/automacao-anuncios.webp", alt="Automação de anúncios")
            img(src="../../assets/images/automacao-anuncios.jpg", alt="Automação de anúncios")
          
          
    
      
</template>

<script lang="ts">
export default {
  name: 'chartsHow',
};
</script>
