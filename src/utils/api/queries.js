export const ALL_USER_DATA = ({ idToken }) => `
  {
    user(idToken:"${idToken}"){
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
