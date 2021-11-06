import { useDisclosure } from "@chakra-ui/hooks";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { UserNearMeData } from "../components/Map";
import { RequestModal } from "../components/RequestModal";
import { api } from "../config/axios";
import { AuthContext } from "./AuthContext";

interface RequestProviderProps {
  children: ReactNode;
}

interface Requests {
  asCustomer: any[];
  asProvider: any[];
}
interface RequestContextData {
  selectedUser: UserNearMeData;
  handleSetSelectedUser: (user: UserNearMeData) => void;
  onOpenRequestModal: () => void;
  onCloseRequestModal: () => void;
  requestModalIsOpen: boolean;
  requests: Requests;
}

export const RequestContext = createContext({} as RequestContextData);

export const RequestProvider = ({ children }: RequestProviderProps) => {
  const [selectedUser, setSelectedUser] = useState<UserNearMeData>(
    {} as UserNearMeData
  );
  const { isAuthenticated } = useContext(AuthContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [requests, setRequests] = useState<Requests>({} as Requests);

  useEffect(() => {
    if (isAuthenticated) {
      const getRequests = async () => {
        const { data: asCustomer } = await api.get("/requests", {
          params: {
            as: "customer",
          },
        });

        const { data: asProvider } = await api.get("/requests", {
          params: {
            as: "provider",
          },
        });

        setRequests({ asCustomer, asProvider });
      };
      getRequests();
    }
  }, [isAuthenticated]);

  const handleSetSelectedUser = (user: UserNearMeData) => {
    setSelectedUser(user);
    onOpen();
  };

  return (
    <RequestContext.Provider
      value={{
        selectedUser,
        handleSetSelectedUser,
        onOpenRequestModal: onOpen,
        onCloseRequestModal: onClose,
        requestModalIsOpen: isOpen,
        requests,
      }}
    >
      {children}
      <RequestModal />
    </RequestContext.Provider>
  );
};
