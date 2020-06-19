import { userDetail } from "../api/worker";
import { userActions } from "../reducers/userReducer";

const getUserDetails = () => async dispatch => {
    console.log('henlo')
    try {
        const user = await userDetail();
        dispatch({
            type: userActions.SET_USER_DETAILS,
            payload: user
        });
    } catch (err) {
        console.error("User detail fetch failed!");
    }
};

export default getUserDetails;
