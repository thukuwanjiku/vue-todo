export default{
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
        addTodo(state, todo){
            state.commit('addTodo', todo)
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
        addTodo({todos}, todo){
            todos.push(todo)
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
}