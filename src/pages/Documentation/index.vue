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
        <p class="document-header" id="endpoints">About Endpoints</p>
        <div class="hill">
          <p>
            The Bored API returns random or specified activities based on user-defined parameters.
            Responses come with multiple fields to help determine the price, participants, and
            other factors.
          </p>
          <!-- <p><b>Add more</b></p> -->
        </div>

        <div class="hill-box" id="events">
          <div class="hill-box-header">
            <p>Events</p>
          </div>
          <div class="hill-box-body">
            <DocumentationEndpoint type="GET" endpoint="/api/activity/" description="Get a random event" query="http://boredapi.com/api/activity/" response='{
  "activity": "Learn Express.js",
  "accessibility": 0.25,
  "type": "education",
  "participants": 1,
  "price": 0.1,
  "link": "https://expressjs.com/",
  "key": "3943506"
} '/>

            <br>

            <DocumentationEndpoint type="GET" endpoint="/api/activity?key=:key" description="Find an activity by its key" query="http://boredapi.com/api/activity?key=5881028" response='{
  "activity": "Learn a new programming language",
  "accessibility": 0.25,
  "type": "education",
  "participants": 1,
  "price": 0.1,
  "key": "5881028"
}' />

            <br>

            <DocumentationEndpoint type="GET" endpoint="/api/activity?type=:type" description="Find a random activity with a given type" query="http://boredapi.com/api/activity?type=recreational" response='{
  "activity": "Learn how to play a new sport",
  "accessibility": 0.2,
  "type": "recreational",
  "participants": 1,
  "price": 0.1,
  "key": "5808228"
}' />

            <br>

            <DocumentationEndpoint type="GET" endpoint="/api/activity?participants=:participants" description="Find a random activity with a given number of participants" query="http://boredapi.com/api/activity?participants=1" response='{
  "activity": "Learn how to fold a paper crane",
  "accessibility": 0.05,
  "type": "education",
  "participants": 1,
  "price": 0.1,
  "key": "3136036"
}' />

          <br/>
          <ResponseDescription field="activity" type="String" description="Description of the queried activity"/>
          <ResponseDescription field="accessibility" type="Number" description="A factor describing how possible an event is to do with zero being the most accessible" value="[0.0, 1.0]"/>
          <ResponseDescription field="type" type="String" description="Type of the activity" value='["education", "recreational", "social", "diy", "charity", "cooking", "relaxation", "music", "busywork"]'/>
          <ResponseDescription field="participants" type="Number" description="The number of people that this activity could involve" value="[0, n]"/>
          <ResponseDescription field="price" type="String" description="A factor describing the cost of the event with zero being free" value="[0, 1]"/>
          <ResponseDescription field="key" type="String" description="A unique numeric id" value="[1000000, 9999999]"/>

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
  import DocumentationEndpoint from '@/components/DocumentationEndpoint'
  import ResponseDescription from '@/components/ResponseDescription'

  export default {
    name: 'Documentation',
    components: {
      Topbar,
      Intro,
      Bottombar,
      DocumentationEndpoint,
      ResponseDescription
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
    margin: 30px 5px 0px 5px;
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
  @media only screen and (max-width: 500px) {
    .content {
      flex-direction: column;
    }
    .navigation {
      width: 100%;
      position: inherit;
    }
    .documents {
      width: 100%;
    }
    .well p {
      white-space: nowrap;
      overflow: scroll;
    }
  }
</style>
