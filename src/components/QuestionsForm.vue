<template>
    <div>
        <b-container>
            <form @submit.prevent="validateForm">

                <label class="formLabel">
                    <h4>Provide some voting options below</h4>
                </label>

                <b-row class="formInput">
                    <b-col>
                        <b-form-input 
                            class="inputForm"
                            v-model="question"
                            :disabled="question.length > 80"
                            placeholder="Add a question"
                        >
                        </b-form-input>
                    </b-col>
                </b-row>

                <b-row class="row">
                    <b-col>
                        <b-form-input
                            class="inputForm"
                            v-model="answer1"
                            :disabled="answer1.length > 80"
                            placeholder="Add a potential answer"
                        >
                        </b-form-input>
                    </b-col>
                </b-row>

                <b-row class="row">
                    <b-col>
                        <b-form-input
                            class="inputForm"
                            v-model="answer2"
                            :disabled="answer2.length > 80"
                            placeholder="Add a potential answer"
                        >
                        </b-form-input>
                    </b-col>
                </b-row>

                <b-row class="row" v-for="(item, i) in items" :key="i">
                    <b-col>
                        <b-form-input
                            class="inputForm"
                            v-focus
                            v-model="items[i]"
                            :disabled="item.length > 80"
                            placeholder="Add a potential answer"
                        >
                        </b-form-input>

                        <custom-button
                            class="removeButton"
                            v-if="i === items.length-1"
                            variantType="danger"
                            buttonText="Remove"
                            @click.native="removeField()"
                        >
                        </custom-button>
                    </b-col>
                </b-row>

                <b-row>
                    <b-col class="d-flex justify-content-around">
                        <custom-button
                            class="optionButton"
                            variantType="primary"
                            buttonText="Add"
                            @click.native="addInput()"
                        ></custom-button>

                        <custom-button
                            class="optionButton"
                            type="submit"
                            variantType="primary"
                            buttonText="Submit"
                        ></custom-button>

                        <custom-button
                            class="optionButton"
                            variantType="warning"
                            buttonText="Reset"
                            @click.native="resetState()"
                        ></custom-button>
                    </b-col>
                </b-row>

            </form>
        </b-container>
    </div>
</template>

<script>
import { mapMutations } from 'vuex';
import Button from '../components/Shared/Button.vue';

export default {
    name: 'Form',
    components: {
        'custom-button': Button
    },
    data() {
        return {
            question: '',
            answer1: '',
            answer2: '',
            items: [],
            disableInput: false
        }
    },
    directives: {
        focus: {
            inserted: function (el) {
                el.focus();
            },  
        }
    },
    methods: {
        ...mapMutations('voting', ['SET_QUESTIONNAIRE', 'TRACK_VOTES']),
        ...mapMutations('notification', ['notify', 'setStatus']),

        addInput() {
            if (!this.staticFieldsAreEmpty()) {
                if (this.items.length < 8) {
                    this.items.push('');
                }
            } else {
                this.notification('Please fill in the above inputs', 'warning');
            }
        },
        getFormInputs() {
            let formInputs = {};
            let questionnaire = [];
            let overFieldLimit = false;

            formInputs.question = this.question;
            formInputs.answer1  = this.answer1;
            formInputs.answer2  = this.answer2;

            if (this.items.length) {
                this.items.forEach((inputValues, index) => {
                    formInputs['answer' + (index + 3)] = inputValues;
                    overFieldLimit = this.checkInputLength(inputValues, 80);
                });
            }

            if (!overFieldLimit) {
                questionnaire.push(formInputs);
            }

            return questionnaire;
        },
        validateForm() {
            this.submit();
        },
        submit() {
            const questionnaire = this.getFormInputs();

            if (this.staticFieldsAreEmpty()) {
                this.notification('There are empty fields', 'warning');
                return;
            } else if (this.dynamicFieldsAreEmpty(questionnaire[0])) {
                this.notification('An added field is empty', 'warning');
                return;
            } else {
                this.notification('Please submit your vote for the following question', 'success');
                this.SET_QUESTIONNAIRE(questionnaire);
                return;
            }
        },
        resetState() {
            const isConfirmed = confirm('You are about to reset the page. Do you wish to continue?');

            if (!isConfirmed) {
                return;
            }
            this.SET_QUESTIONNAIRE([]);
            this.TRACK_VOTES([]);
            this.resetForm();
        },
        checkInputLength(inputValues, length) {
            if (inputValues.length > length) {
                this.disableInput = true;
                return;
            }
        },
        staticFieldsAreEmpty() {
            return (this.question === '' || this.answer1 === '' || this.answer2 === '');
        },
        dynamicFieldsAreEmpty(questionnaire) {
            return Object.values(questionnaire).includes('');
        },
        resetForm() {
            this.question = '';
            this.answer1 = '';
            this.answer2 = '';
            this.items = [];
            this.notification('', '');
        },
        removeField() {
            this.items.pop();
        },
        notification(message, _type) {
            this.notify({
                msg: message,
                type: _type
            });
        }
    }
}
</script>

<style>
.optionButton {
    float: left;
    margin: 25px 0px 0px 0px;
}

.removeButton {
    float: left;
    margin: 15px 0px 0px 10px;
}

.inputForm {
    margin: 0px 10px;
}

.formLabel {
    float: left;
    margin-bottom: 40px;
}

.row {
    margin-top: 15px;
}
</style>
