import Loadable from 'react-loadable';
import {} from '@example/wholesale-review';

const loadable = (loader) => {
   return Loadable({
        loader,
        delay: false,
        loading: () => null
    })
}

const routes = {
    '/wholesale-review': {
        component: loadable(() => import('@example/wholesale-review'))
    }
}

export default routes;