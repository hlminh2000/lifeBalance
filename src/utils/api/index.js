import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Component from "react-component-component";
import { allUserDataQuery } from "./queries";
// const GRAPHQL_BASE = "http://192.168.100.108:3000/graphql";
const GRAPHQL_BASE =
  "https://us-central1-lifebalance-e467a.cloudfunctions.net/api/graphql";

const alwaysSendHeaders = { "Content-Type": "application/json" };

export const fetchData = ({ url = GRAPHQL_BASE, body, headers = {} } = {}) => {
  console.log("body: ", body);
  return fetch(url, {
    method: "POST",
    headers: { ...alwaysSendHeaders, ...headers },
    body: JSON.stringify(body)
  })
    .then(res => res.json())
    .then(json => Promise.resolve(json.data));
};
export const withQuery = ({
  query = "",
  headers
} = {}) => WrappedComponent => props => (
  <Component
    initialState={{ loading: true }}
    didMount={({ setState }) =>
      Promise.all([query, headers].map(thing => Promise.resolve(thing)))
        .then(([query, headers]) =>
          fetchData({
            body: query,
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
  fetchData({
    body: allUserDataQuery({ idToken })
  });
