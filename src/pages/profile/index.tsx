import Icon from "@chakra-ui/icon";
import { Flex, Grid, GridItem, List, ListItem } from "@chakra-ui/layout";
import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";
import { useContext, useState } from "react";
import { BsGear } from "react-icons/bs";
import { FaUserAlt } from "react-icons/fa";
import { MdOutlineDashboard } from "react-icons/md";
import { RiMapPin5Line } from "react-icons/ri";
import { Sidebar } from "../../components/Sidebar";
import UserInfo from "../../components/UserInfo";
import { AuthContext } from "../../contexts/AuthContext";
import { DashboardLayout } from "../../layouts/dashboardLayout";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  return (
    <DashboardLayout >
      <Grid flex="1"
        bg="gray.50"
        templateRows="repeat(1, 1fr)"
        templateColumns="1fr 5fr"
      >
        <GridItem 
        display="flex" 
        h="100%" 
        bgGradient="linear(to-br, #342c9c, #120650)" 
        justifyContent="right" 
        pr="10"
        >
          <List spacing={2} mt="5" color="gray.50" px="2">
              <ListItem _hover={{bg: "blue.700"}}>
                <a href="">Minha conta</a>
              </ListItem>
              <ListItem>
                <a href="">Estatisticas</a>
              </ListItem>
              <ListItem>
                <a href="">Sair</a>
              </ListItem>
            </List>
        </GridItem>
        <GridItem h="100%" w="100%" bg="gray.50">
          <UserInfo />
        </GridItem>
      </Grid>
    </DashboardLayout>
  );
};

export const getServerSideProps:GetServerSideProps = async (ctx) =>{
  const {['bethebox.token']:token} = parseCookies(ctx);

  if(!token){
    return{
      redirect:{
        destination: '/',
        permanent:false
      }
    }
  }

  return {
    props:{}
  }
}

export default Dashboard;