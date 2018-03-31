export default {
  "AUTH/LOGIN_COMPLETE": {
    type: "AUTH/LOGIN_COMPLETE",
    create: ({ user, userData }) => ({
      type: "AUTH/LOGIN_COMPLETE",
      payload: { user, userData }
    })
  }
};
