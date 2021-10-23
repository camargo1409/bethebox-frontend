import Icon from "@chakra-ui/icon";
import { Flex, Grid, GridItem, List, ListItem } from "@chakra-ui/layout";
import { useContext } from "react";
import { BsGear } from "react-icons/bs";
import { FaUserAlt } from "react-icons/fa";
import { MdOutlineDashboard } from "react-icons/md";
import { RiMapPin5Line } from "react-icons/ri";
import { Sidebar } from "../../components/Sidebar";
import { AuthContext } from "../../contexts/AuthContext";
import { DashboardLayout } from "../../layouts/dashboardLayout";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  return (
    <DashboardLayout >
      <Grid flex="1"
        bg="gray.50"
        templateRows="repeat(1, 1fr)"
        templateColumns="1fr 2fr"
      >
        <GridItem 
        display="flex" 
        h="100%" 
        bgGradient="linear(to-br, #342c9c, #120650)" 
        justifyContent="right" 
        pr="10"
        >
          <List spacing={3}>
              <ListItem _hover={{bg: "gray"}}>
                aaaaaaaa
              </ListItem>
              <ListItem>
                <a href="">Dashboard</a>
              </ListItem>
              <ListItem>
                <a href="">Mapa</a>
              </ListItem>
              <ListItem>
                <a href="">Configurações</a>
              </ListItem>
            </List>
        </GridItem>
        <GridItem h="100%" bg="gray.50">

        </GridItem>
      </Grid>
    </DashboardLayout>
  );
};

export default Dashboard;
