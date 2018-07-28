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
        },
        markDone(context, todo){
            context.commit('markDone', todo)
        },
        initialise(context, data){
            context.commit('initialise', data)
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
        },
        markDone(state, todo){
            let pos = state.todos.map(function(item) { return item.action; }).indexOf(todo.action)
            state.todos[pos].done = true;
        },
        initialise(state, data){
            state.todos = data;
        }
    }
})