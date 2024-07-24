<template>
  <div>
    <el-upload
      :limit="1"
      :on-change="changeFile"
      :auto-upload="false"
      :data="uploadForm.data"
    >
      <!-- multiple -->
      <template #trigger>
        <el-button size="large" type="primary">select robot file</el-button>
      </template>
      <el-button
        style="margin-left: 10px"
        size="large"
        type="success"
        @click="submitUpload"
        >upload to raptor</el-button
      >
      <template #tip>
        <div class="el-upload__tip text-red">
          limit 1 file, new file will cover the old file
        </div>
      </template>
    </el-upload>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import { UploadFile } from "element-plus";
import axios from "axios";
const file = ref();
const changeFile = (uploadFile: UploadFile) => {
  file.value = uploadFile;
};

const uploadForm = reactive({
  data: {
    fileId: "",
    name: "",
    type: "",
  },
});

const submitUpload = () => {
  const jsonStr = JSON.stringify(uploadForm.data);
  const blob = new Blob([jsonStr], {
    type: "application/json",
  });

  let formData = new FormData();
  // formData.append("obj", blob);
  // 这里很重要 file.value.raw才是真实的file文件，file.value只是一个Proxy代理对象
  formData.append("file", file.value.raw);
  let url = "upload";
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
    console.log(res.data);
  });
};
</script>
