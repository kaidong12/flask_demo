<script setup lang='ts'>
import {
	ElCol,
	ElForm,
	ElFormItem,
	ElInput,
	ElUpload,
	ElButton,
	ElCheckbox,
	FormRules,
	FormInstance,
	UploadFile,
	UploadFiles
} from 'element-plus'
import { reactive, ref, Ref, onMounted } from 'vue'
import { connectVpn, disConnectVpn, getVpnStatus } from '@/api/system/vpn'
import { VPNStatus } from '@/api/system/vpn/types'

interface vpnFormIns {
	username: string;
	password: string;
	qr_code: any;
	totp_code: string;
	totp_key: string;
	auto_reconnect: boolean;
}

const vpnForm: vpnFormIns = reactive({
	username: '',
	password: '',
	qr_code: null,
	totp_code: '',
	totp_key: '',
	auto_reconnect: false

})

const vpnRules: FormRules = {
	username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
	password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
	totp_code: [{ required: true, message: '请输入TOTP验证码', trigger: 'blur' }],
}
let fileList: UploadFiles = []
function fileListChanged(_: UploadFiles, files: UploadFiles) {
	fileList = files
}

const vpnFormRef: Ref<FormInstance | null> = ref(null)
const vpnStatus: VPNStatus = reactive({ status: 'Disconnect', user: '', ip_addr='', error='' })
const loading: Ref<boolean> = ref(false)

onMounted(() => {
	getVpnStatus().then(res => {
		if (res.data) {
			vpnStatus.status = res.data.status
			vpnStatus.user = res.data.user
			vpnStatus.ip_addr = res.data.ip_addr
			vpnStatus.error = res.data.error
		}
	})
})

function connect() {
	vpnFormRef.value?.validate((valid) => {
		if (valid) {
			loading.value = true
			vpnForm.qr_code = fileList[0]?.raw
			connectVpn(vpnForm).then(res => {
				vpnStatus.status = res.data.status
				vpnStatus.error = res.data.error
				vpnStatus.user = res.data.user
				vpnStatus.ip_addr = res.data.ip_addr
			})
				.finally(() => {
					loading.value = false
				})
		}
		else {
			console.error('error happened when connect to vpn')
		}
	})

}

function disconnect() {
	loading.value = true
	disconnectVpn().then(() => {
		vpnStatus.status = 'Disconnected'
	})
	loading.value = false

}

</script>
<template>
	<el-form :model="vpnForm" :rules="vpnRules" label-width="150px" ref="vpnFormRef">
		<el-form-item label="Username" prop="username">
			<el-col :span="5">
				<el-input v-model="vpnForm.username" />
			</el-col>
		</el-form-item>
		<el-form-item label="Password" prop="password">
			<el-col :span="5">
				<el-input tyepe="password" show-password v-model="vpnForm.password" />
			</el-col>
		</el-form-item>
		<el-form-item label="2FA Code" prop="totp_code">
			<el-col :span="5">
				<el-input v-model="vpnForm.totp_code" />
			</el-col>
		</el-form-item>
		<el-form-item label="2FA Key">
			<el-col :span="5">
				<el-input v-model="vpnForm.totp_key" />
			</el-col>
		</el-form-item>
		<el-form-item label="2FA QRCode">
			<el-upload action="" :auto-upload="false" list-type="picture-card" :limit="1" :on-change="fileListChanged"
				accept=".png,.jpg">
				<el-button tyep="primary" :disabled="fileList.length > 0">Upload</el-button>
			</el-upload>
		</el-form-item>
		<el-form-item label="Auto Reconnect">
			<el-checkbox v-model="vpnForm.auto_reconnect" size="large" />
		</el-form-item>
		<el-form-item>
			<el-button @click="vpnStatus?.status == 'Disconnected' ? connect() : disconnect()"
				:type="loading ? 'success' : vpnStatus?.status == 'Disconnected' ? 'primary' : 'danger'"
				:loading="loading">{{ loading ?
					vpnStatus?.status == 'Disconnected' ? 'Connecting' : 'Disconnecting'
					: vpnStatus?.status == 'Disconnected' ? 'Connect' : 'Disconnect'
				}}
			</el-button>

			<el-button @click="disconnect" v-show="loading" :type="'danger'">Cancel</el-button>
		</el-form-item>
	</el-form>
</template>
<style></style>