import { VStack, HStack, Tag, Text } from "@chakra-ui/react";
import React from "react";
import { WEEKDAY_TRANSLATION } from "./constants";

export const DisplayAvailableTimes = ({providerAvailability}:any) => {
  return (
    <VStack alignItems="flex-start">
      {providerAvailability.map((item: any) => (
        <HStack>
          <Tag
            colorScheme={item.available ? "pink" : "blackAlpha"}
            variant={item.available ? "solid" : "outline"}
          >
            {WEEKDAY_TRANSLATION[item.day.weekday_name]}
          </Tag>
          {item.available ? (
            <Text>
              {item.start_time} - {item.end_time}
            </Text>
          ) : (
            <Text>---</Text>
          )}
        </HStack>
      ))}
    </VStack>
  );
};
