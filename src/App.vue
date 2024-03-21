<template>
  <!-- <h1>begain</h1>
  <img alt="Vue logo" src="./assets/logo.png"> -->
  <div id="universe">
    <coreVis/>
    </div>

</template>

<script>

import coreVis from '@/coreVis.vue'


export default {
  name: 'App',
  components: {
    coreVis,
  },
  data(){
    return{
    }
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: -10px;
  margin-left: -8px;
  /* margin-top: -10px; */
}
#universe{
  white-space:nowrap;
}
</style>
