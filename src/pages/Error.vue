<template>
  <div class="error container-fluid">
    <Topbar v-bind:hide="true"/>
    <div class="error-body">
      Page not found
    </div>
  </div>
</template>

<script>
  import Topbar from '@/components/Topbar'

  export default {
    name: 'Error',
    components: {
      Topbar
    },
    data () {
      return {
      }
    }
  }
</script>

<style scoped>
  h1, h2 {
    font-weight: normal;
  }
  .error {
    height: 100%;
    padding: 0;
    margin: 0;
  }
  .topbar {
    height: 12%;
    background: linear-gradient(-45deg, #6519d1, #aa7bed);
    position: relative;
  }
</style>
