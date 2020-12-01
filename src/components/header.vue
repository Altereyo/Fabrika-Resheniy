<template>
    <header>
        <div id="header-wrapper">
            <div id="logo">
                <img src="../assets/logo.png" alt="">
            </div>
            <div id="search-and-breadcrumbs">
                <div id="search">
                    <input type="search" name="" id="search-input" placeholder="Поиск по системе" />
                    <font-awesome-icon icon="search" id="search-icon" />
                </div>
                <div id="breadcrumbs">
                    <span @click="goTo('home')">Домашняя страница</span>
                    <span v-if="$parent.currentPage != 'home'" class="slash">/</span>
                    <span v-if="$parent.currentPage != 'home'" @click="goTo('secondBr')">{{ secondBreadcrumb }}</span>
                    <span v-if="$parent.currentPage == 'surveys'" class="slash">/</span>
                    <span v-if="$parent.currentPage == 'surveys'" @click="goTo('thirdBr')">{{ thirdBreadcrumb }}</span>
                </div>
            </div>
        </div>
        <div id="account">
            <div id="avatar">
                <img src="../assets/avatar.png" alt="">
            </div>
            <div>
                <p>Name Surname</p>
                <span>Position</span>
            </div>
        </div>
    </header>
</template>

<script>
export default {
    methods: {
        goTo(where) {
            switch (where) {
                case 'home':
                    this.$parent.currentPage = 'home'
                    break
                case 'secondBr':

            }
        }
    },
    computed: {
        secondBreadcrumb() {
            switch (this.$parent.currentPage) {
                case 'users':
                    return 'Пользователи'
                    break
                case 'blacklist':
                    return 'Чёрный список'
                    break
                case 'callcenter':
                    return 'Колл-центр'
                    break   
                case 'home':    
                    return 'Домашняя страница'
                    break
                case 'surveys':
                    return 'Опросы'
                    break
            }
        },
        thirdBreadcrumb() {
            switch (this.$parent.currentLi) {
                case 'params':
                    return 'Параметры'
                    break
                case 'questions':
                    return 'Вопросы'
                    break
                case 'logic':
                    return 'Логика'
                    break
                case 'conditions':
                    return 'Условия'
                    break
                case 'resps':
                    return 'Респонденты'
                    break
            }
        },
    }
}
</script>

<style lang="sass">
header
    padding: 30px 0 30px
    width: 100%
    display: flex
    justify-content: space-between
    align-items: flex-start

    #header-wrapper
        display: flex
        align-items: flex-start

    #logo
        width: 200px
        display: flex
        justify-content: center
        align-items: center

        img
            height: 70px
            width: 70px

    #search-and-breadcrumbs
        margin-left: 50px
        width: 40vw
        
        #search
            position: relative

            &-input
                width: 100%
                height: 40px
                padding: 10px
                font-size: 20px
                outline: none
                border: 1px solid grey
                border-radius: 5px

                &:focus
                    border: 2px solid lighten(black, 10%)

                    & + #search-icon
                        color: lighten(black, 10%)

            &-icon
                font-size: 20px
                position: absolute
                right: 10px
                top: 10px
                color: grey

        #breadcrumbs
            margin-top: 20px

            span
                &:hover
                    color: blue
                    text-decoration: underline
                    cursor: pointer
                &.slash
                    padding: 0 10px

    #account
        display: flex
        align-items: center
        float: right

        #avatar
            width: 70px
            height: 70px
            border-radius: 50%
            margin-right: 15px

            img
                height: 70px
                width: 70px

        p
            font-size: 20px
            color: black
            font-weight: bold

        span
            font-size: 16px
            color: grey
</style>