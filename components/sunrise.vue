
<template>
    <div class="absolute">
        <div class="sun-times">
            <div style="position:relative; padding-top: 10px; padding-left: 25px;">
                <div class="sun-path">
                    <div class="sun-animation" :style="{ width: `${sunPosition.p}%` }"></div>
                </div>
                <span class="symbol" ref="" :style="{ left: `${sunPosition.x}px`, top: `${sunPosition.y}px` }">☀</span>
            </div>
        </div>

        <div class="legend">
            <div class="sunrise">05:30 AM</div>
            <div class="sunset">8:04 PM</div>
        </div>
    </div>
</template>
  
<script setup>
import { ref, onMounted } from 'vue';

const sunPosition = reactive({
    x: 0,
    y: 0,
    p: 0
});

onMounted(() => {
    moveSun();
    setInterval(moveSun, 60000);
});

function moveSun() {
    const halfSunWidth = 11;
    const halfSunHeight = 12;
    const paddingTopOffset = 10;
    const paddingLeftOffset = 25;

    const now = 1706179960;
    const sunrize = 1706161386;
    const sunset = 1706193405;

    if (now >= sunset) return;
    if (now <= sunrize) return now = sunrize;

    sunPosition.p = (now - sunrize) / (sunset - sunrize);
    sunPosition.p = sunPosition.p * 100;

    const p = (now - sunrize) / (sunset - sunrize);
    const d = 170;
    const h = (1 - p) * d;
    const a = Math.acos(1 - (2 * h / d));
    const xord = d * Math.sin(a);

    sunPosition.x = d - h - halfSunWidth + paddingLeftOffset;
    sunPosition.y = d / 2 - xord / 2 - halfSunHeight + paddingTopOffset;
    console.log(p, h, a, xord, sunPosition)
}


</script>
  
<style scoped>
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
    /* Adjust as needed */
    height: 170px;
    /* Adjust as needed */
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
    top: 150px;
}

.sunrise,
.sunset {
    font-size: 12px;
    width: 80px;
}
</style> 
  

