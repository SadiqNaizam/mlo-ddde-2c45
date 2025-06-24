import React from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

// Custom Components
import Header from '@/components/layout/Header';
import MainSidebar from '@/components/layout/MainSidebar';
import Footer from '@/components/layout/Footer';
import AdvancedGraphContainer from '@/components/AdvancedGraphContainer';
import GlassmorphicCard from '@/components/GlassmorphicCard';

// Shadcn/UI Components
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PlusCircle } from 'lucide-react';

// Mock Data for placeholders
const keyStats = [
  { label: 'Market Cap', value: '$580.3B' },
  { label: 'P/E Ratio', value: '39.95' },
  { label: 'Dividend Yield', value: 'N/A' },
  { label: 'Beta (5Y Monthly)', value: '2.05' },
];

const financials = [
  { year: '2023', revenue: '$96.77B', netIncome: '$14.99B', eps: '$4.30' },
  { year: '2022', revenue: '$81.46B', netIncome: '$12.55B', eps: '$3.62' },
  { year: '2021', revenue: '$53.82B', netIncome: '$5.51B', eps: '$1.63' },
];

const news = [
  { id: 1, title: "Tesla recalls nearly 200,000 vehicles in the US over software glitch", source: "Reuters", time: "2h ago" },
  { id: 2, title: "Analyst Upgrades TSLA to 'Buy' with $250 Price Target Amid AI Optimism", source: "MarketWatch", time: "5h ago" },
  { id: 3, title: "Elon Musk teases new 'Cybervan' concept on X, shares render", source: "Bloomberg", time: "1d ago" },
];

const Assetdetailpage = () => {
  console.log('Assetdetailpage loaded');

  const handleAddToWatchlist = () => {
    toast.success("Tesla, Inc. (TSLA) added to your watchlist.");
  };

  return (
    <div className="flex min-h-screen w-full bg-background text-foreground dark">
      <MainSidebar />
      <div className="flex flex-1 flex-col">
        <Header />
        <ScrollArea className="flex-1">
          <main className="space-y-6 p-4 sm:p-6 lg:p-8">
            {/* BREADCRUMBS & PAGE HEADER */}
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
              <div>
                <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbItem><BreadcrumbLink asChild><Link to="/">Dashboard</Link></BreadcrumbLink></BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem><BreadcrumbLink asChild><Link to="/watchlistpage">Assets</Link></BreadcrumbLink></BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem><BreadcrumbPage>TSLA</BreadcrumbPage></BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
                <h1 className="mt-2 text-3xl font-bold tracking-tight">Tesla, Inc. (TSLA)</h1>
                <p className="text-muted-foreground">Nasdaq Global Select</p>
              </div>
              <div className="flex items-center gap-4">
                 <div className="text-right">
                    <p className="text-3xl font-bold text-accent">$182.01</p>
                    <p className="text-sm font-medium text-destructive">-2.87 (-1.55%)</p>
                 </div>
                <Button onClick={handleAddToWatchlist}>
                  <PlusCircle className="mr-2 h-4 w-4" /> Add to Watchlist
                </Button>
              </div>
            </div>

            {/* MAIN GRAPH CONTAINER */}
            <AdvancedGraphContainer
              title="Price Performance"
              description="Interactive chart showing historical stock performance for TSLA."
            />

            {/* TABS FOR DETAILED INFO */}
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-3 md:w-[400px]">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="financials">Financials</TabsTrigger>
                <TabsTrigger value="news">News</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="mt-4 space-y-6">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                  {keyStats.map(stat => (
                    <GlassmorphicCard key={stat.label}>
                       <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                          <CardTitle className="text-sm font-medium text-muted-foreground">{stat.label}</CardTitle>
                       </CardHeader>
                       <CardContent>
                          <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                       </CardContent>
                    </GlassmorphicCard>
                  ))}
                </div>
                <Card className="border-border/50 bg-card/60 backdrop-blur-xl">
                  <CardHeader><CardTitle>Company Profile</CardTitle></CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Tesla, Inc. designs, develops, manufactures, leases, and sells electric vehicles, and energy generation and storage systems in the United States, China, and internationally. The company operates in two segments, Automotive, and Energy Generation and Storage.
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="financials" className="mt-4">
                 <Card className="border-border/50 bg-card/60 backdrop-blur-xl">
                   <CardHeader><CardTitle>Annual Financials</CardTitle><CardDescription>All numbers in USD</CardDescription></CardHeader>
                   <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="w-[100px]">Year</TableHead>
                            <TableHead>Revenue</TableHead>
                            <TableHead>Net Income</TableHead>
                            <TableHead className="text-right">EPS (Diluted)</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {financials.map(fin => (
                            <TableRow key={fin.year}>
                              <TableCell className="font-medium">{fin.year}</TableCell>
                              <TableCell>{fin.revenue}</TableCell>
                              <TableCell>{fin.netIncome}</TableCell>
                              <TableCell className="text-right">{fin.eps}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                   </CardContent>
                 </Card>
              </TabsContent>

              <TabsContent value="news" className="mt-4 space-y-4">
                 {news.map(item => (
                   <Card key={item.id} className="border-border/50 bg-card/60 backdrop-blur-xl transition-all hover:border-primary/50">
                      <CardContent className="p-4">
                        <a href="#" className="font-semibold text-foreground hover:text-primary">{item.title}</a>
                        <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                          <span>{item.source}</span>
                          <span className="text-xs">&bull;</span>
                          <span>{item.time}</span>
                        </div>
                      </CardContent>
                   </Card>
                 ))}
              </TabsContent>
            </Tabs>
          </main>
        </ScrollArea>
        <Footer />
      </div>
    </div>
  );
};

export default Assetdetailpage;