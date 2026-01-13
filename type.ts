/**
 * This module provides type interfaces for [denovo.zsh].
 *
 * [denovo.zsh]: https://github.com/Warashi/denovo.zsh
 *
 * @module
 */

/**
 * API dispatcher that maps method names to functions.
 *
 * Each method must accept `unknown[]` arguments and return `unknown`.
 * Use type validation libraries like [jsr:@core/unknownutil] to properly
 * validate and narrow argument types at runtime.
 *
 * [jsr:@core/unknownutil]: https://jsr.io/@core/unknownutil
 */
export type Dispatcher = {
  [key: string]: (...args: unknown[]) => unknown;
};

/**
 * Represents a Zsh function/command call.
 *
 * `fn`: A function name of Zsh.
 * `args`: Arguments of the function.
 */
export type Call = [fn: string, ...args: string[]];

/**
 * Represents a Result of Zsh function/command call.
 */
export interface CallResult {
  /**
   * The exit code of call.
   */
  readonly exit_code: number;
  /**
   * The stdout of the call.
   */
  readonly output: unknown;
}

/**
 * Environment meta information.
 */
export interface Meta {
  /**
   * Current mode.
   */
  readonly mode: "release" | "debug" | "test";
  /**
   * Host program.
   */
  readonly host: "zsh";
  /**
   * Host program version.
   */
  readonly version: string;
  /**
   * Host platform name.
   */
  readonly platform: "windows" | "mac" | "linux";
}

/**
 * Denovo is a facade instance visible from each denovo plugin.
 */
export interface Denovo {
  /**
   * Denovo instance name used to communicate with Zsh.
   */
  readonly name: string;

  /**
   * Environment meta information.
   */
  readonly meta: Meta;

  /**
   * AbortSignal instance that is triggered when the user invoke `denovo-interrupt()`
   */
  readonly interrupted?: AbortSignal;

  /**
   * User-defined API name and method map used to dispatch API requests.
   *
   * Each method must accept `unknown[]` arguments and return `unknown` values.
   * Use type validation libraries like [jsr:@core/unknownutil] to validate
   * argument types at runtime. These methods can be called from other plugins
   * using `denovo.dispatch()`.
   *
   * [jsr:@core/unknownutil]: https://jsr.io/@core/unknownutil
   *
   * @example
   * ```ts
   * import type { Entrypoint } from "jsr:@warashi/denovo-core";
   * import { is, assert } from "jsr:@core/unknownutil";
   *
   * export const main: Entrypoint = (denovo) => {
   *   denovo.dispatcher = {
   *     "hello": (name: unknown) => {
   *       assert(name, is.String);
   *       return `Hello, ${name}!`;
   *     },
   *     "add": (a: unknown, b: unknown) => {
   *       assert(a, is.Number);
   *       assert(b, is.Number);
   *       return a + b;
   *     },
   *     "fetchData": async (id: unknown) => {
   *       assert(id, is.String);
   *       return await fetch(`/api/data/${id}`);
   *     },
   *   };
   * };
   * ```
   */
  dispatcher: Dispatcher;

  /**
   * Call an arbitrary function of Zsh and return the result.
   *
   * @param fn: A function name of Zsh.
   * @param args: Arguments of the function.
   */
  call(fn: string, ...args: string[]): Promise<CallResult>;

  /**
   * Call arbitrary functions of Zsh sequentially and return the results.
   *
   * It throws a BatchError when one of the functions fails. The `results` attribute
   * of the error instance holds succeeded results of functions prior to the
   * error.
   *
   * @param calls: A list of tuples ([fn, ...args]) to call Zsh functions.
   */
  batch(...calls: Call[]): Promise<CallResult[]>;

  /**
   * Dispatch an arbitrary function of an arbitrary plugin and return the result.
   *
   * @param name A plugin registration name.
   * @param fn A function name in the dispatcher of the target plugin.
   * @param args Arguments to pass to the function. Arguments are passed as `unknown` types.
   * @returns A Promise that resolves to the return value of the dispatched function.
   *          The return type is `unknown` and should be validated if needed.
   *
   * @example
   * ```ts
   * import type { Entrypoint } from "jsr:@warashi/denovo-core";
   * import { is } from "jsr:@core/unknownutil";
   *
   * export const main: Entrypoint = async (denovo) => {
   *   // Call method and validate return type
   *   const result = await denovo.dispatch("myPlugin", "hello", "world");
   *   if (is.String(result)) {
   *     console.log(`Greeting: ${result}`);
   *   }
   *
   *   // Call method with multiple arguments
   *   const sum = await denovo.dispatch("calculator", "add", 5, 3);
   *   if (is.Number(sum)) {
   *     console.log(`Sum: ${sum}`);
   *   }
   * };
   * ```
   */
  dispatch(name: string, fn: string, ...args: unknown[]): Promise<unknown>;
}

/**
 * Denovo's entrypoint definition.
 *
 * Use this type to ensure the `main` function is properly implemented like:
 *
 * ```ts
 * import type { Entrypoint } from "jsr:@warashi/denovo-core";
 *
 * export const main: Entrypoint = (denovo) => {
 *   // ...
 * }
 * ```
 *
 * If an `AsyncDisposable` object is returned, resources can be disposed of
 * asynchronously when the plugin is unloaded, like:
 *
 * ```ts
 * import type { Entrypoint } from "jsr:@warashi/denovo-core";
 *
 * export const main: Entrypoint = (denovo) => {
 *   // ...
 *   return {
 *     [Symbol.asyncDispose]: async () => {
 *       // Dispose resources...
 *     }
 *   }
 * }
 * ```
 */
export type Entrypoint = (
  denovo: Denovo,
) => void | AsyncDisposable | Promise<void | AsyncDisposable>;
