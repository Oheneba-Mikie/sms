"use client"

import { CalendarDays, Users, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts"

const smsPerUserData = [
  { user: "David B.", sms: 3420, growth: 15.2 },
  { user: "Mike J.", sms: 2340, growth: -5.1 },
  { user: "Lisa G.", sms: 1890, growth: 22.8 },
  { user: "John D.", sms: 1250, growth: 8.4 },
  { user: "Jane S.", sms: 890, growth: 12.1 },
  { user: "Sarah W.", sms: 567, growth: 45.2 },
]

const useCaseData = [
  { name: "Promotional", value: 65, color: "#3b82f6" },
  { name: "Transactional", value: 35, color: "#10b981" },
]

const monthlyTrendsData = [
  { month: "Jul", promotional: 1200, transactional: 800 },
  { month: "Aug", promotional: 1800, transactional: 1200 },
  { month: "Sep", promotional: 2200, transactional: 1400 },
  { month: "Oct", promotional: 1900, transactional: 1100 },
  { month: "Nov", promotional: 2800, transactional: 1600 },
  { month: "Dec", promotional: 3200, transactional: 1800 },
]

export function AnalyticsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
          <p className="text-muted-foreground">Detailed insights into your SMS performance and usage patterns</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <CalendarDays className="w-4 h-4" />
          <Select defaultValue="30days">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select date range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">Last 7 days</SelectItem>
              <SelectItem value="30days">Last 30 days</SelectItem>
              <SelectItem value="90days">Last 90 days</SelectItem>
              <SelectItem value="1year">Last year</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4" />
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select user" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Users</SelectItem>
              <SelectItem value="david">David Brown</SelectItem>
              <SelectItem value="mike">Mike Johnson</SelectItem>
              <SelectItem value="lisa">Lisa Garcia</SelectItem>
              <SelectItem value="john">John Doe</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button variant="outline">Export Report</Button>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total SMS This Period</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18,450</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <TrendingUp className="w-3 h-3 mr-1 text-green-600" />
              <span className="text-green-600">+23.5%</span> vs previous period
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Average Daily Volume</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">615</div>
            <p className="text-xs text-muted-foreground">SMS per day</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Peak Usage Day</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,240</div>
            <p className="text-xs text-muted-foreground">January 12, 2024</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* SMS Per User Chart */}
        <Card>
          <CardHeader>
            <CardTitle>SMS Sent Per User</CardTitle>
            <CardDescription>Top users by SMS volume in the selected period</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                sms: {
                  label: "SMS Sent",
                  color: "hsl(var(--chart-1))",
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={smsPerUserData} layout="horizontal">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="user" type="category" width={80} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="sms" fill="#3b82f6" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Use Case Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Use Case Breakdown</CardTitle>
            <CardDescription>Distribution of promotional vs transactional SMS</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                promotional: {
                  label: "Promotional",
                  color: "#3b82f6",
                },
                transactional: {
                  label: "Transactional",
                  color: "#10b981",
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={useCaseData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {useCaseData.map((entry, index) => (
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

      {/* Monthly Trends */}
      <Card>
        <CardHeader>
          <CardTitle>Monthly SMS Trends</CardTitle>
          <CardDescription>Promotional vs Transactional SMS volume over time</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              promotional: {
                label: "Promotional",
                color: "#3b82f6",
              },
              transactional: {
                label: "Transactional",
                color: "#10b981",
              },
            }}
            className="h-[400px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyTrendsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line type="monotone" dataKey="promotional" stroke="#3b82f6" strokeWidth={2} name="Promotional" />
                <Line type="monotone" dataKey="transactional" stroke="#10b981" strokeWidth={2} name="Transactional" />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  )
}
