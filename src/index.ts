import {getIngresses} from './api/k8s/k8s'

console.info('// Starting point')
getIngresses().then(ingresses => {
  console.info(
    'Installed ingresses',
    ingresses.map(i => i.spec.rules.flatMap((r: any) => r.host))
  )
})
