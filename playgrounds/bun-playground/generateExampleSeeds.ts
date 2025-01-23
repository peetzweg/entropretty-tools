import { getSeedFamily, type FamilyKind } from "entropretty-utils"

console.log()

const kinds: FamilyKind[] = [
  "ProceduralPersonal",
  "ProceduralAccount",
  "Procedural",
]

for (const kind of kinds) {
  let allSeeds: number[][] = []
  for (let i = 0; i < 200; i++) {
    const seedFamily = getSeedFamily(kind)
    allSeeds.push(...seedFamily.map((seed) => [...seed.reverse()]))
  }

  // Filter out duplicate seed arrays
  allSeeds = allSeeds.filter((seed, index) => {
    const seedStr = JSON.stringify(seed)
    return allSeeds.findIndex((s) => JSON.stringify(s) === seedStr) === index
  })

  Bun.write(`${kind}-seeds.json`, JSON.stringify(allSeeds))
  Bun.write(
    `${kind}-seeds.ts`,
    `export const ${kind}Seeds = ${JSON.stringify(allSeeds)}`,
  )

  Bun.write(
    `${kind}-seeds.txt`,
    allSeeds.map((family) => family.join(",")).join("\n"),
  )
}
