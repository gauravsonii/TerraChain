import { LandRecordsTable } from "@/components/dashboard/land-records-table"
import { TopBar } from "@/components/dashboard/topbar"

export default function RecordsPage() {
  return (
    <div className="flex flex-col h-screen">
      <TopBar />
      <main className="flex-1 overflow-auto p-6 bg-neutral">
        <LandRecordsTable />
      </main>
    </div>
  )
}
