<template>
  <el-radio-group v-model="treeProps.checkStrictly">
    <el-radio-button :value="true" label="true" />
    <el-radio-button :value="false" label="false" />
  </el-radio-group>
  <el-table
    :data="tableData"
    :tree-props="treeProps"
    row-key="id"
    default-expand-all
  >
    <el-table-column type="selection" width="55" :selectable="selectable" />
    <el-table-column prop="run" label="Test Run" />
    <el-table-column prop="suite" label="Test Suite" />
    <el-table-column prop="test" label="Test Key" />
    <el-table-column prop="status" label="Status" />
    <el-table-column prop="start" label="Start Time" />
    <el-table-column prop="end" label="End Time" />
    <el-table-column prop="execution" label="Execution Key" />
  </el-table>
</template>

<script lang="ts" setup>
import { reactive } from "vue";

interface TestExecution {
  id: number;
  run: string;
  suite: string;
  test: string;
  status: string;
  start: string;
  end: string;
  execution: string;
  children?: TestExecution[];
}

const treeProps = reactive({
  checkStrictly: false,
});

// const selectable = (row: TestExecution) => ![1, 31].includes(row.id);
// const selectable = (row: TestExecution) =>
//   row.execution === "" && row.test !== "";

const tableData: TestExecution[] = [
  {
    id: 1,
    run: "Test_run_2024_08_20_09_30",
    suite: "Loop_001_09_30",
    test: "RAP-642",
    status: "PASS",
    start: "2024-08-20 09:30:00",
    end: "2024-08-20 09:31:00",
    execution: "RAP-777",
  },
  {
    id: 2,
    run: "Test_run_2024_08_20_09_32",
    suite: "Loop_002_09_32",
    test: "RAP-643",
    status: "PASS",
    start: "2024-08-20 09:30:00",
    end: "2024-08-20 09:31:00",
    execution: "RAP-777",
  },
  {
    id: 3,
    run: "Test_run_2024_08_20_09_33",
    suite: "",
    test: "",
    status: "",
    start: "",
    end: "",
    execution: "",
    children: [
      {
        id: 31,
        run: "",
        suite: "Loop_002_09_33",
        test: "RAP-644",
        status: "PASS",
        start: "2024-08-20 09:30:00",
        end: "2024-08-20 09:31:00",
        execution: "RAP-777",
      },
      {
        id: 32,
        run: "",
        suite: "Loop_002_09_33",
        test: "RAP-645",
        status: "PASS",
        start: "2024-08-20 09:30:00",
        end: "2024-08-20 09:31:00",
        execution: "RAP-777",
      },
    ],
  },
  {
    id: 4,
    run: "Test_run_2024_08_20_09_32",
    suite: "Loop_002_09_32",
    test: "RAP-646",
    status: "PASS",
    start: "2024-08-20 09:30:00",
    end: "2024-08-20 09:31:00",
    execution: "RAP-777",
  },
  {
    id: 5,
    run: "Test_run_2024_08_20_09_33",
    suite: "",
    test: "",
    status: "",
    start: "",
    end: "",
    execution: "",
    children: [
      {
        id: 51,
        run: "",
        suite: "Loop_002_09_33",
        test: "RAP-647",
        status: "PASS",
        start: "2024-08-20 09:30:00",
        end: "2024-08-20 09:31:00",
        execution: "",
      },
      {
        id: 52,
        run: "",
        suite: "Loop_002_09_33",
        test: "RAP-648",
        status: "PASS",
        start: "2024-08-20 09:30:00",
        end: "2024-08-20 09:31:00",
        execution: "",
      },
    ],
  },
];
</script>
