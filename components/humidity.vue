<template>
    <div class="weather__vidget-wrapper  bg-gray-200/50 rounded-2xl pl-2.5 shadow-xl">
        <div class="humidity">
            <div style="position:relative; padding-top: 10px; padding-left: 25px;">
                <div class="humidity-path">
                    <img src="/img/state-weather/quality.png" alt="">
                </div>
                <span class="symbol" :style="{ left: `${sunPosition?.x}px`, top: `${sunPosition?.y}px` }">&#8226</span>
            </div>
        </div>

        <div class="legend">
            <div class="humidity__from">0</div>
            <div class="humidity__to">100</div>
        </div>
    </div>
</template>
  
<script setup>
import { ref, onMounted, defineProps, watch } from 'vue';
// import { getTime } from "../utils/dayjsUtil.js";

// const props = defineProps({
//     // details: {
//     //     type: Object,
//     // }
// });


let humidity = ref(0);
// let sunrise = ref(0);
// let sunset = ref(0);


// watch(props.details, () => {
//     if (props.details) {
//         now.value = props.details.dt;
//         sunrise.value = props.details.sys?.sunrise;
//         sunset.value = props.details.sys?.sunset;
//     }
// });


const sunPosition = computed(() => {
    const halfSunWidth = 6;
    const halfSunHeight = 15;
    const paddingTopOffset = 10;
    const paddingLeftOffset = 25;
    const d = 170;

    const result = {
        x: - halfSunWidth + paddingLeftOffset,
        y: d / 2 - halfSunHeight - paddingTopOffset,
    }

    const now = 2;
    const sunrise = 0;
    const sunset = 100;

    if (now >= sunset) {
        result.x = d - result.x + halfSunWidth * 2;
        return result;
    }

    if (now <= sunrise) return result;

    const p = (now - sunrise) / (sunset - sunrise);
    const h = (1 - p) * d;
    const a = Math.acos(1 - (2 * h / d));
    const xord = d * Math.sin(a);

    result.x = d - h - halfSunWidth + paddingLeftOffset;
    result.y = d / 2 - xord / 2 - halfSunHeight + paddingTopOffset;

    return result;
});

// function getTime2(seconds) {
//     return new Date(seconds * 1000).toLocaleTimeString('uk-UA', { timeZone: 'Atlantic/Reykjavik' })
// }

// const timezone = computed(() => props.details?.timezone)

// const sunTime = computed(() => {
//     return getTime2(props.details.sys?.sunset + timezone.value)
// })

onMounted(() => {


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
    top: 150px;
    padding: 0 20px;
}

.humitidy__from,
.humidity__to {
    font-size: 12px;
}
</style> 
  

