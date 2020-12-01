<template>
    <nav>
        <ul>
            <li @click="changePage('surveys')" :style="navStyle('surveys')">
                <font-awesome-icon icon="list-alt" />
                <p>Опросы</p>
            </li>
            <li @click="changePage('users')" :style="navStyle('users')">
                <font-awesome-icon icon="users" />
                <p>Пользователи</p>
            </li>
            <li @click="changePage('blacklist')" :style="navStyle('blacklist')">
                <font-awesome-icon icon="ban" />
                <p>Чёрный список</p>
            </li>
            <li @click="changePage('callcenter')" :style="navStyle('callcenter')">
                <font-awesome-icon icon="phone-alt" />
                <p>Колл-центр</p>
            </li>
        </ul>
    </nav>
</template>

<script>
export default {
    methods: {
        changePage(page) {
            this.$parent.currentPage = page
        },
        navStyle(page) {
            if (this.$parent.currentPage == page) {
                return 'background-color: #f3f3f3;'
            }
        }
    }
}
</script>

<style lang="sass">
nav
    display: inline-block
    min-width: 200px
    max-width: 200px
    height: 100%
    vertical-align: top

    ul
        width: 100%
        display: flex
        flex-wrap: wrap

    li
        list-style: none
        width: 100%
        text-align: center
        border-radius: 10px
        padding: 20px 0
        border: 3px solid transparent
        transition: .3s

        &:hover
            color: #bbc262
            border: 3px solid #bbc262
            cursor: pointer

        svg
            font-size: 2.8em!important
            margin-bottom: 10px

        p
            font-size: 1.1em

</style>