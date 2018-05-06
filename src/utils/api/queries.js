export const allUserDataQuery = ({ idToken }) => ({
  query: `
  {
    user(idToken:"${idToken}"){
      clientTimestamp
      uid
      allActivityIds
      allActiveDates
      activities {
        id
        icon
        isActive
        isArchived
        title
        createdAt
      }
      activityLogs{
        id
        activityId
        timestamp
        start
        end
        date
      }
    }
  }`
});

export const updateUserActivities = ({
  idToken,
  activitiesSet,
  clientTimestamp
}) => ({
  query: `
  {
    mutation(
      $idToken: ID!
      $clientTimestamp: Float!
      $activityData: [ActivityDataInput]!
    ){
      updateUserActivities(
        idToken: $idToken,
        activityData: $activityData,
        clientTimestamp: $clientTimestamp
      ){
        id
        icon
        title
        createdAt
        isActive
        isArchived
      }
    }
  }`,
  variables: {
    idToken,
    activityData: activitiesSet,
    clientTimestamp
  }
});

export const updateUserActivityLogs = ({
  idToken,
  clientTimestamp,
  activityLogs,
  date
}) => ({
  query: `
  {
    mutation(
      idToken: ID!
      clientTimestamp: Float!
      activityLogs: [ActivityLogInput]!
      date: String!
    ){
      updateUserActivityLogs(
        idToken: $idToken,
        clientTimestamp: $clientTimestamp,
        activityLogs: $activityLogs,
        date: $date
      ){
        id
        activityId
        timestamp
        start
        end
        date
      }
    }
  }`,
  variables: {
    idToken,
    clientTimestamp,
    activityLogs,
    date
  }
});
