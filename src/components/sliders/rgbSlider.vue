<template>
  <div id="rgb-sliders">
    <div class="slider">
      <p>R</p>
      <input type="range" min="0" max="255"  class="slider" :value="color_value.r" @input="new_value({ r: $event.target.value })">
      <input type="number" min="0" max="255" class="number-picker" :value="color_value.r" @input="new_value({ r: $event.target.value })">
      <div class="guess-result">{{ hints.r }}</div>
    </div>
    <div class="slider">
      <p>G</p>
      <input type="range" min="0" max="255" class="slider" :value="color_value.g" @input="new_value({ g: $event.target.value })">
      <input type="number" min="0" max="255" class="number-picker" :value="color_value.g" @input="new_value({ g: $event.target.value })">
      <div class="guess-result">{{ hints.g }}</div>
    </div>
    <div class="slider"> 
      <p>B</p>
      <input type="range" min="0" max="255" class="slider" :value="color_value.b" @input="new_value({ b: $event.target.value })">
      <input type="number" min="0" max="255" class="number-picker" :value="color_value.b" @input="new_value({ b: $event.target.value })">
      <div class="guess-result">{{ hints.b }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'rgbSlider',

  computed: {
    //  The color value, with R, G, and B values. 
    color_value() {
      return this.$store.getters['game/guess_color'];
    },

    hints() {
      return this.$store.getters['game/hints'];
    }
  },

  methods: {
    new_value(new_val_obj) {

      var new_value = JSON.parse(JSON.stringify(this.color_value));
      var colors = ['r','g','b'];
      for (var i = 0; i < colors.length; i++) {
        if (new_val_obj[ colors[i] ] != undefined) {
          new_value[ colors[i] ] = Number(new_val_obj[ colors[i] ]);
        }
      }
      this.$store.commit('game/update_guess_color', new_value);
    }
  },

}
</script>

<style scoped>

</style>