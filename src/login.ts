import axios from 'axios';

export const getChallenge = async (account: string, chainId: number): Promise<string> => {
    const { data } = await axios.post(`${process.env.API_URL}/user/login/challenge`, {
        publicAddress: account,
        chain: chainId,
    });
    return data.message;
};

export const login = async (message: string, signature: string) => {
    const { data } = await axios.post(`${process.env.API_URL}/user/login/wallet`, { message, signature });
    if (data.address) {
        localStorage.setItem('user', data.address);
        localStorage.setItem('token', data.token);
        return true;
    } else return false;
};

export const loginWalletAddress = async (walletAddress: string) => {
    const { data } = await axios.post(`${process.env.API_URL}/user/login/walletAddress`, { walletAddress });
    if (data.address) {
        localStorage.setItem('user', data.address);
        localStorage.setItem('token', data.token);
        return true;
    } else return false;
};
