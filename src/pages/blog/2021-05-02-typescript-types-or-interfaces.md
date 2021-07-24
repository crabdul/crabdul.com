---
coverPhoto: /img/001157180020.jpg
templateKey: blog-post
title: Types or Interfaces
date: 2021-05-02T22:27:10
description: >-
    Types in TypeScript can be defined by both `type` and `Interface` aliases. They have many similarities
    and in many cases, they can be used interchangeably. But engineers like conventions and rules, which one should we stick to?
tags:
  - typescript
---

**Types in TypeScript can be defined by both `type` and `Interface` aliases. They have many similarities
and in many cases, they can be used interchangeably. But engineers like conventions and rules, which one should we stick to?**

Before digging into why you might want to use one or other, let's quickly discuss the difference between `type` and `interface`.

## The similarities and differences between types and interfaces

**Most of the time, an object type can be similarly represented by both a `type` alias and an `interface` alias.**

```ts
type Book = {
    title: string;
}

interface Book {
    title: string;
}

```

However, an object type with an `interface` alias type can be **extended with new values** while a `type` cannot be changed after being created. This is called __**declaration merging**__.

Here is a very arbitrary example showing how an `interface` alias can be extended.

```ts

interface Book {
    title: string;
}

interface Book {
    author: string;
}

function getBook(): Book {
    ...
}

const book = getBook()

const title = book.title // ✅
const author = book.author // ✅

```

There is no equialent of this for `type` aliases. Once a type is defined, it cannot be redefined.

Whether you need this feature probably depends on what kind of code you're writing. If you're working in your business domain, you probably want to define your type in a single place in rather composing it across different areas of your code. However if you're a JS framework developer, you may find declaration merging useful. [Having the ability to have multiple declarations for the same interface allows "polyfilling" in JS frameworks to be modelled](https://github.com/Microsoft/TypeScript/pull/3622#issuecomment-118417888).

According to the TypeScript Handbook's section on [Interfaces vs. Type Aliases](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#differences-between-type-aliases-and-interfaces), **they recommend using `interface` unless any features from `type` are required**.

Personally, I like the semantics of using `type`, however `interface` has performance benefits over `type` according to [Daniel Rosenwasser](https://twitter.com/drosenwasser/status/1319205169918144513).

> Honestly, my take is that it should really just be interfaces for anything that they can model. There is no benefit to type aliases when there are so many issues around display/perf.

> We tried for a long time to paper over the distinction because of people’s personal choices, but ultimately unless we actually simplify the types internally (could happen) they’re not really the same, and interfaces behave better.

This is explained in more detail in the [Performance section of the TypeScript wiki](https://github.com/microsoft/TypeScript/wiki/Performance#preferring-interfaces-over-intersections).

### Extending types with interfaces is preferred over creating __intersection__ types

```ts
// ❌
type Car = Wheels & Body & {
    seat: string;
}

// ✅
interface Car extends Wheels, Body {
    seat: string;
}
```

When checking against a target intersection type, every constituent is checked before checking against the "effective"/"flattened" type. `Wheels`, `Body` and `{ seat: string }` are checked against before the check against `Car` occurs, increasing the workload on the compiler.

`interface` types are able to detect property conflicts immediately whereas `type` intersection `types` might not raise them where the type is defined.

For example,
```
interface A { x: number }
interface B { x: string }
```

Defining an interface that extends both will lead to a conflicting properties error where the new interface is defined:

```
interface C extends A, B
// error TS2320: Interface 'C' cannot simultaneously extend types 'A' and 'B'.
// Named property 'x' of types 'A' and 'B' are not identical.
```

However, it is possible to define an intersection type that includes `A` and `B`:

```
type C = A & B
// All good apparently 😆
```

It's only when you try to use it that you get an error

```
const somethingsWrong: C = { x: 10 }
// error TS2322: Type 'number' is not assignable to type 'never'.
The expected type comes from property 'x' which is declared here on type 'C'
```

So the main takeaway is: **Use `interface` if you don't need the functionality of `type`**.

Enforcing the rule of `interface` > `type` where possible may be tricky so here's a [eslint plugin](https://github.com/cartant/eslint-plugin-etc/blob/5c2646a397dc2e174b23587af4daa9f1f9047d5f/docs/rules/prefer-interface.md) which may help you!
