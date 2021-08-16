<template>
  <div style="font-size: 12px;">
    <div class="achievements">

      <p style="font-style: italic;text-align:center;">Achievements!</p>
      <p>Below are a list of unlockable achievments.</p>
      <p>Hover over one to see how to get it!</p>
      <br/>

      <div id="achievement-icons">
        <img v-for="(item, i) in achievements" :src="item.img" class="achievement" :key="i"
        @mouseover="selected = i" @mouseleave="selected = -1" :class="{ 'locked': achievements[i].locked }">
      </div>
    </div>

    <br/><br/>
    <div id="achievement-description">
      <div v-if="selected != -1">
        <h3>{{ achievements[selected].name }}</h3>
        <p>{{ achievements[selected].description }}</p>
        <p>Status: <b v-if="achievements[selected].locked">Locked</b><b v-else>Unlocked</b></p>
      </div>
    </div>
  </div>
</template>

<script>


export default {
  name: 'achievements',

  computed: {
    achievements()  {
      return this.$store.getters['achievements/achievements'];
    }
  },

  data() {
    return {
      selected: -1,
            
    }
  }
}
</script>

<style scoped>

#achievement-icons {
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
}

.achievement {
  margin: 10px;
  cursor: pointer;
  width: 25px;
  border: solid 2px teal;
}

.locked {
  filter: brightness(50%);
  border: solid 2px black;
}

#achievement-description {
  height: 250px;
  position: relative;
  transition-duration: .2s;
}
#achievement-description div {
  position: absolute;
  width: calc(100% - 10px);
  margin: 5px;
}
</style>
