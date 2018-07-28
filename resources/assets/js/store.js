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
        addTodo(context, action){
            context.commit('addTodo', action)
        },
        deleteTodo(context, todo){
            context.commit('deleteTodo', todo);
        }
    },

    mutations:{
        addTodo(state, action){
            state.todos.push({
                action:action,
                done:false
            })
        },
        deleteTodo(state, todo){
            let pos = state.todos.map(function(item) { return item.action; }).indexOf(todo.action)
            state.todos.splice(pos, 1);
        }
    }
})