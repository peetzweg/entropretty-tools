import { Database } from "./database.types"

export type AlgorithmView =
  Database["public"]["Views"]["algorithms_with_user_info"]["Row"]

export type Like = Database["public"]["Tables"]["likes"]["Row"]
