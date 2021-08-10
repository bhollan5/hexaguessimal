<template>
  <div class="achievements">

    <h3>Achievements!</h3>
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
</template>

<script>


export default {
  name: 'achievements',

  props: {
    achievements:  {
      type: Array,
      required: true
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
  width: 50%;
  margin: 0px auto;
}

.achievement {
  margin: 10px;
  cursor: pointer;
  width: 50px;
}

.locked {
  filter: brightness(50%);
}

#achievement-description {

}

</style>
