import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state:{
        todos:[]
    },

    getters:{
        todos(state){
            return state.todos;
        },
    },

    actions:{
        initialise(state, data){
            state.commit('initialise', data)
        },
        addTodo(state, action){
            state.commit('addTodo', action)
        },
        deleteTodo(state, todo){
            state.commit('deleteTodo', todo);
        },
        markDone(state, todo){
            state.commit('markDone', todo)
        },
        updateTodo({commit}, params){
            commit('updateTodo', params)
        }
    },

    mutations:{
        initialise(state, data){
            state.todos = data
        },
        addTodo({todos}, action){
            todos.push({
                action:action,
                done:false
            })
        },
        deleteTodo({todos}, todo){
            todos.splice(todos.indexOf(todo), 1);
        },
        markDone({todos}, todo){
            todos[todos.indexOf(todo)].done = true;
        },
        updateTodo({todos}, params){
            todos[todos.indexOf(params.todo)].action = params.action
        }
    }
})