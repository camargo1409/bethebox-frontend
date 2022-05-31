import { Box, Container, Grid, GridItem } from "@chakra-ui/layout";
import React, { useContext, useEffect } from "react";
import { OrderList } from "../../components/OrderList";
import { SidebarWithHeader } from "../../layouts/dashboardLayout";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import { AuthContext } from "../../contexts/AuthContext";
import { RequestContext } from "../../contexts/RequestContext";
import { OrderListProvider } from "../../components/OrderListProvider";
const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const { requests, getRequests } = useContext(RequestContext);
  const { asCustomer, asProvider } = requests;

  useEffect(() => {
    getRequests();
  }, []);

  return (
    <SidebarWithHeader>
      <Container maxW="1850px" mt="4" flex="1" display="flex">
        <Tabs
          // variant="soft-rounded"
          colorScheme="pink"
          flexDirection="column"
          flex="1"
        >
          <TabList>
            <Tab>Painel de controle do Cliente</Tab>
            <Tab isDisabled={!user.available}>
              Painel de controle do Provedor
            </Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <OrderList requests={asCustomer} />
              {/* <Grid
              mx="auto"
              py={70}
              templateRows="repeat(2, 1fr)"
              templateColumns="repeat(4, 1fr)"
              gap={4}
            >
              <GridItem
                borderRadius="10"
                colSpan={1}
                rowSpan={1}
                bg="gray.200"
              ></GridItem>
              <GridItem
                borderRadius="10"
                colSpan={1}
                rowSpan={1}
                bg="gray.200"
              ></GridItem>
              <GridItem
                borderRadius="10"
                colSpan={1}
                rowSpan={1}
                bg="gray.200"
              ></GridItem>
              <GridItem
                borderRadius="10"
                colSpan={1}
                rowSpan={2}
                bg="gray.200"
                pt="5"
                px="3"
              >
                <OrderList />
              </GridItem>
              <GridItem
                borderRadius="10"
                colSpan={1}
                rowSpan={1}
                bg="gray.200"
              ></GridItem>
              <GridItem
                borderRadius="10"
                colSpan={2}
                rowSpan={1}
                bg="gray.200"
              ></GridItem>
            </Grid> */}
            </TabPanel>

            <TabPanel>
              <OrderListProvider requests={asProvider} />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Container>
    </SidebarWithHeader>
  );
};

export default Dashboard;
