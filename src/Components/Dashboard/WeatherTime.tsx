import React from 'react';
import { gql, useQuery } from '@apollo/client';
import {
    ClockIcon,
    CloudyIcon,
    HumidityIcon,
    PoPIcon,
} from '../../Icons/Icons';
import { Flex, Text } from '@chakra-ui/react';
import dayjs from 'dayjs';

const QUERY_WEATHER = gql`
    query weather($siteId: String!) {
        weather(siteId: $siteId) {
            temp
            humidity
            PoP
        }
    }
`;

interface IWeather {
    temp: string;
    humidity: string;
    PoP: string;
}

const weatherFlexStyle: React.CSSProperties = {
    height: '20px',
    alignItems: 'center',
    padding: '0.25rem',
    gap: '0.25rem',
};

export default function WeatherTime(props: { siteId: string }) {
    const { siteId } = props;
    const [date, setDate] = React.useState<dayjs.Dayjs>(dayjs());
    const [weather, setWeather] = React.useState<IWeather>({
        temp: '-',
        humidity: '-',
        PoP: '-',
    });

    useQuery(QUERY_WEATHER, {
        variables: {
            siteId: siteId,
        },
        onCompleted: ({ weather }) => {
            setWeather(weather);
        },
        onError: (err) => {
            console.log(err);
        },
    });

    React.useEffect(() => {
        const clockInterval = setInterval(() => setDate(dayjs()), 1000);
        return () => clearInterval(clockInterval);
    }, []);

    return (
        <Flex gap={'10px'}>
            <Flex align={'flex-end'} pb={'0.25rem'}>
                <Flex style={weatherFlexStyle}>
                    <ClockIcon />
                    <Text variant={'w400s14'} width={'40px'}>
                        {date.format('HH:mm')}
                    </Text>
                </Flex>
                <Flex style={weatherFlexStyle}>
                    <CloudyIcon />
                    <Text variant={'w400s14'} width={'40px'}>
                        {weather.temp.split('.')[0]} ℃
                    </Text>
                </Flex>
                <Flex style={weatherFlexStyle}>
                    <HumidityIcon />
                    <Text variant={'w400s14'} width={'40px'}>
                        {weather.humidity} %
                    </Text>
                </Flex>
                <Flex style={weatherFlexStyle}>
                    <PoPIcon />
                    <Text variant={'w400s14'} width={'40px'}>
                        {weather.PoP} %
                    </Text>
                </Flex>
            </Flex>
            <Text variant={'pageTitle'}>{date.format('YYYY/MM/DD')}</Text>
        </Flex>
    );
}
