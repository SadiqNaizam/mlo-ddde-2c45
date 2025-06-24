import React from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Define the structure for the data that the point represents
export interface DataPointInfo {
  date: string;
  value: number;
  // Allow for additional, dynamic details to be passed
  [key: string]: any;
}

// Define the props for the component
interface InteractiveDataPointProps {
  x: number; // x-coordinate for absolute positioning
  y: number; // y-coordinate for absolute positioning
  data: DataPointInfo;
  color?: string; // Optional color override for the point
}

const InteractiveDataPoint: React.FC<InteractiveDataPointProps> = ({ x, y, data, color }) => {
  console.log('InteractiveDataPoint loaded for date:', data.date);

  // We subtract half the width/height from the coordinates to center the point on the x/y values
  const pointSize = 12; // 0.75rem or w-3/h-3
  const centeredX = x - (pointSize / 2);
  const centeredY = y - (pointSize / 2);

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div
          className="absolute rounded-full cursor-pointer transition-all duration-200 ease-in-out"
          style={{
            left: `${centeredX}px`,
            top: `${centeredY}px`,
            width: `${pointSize}px`,
            height: `${pointSize}px`,
            // Use the provided color or default to a semi-transparent primary color
            backgroundColor: color || 'hsl(var(--primary) / 0.5)',
            // The glow effect on hover using the primary theme color
            boxShadow: '0 0 0 0 hsl(var(--primary) / 0.7)',
          }}
          // We use a peer-hover strategy for a more advanced glow effect in Tailwind
          // but inline styles are more dynamic. Let's use Tailwind for a cleaner hover state.
          // The following is a more Tailwind-idiomatic way:
          // className="... hover:bg-primary hover:shadow-[0_0_12px_3px_hsl(var(--primary))] ..."
        >
            {/* Inner dot for more complex styling, e.g., a solid core */}
            <div
                className="w-full h-full rounded-full bg-background transition-transform duration-200 group-hover:scale-50"
                style={{
                    backgroundColor: color || 'hsl(var(--primary))',
                }}
            />
        </div>
      </TooltipTrigger>
      <TooltipContent className="bg-background border-primary">
        <div className="p-1 font-sans">
          <p className="font-bold text-foreground">Date: {data.date}</p>
          <p className="text-muted-foreground">Value: {data.value.toLocaleString()}</p>
          {/* Render other details if they exist */}
          {Object.entries(data).map(([key, value]) => {
            if (key !== 'date' && key !== 'value') {
              return <p key={key} className="text-muted-foreground capitalize">{key}: {String(value)}</p>;
            }
            return null;
          })}
        </div>
      </TooltipContent>
    </Tooltip>
  );
};

export default InteractiveDataPoint;