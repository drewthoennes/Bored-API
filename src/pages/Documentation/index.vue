<template>
  <div class="documentation container-fluid">
    <div class="topbar-div">
      <Topbar boldDocumentation/>
    </div>

    <div class="intro-div">
      <Intro documentation/>
    </div>

    <div class="content">
    </div>
  </div>
</template>

<script>
  import Topbar from '@/components/Topbar'
  import Intro from '@/components/Intro'

  export default {
    name: 'Documentation',
    components: {
      Topbar,
      Intro
    },
    data () {
      return {
      }
    },
    methods: {
    },
    mounted() {
    }
  }
</script>

<style scoped>
  h1, h2 {
    font-weight: normal;
  }
  .documentation {
    height: 100%;
    padding: 0;
    margin: 0;
  }
  .topbar-div {
    height: 10%;
  }
  .intro-div {
    height: 25%;
  }
  .content {
    /* height: 90%; */
  }
</style>
