import React, { useState, useMemo } from 'react'

// Chakra imports
import {
  Box,
  Flex,
  Text,
  Spacer,
  useColorModeValue,
  useBoolean,
  Skeleton,
} from '@chakra-ui/react'

import {
  barChartOptionsPopularURI,
} from "variables/charts";
// Custom components
import { CalendarMenu, timeStepToSeconds } from './CalendarMenu'
// import CardwithModal from './CardwithModal'
import Card from 'components/card/Card.js'
import ModeSwitch from './ModeSwitch'
import { useQuery } from '@tanstack/react-query'
import { api } from 'variables/api';
import Chart from 'react-apexcharts';

function fetchPopularURI(isTraffic, timeStep) {
  const type = isTraffic ? 'traffic' : 'request';
  return api.get('data/uri', {
    searchParams: {
      type,
      step: timeStep
    }
  }).json().then(({ data }) => data);
}

export default function PopularURI(props) {
  const { tableConfig, tableData, ...rest } = props

  // Chakra Color Mode
  const textColor = useColorModeValue('secondaryGray.900', 'white');

  // States
  const [isTraffic, isTrafficControl] = useBoolean(false);
  const [timeStep, setTimeStep] = useState('month');
  const { data, remove, isLoading } = useQuery({
    queryKey: ['PopularURI', isTraffic, timeStep],
    queryFn: () => fetchPopularURI(isTraffic, timeStep),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchInterval: (_data, { queryKey }) => timeStepToSeconds(queryKey[2]) * 1000,
  });

  // Memorized computed
  const chartOptions = useMemo(() => {
    if (isLoading) return null;
    if (!data) return null;

    const { series } = data;

    return {
      ...barChartOptionsPopularURI,
      xaxis: {
        categories: series,
      },
    }
  }, [data, isLoading]);

  const chartData = useMemo(() => {
    if (isLoading) return null;
    if (!data) return null;

    const { acc } = data;

    return [{
      name: isTraffic ? '流量 (bytes)' : '请求数',
      data: acc,
    }];
  }, [data, isLoading, isTraffic]);

  const handleTimeStepChange = (val) => {
    remove();
    setTimeStep(val);
  }

  // Immediate computed
  const pending = isLoading || chartOptions === null || chartData === null;

  return (
    <Card
      align='center'
      direction='column'
      w='100%'
      // tableConfig={tableConfig}
      // tableData={tableData}
      // tableName='最常访问 URI 详表'
      {...rest}
    >
      <Flex justify='space-between' px='10px' pt='5px'>
        <Flex w='100%' align="center">
          <Text
            color={textColor}
            fontSize='23px'
            textAlign='start'
            fontWeight='700'
            lineHeight='100%'
          >
            热门 URI
          </Text>
          <Spacer />
          <Flex direction='column'>
            <ModeSwitch isTraffic={isTraffic} onClick={isTrafficControl.toggle} />
            <CalendarMenu value={timeStep} onChange={handleTimeStepChange} />
          </Flex>
        </Flex>
      </Flex>

      <Box h='240px' mt='10px'>
        {pending ? <Skeleton h="100%" /> : (
          <Chart
            options={chartOptions}
            series={chartData}
            type='bar'
            width='100%'
            height='100%'
          />
        )}
      </Box>
    </Card>
  )
}
