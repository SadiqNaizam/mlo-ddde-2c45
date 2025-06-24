import React from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import Header from '@/components/layout/Header';
import MainSidebar from '@/components/layout/MainSidebar';
import Footer from '@/components/layout/Footer';

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { toast } from "sonner";

// Define the schema for the profile form using Zod
const profileFormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
});

const SettingsPage = () => {
  console.log('SettingsPage loaded');

  // Initialize react-hook-form
  const form = useForm<z.infer<typeof profileFormSchema>>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: "Analyst",
      email: "analyst@stox.com",
    },
  });

  // Handler for form submission
  function onProfileSubmit(values: z.infer<typeof profileFormSchema>) {
    console.log("Profile updated:", values);
    toast.success("Profile updated successfully!");
  }

  // Handler for API key connection
  function handleConnectApiKey() {
      console.log("Connect API Key clicked");
      toast.info("Connecting to brokerage...", {
          description: "Please follow the instructions in the pop-up window.",
      });
  }

  return (
    <div className="flex min-h-screen w-full bg-background font-sans">
      <MainSidebar />
      <div className="flex flex-1 flex-col">
        <Header />
        <ScrollArea className="flex-1">
          <main className="p-4 md:p-8 space-y-8">
            <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tight text-foreground">Settings</h1>
                <p className="text-muted-foreground">
                    Manage your account, preferences, and integrations.
                </p>
            </div>
            <Separator />

            {/* Profile Settings Card */}
            <Card className="bg-card/60 backdrop-blur-xl border-border/50">
              <CardHeader>
                <CardTitle>Profile</CardTitle>
                <CardDescription>Update your personal details here.</CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onProfileSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Your Name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="your@email.com" {...field} />
                          </FormControl>
                           <FormDescription>
                            This is the email used for notifications and account recovery.
                           </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit">Save Changes</Button>
                  </form>
                </Form>
              </CardContent>
            </Card>

            {/* Notification Settings Card */}
            <Card className="bg-card/60 backdrop-blur-xl border-border/50">
                <CardHeader>
                    <CardTitle>Notifications</CardTitle>
                    <CardDescription>Manage how you receive alerts from Stox.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="flex items-center justify-between rounded-lg border p-4">
                        <div>
                            <Label htmlFor="market-alerts" className="font-medium">Market Alerts</Label>
                            <p className="text-sm text-muted-foreground">Receive alerts for significant market movements.</p>
                        </div>
                        <Switch id="market-alerts" defaultChecked />
                    </div>
                     <div className="flex items-center justify-between rounded-lg border p-4">
                        <div>
                            <Label htmlFor="watchlist-triggers" className="font-medium">Watchlist Triggers</Label>
                            <p className="text-sm text-muted-foreground">Get notified when a stock in your watchlist hits a price target.</p>
                        </div>
                        <Switch id="watchlist-triggers" defaultChecked/>
                    </div>
                     <div className="flex items-center justify-between rounded-lg border p-4">
                        <div>
                            <Label htmlFor="newsletter" className="font-medium">Product Newsletter</Label>
                            <p className="text-sm text-muted-foreground">Receive occasional updates about new features.</p>
                        </div>
                        <Switch id="newsletter" />
                    </div>
                </CardContent>
            </Card>

            {/* API Keys Card */}
            <Card className="bg-card/60 backdrop-blur-xl border-border/50">
                <CardHeader>
                    <CardTitle>API Integrations</CardTitle>
                    <CardDescription>Connect your brokerage accounts to sync your portfolio.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="api-key">New Brokerage API Key</Label>
                        <div className="flex gap-2">
                            <Input id="api-key" placeholder="Enter your API key" />
                            <Button onClick={handleConnectApiKey}>Connect</Button>
                        </div>
                    </div>
                     <div>
                        <h4 className="font-medium text-sm text-foreground mb-2">Connected Accounts</h4>
                        <p className="text-sm text-muted-foreground">No accounts connected yet.</p>
                    </div>
                </CardContent>
            </Card>
          </main>
          <Footer />
        </ScrollArea>
      </div>
    </div>
  );
};

export default SettingsPage;