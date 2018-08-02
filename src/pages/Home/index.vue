<template>
  <div class="home container-fluid">
    <div class="topbar-div">
      <Topbar/>
    </div>

    <div class="intro-div">
      <Intro home/>
    </div>

    <div class="info-div">
      <Info/>
    </div>

    <div class="content">
      <h1>Try it out</h1>
      <div class="search">
        <span>https://boredapi.com/api/</span>
        <input type="text" v-model="endpoint" ></input>
        <button @click="query(endpoint)">Submit</button>
      </div>
      <div class="well">
        <pre>{{ response }}</pre>
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
  import Info from '@/components/Info'
  import Bottombar from '@/components/Bottombar'

  export default {
    name: 'Home',
    components: {
      Topbar,
      Intro,
      Info,
      Bottombar
    },
    data () {
      return {
        endpoint: "activity/random",
        response: ""
      }
    },
    methods: {
      query: function(endpoint) {
        this.$http.get('/api/' + endpoint).then(response => {
          this.response = response.body;
        });
      }
    },
    mounted() {
      this.query(this.endpoint);
    }
  }
</script>

<style scoped>
  h1, h2 {
    font-weight: normal;
  }
  .home {
    height: 100%;
    padding: 0;
    margin: 0;
  }
  .topbar-div {
    height: 10%;
  }
  .intro-div {
    height: 25%;
  }
  .info-div {
    height: 25%;
  }
  .content {
    margin-left: 10%;
    margin-right: 10%;
    margin-top: 30px;
    margin-bottom: 30px;
  }
  .search {
    width: calc(100% - 20px);
    margin-left: 10px;
    margin-right: 10px;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  .search span {
    width: 200px;
    text-align: center;
    background: #f8f8f8;
    line-height: 46px;
    border-radius: 4px 0px 0px 4px;
    border-right: 1px solid rgba(0, 0, 0, 0.1);
  }
  .search input {
    width: calc(100% - 260px);
    padding: 5px;
    border: 0;
  }
  .search input:focus {
    outline: none;
  }
  .search button {
    background: #6ba3ff;
    border: 0px;
    color: white;
    border-radius: 0px 4px 4px 0px;
  }
  .bottombar-div {
    height: 25%;
  }
</style>
