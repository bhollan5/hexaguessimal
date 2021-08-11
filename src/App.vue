<template>
  <div id="content">

    <!-- -------- -->
    <!--  Navbar  -->
    <!-- -------- -->
    <div id="nav">
      <h1>Hexa-guess-imal</h1>
      <p class="subtitle" @click="get_secret()" v-html="current_tagline"></p>
      <br/>
  
      <div style="display: flex;justify-content:space-around;">
        <div @click="popup = 'about'" class="button-link">How to play</div>
        <div @click="popup = 'achievements'" class="button-link">Achievements</div>
        <div @click="popup = 'store'" class="button-link">Store</div>
      </div>
    </div>

    <!-- --------- -->
    <!--   Popup   -->
    <!-- --------- -->
    <div id="page-darkener" v-if="popup.length > 0" @click="popup = ''"></div>
    <div id="popup" v-if="popup.length > 0">
      <about v-if="popup == 'about'"></about>
      <achievements v-else-if="popup == 'achievements'"
       :achievements="achievements"></achievements>
      <store v-if="popup == 'store'" :storeitems="store_items"
       v-on:buy="buy_item($event)" :points="points"></store>
    </div>

    <!-- -------- -->
    <!--   Game   -->
    <!-- -------- -->
    <div class="game">

      <div id="color-displays">
        <ColorDisplay :color_value="answer_color" :hidden="in_game" v-if="!store_items[0].on"/>
        <ColorDisplay :color_value="guess_color" v-if="!store_items[0].on" />
        <Gradient :color_value="answer_color" :color_value2="guess_color" v-if="store_items[0].on" :hidden="in_game"></Gradient>
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

      <div id="slider-container" v-if="0">
        <rgb-slider @change="guess_color = $event" :color_value="guess_color" :hints="hints"></rgb-slider>
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

import ColorDisplay from '@/components/ColorDisplay.vue';
import Gradient from '@/components/Gradient.vue';

import rgbSlider from '@/components/sliders/rgbSlider.vue';

import About from '@/components/About.vue';
import Achievements from '@/components/Achievements.vue';
import Store from '@/components/Store.vue';


export default {
  name: 'AppBase',
  components: {
    ColorDisplay,
    Gradient,
    About,
    Achievements,
    Store,

    rgbSlider
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

      popup: '',    //  Indicating the popup menu.

      //  GAME VARIABLES:

      points: 100,   //  Indicating the current point amt.

      answer_color: { r: 1, g: 2, b: 3 },
      guess_color: { r: 10, g: 20, b: 30 },

      hints: { r: "", g: "", b: "", },

      in_game: true,  // Is a game currently being played?

      //  ACHIEVEMENT VARIABLES
      perfect_game_count: 0,

      achievements: [
        { name: 'One color perfect',
          description: 'Answer one color perfectly.',
          locked: true,
          img: require('./assets/achievements/0_OneColor.png')
        }, {
          name: 'Three colors perfect',
          description: 'Answer three colors perfectly.',
          locked: true,
          img: require('./assets/achievements/1_ThreeColors.png'),
        }, {
          name: 'Buy an item',
          description: 'Use your points to buy something at the store.',
          locked: true,
          img: require('./assets/achievements/2_Buy.png'),
        }, {
          name: '100 Points',
          description: 'Earn 100 points.',
          locked: true,
          img: require('./assets/achievements/3_100Pts.png')
        }, {
          name: '250 Points',
          description: 'Earn 100 points.',
          locked: true,
          img: require('./assets/achievements/4_250Pts.png')
        }, {
          name: 'Banner secret',
          description: 'Find the secret in the subtitle banner.',
          locked: true,
          img: require('./assets/achievements/5_SecretBanner.png')
        }, {
          name: 'Buy the entire store',
          description: 'Buy every available item in the store.',
          locked: true,
          img: require('./assets/achievements/6_EntireStore.png')
        }, {
          name: 'Change the BG color',
          description: 'Change the background color in the store.',
          locked: true,
          img: require('./assets/achievements/7_BackgroundChange.png'),
        }, {
          name: 'Answer the BG color',
          description: 'Answer when the answer color, guess color, and BG color all match.',
          locked: true,
          img: require('./assets/achievements/8_BackgroundMatch.png'),
        }, {
          name: 'Win in HSL mode',
          description: 'Answer a color correctly using the HSL sliders',
          locked: true,
          img: require('./assets/achievements/9_HSL.png'),
        }, {
          name: 'Win in RGBA mode',
          description: 'Answer a color correctly using the RGBA sliders.',
          locked: true,
          img: require('./assets/achievements/10_RGBA.png'),
        }, {
          name: 'Win in CMYK mode',
          description: 'Answer a color correctly using the CMYK sliders.',
          locked: true,
          img: require('./assets/achievements/11_CMYK.png'),
        }, 
      ],

      //  Store items
      
      
      store_items: [
        { name: 'Gradient Mode',
          description: 'Toggle a gradient between the true color and guess color.',
          price: 25,
          locked: true,
          on: false,
          img: require('./assets/store/1_gradient.png')
        }, /*{ 
          name: 'HSL Mode',
          description: 'Use HSL sliders, instead of RBG sliders.',
          price: 10,
          locked: true,
          on: true,
          img: require('./assets/store/2_HSL.png')
        }, { 
          name: 'RGBA Mode',
          description: 'Use RGBA sliders, instead of RBG sliders.',
          price: 15,
          locked: true,
          on: true,
          img: require('./assets/store/3_RGBA.png')
        }, { 
          name: 'CMYK Mode',
          description: 'Use CMYK sliders, instead of RBG sliders.',
          price: 25,
          locked: true,
          on: true,
          img: require('./assets/store/4_CMYK.png')
        }, { 
          name: 'Dark mode',
          description: 'Set the background to a dark color, and the text to white.',
          price: 50,
          locked: true,
          on: true,
          img: require('./assets/store/5_darkmode.png')
        }, { 
          name: 'Background changer',
          description: 'Pick the background color.',
          price: 100,
          locked: true,
          on: true,
          img: require('./assets/store/6_BGchanger.png')
        }, */
      ]

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
        this.achievements[5].locked = false;
      }
    },

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
          this.perfect_game_count++;
          if (this.perfect_game_count == 1) {
            this.achievements[0].locked = false;
          } else if (this.perfect_game_count == 3) {
            this.achievements[1].locked = false;
          }
        } 
      }

      if (this.points > 100 && this.achievements[3].locked) {
        this.achievements[3].locked = false;
      } 
      if (this.points > 250 && this.achievements[4].locked) {
        this.achievements[4].locked = false;
      }

      this.in_game = false;
    },

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
      
    }

  },
  mounted() {
    this.guess_color = this.new_color();
    this.answer_color = this.new_color();
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
            linear-gradient(45deg, #444cf7 25%, #e5e5f7 25%) 0px 0/ 20px 20px;
  color: #2c3e50;
  padding: 20px;
}

#content {
  margin: 20px auto;
  min-width: 600px;
  width: 70%;
  min-height: 700px;
  background: white;
  border: solid gray 2px;
}
h1 {
  color:#2c3e50;
  text-decoration: none;
  font-style: italic;
}

#nav {
  padding: 30px;
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
