import { WagmiConfig, configureChains, createConfig, useAccount } from "wagmi";
import { ConnectKitProvider, ConnectKitButton, getDefaultConfig } from "connectkit";
import { foundry } from "viem/chains";
import { publicProvider } from "wagmi/dist/providers/public";
import { useEffect } from "react";

interface HeaderProps {
  address: (newState: string | null) => void
}

export default function Header(props: HeaderProps) {
  const { address, isConnecting, isDisconnected } = useAccount()

  useEffect(() => {
    if (!isConnecting && !isDisconnected) {
      props.address(address as string)
    }
  }, [address])

  return (
      <ConnectKitProvider>
        <div className="flex-row items-end">
          <ConnectKitButton />
        </div>
      </ConnectKitProvider>
  );
};