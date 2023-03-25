import { useTheme } from '@mui/material';
import { usePositions, useBalance } from '../src/hooks/usePortfolio';
import PositionsCard from './PositionsCard';

type PositionsTypes = {
    walletAddress: string;
};

const Positions = ({ walletAddress }: PositionsTypes) => {
    const theme = useTheme();

    const { positions: walletPositions } = usePositions(walletAddress, 'wallet');
    const { positions: stackedPositions } = usePositions(walletAddress, 'staked');
    const { positions: borrowedPositions } = usePositions(walletAddress, 'loan');
    const { positions: lockedPositions } = usePositions(walletAddress, 'locked');
    const { positions: depositedPositions } = usePositions(walletAddress, 'deposit');

    const { balances } = useBalance(walletAddress);

    const portfolioPosition = balances?.data?.attributes?.positions_distribution_by_type;

    return (
        <div>
            <section id="wallet">
                <PositionsCard type="Wallet" portfolioPosition={portfolioPosition} walletPositions={walletPositions} />
            </section>
            {stackedPositions?.data?.length > 0 && (
                <section id="staked" style={{ marginTop: '40px' }}>
                    <PositionsCard
                        type="Staked"
                        portfolioPosition={portfolioPosition}
                        walletPositions={stackedPositions}
                    />
                </section>
            )}
            {borrowedPositions?.data?.length > 0 && (
                <section id="borrowed" style={{ marginTop: '40px' }}>
                    <PositionsCard
                        type="Borrowed"
                        portfolioPosition={portfolioPosition}
                        walletPositions={borrowedPositions}
                    />
                </section>
            )}
            {lockedPositions?.data?.length > 0 && (
                <section id="locked" style={{ marginTop: '40px' }}>
                    <PositionsCard
                        type="Locked"
                        portfolioPosition={portfolioPosition}
                        walletPositions={lockedPositions}
                    />
                </section>
            )}
            {depositedPositions?.data?.length > 0 && (
                <section id="deposited" style={{ marginTop: '40px' }}>
                    <PositionsCard
                        type="Deposited"
                        portfolioPosition={portfolioPosition}
                        walletPositions={depositedPositions}
                    />
                </section>
            )}
        </div>
    );
};

export default Positions;
