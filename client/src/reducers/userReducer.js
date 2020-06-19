// action types
export const userActions = {
    SET_USER_DETAILS: "SET_USER_DETAILS"
} ;

const INITIAL_STATE = {}

// reducer
const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case userActions.SET_USER_DETAILS:
            return action.payload;
        default:
            return state;
    }
};

export default userReducer;
