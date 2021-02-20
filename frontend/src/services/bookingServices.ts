import http from "./httpServices";

const URL = "/booking";

export const getBooking = (page = 0, size = 10) => {
	const booking = http.get(`${URL}/?page=${page}&size=${size}`);
	return booking;
};

export const postBooking = (data: any) => {
	const booking = http.post(URL, data);
	return booking;
};

export const deleteBooking = (id: number) => {
	const booking = http.delete(`${URL}/${id}`);
	return booking;
};

export const updateBooking = (data: any) => {
	const booking = http.put(`${URL}/${data.id}`, data.row);
	return booking;
};
