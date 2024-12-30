<script lang="ts" setup>
import { CustomNodes } from '~/components/editor/customNodeList';
import DragNode from '~/components/editor/SideBar/DragNode.vue';
import ExpandableButton from '~/components/editor/SideBar/ExpandableButton.vue';

const isPermaOpen = ref(false);
const searchQuery = ref('');
const scrollRef = ref<HTMLElement | null>(null);

function toggleSidebar() {
  isPermaOpen.value = !isPermaOpen.value;
  if (!isPermaOpen.value) {
    searchQuery.value = ' ';
    searchQuery.value = '';
  }
}

const scrollTopOffset: number = 80; // 80 is the ~ height of the search bar + padding + margin
function scrollToElement(elementId: string) {
  if (scrollRef.value) {
    const element = document.getElementById(elementId);
    if (element) {
      scrollRef.value.scrollTo({
        top: element.offsetTop - scrollTopOffset,
        behavior: 'smooth',
      });
    }
  }
}

// required to hide "absolute" searchbar
const coreDiv = ref<HTMLElement | null>(null);
const isOpen = ref(false);
function setOpen() {
  isOpen.value = (coreDiv.value?.clientWidth ?? 0) > 100;
}
</script>

<template>
  <div
    ref="coreDiv"
    :style="{
      width: isPermaOpen ? '28rem' : '',
    }"
    class="parent-div border-r-2 h-100 border-slate-600 bg-opacity-90 dark:bg-opacity-90 bg-slate-200 dark:bg-slate-800 pt-4 pl-2 pr-2 pb-2 w-20 origin-left transition-transform flex flex-row flex-nowrap select-none"
    :class="{
      'hover:w-[28rem]': !isPermaOpen,
      'hover:scale-x-105': !isPermaOpen,
    }"
    @mouseenter="setOpen"
    @mouseleave="setOpen"
  >
    <div class="h-full flex-none">
      <div class="h-full flex flex-col">
        <div class="flex-1 overflow-y-auto p-2 overflow-x-hidden">
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
              :on-main-click="() => scrollToElement(`scroll-group-${index}`)"
              :on-sub-click="
                (subGroupIndex) =>
                  scrollToElement(`scroll-subgroup-${index}-${subGroupIndex}`)
              "
            />
          </div>
        </div>
        <div class="flex-none pt-4 ml-2 mb-2">
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
      ref="scrollRef"
      class="ml-3 w-full mr-2 overflow-y-hidden hover:overflow-y-auto overflow-x-hidden"
      :class="{ 'child-div': !isPermaOpen }"
    >
      <div class="z-10 ml-2 fixed w-[21rem]" v-if="isOpen">
        <UInput
          v-model:model-value="searchQuery"
          size="lg"
          placeholder="Search..."
          icon="mdi-magnify"
          :ui="{ icon: { trailing: { pointer: '' } } }"
          class=""
        >
          <template #trailing>
            <UButton
              v-show="searchQuery !== ''"
              color="gray"
              variant="link"
              icon="i-heroicons-x-mark-20-solid"
              :padded="false"
              @click="searchQuery = ''"
            />
          </template>
        </UInput>
      </div>
      <div class="flex flex-col flex-1 ml-1 mt-3 pt-16">
        <div v-for="(nodeGroup, listIndex) in CustomNodes.nodesList">
          <div
            class="pr-3 pl-3 font-mono font-semibold text-lg"
            :id="`scroll-group-${listIndex}`"
          >
            <UIcon :name="nodeGroup.icon" />
            {{ nodeGroup.name }}
          </div>
          <div
            v-for="(nodeSubGroup, subIndex) in nodeGroup.groups"
            :id="`scroll-subgroup-${listIndex}-${subIndex}`"
          >
            <div class="pr-6 pl-6 font-mono font-semibold text-base">
              <UIcon :name="nodeSubGroup.icon ?? nodeGroup.icon" />
              {{ nodeSubGroup.name }}
            </div>
            <DragNode
              v-for="nodeDefinition in nodeSubGroup.nodes"
              :node-definition="nodeDefinition"
              :node-group-definition="nodeGroup"
            />
          </div>
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
