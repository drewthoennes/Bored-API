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
        <div class="accordian-body" v-bind:class="{ expanded1: accordian1 === 1 }">
          <p>The Bored API serves to find activities to do. It has various fields that help determine anything from the price of the activity to the number of participants.</p>
        </div>
      </div>

      <div class="accordian">
        <div class="accordian-header">
          <p>What did you build the API with?</p>
          <i v-if="accordian2 === 0" class="fas fa-plus" @click="accordian2 = 1"></i>
          <i v-else="accordian2 === 1" class="fas fa-minus" @click="accordian2 = 0"></i>
        </div>
        <div class="accordian-body" v-bind:class="{ expanded2: accordian2 === 1 }">
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

      <div class="accordian">
        <div class="accordian-header">
          <p>How do I use the this?</p>
          <i v-if="accordian3 === 0" class="fas fa-plus" @click="accordian3 = 1"></i>
          <i v-else="accordian3 === 1" class="fas fa-minus" @click="accordian3 = 0"></i>
        </div>
        <div class="accordian-body" v-bind:class="{ expanded3: accordian3 === 1 }">
          <p>Please check out the <router-link :to="{ name: 'Documentation'}">documentation</router-link> for examples. If you still can't figure it out, feel free to submit a ticket on the <a href="https://github.com/drewthoennes/Bored-API/issues">GitHub</a></p>
        </div>
      </div>

      <div class="accordian">
        <div class="accordian-header">
          <p>This is awesome! How can I contribute?</p>
          <i v-if="accordian4 === 0" class="fas fa-plus" @click="accordian4 = 1"></i>
          <i v-else="accordian4 === 1" class="fas fa-minus" @click="accordian4 = 0"></i>
        </div>
        <div class="accordian-body" v-bind:class="{ expanded4: accordian4 === 1 }">
          <p>Any new suggestions or features would be very helpful! Feel free to submit a <a href="https://github.com/drewthoennes/Bored-API/pulls"> pull request</a> or submit a <a href="https://github.com/drewthoennes/Bored-API/issues">feature request</a></p>
        </div>
      </div>

      <div class="accordian">
        <div class="accordian-header">
          <p>Is there any way I can support this project?</p>
          <i v-if="accordian5 === 0" class="fas fa-plus" @click="accordian5 = 1"></i>
          <i v-else="accordian5 === 1" class="fas fa-minus" @click="accordian5 = 0"></i>
        </div>
        <div class="accordian-body" v-bind:class="{ expanded5: accordian5 === 1 }">
          <p>I'm so delighted you asked! We're currently paying for the costs to run this application with no backing. Any donations would be very appreciated and would help keep this project running.</p>
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
        accordian2: 0,
        accordian3: 0,
        accordian4: 0,
        accordian5: 0
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
    min-height: 33.5%;
    background: #f8f8f8;
    padding-left: 10%;
    padding-right: 10%;
    padding-bottom: 25px;
  }
  .accordian {
    /* margin-bottom: 15px; */
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
  .expanded1 {
    min-height: 98px;
    max-height: 98px;
    padding: 20px;
  }
  .expanded2 {
    min-height: 262px;
    max-height: 262px;
    padding: 20px;
  }
  .expanded3 {
    min-height: 98px;
    max-height: 98px;
    padding: 20px;
  }
  .expanded4 {
    min-height: 98px;
    max-height: 98px;
    padding: 20px;
  }
  .expanded5 {
    min-height: 98px;
    max-height: 98px;
    padding: 20px;
  }
  .bottombar-div {
    height: 25%;
  }
</style>
