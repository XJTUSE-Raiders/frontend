import {
  Box,
  Icon,
  SimpleGrid,
  useColorModeValue,
} from "@chakra-ui/react";
import MiniStatistics from "components/card/MiniStatistics";
import IconBox from "components/icons/IconBox";
import React from "react";
import TotalVisit from "views/admin/dashboard/components/TotalVisit";
import ISPDistro from "views/admin/dashboard/components/ISPDistro";
import GeoDistro from "views/admin/dashboard/components/GeoDistro";
import BroswerDistro from "views/admin/dashboard/components/BroswerDistro";
import OSDistro from "views/admin/dashboard/components/OSDistro";
import PopularURI from "views/admin/dashboard/components/PopularURI";
import ResponseCode from "views/admin/dashboard/components/ResponseCode";

import {GeoConfig} from "views/admin/dashboard/varibles/chart/GeoConfig";
import GeoData from "views/admin/dashboard/varibles/chart/GeoData.json";
import {CodeChartConfig} from "views/admin/dashboard/varibles/chart/CodeConfig";
import CodeChartData from "views/admin/dashboard/varibles/chart/CodeData.json";
import {URITableConfig} from "views/admin/dashboard/varibles/table/URIConfig";
import URITableData from "views/admin/dashboard/varibles/table/URIData.json";
import { pieChartData, pieChartOptions } from 'variables/charts'
import {
  barChartDataDailyTraffic,
  barChartOptionsDailyTraffic,
} from "variables/charts";
import {
  barChartDataConsumption,
  barChartOptionsConsumption,
} from "variables/charts";
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
      <SimpleGrid columns={{base:1,md:1,xl:2}}  gap='20px' mb='20px'>
          <TotalVisit />
          <ISPDistro 
            chartData={barChartDataConsumption}
            chartConfig={barChartOptionsConsumption}
            tableConfig={URITableConfig}
            tableData={URITableData}
          />
      </SimpleGrid>
      <SimpleGrid columns={{base:1, md:2, xl:3}} gap='20px' mb='20px'>
          <OSDistro 
            chartData={pieChartData}
            chartConfig={pieChartOptions}
            tableConfig={URITableConfig}
            tableData={URITableData}
          />
          <GeoDistro 
            chartData={GeoData}
            chartConfig={GeoConfig}
            tableConfig={URITableConfig}
            tableData={URITableData}
          />
          <BroswerDistro 
            chartData={pieChartData}
            chartConfig={pieChartOptions}
            tableConfig={URITableConfig}
            tableData={URITableData}
          />
      </SimpleGrid>
      <SimpleGrid columns={{base:1, md:2, xl:2}} gap='20px' mb='20px'>
          <PopularURI 
            tableConfig={URITableConfig}
            tableData={URITableData}
            chartOptions={barChartOptionsDailyTraffic}
            chartData={barChartDataDailyTraffic}
          />
          <ResponseCode 
            chartConfig={CodeChartConfig}
            chartData={CodeChartData}
            tableConfig={URITableConfig}
            tableData={URITableData}
          />
      </SimpleGrid>
    </Box>
  )
}