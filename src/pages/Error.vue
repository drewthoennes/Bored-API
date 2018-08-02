<template>
  <div class="error container-fluid">
    <div class="topbar-div">
      <Topbar v-bind:border="border"/>
    </div>

    <!-- <div class="intro-div">
      <Intro error/>
    </div> -->

    <div class="content">
      <h4>The page you were looking for was not found</h4>
    </div>

    <div class="bottombar-div">
      <Bottombar/>
    </div>
  </div>
</template>

<script>
  import Topbar from '@/components/Topbar'
  import Intro from '@/components/Intro'
  import Bottombar from '@/components/Bottombar'

  export default {
    name: 'Error',
    components: {
      Topbar,
      Intro,
      Bottombar
    },
    data () {
      return {
        border: false
      }
    }
  }
</script>

<style scoped>
  .error {
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
    min-height: 59.5%;
    margin-top: 30px;
  }
  .bottombar-div {
    height: 25%;
  }
</style>
