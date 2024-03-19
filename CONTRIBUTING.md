# Conventional Commits Specification

## Summary

Conventional Commits is a standard for commit messages that provides a structured format for clearer communication and automated tooling. It consists of:
- A type, such as feat (for new features) or fix (for bug fixes).
- An optional scope for additional context.
- A description of the change.
- Optional body and footer sections for more details, including breaking changes.

## Why Use Conventional Commits

- Automatically generate CHANGELOGs and determine version bumps.
- Communicate changes effectively.
- Trigger build and publish processes.
- Make contribution easier with structured commit history.

## Commit Message Structure

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```


### Examples:

- `feat: add new functionality`
- `fix: resolve issue with`
- `chore: update dependencies`
- `build: optimize build process`
- `ci: configure continuous integration`
- `docs: update documentation`
- `style: format code`
- `refactor: simplify logic`
- `perf: improve performance`
- `test: add unit tests`

also we have `BREAKING CHANGE: update API endpoint`

## Specification Highlights

- Types: feat for features, fix for bug fixes, and others like docs, style, refactor, etc.
- Optional scope provides additional context.
- Breaking changes can be indicated in the type/scope prefix or as a footer.

A commit that has a footer `BREAKING CHANGE:`, or appends a `!` after the type/scope, introduces a breaking API change.

A BREAKING CHANGE can be part of commits of any type.

## FAQ

- **Initial Development:** Treat commits as if the product is released.
- **Commit Types:** Any casing is acceptable but be consistent.
- **Handling Mistakes:** Use git rebase to edit commit history.

For more detailed information, refer to the [official Conventional Commits specification](https://www.conventionalcommits.org/en/v1.0.0/).

