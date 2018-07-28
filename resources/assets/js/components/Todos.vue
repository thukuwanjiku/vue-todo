<template>
    
    <div class="container m-t-30">

        <ul class="list-group">
            <li class="list-group-item active">Todos ({{ todos.length }})</li>
            <li class="list-group-item" v-show="todos.length<1">
                <em>Nothing</em>
            </li>
            <li v-for="(todo, index) in todos" @dblclick="editTodo(todo, index)" class="list-group-item"
            data-toggle="tooltip" data-placement="top" title="Double click to edit">
                {{ todo.action }}

                <span v-show="todo.done" class="badge badge-success done-indicator">Done</span>
                

                <button @click="deleteTodo(todo)" type="button" class="close"
                data-toggle="tooltip" data-placement="top" title="Delete todo">
                    <span aria-hidden="true">&times;</span>
                </button>

                <button @click="markDone(todo)" v-show="!todo.done" type="button" 
                class="close mark-done"
                data-toggle="tooltip" data-placement="top" title="Mark as done">
                    <span aria-hidden="true">&#10004;</span>
                </button>
            </li>
        </ul>

        
        <div class="col-md-8 col-md-offset-2 m-t-30">
            <div class="form-group">
                <textarea @keyup.enter="addTodo" v-model:value="action" class="form-control" placeholder="What do you wanna do?" rows="3"></textarea>
            </div>
            <button :disabled="!validTodo" @click="addTodo" type="button" v-show="!editing" class="btn btn-success">Add</button>
            <button :disabled="!validTodo" @click="updateTodo(todos[editingIndex])" v-show="editing" type="button" class="btn btn-success">Update</button>
        </div>

    </div>

</template>

<script>

import { mapGetters, mapActions } from 'vuex'

export default {
    name: 'Todos',
    
    data(){
        return{
            action:'',
            editing:false,
            editingIndex:''
        }
    },

    created(){
        //do some axios call 
        let todos = [
            {
                action: 'Watch a movie',
                done: false
            },
            {
                action: 'Learn some vuejs',
                done: true
            },
            {
                action: 'Read a novel',
                done: false
            },
        ]
        //initialise todos
        this.$store.dispatch('initialise', todos)
        //console.log(todos)
    },
    
    computed:{
        validTodo(){
            return this.action.length > 5;
        },
        ...mapGetters(['todos'])
    },

    methods:{
        addTodo(action){

            this.$store.dispatch('addTodo', this.action)
            this.action = ''
            $.growl.notice({ message: "Added" });
        },
        deleteTodo(todo){
            this.$store.dispatch('deleteTodo', todo);
            $.growl.notice({ message: "Removed" });
        },
        markDone(todo){
            this.$store.dispatch('markDone', todo)
            // $.growl.notice({ message: "" });
        },
        editTodo(todo, index){
            //add todo body to textarea
            this.action = todo.action
            this.editing = true;
            this.editingIndex = index
        },
        updateTodo(todo){
            let action = this.action
            this.$store.dispatch('updateTodo', {todo, action})
            this.action = ''
            this.editing = false
            $.growl.notice({ message: "Updated" })
        }
    }
}
</script>

<style>

    .m-t-30{
        margin-top:30px
    }
    button.mark-done{
        margin-right: 20px
    }
    span.done-indicator{
        margin-left: 30px
    }
</style>
