<template>
    <div>
        <b-container>
            <h4 v-if="isNew" class="votingLabel">{{ question }}</h4>
            <b-form-checkbox-group
                id="checkbox-group-1"
                v-model="selected"
                :options="options"
                name="flavour-1"
                class="d-flex flex-column"
            ></b-form-checkbox-group>
            <b-row>
                <custom-button
                    class="voteButton"
                    v-if="isNew"
                    variantType="primary"
                    buttonText="Vote"
                    @click.native="submit()"
                ></custom-button>
            </b-row>
        </b-container>
    </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import Button from './Shared/Button.vue';

export default {
    name: 'VotingForm',
    components: {
        'custom-button': Button
    },
    data() {
        return {
            questionnaire: undefined,
            question: undefined,
            isNew: false,
            potentialAnswers: [],
            selected: [],
            options: [],
            votes: [],
            list: [],
        }
    },
    computed: {
        ...mapGetters('voting', ['returnQuestionnaire'])
    },
    watch: {
        returnQuestionnaire(newQuestionnaire, oldQuestionnaire) {
            if (typeof newQuestionnaire !== 'undefined' &&
                typeof oldQuestionnaire !== 'undefined') {
                this.resetComponent(oldQuestionnaire, newQuestionnaire);
            }
            if (typeof newQuestionnaire !== 'undefined') {
                this.initVotingForm(newQuestionnaire);
            }
        }
    },
    methods: {
        ...mapMutations('voting', ['TRACK_VOTES', 'RESET_STATE']),

        initVotingForm(newQuestionnaire) {
            if (newQuestionnaire.length) {
                const questionnaire = [...newQuestionnaire];
                this.getQuestions(questionnaire);
                this.isNew = true;
            }
        },
        getQuestions(questionnaire) {
            this.options.length = 0;
            questionnaire.forEach(_question => {
                this.question = _question.question;
                delete _question.question;
                this.fillCheckboxes(_question);
            });
            return;
        },
        resetComponent(oldQuestionnaire, newQuestionnaire) {
            if (oldQuestionnaire.length > 0 &&
                !newQuestionnaire.length) {
                this.question = '';
                this.potentialAnswers = [];
                this.options = [];
                this.votes = [];
                this.list = [];
                this.isNew = false;
                this.selected = [];
            }
        },
        fillCheckboxes(questionnaire) {
            Object.values(questionnaire).forEach(question => {
                this.options.push({
                    text: question,
                    value: question
                });
            });
        },
        submit() {
            this.selected.forEach(vote => {
                this.votes.push(vote);
            });
            this.countVotes(this.votes);
        },
        countVotes(votes) {
            const repeatedList = [];
            let repeatedValues = [];
            votes.forEach(vote => {
                repeatedValues[vote] = (repeatedValues[vote] || 0) + 1;
            });
            repeatedList.push(repeatedValues);

            this.list = repeatedList;
            this.TRACK_VOTES(this.list);
        }
    }
}
</script>

<style>
.votingLabel {
    margin-bottom: 75px;
}

.voteButton {
    margin: 30px 0px 0px 15px;
}
</style>
