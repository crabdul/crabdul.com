---
templateKey: til-post
title: abc.Sequence vs. abc.Iterable
date: 2023-07-12T00:00:00.000Z
tags:
  - python
---

When needing to get the `len()` of an input, use `Sequence`.

`Iterable` allows the caller to pass in an endless sequenece generator rather than a pre-built sequence.

Most importantly, `Sequence` and `Iterable` are best used as a parameter types. There are too vague as a return type. 
A function should be more precise about the concrete type it returns.
