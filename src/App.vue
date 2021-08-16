<template>
  <div id="content">
    <game></game>
    <info-bar></info-bar>

  </div>
</template>

<script>

import Game from '@/components/Game.vue';
import InfoBar from '@/components/info_bar/InfoBar.vue';

export default {
  name: 'AppBase',
  components: {
    Game,
    InfoBar
  },
  data() {
    return {
      
    }
  },
  methods: {
    
  }
}

</script>

<style>
#content {
  display: flex;
  margin: 20px auto;
  min-width: 600px;
  width: 70%;
  min-height: 700px;
  background: white;
  border: solid gray 2px;
}
</style>
