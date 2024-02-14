<template>
    <div class="forecast-container bg-gray-200/50 rounded-2xl pl-2.5 shadow-xl" v-for="forecast in forecasts">
        <div class="day-temperature mt-6 font-thin">
            <p v-if="isMetric" class="temperature__details-cel flex">{{ }}
                <span class="temperature__details-cel__icon">&deg;C</span>
            </p>
            <p v-else class="temperature__details-fahr flex"> {{ forecast.main.temp }}
                <span class="temperature__details-fahr__icon">&deg;F</span>
            </p>
        </div>
        <div class="day-weather">
            <img class="day-weather-img__sized" :src="`/img/state-weather/${forecast.weather[0].description}.png`"
                :alt="`${forecast.weather[0].description}`">
        </div>
        <div class="day-date">
            <h3 class="day-date__number">{{ getDateTime(forecast.dt) }}</h3>
            <p class="day-date__hours">{{ getTime(forecast.dt) }}</p>
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