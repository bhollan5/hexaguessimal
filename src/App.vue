<template>
  <div id="content">
    <div id="nav">
      <router-link to="/">
        <h1>Hexa-guess-imal</h1>
      </router-link>
      <p class="subtitle">Funny text goes here :)</p>
      <br/>
  
      <router-link to="/about" class="button-link">How to play</router-link>
      <router-link to="/achievements" class="button-link">Achievements</router-link>
      <router-link to="/Store" class="button-link" v-if="0">Store</router-link>
    </div>
    <router-view/>
  </div>
</template>

<script>

export default {
  name: 'AppBase',
  data() {
    return {
      current_tagline: "",
      taglines: [
        "Rated #0 best game (that's like #1 but better haha)",
        "Light is electromagnetic waves!",
        "Hexadecimal uses 16 symbols, while decimal uses 10!",
        "Become an expert in hexadecimal!",
        "Contains <span @click='get_secret()'>secrets!!</span>'"
      ]

    }
  },
  methods: {
    get_secret() {

    }
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


</style>
