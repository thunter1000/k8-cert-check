import a from 'axios'

const axios = a.create({
  baseURL: 'http://127.0.0.1:8001/',
})

export async function getIngresses(): Promise<any[]> {
  const {
    data: {items: ingresses},
  } = await axios.get('apis/networking.k8s.io/v1/ingresses')
  return ingresses
}
