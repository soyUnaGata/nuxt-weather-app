<template>
    <div>
        <h1>index</h1>
        <input v-model="city" type="text" class="border-2 border-orange-700">
        <NuxtLink :to="'/weather'">Go</NuxtLink>
    </div>
</template>

<script setup>

const city = ref();

</script>

