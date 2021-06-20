import http from "./httpServices";

const URL = "http://localhost:5000/register";

export const getRegister = () => {
  const donors = http.get(URL);
  return donors;
};

export const postRegister = (data: any) => {
  const registering = http.post(URL, data);
  return registering;
};

export const deleteRegister = (id: number) => {
  const donor = http.delete(`${URL}/${id}`);
  return donor;
};

export const updateRegister = (id: any, mydata: any) => {
  const donor = http.put(`${URL}/${id}`, mydata);
  return donor;
};
