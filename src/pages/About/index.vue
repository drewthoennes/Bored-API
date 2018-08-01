<template>
  <div class="about container-fluid">
    <div class="topbar-div">
      <Topbar boldAbout/>
    </div>

    <div class="intro-div">
      <Intro about/>
    </div>

    <div class="content">
      <h2>Introduction</h2>
      <h5>The Bored API serves to find activities to do. It has various fields that help determine anything from the price of the activity to the number of participants.</h5>
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
    background: #f8f8f8;
  }
  .topbar-div {
    height: 10%;
  }
  .intro-div {
    height: 25%;
  }
  .content {
    /* height: 90%; */
    background: #f8f8f8;
  }
</style>
