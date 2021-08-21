import { generate } from "./codegen";
import { parseHTML } from "./html-parser";

export function compileToFunctions(template) {
  let root = parseHTML(template);
  let code = generate(root);
}
