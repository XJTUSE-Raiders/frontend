// Chakra imports
import { Box, Flex, Text, useColorModeValue, useBoolean, Skeleton, Spacer } from '@chakra-ui/react'
// Custom components
// import BarChart from 'components/charts/BarChart'
import React, { useState, useMemo } from 'react'
import {
  // barChartDataConsumption,
  heatmapChartOptions
} from 'variables/charts'
import { CalendarMenu, timeStepToSeconds, timeStepShorterFn, timeStepLimiter } from './CalendarMenuRT'
// import CardwithModal from './CardwithModal'
import Card from 'components/card/Card.js'
import ModeSwitch from './ModeSwitch'
import { api } from 'variables/api'
import { useQuery } from '@tanstack/react-query'
import Chart from 'react-apexcharts'


function fetchISPDistro(isTraffic, timeStep) {
  const type = isTraffic ? 'traffic' : 'request';
  return api.get('data/isp', {
    searchParams: {
      type,
      step: timeStep
    }
  }).json().then(({ data }) => data)
}

export default function ISPDistro(props) {
  const { tableConfig, tableData, ...rest } = props

  // Chakra Color Mode
  const textColor = useColorModeValue('secondaryGray.900', 'white')

  // States
  const [isTraffic, isTrafficControl] = useBoolean(false);
  const [timeStep, setTimeStep] = useState('minute');
  const { data, remove, isLoading } = useQuery({
    queryKey: ['ISPDistro', isTraffic, timeStep],
    queryFn: () => fetchISPDistro(isTraffic, timeStep),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchInterval: (_data, { queryKey }) => timeStepToSeconds(queryKey[2]) * 1000,
  });

  // Memorized computed
  const chartOptions = useMemo(() => {
    if (isLoading) return null;
    if (!data) return null;

    const time = Object.keys(data);

    const fn = timeStepShorterFn(timeStep);
    const limit = timeStepLimiter(timeStep)
    const shortTime = limit(time).map((t) => fn(t.split(/[-: ]/)));

    // heatmapChartOptions.xaxis.categories = time;
    return {
      ...heatmapChartOptions,
      xaxis: {
        categories: shortTime,
      },
    };
  }, [data, isLoading, timeStep]);
  // const chartOptions = heatmapChartOptions;

  const chartData = useMemo(() => {
    if (isLoading) return null;
    if (!data) return null;

    // const fn = timeStepShorterFn(timeStep);
    const limit = timeStepLimiter(timeStep)
    const ispVisitList = limit(Object.values(data));
    const viewableIsp = new Set();
    for (const ispVisit of ispVisitList) {
      Object.keys(ispVisit).forEach((isp) => {
        viewableIsp.add(isp);
      });
    }

    return [...viewableIsp].sort().map((isp) => ({
      name: isp,
      data: ispVisitList.map((ispVisit) => ispVisit[isp] ?? 0),
    }));
    // return limit(Object.entries(data)).map(([time, ispVisit]) => ({
    //   name: fn(time),
    //   data: Object.entries(ispVisit).map(([isp, visit]) => ({
    //     x: isp,
    //     y: visit,
    //   })),
    // }));
  }, [data, isLoading, timeStep]);

  // Immediate computed
  const pending = isLoading// || chartOptions === null || chartData === null;

  const handleTimeStepChange = (val) => {
    remove();
    setTimeStep(val);
  };

  return (
    <Card
      // tableConfig={tableConfig}
      // tableData={tableData}
      // tableName='运营商分布详表'
      align='center'
      direction='column'
      w='100%'
      {...rest}
    >
      <Flex align='center' w='100%' px='15px' py='10px'>
        <Text
          color={textColor}
          fontSize='23px'
          textAlign='start'
          fontWeight='700'
          lineHeight='100%'
        >
          运营商热力图
        </Text>
        <Spacer />
        <Flex direction='column'>
          <ModeSwitch isTraffic={isTraffic} onClick={isTrafficControl.toggle} />
          <CalendarMenu value={timeStep} onChange={handleTimeStepChange} />
        </Flex>
      </Flex>

      <Box h='240px' mt='auto'>
        {pending ? <Skeleton h="100%" /> : (
          <Chart
            options={chartOptions}
            series={chartData}
            type='heatmap'
            width='100%'
            height='100%'
          />
        )}
      </Box>
    </Card>
  )
}
