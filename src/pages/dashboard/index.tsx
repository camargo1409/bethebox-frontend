import { Box, Container, Grid, GridItem } from "@chakra-ui/layout";
import React from "react";
import { OrderList } from "../../components/OrderList";
import { DashboardLayout } from "../../layouts/dashboardLayout";

const Dashboard = () => {
  return (
    <DashboardLayout>
        <Grid
          maxW="1850px"
          mx="auto"
          px="10"
          py={70}
          flex="1"
          width="100%"
          templateRows="repeat(2, 1fr)"
          templateColumns="repeat(4, 1fr)"
          gap={4}
        >
          <GridItem borderRadius="10" colSpan={1} rowSpan={1} bg="gray.200"></GridItem>
          <GridItem borderRadius="10" colSpan={1} rowSpan={1} bg="gray.200"></GridItem>
          <GridItem borderRadius="10" colSpan={1} rowSpan={1} bg="gray.200"></GridItem>
          <GridItem borderRadius="10" colSpan={1} rowSpan={2} bg="gray.200" pt="5" px="3">
            <OrderList />
          </GridItem>
          <GridItem borderRadius="10" colSpan={1} rowSpan={1} bg="gray.200"></GridItem>
          <GridItem borderRadius="10" colSpan={2} rowSpan={1} bg="gray.200"></GridItem>
        </Grid>
    </DashboardLayout>
  );
};

export default Dashboard;
