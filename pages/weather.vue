<template>
    <div>
        <span>City: {{ route.query.city }}</span>
    </div>
</template>

<script setup>
import { API_KEY, BASE_URL } from "../composables/index.js";
const route = useRoute()

</script>