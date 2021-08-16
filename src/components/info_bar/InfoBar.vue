<template>
    
    <!-- ---------- -->
    <!--  Info Bar  -->
    <!-- ---------- -->
    <div id="info-bar">

      <div @click="toggle_info_bar('about')" class="info-bar-button">
        How to play
        <img src="@/assets/dropdown_arrow.png" :class="{ rotated: infoBarDisplay == 'about' }">
      </div>
      <transition name="slide">
        <about v-if="infoBarDisplay == 'about'"></about>
      </transition>

      <div @click="toggle_info_bar('achievements')" class="info-bar-button">
        Achievements
        <img src="@/assets/dropdown_arrow.png" :class="{ rotated: infoBarDisplay == 'achievements' }">
      </div>
      <transition name="slide">
        <achievements v-if="infoBarDisplay == 'achievements'"></achievements>
      </transition>

      <div @click="toggle_info_bar('store')" class="info-bar-button">
        Store
        <img src="@/assets/dropdown_arrow.png" :class="{ rotated: infoBarDisplay == 'store' }">
      </div>
      <transition name="slide">
        <store v-if="infoBarDisplay == 'store'"></store>
      </transition>

    </div>

</template>

<script>


import About from '@/components/info_bar/About.vue';
import Achievements from '@/components/info_bar/Achievements.vue';
import Store from '@/components/info_bar/Store.vue';


export default {
  name: 'AppBase',
  components: {
    About,
    Achievements,
    Store,
  },
  data() {
    return {
      infoBarDisplay: '',    //  Indicating the section of the info bar to display.

      //  GAME VARIABLES:

      points: 100,   //  Indicating the current point amt.

      //  ACHIEVEMENT VARIABLES
      perfect_game_count: 0,

    }
  },
  methods: {

    buy_item(item_num) {

      //  Buying a new item
      if (this.store_items[item_num].locked && this.store_items[item_num].price < this.points) {
        this.store_items[item_num].locked = false;
        this.points -= this.store_items[item_num].price;

        //  First purchase achievement.
        if (this.achievements[2].locked) 
          this.achievements[2].locked = false;

        //  All purchases achievement
        if(this.achievements[6].locked) {
          var still_things_to_buy = false;
          for (var i = 0; i < this.store_items.length; i++ ) {
            if (this.store_items[i].locked) 
              still_things_to_buy = true;
          }
          this.achievements[6].locked = still_things_to_buy;
        }
      }

      //  Toggle
      else if (this.store_items[item_num].locked == false) {
        this.store_items[item_num].on = !this.store_items[item_num].on;
      }
      
    },

    toggle_info_bar(info_bar_section) {
      if (this.infoBarDisplay != info_bar_section) {
        this.infoBarDisplay = info_bar_section;
      } else {
        this.infoBarDisplay = "";
      }
      
    }

  },
}

</script>

<style scoped>
#info-bar {
  width: 300px;
  border-left: solid 1px gray;
}

.info-bar-button {
  width: calc(100% - 20px);
  padding: 10px;
  border-top: solid 1px gray;
  display: flex;
  justify-content: space-between;
  cursor: pointer;
}
.info-bar-button:first-child {
  border-top: none;
}
.info-bar-button:last-child {
  border-bottom: solid 1px gray;
}
.info-bar-button:hover {
  text-decoration: underline;
}
.info-bar-button img {
  height: 20px;
  transition-duration: .2s;
}
.info-bar-button img.rotated {
  transform: rotate(-90deg);
}

</style>