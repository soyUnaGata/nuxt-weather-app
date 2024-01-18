<template>
    <div>
        <div>
            {{ details.name }}</div>
        <img :src="`/img/state-weather/${weather.description}.png`">
        <button @click="toggleTemperature">
            {{ isMetric ? 'Switch to Kelvin' : 'Switch to Celsius' }}
        </button>
        <p v-if="isMetric">
            {{ fahrenheitToCelsius }} &deg;C </p>
        <p v-else> {{ temperature }} &deg;F</p>
        {{ temperature }}
        <NuxtLink to="/">Back</NuxtLink>
    </div>
</template>

<script setup>
import { API_KEY, BASE_URL } from "../composables/index.js";
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';

const route = useRoute();
const city = ref(route.query.city);

const details = ref('')
const weather = ref({});
const isMetric = ref(true);
const temperature = ref({});


async function getWeather() {
    await axios.get(`${BASE_URL}?q=${city.value}&appid=${API_KEY}&units=imperial`)
        .then(response => response.data)
        .then((info) => {
            details.value = info;
            temperature.value = info.main ? Math.round(info.main.temp) : {};
            weather.value = info.weather.length ? info.weather[0] : {};
        })
}

function toggleTemperature() {
    isMetric.value = !isMetric.value;
}

const fahrenheitToCelsius = computed(() => {
    return temperature.value ? Math.round(parseInt(temperature.value - 32) * (5 / 9)) : null;
});

onMounted(getWeather)


</script>