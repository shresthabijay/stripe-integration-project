import axios from "./axios";
import querystring from "querystring";

export const setupPayout = () => axios.get('/stripe/onboard');
export const validateOnboardingToken = ({ code, state }) => axios.get(`/stripe/validate-token?${querystring.stringify({ code, state })}`);