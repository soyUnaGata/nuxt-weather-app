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

        <div class="legend text-base text-center">
            <p class="pressure__num text-center">{{ getPressureMm(pressureToday) }} mm</p>
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

.legend {
    position: relative;
    width: 230px;
    top: 136px;
    padding: 0 20px;
}

.pressure__num {
    color: var(--primary);
}
</style> 
  

