import * as Comlink from "comlink"
import { createWorker } from "@/lib/createWorker"

Comlink.expose(createWorker())
