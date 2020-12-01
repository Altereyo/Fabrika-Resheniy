<template>
    <main>
        <template v-if="this.$parent.currentPage == 'surveys'">
            <ul>
                <li @click="changeLi('params')" :style="liStyle('params')">Параметры</li>
                <li @click="changeLi('questions')" :style="liStyle('questions')">Вопросы</li>
                <li @click="changeLi('logic')" :style="liStyle('logic')">Логика</li>
                <li @click="changeLi('conditions')" :style="liStyle('conditions')">Условия</li>
                <li @click="changeLi('resps')" :style="liStyle('resps')">Респонденты</li>
            </ul>
            <template v-if="$parent.currentLi == 'resps'">
                <div id="surveys">
                    <input type="text" name="" id="surveys-name" placeholder="Введите название опроса">
                    <survey v-for="survey in surveysDB" :surveyData="survey" :key="survey.id"/>
                </div>
                <div class="addSurvey">
                    <button @click="addSurvey()" :disabled="canIAddSurvey">
                        <font-awesome-icon icon="plus" />
                        <span>Добавить новое условие</span>
                    </button>
                    <p v-if="avalibleSurveys.length == 0">
                        <font-awesome-icon icon="exclamation" />
                        Все условия выборки добавлены!
                    </p>
                </div>
                <div class="main-footer">
                    <button id="testSurvey" @click="deleteData()">Протестировать опрос</button>
                    <button id="saveSurveys" @click="saveDatabase()">Сохранить</button>
                </div>
            </template>
            <template v-else>
                <div class="notCompletedDiv">
                    <p>{{ otherLiHtml }}</p>
                </div>
            </template>
        </template>
        <template v-else>
            <div class="notCompletedDiv">
                <p>{{ otherMainHtml }}</p>
            </div>
        </template>
    </main>
</template>

<script>
import survey from "../components/survey.vue"
export default {
    components: { survey },
    data() {
        return {
            surveysDB: [],
            avalibleSurveys: ['resp-age', 'resp-town', 'card-type', 'card-status'],
        }
    },
    methods: {
        changeLi(li) {
            this.$parent.currentLi = li
        },
        liStyle(li) {
            if (this.$parent.currentLi == li) {
                return 'font-weight: bold; border-bottom: 3px solid #b3f381'
            }
        },
        checkAvalibleSurveys() {
            this.surveysDB.forEach((survey) => {
                if (this.avalibleSurveys.includes(survey.type)) {
                    this.avalibleSurveys.splice(this.avalibleSurveys.indexOf(survey.type), 1)
                }
            })
        },
        addSurvey() {
            let id = this.surveysDB[this.surveysDB.length - 1].id + 1
            console.log(id)
            let conditions = []
            switch (this.avalibleSurveys[0]) {
                case 'resp-age':
                    conditions.push({"from":"18", "to": "24"})
                    break
                case 'resp-town':
                    conditions.push('Moscow')
                    break
                case 'card-type':
                    conditions.push('gold')
                    break
                case 'card-status':
                    conditions.push('active')
                    break
            }
            let newSurvey = {
                "id": id,
                "type": this.avalibleSurveys[0],
                "conditions": conditions
            }
            this.surveysDB.push(newSurvey)
            this.checkAvalibleSurveys()
        },
        getData() {
            return fetch ('/surveys')
                .then(d => d.json())
                .then(d => this.surveysDB = d)
        },
        post() {
            return fetch('/surveys', {
                method: 'POST',
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(this.survey)
            })
        },
        deleteData() {
            return fetch('/surveys', {
                method: 'DELETE',
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify()
            })
        },
        saveDatabase() {
            return fetch('/surveys', {
                method: 'POST',
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(this.surveysDB)
            })
        }
    },
    computed: {
        canIAddSurvey() {
            return this.avalibleSurveys.length == 0
        },
        otherLiHtml() {
            switch (this.$parent.currentLi) {
                case 'params':
                    return 'Блок "Параметры" находится в процессе разработки'
                    break
                case 'questions':
                    return 'Блок "Вопросы" находится в процессе разработки'
                    break
                case 'logic':
                    return 'Блок "Логика" находится в процессе разработки'
                    break
                case 'conditions':
                    return 'Блок "Условия" находится в процессе разработки'
                    break
            }
        },
        otherMainHtml() {
            switch (this.$parent.currentPage) {
                case 'users':
                    return 'Блок "Пользователи" находится в процессе разработки'
                    break
                case 'blacklist':
                    return 'Блок "Чёрный список" находится в процессе разработки'
                    break
                case 'callcenter':
                    return 'Блок "Колл-центр" находится в процессе разработки'
                    break   
                case 'home':    
                    return 'Домашняя страница находится в процессе разработки'
                    break   
            }
        }
    },
    mounted() {
        this.getData()
            .then(() => this.checkAvalibleSurveys())
    },
}
</script>

<style lang="sass">
.notCompletedDiv
    display: flex
    justify-content: center
    padding-top: 100px
    p
        font-size: 30px

main
    display: inline-block
    -webkit-box-shadow: 0px 5px 10px 2px rgba(34, 60, 80, 0.2)
    -moz-box-shadow: 0px 5px 10px 2px rgba(34, 60, 80, 0.2)
    box-shadow: 0px 5px 10px 2px rgba(34, 60, 80, 0.2)
    width: 100%
    margin-left: 50px

    ul
        width: 100%
        display: flex

        li
            list-style: none
            padding: 15px 40px
            color: darken(#6BF15F, 30%)
            font-size: 20px
            cursor: pointer

    #surveys-name
        border: none
        outline: none
        width: 100%
        padding: 20px 30px
        font-size: 20px

    .addSurvey
        padding: 40px 30px
        display: flex
        flex-direction: column
        align-items: center

        button
            width: 100%
            padding: 30px 0
            display: flex
            flex-direction: column
            align-items: center
            background-color: transparent
            border: 1px dotted grey
            border-radius: 10px

            svg
                font-size: 40px

            span 
                font-size: 20px
        p
            display: flex
            align-items: center
            justify-content: center
            width: 100%
            margin-top: 10px
            border-radius: 5px
            background-color: lighten(#F37D85, 10%)
            color: white
            padding: 10px 0
            font-size: 16px

            svg
                font-size: 24px
                margin-right: 10px

    .main-footer
        padding: 40px 30px
        background-color: lighten(#6BF15F, 30%)
        display: flex
        justify-content: space-between

        #testSurvey, #saveSurveys
            border: none
            border-radius: 5px
            padding: 10px
            outline: none
            cursor: pointer

        #testSurvey
            background-color: white
            color: #6BF15F
            border: 2px solid #6BF15F

        #saveSurveys
            background-color: #6BF15F
            color: white
            font-size: 16px
            font-weight: bold

    $first-survey-theme: #ffda5b
    $second-survey-theme: #93C4F9
    $third-survey-theme: #b3f381

    .survey:nth-child(3n+2)
        background: lighten($first-survey-theme, 25%)
        .and, .or
            background-color: lighten($first-survey-theme, 10%)
        .survey-header 
            p
                color: darken($first-survey-theme, 20%)
        
    .survey:nth-child(3n)
        background: lighten($second-survey-theme, 20%)
        .and, .or
            background-color: lighten($second-survey-theme, 10%)
        .survey-header 
            p
                color: darken($second-survey-theme, 20%)
        
    .survey:nth-child(3n+1)
        background: lighten($third-survey-theme, 20%)
        .and, .or
            background-color: lighten($third-survey-theme, 10%)
        .survey-header 
            p
                color: darken($third-survey-theme, 20%)
</style>