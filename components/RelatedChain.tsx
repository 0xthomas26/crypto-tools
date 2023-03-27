import { useChain } from '@/src/hooks/usePortfolio';
import { Typography } from '@mui/material';
import Image from 'next/image';

type RelatedChainTypes = {
    chainId: string;
};

const RelatedChain = ({ chainId }: RelatedChainTypes) => {
    const { chain } = useChain(chainId);

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: '5px',
            }}
        >
            {chain?.data?.attributes?.icon?.url && (
                <Image
                    src={chain?.data?.attributes?.icon?.url}
                    alt={`${chain?.data?.attributes?.name}-${chainId}`}
                    width={18}
                    height={18}
                    style={{ objectFit: 'contain', marginRight: '5px' }}
                />
            )}
            <Typography variant="body2">{chain?.data?.attributes?.name}</Typography>
        </div>
    );
};

export default RelatedChain;
