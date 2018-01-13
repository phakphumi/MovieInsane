import { createBatchingNetworkInterface, ApolloClient } from 'apollo-client'

const networkInterface = createBatchingNetworkInterface({
  uri: 'http://localhost:10101/graphql'
})

networkInterface.use([{
  applyBatchMiddleware (req, next) {
    if (!req.options.headers) {
      req.options.headers = {}  // Create the header object if needed.
    }
    const token = document.cookie.substring(6)
    if (token) {
      req.options.headers.Authorization = token
    }
    next()
  }
}])

export const apolloClient = new ApolloClient({
  networkInterface
})

// making apollo client connect with our backend
// export const apolloClient = new ApolloClient({
//   networkInterface: createBatchingNetworkInterface({
//     uri: 'http://localhost:10101/graphql'
//   }),
//   connectToDevTools: true
// })
