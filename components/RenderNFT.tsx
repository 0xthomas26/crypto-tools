import NextImage from 'next/image';
import { useEffect, useState } from 'react';

type RenderNFTTypes = {
    NFTimage: string;
    name: string;
};

const checkImage = (path: string): Promise<{ path: string; status: string }> =>
    new Promise((resolve) => {
        const img = new Image();
        img.onload = () => resolve({ path, status: 'ok' });
        img.onerror = () => resolve({ path, status: 'error' });

        img.src = path;
    });

const getImgUrl = (imageUrl: string) => {
    if (!imageUrl) return false;

    if (!imageUrl.includes('ipfs://')) {
        return imageUrl;
    } else {
        return 'https://ipfs.io/ipfs/' + imageUrl.substring(7);
    }
};

const RenderNFT = ({ NFTimage, name }: RenderNFTTypes) => {
    const [render, setRender] = useState('');
    const [imageUrl, setImageUrl] = useState('');

    useEffect(() => {
        const verifyImage = async () => {
            const path = getImgUrl(NFTimage);

            if (!path) {
                setRender('error');
            } else {
                const { path: url, status } = await checkImage(path);
                setImageUrl(url);
                setRender(status);
            }
        };
        verifyImage();
    }, [NFTimage]);

    return (
        <>
            {render === 'ok' && imageUrl?.length > 0 ? (
                <NextImage src={imageUrl} width={250} height={250} alt={name} style={{ objectFit: 'contain' }} />
            ) : (
                <div
                    style={{
                        width: '250px',
                        height: '250px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    Content not available
                </div>
            )}
        </>
    );
};
export default RenderNFT;
