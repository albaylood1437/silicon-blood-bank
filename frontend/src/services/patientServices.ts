import http from "./httpServices";

const URL = "/patients";

export const getPatients = (page = 0, size = 10) => {
	const patients = http.get(`${URL}/?page=${page}&size=${size}`);
	return patients;
};

export const postPatients = (data: any) => {
	const patients = http.post(URL, data);
	return patients;
};

export const deletePatient = (id: number) => {
	const patient = http.delete(`${URL}/${id}`);
	return patient;
};

export const updatePatient = (data: any) => {
	const patient = http.put(`${URL}/${data.id}`, data.row);
	return patient;
};
