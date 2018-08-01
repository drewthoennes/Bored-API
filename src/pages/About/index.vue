<template>
  <div class="about container-fluid">
    <div class="topbar-div">
      <Topbar boldAbout/>
    </div>

    <div class="intro-div">
      <Intro about/>
    </div>

    <div class="content">
      <div class="accordian">
        <div class="accordian-header">
          <p>What's the purpose behind this API?</p>
          <i v-if="accordian1 === 0" class="fas fa-plus" @click="accordian1 = 1"></i>
          <i v-else="accordian1 === 1" class="fas fa-minus" @click="accordian1 = 0"></i>
        </div>
        <div class="accordian-body" v-bind:class="{ expanded: accordian1 === 1 }">
          <p>The Bored API serves to find activities to do. It has various fields that help determine anything from the price of the activity to the number of participants.</p>
        </div>
      </div>

      <div class="accordian">
        <div class="accordian-header">
          <p>What did you build the API with?</p>
          <i v-if="accordian2 === 0" class="fas fa-plus" @click="accordian2 = 1"></i>
          <i v-else="accordian2 === 1" class="fas fa-minus" @click="accordian2 = 0"></i>
        </div>
        <div class="accordian-body" v-bind:class="{ expanded: accordian2 === 1 }">
          <p>This whole application is a server-side rendered Express.js program. The tech stacks are listed below:</p>
          <p>Frontend</p>
          <ul>
            <li>Vue.js</li>
          </ul>
          <p>Backend</p>
          <ul>
            <li>Node.js</li>
            <li>MongoDB and Mongoose</li>
            <li>Morgan</li>
          </ul>
        </div>
      </div>
    </div>

    <!--
      https://pokeapi.co/docsv2/
      https://api.pandascore.co/doc
    -->
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
    name: 'About',
    components: {
      Topbar,
      Intro,
      Bottombar
    },
    data () {
      return {
        accordian1: 0,
        accordian2: 0
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
    margin-left: 10%;
    margin-right: 10%;
    margin-top: 30px;
  }
  .accordian {
    margin-bottom: 15px;
  }
  .accordian-header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  .accordian-header i {
    line-height: 33px;
  }
  .accordian-body {
    min-height: 0;
    max-height: 0;
    padding: 0px 20px 0px 20px;
    transition: min-height .5s, max-height .5s, padding-top .5s, padding-bottom .5s;
  }
  .expanded {
    min-height: 250px;
    max-height: 250px;
    padding: 20px;
  }
  .bottombar-div {
    height: 25%;
  }
</style>
