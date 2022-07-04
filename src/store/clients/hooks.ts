import { useDispatch, useSelector } from "react-redux";
import {
  clientsGetClients,
  clientsAddClient,
  clientsEditClient,
  clientsDeleteClient,
} from "./actions";
import { IClient, IClientsState } from "./types";

export const clientsSelector = (state: any) => state.clients;

export const useClientsState = (): IClientsState =>
  useSelector(clientsSelector);

export const useClientsActions = () => {
  const dispatch = useDispatch();

  const onGetClients = () => {
    dispatch(clientsGetClients());
  };

  const onAddClient = (client: IClient) => {
    if (client.name && client.email && client.email.length > 0) {
      dispatch(clientsAddClient(client));
    }
  };

  const onEditClient = (client: IClient) => {
    dispatch(clientsEditClient(client));
  };

  const onDeleteClient = (id: number) => {
    dispatch(clientsDeleteClient(id));
  };

  return {
    onGetClients,
    onEditClient,
    onAddClient,
    onDeleteClient,
  };
};
