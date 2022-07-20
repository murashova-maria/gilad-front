import { useDispatch, useSelector } from "react-redux";
import {
  clientsGetClients,
  clientsAddClient,
  clientsEditClient,
  clientsDeleteClient,
  clientsSetErrorMessage,
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

  const onAddClient = (client: Omit<IClient, 'id'>) => {
      dispatch(clientsAddClient(client));
  };

  const onEditClient = (client: IClient) => {
    dispatch(clientsEditClient(client));
  };

  const onDeleteClient = (id: number) => {
    dispatch(clientsDeleteClient(id));
  };

  const onSetErrorMessage = (message: null | string) => {
    dispatch(clientsSetErrorMessage(message))
  }

  return {
    onGetClients,
    onEditClient,
    onAddClient,
    onDeleteClient,
    onSetErrorMessage
  };
};
