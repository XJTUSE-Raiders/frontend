// Chakra imports
import {
  Button,
  Icon,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
// Custom components
import Card from "components/card/Card.js";
import IconBox from "components/icons/IconBox";
import React from "react";
// Assets
import { MdAdminPanelSettings } from "react-icons/md";

export default function Banner() {
  // Chakra Color Mode
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const brandColor = useColorModeValue("brand.500", "white");
  const box = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
  return (
    <Card mb={{ base: "0px", lg: "20px" }} align='center'>
        
      <IconBox
        mx='auto'
        my='auto'
        h='100px'
        w='100px'
        icon={
          <Icon as={MdAdminPanelSettings} color={brandColor} h='46px' w='46px' />
        }
        bg={box}
      />
      <Text color={textColorPrimary} fontWeight='bold' fontSize='2xl' mt='10px'>
        管理你的用户
      </Text>
      <Button mx='auto'
        my='auto' variant='brand'>增加、删除或修改他们</Button>
      {/* <Text
        color={textColorSecondary}
        fontSize='md'
        maxW={{ base: "100%", xl: "80%", "3xl": "60%" }}
        mx='auto'
        my='auto'>
        增加、删除或修改他们
      </Text> */}
    </Card>
  );
}
