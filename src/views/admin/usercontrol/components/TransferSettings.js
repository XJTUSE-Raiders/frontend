// Chakra imports
import {
  Box,
  Button,
  Flex,
  Icon,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
// Custom components
import Card from "components/card/Card.js";
import React from "react";
// Assets
import { MdUpload } from "react-icons/md";
import Dropzone from "views/admin/profile/components/Dropzone";

export default function Upload(props) {
  const { used, total, ...rest } = props;
  // Chakra Color Mode
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const brandColor = useColorModeValue("brand.500", "white");
  const textColorSecondary = "gray.400";
  return (
    <Card {...rest} mb='20px' align='center' p='20px'>
      <Flex h='100%' direction={{ base: "column", "2xl": "row" }}>
        <Dropzone
          w={{ base: "100%", "2xl": "268px" }}
          me='36px'
          maxH={{ base: "60%", lg: "50%", "2xl": "100%" }}
          minH={{ base: "60%", lg: "50%", "2xl": "100%" }}
          content={
            <Box>
              <Icon as={MdUpload} w='80px' h='80px' color={brandColor} />
              <Flex justify='center' mx='auto' mb='12px'>
                <Text fontSize='xl' fontWeight='700' color={brandColor}>
                  上传你的配置文件
                </Text>
              </Flex>
              <Text fontSize='sm' fontWeight='500' color='secondaryGray.500'>
                需要严格按照格式
              </Text>
            </Box>
          }
        />
        <Flex direction='column' pe='44px'>
          <Text
            color={textColorPrimary}
            fontWeight='bold'
            textAlign='start'
            fontSize='2xl'
            mt={{ base: "20px", "2xl": "50px" }}>
            上传和下载用户与权限组配置
          </Text>
          <Text
            color={textColorSecondary}
            fontSize='md'
            my={{ base: "auto", "2xl": "10px" }}
            mx='auto'
            textAlign='start'>
            上传后会覆盖现有配置，请谨慎操作！
          </Text>
          <Flex w='100%'>
            <Button
              mb='auto'
              mr='10px'
              
              w='120px'
              minW='auto'
              mt='auto'
              variant='brand'
              fontWeight='500'>
              上传配置
            </Button>
            <Button
              mb='auto'
              w='120px'
              minW='auto'
              mt='auto'
              variant='brand'
              fontWeight='500'>
              下载配置
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </Card>
  );
}
