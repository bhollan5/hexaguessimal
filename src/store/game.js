// initial state
// shape: [{ id, quantity }]
const state = () => ({
    answer_color: { r: 1, g: 2, b: 3 },
    guess_color: { r: 10, g: 20, b: 30 },

    hints: { r: "", g: "", b: "", },

    in_game: true,  // Is a game currently being played?

    points: 80,   //  Indicating the current point amt.

    loading: false
  })
  
  // getters
  const getters = {
    answer_color: (state, /*getters, rootState*/) => {
      return state.answer_color;
    },
    guess_color: (state) => {
      return state.guess_color;
    },
    hints: (state) => {
      return state.hints;
    },
    in_game: (state) => {
      return state.in_game;
    },
    points: (state) => {
      return state.points;
    },
  }
  
  // actions, which commit mutations
  const actions = {
    new_guess_color({ commit }) {
      var new_color = {
        r: Math.floor(Math.random() * 256),
        g: Math.floor(Math.random() * 256),
        b: Math.floor(Math.random() * 256),
      }
      commit('update_guess_color', new_color);
    },
    new_answer_color({ commit }) {
      var new_color = {
        r: Math.floor(Math.random() * 256),
        g: Math.floor(Math.random() * 256),
        b: Math.floor(Math.random() * 256),
      }
      commit('update_hints', { r: "", g: "", b: "", });
      commit('update_answer_color', new_color);
      commit('update_in_game', true);
    },
  }
  
  // mutations, which change state. 
  const mutations = {
    update_guess_color (state, new_color) {
      state.guess_color.r = new_color.r;
      state.guess_color.g = new_color.g;
      state.guess_color.b = new_color.b;
    },
    update_answer_color (state, new_color) {
      state.answer_color.r = new_color.r;
      state.answer_color.g = new_color.g;
      state.answer_color.b = new_color.b;
    },
    update_in_game (state, in_game_status) {
      state.in_game = in_game_status;
    },
    update_hints (state, new_hints) {
      state.hints.r = new_hints.r;
      state.hints.g = new_hints.g;
      state.hints.b = new_hints.b;
    },
    add_points (state, new_points) {
      state.points += new_points;
    }
  }
  
  export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
  }