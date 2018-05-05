import React from "react";
import Component from "react-component-component";
import { allUserDataQuery } from "./queries";
const GRAPHQL_BASE = "http://192.168.100.108:3000/graphql";
// const GRAPHQL_BASE =
//   "https://us-central1-lifebalance-e467a.cloudfunctions.net/api/graphql";

const alwaysSendHeaders = { "Content-Type": "application/json" };

export const fetchGqlData = ({
  url = GRAPHQL_BASE,
  query = ``,
  variables = {},
  headers = {}
} = {}) =>
  fetch(url, {
    method: "POST",
    headers: { ...alwaysSendHeaders, ...headers },
    body: JSON.stringify({
      query,
      variables
    })
  })
    .then(res => res.json())
    .then(json => Promise.resolve(json.data));

export const withQuery = ({
  query = "",
  variables,
  headers
} = {}) => WrappedComponent => props => (
  <Component
    initialState={{ loading: true }}
    didMount={({ setState }) =>
      Promise.all(
        [query, variables, headers].map(thing => Promise.resolve(thing))
      )
        .then(([query, variables, headers]) =>
          fetchGqlData({
            query,
            variables,
            headers
          })
        )
        .then(data => setState({ data, loading: false }))
        .catch(httpError => setState({ httpError, loading: false }))
    }
  >
    {({ state: { data = {}, error, loading }, httpError, setState }) => (
      <WrappedComponent {...{ data, error, httpError, loading, ...props }} />
    )}
  </Component>
);

export const fetchAllUserData = ({ idToken = "" } = {}) =>
  fetchGqlData({
    query: allUserDataQuery({ idToken })
  });
