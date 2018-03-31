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

export const fetchAllUserData = ({ idToken = "" } = {}) =>
  fetchGqlData({
    query: ALL_USER_DATA({ idToken })
  });
