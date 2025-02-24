import { useEffect } from "react"
import { AlgorithmId } from "@/workers/artist"
import { useAlgorithmService } from "../../contexts/service-context"

interface Props {
  algorithmId: AlgorithmId
  seed: number[]
  size: number
  children: React.ReactNode
  version?: number
}

export const AlgorithmCompliance: React.FC<Props> = ({
  algorithmId,
  seed,
  size,
  children,
  version = 0,
}) => {
  const service = useAlgorithmService()

  useEffect(() => {
    console.log("checkCompliance", version, algorithmId, seed)
    service
      .checkCompliance(algorithmId, [...seed])
      .then((result) => {
        console.log(result)
      })
      .catch((error) => {
        console.error(error)
      })
  }, [seed, algorithmId, size, service, version])

  return <>{children}</>
}
