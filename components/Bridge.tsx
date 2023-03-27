import { useTheme } from '@mui/material';
import { Typography } from '@mui/material';

type BridgeTypes = {
    walletAddress: string;
};

const Bridge = ({ walletAddress }: BridgeTypes) => {
    const theme = useTheme();

    return (
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
    );
};

export default Bridge;
