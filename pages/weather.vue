<template>
    <div>
        <p>{{ city }}</p>
        <NuxtLink to="/">Back</NuxtLink>
    </div>
</template>

<script setup>
import { API_KEY, BASE_URL } from "../composables/index.js";
import axios from 'axios';
const route = useRoute();

const city = ref(route.query.city);
const infoWeather = ref(null);

async function getWeather() {
    await axios.get(`${BASE_URL}?q=${city.value}&appid=${API_KEY}`)
        .then(response => response.data)
        .then(data => infoWeather.value = data)
}

onMounted(getWeather)

</script>