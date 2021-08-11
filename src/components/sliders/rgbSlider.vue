<template>
  <div id="rgb-sliders">
    <div class="slider">
      <p>R</p>
      <input type="range" min="0" max="255"  class="slider" :value="color_value.r" @change="new_value({ r: color_value.r })">
      <input type="number" min="0" max="255" class="number-picker" :value="color_value.r" @change="new_value({ r: color_value.r })">
      <div class="guess-result">{{ hints.r }}</div>
    </div>
    <div class="slider">
      <p>G</p>
      <input type="range" min="0" max="255" class="slider" :value="color_value.g" @change="new_value({ g: $event.target.value })">
      <input type="number" min="0" max="255" class="number-picker" :value="color_value.g" @change="new_value({ g: $event.target.value })">
      <div class="guess-result">{{ hints.g }}</div>
    </div>
    <div class="slider"> 
      <p>B</p>
      <input type="range" min="0" max="255" class="slider" :value="color_value.b" @change="new_value({ b: color_value.b })">
      <input type="number" min="0" max="255" class="number-picker" :value="color_value.b" @change="new_value({ b: color_value.b })">
      <div class="guess-result">{{ hints.b }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'rgbSlider',

  props: {
    //  The color value, with R, G, and B values. 
    color_value: {
      type: Object,
      default() { return { r: 1, g: 2, b: 3 }; },
      validator: function (value) {
          return (typeof(value.r) == "number" && typeof(value.g) == "number" && typeof(value.b) == "number");
      }
    },

    hints: {
      type: Object,
      default() { return { r: "", g: "", b: "" }; },
      validator: function (value) {
          return (typeof(value.r) == "string" && typeof(value.g) == "string" && typeof(value.b) == "string");
      }
    },
  },

  methods: {
    new_value(new_val_obj) {
      console.log(new_val_obj)

      var new_value = JSON.parse(JSON.stringify(this.color_value));
      var colors = ['r','g','b'];
      for (var i = 0; i < colors.length; i++) {
        if (new_val_obj[ colors[i] ] != undefined) {
          new_value[ colors[i] ] = Number(new_val_obj[ colors[i] ]);
        }
      }
      console.log("Emitting new value:");
      console.log(new_value);
      this.$emit('change', new_value);
    }
  },

}
</script>

<style scoped>

</style>