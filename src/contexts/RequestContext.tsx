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
  getRequests: () => void;
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

    console.log(asCustomer)
    setRequests({ asCustomer, asProvider });
  };

  useEffect(() => {
    if (isAuthenticated) {
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
        getRequests,
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
