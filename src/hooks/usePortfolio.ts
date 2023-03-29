import useSWRImmutable from 'swr';
import { nodeFetcher } from '../fetcher';

export const useBalance = (walletAddress: string) => {
    const {
        data,
        error,
        isValidating,
        mutate: mutateBalance,
    } = useSWRImmutable(`${process.env.API_URL}/user/portfolio?walletAddress=${walletAddress}`, nodeFetcher, {
        refreshInterval: 10,
    });

    return {
        balances: data,
        mutateBalance,
        isLoading: isValidating,
        isError: error,
    };
};

export const usePositions = (walletAddress: string, type: string) => {
    const {
        data,
        error,
        isValidating,
        mutate: mutatePositions,
    } = useSWRImmutable(
        `${process.env.API_URL}/user/positions?walletAddress=${walletAddress}&type=${type}`,
        nodeFetcher
    );

    return {
        positions: data,
        mutatePositions,
        isLoading: isValidating,
        isError: error,
    };
};

export const useChain = (chainId: string) => {
    const {
        data,
        error,
        isValidating,
        mutate: mutateChains,
    } = useSWRImmutable(`${process.env.API_URL}/user/chains?chainId=${chainId}`, nodeFetcher);

    return {
        chain: data,
        mutateChains,
        isLoading: isValidating,
        isError: error,
    };
};

export const useFungibles = (chainId: string | undefined, query: string | undefined) => {
    const {
        data,
        error,
        isValidating,
        mutate: mutateFungibles,
    } = useSWRImmutable(
        `${process.env.API_URL}/user/fungibles?chainId=${chainId}&query=${query ? query : ''}`,
        nodeFetcher
    );

    return {
        fungibles: data,
        mutateFungibles,
        isLoading: isValidating,
        isError: error,
    };
};

export const useTransactions = () => {
    const {
        data,
        error,
        isValidating,
        mutate: mutateTransactions,
    } = useSWRImmutable(`${process.env.API_URL}/user/transactions`, nodeFetcher);

    return {
        transactions: data,
        mutateTransactions,
        isLoading: isValidating,
        isError: error,
    };
};
