import { Card, CardContent, Grid, Typography, useTheme } from '@mui/material';
import Image from 'next/image';
import RenderNFT from './RenderNFT';

type NFTCardTypes = {
    nfts: any;
    blockchain: any;
};

const NFTCard = ({ nfts, blockchain }: NFTCardTypes) => {
    return (
        <>
            {nfts?.map((elem: any, key: number) => {
                const NFTimage = elem?.metadata?.image;
                if (elem?.name)
                    return (
                        <Grid item key={key} style={{ maxWidth: '250px' }}>
                            <Card style={{ borderRadius: '10px' }}>
                                <CardContent
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}
                                >
                                    <RenderNFT NFTimage={NFTimage} name={elem?.name} />
                                    <div style={{ alignSelf: 'flex-start' }}>
                                        <Typography
                                            variant="body1"
                                            style={{
                                                fontWeight: 'bold',
                                                textOverflow: 'ellipsis',
                                                display: '-webkit-box',
                                                WebkitLineClamp: 1,
                                                WebkitBoxOrient: 'vertical',
                                                overflow: 'hidden',
                                            }}
                                        >
                                            {elem?.name}
                                        </Typography>
                                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                            {blockchain?._chainlistData?.chain && (
                                                <Image
                                                    src={
                                                        blockchain?._chainlistData?.chain === 'ETH'
                                                            ? '/images/ethereum.png'
                                                            : blockchain?._chainlistData?.chain === 'Polygon'
                                                            ? '/images/polygon.png'
                                                            : blockchain?._chainlistData?.chain === 'BSC'
                                                            ? '/images/bsc.png'
                                                            : blockchain?._chainlistData?.chain === 'Avalanche'
                                                            ? '/images/avalanche.png'
                                                            : blockchain?._chainlistData?.chain === 'Arbitrum'
                                                            ? '/images/arbitrum.png'
                                                            : '/images/ethereum.png'
                                                    }
                                                    alt={`${blockchain?._chainlistData?.chain}-${key}`}
                                                    width={20}
                                                    height={20}
                                                    style={{ objectFit: 'contain' }}
                                                />
                                            )}
                                            <Typography variant="body2" style={{ marginLeft: '5px' }}>
                                                {blockchain?._chainlistData?.chain}
                                            </Typography>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </Grid>
                    );
            })}
        </>
    );
};

export default NFTCard;
