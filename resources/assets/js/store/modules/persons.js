export default{
    state:{
        persons:[]
    },

    methods:{
        randomId() {
            var text = "";
            var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
          
            for (var i = 0; i < 5; i++)
              text += possible.charAt(Math.floor(Math.random() * possible.length));
          
            return text;
          }
    },

    getters:{
        persons(state){
            return state.persons;
        },
    },

    actions:{
        initPersons({commit}, data){
            commit('initPersons', data)
        },
        addPerson({commit}, name){
            commit('addPerson', name)
        },
        updatePerson({commit}, params){
            commit('updatePerson', params)
        },
        removePerson({commit}, person){
            commit('removePerson', person)
        }
    },

    mutations:{
        initPersons({persons}, data){
            persons = data
        },
        addPersons({persons}, pname){
            persons.push({
                name,
                id: methods.randomId()
            })

        },
        updatePerson({persons}, params){
            persons[persons.indexOf(params.person)].name = params.name
        },
        deletePerson({persons}, person){
            persons.splice(persons.indexOf(person), 1)
        }
    }
}