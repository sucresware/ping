<template>
    <div class="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-3">
        <div class="rounded shadow-md">
            <div class="h-1 bg-gray-500" :class="{
                'bg-red-500': (monitor.status == 8 || monitor.status == 9),
                'bg-green-500': (monitor.status == 2),
            }">
            <div v-if="monitor.status == 2" class="w-full h-1" :class="{ 'bg-orange-500': (Math.round(monitor.custom_uptime_ratio) != 100), }"></div>
            </div>
            <div class="p-4 bg-white">
                <div class="font-bold">{{ monitor.friendly_name || '&nbsp;' }}</div>
                <div class="text-gray-500 text-sm">{{ monitor.url || '&nbsp;' }}</div>
                <div class="my-2 flex">
                    <div class="w-1/3">
                        <div class="uppercase text-sm">Uptime</div>
                        <div class="font-bold text-xl" v-if="monitor.custom_uptime_ratio">{{ Math.round(monitor.custom_uptime_ratio * 100) / 100 }}<sub class="text-sm">%</sub></div>
                        <div class="font-bold text-xl" v-else>&nbsp;</div>
                    </div>
                    <div class="w-2/3 text-right">
                        <div class="uppercase text-sm">Av Response</div>
                        <div class="font-bold text-xl" v-if="monitor.average_response_time">{{ Math.round(monitor.average_response_time * 100) / 100 }}<sub class="text-sm">ms</sub></div>
                        <div class="font-bold text-xl" v-else>&nbsp;</div>
                    </div>
                </div>
            </div>
            <div class="bg-gray-100"></div>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['monitor'],
    }
</script>