<template>
  <el-tree
    ref="treeRef"
    style="max-width: 600px"
    :data="data"
    show-checkbox
    default-expand-all
    node-key="id"
    highlight-current
    :props="defaultProps"
  />

  <div class="buttons">
    <el-button @click="getCheckedNodes">Run selected robot</el-button>
    <!-- <el-button @click="getCheckedKeys">get by key</el-button> -->
    <!-- <el-button @click="setCheckedNodes">set by node</el-button> -->
    <!-- <el-button @click="setCheckedKeys">set by key</el-button> -->
    <el-button @click="resetChecked">reset</el-button>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { ElTree } from "element-plus";
import axios from "axios";
import type Node from "element-plus/es/components/tree/src/model/node";

let data = ref<Tree[]>([]);

interface Tree {
  id: number;
  label: string;
  children?: Tree[];
}

// interface Tree {
//   [key: string]: any;
// }

const treeRef = ref<InstanceType<typeof ElTree>>();

const getCheckedNodes = () => {
  const checkedNodes = treeRef.value!.getCheckedNodes(false, false);
  const checkedLabels = checkedNodes.map((node) => node.label);
  console.log("checkedLabels: " + checkedLabels);

  let formData = new FormData();
  formData.append("robotsuites", checkedLabels.join(","));
  let url = "runrobot";
  let method = "post";
  let headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };
  axios({
    method,
    url,
    data: formData,
    headers,
  }).then((res) => {
    console.log(res);
    console.log(res.data.results);
    data.value = res.data.results;
  });
};
// const getCheckedKeys = () => {
//   console.log(treeRef.value!.getCheckedKeys(false));
// };
// const setCheckedNodes = () => {
//   treeRef.value!.setCheckedNodes(
//     [
//       {
//         id: 5,
//         label: "Level two 2-1",
//       },
//       {
//         id: 9,
//         label: "Level three 1-1-1",
//       },
//     ] as Node[],
//     false
//   );
// };
// const setCheckedKeys = () => {
//   treeRef.value!.setCheckedKeys([3], false);
// };
const resetChecked = () => {
  treeRef.value!.setCheckedNodes([], false);
};

const defaultProps = {
  children: "children",
  label: "label",
};

// data = [
//   {
//     id: 1,
//     label: "Level one 1",
//     children: [
//       {
//         id: 4,
//         label: "Level two 1-1",
//         children: [
//           {
//             id: 9,
//             label: "Level three 1-1-1",
//           },
//           {
//             id: 10,
//             label: "Level three 1-1-2",
//           },
//         ],
//       },
//     ],
//   },
//   {
//     id: 2,
//     label: "Level one 2",
//     children: [
//       {
//         id: 5,
//         label: "Level two 2-1",
//       },
//       {
//         id: 6,
//         label: "Level two 2-2",
//       },
//     ],
//   },
//   {
//     id: 3,
//     label: "Level one 3",
//     children: [
//       {
//         id: 7,
//         label: "Level two 3-1",
//       },
//       {
//         id: 8,
//         label: "Level two 3-2",
//       },
//     ],
//   },
// ];

onMounted(() => {
  let formData = new FormData();
  formData.append("file_name", "Acceptance.robotsuites");
  let url = "getallsuites";
  let method = "post";
  let headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };
  axios({
    method,
    url,
    data: formData,
    headers,
  }).then((res) => {
    console.log(res);
    console.log(res.data.results);
    data.value = res.data.results;
  });
});
</script>
