<template>
    <popup-modal ref="popup">
        <custom-button
            :buttonStyle="buttonStyle"
            :variantType="variantType"
            :disableButton=false
            buttonText="Start"
            @click.native="submit()"
        ></custom-button>
    </popup-modal>
</template>

<script>
import Modal from './Modal.vue';
import Button from '../Button.vue';
import { mapMutations, mapGetters } from 'vuex';

export default {
    name: 'ModalContent',
    components: {
        'popup-modal': Modal,
        'custom-button': Button
    },
    data() {
        return {
            title: undefined,
            variantType: undefined,
            buttonStyle: undefined,
            disableButton: undefined,
        }
    },
    methods: {
        ...mapMutations('app', ['SET_APP_STATE']),
        ...mapGetters('app', ['returnAppState']),

        show(modal) {
            this.title = modal.title;
            this.variantType = modal.variantType;
            this.selectOption = modal.selectOption;
            this.buttonStyle = modal.buttonStyle;
            this.disableButton = modal.disableButton;
            this.$refs.popup.open(this.title);
        },
        confirm() {
            this.$refs.popup.close();
        },
        cancel() {
            this.$refs.popup.close();
        },
        submit() {
            this.$refs.popup.close();
            this.SET_APP_STATE(true);
        }
    }
}
</script>
