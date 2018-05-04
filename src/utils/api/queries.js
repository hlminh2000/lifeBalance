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
