import { useQuery } from "@tanstack/react-query"
import { supabase } from "../lib/supabase"
import { Database } from "../lib/database.types"
import { AlgorithmCard } from "../components/AlgorithmCard"

type AlgorithmView =
  Database["public"]["Views"]["algorithms_with_user_info"]["Row"]

export default function ExplorePage() {
  const { data: algorithms, isLoading } = useQuery({
    queryKey: ["latest-algorithms"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("algorithms_with_user_info")
        .select()
        .order("created_at", { ascending: false })
        .limit(10)

      if (error) throw error
      return data as AlgorithmView[]
    },
  })

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className="mx-auto max-w-3xl p-6">
      <h1 className="mb-6 text-2xl font-bold">Latest Algorithms</h1>
      <div className="space-y-4">
        {algorithms?.map((algorithm) => (
          <AlgorithmCard key={algorithm.id} algorithm={algorithm} preview />
        ))}
      </div>
    </div>
  )
}
