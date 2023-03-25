import '@/styles/globals.css';
import React from 'react';
import type { AppProps } from 'next/app';
import { darkTheme } from '../styles/theme';
import { createTheme, ThemeProvider, responsiveFontSizes } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import useMediaQuery from '@mui/material/useMediaQuery';
import { WagmiConfig, createClient, configureChains } from 'wagmi';
import { avalanche, bsc, mainnet, polygon, arbitrum } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';

export default function App({ Component, pageProps }: AppProps) {
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

    let theme = React.useMemo(
        () =>
            createTheme({
                typography: {
                    fontFamily: `"Inter", "Lato", sans-serif`,
                    h1: {
                        fontSize: '50px',
                        fontWeight: '900',
                        fontFamily: ['"Inter"', 'sans-serif'].join(','),
                    },
                    h2: {
                        fontSize: '35px',
                        fontFamily: [
                            '"Inter"', //Poppins
                            'sans-serif',
                        ].join(','),
                        fontWeight: '800',
                    },
                    h3: {
                        fontSize: '20px',
                        fontFamily: ['"Inter"', 'sans-serif'].join(','),
                        fontWeight: '800',
                    },
                    h4: {
                        fontSize: '20px',
                        fontFamily: ['"Inter"', 'sans-serif'].join(','),
                    },
                    body1: {
                        fontSize: '18px',
                        fontFamily: ['"Lato"', 'sans-serif'].join(','),
                        fontWeight: '400',
                    },
                    body2: {
                        fontSize: '14px',
                        fontFamily: ['"Lato"', 'sans-serif'].join(','),
                        fontWeight: '400',
                    },
                },
                palette: {
                    mode: prefersDarkMode ? 'dark' : 'light',
                },
            }),
        [prefersDarkMode]
    );

    theme = responsiveFontSizes(theme);

    const { chains, provider, webSocketProvider } = configureChains(
        [polygon, mainnet, avalanche, bsc, arbitrum],
        [publicProvider()]
    );

    const client = createClient({
        autoConnect: true,
        connectors: [
            new MetaMaskConnector({ chains }),
            new CoinbaseWalletConnector({
                chains,
                options: {
                    appName: 'Crypto Tools',
                },
            }),
            new WalletConnectConnector({
                chains,
                options: {
                    projectId: '6dc5f6f00365e811108babd8ffa8585b',
                    showQrModal: true,
                },
            }),
        ],
        provider,
        webSocketProvider,
    });

    return (
        <ThemeProvider theme={theme}>
            <WagmiConfig client={client}>
                <CssBaseline />
                <Component {...pageProps} />
            </WagmiConfig>
        </ThemeProvider>
    );
}
