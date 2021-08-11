<template>
  <div class="store">
  
    <br/>
    <h3>The store!</h3>
    <br/>
    <div id="store-icons">
      <div class="store-item" v-for="(item, i) in storeitems" :key="i">
        <img :src="item.img" class="store-item-image" @mouseover="selected = i" 
          @mouseleave="selected = -1" :class="{ 'locked': item.locked }"
          @click="$emit('buy', i)">
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

  props: {
    storeitems:  {
      type: Array,
      required: true
    },
    points: {
      type: Number,
      requred: true
    }
  },

  data() {
    return {
      selected: 0,
      
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

</style>
