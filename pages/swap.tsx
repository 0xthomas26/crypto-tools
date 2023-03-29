import { useMediaQuery, useTheme } from '@mui/material';
import Navbar from '../components/Navbar';
import { useMe } from '@/src/hooks/useAccount';
import WalletConnect from '@/components/WalletConnect';
import SwapComponent from '@/components/Swap';
import { useAccount } from 'wagmi';

const Swap = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const { user } = useMe();
    const { isConnected } = useAccount();

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
                <h1>Swap</h1>
                <section id="swap" style={{ marginTop: '40px' }}>
                    {user && isConnected && <SwapComponent address={user?.account} isConnected={isConnected} />}
                </section>
                {(!user || !isConnected) && (
                    <div style={{ marginTop: '40px' }}>
                        <WalletConnect watch={false} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Swap;
