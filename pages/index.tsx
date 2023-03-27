import React, { useState } from 'react';
import { Tabs, useMediaQuery, useTheme, Tab } from '@mui/material';
import CryptoPrices from '../components/CryptoPrices';
import Navbar from '../components/Navbar';
import NFTs from '../components/NFTs';
import Portfolio from '../components/Portfolio';
import Positions from '../components/Positions';
import TransactionsHistory from '../components/TransactionsHistory';
import WalletConnect from '../components/WalletConnect';
import { useMe } from '@/src/hooks/useAccount';
import TabPanel from '@/components/TabPanel';

const Home = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [value, setValue] = useState(0);
    const { user } = useMe();

    return (
        <div>
            <Navbar />
            <div
                style={{
                    padding: '5%',
                    marginLeft: isMobile ? '0' : '230px',
                    maxWidth: '100%',
                    paddingTop: '30px',
                }}
            >
                <h1>Portfolio</h1>
                <section id="portfolio" style={{ marginTop: '40px' }}>
                    {user && <Portfolio walletAddress={user?.account} />}
                </section>
                {user && (
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
                                marginTop: '40px',
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
                            <Tab
                                label="History"
                                style={{
                                    textTransform: 'none',
                                    fontSize: '18px',
                                }}
                            />
                        </Tabs>
                        <TabPanel value={value} index={0}>
                            <section id="positions" style={{ marginTop: '40px' }}>
                                <Positions walletAddress={user?.account} />
                            </section>
                        </TabPanel>
                        <TabPanel value={value} index={1}>
                            <section id="nfts" style={{ marginTop: '40px' }}>
                                <NFTs />
                            </section>
                        </TabPanel>
                        <TabPanel value={value} index={2}>
                            <section id="history" style={{ marginTop: '40px' }}>
                                <TransactionsHistory />
                            </section>
                        </TabPanel>
                    </div>
                )}
                {!user && (
                    <div style={{ marginTop: '40px' }}>
                        <WalletConnect />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;
