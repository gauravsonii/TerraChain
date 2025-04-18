import { TopBar } from "@/components/dashboard/topbar"
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Plus, FileText, User } from "lucide-react"

// Sample data for owners
const owners = [
  {
    id: 1,
    name: "John Smith",
    email: "john.smith@example.com",
    phone: "+91 9876543210",
    recordsCount: 3,
    status: "active",
    joinedDate: "2022-05-15",
  },
  {
    id: 2,
    name: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    phone: "+91 9876543211",
    recordsCount: 1,
    status: "active",
    joinedDate: "2022-06-20",
  },
  {
    id: 3,
    name: "Michael Brown",
    email: "michael.brown@example.com",
    phone: "+91 9876543212",
    recordsCount: 2,
    status: "active",
    joinedDate: "2022-07-10",
  },
  {
    id: 4,
    name: "Emily Davis",
    email: "emily.davis@example.com",
    phone: "+91 9876543213",
    recordsCount: 1,
    status: "inactive",
    joinedDate: "2022-08-05",
  },
  {
    id: 5,
    name: "Robert Wilson",
    email: "robert.wilson@example.com",
    phone: "+91 9876543214",
    recordsCount: 2,
    status: "active",
    joinedDate: "2022-09-15",
  },
]

export default function OwnersPage() {
  return (
    <div className="flex flex-col h-screen">
      <TopBar />
      <main className="flex-1 overflow-auto p-6 bg-neutral">
        <div className="w-full">
          <div className="flex items-center justify-between py-4">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Land Owners</h2>
              <p className="text-muted-foreground">Manage and view all land owners in the system</p>
            </div>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  type="search"
                  placeholder="Search owners..."
                  className="pl-8 w-[250px] rounded-md bg-gray-50 focus-visible:ring-primary"
                />
              </div>
              <Button className="bg-primary hover:bg-primary/90">
                <Plus className="h-4 w-4 mr-2" />
                Add Owner
              </Button>
            </div>
          </div>

          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Contact Information</TableHead>
                    <TableHead>Records</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Joined Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {owners.map((owner) => (
                    <TableRow key={owner.id}>
                      <TableCell className="font-medium">{owner.name}</TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <p className="text-sm">{owner.email}</p>
                          <p className="text-sm text-gray-500">{owner.phone}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="flex items-center gap-1">
                          <FileText className="h-3 w-3" />
                          {owner.recordsCount} records
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={owner.status === "active" ? "bg-green-500" : "bg-gray-500"}>
                          {owner.status === "active" ? "Active" : "Inactive"}
                        </Badge>
                      </TableCell>
                      <TableCell>{owner.joinedDate}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          <User className="h-4 w-4 mr-2" />
                          View Profile
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <div className="flex items-center justify-end space-x-2 py-4">
            <Button variant="outline" size="sm">
              Previous
            </Button>
            <Button variant="outline" size="sm">
              Next
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}
