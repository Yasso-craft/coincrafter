import { useState } from "react";
import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

export default function CoinCrafter() {
  const [wallet, setWallet] = useState(null);
  const [tokenName, setTokenName] = useState("");
  const [tokenSymbol, setTokenSymbol] = useState("");
  const [supply, setSupply] = useState("");
  const [creating, setCreating] = useState(false);

  const connectWallet = async () => {
    if (window.solana && window.solana.isPhantom) {
      const response = await window.solana.connect();
      setWallet(response.publicKey.toString());
    } else {
      alert("Please install Phantom Wallet.");
    }
  };

  const createToken = async () => {
    if (!wallet || !tokenName || !tokenSymbol || !supply) {
      alert("Please fill in all fields and connect wallet.");
      return;
    }
    setCreating(true);

    try {
      const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
      // Token creation logic will be added here in next steps
      setTimeout(() => {
        alert("Token created successfully (simulated)!");
        setCreating(false);
      }, 1500);
    } catch (error) {
      alert("Error creating token: " + error.message);
      setCreating(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex flex-col items-center py-12 px-4">
      <h1 className="text-4xl font-bold text-green-400 mb-4">CoinCrafter</h1>
      <p className="text-purple-300 mb-10 text-center max-w-lg">
        Launch your own meme coin on Solana in seconds. No coding. No rugpulls. Just pure degen magic.
      </p>

      <Card className="w-full max-w-md bg-zinc-900 border border-zinc-700 rounded-2xl shadow-xl">
        <CardContent className="p-6 space-y-4">
          <Input
            placeholder="Token Name (e.g., DogeFace)"
            value={tokenName}
            onChange={(e) => setTokenName(e.target.value)}
            className="bg-zinc-800 text-white border-purple-500 focus:ring-purple-500"
          />
          <Input
            placeholder="Token Symbol (e.g., DGF)"
            value={tokenSymbol}
            onChange={(e) => setTokenSymbol(e.target.value)}
            className="bg-zinc-800 text-white border-green-500 focus:ring-green-500"
          />
          <Input
            placeholder="Total Supply (e.g., 1000000)"
            type="number"
            value={supply}
            onChange={(e) => setSupply(e.target.value)}
            className="bg-zinc-800 text-white border-purple-500 focus:ring-purple-500"
          />

          {!wallet ? (
            <Button onClick={connectWallet} className="w-full bg-green-500 text-zinc-900 font-bold hover:bg-green-400">
              Connect Wallet
            </Button>
          ) : (
            <div className="text-sm text-green-400">Wallet: {wallet.slice(0, 4)}...{wallet.slice(-4)}</div>
          )}

          <Button
            disabled={creating}
            onClick={createToken}
            className="w-full bg-purple-600 text-white font-bold hover:bg-purple-500"
          >
            {creating ? "Creating..." : "Create Meme Coin"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
