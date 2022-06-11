import {
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SliderMark,
  Tooltip,
} from "@chakra-ui/react";
import React from "react";

interface SliderRadiusProps {
  onChange: (value: number) => void;
}

export const SliderRadius = ({ onChange }: SliderRadiusProps) => {
  const [sliderValue, setSliderValue] = React.useState(5);
  const [showTooltip, setShowTooltip] = React.useState(false);

  const handleChange = (value: number) => {
    setSliderValue(value);
    // if (value >= 60) {
    // } else {
    //   setSliderValue(value);
    // }
  };

  const handleLeave = () => {
    onChange(sliderValue);
    setShowTooltip(false)
  };
  return (
    <Slider
      id="slider"
      defaultValue={sliderValue}
      min={0}
      max={60}
      colorScheme="teal"
      onChange={(value) => handleChange(value)}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => handleLeave()}
    >
      <SliderMark value={10} mt="1" ml="-2.5" fontSize="sm">
        10 Km
      </SliderMark>
      <SliderMark value={30} mt="1" ml="-2.5" fontSize="sm">
        30 Km
      </SliderMark>
      <SliderMark value={50} mt="1" ml="-2.5" fontSize="sm">
        50 Km
      </SliderMark>
      <SliderTrack>
        <SliderFilledTrack />
      </SliderTrack>
      <Tooltip
        hasArrow
        bg="teal.500"
        color="white"
        placement="top"
        isOpen={showTooltip}
        label={`${sliderValue} Km`}
      >
        <SliderThumb />
      </Tooltip>
    </Slider>
  );
};
