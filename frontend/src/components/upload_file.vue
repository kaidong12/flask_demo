<template>
    <div>
        <input class="fileuploadclass" title="请选择文件夹" ref="file" id="submit" type="file" multiple name="" webkitdirectory
            @change="folderModelOn">
        <el-button type="primary" @click="onUpload" style="margin-left: 10%">证书密钥上传</el-button>
        <ul style="margin-left: 10%; list-style-type: disc;color: #3A3A8AFF">
            <li v-for="file in files_d" :key="file.name">
                <span> {{ file.name }}</span>
            </li>
        </ul>
    </div>
</template>

<script>
const folderModelOn = (e) => {
    let files = e.target.files;
    let formData = new FormData();
    for (let i = 0; i < files.length; i++) {  // 每个file append到formdata里

        let file1 = files[i];
        let isor = false
        if (file1.name.includes('.pem')) {

            for (let [name, file] of formData.entries()) {
                if (file.name.includes(file1.name)) {
                    isor = true
                }

            }
            if (isor === false) {
                formData.append('file', file1);

            }

        } else {
            // if (formData.size ===0){
            //
            // }
            //  // 重置文件选择输入
            // document.querySelector('input[type="file"]').value = '';
            //
            // // 或者直接设置files为空数组
            // files = [];
            ElMessage({
                message: '上传文件必须是.pem的文件',
                type: 'warning',
            })
        }
    }
    formfiledata.push({ formdata: formData })
    // 重置文件选择输入
    document.querySelector('input[type="file"]').value = '';

    for (let [name, file] of formData.entries()) {
        console.log(name, file);
        let incl = files_d.value.some((item) => item.name.includes(file.name));
        if (!incl) {
            files_d.value.push({ name: file.name })
        }
    }
}

const subData = async (row) => {

    console.log('提交', row)
    let re = JSON.parse(JSON.stringify(row))
    console.log('提交', employeeRow)
    if (re.draw_name == "新增") {
        await api.postshopInfos(JSON.parse(JSON.stringify(row))).then(item => {
            console.log(item)
            if (item.code === 200) {
                let order_id = item.data['id']
                console.log('获取订单id：：', order_id)
                console.log('子组件：：', proxy.$refs.drawer.formfiledata[0].formdata)
                ElMessage({
                    showClose: true,
                    message: item.msg,
                    type: 'success',
                })
                // let formdatas = proxy.$refs.drawer.formdfileata[0].formdata
                // for (let [name, file] of formdatas.entries()) {
                //   console.log(name, file);
                //
                // }
                let upurl = "/upload" + '?' + "shop_id=" + order_id

                request({
                    method: 'POST',
                    url: upurl,
                    data: proxy.$refs.drawer.formfiledata[0].formdata,
                    headers: { 'Content-Type': 'multipart/form-data' }
                }).then(function (res) {
                    if (res.code == 200) {
                        ElMessage({
                            message: '文件夹上传成功',
                            type: 'success',
                        })


                    }
                })

                drawer.value.isClose()
            } else {
                ElMessage.error('添加失败')
            }
        })
    } else {
        await api.putshopInfos(JSON.parse(JSON.stringify(row))).then(item => {
            console.log(item)
            if (item.code === 200) {
                ElMessage({
                    showClose: true,
                    message: item.msg,
                    type: 'success',
                })
                drawer.value.isClose()
                let order_id = item.data['id']
                let upurl = "/upload" + '?' + "shop_id=" + order_id

                request({
                    method: 'POST',
                    url: upurl,
                    data: proxy.$refs.drawer.formfiledata[0].formdata,
                    headers: { 'Content-Type': 'multipart/form-data' }
                }).then(function (res) {
                    if (res.code == 200) {
                        ElMessage({
                            message: '文件夹上传成功',
                            type: 'success',
                        })


                    }
                })
            } else {
                ElMessage.error('修改失败')
            }
        })
    }
    getshopList(config)

}

</script>

<style>
.fileuploadclass {
    opacity: 0;
    width: 0;
    height: 0;
}
</style>