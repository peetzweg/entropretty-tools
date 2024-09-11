
import * as Comlink from "comlink";
import { createWorker } from "entropretty-editor";

Comlink.expose(createWorker(import.meta.glob(["../src/*.js","../src/*.ts"])));

