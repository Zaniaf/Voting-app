<template>
    <b-button
        :type="type"
        :class="buttonStyle"
        :disabled="disableButton"
        :variant="variantType"
    >{{ buttonText }}</b-button>
</template>

<script>
export default {
    props: {
        type: {
            type: String
        },
        buttonStyle: {
            type: String
        },
        disableButton: {
            type: Boolean
        },
        variantType: {
            type: String
        },
        buttonText: {
            type: String
        },
    },
};
</script>
