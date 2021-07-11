import {KubeConfig} from '@kubernetes/client-node'
import Axios, {AxiosInstance} from 'axios'
import {Agent} from 'https'
import {Ingress} from './types'

const kc = new KubeConfig()

kc.loadFromDefault()

let axiosInstance: AxiosInstance | null = null

export function getAxios(): AxiosInstance {
  if (axiosInstance === null) {
    const currentCluster = kc.getCurrentCluster()
    const currentUser = kc.getCurrentUser()
    if (!currentCluster) throw new Error('Failed to get current cluster')
    if (!currentUser) throw new Error('Failed to get user cluster')

    const baseURL = currentCluster.server

    const requestOpts: {
      url: string
      ca?: string | Buffer | string[] | Buffer[] | undefined
      cert?: Buffer | undefined
      key?: Buffer | undefined
      strictSSL?: boolean | undefined
      auth?: {username: string; password: string} | undefined
      headers?: {[key: string]: any} | undefined
    } = {
      url: baseURL,
    }
    kc.applyToRequest(requestOpts)

    axiosInstance = Axios.create({
      baseURL: `${baseURL}/`,
      httpsAgent: new Agent({
        ca: requestOpts.ca,
        cert: requestOpts.cert,
        key: requestOpts.key,
        rejectUnauthorized: requestOpts.strictSSL,
      }),
      headers: requestOpts.headers,
      auth: requestOpts.auth,
    })
  }

  return axiosInstance
}

export async function listIngresses(): Promise<Ingress[]> {
  const {
    data: {items},
  } = await getAxios().get('apis/networking.k8s.io/v1/ingresses')
  return items
}
