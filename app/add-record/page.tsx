import { Header } from "@/components/header"
import { LandRecordForm } from "@/components/land-record-form"

export default function AddRecordPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 py-12 bg-neutral">
        <div className="container px-4 md:px-6">
          <LandRecordForm />
        </div>
      </main>
    </div>
  )
}
