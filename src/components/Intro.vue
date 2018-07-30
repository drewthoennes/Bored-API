<template>
  <div class="intro">
    <h1>The Bored API</h1>
    <h3>Let's find you something to do</h3>
  </div>
</template>

<script>
  export default {
    name: 'Intro',
    data () {
      return {
      }
    },
    methods: {
    }
  }
</script>

<style scoped>
  h1, h2 {
    font-weight: normal;
  }
  .intro {
    height: 100%;
    background: #4a4e56;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .intro * {
    color: white;
  }
</style>
