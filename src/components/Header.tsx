import { WagmiConfig, configureChains, createConfig } from "wagmi";
import { ConnectKitProvider, ConnectKitButton, getDefaultConfig } from "connectkit";
import { foundry } from "viem/chains";
import { publicProvider } from "wagmi/dist/providers/public";

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

export default function Header() {
  return (
    <WagmiConfig config={config}>
      <ConnectKitProvider>
        <div>
          <ConnectKitButton />
        </div>
      </ConnectKitProvider>
    </WagmiConfig>
  );
};