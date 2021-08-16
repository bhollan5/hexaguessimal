// initial state
// shape: [{ id, quantity }]
const state = () => ({

    //  ACHIEVEMENT VARIABLES
    perfect_game_count: 0,
    
    items: [
      { 
        name: 'Gradient Mode',
        description: 'Toggle a gradient between the true color and guess color.',
        price: 25,
        locked: true,
        on: false,
        img: require('../assets/store/1_gradient.png')
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
    ],
    loading: false
  })
  
  // getters
  const getters = {
    items: (state, /*getters, rootState*/) => {
      return state.items;
    },
  }
  
  // actions
  const actions = {
    
  }
  
  // mutations
  const mutations = {
    buy_item (state, item_num) {
      state.items[item_num].locked = false;
    },
  }
  
  export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
  }