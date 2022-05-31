import {
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverHeader,
    PopoverBody,
    PopoverFooter,
    PopoverArrow,
    PopoverCloseButton,
    IconButton,
  } from "@chakra-ui/react"
import  FocusLock from "react-focus-lock"
import React, { useContext, useEffect } from 'react';
import dynamic from "next/dynamic";
import { MapProps } from "../../components/Map";
import { BiMap } from "react-icons/bi";
import { MapContext } from "../../contexts/MapContenxt";
const Map = dynamic<MapProps>(
    () => import("../../components/Map").then((mod) => mod.Map),
    {
      ssr: false,
    }
  );


// import { Container } from './styles';

interface PopLocaleProps{
    location: {
        lat: number,
        long: number
    }
}

const PopLocale = ({location}: PopLocaleProps) => {
    const { handleSetPosition } = useContext(MapContext);
    const handleOnOpen = () => {
        handleSetPosition(location)
    }
    return (
        <>
          <Popover onOpen={() => handleOnOpen()}
          >
            <PopoverTrigger>
              <IconButton aria-label="Button" size="sm" icon={<BiMap size={30} />} />
            </PopoverTrigger>
            <PopoverContent boxSize={300} p={1} >
                <PopoverArrow />
                <PopoverCloseButton zIndex="9999"/>
                <Map isDraggable={false}/>
            </PopoverContent>
          </Popover>
        </>
      )
}

export default PopLocale;