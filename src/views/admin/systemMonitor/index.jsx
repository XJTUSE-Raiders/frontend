import { Box, SimpleGrid } from "@chakra-ui/react";

// Custom components

// Assets
import React from "react";
import ContainerCard from "./components/ContainerCard";

export default function Overview() {
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <SimpleGrid columns={{base:2, md:4, xl:4}} gap='20px' mb='20px'>
        <ContainerCard isOk='true' containerName='Flume-Source' version='2.21.0' upTime='01:24:40:12' reportTime='2024-01-08 10:08:09' />
        <ContainerCard isOk='true' containerName='Flume-Sink' version='2.21.0' upTime='01:24:40:12' reportTime='2024-01-08 10:08:09' />
        <ContainerCard isOk='false' containerName='Flink-Task' version='2.21.0' upTime='01:24:40:12' reportTime='2024-01-08 10:08:09' />
        <ContainerCard isOk='false' containerName='Flink-Job' version='2.21.0' upTime='01:24:40:12' reportTime='2024-01-08 10:08:09' />
        <ContainerCard isOk='false' containerName='Flink-Web' version='2.21.0' upTime='01:24:40:12' reportTime='2024-01-08 10:08:09' />
        <ContainerCard isOk='false' containerName='Zookeeper' version='2.21.0' upTime='01:24:40:12' reportTime='2024-01-08 10:08:09' />
        <ContainerCard isOk='false' containerName='Kafka' version='2.21.0' upTime='01:24:40:12' reportTime='2024-01-08 10:08:09' />
        <ContainerCard isOk='false' containerName='Kafka-Web' version='2.21.0' upTime='01:24:40:12' reportTime='2024-01-08 10:08:09' />
        <ContainerCard isOk='true' containerName='Clickhouse' version='2.21.0' upTime='01:24:40:12' reportTime='2024-01-08 10:08:09' />
        <ContainerCard isOk='false' containerName='MySQL' version='2.21.0' upTime='01:24:40:12' reportTime='2024-01-08 10:08:09' />
      </SimpleGrid>
    </Box>
  );
}
