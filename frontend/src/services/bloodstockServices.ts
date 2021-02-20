import http from "./httpServices";

const URL = "/bloodstock";

export const getBloodstock = (page = 0, size = 10) => {
	const bloodstock = http.get(`${URL}/?page=${page}&size=${size}`);
	return bloodstock;
};

export const postBloodstock = (data: any) => {
	const bloodstock = http.post(URL, data);
	return bloodstock;
};

export const deleteBloodstock = (id: number) => {
	const bloodstock = http.delete(`${URL}/${id}`);
	return bloodstock;
};

export const updateBloodstock = (data: any) => {
	const bloodstock = http.put(`${URL}/${data.id}`, data.row);
	return bloodstock;
};
