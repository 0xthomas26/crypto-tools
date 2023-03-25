import { Info, InfoOutlined } from '@mui/icons-material';
import { Card, CardContent, Typography, useTheme, Stack, IconButton, CircularProgress } from '@mui/material';
import { useState } from 'react';
import { useBalance } from '../src/hooks/usePortfolio';
import ValueInformations from './ValueInformations';

type PortfolioTypes = {
    walletAddress: string;
};

const formatter = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
});

const Portfolio = ({ walletAddress }: PortfolioTypes) => {
    const [open, setOpen] = useState(false);
    const theme = useTheme();
    const { balances } = useBalance(walletAddress);

    if (!balances)
        return (
            <div
                style={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <CircularProgress size={30} />
                <Typography variant="body2">fetching data...</Typography>
            </div>
        );

    return (
        <Card style={{ backgroundColor: '#1E1F25', borderRadius: '10px' }}>
            <CardContent>
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <Typography variant="h2" style={{ fontSize: '28px', marginRight: '10px' }}>
                        Total value
                    </Typography>
                    <IconButton onClick={() => setOpen(true)}>
                        <InfoOutlined />
                    </IconButton>
                    <ValueInformations open={open} setOpen={setOpen} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <Typography
                        variant="body1"
                        style={{ fontWeight: 'bold', fontSize: '40px', marginRight: '10px' }}
                    >{`$${
                        balances ? formatter.format(balances?.data?.attributes?.total?.positions) : '...'
                    }`}</Typography>
                    <Typography
                        variant="body1"
                        style={{ color: balances?.data?.attributes?.changes?.absolute_1d >= 0 ? 'green' : 'red' }}
                    >
                        {`${formatter.format(balances?.data?.attributes?.changes?.percent_1d)}% ($${formatter.format(
                            balances?.data?.attributes?.changes?.absolute_1d
                        )})`}
                    </Typography>
                </div>
                <Stack direction="row" spacing={2} alignItems="center" overflow="auto">
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            backgroundColor: '#405BBB',
                            padding: '10px',
                            borderRadius: '10px',
                            marginTop: '10px',
                        }}
                    >
                        <Typography variant="body1" style={{ marginRight: '5px' }}>
                            Wallet
                        </Typography>
                        <Typography variant="body2" style={{ fontWeight: 'bold' }}>
                            {`$${formatter.format(balances?.data?.attributes?.positions_distribution_by_type?.wallet)}`}
                        </Typography>
                    </div>
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            backgroundColor: '#405BBB',
                            padding: '10px',
                            borderRadius: '10px',
                            marginTop: '10px',
                        }}
                    >
                        <Typography variant="body1" style={{ marginRight: '5px' }}>
                            Stacked
                        </Typography>
                        <Typography variant="body2" style={{ fontWeight: 'bold' }}>
                            {`$${formatter.format(balances?.data?.attributes?.positions_distribution_by_type?.staked)}`}
                        </Typography>
                    </div>
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            backgroundColor: '#405BBB',
                            padding: '10px',
                            borderRadius: '10px',
                            marginTop: '10px',
                        }}
                    >
                        <Typography variant="body1" style={{ marginRight: '5px' }}>
                            Borrowed
                        </Typography>
                        <Typography variant="body2" style={{ fontWeight: 'bold' }}>
                            {`$${formatter.format(
                                balances?.data?.attributes?.positions_distribution_by_type?.borrowed
                            )}`}
                        </Typography>
                    </div>
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            backgroundColor: '#405BBB',
                            padding: '10px',
                            borderRadius: '10px',
                            marginTop: '10px',
                        }}
                    >
                        <Typography variant="body1" style={{ marginRight: '5px' }}>
                            Deposited
                        </Typography>
                        <Typography variant="body2" style={{ fontWeight: 'bold' }}>
                            {`$${formatter.format(
                                balances?.data?.attributes?.positions_distribution_by_type?.deposited
                            )}`}
                        </Typography>
                    </div>
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            backgroundColor: '#405BBB',
                            padding: '10px',
                            borderRadius: '10px',
                            marginTop: '10px',
                        }}
                    >
                        <Typography variant="body1" style={{ marginRight: '5px' }}>
                            Locked
                        </Typography>
                        <Typography variant="body2" style={{ fontWeight: 'bold' }}>
                            {`$${formatter.format(balances?.data?.attributes?.positions_distribution_by_type?.locked)}`}
                        </Typography>
                    </div>
                </Stack>
            </CardContent>
        </Card>
    );
};

export default Portfolio;
