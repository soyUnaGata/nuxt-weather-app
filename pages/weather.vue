<template>
    <div>
        <p>{{ city }}</p>
        <NuxtLink to="/">Back</NuxtLink>
    </div>
</template>

<script setup>
import { API_KEY, BASE_URL } from "../composables/index.js";
const route = useRoute();

const city = ref(route.query.city);
const infoWeather = ref(null);

async function getWeather() {
    await axios.get(`${BASE_URL}?q=${city}&appid=${API_KEY}`)
        .then(response => (console.log(response)))
}

onMounted(getWeather
)

</script>