import { Database } from "./database.types"

export type AlgorithmView =
  Database["public"]["Views"]["algorithms_with_user_profile"]["Row"]

export type Profile = Database["public"]["Tables"]["profiles"]["Row"]

export type Like = Database["public"]["Tables"]["likes"]["Row"]
