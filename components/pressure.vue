<template>
    <div class="weather__vidget-wrapper  bg-gray-200/50 rounded-2xl pl-2.5 shadow-xl">
        <h5 class="wind__headline text-center pt-3 font-normal">Pressure</h5>
        <div class="wind__about flex justify-center">
            <div style="position:relative; padding-top: 40px;">
                <div class="wind-path">
                    <img src="../assets/img/pressure.png" class="size-20" alt="pressure">
                </div>
            </div>
        </div>

        <div class="legend text-base ">
            <p class="wind__speed">{{ getPressureMm(pressureToday) }} mm</p>
            <p class="wind__deg">{{ }} deg</p>
        </div>
    </div>
</template>
  
<script setup>
import { defineProps } from 'vue';
import { getPressureMm } from '../utils/index.js';

const props = defineProps({
    pressureToday: {
        type: Number,
    }
});
</script> 
  
<style scoped>
.weather__vidget-wrapper {
    height: 210px;
    width: 245px;
}

.wind__about {
    width: 230px;
    height: 85px;
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

.wind__headline,
.wind__speed,
.wind__deg {
    color: var(--primary);
}
</style> 
  

