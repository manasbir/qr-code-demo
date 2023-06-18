import { getDefaultConfig } from "connectkit";
import { foundry } from "viem/chains";
import { sendTransaction } from "viem/dist/types/actions/wallet/sendTransaction";
import { createConfig, usePrepareSendTransaction, useSendTransaction, WagmiConfig } from "wagmi";
import Header from "./Header";
import { parseEther } from "viem";


interface BurnerProps {
    address: string;
    chain: string;
    name: string;
    amount: string;
}
export default function Burner(props: BurnerProps) {

      const { config } = usePrepareSendTransaction({
        to: props.address as string,
        value: parseEther(props.amount as `${number}`),
      })

    const { data, isLoading, isSuccess, sendTransaction } =
    useSendTransaction(config)
      
    return (

        <div className='flex-col items-center justify-center gap-10 w-full '>
            <h1>Send {props.amount} ETH to {props.name}</h1>
            <h2>Address: {props.address}</h2>
            <h2>Chain: {props.chain}</h2>
            {sendTransaction && <button className='w-1/4 bg-green-600 h-10' onClick={() => sendTransaction()}>Send Now</button>}
            {isLoading && <div>Check Wallet</div>}
            {isSuccess && <div>Transaction: {JSON.stringify(data)}</div>}
        </div>
    )
}