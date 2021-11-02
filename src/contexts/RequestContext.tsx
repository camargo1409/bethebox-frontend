import { useDisclosure } from "@chakra-ui/hooks";
import { createContext, ReactNode, useState } from "react";
import { UserNearMeData } from "../components/Map";
import { RequestModal } from "../components/RequestModal";

interface RequestProviderProps {
  children: ReactNode;
}

interface RequestContextData {
  selectedUser: UserNearMeData;
  handleSetSelectedUser: (user: UserNearMeData) => void;
  onOpenRequestModal: () => void;
  onCloseRequestModal: () => void;
  requestModalIsOpen: boolean
}

export const RequestContext = createContext({} as RequestContextData);

export const RequestProvider = ({ children }: RequestProviderProps) => {
  const [selectedUser, setSelectedUser] = useState<UserNearMeData>(
    {} as UserNearMeData
  );
  const { isOpen, onOpen, onClose } = useDisclosure();

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
        requestModalIsOpen:isOpen
      }}
    >
      {children}
      <RequestModal />
    </RequestContext.Provider>
  );
};
