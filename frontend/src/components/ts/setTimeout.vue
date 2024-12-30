<template>
  <div
    ref="myTable"
    class="myTable"
    :style="{ margin: 'auto', width: '100%', height: '400px' }"
  >
    <button class="run" @click="run">运行</button>
    <table class="tb">
      <thead>
        <tr>
          <th>之前</th>
          <th>延时</th>
          <th>现在</th>
        </tr>
      </thead>
      <tbody id="log"></tbody>
    </table>
  </div>
</template>

<script setup>
let last = 0;
let iterations = 10;

function timeout() {
  // 记录调用时间
  logline(new Date().getMilliseconds());
  // 如果还没结束，计划下次调用
  if (iterations-- > 0) {
    setTimeout(timeout, 1);
  }
}

function run() {
  // 清除日志
  const log = document.querySelector("#log");
  while (log.lastElementChild) {
    log.removeChild(log.lastElementChild);
  }

  // 初始化迭代次数和开始时间戳
  iterations = 10;
  last = new Date().getMilliseconds();
  // 开启计时器
  setTimeout(timeout, 2);
}

function logline(now) {
  // 输出上一个时间戳、新的时间戳及差值
  const tableBody = document.getElementById("log");
  const logRow = tableBody.insertRow();
  logRow.insertCell().textContent = last;
  logRow.insertCell().textContent = now - last;
  logRow.insertCell().textContent = now;

  last = now;
}

// document.querySelector("#run").addEventListener("click", run);
</script>

<style>
/* .myTable {
  margin: "auto";
  width: "100%";
  height: "400px";
} */
.run {
  width: 100px; /* or any specific width */
  height: 50px; /* or any specific height */
  padding: 10px; /* optional: adds space inside the button */
  border: 5px solid green; /* optional: adds a border */
  background-color: lightgray; /* optional: adds a background color */
}

.tb {
  border: 2px solid black;
  /* or use individual properties:
    border-width: 1px;
    border-style: solid;
    border-color: black;
    */
  padding: 10px;
  background-color: lightgray;

  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}

table tr:nth-child(even) {
  background-color: lightblue;
}
th {
  font-family: Arial, sans-serif;
  font-size: 20px;
  font-weight: bold;
  background-color: darkblue;
  color: white;
}
</style>
