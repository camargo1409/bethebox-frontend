import { Flex } from "@chakra-ui/react";
import dynamic from "next/dynamic";
import { useContext } from "react";
import { MapProps } from "../../components/Map";
import { AuthContext } from "../../contexts/AuthContext";
import { DashboardLayout } from "../../layouts/dashboardLayout";

const Map = dynamic<MapProps>(
  () => import("../../components/Map").then((mod) => mod.Map),
  {
    ssr: false,
  }
);

const MapPage = () => {
  const { user } = useContext(AuthContext);
  return (
    <DashboardLayout>
      <Flex h="93vh" w="100%" bg="gray.200">
          <Map isDraggable={false} />
      </Flex>
    </DashboardLayout>
  );
};

export default MapPage;
