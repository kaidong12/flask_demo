<template>
  <el-upload
    v-model:file-list="fileList"
    list-type="picture-card"
    multiple
    :limit="5"
    :on-exceed="handleExceed"
    :on-preview="handlePictureCardPreview"
    :on-remove="handleRemove"
    :http-request="handleHttpRequest"
    :before-upload="beforeFileUpload"
  >
    <!-- :data="uploadForm.data" -->
    <!-- list-type="picture-card" -->
    <!-- list-type="text" -->
    <!-- :auto-upload="false" -->
    <el-icon><Plus /></el-icon>
  </el-upload>

  <el-dialog v-model="dialogVisible">
    <img w-full :src="dialogImageUrl" alt="Preview Image" />
  </el-dialog>
  <el-button
    style="margin-left: 10px"
    size="small"
    type="success"
    @click="submitUpload"
    >upload to raptor</el-button
  >
</template>

<script lang="ts" setup>
import { ref, reactive } from "vue";
import { Plus } from "@element-plus/icons-vue";

import {
  UploadProps,
  UploadUserFile,
  ElMessage,
  UploadFile,
  UploadFiles,
} from "element-plus";
import axios from "axios";

const fileList = ref<UploadUserFile[]>([]); // 文件列表
const dialogImageUrl = ref(""); // 预览图片的地址
const dialogVisible = ref(false); // 是否显示预览图片的对话框
const max = ref(5); // 最大上传文件数量

const handleExceed = (files, fileList) => {
  ElMessage.warning(
    `当前限制选择 ${max.value} 个文件，本次选择了 ${
      files.length
    } 个文件，共选择了 ${files.length + fileList.length} 个文件，请重新选择！`
  );
};

const beforeFileUpload: UploadProps["beforeUpload"] = (rawFile) => {
  if (rawFile.type !== "image/png") {
    ElMessage.error("Avatar picture must be png format!");
    return false;
  } else if (rawFile.size > 1 * 1024 * 1024) {
    ElMessage.error("Avatar picture size can not exceed 1MB!");
    return false;
  }
  return true;
};

const handleHttpRequest: UploadProps["onSuccess"] = (data) => {
  console.log(data);
  console.log(data.file);
  const { file, onProgress, onError, onSuccess } = data;

  let formData = new FormData();
  formData.append("file", file);

  console.log(file);
  console.log(formData);
  //   发送请求
  //   这里应该替换为你的上传接口
  //   例如：
  //   const headers = {
  //     Accept: "application/json",
  //     "Content-Type": "application/json",
  //   };
  //   axios({ url: "/upload", data: formData })
  //     .then((response) => {
  //       onSuccess(response.data);
  //     })
  //     .catch((error) => {
  //       onError(error);
  //     });

  // 模拟上传成功
  onSuccess("上传成功!");
};
const handleRemove: UploadProps["onRemove"] = (uploadFile, uploadFiles) => {
  console.log(uploadFile, uploadFiles);
};

const handlePictureCardPreview: UploadProps["onPreview"] = (uploadFile) => {
  dialogImageUrl.value = uploadFile.url!;
  dialogVisible.value = true;
};

const submitUpload: UploadProps["onSuccess"] = () => {
  let file_list = fileList.value;
  let formData = new FormData();

  for (let i = 0; i < file_list.length; i++) {
    //  file_list[i].url =
    //    "http://localhost:8080/api/v1/upload/" + file_list[i].name;
    console.log(file_list[i]);
    console.log(file_list[i].name);
    formData.append("files", file_list[i].raw);
  }

  console.log(formData);

  let url = "upload";
  let method = "post";
  //   let headers = {
  //     Accept: "application/json",
  //     "Content-Type": "application/json",
  //   };
  axios({
    method,
    url,
    data: formData,
    //  headers,
  }).then((res) => {
    console.log(res);
    console.log(res.data);
  });
};
</script>
