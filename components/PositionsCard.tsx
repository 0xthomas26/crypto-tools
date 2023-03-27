import { AccountBalanceWallet, AccountBalanceWalletOutlined, Verified } from '@mui/icons-material';
import {
    Typography,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Button,
    Card,
    CardContent,
} from '@mui/material';
import Image from 'next/image';
import { useState } from 'react';
import RelatedChain from './RelatedChain';

const formatter = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 8,
});

const formatterOver0 = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
});

type PositionsCardTypes = {
    type: string;
    portfolioPosition: any;
    walletPositions: any;
};

const PositionsCard = ({ type, portfolioPosition, walletPositions }: PositionsCardTypes) => {
    const [show, setShow] = useState(false);

    return (
        <Card style={{ backgroundColor: '#1E1F25', borderRadius: '10px' }}>
            <CardContent>
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <AccountBalanceWalletOutlined style={{ marginRight: '10px' }} />
                    <Typography variant="h3">
                        {`${type} - $${
                            type === 'Wallet'
                                ? formatterOver0.format(portfolioPosition?.wallet)
                                : type === 'Staked'
                                ? formatterOver0.format(portfolioPosition?.staked)
                                : type === 'Borrowed'
                                ? formatterOver0.format(portfolioPosition?.borrowed)
                                : type === 'Deposited'
                                ? formatterOver0.format(portfolioPosition?.deposited)
                                : type === 'Locked'
                                ? formatterOver0.format(portfolioPosition?.locked)
                                : ''
                        }`}
                    </Typography>
                </div>
                <TableContainer>
                    <Table sx={{ minWidth: 650 }}>
                        <TableHead>
                            <TableRow>
                                <TableCell>ASSET</TableCell>
                                <TableCell align="right">PRICE</TableCell>
                                <TableCell align="right">BALANCE</TableCell>
                                <TableCell align="right">VALUE</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody style={{ width: '100%' }}>
                            {walletPositions?.data
                                ?.slice(0, show ? walletPositions?.data?.length : 3)
                                .map((elem: any, key: number) => {
                                    return (
                                        <TableRow key={key}>
                                            <TableCell>
                                                <div
                                                    style={{
                                                        display: 'flex',
                                                        flexDirection: 'row',
                                                        alignItems: 'center',
                                                    }}
                                                >
                                                    {elem?.attributes?.fungible_info?.icon?.url ? (
                                                        <Image
                                                            src={elem?.attributes?.fungible_info?.icon?.url}
                                                            alt={`${elem?.attributes?.fungible_info?.symbol}-${key}`}
                                                            width={30}
                                                            height={30}
                                                            style={{ objectFit: 'contain' }}
                                                        />
                                                    ) : (
                                                        <div
                                                            style={{
                                                                display: 'flex',
                                                                justifyContent: 'center',
                                                                alignItems: 'center',
                                                                width: '30px',
                                                                height: '30px',
                                                                textTransform: 'uppercase',
                                                                borderRadius: '30px',
                                                                backgroundColor: '#405BBB',
                                                            }}
                                                        >
                                                            <Typography variant="body2" style={{ fontSize: 10 }}>
                                                                {elem?.attributes?.fungible_info?.symbol.slice(0, 4)}
                                                            </Typography>
                                                        </div>
                                                    )}
                                                    <div
                                                        style={{
                                                            display: 'flex',
                                                            flexDirection: 'column',
                                                            alignItems: 'flex-start',
                                                            marginLeft: '10px',
                                                        }}
                                                    >
                                                        <div
                                                            style={{
                                                                display: 'flex',
                                                                flexDirection: 'row',
                                                                alignItems: 'center',
                                                            }}
                                                        >
                                                            <Typography variant="body1" style={{ fontWeight: 'bold' }}>
                                                                {elem?.attributes?.fungible_info?.name}
                                                            </Typography>
                                                            {elem?.attributes?.fungible_info?.flags?.verified && (
                                                                <Verified
                                                                    style={{ marginLeft: '5px', fontSize: '15px' }}
                                                                />
                                                            )}
                                                        </div>
                                                        <RelatedChain chainId={elem?.relationships?.chain?.data?.id} />
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell align="right">
                                                <Typography>{`$${
                                                    elem?.attributes?.price > 1
                                                        ? formatterOver0.format(elem?.attributes?.price)
                                                        : formatter.format(elem?.attributes?.price)
                                                }`}</Typography>
                                            </TableCell>
                                            <TableCell align="right">
                                                <Typography>{`${
                                                    elem?.attributes?.quantity?.float > 1
                                                        ? formatterOver0.format(elem?.attributes?.quantity?.float)
                                                        : formatter.format(elem?.attributes?.quantity?.float)
                                                }`}</Typography>
                                            </TableCell>
                                            <TableCell align="right">
                                                <div
                                                    style={{
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                        alignItems: 'flex-end',
                                                    }}
                                                >
                                                    <Typography variant="body1">{`$${elem?.attributes?.value.toFixed(
                                                        2
                                                    )}`}</Typography>
                                                    <Typography
                                                        variant="body1"
                                                        style={{
                                                            color:
                                                                elem?.attributes?.changes?.absolute_1d >= 0
                                                                    ? 'green'
                                                                    : 'red',
                                                        }}
                                                    >{`${
                                                        elem?.attributes?.changes?.absolute_1d >= 0 ? '+' : ''
                                                    }${elem?.attributes?.changes?.percent_1d.toFixed(
                                                        2
                                                    )}% ($${elem?.attributes?.changes?.absolute_1d.toFixed(
                                                        2
                                                    )})`}</Typography>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                        </TableBody>
                    </Table>
                    {walletPositions?.data?.length > 3 && (
                        <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                            <Button
                                style={{ border: '1px solid', borderRadius: '10px', marginTop: '20px' }}
                                onClick={() => setShow(!show)}
                            >
                                {show ? 'Show less assets' : 'Show all assets'}
                            </Button>
                        </div>
                    )}
                </TableContainer>
            </CardContent>
        </Card>
    );
};
export default PositionsCard;
