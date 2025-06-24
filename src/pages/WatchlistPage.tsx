import React from 'react';
import { Link } from 'react-router-dom';

// Custom Layout & Feature Components
import Header from '@/components/layout/Header';
import MainSidebar from '@/components/layout/MainSidebar';
import Footer from '@/components/layout/Footer';
import LiveTicker from '@/components/LiveTicker';
import GlassmorphicCard from '@/components/GlassmorphicCard';

// shadcn/ui Components
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from '@/components/ui/scroll-area';

// Icons
import { PlusCircle, Trash2, LineChart } from 'lucide-react';

// Mock Data for the Watchlist
const watchlistData = [
  {
    symbol: 'TSLA',
    name: 'Tesla, Inc.',
    price: 245.01,
    change: 5.12,
    changePercent: 2.13,
    marketCap: '780.5B',
  },
  {
    symbol: 'AAPL',
    name: 'Apple Inc.',
    price: 172.45,
    change: 1.23,
    changePercent: 0.72,
    marketCap: '2.7T',
  },
  {
    symbol: 'NVDA',
    name: 'NVIDIA Corporation',
    price: 460.18,
    change: 10.45,
    changePercent: 2.32,
    marketCap: '1.1T',
  },
  {
    symbol: 'AMZN',
    name: 'Amazon.com, Inc.',
    price: 134.99,
    change: -1.89,
    changePercent: -1.38,
    marketCap: '1.4T',
  },
  {
    symbol: 'GOOGL',
    name: 'Alphabet Inc.',
    price: 135.80,
    change: -0.54,
    changePercent: -0.40,
    marketCap: '1.7T',
  },
];

const WatchlistPage = () => {
  console.log('WatchlistPage loaded');

  return (
    <div className="flex min-h-screen w-full bg-background font-sans">
      <MainSidebar />
      <div className="flex flex-1 flex-col">
        <Header />
        <LiveTicker />
        <ScrollArea className="flex-1">
          <main className="p-4 sm:p-6 lg:p-8">
            <div className="mb-6 flex items-center justify-between">
              <h1 className="text-3xl font-bold tracking-tight text-foreground">
                Watchlist
              </h1>
              <Dialog>
                <DialogTrigger asChild>
                  <Button>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add Stock
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px] bg-card border-border">
                  <DialogHeader>
                    <DialogTitle>Add to Watchlist</DialogTitle>
                    <DialogDescription>
                      Enter a stock symbol to add it to your list.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="symbol" className="text-right">
                        Symbol
                      </Label>
                      <Input
                        id="symbol"
                        defaultValue="MSFT"
                        className="col-span-3"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit">Add to Watchlist</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            <GlassmorphicCard>
                <Table>
                  <TableHeader>
                    <TableRow className="border-b-white/10 hover:bg-transparent">
                      <TableHead className="font-semibold">Symbol</TableHead>
                      <TableHead className="hidden sm:table-cell font-semibold">Company Name</TableHead>
                      <TableHead className="text-right font-semibold">Price</TableHead>
                      <TableHead className="text-right font-semibold">Change</TableHead>
                      <TableHead className="hidden md:table-cell text-right font-semibold">Market Cap</TableHead>
                      <TableHead className="text-center font-semibold">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {watchlistData.map((stock) => {
                      const isUp = stock.change >= 0;
                      return (
                        <TableRow key={stock.symbol} className="border-b-white/10 hover:bg-white/5">
                          <TableCell>
                            <Link to="/assetdetailpage" className="font-bold hover:text-primary transition-colors">
                              {stock.symbol}
                            </Link>
                          </TableCell>
                          <TableCell className="hidden sm:table-cell text-muted-foreground">{stock.name}</TableCell>
                          <TableCell className="text-right font-mono">${stock.price.toFixed(2)}</TableCell>
                          <TableCell className={`text-right font-mono ${isUp ? 'text-accent' : 'text-destructive'}`}>
                            {isUp ? '+' : ''}{stock.change.toFixed(2)} ({isUp ? '+' : ''}{stock.changePercent.toFixed(2)}%)
                          </TableCell>
                          <TableCell className="hidden md:table-cell text-right font-mono text-muted-foreground">{stock.marketCap}</TableCell>
                          <TableCell className="text-center">
                            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
            </GlassmorphicCard>
          </main>
        </ScrollArea>
        <Footer />
      </div>
    </div>
  );
};

export default WatchlistPage;