<template>
    <div class="survey">
        <div class="survey-header">
            <div class="survey-header-name">
                <div class="and" v-if="survey.id != 1">И</div>
                <p>Условие {{ surveyCount }}</p>
            </div>
            <select v-model="survey.type" ref="surveyType" @change="changeType($refs.surveyType.value)">
                <option disabled>Выберите условие:</option>
                <option value="resp-age">Возраст респондента</option>
                <option value="resp-town">Город проживания респондента</option>
                <option value="card-type">Тип карты лояльности</option>
                <option value="card-status">Статус карты лояльности</option>
            </select>
        </div>


        <template v-if="survey.type == 'resp-age'">
            <div class="survey-data">
                <div class="data" v-for="condition of survey.conditions" :key="survey.conditions.indexOf(condition)">
                    <div class="data-name">
                        <div class="or" v-if="survey.conditions.indexOf(condition) != 0">Или</div>
                        <span>Диапазон {{ survey.conditions.indexOf(condition) + 1 }}</span>
                    </div>
                    <div class="data-input">
                        <div>
                            <span class="from">от</span>
                            <input type="number" v-model="survey.conditions[survey.conditions.indexOf(condition)].from">
                            <span class="to">до</span>
                            <input type="number" v-model="survey.conditions[survey.conditions.indexOf(condition)].to">
                        </div>
                        <button @click="deleteCondition(condition)"><font-awesome-icon icon="trash-alt" /></button>
                    </div>
                </div>
            </div>
        </template>

        <template v-else-if="survey.type == 'resp-town'">
            <div class="survey-data">
                <div class="data" v-for="condition of survey.conditions" :key="survey.conditions.indexOf(condition)">
                    <div class="data-name">
                        <div class="or" v-if="survey.conditions.indexOf(condition) != 0">Или</div>
                        <span>Город {{ survey.conditions.indexOf(condition) + 1 }}</span>
                    </div>
                    <div class="data-input">
                        <select v-model="survey.conditions[survey.conditions.indexOf(condition)]">
                            <option v-show="!survey.conditions.includes('Moscow')" value="Moscow">Москва</option>
                            <option v-show="!survey.conditions.includes('London')" value="London">Лондон</option>
                            <option v-show="!survey.conditions.includes('Berlin')" value="Berlin">Берлин</option>
                            <option v-show="!survey.conditions.includes('Tokyo')" value="Tokyo">Токио</option>
                        </select>
                        <button @click="deleteCondition(condition)"><font-awesome-icon icon="trash-alt" /></button>
                    </div>
                </div>
            </div>
        </template>

        <template v-else-if="survey.type == 'card-type'">
            <div class="survey-data">
                <div class="data" v-for="condition of survey.conditions" :key="survey.conditions.indexOf(condition)">
                    <div class="data-name">
                        <div class="or" v-if="survey.conditions.indexOf(condition) != 0">Или</div>
                        <span>Тип {{ survey.conditions.indexOf(condition) + 1 }}</span>
                    </div>
                    <div class="data-input">
                        <select v-model="survey.conditions[survey.conditions.indexOf(condition)]">
                            <option v-show="!survey.conditions.includes('gold')" value="gold">Gold</option>
                            <option v-show="!survey.conditions.includes('silver')" value="silver">Silver</option>
                            <option v-show="!survey.conditions.includes('bronze')" value="bronze">Bronze</option>
                        </select>
                        <button @click="deleteCondition(condition)"><font-awesome-icon icon="trash-alt" /></button>
                    </div>
                </div>
            </div>
        </template>

        <template v-else-if="survey.type == 'card-status'">
            <div class="survey-data">
                <div class="data" v-for="condition of survey.conditions" :key="survey.conditions.indexOf(condition)">
                    <div class="data-name">
                        <div class="or" v-if="survey.conditions.indexOf(condition) != 0">Или</div>
                        <span>Статус {{ survey.conditions.indexOf(condition) + 1 }}</span>
                    </div>
                    <div class="data-input">
                        <select v-model="survey.conditions[survey.conditions.indexOf(condition)]">
                            <option v-show="!survey.conditions.includes('active')" value="active">Активный</option>
                            <option v-show="!survey.conditions.includes('nonactive')" value="nonactive">Не активный</option>
                        </select>
                        <button @click="deleteCondition(condition)"><font-awesome-icon icon="trash-alt" /></button>
                    </div>
                </div>
            </div>
        </template>

        <div class="survey-footer">
            <button @click="addCondition()" :disabled="canIAddCondition"><font-awesome-icon icon="plus" />Добавить {{ addBtnHtml }}</button>
            <button @click="deleteSurvey()"><font-awesome-icon icon="trash-alt" />Удалить условие</button>
        </div>
    </div>
</template>

<script>
export default {
    props: [ 'surveyData' ],
    data() {
        return {
            survey: this.surveyData,
            possibleConditions: {
                respTown: ['Moscow', 'London', 'Berlin', 'Tokyo'],
                cardType: ['gold', 'silver', 'bronze'],
                cardStatus: ['active', 'nonactive']
            }
        }
    },
    methods: {
        logSurvey() {
            console.log(this.survey)
        },
        _canIAdd(type) {
            for (let cond in this.possibleConditions[type]) {
                if (!this.survey.conditions.includes(cond)) return cond
            }
        },
        addCondition() {
            switch (this.survey.type) {
                case 'resp-age':
                    this.survey.conditions.push({"from":"0", "to": "0"})
                    break
                case 'resp-town':
                    this.survey.conditions.push(this._canIAdd('respTown'))
                    break
                case 'card-type':
                    this.survey.conditions.push(this._canIAdd('cardType'))
                    break
                case 'card-status':
                    this.survey.conditions.push(this._canIAdd('cardStatus'))
                    break
            }
        },
        deleteCondition(cond) {
            this.survey.conditions.splice(this.survey.conditions.indexOf(cond), 1)
        },
        deleteSurvey() {
            this.$parent.avalibleSurveys.push(this.survey.type)
            this.$parent.surveysDB.splice(
                this.$parent.surveysDB.indexOf(
                    this.$parent.surveysDB.find(item => item.id == this.survey.id)
                )
            , 1)
        },
        changeType(type) {
            switch (type) {
                case 'resp-age':
                    this.survey.conditions = [{"from":"18", "to": "24"}]
                    break
                case 'resp-town':
                    this.survey.conditions = ["Moscow"]
                    break
                case 'card-type':
                    this.survey.conditions = ["gold"]
                    break
                case 'card-status':
                    this.survey.conditions = ["active"]
                    break
            }
        }
    },
    computed: {
        addBtnHtml() {
            switch (this.survey.type) {
                case 'resp-age':
                    return 'Диапазон'
                    break
                case 'resp-town':
                    return 'Город'
                    break
                case 'card-type':
                    return 'Тип'
                    break
                case 'card-status':
                    return 'Статус'
                    break
            }
        },
        surveyCount() {
            return this.$parent.surveysDB.indexOf(this.$parent.surveysDB.find(item => item.id == this.survey.id)) + 1
        },
        canIAddCondition() {
            switch (this.survey.type) {
                case 'resp-age':
                    return false
                    break
                case 'resp-town':
                    return this.survey.conditions.length == this.possibleConditions.respTown.length
                    break
                case 'card-type':
                    return this.survey.conditions.length == this.possibleConditions.cardType.length
                    break
                case 'card-status':
                    return this.survey.conditions.length == this.possibleConditions.cardStatus.length
                    break
            }
        }
    },
}
</script>

<style lang="sass">
.survey
    padding: 40px 30px
    border-bottom: 1px solid lighten(grey, 20%)
    
    select, input, button
        border: 1px solid grey
        border-radius: 5px
        padding: 10px
        outline: none

    select, button
        cursor: pointer

    &-header
        display: flex
        align-items: center
        margin-bottom: 20px

        &-name
            position: relative
            width: 25%

            .and
                position: absolute
                left: 0px
                top: -68px
                padding: 10px
                border-radius: 5px
                
            p
                font-weight: bold

        select
            width: 75%
    
    .data
        display: flex
        align-items: center
        margin-bottom: 20px

        &-name
            width: 25%
            .or
                display: inline-block
                padding: 10px
                border-radius: 5px
                margin-right: 15px
        &-input
            width: 75%
            display: flex
            justify-content: space-between
            button
                font-size: 16px
                background-color: white
                border: 2px solid #F37D85
                color: #F37D85
        select
            width: 60%

        .from, .to
            margin-right: 10px
            & + input
                width: 20%

        .to
            margin-left: 30px

    &-footer
        width: 75%
        margin-left: auto
        display: flex
        justify-content: space-between

        button
            font-size: 16px
            background-color: white
            
            &:first-child
                border: 2px solid #bbc262
                color: #bbc262
            &:last-child
                border: 2px solid #F37D85
                color: #F37D85

            svg
                margin-right: 5px
</style>