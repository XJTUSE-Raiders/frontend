// Chakra imports
import {
  Box,
  Flex,
  Text,
  useColorModeValue,
  useBoolean,
  Spacer,
  Skeleton,
} from '@chakra-ui/react'
// Custom components
import Card from 'components/card/Card.js'
import PieChart from 'components/charts/PieChart'
import { React, useMemo, useState } from 'react'
import CardwithModal from './CardwithModal'
import ModeSwitch from './ModeSwitch'
import { api } from 'variables/api'
import { useQuery } from '@tanstack/react-query'
import { CalendarMenu, timeStepToSeconds } from './CalendarMenu'
import { pieChartOptions } from 'variables/charts'
import ReactApexChart from 'react-apexcharts'

function fetchBrowserDistro(isTraffic, timeStep) {
  const type = isTraffic ? 'traffic' : 'request';
  return api.get('data/browser', {
    searchParams: {
      type,
      step: timeStep
    }
  }).json().then(({ data }) => {
    const { series, acc } = data;
    const idx = series.indexOf("其他");
    if (idx !== -1) {
      return {
        series: [...series.slice(0, idx), ...series.slice(idx + 1)],
        acc: [...acc.slice(0, idx), ...acc.slice(idx + 1)],
      }
    }
    return data;
  })
}

export default function BrowserDistro(props) {
  const { tableConfig, tableData, ...rest } = props

  // Chakra Color Mode
  const textColor = useColorModeValue('secondaryGray.900', 'white')
  const cardColor = useColorModeValue('white', 'navy.700')
  const cardShadow = useColorModeValue(
    '0px 18px 40px rgba(112, 144, 176, 0.12)',
    'unset'
  )

  // States
  const [isTraffic, isTrafficControl] = useBoolean(false);
  const [timeStep, setTimeStep] = useState('month');
  const { data, remove, isLoading } = useQuery({
    queryKey: ['BrowserDistro', isTraffic, timeStep],
    queryFn: () => fetchBrowserDistro(isTraffic, timeStep),
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
      ...pieChartOptions,
      labels: series,
    }
  }, [data, isLoading]);

  const chartData = useMemo(() => {
    if (isLoading) return null;
    if (!data) return null;

    const { acc } = data;

    return acc;
  }, [data, isLoading]);

  const handleTimeStepChange = (val) => {
    remove();
    setTimeStep(val);
  }

  // Immediate computed
  const pending = isLoading || chartOptions === null || chartData === null;

  return (
    <Card
      // tableConfig={tableConfig}
      // tableData={tableData}
      // tableName='浏览器类型分布详表'
      p='20px'
      align='center'
      direction='column'
      w='100%'
      {...rest}
    >
      <Flex
        px={{ base: '0px', '2xl': '10px' }}
        justifyContent='space-between'
        alignItems='center'
        w='100%'
        mb='8px'
      >
        <Text color={textColor} fontSize='md' fontWeight='600' mt='4px'>
          客户浏览器分布
        </Text>
        <Spacer />
        <Flex direction='column'>
          <ModeSwitch isTraffic={isTraffic} onClick={isTrafficControl.toggle} />
          <CalendarMenu value={timeStep} onChange={handleTimeStepChange} />
        </Flex>
      </Flex>

      {pending ? <Skeleton h="100%" /> : (
        <ReactApexChart
          options={chartOptions}
          series={chartData}
          type='pie'
          width='100%'
        />
      )}
    </Card>
  )
}
