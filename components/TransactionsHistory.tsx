import { useTheme } from '@mui/material';
import { useTransactions } from '../src/hooks/usePortfolio';
import TransactionDetails from './TransactionDetails';

const TransactionsHistory = () => {
    const theme = useTheme();
    const { transactions } = useTransactions();

    return (
        <div>
            {transactions?.data?.map((elem: any, key: number) => {
                return <TransactionDetails transactionDetails={elem} key={key} />;
            })}
        </div>
    );
};

export default TransactionsHistory;
