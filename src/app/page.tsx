"use client";
import Header from '@/components/Header';
import QRCodeImg from '@/components/QRCode';
import { getDefaultConfig } from 'connectkit';
import { FormEvent, useState } from 'react'
import { foundry } from 'viem/chains'
import { WagmiConfig, configureChains, createConfig, useAccount, useConnect } from 'wagmi'


export default function Home() {

  interface HeaderProps {
    address: string | null;
    chain: string;
    name: string | null;
    amount: string | null;
  }

  const [info, setInfo] = useState<HeaderProps>({address: null, chain: "31337", name: null, amount: null});
  const [readyToRender, setReadyToRender] = useState(false);

  const config = createConfig(
    getDefaultConfig({
      chains: [foundry],
  
      appName: "DCTRL GOV",
      walletConnectProjectId: "8e4739eb11eb99fb03724310143c59e6",
  
      // Optional
      appDescription: "Your App Description",
      appUrl: "https://family.co", // your app's url
    })
  );

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    !info.address && alert("Please connect your wallet first!")
    e.preventDefault();
    const nameInput = (e.currentTarget.elements.namedItem("name") as HTMLInputElement).value;
    const selectedChain = (e.currentTarget.elements.namedItem("Chain") as HTMLSelectElement).value;
    const amountInput = (e.currentTarget.elements.namedItem("amount") as HTMLInputElement).value;
    
    setInfo({...info, name: nameInput, chain: selectedChain, amount: amountInput});
    setReadyToRender(true);

  }

  const handleAddress = (newState: string | null) => {
    console.log(newState);
    if (newState) {
      setInfo({...info, address: newState});
    }
  }

  


  return (
    <WagmiConfig config={config}>
      <Header address={handleAddress} />
    <main className="flex min-h-screen flex-col items-center p-24">
      <div className="flex flex-col items-center justify-center">
        <h1>Create QR Code:</h1>
        <form className="flex flex-col items-center justify-center w-full gap-2" onSubmit={(e) => handleSubmit(e)}>
          <input name="name" className="border-2 border-gray-500 rounded-lg p-2 m-2 text-black" type="text" placeholder="Enter your name" />
          <input name="amount" className="border-2 border-gray-500 rounded-lg p-2 m-2 text-black" type="text" placeholder="Enter amount of ETH" />
          <label>
            Select Chain:
          </label>
          <select className='w-full text-black' name="Chain">
            <option value="31337">Foundry</option>
            <option value="1">Ethereum Mainnet</option>
            <option value="10">Optimism</option>
            <option value="137">Polygon</option>
          </select>

          <button type='submit' className='bg-gray-200 hover:bg-gray-300 text-black font-bold py-2 px-4 rounded inline-flex items-center mt-3'>
            <p>Create</p>
          </button>
        </form>
      </div>
      { info.address && info.name && info.amount && <QRCodeImg chain={info.chain} address={info.address as string} name={info.name as string} amount={info.amount} />
      }
    </main>
    </WagmiConfig>

  )
}

