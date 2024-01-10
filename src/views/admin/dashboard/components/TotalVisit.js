// Chakra imports
import { Box, Flex, Skeleton, Spacer, Text, useBoolean, useColorModeValue } from '@chakra-ui/react'
// Custom components
import Card from 'components/card/Card.js'
// import LineChart from 'components/charts/LineChart'
import { React, useMemo, useState } from 'react'
// import { IoCheckmarkCircle } from 'react-icons/io5'
import { CalendarMenu } from 'views/admin/dashboard/components/CalendarMenu'
import ModeSwitch from './ModeSwitch'
import { useQuery } from '@tanstack/react-query'
import { api } from 'variables/api'
import { timeStepToSeconds, timeStepShorterFn, timeStepLimiter } from './CalendarMenu'
import { lineChartOptionsTotalVisit } from 'variables/charts'
import ReactApexChart from "react-apexcharts";
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

function fetchTotalVisit(isTraffic, timeStep) {
  const type = isTraffic ? 'traffic' : 'request';
  return api.get('data/visits', {
    searchParams: {
      type,
      step: timeStep
    }
  }).json().then(({ data }) => data)
}

export default function TotalVisit(props) {
  const { ...rest } = props;

  // Chakra Color Mode
  const textColor = useColorModeValue('secondaryGray.900', 'white');

  // States
  const [isTraffic, isTrafficControl] = useBoolean(false);
  const [timeStep, setTimeStep] = useState('minute');
  const { data, remove, isLoading } = useQuery({
    queryKey: ['totalVisit', isTraffic, timeStep],
    queryFn: () => fetchTotalVisit(isTraffic, timeStep),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchInterval: (_data, { queryKey }) => timeStepToSeconds(queryKey[2]) * 1000,
  });

  // Memorized computed
  const chartOptions = useMemo(() => {
    if (isLoading) return null;
    if (!data) return null;

    const { time } = data;

    const fn = timeStepShorterFn(timeStep);
    const limit = timeStepLimiter(timeStep)
    const shortTime = limit(time).map((t) => fn(t.split(/[-: ]/)));

    // lineChartOptionsTotalVisit.xaxis.categories = time;
    return {
      ...lineChartOptionsTotalVisit,
      xaxis: {
        categories: shortTime,
      },
    }
  }, [data, isLoading, timeStep]);

  const chartData = useMemo(() => {
    if (isLoading) return null;
    if (!data) return null;

    const { acc, via_app } = data;
    const limit = timeStepLimiter(timeStep)

    return [
      {
        name: '总访问量',
        data: limit(acc),
      },
      {
        name: 'APP 访问量',
        data: limit(via_app),
      },
    ];
  }, [data, isLoading, timeStep]);

  const handleTimeStepChange = (val) => {
    remove();
    setTimeStep(val);
  }

  // Immediate computed
  const pending = isLoading || chartOptions === null || chartData === null;

  return (
    <Card
      justifyContent='center'
      align='center'
      direction='column'
      w='100%'
      mb='0px'
      {...rest}
    >
      <Flex justify='space-between' ps='0px' pe='20px' pt='5px'>
        <Flex w='100%' align="center">
          <Text
              color={textColor}
              fontSize='23px'
              textAlign='start'
              fontWeight='700'
              lineHeight='100%'
            >
            访问量趋势
          </Text>
          <Spacer />
          <Flex direction='column'>
            <ModeSwitch isTraffic={isTraffic} onClick={isTrafficControl.toggle} />
            <CalendarMenu value={timeStep} onChange={handleTimeStepChange} />
          </Flex>
        </Flex>
      </Flex>
      <Flex w='100%' flexDirection={{ base: 'column', lg: 'row' }} mt="10px">
        {/* <Flex flexDirection='column' me='20px' mt='28px'>
          <Text
            color={textColor}
            fontSize='23px'
            textAlign='start'
            fontWeight='700'
            lineHeight='100%'
          >
            访问量趋势
          </Text>
          <Flex align='center' mb='20px'>
            <Text
              color='secondaryGray.600'
              fontSize='sm'
              fontWeight='500'
              mt='4px'
              me='12px'
            >
              Visit on trend
            </Text>
          </Flex>

          <Flex align='center'>
            <Icon as={IoCheckmarkCircle} color='green.500' me='4px' />
            <Text color='green.500' fontSize='md' fontWeight='700'>
              On track
            </Text>
          </Flex>
        </Flex> */}

        <Box minH='260px' w="100%" mt='auto'>
          {pending ? <Skeleton h="260px" /> : (
            <ReactApexChart
              options={chartOptions}
              series={chartData}
              type='line'
              width='100%'
              height='100%'
            />
          )}
        </Box>
      </Flex>
      {/* <ReactQueryDevtools initialIsOpen /> */}
    </Card>
  )
}
