import { axiosInstance } from ".";
import { IAddUser, IEditUser } from "../store/users";

export const Users = {
  getUsers: async (token: string) => {
    return await axiosInstance.get("users/", {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
  },
  addUser: async (user: IAddUser, token: string) => {
    return await axiosInstance.post("users/", user, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
  },
  deleteUser: async (id: number, token: string) => {
    return await axiosInstance.delete(`users/${id}`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
  },
  editUser: async (user: IEditUser, id: number, token: string) => {
    return await axiosInstance.post(`users/${id}/`, user, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
  },
};
