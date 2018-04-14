<template>
  <div id="app">
    <h1>NPM package download stats</h1>
    <h2>SVG + Vue.js</h2>
    <div>
      <input type="text" placeholder="Enter package name" v-model="packageName" @keydown.enter="getDownloadStats">
      <button @click="getDownloadStats">Get download stats</button>
    </div>

    <div v-if="isLoading">
      <i>Fetching download stats</i>
    </div>
    <div v-else-if="stats == 'error'">
      <h2>Package not found</h2>
    </div>
    <div v-else-if="stats">
      <Chart :stats="stats"/>
    </div>

  </div>
</template>

<script>
import Chart from './components/Chart';

export default {
  name: 'App',
  components: {
    Chart,
  },
  data() {
    return {
      packageName: '',
      stats: null,
      isLoading: false
    }
  },
  methods: {
    getDownloadStats() {
      this.isLoading = true;
      let that = this;
      let xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
          if (this.readyState == 4) {
            that.isLoading = false;

            if(this.status == 200) {
              that.stats = JSON.parse(xhttp.responseText);
            } else if(this.status == 404) {
              that.stats = 'error';
            }

          }
      };
      xhttp.open('GET', `https://api.npmjs.org/downloads/range/2018-01-03:2018-02-03/${this.packageName}`, true);
      xhttp.send();
    }
  }
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
