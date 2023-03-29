import { Typography, useMediaQuery, useTheme } from '@mui/material';
import Navbar from '../components/Navbar';
import { useMe } from '@/src/hooks/useAccount';
import WalletConnect from '@/components/WalletConnect';
import BridgeComponent from '@/components/Bridge';

const Bridge = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const { user } = useMe();

    return (
        <div>
            <Navbar />
            <div
                style={{
                    padding: '5%',
                    marginLeft: isMobile ? '0' : '230px',
                    maxWidth: '100%',
                    paddingTop: '30px',
                }}
            >
                <h1>Bridge</h1>
                <section id="swap" style={{ marginTop: '40px' }}>
                    {user && <BridgeComponent walletAddress={user?.account} />}
                </section>
                {!user && (
                    <div style={{ marginTop: '40px' }}>
                        <WalletConnect watch={false} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Bridge;
