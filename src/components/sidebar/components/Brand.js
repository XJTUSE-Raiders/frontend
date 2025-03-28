import React from "react";

// Chakra imports
import { Flex, useColorModeValue, Text } from "@chakra-ui/react";

// Custom components
import { HSeparator } from "components/separator/Separator";

export function SidebarBrand() {
  //   Chakra color mode
  let logoColor = useColorModeValue("navy.700", "white");

  return (
    <Flex align='center' direction='column'>
      <Flex direction='row' color={logoColor} mb='32px'>
          <Text fontSize='3xl' fontWeight='bolder' mr={2}>网站访客</Text>
          <Text fontSize='3xl'>分析平台</Text>
      </Flex>

      {/* <HorizonLogo h='26px' w='175px' my='32px' color={logoColor} /> */}
      <HSeparator mb='5px' />
    </Flex>
  );
}

export default SidebarBrand;
