<template>
    <div class="weather__vidget-wrapper  bg-gray-200/50 rounded-2xl pl-2.5 shadow-xl">
        <h5 class="wind__headline text-center pt-3 font-normal">Wind</h5>
        <div class="wind__about flex justify-center">
            <div style="position:relative; padding-top: 40px;">
                <div class="wind-path">
                    <img src="../assets/img/wind.png" class="size-20" alt="wind">
                </div>
            </div>
        </div>

        <div class="legend text-base ">
            <p class="wind__speed">{{ winds.speed }} m/s</p>
            <p class="wind__deg">{{ winds.deg }} deg</p>
        </div>
    </div>
</template>
  
<script setup>
import { onMounted, defineProps } from 'vue';

const props = defineProps({
    winds: {
        type: Object,
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
    display: flex;
    justify-content: space-between;
    width: 230px;
    top: 136px;
    padding: 0 20px;
}

.wind__headline,
.wind__speed,
.wind__deg {
    color: var(--primary);
}
</style> 
  

