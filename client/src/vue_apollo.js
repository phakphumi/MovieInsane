import Vue from 'vue'
import VueApollo from 'vue-apollo'
// importing apolloClient
import { apolloClient } from './apollo_client'

Vue.use(VueApollo)
// making a provider
export const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
  defaultOptions: {
    $loadingKey: 'loading'
  }
})
