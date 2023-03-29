import axios from 'axios';
import qs from 'qs';
import { nodeApiConfig } from '../fetcher';

export const getBalance = async (
    fromTokenAddress: string,
    fromDecimals: number,
    toTokenAddress: string,
    toDecimals: number,
    chainId: number
) => {
    let balances = {
        tokenOne: 0,
        tokenTwo: 0,
    };
    // const { data: balances } = await axios.get(
    //     `${process.env.API_URL}/user/tokensBalance?addressOne=${fromTokenAddress}&fromDecimals=${fromDecimals}&addressTwo=${toTokenAddress}&toDecimals=${toDecimals}&chain=${chainId}`,
    //     nodeApiConfig()
    // );

    return balances;
};

export const getQuote = async (fromTokenAddress: string, toTokenAddress: string, amount: number, chainId: number) => {
    const from =
        fromTokenAddress === '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee'
            ? '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2'
            : fromTokenAddress;
    const to =
        toTokenAddress === '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee'
            ? '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2'
            : toTokenAddress;
    const params = {
        fromTokenAddress,
        toTokenAddress,
        amount,
        fee: 2,
    };

    const prices = { tokenOne: 0, tokenTwo: 0, ratio: 0 };
    // const { data: prices } = await axios.get(
    //     `${process.env.API_URL}/user/tokensPrice?addressOne=${from}&addressTwo=${to}&chain=${chainId}`,
    //     nodeApiConfig()
    // );
    const { data: quote } = await axios.get(`https://api.1inch.io/v5.0/${chainId}/quote?${qs.stringify(params)}`);

    return { quote, prices };
};
