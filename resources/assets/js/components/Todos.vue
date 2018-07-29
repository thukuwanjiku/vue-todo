<template>
    
    <div class="container m-t-30">

        <table class="table table-hover table-bordered">
            <thead class="thead-dark">
                <tr>
                    <th scope="col">Task</th>
                    <th scope="col">Doer</th>
                    <th>&nbsp;</th>
                </tr>
            </thead>
            <tbody>

                <tr v-show="todos.length<1">
                    <td colspan="3">
                        <em class="text-center">No assigned duties</em>
                    </td>
                </tr>

                <tr v-for="(todo, index) in todos" @dblclick="editTodo(todo, index)" data-toggle="tooltip" data-placement="top" title="Double click to edit">
                    <td>{{ todo.action }} <span v-show="todo.done" class="badge badge-success done-indicator">Done</span></td>
                    <td>{{ todo.person }}</td>
                    <td>
                        <button @click="deleteTodo(todo)" type="button" class="close"
                        data-toggle="tooltip" data-placement="top" title="Delete todo">
                            <span aria-hidden="true">&times;</span>
                        </button>

                        <button @click="markDone(todo)" v-show="!todo.done" type="button" 
                        class="close mark-done"
                        data-toggle="tooltip" data-placement="top" title="Mark as done">
                            <span aria-hidden="true">&#10004;</span>
                        </button>
                    </td>
                </tr>
                
            </tbody>
        </table>

        <div class="alert alert-info" role="alert" v-show="persons.length==0">
            You must add at least one person to handle the tasks, before you can add the task
        </div>
        
        <div class="row m-t-30">
            <div class="row todo-adder" v-show="persons.length>0">
                <div class="col-6">
                    <div class="form-group">
                        <textarea v-model:value="newTodo.action" class="form-control" placeholder="What do you want done?" rows="3"></textarea>
                    </div>
                    <button :disabled="!validTodo" @click="addTodo" type="button" v-show="!editing" class="btn btn-success">Add</button>
                    <button :disabled="!validTodo" @click="updateTodo(todos[editingIndex])" v-show="editing" type="button" class="btn btn-success">Update</button>
                </div>
                <div class="col-6">
                    <label for="">Who will do it?</label>
                    <select class="custom-select" v-model="newTodo.person" @change="newTodo.person = $event.target.value">
                        <option selected disabled value="">-Select-</option>
                        <option v-for="(person, index) in persons" :value="person.name">{{ person.name }}</option>
                    </select>
                </div>
            </div>
            <div class="col-4 person-adder">
                <div class="form-group">
                <textarea @keyup.enter="addPersons" v-model:value="name" class="form-control" placeholder="New person name" rows="3"></textarea>
                </div>
                <button :disabled="!validName" @click="addPerson" type="button" v-show="!editingPerson" class="btn btn-success">Add</button>
                <button :disabled="!validName" @click="updatePerson()" v-show="editingPerson" type="button" class="btn btn-success">Update</button>
            </div>
        </div>

    </div>

</template>

<script>

import { mapGetters, mapActions } from 'vuex'

export default {
    name: 'Todos',
    
    data(){
        return{
            newTodo:{
                action:'',
                done: false,
                person:''
            },
            editing:false,
            editingIndex:'',

            name:'',
            editingPerson:'',
            editingPersonsId:''
        }
    },

    computed:{
        validTodo(){
            return this.newTodo.action.length > 5 && this.newTodo.person.length
        },
        validName(){
            return this.name.length > 2
        },
        ...mapGetters(['todos', 'persons'])
    },

    methods:{
        addTodo(){
            
            this.$store.dispatch('addTodo', {
                action:this.newTodo.action,
                done:false,
                person:this.newTodo.person
            })
            // this.newTodo.action = '',
            window.setTimeout(()=>{
                this.newTodo.action = ''
                this.newTodo.person = ''
                $.growl.notice({ message: "Added" });
            }, 500)
            
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
        },
        randomId() {
            var text = "";
            var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
          
            for (var i = 0; i < 5; i++)
              text += possible.charAt(Math.floor(Math.random() * possible.length));
          
            return text;
        },

        //person state methods
        addPerson(){

            this.$store.commit('addPerson', this.name)
            this.name = ''
            $.growl.notice({ message: "Added" });
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
        margin-left: 10px
    }
</style>
