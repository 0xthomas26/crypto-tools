import {
    Dialog,
    DialogContent,
    DialogTitle,
    Divider,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography,
    OutlinedInput,
    InputAdornment,
} from '@mui/material';
import Image from 'next/image';
import { Close, InputOutlined, Search, Verified } from '@mui/icons-material';
import { useFungibles } from '@/src/hooks/usePortfolio';
import { useState } from 'react';

const tokens = [
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

type ModalTokensTypes = {
    open: boolean;
    setOpen: any;
    type: string;
    setPayToken: any;
    setReceiveToken: any;
    network: string;
};

const ModalTokens = ({ open, setOpen, type, setPayToken, setReceiveToken, network }: ModalTokensTypes) => {
    const [query, setQuery] = useState<string | undefined>(undefined);
    const { fungibles } = useFungibles(network, query);

    console.log(fungibles);

    const handleChange = (event: any) => {
        setQuery(event.target.value as string);
    };

    return (
        <Dialog open={open} onClose={() => setOpen(false)}>
            <DialogContent style={{ minWidth: '450px', maxHeight: '500px', overflowY: 'hidden' }}>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        width: '100%',
                    }}
                >
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                        <DialogTitle style={{ textAlign: 'center', fontSize: '24px', fontWeight: 'bold' }}>
                            {type === 'pay' ? 'Pay with' : 'Receive'}
                        </DialogTitle>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                        <IconButton onClick={() => setOpen(false)} style={{ width: 30, height: 30, borderRadius: 30 }}>
                            <Close />
                        </IconButton>
                    </div>
                </div>
                <Divider />
                <OutlinedInput
                    placeholder="Search assets"
                    type="text"
                    value={query}
                    onChange={handleChange}
                    style={{ height: '50px', marginTop: '10px' }}
                    startAdornment={
                        <InputAdornment position="start">
                            <Search />
                        </InputAdornment>
                    }
                    fullWidth
                />
                <Typography
                    variant="body2"
                    style={{ marginTop: '10px' }}
                >{`Showing results for ${network}.`}</Typography>
                <div style={{ overflowY: 'scroll', height: '320px' }}>
                    <List>
                        {fungibles?.data?.map((elem: any, key: number) => {
                            return (
                                <ListItem key={key} disablePadding>
                                    <ListItemButton
                                        onClick={() => {
                                            if (type === 'pay') setPayToken(elem);
                                            else setReceiveToken(elem);
                                            setOpen(false);
                                        }}
                                    >
                                        <ListItemIcon>
                                            {elem?.attributes?.icon?.url ? (
                                                <Image
                                                    src={elem?.attributes?.icon?.url}
                                                    alt={`${elem?.attributes?.name}-${key}`}
                                                    width={40}
                                                    height={40}
                                                    style={{ objectFit: 'contain', marginRight: '10px' }}
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
                                                        {elem?.attributes?.symbol.slice(0, 4)}
                                                    </Typography>
                                                </div>
                                            )}
                                        </ListItemIcon>
                                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                                            <div
                                                style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}
                                            >
                                                <ListItemText
                                                    primary={`${elem?.attributes?.name.slice(0, 25)}${
                                                        elem?.attributes?.name?.length > 30 ? '...' : ''
                                                    }`}
                                                />
                                                {elem?.attributes?.flags?.verified && (
                                                    <Verified style={{ marginLeft: '5px', fontSize: '20px' }} />
                                                )}
                                            </div>
                                            <Typography variant="body2">{`$${elem?.attributes?.market_data?.price?.toFixed(
                                                2
                                            )}`}</Typography>
                                        </div>
                                    </ListItemButton>
                                </ListItem>
                            );
                        })}
                    </List>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default ModalTokens;
