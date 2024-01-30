<template>
    <div class="wrapper">
        <nav>
            <ul class="flex justify-between">
                <li>
                    <NuxtLink to="/">Back</NuxtLink>
                </li>
                <li>
                    <div class="toogle__temperature temp" id="button-toogler">
                        <input type="checkbox" class="toogle__checkbox" @click="toggleTemperature" />
                        <div class="knobs">
                            <span>C&deg;</span>
                        </div>
                        <div class="layer"></div>
                    </div>
                </li>
            </ul>
        </nav>

        <main class="details__weather mt-16 flex w-full">
            <div class="about__weather-section flex flex-col w-2/4">
                <div class="weather__conditions flex justify-between items-center">
                    <div class="weather__conditions-img">
                        <img v-if="src !== '/img/state-weather/undefined.png'" class="weather__conditions-img__sized"
                            :src="`/img/state-weather/${weather.description}.png`" :alt="`${weather.description}`">
                        <!-- <img :src="`https://openweathermap.org/img/wn/${weather.icon}@2x.png`" alt=""> -->
                    </div>
                </div>

                <div class="temperature__details mt-6 font-thin">
                    <p v-if="isMetric" class="temperature__details-cel text-9xl flex">{{ fahrenheitToCelsius }}
                        <span class="temperature__details-cel__icon text-4xl">&deg;C</span>
                    </p>
                    <p v-else class="temperature__details-fahr text-9xl flex"> {{ Math.round(temperature) }}
                        <span class="temperature__details-fahr__icon text-4xl">&deg;F</span>
                    </p>
                </div>


                <section class="weather__details flex flex-col mt-4">
                    <div class="weather__details-about flex items-center gap-1.5">
                        <div class="weather__details-city flex items-center gap-1.5">
                            <svg class="weather__details-city__icon" xmlns="http://www.w3.org/2000/svg" height="20"
                                width="20" viewBox="0 0 384 512">
                                <path
                                    d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z" />
                            </svg>
                            <h3 class="weather__details-city__name text-3xl"> {{ details.name }}, {{ details.sys?.country }}
                            </h3>
                        </div>

                        <span class="pipeline border"></span>

                        <h3 class="weather__details-description text-3xl">{{ capitalizeFirstLetter(weather.description) }}
                        </h3>
                    </div>

                    <div class="weather__details-date mt-4">
                        <div class="weather__details-date__numeric text-xl flex items-center gap-1.5">
                            <svg class="weather__details-calendar" xmlns="http://www.w3.org/2000/svg" height="20" width="20"
                                viewBox="0 0 448 512">
                                <path
                                    d="M128 0c17.7 0 32 14.3 32 32V64H288V32c0-17.7 14.3-32 32-32s32 14.3 32 32V64h48c26.5 0 48 21.5 48 48v48H0V112C0 85.5 21.5 64 48 64H96V32c0-17.7 14.3-32 32-32zM0 192H448V464c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V192zm64 80v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H80c-8.8 0-16 7.2-16 16zm128 0v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H208c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H336zM64 400v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V400c0-8.8-7.2-16-16-16H80c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V400c0-8.8-7.2-16-16-16H208zm112 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V400c0-8.8-7.2-16-16-16H336c-8.8 0-16 7.2-16 16z" />
                            </svg>
                            <span>{{ formatDay(timezone) }}th {{ formatMonth(timezone) }} '{{ formatYear(timezone) }}</span>
                        </div>
                        <div class="weather__details-date__weekday text-base flex items-center gap-1.5 mt-2">
                            {{ formatWeekday(timezone) }}
                            <span class="pipeline border"></span>
                            {{ formatTime(timezone) }}
                        </div>
                    </div>
                </section>
            </div>

            <div class="details flex">
                <section class="grid grid-cols-2 gap-y-5 gap-x-10">
                    <sunrise :details="details" />
                    <humidity :details="details" />
                    <wind :winds="winds" />
                </section>
            </div>
        </main>



        <section>next</section>

    </div>
</template>

<script setup>
import { API_KEY, BASE_URL } from "../composables/index.js";
import { capitalizeFirstLetter } from "../utils/index.js";
import { formatTime, formatDay, formatMonth, formatYear, formatWeekday } from "../utils/dayjsUtil.js";
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';



const route = useRoute();
const city = ref(route.query.city);

const details = ref('')
const weather = ref({});
const isMetric = ref(true);
const temperature = ref({});
const timezone = ref('');
const winds = ref({});


async function getWeather() {
    await axios.get(`${BASE_URL}?q=${city.value}&appid=${API_KEY}&units=imperial`)
        .then(response => response.data)
        .then((info) => {
            details.value = info;
            temperature.value = info.main ? info.main.temp : {};
            weather.value = info.weather.length ? info.weather[0] : {};
            timezone.value = info.timezone;
            winds.value = info.wind;
        })
}

function toggleTemperature() {
    isMetric.value = !isMetric.value;
}

const fahrenheitToCelsius = computed(() => {
    return temperature.value ? Math.round(parseInt(temperature.value - 32) * (5 / 9)) : 0;
});


onMounted(() => {
    getWeather()
});



</script>

<style scoped>
.wrapper {
    max-width: 1440px;
    margin: 0 auto;
}


.knobs,
.layer {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
}

.toogle__temperature {
    position: relative;
    top: 50%;
    width: 92px;
    height: 43px;
    overflow: hidden;
}

.toogle__temperature.r,
.toogle__temperature.r .layer {
    border-radius: 100px;
}

.toogle__temperature.temp {
    border-radius: 100px;
}

.toogle__checkbox {
    position: relative;
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
    opacity: 0;
    cursor: pointer;
    z-index: 3;
}

.knobs {
    z-index: 2;
}

.layer {
    width: 100%;
    background-color: var(--primary);
    transition: 0.3s ease all;
    z-index: 1;
}

#button-toogler .knobs:before,
#button-toogler .knobs:after,
#button-toogler .knobs span {
    position: absolute;
    top: 4px;
    width: 20px;
    height: 10px;
    font-size: 10px;
    font-weight: bold;
    text-align: center;
    line-height: 1;
    padding: 9px 4px;
    border-radius: 2px;
    transition: 0.3s ease all;
}

#button-toogler .knobs:before {
    content: "";
    left: 2px;
    top: 1.5px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: var(--bg-toogle-violet);
    transform: translateX(0);
    transition: all 0.3s cubic-bezier(0.2, 0.85, 0.32, 1.2);
}

#button-toogler .knobs:after {
    content: "F\00b0";
    right: 10px;
    color: var(--for-text);
    font-size: 14px;
}

#button-toogler .knobs span {
    display: inline-block;
    left: 4px;
    color: var(--secondary);
    z-index: 1;
    font-size: 18px;
}

#button-toogler .toogle__checkbox:checked+.knobs span {
    color: var(--for-text);
    font-size: 14px;
}

#button-toogler .toogle__checkbox:checked+.knobs:before {
    transform: translateX(calc(100% + 9px));
    background-color: var(--bg-toogle-orange);
}

#button-toogler .toogle__checkbox:checked+.knobs:after {
    color: var(--secondary);
    font-size: 18px;
}

#button-toogler .toogle__checkbox:checked~.layer {
    background-color: var(--bg-toogle-checked);
}

.weather__conditions-img__sized {
    width: 140px;
    height: 150px;
}

.temperature__details {
    color: var(--primary);
}

.weather__details-city__icon,
.weather__details-calendar {
    fill: var(--primary);
}

.weather__details-city__name,
.weather__details-description,
.weather__details-date__numeric,
.weather__details-date__weekday {
    color: var(--primary);
}

.pipeline {
    width: 24px;
    transform: rotate(90deg);
}
</style>