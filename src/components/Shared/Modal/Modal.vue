<template>
    <b-modal
        v-model="isVisible"
        id="appModal"
        @click="open()"
        no-close-on-esc
        no-close-on-backdrop
        hide-footer
        hide-header-close
        :title="title"
        size="log"
    >
        <slot></slot>
    </b-modal>
</template>

<script>
export default {
    name: 'appModal',
    data() {
        return {
            isVisible: false,
            title: null
        }
    },
    methods: {
        open(_title) {
            this.isVisible = true;
            this.title = _title;
        },
        close() {
            this.isVisible = false;
        }
    }
}
</script>
