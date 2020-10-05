import Repository  from './repository'
import {push} from 'react-router-redux'

export default({dispatch}) => next => (action) => {
    const hrefLocation = window.location.href
    const arr = hrefLocation.match(/\/#\/(.*)/g) 
    const currentUrlPath = arr[0].replace("/#", "")
    let urlNotToken = [
        '/pin/forgot',
        '/login',
        '/pin/reset',
        '/pin/verification'
    ];

    let checkUrl = urlNotToken.includes(currentUrlPath)
    if (checkUrl){
        return next(action)
    }else{
        const repository = new Repository
        repository.checkTokenLogin((flag) => {
            if(!flag.errors){
                return next(action)
            }else{
                dispatch(push("/login"))
            }
        })
    }
}