import { useEffect, useState } from 'react';
import { ArrowDropDown, SwapVert, Tune } from '@mui/icons-material';
import {
    Card,
    CardContent,
    Select,
    Typography,
    MenuItem,
    useMediaQuery,
    useTheme,
    Button,
    FormControl,
    InputLabel,
    Input,
    FormHelperText,
    OutlinedInput,
    TextField,
    IconButton,
    CircularProgress,
} from '@mui/material';
import Image from 'next/image';
import { useMe } from '@/src/hooks/useAccount';
import ModalTokens from './ModalTokens';
import { getQuote, getBalance } from '@/src/requests/prices';
import { networks } from '../src/constants/networks';
import axios from 'axios';
import { useSendTransaction, useWaitForTransaction, useSwitchNetwork } from 'wagmi';
import EthTokenList from '../src/constants/ETHtokenList.json';
import ArbTokenList from '../src/constants/ARBtokenList.json';
import BSCTokenList from '../src/constants/BSCtokenList.json';
import POLYGONTokenList from '../src/constants/POLYGONtokenList.json';
import AVALANCHETokenList from '../src/constants/AVALANCHEtokenList.json';
import FANTOMTokenList from '../src/constants/FANTOMtokenList.json';

type Network = {
    id: string;
    chainId: number;
    name: string;
    image: string;
};

type SwapTypes = {
    address: string;
    isConnected: boolean;
};

const Swap = ({ address, isConnected }: SwapTypes) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const isTablet = useMediaQuery(theme.breakpoints.down('md'));
    const [open, setOpen] = useState(false);
    const [error, setError] = useState('');
    const [type, setType] = useState('pay');
    const [payToken, setPayToken] = useState({
        symbol: 'ETH',
        name: 'Ethereum',
        decimals: 18,
        address: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
        logoURI: 'https://tokens.1inch.io/0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee.png',
        tags: ['native', 'PEG:ETH'],
    });
    const [receiveToken, setReceiveToken] = useState({
        symbol: 'USDT',
        name: 'Tether USD',
        address: '0xdac17f958d2ee523a2206206994597c13d831ec7',
        decimals: 6,
        logoURI: 'https://tokens.1inch.io/0xdac17f958d2ee523a2206206994597c13d831ec7.png',
        tags: ['tokens', 'PEG:USD'],
    });
    const [network, setNetwork] = useState<number>(1);
    const [amount, setAmount] = useState(1);
    const [slippage, setSlippage] = useState(2.5);
    const [loading, setLoading] = useState(false);
    const [loadingBalance, setLoadingBalance] = useState(false);
    const [tokenAmount, setTokenAmount] = useState(0);
    const [tokenPrice1, setTokenPrice1] = useState(0);
    const [tokenPrice2, setTokenPrice2] = useState(0);
    const [tokenBalance1, setTokenBalance1] = useState(0);
    const [tokenBalance2, setTokenBalance2] = useState(0);
    const [txDetails, setTxDetails] = useState({
        to: null,
        data: null,
        value: null,
    });

    const { switchNetwork } = useSwitchNetwork();

    // @ts-ignore: Unreachable code error
    const { data, sendTransaction } = useSendTransaction({
        request: {
            from: address,
            to: String(txDetails.to),
            data: String(txDetails.data),
            value: String(txDetails.value),
        },
    });

    const { isLoading, isSuccess } = useWaitForTransaction({
        hash: data?.hash,
    });

    const fetchBalances = async () => {
        try {
            setLoadingBalance(true);
            const balances = await getBalance(
                payToken.address,
                payToken.decimals,
                receiveToken.address,
                receiveToken.decimals,
                network
            );
            setTokenBalance1(balances?.tokenOne);
            setTokenBalance2(balances?.tokenTwo);
            setLoadingBalance(false);
        } catch (err) {
            console.log(err);
            setLoadingBalance(false);
        }
    };

    const fetchPrices = async () => {
        try {
            setLoading(true);
            const { quote, prices } = await getQuote(
                payToken.address,
                receiveToken.address,
                amount * 10 ** payToken.decimals,
                network
            );
            setTokenPrice1(prices?.tokenOne * amount);
            setTokenPrice2(
                prices?.tokenTwo * parseFloat((quote?.toTokenAmount / 10 ** quote?.toToken?.decimals).toFixed(6))
            );
            setTokenAmount(parseFloat((quote?.toTokenAmount / 10 ** quote?.toToken?.decimals).toFixed(6)));
            console.log(quote);
            setLoading(false);
        } catch (err) {
            console.log(err);
            setLoading(false);
        }
    };

    useEffect(() => {
        switchNetwork?.(network);
        const tokenList =
            network === 1
                ? EthTokenList
                : network === 42161
                ? ArbTokenList
                : network === 56
                ? BSCTokenList
                : network === 137
                ? POLYGONTokenList
                : network === 43114
                ? AVALANCHETokenList
                : network === 250
                ? FANTOMTokenList
                : EthTokenList;
        setPayToken(tokenList[0]);
        setReceiveToken(tokenList[1]);
    }, [network]); //eslint-disable-line

    useEffect(() => {
        if (txDetails.to && isConnected && sendTransaction) {
            sendTransaction();
        }
    }, [txDetails]); //eslint-disable-line

    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            if (amount >= 0) fetchPrices();
        }, 1000);
        return () => clearTimeout(delayDebounce);
    }, [amount, receiveToken, payToken, network]); //eslint-disable-line

    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            fetchBalances();
        }, 1000);
        return () => clearTimeout(delayDebounce);
    }, [receiveToken, payToken, network]); //eslint-disable-line

    const fetchDexSwap = async () => {
        try {
            setError('');
            const allowance = await axios.get(
                `https://api.1inch.io/v5.0/${network}/approve/allowance?tokenAddress=${payToken.address}&walletAddress=${address}`
            );

            if (allowance.data.allowance === '0') {
                const approve = await axios.get(
                    `https://api.1inch.io/v5.0/${network}/approve/transaction?tokenAddress=${payToken.address}`
                );

                setTxDetails(approve.data);
                console.log('not approved');
                return;
            }

            const tx = await axios.get(
                `https://api.1inch.io/v5.0/${network}/swap?fromTokenAddress=${payToken.address}&toTokenAddress=${
                    receiveToken.address
                }&amount=${(
                    amount *
                    10 ** payToken.decimals
                ).toString()}&fromAddress=${address}&fee=${0.5}&referrerAddress=0x7276C832D01848631F55A4556C18daaEbA5B1b18&slippage=${slippage}`
            );

            setTxDetails(tx.data.tx);
        } catch (err: any) {
            console.log(err);
            setError(err?.response?.data?.description?.split('.')[0]);
        }
    };

    const handleChange = (event: any) => {
        setNetwork(networks.find((elem: Network) => elem.chainId === event?.target?.value)?.chainId as number);
        // setImageUrl(networks.find((elem: Network) => elem.chainId === event.target.value)?.image);
    };

    return (
        <div>
            {/* <Typography
                variant="body1"
                style={{
                    padding: '10px',
                    backgroundColor: `${theme.palette.primary.main}4C`,
                    borderRadius: '10px',
                    width: '150px',
                    marginBottom: '10px',
                }}
            >
                Coming soon...
            </Typography> */}
            <Typography variant="body1">Trade any token, LP share or Vault in a single transaction</Typography>
            <ModalTokens
                open={open}
                setOpen={setOpen}
                type={type}
                setPayToken={setPayToken}
                setReceiveToken={setReceiveToken}
                network={network}
            />
            <Card
                style={{
                    borderRadius: '10px',
                    marginTop: '20px',
                    width: isMobile ? '100%' : isTablet ? '100%' : '60%',
                }}
            >
                <CardContent>
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                        }}
                    >
                        <Select value={network} onChange={handleChange} sx={{ display: 'flex', flexDirection: 'row' }}>
                            {networks.map((elem: Network, key: number) => (
                                <MenuItem value={elem.chainId} key={key}>
                                    <Image
                                        src={elem.image}
                                        alt={`${elem.name}-${key}`}
                                        width={20}
                                        height={20}
                                        style={{ objectFit: 'contain', marginRight: '10px' }}
                                    />
                                    <Typography variant="body1">{elem.name}</Typography>
                                </MenuItem>
                            ))}
                        </Select>
                        <Tune />
                    </div>
                    <div
                        style={{
                            marginTop: '20px',
                            width: '100%',
                            padding: 10,
                            backgroundColor: '#383838',
                            borderRadius: '10px',
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                        }}
                    >
                        <div>
                            <Typography>Pay with</Typography>
                            <Button
                                endIcon={<ArrowDropDown />}
                                onClick={() => {
                                    setOpen(true);
                                    setType('pay');
                                }}
                            >
                                {payToken?.logoURI ? (
                                    <Image src={payToken?.logoURI} width={20} height={20} alt={payToken?.symbol} />
                                ) : (
                                    <div
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            width: '40px',
                                            height: '40px',
                                            textTransform: 'uppercase',
                                            borderRadius: '40px',
                                            backgroundColor: '#405BBB',
                                        }}
                                    >
                                        <Typography variant="body2" style={{ fontSize: 10 }}>
                                            {payToken?.symbol.slice(0, 4)}
                                        </Typography>
                                    </div>
                                )}
                                <Typography variant="body1" style={{ marginLeft: '5px' }}>
                                    {payToken?.symbol}
                                </Typography>
                            </Button>

                            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                <Typography variant="body2">Balance</Typography>
                                <Button
                                    style={{
                                        padding: 0,
                                        minWidth: 0,
                                        minHeight: 0,
                                        marginLeft: '5px',
                                        fontSize: '14px',
                                    }}
                                    onClick={() => setAmount(tokenBalance1)}
                                    disabled={loadingBalance || tokenBalance1 <= 0 ? true : false}
                                >
                                    {loadingBalance ? '...' : tokenBalance1}
                                </Button>
                            </div>
                        </div>
                        <div
                            style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}
                        >
                            <Input
                                style={{
                                    backgroundColor: '#383838',
                                    textAlign: 'right',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    fontSize: '30px',
                                    fontWeight: 'bold',
                                    color: 'white',
                                    border: 'none',
                                    marginRight: 10,
                                }}
                                inputProps={{ sx: { textAlign: 'right' } }}
                                disableUnderline
                                placeholder="0"
                                type="tel"
                                value={amount}
                                onChange={(e) =>
                                    parseFloat(e.target.value) >= 0
                                        ? setAmount(parseFloat(e.target.value))
                                        : setAmount(0)
                                }
                                fullWidth
                            />
                            {!loading && tokenPrice1 > 0 && amount > 0 && (
                                <Typography variant="body2">{`~$${tokenPrice1.toFixed(6)}`}</Typography>
                            )}
                        </div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px', marginBottom: '10px' }}>
                        <IconButton
                            style={{ backgroundColor: '#383838' }}
                            onClick={() => {
                                const tmp = payToken;
                                setPayToken(receiveToken);
                                setReceiveToken(tmp);
                            }}
                        >
                            <SwapVert />
                        </IconButton>
                    </div>
                    <div
                        style={{
                            width: '100%',
                            padding: 10,
                            backgroundColor: '#383838',
                            borderRadius: '10px',
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                        }}
                    >
                        <div>
                            <Typography>Receive</Typography>
                            <Button
                                endIcon={<ArrowDropDown />}
                                onClick={() => {
                                    setOpen(true);
                                    setType('receive');
                                }}
                            >
                                {receiveToken?.logoURI ? (
                                    <Image
                                        src={receiveToken?.logoURI}
                                        width={20}
                                        height={20}
                                        alt={receiveToken?.symbol}
                                    />
                                ) : (
                                    <div
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            width: '40px',
                                            height: '40px',
                                            textTransform: 'uppercase',
                                            borderRadius: '40px',
                                            backgroundColor: '#405BBB',
                                        }}
                                    >
                                        <Typography variant="body2" style={{ fontSize: 10 }}>
                                            {receiveToken?.symbol.slice(0, 4)}
                                        </Typography>
                                    </div>
                                )}
                                <Typography variant="body1" style={{ marginLeft: '5px' }}>
                                    {receiveToken?.symbol}
                                </Typography>
                            </Button>
                            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                <Typography variant="body2">Balance</Typography>
                                <Button
                                    style={{
                                        padding: 0,
                                        minWidth: 0,
                                        minHeight: 0,
                                        marginLeft: '5px',
                                        fontSize: '14px',
                                    }}
                                    disabled
                                >
                                    {loadingBalance ? '...' : tokenBalance2}
                                </Button>
                            </div>
                        </div>
                        <div
                            style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}
                        >
                            <Typography
                                variant="body1"
                                style={{ fontSize: '30px', fontWeight: 'bold', marginRight: '10px' }}
                            >
                                {loading || amount === 0 ? '...' : tokenAmount}
                            </Typography>
                            {!loading && tokenPrice2 > 0 && amount > 0 && (
                                <Typography variant="body2">{`~$${tokenPrice2.toFixed(6)}`}</Typography>
                            )}
                        </div>
                    </div>
                    <Button
                        style={{ backgroundColor: theme.palette.primary.dark, color: 'white', marginTop: '20px' }}
                        sx={{
                            '&:disabled': {
                                opacity: 0.7,
                            },
                        }}
                        fullWidth
                        disabled={!isLoading && amount > 0 ? false : true} //tokenBalance1 >= amount &&
                        onClick={() => fetchDexSwap()}
                    >
                        {isLoading && <CircularProgress size={20} style={{ marginRight: '5px' }} />}
                        {amount === 0 ? 'Enter amount to swap' : isLoading ? 'Waiting for transaction' : 'Submit'}
                        {/* // : tokenBalance1 >= amount
                            // ? 'Submit'
                            // : `Insufficient ${payToken.symbol} balance`} */}
                    </Button>
                    {error && (
                        <Typography variant="body1" style={{ color: 'red', textAlign: 'center', marginTop: '10px' }}>
                            {error}
                        </Typography>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};

export default Swap;
