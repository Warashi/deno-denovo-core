# 🪐 @warashi/denovo-core

[![JSR](https://jsr.io/badges/@warashi/denovo-core)](https://jsr.io/@warashi/denovo-core)
[![Test](https://github.com/Warashi/deno-denovo-core/actions/workflows/test.yml/badge.svg)](https://github.com/Warashi/deno-denovo-core/actions/workflows/test.yml)

This is a core module of [denovo.zsh], an ecosystem for creating Zsh plugin in
[Deno].

> [!WARNING]
>
> This module is mainly for internal use. It's **strongly discouraged** to
> utilize this module directly from plugins. Use the [@warashi/denovo-std]
> module instead.

```ts
import type { Entrypoint } from "jsr:@warashi/denovo-core";

export const main: Entrypoint = (denovo) => {
  // ...
};
```

[deno]: https://deno.land/
[denovo.zsh]: https://github.com/Warashi/denovo.zsh
[@warashi/denovo-std]: https://jsr.io/@warashi/denovo-std

# Inspired by

This ecosystem is strongly inspired by [denops.vim] which allows developers to
write Vim/Neovim plugin in [deno]. And also inspired by [zeno.zsh] which is zsh
plugin written in [deno].

Some code in this repository is borrowed from [denops.vim].

[denops.vim]: https://github.com/vim-denops/denops.vim
[deno]: https://deno.land/
[zeno.zsh]: https://github.com/yuki-yano/zeno.zsh

# License

The code follows the MIT license, as stated in [LICENSE](./LICENSE).
Contributors need to agree that any modifications sent to this repository follow
the license.
