export default{
    state:{
        persons:[
            // {
            //     name:'Mike',
            //     id: 'IAD8A0'
            // },
            // {
            //     name:'Mary',
            //     id:'ODF09'
            // }
        ]
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
        },
        personById(id){
            return id;
        }
    },

    mutations:{
        initPersons({persons}, data){
            persons = data
        },
        addPerson({persons}, name){
            persons.push({
                name,
                id:window.randomId()
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