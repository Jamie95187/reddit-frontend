import { ChakraProvider, ColorModeProvider } from '@chakra-ui/react';
import { Provider, createClient, dedupExchange, fetchExchange } from 'urql';
import { cacheExchange, Cache } from '@urql/exchange-graphcache';
import theme from '../theme'
import { MeDocument } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";

function MyApp({ Component, pageProps }) {
  return (
    <Provider value={createUrqlClient}>
      <ChakraProvider resetCSS theme={theme}>
        <ColorModeProvider
          options={{
            useSystemColorMode: true,
          }}
        >
          <Component {...pageProps} />
        </ColorModeProvider>
      </ChakraProvider>
    </Provider>
  )
}

export default MyApp
