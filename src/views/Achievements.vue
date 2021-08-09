<template>
  <div class="achievements">
    <div id="achievement-icons">
      <img src="../assets/achievements/0_OneColor.png" class="achievement" 
      @mouseover="selected = 0" @mouseleave="selected = -1" :class="{ 'locked': achievements[0].locked }">
      <img src="../assets/achievements/1_ThreeColors.png" class="achievement"
      @mouseover="selected = 1" @mouseleave="selected = -1" :class="{ locked: achievements[1].locked }">
      <img src="../assets/achievements/2_Buy.png" class="achievement"
      @mouseover="selected = 2" @mouseleave="selected = -1" :class="{ locked: achievements[2].locked }">
      <img src="../assets/achievements/3_100Pts.png" class="achievement"
      @mouseover="selected = 3" @mouseleave="selected = -1" :class="{ locked: achievements[3].locked }">
      <img src="../assets/achievements/4_250Pts.png" class="achievement"
      @mouseover="selected = 4" @mouseleave="selected = -1" :class="{ locked: achievements[4].locked }">
      <img src="../assets/achievements/5_SecretBanner.png" class="achievement"
      @mouseover="selected = 5" @mouseleave="selected = -1" :class="{ locked: achievements[5].locked }">
      <img src="../assets/achievements/6_EntireStore.png" class="achievement"
      @mouseover="selected = 6" @mouseleave="selected = -1" :class="{ locked: achievements[6].locked }">
      <img src="../assets/achievements/7_BackgroundChange.png" class="achievement"
      @mouseover="selected = 7" @mouseleave="selected = -1" :class="{ locked: achievements[7].locked }">
      <img src="../assets/achievements/8_BackgroundMatch.png" class="achievement"
      @mouseover="selected = 8" @mouseleave="selected = -1" :class="{ locked: achievements[8].locked }">
    </div>
  </div>
  <br/><br/>
  <div id="achievement-description">
    <div v-if="selected != -1">
      <h3>{{ achievements[selected].name }}</h3>
      <p>{{ achievements[selected].description }}</p>
      <p>Status: <span v-if="achievements[selected].locked">Locked</span><span v-else>Unlocked</span></p>
    </div>
  </div>
</template>

<script>

export default {
  name: 'achievements',
  data() {
    return {
      selected: -1,
      achievements: [
        { name: 'One color perfect',
          description: 'Answer one color perfectly.',
          locked: true,
          img: '0_OneColor.png'
        }, {
          name: 'Three colors perfect',
          description: 'Answer three colors perfectly.',
          locked: true,
          img: '1_ThreeColors.png',
        }, {
          name: 'Buy an item',
          description: 'Use your points to buy something at the store.',
          locked: true,
          img: '2_Buy.png',
        }, {
          name: '100 Points',
          description: 'Earn 100 points.',
          locked: true,
          img: '3_100Pts.png'
        }, {
          name: '250 Points',
          description: 'Earn 100 points.',
          locked: true,
          img: '4_250Pts.png'
        }, {
          name: 'Banner secret',
          description: 'Find the secret in the subtitle banner.',
          locked: true,
          img: '5_SecretBanner.png'
        }, {
          name: 'Buy the entire store',
          description: 'Buy every available item in the store.',
          locked: true,
          img: '6_EntireStore.png'
        }, {
          name: 'Change the BG color',
          description: 'Change the background color in the store.',
          locked: true,
          img: '7_BackgroundChange.png',
        }, {
          name: 'Guess the BG color',
          description: 'Answer when the answer color, guess color, and BG color all match.',
          locked: true,
          img: '8_BackgroundMatch.png',
        }, 
      ]
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
