"use client"

import { Search, MoreHorizontal, UserPlus, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const customers = [
  {
    id: "CUST001",
    name: "John Doe",
    email: "john.doe@example.com",
    totalSMS: 1250,
    lastActive: "2024-01-15",
    status: "active",
    joinDate: "2023-06-15",
  },
  {
    id: "CUST002",
    name: "Jane Smith",
    email: "jane.smith@company.com",
    totalSMS: 890,
    lastActive: "2024-01-14",
    status: "active",
    joinDate: "2023-08-22",
  },
  {
    id: "CUST003",
    name: "Mike Johnson",
    email: "mike.j@business.org",
    totalSMS: 2340,
    lastActive: "2024-01-10",
    status: "inactive",
    joinDate: "2023-03-10",
  },
  {
    id: "CUST004",
    name: "Sarah Wilson",
    email: "sarah.wilson@startup.io",
    totalSMS: 567,
    lastActive: "2024-01-15",
    status: "active",
    joinDate: "2023-11-05",
  },
  {
    id: "CUST005",
    name: "David Brown",
    email: "david.brown@enterprise.com",
    totalSMS: 3420,
    lastActive: "2024-01-12",
    status: "suspended",
    joinDate: "2023-01-20",
  },
  {
    id: "CUST006",
    name: "Lisa Garcia",
    email: "lisa.garcia@tech.com",
    totalSMS: 1890,
    lastActive: "2024-01-15",
    status: "active",
    joinDate: "2023-09-18",
  },
]

const getStatusBadge = (status: string) => {
  switch (status) {
    case "active":
      return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Active</Badge>
    case "inactive":
      return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">Inactive</Badge>
    case "suspended":
      return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Suspended</Badge>
    default:
      return <Badge variant="secondary">{status}</Badge>
  }
}

export function CustomersPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Customers</h1>
          <p className="text-muted-foreground">Manage your registered users and their SMS activity</p>
        </div>
        <Button>
          <UserPlus className="w-4 h-4 mr-2" />
          Add Customer
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,847</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+12</span> new this month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,234</div>
            <p className="text-xs text-muted-foreground">78.5% of total</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Avg SMS per User</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">156</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+8.2%</span> from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Top User SMS</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3,420</div>
            <p className="text-xs text-muted-foreground">David Brown</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search customers..." className="pl-8" />
        </div>
        <Button variant="outline">
          <Filter className="w-4 h-4 mr-2" />
          Filter
        </Button>
      </div>

      {/* Customers Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Customers</CardTitle>
          <CardDescription>A list of all registered users and their SMS activity</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Total SMS Sent</TableHead>
                <TableHead>Last Active</TableHead>
                <TableHead>Account Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {customers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell className="font-medium">{customer.id}</TableCell>
                  <TableCell>{customer.name}</TableCell>
                  <TableCell>{customer.email}</TableCell>
                  <TableCell>{customer.totalSMS.toLocaleString()}</TableCell>
                  <TableCell>{customer.lastActive}</TableCell>
                  <TableCell>{getStatusBadge(customer.status)}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Edit Customer</DropdownMenuItem>
                        <DropdownMenuItem>View SMS History</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">Suspend Account</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
