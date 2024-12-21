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

use([SVGRenderer, LineChart, TitleComponent, TooltipComponent, GridComponent]);

provide(THEME_KEY, 'dark');

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
</script>

<template>
  <v-chart class="h-full" :option="option" autoresize></v-chart>
</template>
