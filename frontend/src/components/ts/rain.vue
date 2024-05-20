<template>
  <canvas id="canvas"></canvas>
</template>

<script setup lang="ts">
import { getCurrentInstance, onMounted } from "vue";
document.addEventListener("DOMContentLoaded", function () {
  let canvas = document.querySelector("#canvas") as HTMLCanvasElement;
});
onMounted(() => {
  let canvas = document.querySelector("#canvas") as HTMLCanvasElement;
  let ctx = canvas?.getContext("2d") as CanvasRenderingContext2D;
  canvas.height = screen.availHeight; //可视区域的高度
  canvas.width = screen.availWidth; //可视区域的宽度
  let str: string[] = "XMZSWSSBXMZSWSSBXMZSWSSBXMZSWSSBXMZSWSSB".split("");
  let Arr = Array(Math.ceil(canvas.width / 10)).fill(0); //获取宽度例如1920 / 10 192
  console.log(Arr);

  const rain = () => {
    ctx.fillStyle = "rgba(0,0,0,0.05)"; //填充背景颜色
    ctx.fillRect(0, 0, canvas.width, canvas.height); //背景
    ctx.fillStyle = "#0f0"; //文字颜色
    Arr.forEach((item, index) => {
      ctx.fillText(
        str[Math.floor(Math.random() * str.length)],
        index * 10,
        item + 10
      );
      Arr[index] =
        item >= canvas.height || item > 10000 * Math.random() ? 0 : item + 10; //添加随机数让字符随机出现不至于那么平整
    });
    console.log(Arr);
  };
  setInterval(rain, 30);
});

// const width = (document.get.getHTMLCanvasElement("myCanvas").width = screen.availWidth);
// const height = (document.getElementById("myCanvas").height =
//   screen.availHeight);
// const ctx = document.getElementById("myCanvas").getContext("2d");
// const arr = Array(Math.ceil(width / 10)).fill(0);
// const str = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789".split("");

// function rain() {
//   ctx.fillStyle = "rgba(0,0,0,0.05)";
//   ctx.fillRect(0, 0, width, height);
//   ctx.fillStyle = "#0f0";
//   arr.forEach(function (value, index) {
//     ctx.fillText(
//       str[Math.floor(Math.random() * str.length)],
//       index * 10,
//       value + 10
//     );
//     arr[index] =
//       value >= height || value > 8888 * Math.random() ? 0 : value + 10;
//   });
// }

// setInterval(rain, 30);
</script>

<style></style>
