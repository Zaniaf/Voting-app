<template>
    <div v-if="isNew">
        <h4 class="graphLabel"> Voting Results </h4>
        <vue-bar-graph
            :points="points"
            :show-x-axis="showXaxis" 
            :show-y-axis="showYaxis" 
            :width="width"
            :height="height"
            :show-values="showValues"
        />
        <div v-if="totalVotes !== null" class="total-votes">
            <h5> Total Votes </h5>
            {{ totalVotes }}
        </div>
    </div>
</template>

<script>
import PureVueChart from 'pure-vue-chart';
import { mapGetters } from 'vuex';

export default {
    name: 'VotingGraph',
    components: {
        'vue-bar-graph': PureVueChart
    },
    data() {
        return {
            points: [],
            height: 200,
            width: 200,
            showXaxis: true,
            showYaxis: false,
            showValues: true,
            isNew: undefined,
            totalVotes: null
        }
    },
    computed: {
        ...mapGetters('voting', ['returnVotes'])
    },
    watch: {
        returnVotes(newVotes, oldVotes) {
            if (typeof newVotes !== 'undefined' &&
                typeof oldVotes !== 'undefined') {
                this.resetComponent(oldVotes, newVotes);
            }
            if (typeof newVotes !== 'undefined') {
                this.initComponent(newVotes);
            }
        }
    },
    methods: {
        getPoints(votes) {
            const allPoints = [];
            if (typeof allPoints !== 'undefined') {
                votes.forEach(vote => {
                    Object.values(vote).forEach(_vote => {
                        allPoints.push({
                            value: _vote,
                            label: _vote
                        });
                    });
                });
            }
            this.points = allPoints;
            this.calculatePoints(allPoints);
            return allPoints;
        },
        calculatePoints(points) {
            let totalVotes = 0;
            points.forEach(point => {
                totalVotes += point.value
            });
            this.totalVotes = totalVotes;
        },
        initComponent(votes) {
            if (votes.length > 0) {
                let allVotes = [...votes];
                this.getPoints(allVotes);
                this.isNew = true;
            }
        },
        resetComponent(oldVotes, newVotes) {
            if (oldVotes.length === 1 &&
                newVotes.length === 0 ) {
                this.isNew = false;
                this.totalVotes = null;
            }
        }
    }
}
</script>

<style>
.graphLabel {
    margin-bottom: 75px;
}

.total-votes {
    margin-top: 30px;
}
</style>
