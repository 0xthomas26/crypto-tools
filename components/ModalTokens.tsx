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
import { Close, Search, Verified } from '@mui/icons-material';
import { useState } from 'react';
import ETHTokenList from '../src/constants/ETHtokenList.json';
import ArbTokenList from '../src/constants/ARBtokenList.json';
import BSCTokenList from '../src/constants/BSCtokenList.json';
import POLYGONTokenList from '../src/constants/POLYGONtokenList.json';
import AVALANCHETokenList from '../src/constants/AVALANCHEtokenList.json';
import FANTOMTokenList from '../src/constants/FANTOMtokenList.json';

type ModalTokensTypes = {
    open: boolean;
    setOpen: any;
    type: string;
    setPayToken: any;
    setReceiveToken: any;
    network: number;
};

type Token = {
    symbol: string;
    name: string;
    decimals: number;
    address: string;
    logoURI: string;
    tags: Array<string>;
};

const ModalTokens = ({ open, setOpen, type, setPayToken, setReceiveToken, network }: ModalTokensTypes) => {
    const [query, setQuery] = useState<string | undefined>(undefined);

    const fungibles =
        network === 1
            ? ETHTokenList
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
            : ETHTokenList;
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
                <Typography variant="body2" style={{ marginTop: '10px' }}>{`Showing results for ${
                    network === 1 ? 'Ethereum' : 'other'
                }.`}</Typography>
                <div style={{ overflowY: 'scroll', height: '320px' }}>
                    <List>
                        {fungibles?.map((elem: Token, key: number) => {
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
                                            {elem?.logoURI ? (
                                                <Image
                                                    src={elem?.logoURI}
                                                    alt={`${elem.name}-${key}`}
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
                                                        {elem?.symbol?.slice(0, 4)}
                                                    </Typography>
                                                </div>
                                            )}
                                        </ListItemIcon>
                                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                                            <div
                                                style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}
                                            >
                                                <ListItemText
                                                    primary={`${elem?.name.slice(0, 25)}${
                                                        elem?.name?.length > 30 ? '...' : ''
                                                    }`}
                                                />
                                                <Verified style={{ marginLeft: '5px', fontSize: '20px' }} />
                                            </div>
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
