<template>
    <div class="forecast-container bg-gray-200/50 rounded-2xl pl-2.5 shadow-xl">
        <div class="day-temperature"></div>
        <div class="day-weather"></div>
        <div class="day-date">
            <h3 class="day-date__number"></h3>
            <p class="day-date__day"></p>
            <p class="day-date__hours"></p>
        </div>
    </div>
</template>

<script setup>

</script>

<style scoped>
.forecast-container {
    height: 210px;
    width: 150px;
}
</style>