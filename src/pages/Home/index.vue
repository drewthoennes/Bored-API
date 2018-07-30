<template>
  <div class="home container-fluid">
    <div class="topbar-div">
      <Topbar/>
    </div>

    <div class="content">
      <div class="intro-div">
        <Intro/>
      </div>

      <div class="info-div">
        <Info/>
      </div>

      <div class="well">
        <p>
          Some general information
        </p>
      </div>
    </div>
  </div>
</template>

<script>
  import Topbar from '@/components/Topbar'
  import Intro from '@/components/Intro'
  import Info from '@/components/Info'

  export default {
    name: 'Home',
    components: {
      Topbar,
      Intro,
      Info
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
  .home {
    height: 100%;
    padding: 0;
    margin: 0;
  }
  .topbar-div {
    height: 10%;
  }
  .content {
    height: 90%;
  }
  .intro-div {
    height: 30%;
  }
  .info-div {
    height: 25%;
  }
</style>
