# Design skill use

## Development attribution

The linked [`xelead/ai_skills` catalog](https://github.com/xelead/ai_skills) points to [Intent](https://github.com/ghaida/intent) for UX, [Impeccable](https://github.com/pbakaus/impeccable) for UI design, and [UnLazy](https://github.com/Leonxlnx/unlazy) for completion discipline. The available portfolio record does not establish that any of these skills guided its original design or implementation. There is no design brief or skill-use record in the project, and the local worktree has no commit history to consult. This file therefore does not attribute the portfolio’s design decisions to a skill.

## Review against the guidance

For this review, Impeccable’s [core instructions](https://github.com/pbakaus/impeccable/blob/main/.agents/skills/impeccable/SKILL.md) and [web audit reference](https://github.com/pbakaus/impeccable/blob/main/.agents/skills/impeccable/reference/audit.md) were consulted. They call for inspecting the rendered interface at the sizes it ships and checking accessibility, theming, responsive behavior, performance, and implementation integrity. The portfolio is an “Experience” surface in that guidance: the work itself should lead.

The existing [desktop capture](../screenshots/phase-3.10-desktop.png) and [390px mobile capture](../screenshots/phase-3.10-mobile-390.png) were visually inspected. The desktop view leads with the owner’s name and work; the mobile capture shows the same sections in a narrow layout. Source and test evidence also shows:

- Theme colors are defined as CSS variables in `src/index.css`; keyboard focus styling and a reduced-motion rule are present there.
- The Playwright suite checks that project filters respond to Enter and that a 390px viewport has no horizontal overflow.

These are observable alignments with parts of Impeccable’s guidance. They do not prove that Impeccable shaped the original design, nor do they constitute a complete accessibility, performance, or implementation-integrity audit. The Impeccable launcher and detector are not present in this worktree, and this review did not measure contrast ratios or exercise touch gestures.

Intent’s [core skill](https://github.com/ghaida/intent/blob/main/skills/intent/SKILL.md) emphasizes making the reasons behind design decisions visible and traceable. No project research or design-rationale record was found, so that guidance cannot be verified against the original design process. [UnLazy](https://github.com/Leonxlnx/unlazy) concerns evidence-based completion gates rather than visual design; its presence in the catalog is not evidence of use on this portfolio.
