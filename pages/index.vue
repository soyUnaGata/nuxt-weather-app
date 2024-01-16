<template>
    <div>
        <h1 class="">index</h1>
        <input v-model="city" type="text" class="border-2 border-orange-700">
        <NuxtLink :to="'/weather'">Go</NuxtLink>
    </div>
</template>

<script setup>
import { API_KEY, BASE_URL } from "../composables/index.js";

const city = ref();

</script>

