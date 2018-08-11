<template>
    <div class="container">
        
        <div class="navigation">
            
            <nav class="navbar navbar-expand-sm navbar-light" style="background-color: #e3f2fd;">
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarTogglerDemo01">
                    <a class="navbar-brand" href="javascript:void(0)">LaraVue</a>
                    <ul class="navbar-nav ml-auto mt-2 mt-lg-0">
                        <li class="nav-item active">
                            <router-link class="nav-link" to="/">Todos <span class="sr-only">(current)</span></router-link>
                        </li>
                        <li class="nav-item">
                            <router-link class="nav-link" to="/forms">Forms</router-link>
                        </li>
                    </ul>
                </div>
            </nav>

        </div>

        
        <div class="main-content col-md-10 offset-md-1">
            <router-view></router-view>
        </div>
        
    </div>
</template>

<script>

    import Todos from './Todos'

    export default {
        components:{
            Todos
        },
        computed:{
            
        },
        methods:{
            
        }
    }
</script>
