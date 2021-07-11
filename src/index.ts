import {listIngresses} from './api/k8s/k8s'

console.info('// Starting point')
listIngresses()
  .then(async ingresses => {
    console.info(
      'Hosts to check:',
      ingresses.flatMap(i => i.spec?.rules?.map(r => r?.host))
    )
  })
  .catch(console.error)
