import {ajaxConfig} from './ajax'
import {servicesConfig} from './services'

export const ajax = ajaxConfig
export const services = servicesConfig

const configuration = Object.assign({}, ajax, services)
export default configuration