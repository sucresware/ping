<template>
    <div>
        <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
            <uptime-card v-for="monitor in monitors" :key="monitor.id" :monitor="monitor"></uptime-card>
        </div>
    </div>
</template>

<script>
    export default {
        data()  {
            let custom_uptime_ratios = "7";

            let custom_uptime_ranges = [];

            for (let i = 1; i <= (custom_uptime_ratios * 2); i++) {
                let h = i * 12;
                custom_uptime_ranges.push(moment().subtract(h - 12, "hours").unix() + '_' + moment().subtract(h, "hours").unix());
            }

            return {
                custom_uptime_ranges,
                custom_uptime_ratios,
                apiKeys: [
                    'm782599854-61c7a7827d02435fc3e95c53', // 4sucres
                    'm783365392-2ee693da6adc136239c78e2e', // AveNoel
                    'm783700279-f3f3548593949595748ec321', // Onche
                    'm783344445-2d46813eb1c528f73623ffd8', // 2Sucres
                    'm783382164-8506d4852ddd4bf6b4ebe674', // VocaBank
                    'm783437103-270fa1f6d5f707fe29078076', // RisiBank
                    'm783437095-569f707ce1f590a31dfe78fd', // Risidex
                    'm783953698-60d1ae9028ad2f14c6952885', // AveShack
                    'm783953671-73817b9aeedf87570a6762e9', // 4shack
                    'm783953673-a32f8069bf350316abef1567', // Risishack
                ],
                monitors: [],
                response_times_start_date: moment().subtract(7, "days").unix(),
                response_times_end_date: moment().unix(),
            }
        },
        mounted(){
            this.refresh();
            setInterval(() => this.refresh(), 5000);
        },
        methods: {
            refresh() {
                this.apiKeys.forEach(apiKey => {
                    axios.post('https://api.uptimerobot.com/v2/getMonitors', {
                        api_key: apiKey,
                        custom_uptime_ratios: this.custom_uptime_ratios,
                        custom_uptime_ranges:  this.custom_uptime_ranges.join('-'),
                        response_times: '1',
                        response_times_start_date: this.response_times_start_date,
                        response_times_end_date: this.response_times_end_date,
                        format: 'json',
                    }).then((response) => {
                        let index = this.monitors.findIndex((monitor => monitor.id == response.data.monitors[0].id));
                        if (index == -1) this.monitors.push(response.data.monitors[0]);
                        else this.monitors[index] = response.data.monitors[0];
                    });
                });
            }
        }
    }
</script>