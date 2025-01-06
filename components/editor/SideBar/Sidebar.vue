<script lang="ts" setup>
import { CustomNodes } from '~/components/editor/customNodeList';
import DragNode from '~/components/editor/SideBar/DragNode.vue';
import ExpandableButton from '~/components/editor/SideBar/ExpandableButton.vue';

const searchQuery = ref('');
const sessionStore = useSessionStore();
const scrollRef = ref<HTMLElement | null>(null);
const currentScrolledTo = ref<{
  domId: string;
  category: string;
  subCategory: string;
} | null>(null);

function toggleSidebar() {
  sessionStore.sessionData.pinEditorSidebar =
    !sessionStore.sessionData.pinEditorSidebar;
  if (!sessionStore.sessionData.pinEditorSidebar) {
    searchQuery.value = ' ';
    searchQuery.value = '';
  }
}

const scrollTopOffset: number = 92; // 92 is the ~ height of the search bar + padding + margin
function scrollToElement(elementId: string) {
  searchQuery.value = '';
  if (scrollRef.value) {
    setTimeout(() => {
      const element = document.getElementById(elementId);
      if (element) {
        scrollRef.value!.scrollTo({
          top: element.offsetTop - scrollTopOffset,
          behavior: 'smooth',
        });
      }
    }, 100);
  }
}

// required to hide "absolute" searchbar
const coreDiv = ref<HTMLElement | null>(null);
const isOpen = ref(false);
function setOpen() {
  isOpen.value = (coreDiv.value?.clientWidth ?? 0) > 100;
}

let idScrollHeight: Record<string, number> = {};

function getIdScrollHeights() {
  idScrollHeight = {};
  const elements = document.querySelectorAll('[id^="scroll-subgroup-"]');
  elements.forEach((element) => {
    const id = element.id;
    idScrollHeight[id] = element.clientHeight;
  });
}

onMounted(() => {
  setOpen();
  getIdScrollHeights();
  scrollRef.value!.onscroll = () => {
    const scrollDonePercentage =
      scrollRef.value!.scrollTop /
      (scrollRef.value!.scrollHeight - scrollRef.value!.clientHeight);
    const scrollPosition = scrollRef.value!.scrollHeight * scrollDonePercentage;
    // get the object id, of the element that is between the two scroll positions
    const elementId = Object.keys(idScrollHeight).find((id) => {
      const element = document.getElementById(id);
      if (element) {
        const elementTop = element.offsetTop;
        const elementBottom = elementTop + idScrollHeight[id];
        return elementTop <= scrollPosition && scrollPosition <= elementBottom;
      }
      return false;
    });
    if (elementId) {
      const [category, subCategory] = elementId.split('-').slice(2);
      currentScrolledTo.value = {
        domId: elementId,
        category: CustomNodes.nodesList[Number(category)].name,
        subCategory:
          CustomNodes.nodesList[Number(category)].groups[Number(subCategory)]
            .name,
      };
    }
  };
});
</script>

<template>
  <div
    ref="coreDiv"
    :style="{
      width: sessionStore.sessionData.pinEditorSidebar ? '28rem' : '',
    }"
    class="parent-div border-r-2 h-100 border-slate-600 bg-opacity-90 dark:bg-opacity-90 bg-slate-200 dark:bg-slate-800 pt-4 pl-2 pb-2 w-20 origin-left transition-transform flex flex-row flex-nowrap select-none"
    :class="{
      'hover:w-[28rem]': !sessionStore.sessionData.pinEditorSidebar,
      'hover:scale-x-105': !sessionStore.sessionData.pinEditorSidebar,
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
              :active-element-id="currentScrolledTo"
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
            :icon="
              sessionStore.sessionData.pinEditorSidebar
                ? 'mdi-pin'
                : 'mdi-pin-outline'
            "
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
      class="ml-3 w-full overflow-y-hidden hover:overflow-y-auto overflow-x-hidden"
      :class="{ 'child-div': !sessionStore.sessionData.pinEditorSidebar }"
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
        <div v-for="(nodeGroup, listIndex) in CustomNodes.search(searchQuery)">
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
            <div
              :hidden="nodeSubGroup.name === 'UNCATEGORIZED'"
              class="pr-6 pl-6 font-mono font-semibold text-base"
            >
              <UIcon :name="nodeSubGroup.icon ?? nodeGroup.icon" />
              {{ nodeSubGroup.name }}
            </div>
            <DragNode
              v-for="nodeDefinition in nodeSubGroup.nodes"
              :node-definition="nodeDefinition"
              :node-group-definition="nodeGroup"
              :node-sub-group-definition="nodeSubGroup"
              class="mb-2"
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
