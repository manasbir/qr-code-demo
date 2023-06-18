'use client';
import Header from '@/components/Header';
import { useEffect } from 'react'
import { createTestClient, http } from 'viem'
import { foundry } from 'viem/chains'
import { WagmiConfig, configureChains, createConfig, useAccount, useConnect } from 'wagmi'
import { publicProvider } from 'wagmi/providers/public'


export default function Home() {

  const { chains, publicClient, webSocketPublicClient } = configureChains(
    [foundry],
    [publicProvider()],
  )
   
  const config = createConfig({
    publicClient,
    webSocketPublicClient,
  })



  return (
    <WagmiConfig config={config}>
      <Header/>
    <main className="flex min-h-screen flex-col items-center p-24">
      <div className="flex flex-col items-center justify-center">
        <h1>DCTRL GOV</h1>
        <button className='bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center'>
          OPEN DOOR
        </button>
      </div>
    </main>
    </WagmiConfig>

  )
}

