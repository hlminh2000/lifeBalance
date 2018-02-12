export default {
  "AUTH/LOGIN_COMPLETE": {
    type: "AUTH/LOGIN_COMPLETE",
    create: user => ({
      type: "AUTH/LOGIN_COMPLETE",
      payload: { user }
    })
  }
};
