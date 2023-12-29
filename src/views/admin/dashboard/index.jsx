import {
  Avatar,
  Box,
  Flex,
  FormLabel,
  Icon,
  Select,
  SimpleGrid,
  useColorModeValue,
} from "@chakra-ui/react";
import Usa from "assets/img/dashboards/usa.png";
import MiniStatistics from "components/card/MiniStatistics";
import IconBox from "components/icons/IconBox";
import React from "react";
import {
  MdAddTask,
  MdAttachMoney,
  MdBarChart,
  MdFileCopy,
} from "react-icons/md";
import { 
  FcReadingEbook,
  FcClock,
  FcBullish
 } from "react-icons/fc";
export default function DashReports() {
  const brandColor = useColorModeValue("brand.500", "white");
  const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <SimpleGrid
        columns={{ base: 1, md: 2, lg: 3}}
        gap='20px'
        mb='20px'>
        <MiniStatistics
          startContent={
            <IconBox
              w='56px'
              h='56px'
              bg={boxBg}
              icon={
                <Icon w='32px' h='32px' as={FcReadingEbook} color={brandColor} />
              }
            />
          }
          name='24 小时内访问人数'
          value='100'
        />
        <MiniStatistics
          startContent={
            <IconBox
              w='56px'
              h='56px'
              bg={boxBg}
              icon={
                <Icon w='32px' h='32px' as={FcClock} color={brandColor} />
              }
            />
          }
          name='每分钟访问量'
          value='64239'
        />
        <MiniStatistics 
          growth='+15%' 
          startContent={
            <IconBox
            w='56px'
            h='56px'
            bg={boxBg}
              icon={
                <Icon w='32px' h='32px' as={FcBullish} color={brandColor} />
              }
              />
          }

          name='本月总访问量' 
          value='57434' />
      </SimpleGrid>
      
    </Box>
  )
}