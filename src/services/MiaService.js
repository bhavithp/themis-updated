import axios from 'axios';

const axiosInstance = axios.create({
    withCredentials: true,
    xsrfCookieName: process.env.REACT_APP_MIA_COOKIE_NAME
    //    , headers: {'Accept': 'application/json'}
});

//Timeout after 10 seconds
// axiosInstance.defaults.timeout = 10000;


class MiaService {

    static getRelatedComponents(codes) {
        return axiosInstance.post(`${process.env.REACT_APP_MIA_BASE_URL}/api/themis/relationships`, { 'codes': codes });
    }

    static getUserInfo() {
        return axiosInstance.get(`${process.env.REACT_APP_MIA_BASE_URL}/api/user`);
    }

    static getProductDetails(codes) {
        return axiosInstance.post(`${process.env.REACT_APP_MIA_BASE_URL}/api/themis/detail`, { 'codes': codes });
    }

    static sendIssuesDetails(issues) {
        return axiosInstance.post(`${process.env.REACT_APP_MIA_BASE_URL}/api/themis/processing`, { 'issues': issues });
    }

    static getReporterId(reporterEmailId) {
        return axiosInstance.post(`${process.env.REACT_APP_MIA_BASE_URL}/api/themis/user-detail`, { 'user': reporterEmailId });
    }

    static getProgramComponentsInformation(codes) {
        // return axiosInstance.get(`${process.env.REACT_APP_MIA_BASE_URL}/api/themis/program-components-retrieve/${codes}`);
        return axiosInstance.post(`${process.env.REACT_APP_MIA_BASE_URL}/api/themis/program-components-retrieve`, { 'codes': codes });
    }

}

export default MiaService;