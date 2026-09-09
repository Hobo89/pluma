```text
MASTER IMPLEMENTATION PROMPT — PLUMA MASSAGE ILLUSTRATIONS

TASK

Finalize and implement the four animated massage-type illustrations for pluma.life.

Use the approved illustration exploration already provided in the project as the visual source of truth.

FINAL SELECTED DIRECTIONS

- Embarazo → concept 01
- Relajante y linfático → concept 02
- Tejido profundo → concept 02
- Deportivo → concept 03

These selections are final.

Do not reinterpret the concepts.
Do not generate new alternatives.
Do not redesign the poses.
Do not introduce new stylistic directions.

The task is to turn the approved concepts into polished, production-ready SVG illustrations with subtle scroll-triggered line-tracing animation.

The finished implementation should feel unmistakably Pluma:

- quiet
- refined
- tactile
- contemporary
- Mediterranean
- editorial
- human
- light
- calm
- highly intentional

The motion should feel like the illustration is gently being drawn into existence as the user encounters it.

It must NOT feel like:
- a loading animation
- a tech demo
- an animated logo
- flashy motion graphics
- generic wellness animation
- clinical anatomy
- aggressive sports branding

--------------------------------------------------
1. TRACE THE FINAL APPROVED ILLUSTRATIONS
--------------------------------------------------

Recreate each selected concept as clean production SVG paths.

Do NOT:

- embed or display the raster reference
- ship auto-vectorized raster output without substantial cleanup
- use hundreds of anchor points
- recreate the image with CSS drawing hacks
- alter the composition significantly
- add facial detail
- add anatomy
- add massage hands unless present in the approved concept
- add decorative wellness motifs
- add leaves, stones, candles, botanical graphics or spa clichés
- turn the cream accent into a literal feather

Preserve:

- silhouette
- pose
- proportions
- negative space
- gesture
- visual balance
- overall abstraction level

Use smooth Bézier curves.

Simplify aggressively while maintaining fidelity.

TARGET:
approximately 3–7 meaningful SVG paths per illustration wherever possible.

Avoid unnecessary fragmentation of curves.

--------------------------------------------------
2. VISUAL SYSTEM
--------------------------------------------------

Primary line color:

#092707

Line style:

- fill: none
- fine monoline
- rounded caps
- rounded joins
- elegant curves
- minimal visual noise

Target perceived stroke weight:

approximately 1.4–1.6px at intended card size

Use:

vector-effect="non-scaling-stroke"

where useful so line weight remains stable while the SVG scales.

BACKGROUND

Transparent SVG background.

The existing card surface should provide the warm neutral background.

--------------------------------------------------
3. INTERNAL PLUMA / MOVEMENT ACCENT
--------------------------------------------------

Each approved concept contains or may contain a pale internal gesture.

Treat this as a separate visual layer.

It should communicate:

- movement
- release
- breath
- softness
- direction
- continuity

It should NOT read as a literal feather.

Use a restrained warm cream / sand tone already compatible with the Pluma palette.

It should be noticeably lighter than #092707.

Keep its opacity subtle.

The accent should feel almost atmospheric.

--------------------------------------------------
4. SVG COMPONENT STRUCTURE
--------------------------------------------------

Create four reusable illustration components following the project's existing frontend conventions.

Suggested names:

MassageIllustrationPregnancy
MassageIllustrationRelaxing
MassageIllustrationDeepTissue
MassageIllustrationSports

Use inline SVG.

Do NOT use:

- PNG
- WebP
- GIF
- Canvas
- Lottie
- video

Each line path intended for tracing should use:

pathLength="1"

This allows normalized animation values:

stroke-dasharray: 1;
stroke-dashoffset: 1;

Use meaningful SVG grouping where helpful:

<g class="outline">
...
</g>

<g class="secondary">
...
</g>

<g class="accent">
...
</g>

Avoid unnecessary:

- filters
- masks
- clipping paths
- defs
- editor metadata
- nested transforms

unless genuinely required.

--------------------------------------------------
5. SHARED ANIMATION SYSTEM
--------------------------------------------------

Do NOT create four entirely separate animation implementations.

Create a shared lightweight animation primitive or utility.

For example:

<AnimatedMassageIllustration />

or an equivalent hook / component consistent with the existing codebase.

It should support configurable:

- path delays
- path durations
- sequence order
- accent delay
- accent duration
- viewport threshold
- reduced-motion state

Keep each SVG geometry independent and easy to edit.

Do not over-abstract the SVG markup.

A developer should still be able to open an illustration component and immediately understand which paths correspond to the body contour, secondary contour and accent.

--------------------------------------------------
6. SCROLL-TRIGGERED REVEAL
--------------------------------------------------

Animate each illustration once when its massage card enters the viewport.

Do NOT automatically animate all illustrations on page load if they are below the fold.

Use:

IntersectionObserver

Do NOT use:

- continuous scroll listeners
- requestAnimationFrame loops
- scroll-position polling

Suggested viewport threshold:

0.25–0.4

Each card should trigger independently.

Once an illustration has completed:

- keep the complete illustration visible
- unregister it from IntersectionObserver
- do not replay merely because the user scrolls away and back

The animation is a one-time reveal.

--------------------------------------------------
7. CORE LINE-TRACE TECHNIQUE
--------------------------------------------------

Use CSS-based SVG stroke animation.

Base concept:

stroke-dasharray: 1;
stroke-dashoffset: 1;

transition or keyframe toward:

stroke-dashoffset: 0;

Suggested easing:

cubic-bezier(.4, 0, .2, 1)

Avoid:

- bounce
- elastic movement
- overshoot
- spring physics
- sharp acceleration

The line should feel as though it is being calmly drawn by hand.

--------------------------------------------------
8. IMPORTANT — EACH MASSAGE TYPE MUST HAVE ITS OWN MOTION CHARACTER
--------------------------------------------------

Do NOT apply the exact same line-reveal timing and path order to all four illustrations.

The animation itself should subtly reinforce what each massage type represents.

The four pieces should clearly belong to the same visual system, but each should have its own rhythm.

The distinction should come from:

- path order
- direction of travel
- timing
- pauses
- relative speed
- accent behavior

NOT from:
- different animation styles
- exaggerated motion
- extra graphic elements
- stronger colors

The user should almost unconsciously feel the difference between:

Embarazo
Relajante
Tejido profundo
Deportivo

even though all four remain visually restrained.

--------------------------------------------------
9. EMBARAZO — CONCEPT 01
--------------------------------------------------

CHARACTER

Gentle.
Balanced.
Protective.
Grounded.
Slowly unfolding.

The belly curve is the visual focus.

ANIMATION SEQUENCE

1. Begin with the upper torso / upper contour.
2. Continue naturally downward through the body.
3. Let the tracing travel around the belly.
4. Complete the lower contour.
5. Reveal the pale internal movement accent only after the primary body form is substantially visible.

The motion should feel continuous rather than segmented.

The belly should feel carefully described rather than outlined abruptly.

TARGET TOTAL DURATION

approximately 1.4–1.6 seconds

PACE

Slow and calm.

Do not rush the central belly curve.

DESIRED FEELING

A form gently settling into balance.

--------------------------------------------------
10. RELAJANTE Y LINFÁTICO — CONCEPT 02
--------------------------------------------------

CHARACTER

Flowing.
Breath-like.
Continuous.
Soft.
Unhurried.

This should be the slowest and most fluid of the four.

ANIMATION SEQUENCE

1. Trace the principal reclining body contour.
2. Let a second contour begin shortly after rather than waiting for the first to completely finish.
3. Continue the motion horizontally through the composition.
4. Allow the tracing to visually travel through the body.
5. Introduce the pale internal gesture so it follows the same directional flow.

The animation should not simply reveal the silhouette.

It should feel as though movement is passing through the form.

TARGET TOTAL DURATION

approximately 1.6–1.9 seconds

PACE

Longest and smoothest of the set.

DESIRED FEELING

Exhale.
Release.
Circulation.
Continuity.

--------------------------------------------------
11. TEJIDO PROFUNDO — CONCEPT 02
--------------------------------------------------

CHARACTER

Controlled.
Layered.
Focused.
Deeper.
Still calm.

The animation should subtly communicate:

surface → depth → release

ANIMATION SEQUENCE

1. Trace the exterior body contour first.
2. Allow the main silhouette to establish itself.
3. Pause very slightly:
   approximately 150–250ms.
4. Begin tracing the internal / deeper contour.
5. Fade the pale movement gesture into the body after or during the deeper line reveal.

The internal movement should feel like it passes beneath or through the outer form.

TARGET TOTAL DURATION

approximately 1.4–1.6 seconds

PACE

Measured.

Slightly more deliberate than Embarazo.

DESIRED FEELING

Pressure moving inward, then releasing.

Do NOT make the motion forceful or aggressive.

--------------------------------------------------
12. DEPORTIVO — CONCEPT 03
--------------------------------------------------

CHARACTER

Directional.
Mobile.
Prepared.
Lightly energetic.
Still refined.

This should be the quickest of the four.

ANIMATION SEQUENCE

1. Begin at one extremity of the composition.
2. Trace diagonally through the principal body / limb gesture.
3. Continue through the secondary contour.
4. Allow the pale accent to follow the same direction of travel.
5. Finish cleanly and settle immediately.

The animation should communicate movement and mobility without becoming sporty advertising.

TARGET TOTAL DURATION

approximately 1.15–1.4 seconds

PACE

Slightly quicker and more directional than the other three.

DESIRED FEELING

Ready to move.

Do NOT add:

- speed lines
- muscle graphics
- performance motifs
- aggressive acceleration
- fitness iconography

--------------------------------------------------
13. ACCENT ANIMATION
--------------------------------------------------

Do NOT animate the pale internal accent exactly like the dark outline.

Its role is different.

Preferred treatment:

opacity:
0 → final opacity

Optionally combined with:

translate:
2–4px → 0

Duration:

approximately 500–800ms

The accent should begin only after the main linework is visually established.

It should feel as if:

breath / softness / movement enters the completed body.

The accent must never become the dominant animation.

No looping.

--------------------------------------------------
14. TIMING RELATIONSHIP ACROSS THE SET
--------------------------------------------------

The four animations should feel related but not identical.

Suggested relative rhythm:

Fastest
Deportivo

↓
Embarazo

↓
Tejido profundo

↓
Slowest
Relajante y linfático

This difference should remain subtle.

Do not make the duration differences so large that the set feels inconsistent.

--------------------------------------------------
15. PERFORMANCE REQUIREMENTS
--------------------------------------------------

This implementation must remain extremely lightweight.

Do not introduce a new animation library solely for these illustrations.

Avoid adding:

- Lottie
- GSAP
- Framer Motion if the project does not already use it
- animation frameworks
- Canvas
- JavaScript animation loops

If an existing dependency already provides viewport detection with negligible additional cost, it may be reused.

Otherwise prefer:

CSS keyframes / transitions
+
IntersectionObserver

Optimize SVG paths.

Remove:

- redundant path points
- unused groups
- editor metadata
- duplicate definitions
- unnecessary transforms
- invisible geometry

These four illustrations should be dramatically lighter than equivalent video or raster animation.

--------------------------------------------------
16. ACCESSIBILITY
--------------------------------------------------

Respect:

@media (prefers-reduced-motion: reduce)

When reduced motion is enabled:

- display the complete SVG immediately
- do not trace paths
- do not delay opacity
- do not move the accent
- do not hide the illustration before reveal

If illustrations are decorative, use:

aria-hidden="true"

Do not add unnecessary screen-reader content.

--------------------------------------------------
17. NO JAVASCRIPT-DEPENDENT INVISIBILITY
--------------------------------------------------

Ensure the illustrations do not disappear if JavaScript fails or loads slowly.

Prefer a progressive-enhancement approach.

The final illustration should remain available as the natural/static state.

Only apply the hidden traced state once animation behavior has been initialized.

Avoid implementation patterns where:

JS failure = invisible illustrations.

--------------------------------------------------
18. MOBILE-FIRST RESPONSIVE BEHAVIOR
--------------------------------------------------

These cards are especially important on mobile.

Test at minimum around:

320px
375px
390px
430px
tablet
desktop

SVG should use:

viewBox

and scale fluidly.

Avoid fixed dimensions that cause clipping.

Preserve the generous negative space of the approved concepts.

The illustration should breathe inside the existing rounded image container.

Do not scale the drawings so large that:

- curves touch edges
- silhouettes feel cramped
- the abstract character is lost

Mobile should feel intentionally composed, not like a desktop card reduced in size.

--------------------------------------------------
19. EXISTING MASSAGE CARDS
--------------------------------------------------

Integrate the final illustrations into the existing cards for:

Embarazo
Relajante y linfático
Tejido profundo
Deportivo

Preserve the existing:

- grid
- typography
- card proportions
- rounded container
- spacing system
- responsive behavior
- link/click behavior
- semantic markup
- booking-related interactions

Do not redesign the cards.

Only make layout adjustments required for correct illustration placement.

--------------------------------------------------
20. OPTIONAL POST-REVEAL HOVER
--------------------------------------------------

Only on pointer-capable desktop devices:

After the initial animation has completed, the pale internal accent MAY respond subtly to hover.

Maximum movement:

2–4px

Suggested duration:

500–700ms

Do not redraw the outline.

Do not replay the original animation.

Do not apply this behavior to touch devices.

If this interaction makes the composition feel busier or less refined, omit it entirely.

Stillness is preferable to unnecessary animation.

--------------------------------------------------
21. VISUAL CONSISTENCY ACROSS ALL FOUR
--------------------------------------------------

Before finalizing, compare all four illustrations side-by-side.

They must clearly belong to one system.

Check:

- stroke weight
- curve quality
- level of abstraction
- negative space
- scale within card
- cream accent intensity
- perceived density
- animation subtlety

No illustration should appear:

- more detailed
- more anatomical
- more decorative
- more visually heavy

than the others.

--------------------------------------------------
22. ANIMATION QUALITY TEST
--------------------------------------------------

For each massage type, ask:

EMBARAZO
Does the animation feel protective and balanced?

RELAJANTE
Does the movement visually flow through the body?

TEJIDO PROFUNDO
Does the sequence subtly communicate outer layer → deeper layer?

DEPORTIVO
Does it feel more directional and mobile without becoming aggressive?

If all four simply look like:

“the same drawing animation applied to four SVGs”

the implementation is not finished.

The difference should be subtle but intentional.

--------------------------------------------------
23. LOADING / LAYOUT STABILITY
--------------------------------------------------

Ensure:

- SVG containers reserve their final space before animation
- no cumulative layout shift is introduced
- no flicker occurs when IntersectionObserver initializes
- no initial flash of an incorrect animation state
- illustrations appear cleanly during hydration if the site uses SSR

Maintain good Core Web Vitals behavior.

--------------------------------------------------
24. IMPLEMENTATION CLEANLINESS
--------------------------------------------------

Keep production code easy to maintain.

Use sensible class names.

Avoid:

- magic numbers spread across four components
- duplicated observer logic
- duplicated CSS keyframes
- arbitrary inline styles everywhere

Centralize shared animation constants where appropriate.

Illustration-specific path timing may remain close to each illustration component when that improves readability.

--------------------------------------------------
25. FINAL QUALITY CHECK
--------------------------------------------------

Before considering the task complete, verify:

EMBARAZO
→ final geometry matches concept 01

RELAJANTE Y LINFÁTICO
→ final geometry matches concept 02

TEJIDO PROFUNDO
→ final geometry matches concept 02

DEPORTIVO
→ final geometry matches concept 03

Check the implementation on:

- narrow mobile
- normal mobile
- tablet
- desktop
- Safari
- Chrome
- reduced-motion mode
- keyboard navigation
- slow connection / delayed JS

Confirm:

- animation happens once
- no repeated animation on scroll
- no clipping
- no layout shift
- no console warnings
- no new unnecessary dependency
- cards remain fully clickable
- finished illustration remains visible
- animation does not interfere with scrolling

--------------------------------------------------
26. FINAL DELIVERABLE
--------------------------------------------------

Deliver a complete production implementation.

Expected output includes:

1. Four cleaned production SVG illustration components.
2. The final manually cleaned vector paths.
3. Shared scroll-trigger animation logic.
4. Illustration-specific animation sequencing.
5. Reduced-motion handling.
6. Responsive card integration.
7. Any required lightweight shared CSS / utility.
8. Removal of replaced placeholder illustration assets.
9. No temporary raster reference images shipped in production.
10. No new heavy animation dependency.
11. No console warnings/errors.
12. No regression to booking-card behavior.
13. A concise implementation note summarizing:
    - files changed
    - animation architecture
    - any significant implementation decisions

Do not stop at a prototype.

Do not deliver mock SVGs that still require a manual design pass.

The result should be ready to merge.

--------------------------------------------------
27. PRIORITY ORDER FOR JUDGMENT CALLS
--------------------------------------------------

When tradeoffs occur, use this order:

1. Fidelity to the approved illustration
2. Consistency with Pluma's visual language
3. Distinct motion character for each massage type
4. Animation subtlety
5. Mobile presentation
6. Accessibility
7. Frontend performance
8. Maintainability

Do not sacrifice visual fidelity merely to create more visible animation.

--------------------------------------------------
FINAL EXPERIENCE

The desired user experience is:

The visitor scrolls naturally toward the massage types.

As each card enters view, its illustration quietly begins to form.

Embarazo unfolds gently around the belly.

Relajante flows slowly through the reclining body.

Tejido profundo establishes the outer form before revealing a deeper internal movement.

Deportivo traces more quickly and directionally through the body.

The pale Pluma gesture softly settles into each finished drawing.

Then everything becomes still.

The motion should be noticeable enough to create delight and meaning, but restrained enough that the visitor may not consciously think:

“this is an animation.”

It should simply feel alive.
```