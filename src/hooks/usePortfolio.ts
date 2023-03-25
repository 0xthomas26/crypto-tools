import useSWRImmutable from 'swr';
import { zerionFetcher } from '../fetcher';

export const useBalance = (walletAddress: string) => {
    const {
        data,
        error,
        isValidating,
        mutate: mutateBalance,
    } = useSWRImmutable(
        `${process.env.ZERION_API_URL}/wallets/${walletAddress}/portfolio?currency=usd`,
        zerionFetcher,
        { refreshInterval: 10 }
    );

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
        `${process.env.ZERION_API_URL}/wallets/${walletAddress}/positions/?currency=usd&filter[position_types]=${type}&sort=value`,
        zerionFetcher
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
        mutate: mutatePositions,
    } = useSWRImmutable(`${process.env.ZERION_API_URL}/chains/${chainId}`, zerionFetcher);

    return {
        chain: data,
        mutatePositions,
        isLoading: isValidating,
        isError: error,
    };
};
