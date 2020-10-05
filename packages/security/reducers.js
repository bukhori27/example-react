import { createAction, createReducer } from 'redux-act'
import Fingerprint2 from 'fingerprintjs2'
import Storage from '@example/storage-local'
import Crypto from '@example/security/crypto'
import Variables from '@example/security/variables'
import Repository  from '@example/auth/repository'

export const setClientSecret = createAction("@@EXAMPLE_CRM_SET_CLIENT_SECRET")

export const generateClientSecret = () => (dispatch) => {
  const crypto = new Crypto
  const storage = new Storage

  // handle for get device id on browser using
  // fingerprint javascript
  new Fingerprint2().get(function (result) {
      const chiperText = crypto.encrypt(result)
      storage.setData(Variables.STORAGE_DEVICE_ID, chiperText)
      const repository = new Repository
      repository.serviceGenerateClientSecret((flag) => {
          console.log('success client secret')
      })
  })
}

const initialState = {
  clientSecret: ""
}

export default createReducer({
  [setClientSecret]: (state, clientSecret) => ({...state, clientSecret})
}, initialState)