<template>
    
    <div class="container m-t-30">

        <ul class="list-group">
            <li class="list-group-item active">Todos ({{ todos.length }})</li>
            <li class="list-group-item" v-show="todos.length<1">
                <em>Nothing</em>
            </li>
            <li v-for="(todo, index) in todos" class="list-group-item">
                {{ todo.action }}
                

                <button @click="deleteTodo(todo)" type="button" class="close">
                    <span aria-hidden="true">&times;</span>
                </button>

                <button @click="markDone(todo)" type="button" class="close mark-done">
                    <span aria-hidden="true">&#10004;</span>
                </button>
            </li>
        </ul>

        
        <div class="col-md-8 col-md-offset-2 m-t-30">
            <div class="form-group">
                <textarea v-model:value="newTodo" class="form-control" placeholder="What do you wanna do?" rows="3"></textarea>
            </div>
            <button :disabled="!validTodo" @click="addTodo" type="button" class="btn btn-success">Info</button>
        </div>

    </div>

</template>

<script>

import { mapGetters, mapActions } from 'vuex'

export default {
    name: 'Todos',
    
    data(){
        return{
            newTodo:''
        }
    },
    
    computed:{
        validTodo(){
            return this.newTodo.length > 5;
        },
        ...mapGetters(['todos'])
    },

    methods:{
        addTodo(){

            this.$store.dispatch('addTodo', this.newTodo)
            this.newTodo = ''
            $.growl.notice({ message: "Added" });
        },
        deleteTodo(todo){
            this.$store.dispatch('deleteTodo', todo);
            $.growl.notice({ message: "Removed" });
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
</style>
