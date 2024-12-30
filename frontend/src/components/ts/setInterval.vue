<template>
  <div id="app">
    <div id="my_box">
      <h3 :class="className">{{ title }}: {{ count }}</h3>
    </div>

    <button id="start" @click="changeColor">Start</button>
    <button id="stop" @click="stopTextColor">Stop</button>
    <button @click="resetCounter">Reset</button>
  </div>
</template>

<script setup>
import { ref } from "vue";
// variable to store our intervalID
let title = ref("Hello World");
let count = ref(0);
let nIntervId = ref(0);
let className = ref("go");

function changeColor() {
  // check if already an interval has been set up
  console.log(nIntervId.value);
  if (nIntervId.value === 0) {
    nIntervId.value = setInterval(flashText, 1000);
  }
  //   if (!nIntervId) {
  //     nIntervId.value = setInterval(flashText, 1000);
  //   }
}

const resetCounter = () => {
  count.value = 0;
};
const flashText = () => {
  if (className.value === "go") {
    className.value = "stop";
    title.value = "Hello Sun";
  } else {
    className.value = "go";
    title.value = "Hello Moon";
  }
  count.value += 1;
};
// function flashText() {
//   const oElem = document.getElementById("my_box");
//   if (oElem.className === "go") {
//     oElem.className = "stop";
//   } else {
//     oElem.className = "go";
//   }
// }

function stopTextColor() {
  if (nIntervId.value !== 0) {
    console.log("stopTextColor", nIntervId.value);
    clearInterval(nIntervId.value);
    nIntervId.value = 0;
  }
  //   clearInterval(nIntervId);
  //   // release our intervalID from the variable
  //   nIntervId = null;
}

// document.getElementById("start").addEventListener("click", changeColor);
// document.getElementById("stop").addEventListener("click", stopTextColor);
</script>

<style>
.go {
  color: green;
}
.stop {
  color: red;
}
</style>
