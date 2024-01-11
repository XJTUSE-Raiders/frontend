import { Box, SimpleGrid, Skeleton } from "@chakra-ui/react";

// Custom components

// Assets
import React from "react";
import ContainerCard from "./components/ContainerCard";
import { useQuery } from "@tanstack/react-query";
import { api } from "variables/api";

export default function Overview() {
  const { data, isLoading } = useQuery({
    queryKey: ["containers"],
    queryFn: () => api.get("service/list").json().then(({ data }) => data),
    refetchInterval: 30000,
  });

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <SimpleGrid columns={{base:2, md:4, xl:4}} gap='20px' mb='20px'>
        {isLoading ? (<>
          <Skeleton h="240px" />
          <Skeleton h="240px" />
          <Skeleton h="240px" />
          <Skeleton h="240px" />
        </>) : data.map((res) => (<ContainerCard
          containerId={res.id}
          containerName={res.name}
          state={res.state}
          status={res.status}
        />))}
      </SimpleGrid>
    </Box>
  );
}
