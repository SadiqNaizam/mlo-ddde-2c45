import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';

type TickerItem = {
  symbol: string;
  price: string;
  change: string;
  changePercent: string;
  isUp: boolean;
};

const mockTickerData: TickerItem[] = [
  { symbol: "AAPL", price: "172.45", change: "+1.23", changePercent: "+0.72%", isUp: true },
  { symbol: "GOOGL", price: "135.80", change: "-0.54", changePercent: "-0.40%", isUp: false },
  { symbol: "TSLA", price: "245.01", change: "+5.12", changePercent: "+2.13%", isUp: true },
  { symbol: "AMZN", price: "134.99", change: "-1.89", changePercent: "-1.38%", isUp: false },
  { symbol: "MSFT", price: "329.87", change: "+2.50", changePercent: "+0.76%", isUp: true },
  { symbol: "NVDA", price: "460.18", change: "+10.45", changePercent: "+2.32%", isUp: true },
  { symbol: "META", price: "301.76", change: "-3.11", changePercent: "-1.02%", isUp: false },
  { symbol: "SPY", price: "450.55", change: "+0.98", changePercent: "+0.22%", isUp: true },
  { symbol: "BTC-USD", price: "37,450.12", change: "+850.40", changePercent: "+2.32%", isUp: true },
  { symbol: "ETH-USD", price: "2,050.50", change: "-25.10", changePercent: "-1.21%", isUp: false },
];

const TickerItemComponent: React.FC<{ item: TickerItem }> = ({ item }) => (
  <div className="flex shrink-0 items-center gap-4 px-6 py-2 mx-4">
    <span className="font-semibold text-sm text-foreground">{item.symbol}</span>
    <span className={`flex items-center text-sm font-medium ${item.isUp ? 'text-accent' : 'text-destructive'}`}>
      {item.isUp ? <TrendingUp className="h-4 w-4 mr-1.5" /> : <TrendingDown className="h-4 w-4 mr-1.5" />}
      {item.change} ({item.changePercent})
    </span>
  </div>
);

const LiveTicker: React.FC = () => {
  console.log('LiveTicker loaded');

  // Duplicate the data to create a seamless loop
  const duplicatedData = [...mockTickerData, ...mockTickerData, ...mockTickerData];

  return (
    <div className="w-full bg-background/50 border-y border-border overflow-hidden whitespace-nowrap group">
      <motion.div
        className="flex"
        animate={{
          x: ['0%', '-66.66%'],
        }}
        transition={{
          ease: 'linear',
          duration: 60,
          repeat: Infinity,
        }}
      >
        {duplicatedData.map((item, index) => (
          <TickerItemComponent key={index} item={item} />
        ))}
      </motion.div>
    </div>
  );
};

export default LiveTicker;