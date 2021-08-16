// initial state
// shape: [{ id, quantity }]
const state = () => ({

  //  ACHIEVEMENT VARIABLES
  perfect_game_count: 0,
  
  achievements: [
    { name: 'One color perfect',
      description: 'Answer one color perfectly.',
      locked: true,
      img: require('../assets/achievements/0_OneColor.png')
    }, {
      name: 'Three colors perfect',
      description: 'Answer three colors perfectly.',
      locked: true,
      img: require('../assets/achievements/1_ThreeColors.png'),
    }, {
      name: 'Buy an item',
      description: 'Use your points to buy something at the store.',
      locked: true,
      img: require('../assets/achievements/2_Buy.png'),
    }, {
      name: '100 Points',
      description: 'Earn 100 points.',
      locked: true,
      img: require('../assets/achievements/3_100Pts.png')
    }, {
      name: '250 Points',
      description: 'Earn 100 points.',
      locked: true,
      img: require('../assets/achievements/4_250Pts.png')
    }, {
      name: 'Banner secret',
      description: 'Find the secret in the subtitle banner.',
      locked: true,
      img: require('../assets/achievements/5_SecretBanner.png')
    }, /*{
      name: 'Buy the entire store',
      description: 'Buy every available item in the store.',
      locked: true,
      img: require('../assets/achievements/6_EntireStore.png')
    }, {
      name: 'Change the BG color',
      description: 'Change the background color in the store.',
      locked: true,
      img: require('../assets/achievements/7_BackgroundChange.png'),
    }, {
      name: 'Answer the BG color',
      description: 'Answer when the answer color, guess color, and BG color all match.',
      locked: true,
      img: require('../assets/achievements/8_BackgroundMatch.png'),
    }, {
      name: 'Win in HSL mode',
      description: 'Answer a color correctly using the HSL sliders',
      locked: true,
      img: require('../assets/achievements/9_HSL.png'),
    }, {
      name: 'Win in RGBA mode',
      description: 'Answer a color correctly using the RGBA sliders.',
      locked: true,
      img: require('../assets/achievements/10_RGBA.png'),
    }, {
      name: 'Win in CMYK mode',
      description: 'Answer a color correctly using the CMYK sliders.',
      locked: true,
      img: require('../assets/achievements/11_CMYK.png'),
    }, */
  ],
  loading: false
})

// getters
const getters = {
  achievements: (state, /*getters, rootState*/) => {
    return state.achievements;
  },
}

// actions
const actions = {

  perfect_game ({commit, state}) {
    commit('add_perfect_game');
    console.log("Adding perfect game!");
    console.log("Current perf game count:");
    console.log(state.perfect_game_count);
    if (state.perfect_game_count == 1) {
      commit('earn_achievement', 0);
    } else if (state.perfect_game_count == 3) {
      commit('earn_achievement', 1);
    }

  }
}

// mutations
const mutations = {
  earn_achievement (state, achievement_num) {
    state.achievements[achievement_num].locked = false;
  },

  add_perfect_game(state) {
    state.perfect_game_count++;
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}