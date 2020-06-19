export const getToken = () => localStorage.getItem("test-token");

export const setToken = token => localStorage.setItem("test-token", token);

export const removeToken = () => localStorage.removeItem('test-token');