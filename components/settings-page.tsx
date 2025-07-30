"use client"

import { Key, Bell, DollarSign, Save, Eye, EyeOff } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"

export function SettingsPage() {
  const [showApiKey, setShowApiKey] = useState(false)
  const [apiKey, setApiKey] = useState("ak_test_1234567890abcdef")

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">Manage your SMS dashboard configuration and preferences</p>
      </div>

      <div className="grid gap-6">
        {/* API Configuration */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Key className="w-5 h-5" />
              <CardTitle>API Configuration</CardTitle>
            </div>
            <CardDescription>Manage your Arkesel API credentials and connection settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="api-key">Arkesel API Key</Label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Input
                    id="api-key"
                    type={showApiKey ? "text" : "password"}
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    placeholder="Enter your Arkesel API key"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowApiKey(!showApiKey)}
                  >
                    {showApiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
                <Button variant="outline">Test Connection</Button>
              </div>
              <p className="text-sm text-muted-foreground">
                Your API key is used to authenticate with Arkesel SMS service
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="webhook-url">Webhook URL (Optional)</Label>
              <Input id="webhook-url" placeholder="https://your-domain.com/webhook" />
              <p className="text-sm text-muted-foreground">Receive delivery status updates at this URL</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="sender-id">Default Sender ID</Label>
              <Input id="sender-id" placeholder="YourBrand" maxLength={11} />
              <p className="text-sm text-muted-foreground">
                Default sender name for your SMS messages (max 11 characters)
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Bell className="w-5 h-5" />
              <CardTitle>Notification Settings</CardTitle>
            </div>
            <CardDescription>Configure when and how you receive notifications</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>SMS Delivery Notifications</Label>
                <p className="text-sm text-muted-foreground">Get notified when SMS messages are delivered</p>
              </div>
              <Switch defaultChecked />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Failed SMS Alerts</Label>
                <p className="text-sm text-muted-foreground">Receive alerts when SMS messages fail to deliver</p>
              </div>
              <Switch defaultChecked />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Daily Usage Reports</Label>
                <p className="text-sm text-muted-foreground">Get daily summaries of your SMS usage</p>
              </div>
              <Switch />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Low Credit Warnings</Label>
                <p className="text-sm text-muted-foreground">Alert when your SMS credits are running low</p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="space-y-2">
              <Label htmlFor="credit-threshold">Credit Warning Threshold</Label>
              <div className="flex items-center gap-2">
                <Input id="credit-threshold" type="number" defaultValue="100" className="w-24" />
                <span className="text-sm text-muted-foreground">credits remaining</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Currency and Billing */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <DollarSign className="w-5 h-5" />
              <CardTitle>Currency & Billing</CardTitle>
            </div>
            <CardDescription>Configure your preferred currency and billing settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="currency">Preferred Currency</Label>
              <Select defaultValue="usd">
                <SelectTrigger>
                  <SelectValue placeholder="Select currency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="usd">USD - US Dollar</SelectItem>
                  <SelectItem value="eur">EUR - Euro</SelectItem>
                  <SelectItem value="gbp">GBP - British Pound</SelectItem>
                  <SelectItem value="cad">CAD - Canadian Dollar</SelectItem>
                  <SelectItem value="aud">AUD - Australian Dollar</SelectItem>
                  <SelectItem value="ghs">GHS - Ghanaian Cedi</SelectItem>
                  <SelectItem value="ngn">NGN - Nigerian Naira</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="billing-email">Billing Email</Label>
              <Input id="billing-email" type="email" placeholder="billing@yourcompany.com" />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Auto-recharge Credits</Label>
                <p className="text-sm text-muted-foreground">Automatically purchase credits when running low</p>
              </div>
              <Switch />
            </div>

            <div className="space-y-2">
              <Label htmlFor="recharge-amount">Auto-recharge Amount</Label>
              <div className="flex items-center gap-2">
                <span className="text-sm">$</span>
                <Input id="recharge-amount" type="number" defaultValue="50" className="w-24" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Save Button */}
        <div className="flex justify-end">
          <Button className="w-32">
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  )
}
