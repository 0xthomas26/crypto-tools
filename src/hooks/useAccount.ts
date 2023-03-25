import useSWRImmutable from 'swr';
import { nodeFetcher } from '../fetcher';

export const useMe = () => {
    const {
        data,
        error,
        isValidating,
        mutate: mutateUser,
    } = useSWRImmutable(`${process.env.API_URL}/user/me`, nodeFetcher);

    return {
        user: data?.error ? undefined : data,
        mutateUser,
        isLoading: isValidating,
        isError: error,
    };
};

export const useNFTs = () => {
    const {
        data,
        error,
        isValidating,
        mutate: mutateNFTs,
    } = useSWRImmutable(`${process.env.API_URL}/user/nfts`, nodeFetcher);

    return {
        nfts: data?.error ? undefined : data?.nfts,
        mutateNFTs,
        isLoading: isValidating,
        isError: error,
    };
};
