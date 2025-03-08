<script lang="ts" setup>
import { use } from 'echarts/core';
import { CanvasRenderer, SVGRenderer } from 'echarts/renderers';
import { LineChart } from 'echarts/charts';
import type { EChartsOption } from 'echarts/types/dist/shared';
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent, // Add LegendComponent
} from 'echarts/components';
import VChart, { THEME_KEY } from 'vue-echarts';
import { useTrainingStore } from '~/stores/TrainingStore';

const trainingStore = useTrainingStore();

use([
  CanvasRenderer,
  LineChart,
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent, // Register LegendComponent
]);

const props = defineProps({
  nodeId: {
    type: String,
    required: true,
  },
});

provide(THEME_KEY, 'dark');

const dataExists: Ref<boolean> = ref(false);
const option: Ref<EChartsOption> = ref({
  xAxis: {
    type: 'category',
    data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  },
  yAxis: {
    type: 'value',
  },
  series: [
    {
      data: [
        820, 932, 901, 934, 1290, 1330, 1400, 1450, 1500, 1600, 1650, 1680,
        1700, 1900,
      ],
      type: 'line',
      smooth: true,
      name: 'Series 1', // Add name for legend
    },
  ],
  legend: {
    show: true, // Enable the legend
    top: 'top', // Position the legend
    textStyle: {
      color: '#fff', // Adjust legend text color
    },
  },
  backgroundColor: 'transparent',
});

// Helper function to convert numbers to Unicode superscript
function toSuperscript(num: number | string) {
  const superscripts = {
    '0': '⁰',
    '1': '¹',
    '2': '²',
    '3': '³',
    '4': '⁴',
    '5': '⁵',
    '6': '⁶',
    '7': '⁷',
    '8': '⁸',
    '9': '⁹',
    '-': '⁻',
  } as Record<string, string>;

  return [
    ' ',
    String(num)
      .split('')
      .map((char) => superscripts[char] || '')
      .join(''),
  ].join('');
}

watchEffect(() => {
  const data = trainingStore.getVisualizerData(props.nodeId);
  if (data.length && data.length > 0) {
    const data_y = data.map((d: any) => d[props.nodeId].y) as number[];
    const data_validation = data.map(
      (d: any) => d[props.nodeId]?.val_y ?? null
    ) as (number | null)[];
    const data_x = data.map((d: any) => d[props.nodeId].x) as number[];

    const series = [
      {
        name: 'Training',
        data: data_y,
        type: 'line',
        smooth: false,
      },
    ];

    // Add validation series only if it contains valid data
    if (data_validation.some((value) => value !== null)) {
      series.push({
        name: 'Validation',
        data: data_validation as number[],
        type: 'line',
        smooth: false,
      });
    }

    dataExists.value = true;
    option.value = {
      xAxis: {
        type: 'category',
        name: data[0][props.nodeId].x_label,
        data: data_x,
      },
      yAxis: {
        type: 'log',
        logBase: 10,
        axisLabel: {
          formatter: function (value) {
            const exponent = Math.log10(value); // Calculate the power of ten
            return `10${toSuperscript(exponent)}`; // Format as 10^x with superscripts
          },
        },
        name: data[0][props.nodeId].y_label,
      },
      series: series as any,
      legend: {
        show: true,
        top: 'top',
        textStyle: {
          color: '#fff',
        },
      },
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
    <v-chart
      class="h-full w-full d-inline-block"
      :option="option"
      autoresize
    ></v-chart>
  </div>
</template>
