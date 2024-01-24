
import type { Sunrise } from '#build/components';
<template>
    <div class="absolute">
        <div class="sun-times">
            <div style="position:relative">
                <div class="sun-path">
                    <div class="sun-animation" :style="{ width: animationWidth }"></div>
                </div>
                <span class="symbol" :style="{ position: 'absolute', left: `${x}px`, top: `${y}px` }">☀</span>
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

const x = ref(0);
const y = ref(0);

const animationWidth = ref('0%');
const symbolPosition = ref({ x: 0, y: 0 });

onMounted(() => {
    //updateSunPosition();
    //setInterval(updateSunPosition, 60000);

    let diff = 0;

    setInterval(() => {
        const now = 1706097930 + diff;
        const sunrize = 1706097930;
        const sunset = 1706132797;
        const p = (now - sunrize) / (sunset - sunrize);
        const d = 170;
        const h = (1 - p) * d;
        const a = Math.acos(1 - (2 * h / d));
        const xord = d * Math.sin(a);
        x.value = d - h - 11;
        y.value = d / 2 - xord / 2 - 12;

        diff += 60;
    }, 75);

});

function calculateSunPosition(initialLeft, initialTop, arcHeight, arcWidth, time) {
    const radius = arcHeight / 2;
    const initialAngle = Math.atan2(initialTop - radius, initialLeft) + Math.PI / 2; // Используем арктангенс для вычисления начального угла
    const currentAngle = initialAngle + (time * arcWidth) / arcHeight;

    const x = radius * Math.cos(currentAngle);
    const y = radius * Math.sin(currentAngle);

    return { x, y };
}

function updateSunPosition() {
    const currentTime = new Date();
    const totalMinutes = currentTime.getHours() * 60 + currentTime.getMinutes();
    const arcHeight = 60; // Измените на нужную высоту дуги
    const arcWidth = 230; // Измените на нужную ширину дуги
    const initialLeft = 27; // Измените на начальное значение left
    const initialTop = 52; // Измените на начальное значение top
    const sunPosition = calculateSunPosition(initialLeft, initialTop, arcHeight, arcWidth, totalMinutes);

    animationWidth.value = `${(totalMinutes / 1440) * 100}%`;
    symbolPosition.value = sunPosition;
}
// function updateSunPosition() {
//     const currentTime = new Date();
//     const totalMinutes = currentTime.getHours() * 60 + currentTime.getMinutes();
//     // animationWidth.value = `${(400 / 1440) * 100}%`;
//     const angle = (totalMinutes / 1440) * 360;

//     const radius = 85; // Adjust as needed
//     const radians = (angle * Math.PI) / 180;

//     const x = radius * Math.cos(radians);
//     const y = radius * Math.sin(radians);

//     animationWidth.value = `${(totalMinutes / 1440) * 100}%`;
//     symbolPosition.value = { x, y };
// }

// function updateSunPosition() {
//     const currentTime = new Date();
//     const totalMinutes = currentTime.getHours() * 60 + currentTime.getMinutes();
//     const angle = (totalMinutes / 1440) * 360; // Calculate angle based on total minutes in a day

//     const radius = 85; // Adjust as needed
//     const radians = (angle * Math.PI) / 180;

//     const x = radius * Math.cos(radians);
//     const y = radius * Math.sin(radians);

//     const sunAnimationWidth = `${(totalMinutes / 1440) * 100}%`;
//     const rotationAngle = `${angle}deg`;

//     animationWidth.value = sunAnimationWidth;
//     symbolPosition.value = { x, y, rotationAngle };
// }

// function updateSunPosition() {
//     const currentTime = new Date();
//     const totalMinutes = currentTime.getHours() * 60 + currentTime.getMinutes();
//     const angle = (totalMinutes / 1440) * 360; // Calculate angle based on total minutes in a day

//     const radius = 85; // Adjust as needed
//     const radians = (angle * Math.PI) / 180;

//     const x = radius * Math.cos(radians);
//     const y = radius * Math.sin(radians);

//     const sunAnimationWidth = `${(totalMinutes / 1440) * 100}%`;

//     animationWidth.value = sunAnimationWidth;
//     symbolPosition.value = { x, y };
// }

</script>
  
<style scoped>
.sun-times {
    margin-top: 40px;
    width: 230px;
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
    position: relative;
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
  

<!-- <template>
    <div class="sunrise-container">
        <div class="sun" :style="{ transform: `translateX(${sunPosition}px) rotate(-45deg)` }"></div>
    </div>
</template>
  
<script>
export default {
    data() {
        return {
            sunPosition: 0
        }
    },
    mounted() {
        setInterval(() => {
            const currentTime = new Date().getHours();
            const sunPosition = (10 / 24) * 100;
            this.sunPosition = sunPosition;
        }, 1000);
    }
}
</script>
  
<style scoped>
.sunrise-container {
    position: relative;
    width: 100%;
    height: 100%;
}

.sun {
    position: absolute;
    bottom: -50px;
    left: 50%;
    transform: translateX(-50%) rotate(-45deg);
    width: 100px;
    height: 100px;
    background-color: yellow;
    border-radius: 50%;
    box-shadow: 0 0 50px yellow;
    transition: transform 1s ease-in-out;
}
</style> -->

<!-- <template>
    <div class="sunrise-container">
        <div class="sun" :style="{ left: sunPosition + '%', width: sunSize + '%', height: sunSize + '%' }"></div>
        <div class="time-container">
            <div class="sunrise-time">{{ sunriseTime }}</div>
            <div class="sunset-time">{{ sunsetTime }}</div>
        </div>
    </div>
</template>
  
<script>
export default {
    data() {
        return {
            sunPosition: 0,
            sunSize: 5,
            sunriseTime: "6:00",
            sunsetTime: "20:00",
            currentTime: "12:43",
        };
    },
    mounted() {
        setInterval(() => {
            this.currentTime = new Date().toTimeString().split(" ")[0];
            const sunriseHour = parseInt(this.sunriseTime.split(":")[0]);
            const sunsetHour = parseInt(this.sunsetTime.split(":")[0]);
            const currentHour = parseInt(this.currentTime.split(":")[0]);

            if (currentHour >= sunriseHour && currentHour <= sunsetHour) {
                const sunPosition = ((currentHour - sunriseHour) / (sunsetHour - sunriseHour)) * 100;
                this.sunPosition = Math.max(0, Math.min(sunPosition, 100));
            } else {
                this.sunPosition = currentHour < sunriseHour ? 0 : 100;
            }
        }, 1000);
    },
};
</script>
  
<style scoped>
.sunrise-container {
    width: 100%;
    height: 100%;
}

.sun {
    position: absolute;
    bottom: -50px;
    transform: translateX(-50%) rotate(-45deg);
    background-color: yellow;
    border-radius: 50%;
    box-shadow: 0 0 50px yellow;
    transition: left 1s ease-in-out, width 1s ease-in-out, height 1s ease-in-out;
}

.time-container {
    position: absolute;
    bottom: 10px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    justify-content: space-between;
    width: 50%;
    font-size: 24px;
}
</style> -->

<!-- <template>
    <div class="sun-position">
        <div class="sun" :style="sunStyle"></div>
    </div>
</template>
  
<script>
import { ref, computed } from 'vue'
// import { useSunPosition } from '@vue/composable'

export default {
    setup() {
        function useSunPosition(date = new Date(), longitude = 0, latitude = 0) {
            const JDE = ref(2451545 + (date.getTime() / 86400000))
            const GMST = ref(0)
            const sunRightAscension = ref(0)
            const sunDeclination = ref(0)
            const sunHourAngle = ref(0)
            const sunAzimuth = ref(0)
            const sunAltitude = ref(0)
            const sunX = ref(0)
            const sunY = ref(0)

            const hourAngle = computed(() => {
                const hour = JDE.value - 2451545
                const UT = round(hour - GMST.value, 6)
                const LST = add(UT, GMST.value)
                const RA = sunRightAscension.value
                const dec = sunDeclination.value
                const HA = subtract(LST, RA)
                return HA
            })

            const azimuth = computed(() => {
                const HA = sunHourAngle.value
                const dec = sunDeclination.value
                const sinDec = sin(dec)
                const sinHA = sin(HA)
                const cosDec = cos(dec)
                const cosHA = cos(HA)
                const sinLat = sin(latitude)
                const cosLat = cos(latitude)
                const sinAz = divide(sinHA, cosDec)
                const cosAz = divide(cosHA, cosDec)
                const sinAzimuth = divide(sinAz, sqrt(add(pow(sinAz, 2), multiply(cosLat, pow(cosAz, 2)))))
                const cosAzimuth = divide(cosLat, sqrt(add(pow(sinAz, 2), multiply(cosLat, pow(cosAz, 2)))))
                return atan2(sinAzimuth, cosAzimuth)
            })

            const altitude = computed(() => {
                const HA = sunHourAngle.value
                const dec = sunDeclination.value
                const sinDec = sin(dec)
                const sinHA = sin(HA)
                const cosDec = cos(dec)
                const cosHA = cos(HA)
                const sinLat = sin(latitude)
                const cosLat = cos(latitude)
                const sinAlt = add(multiply(sinDec, sinLat), multiply(cosDec, cosLat, cosHA))
                return asin(sinAlt)
            })

            const x = computed(() => {
                const sinAlt = sin(altitude.value)
                const cosAlt = cos(altitude.value)
                const cosAz = cos(azimuth.value)
                const sinAz = sin(azimuth.value)
                const radius = 1
                return {
                    x: round(radius * cosAlt * cosAz),
                    y: round(radius * cosAlt * sinAz),
                    z: round(radius * sinAlt)
                }
            })

            const position = computed(() => {
                const xyz = x.value
                const longitudeRad = deg2rad(longitude)
                const cosLong = cos(longitudeRad)
                const sinLong = sin(longitudeRad)
                const cosLat = cos(deg2rad(latitude))
                const sinLat = sin(deg2rad(latitude))
                const xp = xyz.x * cosLong - xyz.y * sinLong
                const yp = xyz.x * sinLong + xyz.y * cosLong
                const sunX = round(xp * cosLat - xyz.z * sinLat)
                const sunY = round(yp)
                return { sunX, sunY }
            })

            const sunSize = ref(20)
            const sunColor = ref('#FFD700')

            const sunStyle = computed(() => {
                const sunPosition = useSunPosition(new Date(), 500, 200)
                return {
                    left: `${sunPosition.x}px`,
                    top: `${sunPosition.y}px`,
                    width: `${sunSize.value}px`,
                    height: `${sunSize.value}px`,
                    backgroundColor: sunColor.value,
                    borderRadius: '50%'
                }
            })

            return { sunStyle, sunSize, sunColor }
        }
    }
}
</script>
  
<style scoped>
.sun-position {
    position: relative;
    width: 100%;
    height: 100%;
}

.sun {
    position: absolute;
    transform: translate(-50%, -50%);
}
</style> -->