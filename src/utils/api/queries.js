export const allUserDataQuery = ({ idToken }) => `
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
  }
`;

export const updateUserActivities = ({
  idToken,
  activitiesSet,
  clientTimestamp
}) => `
{
  mutation{
    updateUserActivities(
      idToken: ${idToken},
      activityData: ${activitiesSet},
      clientTimestamp: ${clientTimestamp}
    ){
      id
      icon
      title
      createdAt
      isActive
      isArchived
    }
  }
}
`;

export const updateUserActivityLogs = ({
  idToken,
  clientTimestamp,
  activityLogs,
  date
}) => `
{
  mutation{
    updateUserActivityLogs(
      idToken: ${idToken},
      clientTimestamp: ${clientTimestamp},
      activityLogs: ${activityLogs},
      date: ${date}
    ){
      id
      activityId
      timestamp
      start
      end
      date
    }
  }
}
`;
