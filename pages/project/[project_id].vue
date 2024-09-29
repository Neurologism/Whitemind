<script setup lang="ts">
import interact from "interactjs";

definePageMeta({
  layout: "project",
});

const modules = ref([
  { id: 1, name: "Item 1", x: 50, y: 50 },
  { id: 2, name: "Item 2", x: 100, y: 100 },
  { id: 3, name: "Item 3", x: 150, y: 150 },
]);

const userStore = useUserStore();

onMounted(() => {
  // target elements with the "draggable" class
  interact(".draggable").draggable({
    // enable inertial throwing
    inertia: true,
    // keep the element within the area of it's parent
    modifiers: [
      interact.modifiers.restrictRect({
        restriction: "parent",
        endOnly: false,
      }),
    ],
    // enable autoScroll
    autoScroll: true,

    listeners: {
      // call this function on every dragmove event
      move: dragMoveListener,

      // call this function on every dragend event
      end(event) {
        var textEl = event.target.querySelector("p");
      },
    },
  });
});

function dragMoveListener(event: any) {
  var target = event.target;
  // keep the dragged position in the data-x/data-y attributes
  var x = (parseFloat(target.getAttribute("data-x")) || 0) + event.dx;
  var y = (parseFloat(target.getAttribute("data-y")) || 0) + event.dy;

  // translate the element
  target.style.transform = "translate(" + x + "px, " + y + "px)";

  // update the posiion attributes
  target.setAttribute("data-x", x);
  target.setAttribute("data-y", y);
}
</script>

<template>
  <div class="h-screen">
    <div class="draggable">
      <ProjectModule></ProjectModule>
    </div>
    <div class="draggable">
      <ProjectModule></ProjectModule>
    </div>
  </div>
</template>

<style scoped>
.draggable {
  width: 300px;
  height: 200px;
  touch-action: none;
  user-select: none;
  transform: translate(0px, 0px);
}
</style>
