import { Close } from '@mui/icons-material';
import { Tabs, Dialog, DialogContent, Divider, Tab, Typography, Grid, IconButton } from '@mui/material';
import { useState } from 'react';
import TabPanel from './TabPanel';
import Image from 'next/image';

type ValueInformationsTypes = {
    open: boolean;
    setOpen: any;
};

const networks = [
    { name: 'Ethereum', image: '/images/ethereum.png' },
    { name: 'Arbitrum', image: '/images/arbitrum.png' },
    { name: 'Aurora', image: '/images/aurora.png' },
    { name: 'Avalanche', image: '/images/avalanche.png' },
    { name: 'BSC', image: '/images/bsc.png' },
    { name: 'Fantom', image: '/images/fantom.png' },
    { name: 'Gnosis Chain', image: '/images/xdai.png' },
    { name: 'Optimism', image: '/images/optimism.png' },
    { name: 'Polygon', image: '/images/polygon.png' },
    { name: 'Solana', image: '/images/solana.png' },
];

const networksNFTs = [
    { name: 'Ethereum', image: '/images/ethereum.png' },
    { name: 'Arbitrum', image: '/images/arbitrum.png' },
    { name: 'Avalanche', image: '/images/avalanche.png' },
    { name: 'BSC', image: '/images/bsc.png' },
    { name: 'Polygon', image: '/images/polygon.png' },
];

const ValueInformations = ({ open, setOpen }: ValueInformationsTypes) => {
    const [value, setValue] = useState(0);

    return (
        <Dialog open={open} onClose={() => setOpen(false)}>
            <DialogContent>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}
                >
                    <Typography variant="h3" style={{ fontWeight: 'bold' }}>
                        Supported networks
                    </Typography>
                    <IconButton onClick={() => setOpen(false)}>
                        <Close />
                    </IconButton>
                </div>
                <Divider style={{ marginTop: '10px', marginBottom: '10px' }} />
                <Typography variant="body1">Once you start using a network, assets appear on the dashboard.</Typography>
                <div>
                    <Tabs
                        value={value}
                        variant="scrollable"
                        onChange={(e, newV) => {
                            setValue(newV);
                        }}
                        aria-label="tabs"
                        style={{
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginTop: '20px',
                            borderBottom: '1px lightgray solid',
                        }}
                        scrollButtons="auto"
                        TabIndicatorProps={{ style: { background: 'black' } }}
                    >
                        <Tab
                            label="Tokens"
                            style={{
                                textTransform: 'none',
                                fontSize: '18px',
                            }}
                        />
                        <Tab
                            label="NFTs"
                            style={{
                                textTransform: 'none',
                                fontSize: '18px',
                            }}
                        />
                    </Tabs>
                    <TabPanel value={value} index={0}>
                        <section id="tokens" style={{ marginTop: '10px' }}>
                            <Grid container spacing={2}>
                                {networks.map((elem: any, key: number) => (
                                    <Grid item key={key} xs={6}>
                                        <div
                                            style={{
                                                display: 'flex',
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                                padding: '10px',
                                                border: '1px solid',
                                                borderRadius: '10px',
                                            }}
                                        >
                                            <Image src={elem.image} alt={elem.name} width={20} height={20} />
                                            <Typography
                                                variant="body1"
                                                style={{ marginLeft: '10px', fontWeight: 'bold' }}
                                            >
                                                {elem.name}
                                            </Typography>
                                        </div>
                                    </Grid>
                                ))}
                            </Grid>
                        </section>
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <section id="nfts" style={{ marginTop: '10px' }}>
                            <Grid container spacing={2}>
                                {networksNFTs.map((elem: any, key: number) => (
                                    <Grid item key={key} xs={6}>
                                        <div
                                            style={{
                                                display: 'flex',
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                                padding: '10px',
                                                border: '1px solid',
                                                borderRadius: '10px',
                                            }}
                                        >
                                            <Image src={elem.image} alt={elem.name} width={20} height={20} />
                                            <Typography
                                                variant="body1"
                                                style={{ marginLeft: '10px', fontWeight: 'bold' }}
                                            >
                                                {elem.name}
                                            </Typography>
                                        </div>
                                    </Grid>
                                ))}
                            </Grid>
                        </section>
                    </TabPanel>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default ValueInformations;
