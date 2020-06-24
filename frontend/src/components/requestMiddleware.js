

export default function requestMiddleware() {
    return ({ dispatch, getState }) => next => (action) => {
      const {
        request,
      } = action;
  
      if (!request) {
        return next(action);
      }
  
      const { tokens } = getState().auth;
  
      // 5 minutes from now
      const refreshThreshold = (new Date.getTime() + 300000);
  
      if (tokens.refresh_token && refreshThreshold > tokens.expires_at) {
        return superagent.post('/path/to/renew')
          .send({ refresh_token: tokens.refresh_token })
          .end((err, { body } = {}) => {
            dispatch({ type: 'SET_TOKENS', payload: body });
            request(body);
          });
      }
      return request(tokens);
    };
  }