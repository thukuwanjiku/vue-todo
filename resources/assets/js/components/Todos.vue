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
                    <td>{{ personName(todo.person) }}</td>
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
                        <textarea v-model:value="workingTodo.action" class="form-control" placeholder="What do you want done?" rows="3"></textarea>
                    </div>
                    <button :disabled="!validTodo" @click="addTodo" type="button" v-show="!editing" class="btn btn-success">Add</button>
                    <button :disabled="!validTodo" @click="updateTodo(todos[editingIndex])" v-show="editing" type="button" class="btn btn-success">Update</button>
                </div>
                <div class="col-6">
                    <label for="">Who will do it?</label>
                    <!-- <select class="custom-select" v-model="workingTodo.person" @change="workingTodo.person = $event.target.value">
                        <option selected disabled value="">-Select-</option>
                        <option v-for="(person, index) in persons" :value="person.id">{{ person.name }}</option>
                    </select> -->
                    
                    <el-select v-model="workingTodo.person" placeholder="Select doer">
                        <el-option
                        v-for="person in persons"
                        :key="person.id"
                        :label="person.name"
                        :value="person.id">
                        </el-option>
                    </el-select>
                    
                </div>
            </div>
            <div class="col-4 person-adder">
                <div class="form-group">
                <input v-model:value="name" class="form-control" placeholder="New person name">
                </div>
                <button :disabled="!validName" @click="addPerson" type="button" v-show="!editingPerson" class="btn btn-success">Add</button>
                <button :disabled="!validName" @click="updatePerson()" v-show="editingPerson" type="button" class="btn btn-success">Update</button>
            </div>
        </div>


    </div>

</template>

<script>

import Vue from 'vue';
import { mapGetters, mapActions } from 'vuex'
import Parallax from "vue-parallaxy";

import Spinner from 'vue-spinkit'


export default {
    name: 'Todos',

    components: {
        Parallax, Spinner
    },
    
    data(){
        return{
            workingTodo:{
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
            return this.workingTodo.action.length > 5 && this.workingTodo.person.length
        },
        validName(){
            return this.name.length > 2
        },
        names(){
            return this.persons.map((person) => { return person.name; });
        },
        ...mapGetters(['todos', 'persons'])
    },

    methods:{
        addTodo(){
            
            this.$store.dispatch('addTodo', {
                action:this.workingTodo.action,
                done:false,
                person:this.workingTodo.person
            })
            // this.newTodo.action = '',
            window.setTimeout(()=>{
                this.workingTodo.action = ''
                this.workingTodo.person = ''
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
            this.workingTodo = {
                action: todo.action,
                done: todo.done,
                person: todo.person
            }
            this.editing = true;
            this.editingIndex = index
        },
        updateTodo(){
            this.$store.dispatch('updateTodo', [{
                action:this.workingTodo.action,
                person: this.workingTodo.person
            }, this.editingIndex])

            this.workingTodo.action = ''
            this.workingTodo.person = ''
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

            this.$store.dispatch('addPerson', this.name)
            this.name = ''
            $.growl.notice({ message: "Added" });
        },
        personName(id){
            return this.persons[this.persons.findIndex(persons =>  persons.id == id)].name
        }
    }
}
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

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
