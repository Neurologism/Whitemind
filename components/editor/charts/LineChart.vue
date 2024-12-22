<script lang="ts" setup>
import { use } from 'echarts/core';
import { SVGRenderer } from 'echarts/renderers';
import { LineChart } from 'echarts/charts';
import type { EChartsOption } from 'echarts/types/dist/shared';
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
} from 'echarts/components';
import VChart, { THEME_KEY } from 'vue-echarts';
import { useTrainingStore } from '~/stores/TrainingStore';

const trainingStore = useTrainingStore();

use([SVGRenderer, LineChart, TitleComponent, TooltipComponent, GridComponent]);

const { nodeid } = defineProps({
  nodeid: {
    type: String,
    required: true,
  },
});

provide(THEME_KEY, 'dark');

const dataExists: Ref<boolean> = ref(false);
const option: Ref<EChartsOption> = ref({
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  },
  yAxis: {
    type: 'value',
  },
  series: [
    {
      data: [820, 932, 901, 934, 1290, 1330, 1320],
      type: 'line',
      smooth: false,
    },
  ],
  backgroundColor: 'transparent',
});

watchEffect(() => {
  const data = trainingStore.getVisualizerData(nodeid);
  if (data.length && data.length > 0) {
    dataExists.value = true;
    option.value = {
      xAxis: {
        type: 'category',
        // @ts-ignore - x_label is not defined in the type
        name: data[0][nodeid].x_label,
        data: data.map((d: any) => d[nodeid].x) as number[],
      },
      yAxis: {
        type: 'value',
        // @ts-ignore - y_label is not defined in the type
        name: data[0][nodeid].y_label,
      },
      series: [
        {
          data: data.map((d: any) => d[nodeid].y) as number[],
          type: 'line',
          smooth: false,
        },
      ],
      backgroundColor: 'transparent',
    };
  }
});
</script>

<template>
  <div
    v-if="!dataExists"
    class="absolute h-full w-full z-10 text-center pointer-events-none font-semibold"
  >
    Awaiting data...
  </div>
  <div
    :class="`h-full w-full ${dataExists ? '' : 'bg-transparent blur-sm text-center'}`"
  >
    <v-chart class="h-full" :option="option" autoresize></v-chart>
  </div>
</template>
