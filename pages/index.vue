<template>
    <div class="wrapper flex h-screen justify-center">
        <div class="flex justify-center flex-col w-full px-12">
            <div class="search__area flex items-center justify-center gap-4">
                <div class="input__search relative w-full">
                    <input type="text" v-model="city" @input="getCityResults" placeholder="Search for a city or state"
                        class="placeholder-text-white py-4 px-1 bg-transparent border-b w-full focus:bg-transparent placeholder:text-white focus:outline-none" />

                    <ul class="input__search-ul w-full px-2.5 absolute justify-center text-white shadow-md py-2 top-[66px]"
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
                                {{ searchResult.city }} , {{ searchResult.country }}
                                <span v-if="searchResult.state">, {{ searchResult.state }}</span>
                            </li>
                        </template>
                    </ul>
                </div>

                <NuxtLink :to="{ path: '/weather', query: { city: city } }"
                    v-if="isSearchResultsEmpty && geoSearchResults.length !== 0">
                    <button class="search__icon bg-white p-2.5 rounded-3xl">
                        <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" viewBox="0 0 512 512">
                            <path
                                d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
                        </svg>
                    </button>
                </NuxtLink>
            </div>
        </div>

        <redirect-alert ref="locationAlert"></redirect-alert>
    </div>
</template>

<script setup>
import debounce from "lodash.debounce";
import CityService from "@/server/city-service";
import RedirectAlert from "~/components/redirectAlert.vue";

const router = useRouter();
const city = ref("");
const geoSearchResults = ref(null);
const searchError = ref(null);
let isAskBefore = ref(false);
const locationAlert = ref(null);

const previewCity = (searchResult) => {
    const [city, country] = searchResult.city.split(",");
    router.push({
        name: "weather",
        query: {
            city: searchResult.city.replace("peninsula", "").trim(),
            country: searchResult.country,
            preview: true,
        },
    });
};

const getCityResults = debounce(async function (e) {
    if (!city.value) return;
    try {
        geoSearchResults.value = await CityService.getCityInfo(city.value);
    } catch {
        searchError.value = true;
    }
}, 500);

const getPosition = async () => {
    if (!navigator.geolocation || !isAskBefore) return;

    const isRedirect = await locationAlert.value.show();
    if (isRedirect) {
        navigator.geolocation.getCurrentPosition(async (position) => {
            const { latitude, longitude } = position.coords;
            const result = await CityService.getCityInfoByCoord(latitude, longitude);
            navigateTo({ path: '/weather', query: { city: result.city } });
        });
    }
};

const isSearchResultsEmpty = computed(() => {
    console.log(geoSearchResults.value)
    return !searchError.value && geoSearchResults.value;
})

onMounted(async () => {
    await getCityResults();
    getPosition();
});
</script>

<style scoped>
.wrapper {
    max-width: 1440px;
    margin: 0 auto;
}

input[type="text"].placeholder-text-white::placeholder {
    color: white;
    font-size: 15px;
    font-weight: 200;
}

input[type="text"].placeholder-text-white {
    outline: none;
    color: white;
    font-size: 16px;
}

input[type="text"].placeholder-text-white:-webkit-autofil {
    color: white;
    -webkit-text-fill-color: white;
}

.input__search-ul {
    background: rgba(255, 255, 255, 0.13);
    border-radius: 16px;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(6.1px);
}
</style>
