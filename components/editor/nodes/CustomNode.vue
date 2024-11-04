<script setup lang="ts">
import { Handle, Position, useHandleConnections, useNodesData } from '@vue-flow/core'

const connections = useHandleConnections({
  type: 'target',
})

const props = defineProps(['data'])

const node = useNodesData(props.data.id)

watch(() => node.data, (data) => {
  console.log("edited!")
  node.data = data
})

const reference: Ref<null | number> = ref(null)



</script>

<template>
  <UContainer class="text-zinc-100 rounded-xl border-4 bg-zinc-600">
    {{ node }}
    <UButton @click="node.data = { clicked: false }">
      Click ME!
    </UButton>
    <Handle
        type="source"
        :position="Position.Left"
        :style="{ height: '16px', width: '6px', filter: 'invert(100%)' }"
    />
    <Handle
        type="target"
        :position="Position.Right"
        :style="{ height: '16px', width: '6px', filter: 'invert(100%)' }"
    />
  </UContainer>
</template>

<style scoped>

</style>