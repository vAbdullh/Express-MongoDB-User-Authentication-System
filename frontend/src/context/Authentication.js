import axios from 'axios';
export const login = async (username, password, setAlert, setaAlertMsg) => {
    const apiUrl = process.env.REACT_APP_API;
    console.log(apiUrl);
    try {
        const response = await axios.post(`${process.env.REACT_APP_API}/login`, {
            username,
            password
        });

        if (response.data && response.data.status) {
            setaAlertMsg(response.data.message)
            setAlert('success');
            return response.data;
        } else {
            setaAlertMsg(response.data.message)
            setAlert('invalid');
            return false;
        }

    } catch (error) {
        console.error('Login error:', error);
        setAlert('error');
        return null;
    }
};
export const createAccount = async (name, username, password, setAlert, setAlertMsg) => {

    try {
        const response = await axios.post(`${process.env.REACT_APP_API}/create`, {
            name,
            username,
            password,
            // role: role ? role : null 
        });

        if (response.data && response.data.status) {
            console.log(response.data.message)

            setAlertMsg(response.data.message)
            setAlert('success');
            return response.data;
        } else {
            console.log(response.data.message)
            console.log(typeof setAlertMsg);
            setAlertMsg(response.data.message)
            setAlert('invalid');
            return false;
        }

    } catch (error) {
        console.error('Login error:', error);
        setAlert('error');
        return null;
    }
};
