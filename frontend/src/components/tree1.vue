<template>
  <el-input
    v-model="filterText"
    style="width: 240px"
    placeholder="Filter keyword"
  />

  <el-tree
    ref="treeRef"
    style="max-width: 600px"
    class="filter-tree"
    :data="data"
    :props="defaultProps"
    :filter-node-method="filterNode"
  />
</template>

<script lang="ts" setup>
import { onMounted, ref, watch } from "vue";
import { ElTree } from "element-plus";
import axios from "axios";

let data = ref<Tree[]>([]);

interface Tree {
  [key: string]: any;
}

const filterText = ref("");
const treeRef = ref<InstanceType<typeof ElTree>>();

const defaultProps = {
  children: "children",
  label: "label",
};

watch(filterText, (val) => {
  treeRef.value!.filter(val);
});

const filterNode = (value: string, data: Tree) => {
  if (!value) return true;
  return data.label.includes(value);
};

// const data: Tree[] = [
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
  treeRef.value!.filter("");

  let formData = new FormData();
  formData.append("file_name", "Acceptance.robot");
  let url = "getalltests";
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
