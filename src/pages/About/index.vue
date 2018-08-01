<template>
  <div class="about container-fluid">
    <div class="topbar-div">
      <Topbar boldAbout/>
    </div>

    <div class="intro-div">
      <Intro about/>
    </div>

    <div class="content">
      About
    </div>
  </div>
</template>

<script>
  import Topbar from '@/components/Topbar'
  import Intro from '@/components/Intro'

  export default {
    name: 'About',
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
  .about {
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
