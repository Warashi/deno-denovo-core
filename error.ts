/**
 * This module provides error classes for [denovo.zsh].
 *
 * [denovo.zsh]: https://github.com/Warashi/denovo.zsh
 *
 * @module
 */

/**
 * Batch error raised when one of the functions fails during batch process.
 */
export class BatchError extends Error {
  static {
    this.prototype.name = "BatchError";
  }

  /**
   * A result list that is successfully completed prior to the error.
   */
  readonly results: unknown[];

  constructor(message: string, results: unknown[]) {
    super(message);

    this.results = results;
  }
}
