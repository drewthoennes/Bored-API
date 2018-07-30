<template>
  <div class="documentation container-fluid">
    <div class="topbarDiv">
      <Topbar/>
    </div>

    <div class="content">
      Documentation
    </div>
  </div>
</template>

<script>
  import Topbar from '@/components/Topbar'

  export default {
    name: 'Documentation',
    components: {
      Topbar
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
  .topbarDiv {
    height: 10%;
  }
</style>
