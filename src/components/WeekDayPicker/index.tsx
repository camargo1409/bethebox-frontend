import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Tag,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

type DayName =
  | "sunday"
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday";

interface IWeekDay {
  displayName: string;
  available: boolean;
  from: string;
  to: string;
}

interface IWeekDayPickerProps {
  onChange: (data: Record<string, IWeekDay>) => void;
}

export const WeekDayPicker = ({ onChange }: IWeekDayPickerProps) => {
  const [availableTimes, setAvailableTimes] = useState<
    Record<string, IWeekDay>
  >({
    sunday: {
      displayName: "Domingo",
      available: false,
      from: "",
      to: "",
    },
    monday: {
      displayName: "Segunda",
      available: false,
      from: "",
      to: "",
    },
    tuesday: {
      displayName: "Terça",
      available: false,
      from: "",
      to: "",
    },
    wednesday: {
      displayName: "Quarta",
      available: false,
      from: "",
      to: "",
    },
    thursday: {
      displayName: "Quinta",
      available: false,
      from: "",
      to: "",
    },
    friday: {
      displayName: "Sexta",
      available: false,
      from: "",
      to: "",
    },
    saturday: {
      displayName: "Sábado",
      available: false,
      from: "",
      to: "",
    },
  });

  const handleClick = (day: string) => {
    setAvailableTimes((prevState) => ({
      ...prevState,
      [day]: {
        ...prevState[day],
        available: !prevState[day].available,
      },
    }));
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    day: string
  ) => {
    const { name, value } = event.target;
    setAvailableTimes((prevState) => ({
      ...prevState,
      [day]: {
        ...prevState[day],
        [name]: value,
      },
    }));
  };

  useEffect(() => {
    console.log(availableTimes);
    onChange(availableTimes);
  }, [availableTimes]);
  return (
    <VStack>
      {Object.keys(availableTimes).map((day) => (
        <HStack p={2} alignItems="flex-end">
          <Button
            colorScheme={availableTimes[day].available ? "pink" : "blackAlpha"}
            variant={availableTimes[day].available ? "solid" : "outline"}
            fontWeight={700}
            onClick={() => handleClick(day)}
          >
            {availableTimes[day].displayName.substring(0, 3)}
          </Button>

          <Flex>
            <FormControl>
              <FormLabel>De:</FormLabel>
              <Input
                onChange={(e) => handleChange(e, day)}
                name="from"
                type="time"
                disabled={!availableTimes[day].available}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Até:</FormLabel>
              <Input
                onChange={(e) => handleChange(e, day)}
                name="to"
                type="time"
                disabled={!availableTimes[day].available}
              />
            </FormControl>
          </Flex>
        </HStack>
      ))}
    </VStack>
  );
};
