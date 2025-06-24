import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  console.log('Footer loaded');
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-background/50">
      <div className="container flex h-14 items-center justify-between px-4 md:px-6">
        <p className="text-xs text-muted-foreground">
          &copy; {currentYear} Stox Inc. All rights reserved.
        </p>
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <span>Data provided by Finnhub & Polygon.io</span>
          <Link
            to="/status" // Placeholder link, as no route exists in App.tsx
            className="hover:text-foreground transition-colors"
          >
            System Status
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;