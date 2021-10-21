<template>
    <div class="home">
        <user-role ref="modal"></user-role>
        <b-container v-if="appState">
            <notifier></notifier>

            <b-row class="firstRow">
                <b-col class="border-right">
                    <questions-form></questions-form>
                </b-col>
                <b-col class="border-right">
                    <voting-form></voting-form>
                </b-col>
                <b-col>
                    <voting-graph></voting-graph>
                </b-col>
            </b-row>

        </b-container>
    </div>
</template>

<script>
import UserRole from '../components/Shared/Modal/ModalContent.vue';
import QuestionsForm from '../components/QuestionsForm.vue';
import VotingForm from '../components/VotingForm.vue';
import VotingGraph from '../components/VotingGraph.vue';
import Notifier from '../components/Shared/Notifier.vue';
import { mapGetters } from 'vuex';

export default {
    name: 'Home',
    components: {
        'user-role': UserRole,
        'questions-form': QuestionsForm,
        'voting-form': VotingForm,
        'voting-graph': VotingGraph,
        'notifier': Notifier,

    },
    data() {
        return {
            appState: false,
        }
    },
    mounted() {
        this.open;
        this.$refs.modal.show(this.initUserModal());
    },
    computed: {
        ...mapGetters('app', ['returnAppState']),
    },
    watch: {
        returnAppState(pAppState) {
            this.appState = pAppState;
        }
    },
    methods: {
        initUserModal() {
            const userModal = {};
            userModal.title = 'Voting application!';
            userModal.buttonVariant = 'success';

            return userModal;
        }
    },
}
</script>

<style>
.firstRow {
    margin-top: 50px
}
</style>
