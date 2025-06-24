import React, { useState, useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, DotProps } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { motion } from 'framer-motion';

// --- MOCK DATA ---
// In a real application, this data would come from props or a data fetching hook.
const generateData = (points: number) => {
  let val = 100;
  let data = [];
  const today = new Date();
  for (let i = 0; i < points; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() - (points - i - 1));
    val += (Math.random() - 0.5) * 5;
    data.push({
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      price: Math.max(20, val),
      volume: Math.floor(Math.random() * 1000000) + 500000,
    });
  }
  return data;
};

const fullData = generateData(365); // 1 year of data

// --- PROPS INTERFACE ---
interface AdvancedGraphContainerProps {
  title: string;
  description: string;
  className?: string;
}

// --- CUSTOM TOOLTIP ---
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="p-3 rounded-md border bg-background/80 backdrop-blur-sm shadow-lg">
        <p className="label text-sm text-foreground">{`${label}`}</p>
        <p className="intro text-primary font-bold">{`$${payload[0].value.toFixed(2)}`}</p>
        <p className="text-xs text-muted-foreground">{`Volume: ${payload[1].value.toLocaleString()}`}</p>
      </div>
    );
  }
  return null;
};

// --- CUSTOM INTERACTIVE DOT (simulating InteractiveDataPoint) ---
const CustomizedActiveDot = (props: DotProps) => {
  const { cx, cy, stroke, fill } = props;

  if (cx === undefined || cy === undefined) return null;

  return (
    <g>
      <circle cx={cx} cy={cy} r={10} fill={stroke} fillOpacity={0.2} />
      <circle cx={cx} cy={cy} r={4} stroke={stroke} fill={fill} />
    </g>
  );
};


// --- MAIN COMPONENT ---
const AdvancedGraphContainer: React.FC<AdvancedGraphContainerProps> = ({ title, description, className }) => {
  const [timeframe, setTimeframe] = useState('1Y');
  console.log('AdvancedGraphContainer loaded');

  const chartData = useMemo(() => {
    switch (timeframe) {
      case '1M':
        return fullData.slice(-30);
      case '6M':
        return fullData.slice(-180);
      case '1Y':
      default:
        return fullData;
    }
  }, [timeframe]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <Card className={`w-full bg-card/60 backdrop-blur-xl border-border/50 ${className}`}>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
            <div>
              <CardTitle className="text-xl font-bold text-foreground">{title}</CardTitle>
              <CardDescription className="text-muted-foreground">{description}</CardDescription>
            </div>
            <ToggleGroup
              type="single"
              defaultValue="1Y"
              value={timeframe}
              onValueChange={(value) => value && setTimeframe(value)}
              aria-label="Select timeframe"
              className="bg-muted/50 p-1 rounded-md"
            >
              <ToggleGroupItem value="1M" aria-label="1 Month">1M</ToggleGroupItem>
              <ToggleGroupItem value="6M" aria-label="6 Months">6M</ToggleGroupItem>
              <ToggleGroupItem value="1Y" aria-label="1 Year">1Y</ToggleGroupItem>
            </ToggleGroup>
          </div>
        </CardHeader>
        <CardContent>
          <div style={{ width: '100%', height: 400 }}>
            <ResponsiveContainer>
              <AreaChart
                data={chartData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.6}/>
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border) / 0.5)" />
                <XAxis 
                  dataKey="date" 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `$${value}`}
                />
                <Tooltip 
                  content={<CustomTooltip />}
                  cursor={{ stroke: 'hsl(var(--primary))', strokeWidth: 1, strokeDasharray: '3 3' }}
                />
                <Legend />
                <Area 
                  type="monotone" 
                  dataKey="price" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={2}
                  fillOpacity={1} 
                  fill="url(#colorPrice)" 
                  animationDuration={1500}
                  activeDot={<CustomizedActiveDot />}
                />
                 <Area type="monotone" dataKey="volume" stroke="hsl(var(--accent))" fill="transparent" yAxisId="volume" display="none" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default AdvancedGraphContainer;