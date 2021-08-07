<template>
  <div class="color-display">
    <div class="color-square"
         :style="'background: rgb(' + color_value.r + ', ' + color_value.g + ', ' + color_value.b + ');'">
    </div>
    <p v-if="!hidden">#{{hex_string}}</p>
    <p v-else>#??????</p>
  </div>
</template>

<script>
export default {
  name: 'ColorDisplay',
  
  props: {
    //  When true, display #?????? instead of the hex value. 
    hidden: {
      type: Boolean,
      default: false,
    },
    //  The color value, with R, G, and B values. 
    color_value: {
        type: Object,
        default() { return { r: 1, g: 2, b: 3 }; },
        validator: function (value) {
            return (typeof(value.r) == "number" && typeof(value.g) == "number" && typeof(value.b) == "number");
        }
    },
  },

  computed: {
    //  An updating version of the color string. 
    hex_string() {
      return this.numberToHex(this.color_value.r) + this.numberToHex(this.color_value.g) + this.numberToHex(this.color_value.b);
    }
  },

  methods: {
    //  Given a digit, return a 2 place hex number.
    numberToHex(num) {
      var hex_num = Number(num).toString(16);
      if (Number(num) < 16) {
        hex_num = "0" + hex_num;
      }
      return hex_num;
    }
  }

}
</script>

<style scoped>

  .color-square {
    width: 100px;
    height: 100px;
    border: solid black 2px;
    margin: 10px auto;
  }
  .color-display p {
    font-family: 'Courier New', monospace;
  }
</style>

