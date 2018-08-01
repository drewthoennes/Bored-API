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
        <div class="navigation-version">
          <button @click="$router.push('/documentation')">V1</button>
        </div>
        <div class="navigation-links">
          <a href="/documentation#endpoints">Endpoints</a>
          <a href="/documentation#events">Events</a>
        </div>
      </div>
      <div class="documents">
        <p class="document-header" id="endpoints">Endpoints</p>
        <div class="hill">
          <p>
            The Bored API exists to find things to fight boredom, so there are two endpoints: one for random events and one for querying for a specific events.
          </p>
          <p><b>Add more</b></p>
        </div>

        <div class="hill-box" id="events">
          <div class="hill-box-header">
            <p>Events</p>
          </div>
          <div class="hill-box-body">
            <div class="endpoint">
              <div class="endpoint-type">
                <p><b>GET</b></p>
              </div>
              <div class="endpoint-text">
                <p>/api/random</p>
              </div>
            </div>
            <p>Get a random event</p>
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
            <div class="endpoint">
              <div class="endpoint-type">
                <p><b>GET</b></p>
              </div>
              <div class="endpoint-text">
                <p>/api/:id</p>
              </div>
            </div>
            <p>Get an specific event by the event id</p>
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
    name: 'Documentation',
    components: {
      Topbar,
      Intro,
      Bottombar
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
    height: 25%;
    text-align: left;
    margin: 30px 5px 0px 15px;
    padding: 10px;
    position: sticky;
    top: 30px;
  }
  .navigation * {
    margin: 0;
  }
  .navigation-version {
    margin-bottom: 10px;
    box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.1);
    text-align: center;
    display: flex;
    flex-direction: row;
  }
  .navigation-version button {
    background: #6ba3ff;
    height: 100%;
    width: 100%;
    border: 0;
    color: white;
    padding: 10px;
  }
  .navigation-version button:hover {
    cursor: pointer;
  }
  .navigation-version button:focus {
    /* background: #5b8ad8; */
    outline: none;
  }
  .navigation-links {
    background: white;
    box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.1), 0px -1px 1px rgba(0, 0, 0, 0.05);
    display: flex;
    flex-direction: column;
    padding: 10px;
  }
  .navigation-links a {
    color: black;
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
  .hill {
    margin-bottom: 20px;
  }
  .hill-box {
    margin-bottom: 20px;
  }
  .hill-box div * {
    margin: 0;
  }
  .bottombar-div {
    height: 25%;
  }
</style>
