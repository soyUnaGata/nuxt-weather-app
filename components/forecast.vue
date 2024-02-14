<template>
    <div class="forecast-container bg-gray-200/50 rounded-2xl pl-2.5 shadow-xl" v-for="forecast in forecasts">
        <div class="day-temperature">{{ forecast.main.temp }}</div>
        <div class="day-weather">
            <img class="day-weather-img__sized" :src="`/img/state-weather/${forecast.weather[0].description}.png`"
                :alt="`${forecast.weather[0].description}`">
        </div>
        <div class="day-date">
            <h3 class="day-date__number">{{ getDateTime(forecast.dt) }}</h3>
            <p class="day-date__day">{{ getTime(forecast.dt) }}</p>
            <p class="day-date__hours"></p>
        </div>
    </div>
</template>

<script setup>
import { getTime, getDateTime } from "../utils/dayjsUtil.js";

const props = defineProps({
    forecasts: {
        type: Array,
        default: {}
    }
});
</script>

<style scoped>
.forecast-container {
    height: 210px;
    width: 150px;
}

.day-weather-img__sized {
    width: 50px;
}
</style>