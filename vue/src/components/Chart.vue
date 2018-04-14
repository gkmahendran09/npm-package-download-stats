<template>
  <div>
    <h3 v-if="stats">
      Start Date: {{stats.start}},
      End Date: {{stats.end}}
    </h3>
    <div class="chartArea">
      <div class="box">
        <svg height="40" width="200" fill="rgba(137, 86, 255, .2)" stroke-width="3" stroke="#8956FF" @mouseover="onMouseOver" @mouseout="isHover=false">
          <path :d="path" stroke="none" fill="rgba(137, 86, 255, .2)"></path>
          <polyline :points="points"
                  stroke-width="3" stroke="#8956FF" fill="none" />
          <g v-if="isHover">
            <line :x1="hoverOffsetX" :x2="hoverOffsetX" y1="0" y2="40" stroke-width="2"></line>
            <circle :cx="hoverOffsetX" :cy="hoverOffsetY" r="2"></circle>
          </g>
        </svg>
        <div v-if="hoverValue">
          <h5>Downloads: {{hoverValue.downloads}}</h5>
          <h5>Day: {{hoverValue.day}}</h5>
        </div>
      </div>
      <div class="box">
        <h3>API response</h3>
        <pre>
{{stats}}
        </pre>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Chart',
  props: ["stats"],
  data() {
    return {
      isHover: false,
      hoverOffsetX: 0,
      hoverOffsetY: 20,
      hoverValue: null,
    };
  },

  computed: {
    pathArr() {
      let downloads = this.stats.downloads;
      let hits = [];
      downloads.forEach(d => {
        hits.push(d.downloads)
      });
      let len = hits.length;

      let x = 0; // initial x-axis value
      let y = null;

      let width = 200; // x-axis max-width
      let height = 40; // y-axis max-height

      let inc = parseInt(width/len); // x-axis space

      let path = {};
      path.x = [];
      path.y = [];
      path.xy = [];

      let max = Math.max(...hits); // the max in bound in the given array

      for(let i=0; i<len; i++) {
        y = parseInt(height - (( hits[i] / max ) * height));
        path.x.push(x);
        path.y.push(y);
        path.xy.push(`${x},${y}`);
        x = x + inc;
      }

      return path;

    },
    points() {
      return this.pathArr.xy.join(' ');
    },

    path() {
      let arr = this.points.split(' ');
      let lastX = arr[arr.length - 1].split(',')[0];
      return `M 0,40 ${this.points} ${lastX},40`
    }
  },

  methods: {
    onMouseOver(e) {
      let index = this.pathArr.x.findIndex(ele => {return ele >= e.offsetX })
      this.hoverOffsetX = this.pathArr.x.find(ele => {return ele >= e.offsetX });
      this.hoverOffsetY = this.pathArr.y[index];
      this.isHover=true;

      this.hoverValue = this.stats.downloads[index];
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

.chartArea {
  margin: 0 auto;
  width: 1014px;
}

.box {
  float: left;
  width: 500px;
  height: 300px;
  border: 1px solid #000;
  overflow: auto;
  text-align: left;
  box-sizing: border-box;
  margin-right: 10px;
  padding: 10px;
}

.box:last-child {
  margin-right: 0;
}
</style>
