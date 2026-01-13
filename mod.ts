/**
 * This is a core module of [denovo.zsh], an ecosystem for creating Zsh plugin in [Deno].
 *
 * > [!WARNING]
 * >
 * > This module is mainly for internal use. It's **strongly discouraged** to
 * > utilize this module directly from plugins. Use the [@warashi/denovo-std] module
 * > instead.
 *
 * ```ts
 * import type { Entrypoint } from "jsr:@warashi/denovo-core";
 *
 * export const main: Entrypoint = (denovo) => {
 *     // ...
 * };
 * ```
 *
 * [deno]: https://deno.land/
 * [denovo.zsh]: https://github.com/Warashi/denovo.zsh
 * [@warashi/denovo-std]: https://jsr.io/@warashi/denovo-std
 *
 * @module
 */

export * from "./error.ts";
export type * from "./type.ts";
