import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  InputGroup,
  InputLeftElement,
  Input,
  ModalFooter,
  Button,
  Text,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import { api } from "../../../../config/axios";
import { RequestContext } from "../../../../contexts/RequestContext";
import { WeekDayPicker } from "../../../WeekDayPicker";

interface AcceptOrderModalProps {
  id: number;
  isOpen: boolean;
  onClose: () => void;
}

export const AcceptOrderModal = ({
  id,
  isOpen,
  onClose,
}: AcceptOrderModalProps) => {
  const [price, setPrice] = useState(0);
  const [times, setTimes] = useState<any>({});
  const { getRequests } = useContext(RequestContext);

  const accept = async (id: any) => {
    try {
      const res = await api.put(`/requests/${id}?action=accept`, {
        service_price: price,
        provider_availability: times,
      });
      toast("A proposta foi enviada ao cliente");
      getRequests();
      onClose();
    } catch (error: any) {
      toast("Erro ao enviar proposta. Por favor, tente novamente", {
        type: "error",
      });
    }
  };

  const handleTime = (data: any) => {
    setTimes(data);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Definir preço da para essa solicitação </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              color="gray.300"
              fontSize="1.2em"
              children="R$"
            />
            <Input
              variant="filled"
              focusBorderColor="pink.500"
              type="number"
              min={1}
              id="email"
              color="gray.300"
              placeholder="Digite o preço"
              value={price}
              onChange={(e) => setPrice(+e.target.value)}
            />
          </InputGroup>

          <FormControl mt={4}>
            <FormLabel>Horários Disponíveis</FormLabel>
            <WeekDayPicker onChange={handleTime} />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={onClose}>
            Fechar
          </Button>
          <Button colorScheme="pink" onClick={() => accept(id)}>
            Definir preço
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
