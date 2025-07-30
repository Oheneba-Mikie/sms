"use client"

import { useState } from "react"
import { Bell, MessageSquare, Search, Users, DollarSign, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { AppSidebar } from "@/components/app-sidebar"
import { CustomersPage } from "@/components/customers-page"
import { AnalyticsPage } from "@/components/analytics-page"
import { SettingsPage } from "@/components/settings-page"

// Sample data for charts
const smsVolumeData = [
  { date: "Jan", sent: 1200, delivered: 1150, failed: 50 },
  { date: "Feb", sent: 1800, delivered: 1720, failed: 80 },
  { date: "Mar", sent: 2200, delivered: 2100, failed: 100 },
  { date: "Apr", sent: 1900, delivered: 1820, failed: 80 },
  { date: "May", sent: 2800, delivered: 2650, failed: 150 },
  { date: "Jun", sent: 3200, delivered: 3050, failed: 150 },
]

const deliveryStatusData = [
  { name: "Delivered", value: 85, color: "#22c55e" },
  { name: "Failed", value: 8, color: "#ef4444" },
  { name: "Pending", value: 7, color: "#f59e0b" },
]

const recentSMS = [
  {
    id: "SMS001",
    customer: "John Doe",
    phone: "+1 (555) 123-4567",
    message: "Thank you for your service!",
    status: "delivered",
    timestamp: "2024-01-15 14:30",
    cost: "$0.05",
  },
  {
    id: "SMS002",
    customer: "Jane Smith",
    phone: "+1 (555) 987-6543",
    message: "Order confirmation needed",
    status: "delivered",
    timestamp: "2024-01-15 14:25",
    cost: "$0.05",
  },
  {
    id: "SMS003",
    customer: "Mike Johnson",
    phone: "+1 (555) 456-7890",
    message: "Appointment reminder",
    status: "failed",
    timestamp: "2024-01-15 14:20",
    cost: "$0.00",
  },
  {
    id: "SMS004",
    customer: "Sarah Wilson",
    phone: "+1 (555) 321-0987",
    message: "Payment confirmation",
    status: "pending",
    timestamp: "2024-01-15 14:15",
    cost: "$0.05",
  },
  {
    id: "SMS005",
    customer: "David Brown",
    phone: "+1 (555) 654-3210",
    message: "Welcome to our service!",
    status: "delivered",
    timestamp: "2024-01-15 14:10",
    cost: "$0.05",
  },
]

const getStatusBadge = (status: string) => {
  switch (status) {
    case "delivered":
      return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Delivered</Badge>
    case "failed":
      return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Failed</Badge>
    case "pending":
      return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Pending</Badge>
    default:
      return <Badge variant="secondary">{status}</Badge>
  }
}

function OverviewPage() {
  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total SMS Sent</CardTitle>
            <MessageSquare className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12,450</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+15.2%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Delivery Rate</CardTitle>
            <CheckCircle className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">94.2%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+2.1%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Customers</CardTitle>
            <Users className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,847</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+8.7%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Cost</CardTitle>
            <DollarSign className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$622.50</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+12.3%</span> from last month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* SMS Volume Chart */}
        <Card>
          <CardHeader>
            <CardTitle>SMS Volume Trends</CardTitle>
            <CardDescription>Monthly SMS sending patterns</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                sent: {
                  label: "Sent",
                  color: "hsl(var(--chart-1))",
                },
                delivered: {
                  label: "Delivered",
                  color: "hsl(var(--chart-2))",
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={smsVolumeData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line type="monotone" dataKey="sent" stroke="#8884d8" strokeWidth={2} name="Sent" />
                  <Line type="monotone" dataKey="delivered" stroke="#82ca9d" strokeWidth={2} name="Delivered" />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Delivery Status Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Delivery Status</CardTitle>
            <CardDescription>SMS delivery success rates</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                delivered: {
                  label: "Delivered",
                  color: "#22c55e",
                },
                failed: {
                  label: "Failed",
                  color: "#ef4444",
                },
                pending: {
                  label: "Pending",
                  color: "#f59e0b",
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={deliveryStatusData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {deliveryStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent SMS Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent SMS Activity</CardTitle>
          <CardDescription>Latest SMS messages sent by customers</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>SMS ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Phone Number</TableHead>
                <TableHead>Message Preview</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Timestamp</TableHead>
                <TableHead className="text-right">Cost</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentSMS.map((sms) => (
                <TableRow key={sms.id}>
                  <TableCell className="font-medium">{sms.id}</TableCell>
                  <TableCell>{sms.customer}</TableCell>
                  <TableCell>{sms.phone}</TableCell>
                  <TableCell className="max-w-[200px] truncate">{sms.message}</TableCell>
                  <TableCell>{getStatusBadge(sms.status)}</TableCell>
                  <TableCell>{sms.timestamp}</TableCell>
                  <TableCell className="text-right">{sms.cost}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

export default function SMSDashboard() {
  const [currentPage, setCurrentPage] = useState("/")

  const renderPage = () => {
    switch (currentPage) {
      case "/":
        return <OverviewPage />
      case "/customers":
        return <CustomersPage />
      case "/analytics":
        return <AnalyticsPage />
      case "/settings":
        return <SettingsPage />
      default:
        return <OverviewPage />
    }
  }

  const getPageTitle = () => {
    switch (currentPage) {
      case "/":
        return "Overview"
      case "/customers":
        return "Customers"
      case "/analytics":
        return "Analytics"
      case "/settings":
        return "Settings"
      default:
        return "Overview"
    }
  }

  return (
    <SidebarProvider>
      <AppSidebar currentPage={currentPage} onPageChange={setCurrentPage} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <div className="flex items-center gap-2">
            <h1 className="font-semibold">{getPageTitle()}</h1>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search..." className="pl-8 w-[200px] lg:w-[300px]" />
            </div>
            <Button variant="ghost" size="icon">
              <Bell className="h-4 w-4" />
            </Button>
          </div>
        </header>
        <main className="flex-1 p-6">{renderPage()}</main>
      </SidebarInset>
    </SidebarProvider>
  )
}
