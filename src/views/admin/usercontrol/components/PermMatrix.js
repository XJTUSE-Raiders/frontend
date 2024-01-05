// Chakra imports
import { Flex, SimpleGrid, Text, useColorModeValue } from "@chakra-ui/react";
// Custom components
import Card from "components/card/Card.js";
import React from "react";
import RoleBox from "views/admin/usercontrol/components/RoleBox"
import PermBox from "views/admin/usercontrol/components/PermBox"

// Assets
export default function GeneralInformation(props) {
  const { ...rest } = props;
  // Chakra Color Mode
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = "gray.400";
  const cardShadow = useColorModeValue(
    "0px 18px 40px rgba(112, 144, 176, 0.12)",
    "unset"
  );
  return (
    

    
    <Card mb={{ base: "0px", "2xl": "20px" }}  {...rest}>
      <Text
        color={textColorPrimary}
        fontWeight='bold'
        fontSize='2xl'
        mt='10px'
        mb='4px'>
        角色和权限管理
      </Text>
      <SimpleGrid columns='1' gap='20px'>
        <Flex>
          <RoleBox title='User.Charts' value='用户查看图表的权限' />
        </Flex>

        <PermBox
          boxShadow={cardShadow}
          check='false'
          title='User.Charts.ISP'
          value='查看 ISP 数据分布情况'
        />

      </SimpleGrid>
    </Card>
  );
}
