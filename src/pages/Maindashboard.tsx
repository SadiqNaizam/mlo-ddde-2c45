import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { DollarSign, TrendingUp, TrendingDown, Star } from 'lucide-react';
import Header from '@/components/layout/Header';
import MainSidebar from '@/components/layout/MainSidebar';
import LiveTicker from '@/components/LiveTicker';
import GlassmorphicCard from '@/components/GlassmorphicCard';
import AdvancedGraphContainer from '@/components/AdvancedGraphContainer';
import Footer from '@/components/layout/Footer';

const Maindashboard = () => {
  console.log('Maindashboard loaded');

  return (
    <div className="dark min-h-screen bg-background text-foreground font-sans">
      <div className="flex">
        <MainSidebar />
        <div className="flex flex-col flex-1 min-w-0">
          <Header />
          <LiveTicker />
          <ScrollArea className="h-[calc(100vh-8rem)]">
            <main className="p-4 md:p-8 space-y-8">
              {/* Page Title */}
              <header>
                <h1 className="text-3xl font-bold tracking-tight text-foreground">
                  Dashboard
                </h1>
                <p className="text-muted-foreground">
                  Welcome back, here's a snapshot of your financial world.
                </p>
              </header>

              {/* Portfolio Summary Section */}
              <section>
                <h2 className="text-xl font-semibold mb-4 tracking-tight">Portfolio Snapshot</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {/* Card 1: Total Value */}
                  <GlassmorphicCard>
                    <div className="p-6 flex flex-col justify-between h-full">
                      <div className="flex items-center justify-between text-muted-foreground mb-4">
                        <span className="text-sm font-medium">Total Value</span>
                        <DollarSign className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-3xl font-bold text-foreground">$125,342.88</p>
                        <p className="text-xs text-muted-foreground">Across 12 assets</p>
                      </div>
                    </div>
                  </GlassmorphicCard>

                  {/* Card 2: Day's Gain */}
                   <GlassmorphicCard>
                    <div className="p-6 flex flex-col justify-between h-full">
                      <div className="flex items-center justify-between text-muted-foreground mb-4">
                        <span className="text-sm font-medium">Day's Gain</span>
                        <TrendingUp className="h-5 w-5 text-accent" />
                      </div>
                      <div>
                        <p className="text-3xl font-bold text-accent">+$1,234.56</p>
                        <p className="text-xs text-accent">(+1.01%)</p>
                      </div>
                    </div>
                  </GlassmorphicCard>

                  {/* Card 3: Best Performer */}
                  <GlassmorphicCard>
                    <div className="p-6 flex flex-col justify-between h-full">
                      <div className="flex items-center justify-between text-muted-foreground mb-4">
                        <span className="text-sm font-medium">Best Performer</span>
                        <Star className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-foreground">NVDA</p>
                        <p className="text-sm text-accent font-medium">+5.20%</p>
                      </div>
                    </div>
                  </GlassmorphicCard>

                  {/* Card 4: Worst Performer */}
                   <GlassmorphicCard>
                    <div className="p-6 flex flex-col justify-between h-full">
                      <div className="flex items-center justify-between text-muted-foreground mb-4">
                        <span className="text-sm font-medium">Worst Performer</span>
                        <TrendingDown className="h-5 w-5 text-destructive" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-foreground">META</p>
                        <p className="text-sm text-destructive font-medium">-2.10%</p>
                      </div>
                    </div>
                  </GlassmorphicCard>
                </div>
              </section>

              {/* Main Graph Section */}
              <section>
                 <AdvancedGraphContainer
                    title="Market Overview: S&P 500"
                    description="Performance of the S&P 500 index. Interact with the graph to explore data points."
                 />
              </section>
            </main>
            <Footer />
          </ScrollArea>
        </div>
      </div>
    </div>
  );
};

export default Maindashboard;