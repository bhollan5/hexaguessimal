<template>
  <div class="game">
    <!--
    <img alt="Vue logo" src="../assets/logo.png">-->
    <div id="color-displays">
      <ColorDisplay :color_value="answer_color" :hidden="in_game" />
      <ColorDisplay :color_value="guess_color" />
    </div>

    <div class="button-link" style="margin: auto;" @click="answer_color = new_color()">New Color</div>

    <!--  Color guessing sliders  -->
    <div id="slider-container">
      <div class="slider">
        <p>R</p>
        <input type="range" min="0" max="255"  class="slider" v-model="guess_color.r">
        <input type="number" min="0" max="255" class="number-picker" v-model="guess_color.r">
        <div class="guess-result">{{ hints.r }}</div>
      </div>
      <div class="slider">
        <p>G</p>
        <input type="range" min="0" max="255" class="slider" v-model="guess_color.g">
        <input type="number" min="0" max="255" class="number-picker" v-model="guess_color.g">
        <div class="guess-result">{{ hints.g }}</div>
      </div>
      <div class="slider">
        <p>B</p>
        <input type="range" min="0" max="255" class="slider" v-model="guess_color.b">
        <input type="number" min="0" max="255" class="number-picker" v-model="guess_color.b">
        <div class="guess-result">{{ hints.b }}</div>
      </div>
    </div>

    <br/>

    <div style="display:flex;width:300px;margin: auto;">
      <button class="button-link" @click="guess()" style="width:150px" 
      :class="{ 'disabled': points < 1 || !in_game }">Guess (costs 1pts)</button>
      <br/>
      <button class="button-link" @click="answer()"
      :class="{ 'disabled': !in_game }">Answer</button>
    </div>

    <br/>

    <div>points: {{ points }}</div>

    <br/><br/>
    
  </div>
</template>

<script>
// @ is an alias to /src
import ColorDisplay from '@/components/ColorDisplay.vue'

export default {
  name: 'Game',
  components: {
    ColorDisplay
  },
  data() {
    return {
      points: 10,

      answer_color: { r: 1, g: 2, b: 3 },
      guess_color: { r: 10, g: 20, b: 30 },

      hints: { r: "", g: "", b: "", },

      in_game: true,  // Is a game currently being played?

    }
  },
  methods: {
    new_color() {
      var new_color = {
        r: Math.floor(Math.random() * 256),
        g: Math.floor(Math.random() * 256),
        b: Math.floor(Math.random() * 256),
      }
      this.hints = { r: "", g: "", b: "", };
      this.in_game = true;
      return new_color;
    },

    guess() {

      if (this.points > 0 && this.in_game) {
        this.points -= 1;
      } else {
        return false;
      }
      
      var colors = ['r', 'g', 'b'];

      for (var i = 0; i < colors.length; i++) {
        var c = colors[i];
        if (this.guess_color[c] == this.answer_color[c]) {
          this.hints[c] = "Perfect!";
        } else if (this.guess_color[c] <= this.answer_color[c] + 5 && this.guess_color[c] >= this.answer_color[c] - 5) {
          this.hints[c] = "Within +/- 5";
        } else if (this.guess_color[c] < this.answer_color[c] - 5) {
          this.hints[c] = "Too low!";
        } else if (this.guess_color[c] > this.answer_color[c] + 5) {
          this.hints[c] = "Too high!";
        }
      }
    },

    answer() {
      var colors = ['r', 'g', 'b'];
      var exact_amount = 0;

      for (var i = 0; i < colors.length; i++) {
        var c = colors[i];
      
        if (this.guess_color[c] == this.answer_color[c]) {
          this.hints[c] = "+10 points";
          this.points += 10;
          exact_amount++;
        } else if (this.guess_color[c] < this.answer_color[c] + 5 && this.guess_color[c] > this.answer_color[c] - 5) {
          this.hints[c] = "+5 points";
          this.points += 5;
        }
        if (exact_amount == 3) {
          this.points += 10;
        } 
      }

      this.in_game = false;
    }
  },
  mounted() {
    this.guess_color = this.new_color();
    this.answer_color = this.new_color();
  }
}
</script>

<style scoped>

  #color-displays {
    display: flex;
    justify-content: space-around;
    width: 50%;
    margin: 0px auto;
  }
  
  .slider {
    display: flex;
    margin: 20px auto;
    width: 300px;
    align-items: center;
  }
  .slider p, .slider input {
    margin: 0px 5px;
    font-family: 'Courier New', monospace;
  }

  .number-picker {
    width: 50px;
  }

  .guess-result {
    width: 150px;
    font-size: 12px;
  }

  .disabled {
    opacity: .5;
  }

</style>
