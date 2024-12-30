<template>
  <div>
    <el-upload
      multiple
      :limit="5"
      :on-change="changeFile"
      :auto-upload="false"
      :data="uploadForm.data"
      v-model:file-list="fileList"
      :on-exceed="handleExceed"
      :on-error="handleError"
      :on-success="handleSuccess"
    >
      <template #trigger>
        <el-button size="small" type="primary">select robot file</el-button>
      </template>
      <el-button
        style="margin-left: 10px"
        size="small"
        type="success"
        @click="submitUpload"
        >upload to raptor</el-button
      >
      <template #tip>
        <div class="el-upload__tip text-red">{{ max }} files at most</div>
      </template>
    </el-upload>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import { ElMessage, UploadFile, UploadFiles, UploadProps } from "element-plus";
import axios from "axios";
let max = ref(5);
let fileList = ref<UploadFile[]>([]);
const changeFile = (uploadFile: UploadFile, uploadFiles: UploadFiles) => {
  // file.value = uploadFile;
  fileList.value = uploadFiles;
  console.log(fileList.value);
};

const uploadForm = reactive({
  data: {
    fileId: "",
    name: "",
    type: "",
  },
});

const handleError = (file) => {
  ElMessage.error(`${file.name} 上传失败`);
};

const handleSuccess = (file) => {
  ElMessage.error(`${file.name} 上传成功`);
};

const handleExceed = (files, fileList) => {
  ElMessage.warning(
    `当前限制选择 ${max.value} 个文件，本次选择了 ${
      files.length
    } 个文件，共选择了 ${files.length + fileList.length} 个文件，请重新选择！`
  );
};

const submitUpload = () => {
  const jsonStr = JSON.stringify(uploadForm.data);
  const blob = new Blob([jsonStr], {
    type: "application/json",
  });

  let formData = new FormData();
  // formData.append("obj", blob);
  let file_list = fileList.value;
  // let file_list_raw = file_list.map((item) => item.raw);
  // formData.append("files", file_list_raw);
  for (let i = 0; i < file_list.length; i++) {
    // 这里很重要 file.value.raw才是真实的file文件，file.value只是一个Proxy代理对象
    // formData.append("files", file_list[i].raw);
    formData.append("files", file_list[i].raw as Blob);
  }
  console.log(formData);

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
