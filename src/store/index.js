import { createStore } from "vuex";
import achievements from "./achievements.js";
import game from "./game.js";
import store from "./store.js";


export default createStore({
  modules: {
    achievements,
    game,
    store
  },
  state: {
    points: 10,
  },
  mutations: {
    
  }
});