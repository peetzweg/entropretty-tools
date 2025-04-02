import {
  preludeScriptString
} from "entropretty-utils"

// Create the prelude script by stringify all the functions
export const preludeScript = preludeScriptString;

console.log({preludeScript})