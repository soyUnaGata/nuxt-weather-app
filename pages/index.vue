<template>
    <div class="wrapper">
        <div>
            <div class="search__area flex">
                <input type="text" v-model="city" @input="getSearchResults" @keyup.enter="getCity"
                    placeholder="Search for a city or state"
                    class="py-4 px-1 border-b focus:border-weather-secondary focus:outline-none focus:shadow-[0px_1px_0_0_#004E71]" />
                <NuxtLink :to="{ path: '/weather', query: { city: city } }">
                    <svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512">
                        <path
                            d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
                    </svg>
                </NuxtLink>
            </div>
            <ul class="absolute bg-weather-secondary text-white w-full shadow-md py-2 px-1 top-[66px]"
                v-if="geoSearchResults">
                <p class="py-2" v-if="searchError">
                    Sorry, something went wrong, please try again.
                </p>
                <p class="py-2" v-if="!searchError && geoSearchResults.length === 0">
                    No results match your query, try a different term.
                </p>
                <template v-else>
                    <li v-for="searchResult in geoSearchResults" :key="searchResult.id" class="py-2 cursor-pointer"
                        @click="previewCity(searchResult)">
                        {{ searchResult.city }} , {{ searchResult.country }} <span v-if="searchResult.state">, {{
                            searchResult.state }}</span>
                    </li>
                </template>
            </ul>
        </div>

        <div class="func">

        </div>
    </div>
</template>

<script setup>
import axios from 'axios';
import { API_KEY } from '../composables/index';
import CityService from '@/server/city-service';


const city = ref('');
const router = useRouter();

const getCity = () => {
    router.push({ path: '/weather', query: { city: city.value } })
}

const previewCity = (searchResult) => {
    const [city, country] = searchResult.city.split(",");
    router.push({
        name: "weather",
        params: { name: city.replace("peninsula", "").trim(), country: country },
        query: {
            city: searchResult.city.replace("peninsula", "").trim(),
            country: searchResult.country,
            preview: true,
        },
    });
};

const queryTimeout = ref(null);
const geoSearchResults = ref(null);
const searchError = ref(null);

const getSearchResults = () => {
    clearTimeout(queryTimeout.value);
    queryTimeout.value = setTimeout(async () => {
        if (city.value !== "") {
            try {
                geoSearchResults.value = await CityService.getCityInfo(city.value);
            } catch {
                searchError.value = true;
            }
            return;
        }
        geoSearchResults.value = null;
    }, 300);
};

onMounted(async () => {
    getSearchResults();
})
</script>

