import { Link } from '@chakra-ui/layout';
import { Grid, GridItem, List, ListItem } from "@chakra-ui/layout";
import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";
import { useContext } from "react";
import UserInfo from "../../components/UserInfo";
import { AuthContext } from "../../contexts/AuthContext";
import { SidebarWithHeader } from "../../layouts/dashboardLayout";
import { SliderRadius } from '../../components/SliderRadius'

const Dashboard = () => {
  const { user, signOut } = useContext(AuthContext);
  return (
    <SidebarWithHeader >
          <UserInfo />
    </SidebarWithHeader>
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