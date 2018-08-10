<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card card-default">

                    <div class="card-body">
                        
                        <p>{{ count }} squared is {{ square }}</p>
                        

                        <br><button @click="increment">+1</button>

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    import {mapState, mapActions, mapGetters} from 'vuex'

    export default {
        computed:{
            something(){},
            ...mapGetters(['count',,'square'])
        },
        methods:{
            increment(){
                this.$store.dispatch('increment')
            },
            ...mapActions([''])
        }
    }
</script>
