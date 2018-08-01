<template>
  <div class="documentation container-fluid">
    <div class="topbar-div">
      <Topbar boldDocumentation/>
    </div>

    <div class="intro-div">
      <Intro documentation/>
    </div>

    <div class="content">
      <div class="navigation">
        Navigation
      </div>
      <div class="documents">
        <p class="document-header">Endpoints</p>
        <div class="hill">
          <p>
            The Bored API exists to find things to fight boredom, so there are two endpoints: one for random events and one for querying for a specific events.
          </p>
          <p><b>Add more</b></p>
        </div>

        <div class="hill-box">
          <div class="hill-box-header">
            <p>Events</p>
          </div>
          <div class="hill-box-body">
            <p class="hill-box-body-header"><b>Random Event</b></p>
            <p>Get a random event</p>
            <div class="endpoint">
              <div class="endpoint-type">
                <p><b>GET</b></p>
              </div>
              <div class="endpoint-text">
                <p>/api/random</p>
              </div>
            </div>
            <p>Sample Response:</p>
            <div class="well">
              <pre>
{
  "activity": "Learn Express.js",
  "accessibility": 0.25,
  "type": "Education",
  "participants": 1,
  "price": 0.1,
  "link": "https://expressjs.com/",
  "key": "3943506",
  "enabled": true
}</pre>
            </div>

            <br>
            <p class="hill-box-body-header"><b>Query for Event</b></p>
            <p>Get an specific event by the event id</p>
            <div class="endpoint">
              <div class="endpoint-type">
                <p><b>GET</b></p>
              </div>
              <div class="endpoint-text">
                <p>/api/:id</p>
              </div>
            </div>
            <p>Sample Response:</p>

            <div class="well">
              <pre>
{
  "activity": "Learn to greet someone in a new language",
  "accessibility": 0.2,
  "type": "Education",
  "participants": 1,
  "price": 0.1,
  "key": "4704256",
  "enabled": true
}</pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Topbar from '@/components/Topbar'
  import Intro from '@/components/Intro'

  export default {
    name: 'Documentation',
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
  .documentation {
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
    background: #f8f8f8;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  .navigation {
    width: 25%;
    text-align: left;
    margin: 30px 5px 0px 5px;
  }
  .documents {
    width: 75%;
    text-align: left;
    margin: 30px 5px 0px 5px;
  }
  .documents * {
    margin-left: 10px;
    margin-right: 10px;
  }
  .document-header {
    font-size: 24px;
    margin-bottom: 0;
  }
  .well {
    width: 100%;
  }
  .hill p b {
    margin: 0;
  }
  .hill-box div * {
    margin: 0;
  }
</style>
