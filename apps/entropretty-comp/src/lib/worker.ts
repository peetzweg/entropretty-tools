import * as Comlink from "comlink"
import { createWorker } from "./createWorker"

Comlink.expose(createWorker())
