import { Header } from "@/components/header"
import { SearchForm } from "@/components/search-form"

export default function SearchPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 py-12 bg-neutral">
        <div className="container px-4 md:px-6">
          <SearchForm />
        </div>
      </main>
    </div>
  )
}
