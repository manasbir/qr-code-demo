"use client";
import { QueryCache, QueryClient, QueryClientProvider } from 'react-query'
import Header from '@/components/Header';
import { getDefaultConfig } from 'connectkit';
import querystring from 'querystring';
import { parseEther } from 'viem';
import { foundry } from 'viem/chains';
import { WagmiConfig, createConfig, usePrepareSendTransaction, useQuery, useQueryClient, useSendTransaction } from 'wagmi';
import Burner from '@/components/Burner';
import { Toaster, toast } from "react-hot-toast";

export default function Qr() {
    const query = querystring.parse(window.location.href.split("?")[1]);
    console.log(query);
    
    const queryClient = new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
          },
        },
        queryCache: new QueryCache({
          onError: () => {
            toast.error(
              "Network Error: Ensure MetaMask is connected to the same network that your contract is deployed to."
            );
          },
        }),
      });

      const configA = createConfig(
        getDefaultConfig({
          chains: [foundry],
      
          appName: "DCTRL GOV",
          walletConnectProjectId: "8e4739eb11eb99fb03724310143c59e6",
      
          // Optional
          appDescription: "Your App Description",
          appUrl: "https://family.co", // your app's url
          
        })
        
      );



    
    


    return (
        <WagmiConfig config={configA}>
        <Header address={() => {}}/>
        <QueryClientProvider client={queryClient}>
        <Burner address={query.address as string} chain={query.chain as string} name={query.name as string} amount={query.amount as string}/>
        <Toaster position="bottom-right" />
        </QueryClientProvider>
        </WagmiConfig>

    );

}