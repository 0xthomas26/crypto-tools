import React, { useState } from 'react';
import { useConnect, useSignMessage, useAccount, useDisconnect } from 'wagmi';
import Image from 'next/image';
import { Grid, Button, Typography, CircularProgress, TextField, InputAdornment, useTheme } from '@mui/material';
import { getChallenge, login, loginWalletAddress } from '@/src/login';
import { useMe } from '@/src/hooks/useAccount';

const useIsMounted = () => {
    const [mounted, setMounted] = React.useState(false);
    React.useEffect(() => setMounted(true), []);
    return mounted;
};

type WalletConnectTypes = {
    watch: boolean;
};

const WalletConnect = ({ watch }: WalletConnectTypes) => {
    const isMounted = useIsMounted();
    const theme = useTheme();
    const [loading, setLoading] = useState(false);
    const [loadingWallet, setLoadingWallet] = useState(false);
    const [errorChain, setErrorChain] = useState('');
    const [walletAddress, setWalletAddress] = useState('');

    const { connectAsync, connectors, error, isLoading, pendingConnector } = useConnect();
    const { signMessageAsync } = useSignMessage();
    const { disconnectAsync } = useDisconnect();
    const { isConnected } = useAccount();

    const { mutateUser } = useMe();

    const handleWalletAddress = async () => {
        try {
            setLoadingWallet(true);
            await loginWalletAddress(walletAddress);
            mutateUser();
            setLoadingWallet(false);
        } catch (err: any) {
            console.log(err.message);
            setErrorChain(err.message);
            setLoadingWallet(false);
        }
    };

    const handleConnect = async (connector: any) => {
        try {
            setLoading(true);
            if (isConnected) await disconnectAsync();
            const { account, chain } = await connectAsync({ connector });

            const message = await getChallenge(account, chain.id);
            const signature = await signMessageAsync({ message });

            if (!signature) {
                setErrorChain('Signature rejected');
                setLoading(false);
                return;
            }

            await login(message, signature);
            mutateUser();
            setLoading(false);
        } catch (err: any) {
            console.log(err.message);
            setErrorChain(err.message);
            setLoading(false);
        }
    };

    return (
        <Grid container spacing={2} direction="column" display="flex" justifyContent="center" alignItems="center">
            <Grid item>
                <Typography variant="h2" textAlign="center">
                    Connect your wallet
                </Typography>
                <Typography variant="body1" textAlign="center">
                    Connect more than one account to experience the full potential of this dapp! 💡
                </Typography>
            </Grid>
            {isMounted &&
                connectors.map((connector, key) => {
                    return (
                        <Grid item key={key}>
                            <Button
                                startIcon={
                                    <Image
                                        src={
                                            connector.name === 'MetaMask'
                                                ? '/images/metamask.svg'
                                                : connector.id === 'coinbaseWallet'
                                                ? '/images/coinbase.svg'
                                                : '/images/walletconnect-logo.svg'
                                        }
                                        alt={`${connector.name} ${key}`}
                                        width={connector.id === 'coinbaseWallet' ? 40 : 30}
                                        height={connector.id === 'coinbaseWallet' ? 40 : 30}
                                        style={{ objectFit: 'contain' }}
                                    />
                                }
                                disabled={!connector.ready}
                                key={connector.id}
                                onClick={() => handleConnect(connector)}
                                style={{
                                    width: '250px',
                                    color: 'white',
                                    textTransform: 'none',
                                    backgroundColor: '#4f87f6',
                                    borderRadius: '20px',
                                    padding: '5px 15px',
                                    fontWeight: 'bold',
                                    height: '50px',
                                }}
                            >
                                {`${connector.name} ${!connector?.ready ? ' (unsupported)' : ''} ${
                                    isLoading && connector.id === pendingConnector?.id ? ' (connecting)' : ''
                                }`}
                            </Button>
                        </Grid>
                    );
                })}
            {loading && (
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: '20px' }}>
                    <CircularProgress size={30} style={{ marginRight: '10px' }} />
                    <Typography variant="body2">{'waiting for signature'}</Typography>
                </div>
            )}
            {error && !walletAddress && (
                <Typography variant="body2" style={{ color: 'red', textAlign: 'center' }}>
                    {error.message}
                </Typography>
            )}
            {watch && (
                <div>
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginTop: '20px',
                            marginBottom: '20px',
                        }}
                    >
                        <div
                            style={{
                                marginRight: '10px',
                                height: '.5px',
                                backgroundColor: 'lightgray',
                                width: '100px',
                            }}
                        />
                        <Typography variant="body1" style={{ fontSize: '20px' }}>
                            OR
                        </Typography>
                        <div
                            style={{ marginLeft: '10px', height: '.5px', backgroundColor: 'lightgray', width: '100px' }}
                        />
                    </div>
                    <Typography variant="h2">Watch any wallet</Typography>
                    <div style={{ minWidth: '350px', marginTop: '20px' }}>
                        <TextField
                            placeholder="Wallet address"
                            value={walletAddress}
                            onChange={(e) => setWalletAddress(e.target.value)}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <Button
                                            style={{ backgroundColor: theme.palette.primary.dark, color: 'white' }}
                                            onClick={() => handleWalletAddress()}
                                            disabled={loadingWallet ? true : false}
                                        >
                                            {loadingWallet ? <CircularProgress size={20} /> : 'Watch'}
                                        </Button>
                                    </InputAdornment>
                                ),
                            }}
                            style={{ borderRadius: '20px' }}
                            fullWidth
                        />
                    </div>
                    {error && walletAddress && (
                        <Typography variant="body2" style={{ color: 'red', textAlign: 'center' }}>
                            {error.message}
                        </Typography>
                    )}
                </div>
            )}
        </Grid>
    );
};

export default WalletConnect;
