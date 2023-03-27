import { useState } from 'react';
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
} from '@mui/material';
import Image from 'next/image';
import { useMe } from '@/src/hooks/useAccount';
import ModalTokens from './ModalTokens';

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

const Swap = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const isTablet = useMediaQuery(theme.breakpoints.down('md'));
    const [open, setOpen] = useState(false);
    const [type, setType] = useState('pay');
    const [payToken, setPayToken] = useState({
        attributes: {
            flags: { verified: true },
            icon: { url: 'https://token-icons.s3.amazonaws.com/eth.png' },
            symbol: 'ETH',
        },
        id: 'eth',
    });
    const [receiveToken, setReceiveToken] = useState({
        attributes: {
            flags: { verified: true },
            icon: { url: 'https://token-icons.s3.amazonaws.com/0xdac17f958d2ee523a2206206994597c13d831ec7.png' },
            symbol: 'USDT',
        },
        id: '0xdac17f958d2ee523a2206206994597c13d831ec7',
    });
    const [network, setNetwork] = useState('ethereum');
    const [imageUrl, setImageUrl] = useState<string | undefined>('/images/ethereum.png');
    const [amount, setAmount] = useState(0);

    const { user } = useMe();

    const handleChange = (event: any) => {
        setNetwork(event.target.value as string);
        setImageUrl(networks.find((elem) => elem.name === event.target.value)?.image);
    };

    return (
        <div>
            <Typography
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
            </Typography>
            <Typography variant="body1">Trade any token, LP share or Vault in a single transaction</Typography>
            <ModalTokens
                open={open}
                setOpen={setOpen}
                type={type}
                setPayToken={setPayToken}
                setReceiveToken={setReceiveToken}
                network={network === 'bsc' ? 'binance-smart-chain' : network === 'gnosis chain' ? 'xdai' : network}
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
                            {networks.map((elem: any, key: number) => (
                                <MenuItem value={elem.name?.toLowerCase()} key={key}>
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
                                {payToken?.attributes?.icon?.url ? (
                                    <Image
                                        src={payToken?.attributes?.icon?.url}
                                        width={20}
                                        height={20}
                                        alt={payToken?.attributes?.symbol}
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
                                            {payToken?.attributes?.symbol.slice(0, 4)}
                                        </Typography>
                                    </div>
                                )}
                                <Typography variant="body1" style={{ marginLeft: '5px' }}>
                                    {payToken?.attributes?.symbol}
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
                                >
                                    {1000}
                                </Button>
                            </div>
                        </div>
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
                                parseFloat(e.target.value) >= 0 ? setAmount(parseFloat(e.target.value)) : setAmount(0)
                            }
                            fullWidth
                        />
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
                                {receiveToken?.attributes?.icon?.url ? (
                                    <Image
                                        src={receiveToken?.attributes?.icon?.url}
                                        width={20}
                                        height={20}
                                        alt={receiveToken?.attributes?.symbol}
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
                                            {receiveToken?.attributes?.symbol.slice(0, 4)}
                                        </Typography>
                                    </div>
                                )}
                                <Typography variant="body1" style={{ marginLeft: '5px' }}>
                                    {receiveToken?.attributes?.symbol}
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
                                    {1000}
                                </Button>
                            </div>
                        </div>
                        <Typography
                            variant="body1"
                            style={{ fontSize: '30px', fontWeight: 'bold', marginRight: '10px' }}
                        >
                            {amount ? amount : 0}
                        </Typography>
                    </div>
                    <Button
                        style={{ backgroundColor: theme.palette.primary.dark, color: 'white', marginTop: '20px' }}
                        fullWidth
                    >
                        Submit
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
};

export default Swap;
