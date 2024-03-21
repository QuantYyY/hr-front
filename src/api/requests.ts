import axios, { AxiosError, AxiosRequestHeaders, AxiosResponse } from "axios";

const axiosApi = axios.create();

axiosApi.interceptors.request.use(
    async config => {
        config.baseURL = 'http://127.0.0.1:8000';
        config.headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        } as AxiosRequestHeaders;
        return config;
    }
);

const checkAxiosResponse = (response: AxiosResponse) => {
    if (response.status !== 200 && response.status !== 201 && response.status !== 204) {
        throw new Error('ошибка ' + response.status);
    }
    console.log('checkAxiosResponse', response);
    const data = response.data;
    return data;
}

const catchAxiosResponse = (error: AxiosError) => {
    return Promise.reject(error.response);
}

export const getApplicant = () => {
    const url = '/applicant/';
    return axiosApi.get(url)
        .then(checkAxiosResponse)
        .catch(catchAxiosResponse);
}

export const postApplicant = (data: applicantType) => {
    const url = '/applicant/';
    return axiosApi.post(url, data)
        .then(checkAxiosResponse)
        .catch(catchAxiosResponse);
}

export const putApplicant = (id: number, data: applicantType) => {
    const url = `/applicant/?id_applicant=${id}`;
    return axiosApi.put(url, data)
        .then(checkAxiosResponse)
        .catch(catchAxiosResponse);
}

export const deleteApplicant = (id: number) => {
    const url = `/applicant/?id_applicant=${id}`;
    return axiosApi.delete(url)
        .then(checkAxiosResponse)
        .catch(catchAxiosResponse);
}

export const getVacancy = () => {
    const url = '/vacancy/';
    return axiosApi.get(url)
        .then(checkAxiosResponse)
        .catch(catchAxiosResponse);
}

export const postVacancy = (data: applicantType) => {
    const url = '/vacancy/';
    return axiosApi.post(url, data)
        .then(checkAxiosResponse)
        .catch(catchAxiosResponse);
}

export const putVacancy = (id: number, data: applicantType) => {
    const url = `/vacancy/?id_vacancy=${id}`;
    return axiosApi.put(url, data)
        .then(checkAxiosResponse)
        .catch(catchAxiosResponse);
}

export const deleteVacancy = (id: number) => {
    const url = `/vacancy/?id_vacancy=${id}`;
    return axiosApi.delete(url)
        .then(checkAxiosResponse)
        .catch(catchAxiosResponse);
}

export const getDepartment = () => {
    const url = '/department/';
    return axiosApi.get(url)
        .then(checkAxiosResponse)
        .catch(catchAxiosResponse);
}

export const postDepartment = (data: applicantType) => {
    const url = '/department/';
    return axiosApi.post(url, data)
        .then(checkAxiosResponse)
        .catch(catchAxiosResponse);
}

export const putDepartment = (id: number, data: applicantType) => {
    const url = `/department/?id_department=${id}`;
    return axiosApi.put(url, data)
        .then(checkAxiosResponse)
        .catch(catchAxiosResponse);
}

export const deleteDepartment = (id: number) => {
    const url = `/department/?id_department=${id}`;
    return axiosApi.delete(url)
        .then(checkAxiosResponse)
        .catch(catchAxiosResponse);
}

export const getPosition = () => {
    const url = '/post/';
    return axiosApi.get(url)
        .then(checkAxiosResponse)
        .catch(catchAxiosResponse);
}

export const postPosition = (data: applicantType) => {
    const url = '/post/';
    return axiosApi.post(url, data)
        .then(checkAxiosResponse)
        .catch(catchAxiosResponse);
}

export const putPosition = (id: number, data: applicantType) => {
    const url = `/post/?id_post=${id}`;
    return axiosApi.put(url, data)
        .then(checkAxiosResponse)
        .catch(catchAxiosResponse);
}

export const deletePosition = (id: number) => {
    const url = `/post/?id_post=${id}`;
    return axiosApi.delete(url)
        .then(checkAxiosResponse)
        .catch(catchAxiosResponse);
}