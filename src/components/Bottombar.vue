<template>
  <div class="bottombar" v-bind:class="{ absolute: absolute }">
    <div class="title">
      <h2>Bored API</h2>
      <div class="icons">
        <a href="https://github.com/drewthoennes/Bored-API"><i class="fab fa-github"></i></a>
        <a href="https://github.com/drewthoennes/Bored-API/issues"><i class="fas fa-bug"></i></a>
      </div>
    </div>
    <div class="information" v-if="!hide">
      <router-link :to="{name: 'Home'}">Home</router-link>
      <router-link :to="{name: 'About'}">About</router-link>
      <router-link :to="{name: 'Documentation'}">Documentation</router-link>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Bottombar',
    props: {
      hide: Boolean,
      absolute: Boolean,
      boldAbout: Boolean,
      boldDocumentation: Boolean
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
  a {
    font-style: none;
    font-size: 16px;
    color: #000000;
    margin: 0;
  }
  a:hover:not(.current) {
    text-decoration: none;
  }
  .bottombar {
    background: #4a4e56;
    position: relative;
    width: 100%;
    padding: 2% 5% 2% 5%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    height: 100%;
    box-shadow: 0px 2px 2px #3f4349;
    z-index: 1;
  }
  .absolute {
    position: absolute;
  }
  .title {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 50%;
  }
  .title * {
    color: #ffffff;
    margin: 0;
  }
  .icons {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-left: 40%;
    margin-right: 40%;
  }
  .bottombar div:not(.information) {
    padding-top: 10px;
    padding-bottom: 10px;
  }
  .information {
    display: flex;
    flex-direction: column;
    width: 50%;
  }
  .information div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-left: 30px;
  }
  .information a {
    color: #ffffff;
    padding-top: 10px;
    padding-bottom: 10px;
  }
  .information a:hover {
    color: #ffffff;
    cursor: pointer;
  }
  .current {
    text-decoration: underline;
  }
</style>
