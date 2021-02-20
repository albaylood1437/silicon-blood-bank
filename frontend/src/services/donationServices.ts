import http from "./httpServices";

const URL = "/donations";

export const getDonations = (page = 0, size = 10) => {
	const donations = http.get(`${URL}/?page=${page}&size=${size}`);
	return donations;
};

export const postDonations = (data: any) => {
	const donations = http.post(URL, data);
	return donations;
};

export const deleteDonation = (id: number) => {
	const donation = http.delete(`${URL}/${id}`);
	return donation;
};

export const updateDonation = (data: any) => {
	const donation = http.put(`${URL}/${data.id}`, data.row);
	return donation;
};
