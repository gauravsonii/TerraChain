import { createClient } from "@supabase/supabase-js"

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Land records functions
export async function getLandRecords() {
  try {
    // Check if table exists first to avoid errors
    const { data: tableExists } = await supabase
      .from("pg_tables")
      .select("tablename")
      .eq("tablename", "land_records")
      .eq("schemaname", "public")

    if (!tableExists || tableExists.length === 0) {
      console.log("Land records table does not exist yet")
      return { data: [], error: null }
    }

    const { data, error } = await supabase.from("land_records").select("*").order("created_at", { ascending: false })

    if (error) throw error
    return { data, error: null }
  } catch (error) {
    console.error("Error fetching land records:", error)
    return { data: null, error: "Error fetching land records" }
  }
}

export async function getLandRecordById(id: string) {
  try {
    const { data, error } = await supabase.from("land_records").select("*").eq("id", id).single()

    if (error) throw error
    return { data, error: null }
  } catch (error) {
    console.error("Error fetching land record:", error)
    return { data: null, error: "Error fetching land record" }
  }
}

export async function createLandRecord(record: any) {
  try {
    const { data, error } = await supabase.from("land_records").insert([record]).select()

    if (error) throw error
    return { data, error: null }
  } catch (error) {
    console.error("Error creating land record:", error)
    return { data: null, error: "Error creating land record" }
  }
}

export async function updateLandRecord(id: string, updates: any) {
  try {
    const { data, error } = await supabase.from("land_records").update(updates).eq("id", id).select()

    if (error) throw error
    return { data, error: null }
  } catch (error) {
    console.error("Error updating land record:", error)
    return { data: null, error: "Error updating land record" }
  }
}

export async function deleteLandRecord(id: string) {
  try {
    const { error } = await supabase.from("land_records").delete().eq("id", id)

    if (error) throw error
    return { error: null }
  } catch (error) {
    console.error("Error deleting land record:", error)
    return { error: "Error deleting land record" }
  }
}

export async function searchLandRecords(query: string) {
  try {
    const { data, error } = await supabase
      .from("land_records")
      .select("*")
      .or(`owner.ilike.%${query}%,location.ilike.%${query}%,survey_number.ilike.%${query}%,district.ilike.%${query}%`)

    if (error) throw error
    return { data, error: null }
  } catch (error) {
    console.error("Error searching land records:", error)
    return { data: null, error: "Error searching land records" }
  }
}
