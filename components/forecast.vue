<template>
    <Swiper class="w-full" :modules="[SwiperAutoplay, SwiperEffectCreative]"
        :slides-per-view="isDesktop ? 8 : isTablet ? 4 : 2" :space-between="isDesktop ? 25 : isTablet ? 15 : 10"
        :effect="'fade'" :autoplay="{
            delay: 8000,
            disableOnInteraction: true,
        }" :fade-effect="{
    crossFade: true,
}">
        <SwiperSlide
            class="forecast-container font-semibold bg-gray-200/50 rounded-2xl pl-2.5 shadow-xl items-center flex flex-col gap-5 cursor-pointer"
            v-for="(forecast, index) in forecasts" :key="index">
            <div class="day-temperature font-semibold">
                <p v-if="isMetric" class="temperature__details-cel flex">
                    {{ fahrenheitToCelsius(forecast.main.temp) }}
                    <span class="temperature__details-cel__icon">&deg;C</span>
                </p>
                <p v-else class="temperature__details-fahr flex">
                    {{ Math.round(forecast.main.temp) }}
                    <span class="temperature__details-fahr__icon">&deg;F</span>
                </p>
            </div>
            <div class="day-weather">
                <img class="day-weather-img__sized" :src="`/img/state-weather/${forecast.weather[0].description}.png`"
                    :alt="`${forecast.weather[0].description}`" />
            </div>
            <div class="day-date">
                <p class="day-date__hours">{{ getDayDate(forecast.dt) }}</p>
                <h3 class="day-date__number text-center">
                    {{ getDateTime(forecast.dt) }}
                </h3>
                <p class="day-date__hours text-center">{{ getTime(forecast.dt) }}</p>
            </div>
        </SwiperSlide>
    </Swiper>
</template>

<script setup>
import { getTime, getDateTime, getDayDate } from "../utils/dayjsUtil.js";
import { fahrenheitToCelsius } from "../utils/index.js";

const props = defineProps({
    forecasts: {
        type: Array,
        default: {},
    },
    isMetric: {
        type: Boolean,
    },
});

const viewport = useViewport();
let isDesktop = computed(() => {
    return viewport.isGreaterOrEquals("desktop");
});
const isTablet = computed(() => {
    return viewport.match("tablet");
});
</script>

<style scoped>
.swiper-3d {
    perspective: 1440px;
}

.swiper-slide {
    display: flex;
    align-items: center;
    justify-content: center;
}

.forecast-container {
    height: 210px;
    width: 150px;
    color: var(--primary);
}

.day-weather-img__sized {
    width: 50px;
}
</style>

<style>
@media(max-width: 576px) {
    .forecast-container {
        height: 210px;
        width: 150px;
        color: var(--primary);
    }
}
</style>
