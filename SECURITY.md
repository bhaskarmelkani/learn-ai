# Security Policy

## Reporting A Vulnerability

Please report suspected vulnerabilities privately by opening a GitHub security advisory or by contacting the maintainer directly.

Do not publish exploit details in a public issue before the vulnerability has been reviewed.

## Scope

Learn AI is a static, browser-first learning app. It does not require a backend, account system, billing flow, or server-side model API to run the current courses.

Security-sensitive areas include:

- dependency updates
- browser-only model/runtime loading
- generated or user-authored MDX content
- GitHub Pages deployment configuration
- any future workflow that introduces external services

## Maintainer Expectations

Security fixes should include the smallest safe patch, validation commands, and a short note describing the risk that was reduced.
