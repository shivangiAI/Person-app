import axios from "axios";

export function fetchRequest(url, method, body, headers) {
    const reqHeaders = headers ? headers : {"Content-Type": "application/json" };
    switch(method) {
        case 'GET': {
            return axios.get(url).then((res) => {
                if (res.status === 200) {
                    return res.data;
                }
            });
        }
        case 'POST': {
            return axios.post(url, body, {
                headers: reqHeaders
            }).then((res) => {
                if (res.status === 200) {
                    return res.data;
                } else {
                    throw new Error();
                }
            });
        }
    }
}
