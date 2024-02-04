import request from '@/axios'
import { VPNStatus } from '@/api/system/vpn/types'

export const connectVpn = (data): Promise<VPNStatus> => {
  return request.post({
    url: '/rest/system_srv/system/vpn/connect',
    contentType: 'multipart/form-data',
    data: data
  })
}

export const disConnectVpn = () => {
  return request.post({
    url: '/rest/system_srv/system/vpn/disconnect'
  })
}

export const getVpnUserByName = (username: string) => {
  return request.get({
    url: '/rest/system_srv/system/vpn/userinfo',
    params: { username: username }
  })
}

export const getVpnStatus = (): Promise<VPNStatus> => {
  return request.get({
    url: '/rest/system_srv/system/vpn/status'
  })
}
