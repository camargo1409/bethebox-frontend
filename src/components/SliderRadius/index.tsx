import {
    Slider,
    SliderTrack,
    SliderFilledTrack,
    SliderThumb,
    SliderMark,
    Tooltip,
  } from '@chakra-ui/react'
  import React from 'react'

export const SliderRadius = () => {
    const [sliderValue, setSliderValue] = React.useState('5')
    const [showTooltip, setShowTooltip] = React.useState(false)
    return (
      <Slider
        id='slider'
        defaultValue={5}
        min={0}
        max={60}
        colorScheme='teal'
        onChange={(v) => {
            if(v >= 60){
                setSliderValue(`+` + v)
            }else{
                setSliderValue(v.toString())
            }

            
        }}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        <SliderMark value={10} mt='1' ml='-2.5' fontSize='sm'>
          10 Km
        </SliderMark>
        <SliderMark value={30} mt='1' ml='-2.5' fontSize='sm'>
          30 Km
        </SliderMark>
        <SliderMark value={50} mt='1' ml='-2.5' fontSize='sm'>
          50 Km
        </SliderMark>
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        <Tooltip
          hasArrow
          bg='teal.500'
          color='white'
          placement='top'
          isOpen={showTooltip}
          label={`${sliderValue} Km`}
        >
          <SliderThumb />
        </Tooltip>
      </Slider>
    )
}