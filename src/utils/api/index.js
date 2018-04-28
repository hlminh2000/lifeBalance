import React from "react";
import Component from "react-component-component";
import { ALL_USER_DATA } from "./queries";
const GRAPHQL_BASE =
  "https://us-central1-lifebalance-e467a.cloudfunctions.net/api/graphql";

const alwaysSendHeaders = { "Content-Type": "application/json" };

const fetchGqlData = ({
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
    }
  >
    {({ state: { data, loading }, setState }) => (
      <WrappedComponent {...{ data, loading, ...props }} />
    )}
  </Component>
);

export const fetchAllUserData = ({ idToken = "" } = {}) =>
  fetchGqlData({
    query: ALL_USER_DATA({ idToken })
  });
