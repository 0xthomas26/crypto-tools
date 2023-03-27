import { useChain } from '@/src/hooks/usePortfolio';
import { OpenInNew } from '@mui/icons-material';
import { IconButton, Typography } from '@mui/material';
import Image from 'next/image';

const formatterOver0 = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 4,
});

const TransactionDetails = ({ transactionDetails }: any) => {
    const { chain } = useChain(transactionDetails?.relationships?.chain?.data?.id);
    console.log(transactionDetails);

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderBottom: '1px solid',
                paddingTop: 10,
                paddingBottom: 10,
            }}
        >
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <Typography>{`${
                    transactionDetails?.attributes?.operation_type?.charAt(0).toUpperCase() +
                    transactionDetails?.attributes?.operation_type?.slice(1)
                }`}</Typography>
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <Typography variant="body2" style={{ marginRight: '10px' }}>
                        {new Date(transactionDetails?.attributes?.mined_at).toLocaleDateString()}
                    </Typography>
                    {transactionDetails?.relationships?.chain?.data?.id && (
                        <Image
                            src={`/images/${transactionDetails?.relationships?.chain?.data?.id}.png`}
                            alt={transactionDetails?.relationships?.chain?.data?.id}
                            width={20}
                            height={20}
                        />
                    )}
                    <Typography variant="body2" style={{ marginLeft: '5px' }}>
                        {transactionDetails?.relationships?.chain?.data?.id}
                    </Typography>
                </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                {transactionDetails?.attributes?.approvals[0]?.fungible_info.name && (
                    <Image
                        src={transactionDetails?.attributes?.approvals[0]?.fungible_info?.icon?.url}
                        alt={transactionDetails?.attributes?.approvals[0]?.fungible_info?.name}
                        width={20}
                        height={20}
                    />
                )}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginLeft: '10px' }}>
                    {transactionDetails?.attributes?.approvals[0]?.fungible_info?.name && (
                        <Typography variant="body1" style={{ marginLeft: '5px' }}>
                            {transactionDetails?.attributes?.approvals[0]?.fungible_info?.symbol}
                        </Typography>
                    )}
                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        {transactionDetails?.attributes?.transfers
                            ?.slice(0)
                            ?.reverse()
                            ?.map((elem: any, key: number) => {
                                if (elem?.nft_info) {
                                    return (
                                        <div
                                            key={key}
                                            style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}
                                        >
                                            <Image
                                                src={elem?.nft_info?.content?.detail?.url}
                                                alt={elem?.nft_info?.name}
                                                width={20}
                                                height={20}
                                            />
                                            <Typography
                                                variant="body1"
                                                style={{ marginLeft: '5px', textOverflow: 'ellipsis' }}
                                            >
                                                {elem?.nft_info?.name}
                                            </Typography>
                                            <Typography style={{ marginRight: '5px', marginLeft: '5px' }}>
                                                {key < transactionDetails?.attributes?.transfers?.length - 1 ? '>' : ''}
                                            </Typography>
                                        </div>
                                    );
                                }
                                return (
                                    <div
                                        key={key}
                                        style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}
                                    >
                                        {elem?.fungible_info?.icon?.url && (
                                            <Image
                                                src={elem?.fungible_info?.icon?.url}
                                                alt={elem?.fungible_info?.name}
                                                width={20}
                                                height={20}
                                            />
                                        )}
                                        <div key={key} style={{ marginRight: '5px', marginLeft: '5px' }}>
                                            <div
                                                style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}
                                            >
                                                <Typography
                                                    variant="body1"
                                                    style={{
                                                        color:
                                                            transactionDetails?.attributes?.operation_type === 'receive'
                                                                ? 'green'
                                                                : 'red',
                                                        marginRight: '5px',
                                                    }}
                                                >
                                                    {transactionDetails?.attributes?.operation_type === 'receive'
                                                        ? `+${formatterOver0.format(elem?.quantity?.float)}`
                                                        : `-${formatterOver0.format(elem?.quantity?.float)}`}
                                                </Typography>
                                                <Typography variant="body2" style={{ textOverflow: 'ellipsis' }}>
                                                    {elem?.fungible_info?.symbol}
                                                </Typography>
                                            </div>
                                            <Typography variant="body2">{`$${formatterOver0.format(
                                                elem?.value
                                            )}`}</Typography>
                                        </div>
                                        <Typography style={{ marginRight: '5px', marginLeft: '5px' }}>
                                            {key < transactionDetails?.attributes?.transfers?.length - 1 ? '>' : ''}
                                        </Typography>
                                    </div>
                                );
                            })}
                    </div>
                    {/* {transactionDetails?.attributes?.transfers[0]?.quantity?.float && (
                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                            <Typography
                                variant="body1"
                                style={{
                                    color:
                                        transactionDetails?.attributes?.operation_type === 'receive' ? 'green' : 'red',
                                    marginRight: '5px',
                                }}
                            >
                                {transactionDetails?.attributes?.operation_type === 'receive'
                                    ? `+${formatterOver0.format(
                                          transactionDetails?.attributes?.transfers[0]?.quantity?.float
                                      )}`
                                    : `-${formatterOver0.format(
                                          transactionDetails?.attributes?.transfers[0]?.quantity?.float
                                      )}`}
                            </Typography>
                            <Typography variant="body2">
                                {transactionDetails?.attributes?.transfers[0]?.fungible_info?.symbol}
                            </Typography>
                        </div>
                    )}
                    {transactionDetails?.attributes?.transfers[0]?.value && (
                        <Typography variant="body2">{`$${formatterOver0.format(
                            transactionDetails?.attributes?.transfers[0]?.value
                        )}`}</Typography>
                    )} */}
                </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                <div>
                    <Typography>
                        {transactionDetails?.attributes?.operation_type === 'receive' ? 'From' : 'To'}
                    </Typography>
                    <Typography variant="body2">
                        {transactionDetails?.attributes?.operation_type === 'receive'
                            ? `${transactionDetails?.attributes?.sent_from?.substring(
                                  0,
                                  4
                              )}...${transactionDetails?.attributes?.sent_from?.substring(
                                  transactionDetails?.attributes?.sent_from?.length - 4
                              )}`
                            : `${transactionDetails?.attributes?.sent_to?.substring(
                                  0,
                                  4
                              )}...${transactionDetails?.attributes?.sent_to?.substring(
                                  transactionDetails?.attributes?.sent_to?.length - 4
                              )}`}
                    </Typography>
                </div>
                <IconButton
                    onClick={() =>
                        window.open(
                            `${chain?.data?.attributes?.explorer?.home_url}/tx/${transactionDetails?.attributes?.hash}`,
                            '_blank'
                        )
                    }
                >
                    <OpenInNew />
                </IconButton>
            </div>
        </div>
    );
};

export default TransactionDetails;
