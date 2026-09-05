/**
 * The Lacspace Free Licence — the one tier that governs the openly published
 * @lacspace packages. Ported to the developer platform (the full 4-tier Licence
 * Centre — Free / Commercial / Client / Private — lives on lacspace.com/licenses).
 * One data object drives the detail page and the raw /text route.
 */

export type RuleKind = "permission" | "condition" | "limitation";
export interface Rule { kind: RuleKind; label: string; detail: string }
export interface Faq { q: string; a: string }

export const FREE_LICENCE_TEXT = `Lacspace Free Licence
Version 1.0, August 2026

Copyright (c) 2026 Lacspace

PREAMBLE

This software is published by Lacspace under the Lacspace Free Licence — a free,
permissive licence that lets you use this software for any purpose, including in
commercial products and services, at no cost. It grants the same freedoms as
common permissive open-source licences; the only condition is that this notice
travels with the software. The canonical, always-current text of this licence is
maintained at https://lacspace.com/licenses/lacspace-free-1.0

GRANT OF RIGHTS

Permission is hereby granted, free of charge, to any person or organisation
obtaining a copy of this software and its associated documentation and data files
(the "Software"), to deal in the Software without restriction, including without
limitation the rights to use, copy, modify, merge, publish, distribute,
sublicense, and/or sell copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the conditions below. These rights are
granted for any purpose, personal or commercial, and are perpetual, worldwide,
non-exclusive, and royalty-free.

CONDITIONS

The above copyright notice, this permission notice, and the name of this licence
("Lacspace Free Licence") shall be included in all copies or substantial portions
of the Software.

TRADEMARKS

This licence does not grant permission to use the trade names, trademarks, service
marks, logos, or product names of Lacspace, except as required to reproduce the
notice above or to describe the origin of the Software in a truthful manner.

DISCLAIMER OF WARRANTY AND LIMITATION OF LIABILITY

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE, AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES, OR OTHER LIABILITY, WHETHER IN
AN ACTION OF CONTRACT, TORT, OR OTHERWISE, ARISING FROM, OUT OF, OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

---

The Lacspace Free Licence is a source-available, permissive licence and is not (as
of this version) an OSI-approved licence. In substance it grants the same freedoms
as the MIT Licence. Learn more at https://lacspace.com/licenses
`;

export const FREE_LICENCE = {
  slug: "lacspace-free-1.0",
  spdxId: "LicenseRef-LacspaceFree-1.0",
  shortName: "Lacspace Free v1.0",
  name: "Lacspace Free Licence",
  version: "1.0",
  released: "August 2026",
  tagline: "Free for everyone. Free forever. Under our name.",
  description:
    "The Lacspace Free Licence v1.0 — a free, permissive, MIT-equivalent licence that governs every openly published @lacspace package. Use it in personal and commercial projects at no cost; the only condition is keeping the notice.",
  summary:
    "Use, modify, redistribute and sell — personal or commercial — at no cost. Just keep the notice.",
  availabilityNote:
    "Applies to the packages we publish openly on npm (the @lacspace public scope).",
  plainLanguage: [
    "Free for any use, including in closed-source commercial products.",
    "You may modify, merge, redistribute, sublicense and sell copies.",
    "The only condition: keep the copyright and this licence notice in copies.",
    "No warranty is given, and Lacspace is not liable for how you use it.",
    "It does not grant rights to the Lacspace name, logo or trademarks.",
    "One licence for every language — npm now; Python, C and C++ next.",
  ],
  rules: [
    { kind: "permission", label: "Commercial use", detail: "Use the software in commercial products and services, at no cost." },
    { kind: "permission", label: "Modification", detail: "Change the source however you need." },
    { kind: "permission", label: "Distribution", detail: "Share the original or your modified copies." },
    { kind: "permission", label: "Sublicense & sell", detail: "Relicense within your own product and sell copies." },
    { kind: "permission", label: "Private use", detail: "Use and modify privately with no obligation to publish." },
    { kind: "condition", label: "Keep the notice", detail: "Include the copyright and licence notice in substantial copies." },
    { kind: "limitation", label: "No warranty", detail: "The software is provided “as is”, without warranty of any kind." },
    { kind: "limitation", label: "No liability", detail: "The authors are not liable for any claim or damages." },
    { kind: "limitation", label: "No trademark grant", detail: "The Lacspace name and marks are not licensed to you." },
  ] as Rule[],
  ecosystems: [
    { label: "npm (JavaScript / TypeScript)", status: "live" },
    { label: "PyPI (Python)", status: "planned" },
    { label: "C / C++ libraries", status: "planned" },
    { label: "Other package registries", status: "planned" },
  ] as { label: string; status: "live" | "planned" }[],
  apply: [
    { title: "Install any package", detail: "npm i @lacspace/<name> — the LICENSE file ships inside the package." },
    { title: "It just works", detail: "You already comply: the notice travels inside node_modules with the code." },
    { title: "If you vendor or fork", detail: "Keep the LICENSE file (or its notice) alongside substantial copies you redistribute." },
  ],
  faq: [
    { q: "Can I use Lacspace packages in a commercial or closed-source product?", a: "Yes. The Lacspace Free Licence lets you use, modify and ship the software in personal and commercial products — including closed-source ones — at no cost. The only condition is that you keep the copyright and licence notice in substantial copies." },
    { q: "How is this different from MIT?", a: "In the freedoms it grants, it is equivalent to MIT — the same rights to use, modify, distribute and sell. It is published under the Lacspace name so all our packages, across every language, carry one consistent licence, and it adds an explicit trademark clause. It is source-available and permissive, but not (as of v1.0) an OSI-approved licence." },
    { q: "What do I actually have to do to comply?", a: "Keep the LICENSE file (or the notice it contains) with the software when you redistribute substantial portions of it. That is the whole obligation." },
    { q: "Does it grant any rights to the Lacspace brand?", a: "No. You may not use the Lacspace name, logo or trademarks to promote your product, beyond reproducing the notice and truthfully describing the origin of the code." },
    { q: "Will Python, C and C++ packages use this same licence?", a: "Yes. The licence is written to be language-agnostic. As Lacspace publishes packages to PyPI and other registries, they will ship under the same Lacspace Free Licence." },
    { q: "What does npm show for the licence field?", a: "npm's license field only accepts standard SPDX identifiers, so our packages declare “SEE LICENSE IN LICENSE” and ship the full text in the LICENSE file. The SPDX-style reference is LicenseRef-LacspaceFree-1.0." },
  ] as Faq[],
  fullText: FREE_LICENCE_TEXT,
};

export const RULE_META: Record<RuleKind, { label: string; icon: string; color: string }> = {
  permission: { label: "Permissions", icon: "✓", color: "#34D399" },
  condition: { label: "Conditions", icon: "!", color: "#FBBF24" },
  limitation: { label: "Limitations", icon: "✕", color: "#FB7185" },
};
