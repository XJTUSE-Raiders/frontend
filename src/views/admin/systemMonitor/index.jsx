import { Box, SimpleGrid } from "@chakra-ui/react";

// Custom components

// Assets
import React from "react";
import ContainerCard from "./components/ContainerCard";

export default function Overview() {
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <SimpleGrid columns={{base:2, md:4, xl:4}} gap='20px' mb='20px'>
        <ContainerCard
          isOk='true'
          containerName='Flume-Source'
          state='running'
          status='Up 2 days'
        />
      </SimpleGrid>
    </Box>
  );
}
