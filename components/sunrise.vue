<template>
    <div class="weather__vidget-wrapper  bg-gray-200/50 rounded-2xl pl-2.5 shadow-xl">
        <h5 class="sun__headline text-center pt-3 font-normal">Sunrise and sunset</h5>
        <div class="sun-times">
            <div style="position:relative; padding-top: 10px; padding-left: 25px;">
                <div class="sun-path">
                    <div class="sun-animation" :style="{ width: `${sunPosition?.progress}%` }"></div>
                </div>
                <span class="symbol" :style="{ left: `${sunPosition?.x}px`, top: `${sunPosition?.y}px` }">☀</span>
            </div>
        </div>

        <div class="legend">
            <div class="sunrise">{{ getTime(details.sys?.sunrise, details.timezone) }}</div>
            <div class="sunset">{{ getTime(details.sys?.sunset, details.timezone) }}</div>
        </div>
    </div>
</template>
  
<script setup>
import { onMounted, defineProps } from 'vue';
import { getTime } from "../utils/dayjsUtil.js";

const props = defineProps({
    details: {
        type: Object,
    }
});

const sunPosition = computed(() => {
    const halfSunWidth = 11;
    const halfSunHeight = 12;
    const paddingTopOffset = 10;
    const paddingLeftOffset = 25;
    const d = 170;

    const result = {
        x: - halfSunWidth + paddingLeftOffset,
        y: d / 2 - halfSunHeight - paddingTopOffset,
        progress: 0
    }

    const now = props.details.dt ?? 0;
    const sunrise = props.details.sys?.sunrise ?? 0;
    const sunset = props.details.sys?.sunset ?? 0;

    if (now >= sunset) {
        result.x = d - result.x + halfSunWidth * 2;
        result.progress = 100;
        return result;
    }

    if (now <= sunrise) return result;

    const p = (now - sunrise) / (sunset - sunrise);
    const h = (1 - p) * d;
    const a = Math.acos(1 - (2 * h / d));
    const xord = d * Math.sin(a);

    result.x = d - h - halfSunWidth + paddingLeftOffset;
    result.y = d / 2 - xord / 2 - halfSunHeight + paddingTopOffset;
    result.progress = p * 100;

    return result;
});

function getTime2(seconds) {
    return new Date(seconds * 1000).toLocaleTimeString('uk-UA', { timeZone: 'Atlantic/Reykjavik' })
}

const timezone = computed(() => props.details?.timezone)

const sunTime = computed(() => {
    return getTime2(props.details.sys?.sunset + timezone.value)
})

onMounted(() => {
    if (props.details) {
        now.value = props.details.dt;
        sunrise.value = props.details.sys?.sunrise;
        sunset.value = props.details.sys?.sunset;
    }

});

</script>
  
<style scoped>
.weather__vidget-wrapper {
    height: 210px;
    width: 245px;
}

.sun__headline {
    color: var(--primary);
}

.sun-times {
    margin-top: 40px;
    width: 230px;
    height: 85px;
    border-bottom: 1px solid #999;
    overflow: hidden;
    position: absolute;
}

.sun-path {
    width: 170px;
    height: 170px;
    overflow: hidden;
    border: 1px dashed #999;
    border-radius: 50%;
    position: relative;
}

.sun-animation {
    height: 150px;
    background-color: rgba(255, 255, 0, 0.4);
    transition: width 2s linear;
}

.sun-symbol-path {
    position: absolute;
    color: yellow;
    text-shadow: 0 0 5px black;
    height: 85px;
    /* Adjust as needed */
    width: 170px;
    /* Adjust as needed */
    left: 0;
    bottom: 0;
    transition: transform 2s linear;
    transform-origin: 50% 100%;
}

.symbol {
    position: absolute;
    font-size: 16px;
    top: 52px;
    z-index: 2222;
    left: 27px;
}

.legend {
    position: relative;
    display: flex;
    justify-content: space-between;
    width: 230px;
    top: 136px;
    padding: 0 20px;
}

.sunrise,
.sunset {
    font-size: 12px;
}
</style> 
  

