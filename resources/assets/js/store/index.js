import Vue from 'vue'
import Vuex from 'vuex'

import todos from './modules/todos'
import persons from './modules/persons'

Vue.use(Vuex)

export default new Vuex.Store({
    modules:{
        persons:persons,
        todos:todos
    }
})

