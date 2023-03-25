import { useMediaQuery, useTheme } from '@mui/material';
import Navbar from '../components/Navbar';
import CryptoPrices from '@/components/CryptoPrices';

const Swap = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('xs'));

    return (
        <div>
            <Navbar />
            <div
                style={{
                    padding: '5%',
                    marginLeft: isMobile ? '0' : '230px',
                    maxWidth: '100%',
                    paddingTop: isMobile ? '130px' : '30px',
                }}
            >
                <h1>Swap</h1>
                <CryptoPrices />
            </div>
        </div>
    );
};

export default Swap;
