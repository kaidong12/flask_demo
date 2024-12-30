<template>
  switch parent border: <el-switch v-model="parentBorder" /> switch child
  border: <el-switch v-model="childBorder" />
  <el-table :data="tableData" :border="parentBorder" style="width: 100%">
    <el-table-column type="expand">
      <template #default="props">
        <div m="4">
          <p m="t-0 b-2">Cycle mode: {{ props.row.cycle_mode }}</p>
          <h3>Tests</h3>
          <el-table :data="props.row.tests" :border="childBorder">
            <el-table-column
              type="selection"
              width="55"
              :selectable="selectable"
            />
            <el-table-column label="ID" prop="id" />
            <el-table-column label="Loop" prop="loop" />
            <el-table-column label="Test Key" prop="test_key" />
            <el-table-column label="Status" prop="test_status" />
            <el-table-column label="Start" prop="start_time" />
            <el-table-column label="Finish" prop="finish_time" />
            <el-table-column label="Test Execution" prop="execution_key" />
            <el-table-column label="Test Plan" prop="plan_key" />
          </el-table>
        </div>
      </template>
    </el-table-column>
    <el-table-column label="Test Run" prop="run_name" />
    <el-table-column label="Start Date" prop="start_date" />
    <el-table-column label="Finish Date" prop="finish_date" />
  </el-table>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const parentBorder = ref(false);
const childBorder = ref(false);
const tableData = [
  {
    run_name: "Test_run_2024_08_20_09_30",
    start_date: "2024-08-20 09:36:00",
    finish_date: "2024-08-20 09:35:00",
    cycle_mode: "List cycle",
    tests: [
      {
        id: 1,
        loop: "Loop_002_09_30",
        test_key: "RAP-431",
        test_status: "PASS",
        start_time: "2024-08-20 09:30:00",
        finish_time: "2024-08-20 09:30:00",
        execution_key: "RAP-777",
        plan_key: "",
      },
      {
        id: 2,
        loop: "Loop_002_09_30",
        test_key: "RAP-432",
        test_status: "PASS",
        start_time: "2024-08-20 09:30:00",
        finish_time: "2024-08-20 09:30:00",
        execution_key: "RAP-777",
        plan_key: "",
      },
    ],
  },
  {
    run_name: "Test_run_2024_08_20_09_32",
    start_date: "2024-08-20 19:36:00",
    finish_date: "2024-08-20 19:35:00",
    cycle_mode: "Single cycle",
    tests: [
      {
        id: 3,
        loop: "Loop_002_09_30",
        test_key: "RAP-431",
        test_status: "PASS",
        start_time: "2024-08-20 19:30:00",
        finish_time: "2024-08-20 19:30:00",
        execution_key: "RAP-777",
        plan_key: "",
      },
      {
        id: 4,
        loop: "Loop_002_09_30",
        test_key: "RAP-432",
        test_status: "PASS",
        start_time: "2024-08-20 19:30:00",
        finish_time: "2024-08-20 19:30:00",
        execution_key: "RAP-777",
        plan_key: "",
      },
      {
        id: 5,
        loop: "Loop_002_09_30",
        test_key: "RAP-433",
        test_status: "PASS",
        start_time: "2024-08-20 19:30:00",
        finish_time: "2024-08-20 19:30:00",
        execution_key: "RAP-777",
        plan_key: "",
      },
      {
        id: 6,
        cycle_mode: "List cycle",
        loop: "Loop_002_09_30",
        test_key: "RAP-434",
        test_status: "PASS",
        start_time: "2024-08-20 19:30:00",
        finish_time: "2024-08-20 19:30:00",
        execution_key: "RAP-777",
        plan_key: "",
      },
      {
        id: 7,
        cycle_mode: "List cycle",
        loop: "Loop_002_09_30",
        test_key: "RAP-434",
        test_status: "PASS",
        start_time: "2024-08-20 19:30:00",
        finish_time: "2024-08-20 19:30:00",
        execution_key: "RAP-777",
        plan_key: "",
      },
    ],
  },
];
</script>
