<template>
  <div id="game">

    <h1>Hexa-guess-imal</h1>
    <p class="subtitle" @click="get_secret()" v-html="current_tagline"></p>
    <br/>

    <!-- -------- -->
    <!--   Game   -->
    <!-- -------- -->
    <div class="game">

      <div id="color-displays">
        <ColorDisplay :color_value="answer_color" :hidden="in_game" v-if="!store_items[0].on"/>
        <ColorDisplay :color_value="guess_color" v-if="!store_items[0].on" />
        <Gradient :color_value="answer_color" :color_value2="guess_color" v-if="store_items[0].on" :hidden="in_game"></Gradient>
      </div>

      <button class="button-link" style="margin: auto;" @click="$store.dispatch('game/new_answer_color')">New Color</button>

      <!--  Color guessing sliders  -->
      <div id="slider-container">
        <rgb-slider></rgb-slider>
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

  </div>
</template>

<script>

import ColorDisplay from '@/components/displays/ColorDisplay.vue';
import Gradient from '@/components/displays/Gradient.vue';

import rgbSlider from '@/components/sliders/rgbSlider.vue';


export default {
  name: 'AppBase',
  components: {
    ColorDisplay,
    Gradient,

    rgbSlider
  },

  computed: {
    answer_color() {
      return this.$store.getters['game/answer_color'];
    },
    guess_color() {
      return this.$store.getters['game/guess_color'];
    },
    in_game() {
      return this.$store.getters['game/in_game'];
    },
    points() {
      return this.$store.getters['game/points'];
    },
    store_items() {
      return this.$store.getters['store/items'];
    },
    achievements() {
      return this.$store.getters['achievements/achievements'];
    }
  },
  data() {
    return {
      current_tagline: "",
      taglines: [
        "Rated #0 best game (that's like #1 but better haha)",
        "Light is electromagnetic waves!",
        "Hexadecimal uses 16 symbols, while decimal uses 10!",
        "Become an expert in hexadecimal!",
        "Contains secrets!!",
        "Hex codes follow the RGB color description format: #RRGGBB"
      ],

    }
  },
  methods: {
    change_tagline() {
      var pre_tagline = this.current_tagline;
      this.current_tagline = this.taglines[Math.floor(Math.random() * this.taglines.length)];
      if (pre_tagline == this.current_tagline) {
        this.change_tagline();
      }
    },

    get_secret() {
      if (this.current_tagline == "Contains secrets!!") {
        this.$store.commit('achievements/earn_achievement', 5);
      }
    },

    guess() {

      if (this.points > 0 && this.in_game) {
        this.$store.commit('game/add_points', -1);
      } else {
        return false;
      }
      
      var colors = ['r', 'g', 'b'];
      var new_hints = { r: '', g: '', b: '' };

      for (var i = 0; i < colors.length; i++) {
        var c = colors[i];
        if (this.guess_color[c] == this.answer_color[c]) {
          new_hints[c] = "Perfect!";
        } else if (this.guess_color[c] <= this.answer_color[c] + 5 && this.guess_color[c] >= this.answer_color[c] - 5) {
          new_hints[c] = "Within +/- 5";
        } else if (this.guess_color[c] < this.answer_color[c] - 5) {
          new_hints[c] = "Too low!";
        } else if (this.guess_color[c] > this.answer_color[c] + 5) {
          new_hints[c] = "Too high!";
        }
      }
      this.$store.commit('game/update_hints', new_hints);
    },

    answer() {
      var colors = ['r', 'g', 'b'];
      var exact_amount = 0;
      var new_hints = { r: '', g: '', b: '' };

      for (var i = 0; i < colors.length; i++) {
        var c = colors[i];
      
        if (this.guess_color[c] == this.answer_color[c]) {
          new_hints[c] = "+10 points";
          this.$store.commit('game/add_points', 10);
          exact_amount++;
        } else if (this.guess_color[c] < this.answer_color[c] + 5 && this.guess_color[c] > this.answer_color[c] - 5) {
          new_hints[c] = "+5 points";
          this.$store.commit('game/add_points', 5);
        }
        if (exact_amount == 3) {
          this.$store.commit('game/add_points', 10);
          this.$store.dispatch('achievements/perfect_game');
        } 
      }
      
      if (this.points > 100 && this.achievements[3].locked) {
        this.$store.commit('achievements/earn_achievement', 3);
      } 
      if (this.points > 250 && this.achievements[4].locked) {
        this.$store.commit('achievements/earn_achievement', 4);
      }

      this.$store.commit('game/update_hints', new_hints);
      this.$store.commit('game/update_in_game', false);
    },

  },
  mounted() {
    this.$store.dispatch("game/new_guess_color");
    this.$store.dispatch("game/new_answer_color");
    this.change_tagline();
    setInterval(function(){
        this.change_tagline();
    }.bind(this), 3000);
    
  }
}

</script>

<style>
/*  Background and body elements   */
html, body {
  width: 100%;
  margin: 0px;
  height: 100%;
}

.subtitle {
  font-style: italic;

}
.subtitle span {
  text-decoration: underline;
  cursor: pointer;
}
.button-link {
  background:#2c3e50;
  color: white;
  padding: 10px 15px; 
  width: 100px;
  margin: 10px;
  cursor: pointer;
}

.button-link.router-link-exact-active {
  color: #42b983;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background-color: #e5e5f7;
  width: 100%;
  margin: 0px;
  height: 100%;
  background: linear-gradient(135deg, #444cf755 25%, transparent 25%) -10px 0/ 20px 20px, 
            linear-gradient(225deg, #444cf7 25%, transparent 25%) -10px 0/ 20px 20px, 
            linear-gradient(315deg, #444cf755 25%, transparent 25%) 0px 0/ 20px 20px, 
            linear-gradient(45deg, #444cf7 25%, #aaaadf 25%) 0px 0/ 20px 20px;
  color: #2c3e50;
  padding: 20px;
}

#game {
  width: 100%;
}
h1 {
  color:#2c3e50;
  text-decoration: none;
  font-style: italic;
}

/*  Game stylings  */


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

#page-darkener {
  width: 100%;
  height: calc(100% + 20px);
  position: absolute;
  top: 0px;
  left: 0px;
  background: rgba(0,0,0,.8);
  z-index: 0;
}

#popup {
  width: 60%;
  min-height: 700px;
  background: black;
  border: solid gray 2px;
  color: white;
  z-index: 1;
  position: absolute;
  left: 20%;
  top: 100px;
}


</style>
