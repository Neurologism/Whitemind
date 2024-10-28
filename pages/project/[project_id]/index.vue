<script setup lang="ts">
import { useSessionStore } from "~/stores/SessionStore";
import { useProjectStore } from "~/stores/ProjectStore";
import FlowEditor from "~/components/editor/FlowEditor.vue";

const sessionStore = useSessionStore();
const projectStore = useProjectStore();

definePageMeta({
  layout: "project",
});
const route = useRoute();
const projectId = route.params.project_id;

async function loadProject() {
  _loading.value = true;
  await projectStore.fetchProject(projectId as string, sessionStore.fetch);
  _loading.value = false;
}

const _loading = ref(true);
loadProject();



</script>

<template>
  <div v-if="_loading">
    <UProgress animation="carousel" />
  </div>
  <FlowEditor :model="{}" :on-change="() => {}"></FlowEditor>
</template>
