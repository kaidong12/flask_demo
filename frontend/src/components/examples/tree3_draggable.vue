<template>
  <el-tree
    ref="treeRef"
    style="max-width: 600px"
    :data="treeData"
    draggable
    show-checkbox
    default-expand-all
    node-key="label"
    highlight-current
    :props="defaultProps"
    @node-drop="handleNodeDrop1"
    @node-drag-start="handleDragStart"
    @node-drag-end="handleDragEnd"
    :allow-drop="allowDrop"
  />
  <!-- @node-drag-end="handleDragEnd" -->
  <div class="buttons">
    <el-button @click="runCheckedNodes">Run selected robot</el-button>
    <!-- <el-button @click="getCheckedKeys">get by key</el-button> -->
    <!-- <el-button @click="setCheckedNodes">set by node</el-button> -->
    <!-- <el-button @click="setCheckedKeys">set by key</el-button> -->
    <el-button @click="resetChecked">reset</el-button>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { ElTree, ElMessage } from "element-plus";
import axios from "axios";
import type Node from "element-plus/es/components/tree/src/model/node";
import type { DragEvents } from "element-plus/es/components/tree/src/model/useDragNode";
import type {
  AllowDropType,
  NodeDropType,
} from "element-plus/es/components/tree/src/tree.type";

let treeData = ref<Tree[]>([]);
let hasChecked = ref(false);

interface Tree {
  id: number;
  label: string;
  children?: Tree[];
}

// interface Tree {
//   [key: string]: any;
// }

const treeRef = ref<InstanceType<typeof ElTree>>();

const runCheckedNodes = () => {
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
    treeData.value = res.data.results;
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
    treeData.value = res.data.results;
  });
});

const handleNodeDrop1 = (draggingNode, dropNode, dropType, ev) => {
  // Example: Log the new order
  // console.log(
  //   "Node order:",
  //   treeData.value.map((node) => node.id)
  // );
  const checkedNodes = treeRef.value!.getCheckedNodes(false, false);
  const checkedLabels = checkedNodes.map((node) => node.label);
  console.log("handleNodeDrop1: " + checkedLabels);
};

const handleNodeDrop2 = (
  draggingNode: Node,
  dropNode: Node,
  dropType: NodeDropType,
  ev: DragEvents
) => {
  console.log("handleNodeDrop2:", draggingNode.label, dropNode.label, dropType);
};

const handleDragStart = (node: Node, ev: DragEvents) => {
  console.log("handleDragStart: " + node.label);
  console.log("handleDragStart: " + node.checked);
  if (node.checked) {
    console.log("handleDragStart has been checked!");
    hasChecked.value = true;
  } else {
    console.log("handleDragStart has not been checked!");
    hasChecked.value = false;
  }
};

const handleDragEnd = (draggingNode, dropNode, dropType, ev) => {
  // if (dropType === "inner") {
  //   // Prevent node from being dragged into another node
  //   ElMessage.error("Cannot drag a node into another node");
  //   // Revert the drag operation
  //   treeRef.value.remove(draggingNode.value);
  //   treeRef.value.append(draggingNode.value, dropNode.parent);
  // }
  console.log("handleDragEnd:", draggingNode.label, dropNode.label, dropType);
  if (hasChecked.value == true) {
    console.log("setChecked:", draggingNode.label, dropNode.label, dropType);
    treeRef.value!.setChecked(draggingNode.label, true, false);
  }
};

const allowDrop = (draggingNode: Node, dropNode: Node, type: AllowDropType) => {
  if (type !== "inner") {
    return true;
  } else {
    return false;
  }
};
</script>
