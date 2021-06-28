import { ChakraProvider, ColorModeProvider } from '@chakra-ui/react';
import { Provider, createClient, dedupExchange, fetchExchange } from 'urql';
import { cacheExchange, Cache } from '@urql/exchange-graphcache';
import theme from '../theme'
import { MeDocument } from "../generated/graphql";

// Allow us to properly cast types
function betterUpdateQuery<Result, Query>(
  cache: Cache,
  qi: QueryInput,
  result: any,
  fn: (r: Result, q: Query) => Query
) {
  return cache.updateQuery(qi, data => fn(result, data as any) as any);
}

const client = createClient({
  url: 'http://localhost:8080/graphql',
  exchanges: [dedupExchange, cacheExchange({
    updates: {
      Mutation: {
        login: (_result, args, cache, info) => {
          betterUpdateQuery<LoginMutation, MeQuery> (cache,
              {query: MeDocument},
              _result,
              (result, query) => {
                if (result.login.errors) {
                  return query
                } else {
                  return {
                    me: result.login.user,
                  };
                }
              }
          );
        },

        createUser: (_result, args, cache, info) => {
          betterUpdateQuery<CreateUserMutation, MeQuery> (cache,
              {query: MeDocument},
              result,
              (result, query) => {
                if (result.createUser.errors) {
                  return query
                } else {
                  return {
                    me: result.createUser.user,
                  };
                }
              }
          );
        },
      },
    },
  }), fetchExchange]
});

function MyApp({ Component, pageProps }) {
  return (
    <Provider value={client}>
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
