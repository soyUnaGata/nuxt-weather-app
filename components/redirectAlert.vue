<template>
    <div class="alert-dialog" v-if="open" @click="_cancel">
        <div style="position: absolute; inset: 0px; background: rgba(15, 15, 15, 0.6);"></div>
        <div class="alert-dialog-content">
            <div style="overflow-wrap: break-word;">
                <div style="text-align: center;">Do you agree?</div>
                <div style="padding-top: 6px; padding-bottom: 6px;">
                    <button type="button" class="alert-dialog-action--confirm" @click="_confirm">Yes</button>
                    <button type="button" class="alert-dialog-action--cancel" @click="_cancel">No</button>
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
        resolvePromise.value = resolve
        rejectPromise.value = reject
    })
}

const _confirm = () => {
    open.value = false;
    resolvePromise.value(true)
}

const _cancel = () => {
    open.value = false;
    resolvePromise.value(false);
}

defineExpose({
    show
});
</script>

<style  scoped>
.alert-dialog {
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0px;
    left: 0px;
    display: flex;
    align-items: center;
    justify-content: center;
    pointer-events: auto;
    opacity: 1;
    transition-property: opacity;
    transition-duration: 270ms;
    transition-timing-function: ease;
    z-index: var(--z-index-modal);
}

.alert-dialog-content {
    position: relative;
    z-index: 1;
    box-shadow: rgba(15, 15, 15, 0.05) 0px 0px 0px 1px, rgba(15, 15, 15, 0.1) 0px 5px 10px, rgba(15, 15, 15, 0.2) 0px 15px 40px;
    border-radius: 6px;
    background-color: brown;
    border: 1px solid brown;
    margin-bottom: 0px;
    overflow: hidden;
    padding: 24px;
    width: 300px;
    font-size: 16px;
    margin-left: 24px;
    margin-right: 24px;
    transition-property: transform;
    transition-duration: 270ms;
    transition-timing-function: ease;
}

.alert-dialog-action--confirm {
    user-select: none;
    transition: background 20ms ease-in 0s;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    white-space: nowrap;
    border-radius: 3px;
    height: 42px;
    padding-left: 12px;
    padding-right: 12px;
    font-size: 14px;
    line-height: 1.2;
    color: red;
    border: 1px solid red;
    width: 100%;
    margin-top: 8px;
    background: rgba(235, 87, 87, 0.1);
}

.alert-dialog-action--cancel {
    user-select: none;
    transition: background 20ms ease-in 0s;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    white-space: nowrap;
    border-radius: 3px;
    height: 42px;
    padding-left: 12px;
    padding-right: 12px;
    font-size: 14px;
    line-height: 1.2;
    width: 100%;
    margin-top: 8px;
    color: blanchedalmond;
    background-color: transparent;
    border: 1px solid blue;
}
</style>