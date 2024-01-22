<template>
    <div class="wrapper">
        <main class="details__weather mt-16 flex flex-col">
            <div class="weather__conditions flex justify-between items-center">
                <div class="weather__conditions-img">
                    <img v-if="src !== '/img/state-weather/undefined.png'" class="weather__conditions-img__sized"
                        :src="`/img/state-weather/${weather.description}.png`" :alt="`${weather.description}`">
                    <!-- <img :src="`https://openweathermap.org/img/wn/${weather.icon}@2x.png`" alt=""> -->
                </div>

                <div class="toogle__temperature temp" id="button-toogler">
                    <input type="checkbox" class="toogle__checkbox" @click="toggleTemperature" />
                    <div class="knobs">
                        <span>C&deg;</span>
                    </div>
                    <div class="layer"></div>
                </div>


            </div>

            <div class="temperature__details mt-6">
                <p v-if="isMetric" class="temperature__details-cel text-9xl flex">{{ fahrenheitToCelsius }}
                    <span class="temperature__details-cel__icon text-4xl">&deg;C</span>
                </p>
                <p v-else class="temperature__details-fahr text-9xl flex"> {{ temperature }}
                    <span class="temperature__details-fahr__icon text-4xl">&deg;F</span>
                </p>
            </div>
        </main>

        <section class=""></section>

        <div>
            {{ details.name }}</div>
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
</style>