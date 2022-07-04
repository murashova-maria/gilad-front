import { axiosInstance } from ".";
import { IAddKeyword, IEditKeyword } from "../store/keywords";

export const Keywords = {
  getKeywords: async (token: string) => {
    return await axiosInstance.get("keywords/", {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
  },
  addKeyword: async (params: IAddKeyword, token: string) => {
    return await axiosInstance.post("keywords/", params, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
  },
  getKeyword: async (id: number, token: string) => {
    return await axiosInstance.get(`keywords/${id}/`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
  },
  editKeyword: async (keyword: IEditKeyword, token: string) => {
    return await axiosInstance.post(`keywords/${keyword.id}/`, {keyword: keyword.keyword, clients: keyword.clients}, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
  },
  deleteKeyword: async (id: number, token: string) => {
    return await axiosInstance.delete(`keywords/${id}`,{
      headers: {
        Authorization: `Token ${token}`,
      },
    })
  }
};
