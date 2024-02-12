<template>
    <div class="alert-dialog" v-if="open" @click="_cancel">
        <div style="position: absolute; inset: 0px; background: rgba(15, 15, 15, 0.6);"></div>
        <div class="alert-dialog-content">
            <div style="overflow-wrap: break-word;">
                <div style="text-align: center;">{{ text }}</div>
                <div style="padding-top: 6px; padding-bottom: 6px;">
                    <button type="button" class="alert-dialog-action--confirm" @click="_confirm">{{ confirmation }}</button>
                    <button type="button" class="alert-dialog-action--cancel" @click="_cancel">Cancel</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const resolvePromise = ref(null);
const rejectPromise = ref(null);
const open = ref(false);

const show = () => {
    open.value = true;
    return new Promise((resolve, reject) => {
        resolvePromise = resolve
        rejectPromise = reject
    })
}
</script>

<style  scoped></style>