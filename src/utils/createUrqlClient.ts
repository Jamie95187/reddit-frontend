import { dedupExchange, fetchExchange } from 'urql';
import { cacheExchange, Cache } from '@urql/exchange-graphcache';
import { LogoutMutation, MeQuery, MeDocument, LoginMutation, CreateUserMutation } from "../generated/graphql";
import { betterUpdateQuery } from "./betterUpdateQuery";

export const createUrqlClient = (ssrExchange: any) => ({
  url: 'http://localhost:8080/graphql',
  fetchOptions: {
    credentials: "include" as const,
  },
  exchanges: [dedupExchange, cacheExchange({
    updates: {
      Mutation: {
        logout: (_result, args, cache, info) => {
          // me query
          betterUpdateQuery<LogoutMutation, MeQuery>(
            cache,
            { query: MeDocument },
            _result,
            () => ({ me: null })
          );
        },
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
              _result,
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
    }),
    ssrExchange,
    fetchExchange
  ],
});
