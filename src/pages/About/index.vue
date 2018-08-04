<template>
  <div class="about container-fluid">
    <div class="topbar-div">
      <Topbar boldAbout/>
    </div>

    <div class="intro-div">
      <Intro about/>
    </div>

    <div class="content">
      <div class="accordion">
        <div class="accordion-header" @click="accordion1 = accordion1 ? 0 : 1">
          <p>What's the purpose behind this API?</p>
          <i v-if="accordion1 === 0" class="fas fa-plus"></i>
          <i v-else="accordion1 === 1" class="fas fa-minus"></i>
        </div>
        <div class="accordion-body" v-bind:class="{ expanded: accordion1 === 1, closed: accordion1 !== 1 }">
          <p>The Bored API serves to find activities to do. It has various fields that help determine anything from the price of the activity to the number of participants.</p>
        </div>
      </div>

      <div class="accordion">
        <div class="accordion-header" @click="accordion2 = accordion2 ? 0 : 1">
          <p>What did you build the API with?</p>
          <i v-if="accordion2 === 0" class="fas fa-plus"></i>
          <i v-else="accordion2 === 1" class="fas fa-minus"></i>
        </div>
        <div class="accordion-body" v-bind:class="{ expanded: accordion2 === 1, closed: accordion2 !== 1 }">
          <p>This whole application is a server-side rendered Express.js program. The tech stacks are listed below:</p>
          <p>Frontend</p>
          <ul>
            <li>Vue.js</li>
            <li>vue-router</li>
            <li>vue-resource</li>
          </ul>
          <p>Backend</p>
          <ul>
            <li>Node.js</li>
            <li>MongoDB and Mongoose</li>
          </ul>
        </div>
      </div>

      <div class="accordion">
        <div class="accordion-header" @click="accordion3 = accordion3 ? 0 : 1">
          <p>How do I use the this?</p>
          <i v-if="accordion3 === 0" class="fas fa-plus"></i>
          <i v-else="accordion3 === 1" class="fas fa-minus"></i>
        </div>
        <div class="accordion-body" v-bind:class="{ expanded: accordion3 === 1, closed: accordion3 !== 1 }">
          <p>Please check out the <router-link :to="{ name: 'Documentation'}">documentation</router-link> for examples. If you still can't figure it out, feel free to submit a ticket on the <a href="https://github.com/drewthoennes/Bored-API/issues">GitHub</a></p>
        </div>
      </div>

      <div class="accordion">
        <div class="accordion-header" @click="accordion4 = accordion4 ? 0 : 1">
          <p>This is awesome! How can I contribute?</p>
          <i v-if="accordion4 === 0" class="fas fa-plus"></i>
          <i v-else="accordion4 === 1" class="fas fa-minus"></i>
        </div>
        <div class="accordion4-body" v-bind:class="{ expanded: accordion4 === 1, closed: accordion4 !== 1 }">
          <p>Any new suggestions or features would be very helpful! Feel free to submit a <a href="https://github.com/drewthoennes/Bored-API/pulls"> pull request</a> or submit a <a href="https://github.com/drewthoennes/Bored-API/issues">feature request</a></p>
        </div>
      </div>

      <div class="accordion">
        <div class="accordion-header" @click="accordion5 = accordion5 ? 0 : 1">
          <p>Is there any way I can support this project?</p>
          <i v-if="accordion5 === 0" class="fas fa-plus"></i>
          <i v-else="accordion5 === 1" class="fas fa-minus"></i>
        </div>
        <div class="accordion-body" v-bind:class="{ expanded: accordion5 === 1, closed: accordion5 !== 1 }">
          <p>Thank you for asking! We're currently paying for the costs to run this application with no backing. Any donations would be very appreciated and would help keep this project running.</p>
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
        accordion1: 0,
        accordion2: 0,
        accordion3: 0,
        accordion4: 0,
        accordion5: 0
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
  .accordion-header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  .accordion-header i {
    line-height: 33px;
  }
  .accordion-body {
    padding: 0px 20px 0px 20px;
  }
  .closed {
    min-height: 0px;
    max-height: 0px;
  }
  .expanded {
    min-height: 100%;
    max-height: 100%;
    padding: 20px;
  }
  .bottombar-div {
    height: 25%;
  }
</style>
