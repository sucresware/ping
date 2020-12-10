<template>
    <div class="w-full bg-white rounded-lg shadow-lg dark:bg-gray-800">
        <div class="p-4">
            <div class="flex justify-between mb-2">
                <div>
                    <div class="font-bold">
                        <span
                            :class="{
                                'text-red-500': (monitor.status == 8 || monitor.status == 9),
                                'text-yellow-500': (monitor.status == 2 && monitor.custom_uptime_ratio < 100),
                                'text-green-500': (monitor.status == 2 && monitor.custom_uptime_ratio == 100),
                            }"
                        >
                            &bullet;
                        </span>
                        {{ monitor.friendly_name || '&nbsp;' }}
                    </div>
                    <div class="text-sm text-gray-400">
                        <a :href="monitor.url || '&nbsp;'" class="hover:underline" target="_blank">
                            {{ monitor.url || '&nbsp;' }}
                        </a>
                    </div>
                </div>
                <div class="text-right">
                    <div class="text-sm text-gray-400 uppercase">Uptime</div>
                    <div class="text-xl font-bold" v-if="monitor.custom_uptime_ratio">{{ Math.round(monitor.custom_uptime_ratio * 100) / 100 }}<sup class="text-sm">%</sup></div>
                    <div class="text-xl font-bold" v-else>&nbsp;</div>
                </div>
            </div>
        </div>
        <div class="relative overflow-hidden rounded-b-lg" style="height: 40px;">
            <div class="absolute" style="right: -5px;">
                <svg class="sparkline" width="640" height="40" stroke-width="0" ref="sparkline"></svg>
            </div>
        </div>
        <div class="p-4 bg-gray-100 rounded-b-lg dark:bg-gray-900">
            <div class="flex space-x-1">
                <div
                    class="flex-grow h-6"
                    :class="{
                        'bg-red-500': ping == '0.000',
                        'bg-orange-500': (ping != '100.000' && ping != '0.000'),
                        'bg-green-500': ping == '100.000',
                    }"
                    v-for="(ping, i) in pings"
                    v-bind:key="i"
                ></div>
            </div>
        </div>
    </div>
</template>

<script>
    import sparkline from '@fnando/sparkline';

    export default {
        props: ['monitor'],

        data() {
            return {
                pings: [],
            }
        },

        mounted() {
            this.drawSparkline()

            this.pings = this.monitor.custom_uptime_ranges.split('-')
        },

        methods: {
            drawSparkline() {
                let values = this.monitor.response_times.map(ping => ping.value)
                sparkline(this.$refs.sparkline, values)
            }
        }
    }
</script>