<template>
    <div>
        {{ count }}
        <br><button @click="increment">+1</button>
    </div>
</template>

<script>
    import {mapState, mapMutations} from 'vuex'
    export default{
        name:'Other',

        computed:{
            ...mapState(['count'])
        },
        methods:{
            ...mapMutations(['increment'])
        }
    }

</script>