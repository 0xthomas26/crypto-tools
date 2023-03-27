import React from 'react';
import useSWR from 'swr';
import Image from 'next/image';
import { Stack, Typography } from '@mui/material';
import { fetcher } from '../src/fetcher';

const formatterOver0 = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
});

const CryptoPrices = () => {
    const { data, error, isLoading } = useSWR(
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false',
        fetcher,
        { refreshInterval: 5000 }
    );

    return (
        <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
            {isLoading ? (
                <Typography>loading...</Typography>
            ) : (
                <Stack direction="row" spacing={2} alignItems="center" overflow="auto" style={{}}>
                    {data?.slice(0, 10).map((elem: any, key: number) => {
                        return (
                            <div
                                style={{
                                    backgroundColor: '#1E1F25',
                                    borderRadius: '10px',
                                    padding: '10px',
                                    minWidth: '150px',
                                }}
                                key={key}
                            >
                                <Image
                                    src={elem.image}
                                    alt={`${elem.name}-${key}`}
                                    width={25}
                                    height={25}
                                    style={{ objectFit: 'contain', marginRight: '10px' }}
                                />
                                <Typography>{`${elem.symbol.toUpperCase()} `}</Typography>
                                <div
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                    }}
                                >
                                    <Typography>{`$${formatterOver0.format(elem.current_price)}`} </Typography>
                                    <span
                                        style={{
                                            color: elem.market_cap_change_percentage_24h >= 0 ? 'green' : 'red',
                                        }}
                                    >{`${formatterOver0.format(elem.market_cap_change_percentage_24h)}%`}</span>
                                </div>
                            </div>
                        );
                    })}
                </Stack>
            )}
        </div>
    );
};

export default CryptoPrices;
