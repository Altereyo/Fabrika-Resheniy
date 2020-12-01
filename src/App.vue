<template>
    <div id="app">
        <header-comp/>
        <div id="content">
            <navigation-comp />
            <main-comp />
        </div>
    </div>
</template>

<script>
import headerComp from "./components/header.vue"
import mainComp from "./containers/main.vue"
import navigationComp from "./components/navigation.vue"

export default {
    name: 'App',
    components: { headerComp, mainComp, navigationComp },
    data() {
        return {
            currentPage: 'surveys',
            currentLi: 'resps'
        }
    },
}
</script>

<style lang="sass">
@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;700&display=swap')
*
    margin: 0
    padding: 0
    box-sizing: border-box
    font-family: 'Nunito', sans-serif

#app 
    font-family: Avenir, Helvetica, Arial, sans-serif
    -webkit-font-smoothing: antialiased
    -moz-osx-font-smoothing: grayscale
    color: #2c3e50
    margin: 0px 100px 200px 5px

    #content
        display: flex
</style>