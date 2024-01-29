<template>
    <div class="weather__vidget-wrapper  bg-gray-200/50 rounded-2xl pl-2.5 shadow-xl">
        <h5 class="wind__headline text-center pt-3 font-normal">Humidity</h5>
        <div class="humidity">
            <div style="position:relative; padding-top: 10px; padding-left: 25px;">
                <div class="humidity-path">
                    <img src="/img/state-weather/wind.png" alt="">
                </div>
            </div>
        </div>

        <div class="legend">
            <p class="humidity__from">0</p>
            <p class="humidity__from">0</p>
        </div>
    </div>
</template>
  
<script setup>
import { onMounted, defineProps } from 'vue';

const props = defineProps({
    details: {
        type: Object,
    }
});

const humidityPosition = computed(() => {
    const halfHumidityWidth = 6;
    const halfHumidityHeight = 15;
    const paddingTopOffset = 10;
    const paddingLeftOffset = 25;
    const d = 170;

    const result = {
        x: - halfHumidityWidth + paddingLeftOffset,
        y: d / 2 - halfHumidityHeight - paddingTopOffset,
    }

    const humidity = props.details.main?.humidity ?? 0;
    const minHumidity = 0;
    const maxHumidity = 100;

    if (humidity >= maxHumidity) {
        result.x = d - result.x + halfHumidityWidth * 2;
        return result;
    }

    if (humidity <= minHumidity) return result;

    const p = (humidity - minHumidity) / (maxHumidity - minHumidity);
    const h = (1 - p) * d;
    const a = Math.acos(1 - (2 * h / d));
    const xord = d * Math.sin(a);

    result.x = d - h - halfHumidityWidth + paddingLeftOffset;
    result.y = d / 2 - xord / 2 - halfHumidityHeight + paddingTopOffset;

    return result;
});

onMounted(() => {
    if (props.details) {
        humidity.value = props.details.main?.humidity;
    }
});


</script> 
  
<style scoped>
.weather__vidget-wrapper {
    height: 210px;
    width: 245px;
}

.humidity {
    margin-top: 40px;
    width: 230px;
    height: 85px;
    overflow: hidden;
    position: absolute;
}

.humidity-path {
    width: 170px;
    height: 170px;
    border-radius: 50%;
    position: relative;
}

.sun-animation {
    height: 150px;
    background-color: rgba(255, 255, 0, 0.4);
    transition: width 2s linear;
}


.symbol {
    position: absolute;
    font-size: 24px;
    top: 52px;
    z-index: 2222;
    left: 27px;
    color: white;
}

.legend {
    position: relative;
    display: flex;
    justify-content: space-between;
    width: 230px;
    top: 136px;
    padding: 0 20px;
}

.humidity__from,
.humidity__to {
    font-size: 12px;
}

.wind__headline {
    color: var(--primary);
}
</style> 
  

