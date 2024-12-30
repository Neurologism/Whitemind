<script lang="ts" setup>
import { CustomNodes } from '~/components/editor/customNodeList';
import DragNode from '~/components/editor/SideBar/DragNode.vue';
import ExpandableButton from '~/components/editor/SideBar/ExpandableButton.vue';

const selectedCategory = ref(0);
const isPermaOpen = ref(false);

function toggleSidebar() {
  isPermaOpen.value = !isPermaOpen.value;
}
</script>

<template>
  <div
    :style="{
      width: isPermaOpen ? '28rem' : '',
    }"
    class="parent-div border-r-2 h-100 border-slate-600 bg-opacity-90 dark:bg-opacity-90 bg-slate-200 dark:bg-slate-800 p-4 pb-8 w-20 focus-within:w-[28rem] origin-left transition-transform flex flex-row flex-nowrap select-none"
    :class="{
      'hover:w-[28rem]': !isPermaOpen,
      'hover:scale-x-105': !isPermaOpen,
    }"
  >
    <div class="h-full flex-none pt-4">
      <div class="h-full flex flex-col">
        <div class="flex-none mb-4">
          <UButton
            class="hover:scale-105 transition-transform"
            color="gray"
            icon="mdi-magnify"
            size="xl"
            square
          ></UButton>
        </div>
        <div
          v-for="(category, index) in CustomNodes.nodesList"
          :key="index"
          class="flex-none items-center mb-3"
        >
          <ExpandableButton
            :title="category.name"
            :icon="category.icon"
            :color="category.color"
            :children="
              category.groups.map((val) => {
                return { ...val, icon: val.icon ?? category.icon };
              })
            "
            :is-selected="false"
            :on-main-click="
              () => {
                selectedCategory = index;
              }
            "
            :on-sub-click="(_title) => {}"
          />
        </div>
        <div class="flex-grow"></div>
        <div class="flex-none flex-col-reverse pt-4">
          <UButton
            :icon="isPermaOpen ? 'mdi-pin' : 'mdi-pin-outline'"
            class="hover:scale-105 transition-transform"
            color="gray"
            size="xl"
            square
            @click="toggleSidebar"
          ></UButton>
        </div>
      </div>
    </div>
    <div
      class="overflow-y-hidden hover:overflow-y-auto overflow-x-hidden pt-4 ml-2`"
      :class="{
        'child-div': !isPermaOpen,
      }"
    >
      <div class="m-2">
        <span
          class="text-2xl text-slate-800 dark:text-slate-200 brightness-200 font-semibold"
          ><UIcon
            class="ml-2 mr-2"
            :name="CustomNodes.nodesList[selectedCategory].icon"
          />
          {{ CustomNodes.nodesList[selectedCategory].name }}
        </span>
        <div class="flex flex-col">
          <DragNode
            v-for="node in CustomNodes.nodesList[
              selectedCategory
            ].groups.flatMap((group) => group.nodes)"
            :node-definition="node"
            :node-group-definition="CustomNodes.nodesList[selectedCategory]"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.parent-div .child-div {
  display: none;
}

.parent-div:hover .child-div,
.parent-div:focus-within .child-div,
.parent-div.is-perma-open .child-div {
  display: block;
}
</style>
