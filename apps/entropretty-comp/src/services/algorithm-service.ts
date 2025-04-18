import { Remote, wrap } from "comlink"
import ArtistWorker from "../workers/artist?worker"
import ComplianceWorker from "../workers/compliance?worker"
import type { ArtistWorker as ArtistWorkerType } from "../workers/artist"
import type { ComplianceWorker as ComplianceWorkerType } from "../workers/compliance"
import type { Seed } from "entropretty-utils"

export class AlgorithmService {
  private artistWorker: Remote<ArtistWorkerType>
  private complianceWorker: Remote<ComplianceWorkerType>

  constructor() {
    const artistInstance = new ArtistWorker()
    const complianceInstance = new ComplianceWorker()

    this.artistWorker = wrap<ArtistWorkerType>(artistInstance)
    this.complianceWorker = wrap<ComplianceWorkerType>(complianceInstance)
  }

  async updateAlgorithm(algorithmId: number, algorithm: string) {
    // Update both workers with the algorithm
    return Promise.all([
      this.artistWorker.updateAlgorithm(algorithmId, algorithm),
      this.complianceWorker.updateAlgorithm(algorithmId, algorithm),
    ])
  }

  async render(algorithmId: number, size: number, seed: Seed) {
    return this.artistWorker.render(algorithmId, size, seed)
  }

  async checkCompliance(algorithmId: number, size: number, seed: Seed) {
    return this.complianceWorker.checkCompliance(algorithmId, size, seed)
  }

  cancelRender(algorithmId: number, size: number, seed: Seed) {
    this.artistWorker.cancelRender(algorithmId, size, seed)
  }

  cancelComplianceCheck(algorithmId: number, size: number, seed: Seed) {
    this.complianceWorker.cancelCheck(algorithmId, size, seed)
  }
}
