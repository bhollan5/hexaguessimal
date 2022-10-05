<template>
    <div id="store">
    
      <br/>
      <h3>The store!</h3>
      <br/>
      <div id="store-icons">
        <div class="store-item" v-for="(item, i) in storeitems" :key="i">
          <img :src="item.img" class="store-item-image" @mouseover="selected = i" 
            @mouseleave="selected = -1" :class="{ 'locked': item.locked }"
            @click="buy_item(i)">
          <div class="store-item-toggle" v-if="!item.locked && item.on">ON</div>
          <div class="store-item-toggle" v-else-if="!item.locked && !item.on">OFF</div>
        </div>
      </div>
      
      <br/><br/>
      <p>Your current point total: {{ points }} </p>
      <br/><br/>
      <div id="store-item-description">
        <div v-if="selected != -1">
          <h3>{{ storeitems[selected].name }}</h3>
          <p>{{ storeitems[selected].description }}</p>
          <p>Price: {{ storeitems[selected].price }}</p>
          <p>Status: <b v-if="storeitems[selected].locked">Locked</b><b v-else>Unlocked</b></p>
        </div>
      </div>
  
    </div>
  </template>
  
  <script>
  
  export default {
    name: 'store',
  
    computed: {
      storeitems()  {
        return this.$store.getters['store/items'];
      },
      achievements()  {
        return this.$store.getters['achievements/achievements'];
      },
      points() {
        return this.$store.getters['game/points']
      }
    },
  
    data() {
      return {
        selected: 0,
        
      }
    },
  
    methods: {
      buy_item(item_num) {
  
        //  Buying a new item
        if (this.storeitems[item_num].locked && this.storeitems[item_num].price < this.points) {
          this.$store.commit('store/buy_item', item_num);
          this.$store.commit('game/add_points', this.storeitems[item_num].price);
  
          //  First purchase achievement.
          if (this.achievements[2].locked) 
            this.$store.commit('achievements/earn_achievement', 2);
          //  All purchases achievement
          /*
          if(this.achievements[6].locked) {
            var still_things_to_buy = false;
            for (var i = 0; i < this.storeitems.length; i++ ) {
              if (this.storeitems[i].locked) 
                still_things_to_buy = true;
            }
            this.achievements[6].locked = still_things_to_buy;
          }*/
        }
  
        //  Toggle
        else if (this.storeitems[item_num].locked == false) {
          this.storeitems[item_num].on = !this.storeitems[item_num].on;
        }
        
      }
    }
    
  }
  </script>
  
  <style scoped>
  #store-icons {
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    width: 50%;
    margin: 0px auto;
  }
  
  .store-item {
    margin: 10px;
    cursor: pointer;
    width: 50px;
  }
  
  .locked {
    filter: brightness(50%);
  }
  
  #store {
    font-size: 12px;
  }
  
  </style>
  