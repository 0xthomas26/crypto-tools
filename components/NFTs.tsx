import { useNFTs } from '@/src/hooks/useAccount';
import { Card, CardContent, Grid, Typography, useTheme } from '@mui/material';
import NFTCard from './NFTCard';

const NFTs = () => {
    const theme = useTheme();
    const { nfts } = useNFTs();

    return (
        <Grid container spacing={2}>
            {nfts?.map((elem: any, key: number) => (
                <NFTCard nfts={elem.nfts} blockchain={elem.chain} key={key} />
            ))}
        </Grid>
    );
};

export default NFTs;
