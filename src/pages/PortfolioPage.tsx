import React from 'react';
import Header from '@/components/layout/Header';
import MainSidebar from '@/components/layout/MainSidebar';
import Footer from '@/components/layout/Footer';
import AdvancedGraphContainer from '@/components/AdvancedGraphContainer';
import GlassmorphicCard from '@/components/GlassmorphicCard';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from "@/lib/utils";

// --- MOCK DATA ---
const portfolioStats = {
  totalValue: 125678.90,
  dayChange: 1234.56,
  dayChangePercent: 1.01,
  totalPL: 25678.90,
  totalPLPercent: 25.68,
};

const holdingsData = [
  {
    symbol: 'AAPL',
    name: 'Apple Inc.',
    quantity: 50,
    avgPrice: 150.25,
    currentPrice: 172.45,
  },
  {
    symbol: 'TSLA',
    name: 'Tesla, Inc.',
    quantity: 25,
    avgPrice: 200.00,
    currentPrice: 245.01,
  },
  {
    symbol: 'NVDA',
    name: 'NVIDIA Corporation',
    quantity: 30,
    avgPrice: 350.70,
    currentPrice: 460.18,
  },
  {
    symbol: 'GOOGL',
    name: 'Alphabet Inc.',
    quantity: 15,
    avgPrice: 140.10,
    currentPrice: 135.80,
  },
  {
    symbol: 'AMZN',
    name: 'Amazon.com, Inc.',
    quantity: 20,
    avgPrice: 125.50,
    currentPrice: 134.99,
  },
];

const PortfolioPage = () => {
  console.log('PortfolioPage loaded');

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(value);
  };

  return (
    <div className="flex min-h-screen w-full bg-background">
      <MainSidebar />
      <div className="flex flex-1 flex-col">
        <Header />
        <main className="flex-1 overflow-y-auto p-6 lg:p-8 space-y-8">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">My Portfolio</h1>
            <p className="text-muted-foreground">
              An overview of your current assets and performance.
            </p>
          </div>

          {/* Portfolio Stats Cards */}
          <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <GlassmorphicCard>
              <div className="p-4">
                <p className="text-sm font-medium text-muted-foreground">Total Value</p>
                <p className="text-2xl font-bold">{formatCurrency(portfolioStats.totalValue)}</p>
              </div>
            </GlassmorphicCard>
            <GlassmorphicCard>
              <div className="p-4">
                <p className="text-sm font-medium text-muted-foreground">Day's P/L</p>
                <p className={cn(
                  "text-2xl font-bold flex items-center gap-2",
                  portfolioStats.dayChange >= 0 ? "text-accent" : "text-destructive"
                )}>
                  {portfolioStats.dayChange >= 0 ? <TrendingUp size={22} /> : <TrendingDown size={22} />}
                  <span>{formatCurrency(portfolioStats.dayChange)}</span>
                </p>
                <p className={cn(
                  "text-xs text-muted-foreground",
                  portfolioStats.dayChange >= 0 ? "text-accent" : "text-destructive"
                )}>
                  ({portfolioStats.dayChange >= 0 ? '+' : ''}{portfolioStats.dayChangePercent.toFixed(2)}%)
                </p>
              </div>
            </GlassmorphicCard>
            <GlassmorphicCard>
              <div className="p-4">
                <p className="text-sm font-medium text-muted-foreground">Total P/L</p>
                <p className={cn(
                  "text-2xl font-bold",
                  portfolioStats.totalPL >= 0 ? "text-accent" : "text-destructive"
                )}>
                  {formatCurrency(portfolioStats.totalPL)}
                </p>
                <p className={cn(
                  "text-xs text-muted-foreground",
                  portfolioStats.totalPL >= 0 ? "text-accent" : "text-destructive"
                )}>
                   ({portfolioStats.totalPL >= 0 ? '+' : ''}{portfolioStats.totalPLPercent.toFixed(2)}%)
                </p>
              </div>
            </GlassmorphicCard>
             <GlassmorphicCard>
              <div className="p-4">
                <p className="text-sm font-medium text-muted-foreground">Asset Allocation</p>
                 <p className="text-2xl font-bold">Tech Heavy</p>
                 <p className="text-xs text-muted-foreground">5 Assets</p>
              </div>
            </GlassmorphicCard>
          </section>

          {/* Performance Graph */}
          <section>
            <AdvancedGraphContainer 
              title="Portfolio Performance"
              description="Your portfolio's value over the selected timeframe."
            />
          </section>

          {/* Holdings Table */}
          <section>
            <div className="bg-card/60 backdrop-blur-xl border border-border/50 rounded-lg p-4">
              <Table>
                <TableCaption>A detailed list of your current holdings.</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Symbol</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Avg. Price</TableHead>
                    <TableHead>Current Price</TableHead>
                    <TableHead className="text-right">Total P/L</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {holdingsData.map((asset) => {
                    const totalCost = asset.quantity * asset.avgPrice;
                    const marketValue = asset.quantity * asset.currentPrice;
                    const totalPL = marketValue - totalCost;
                    const isProfit = totalPL >= 0;

                    return (
                      <TableRow key={asset.symbol}>
                        <TableCell className="font-medium">{asset.symbol}</TableCell>
                        <TableCell>{asset.name}</TableCell>
                        <TableCell>{asset.quantity}</TableCell>
                        <TableCell>{formatCurrency(asset.avgPrice)}</TableCell>
                        <TableCell>{formatCurrency(asset.currentPrice)}</TableCell>
                        <TableCell className={cn(
                          "text-right font-semibold",
                          isProfit ? "text-accent" : "text-destructive"
                        )}>
                          {formatCurrency(totalPL)}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default PortfolioPage;