import { Hero } from "@/components/Hero";
import { Section } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { ScoringLens } from "@/components/ScoringLens";
import { LeadForm } from "@/components/LeadForm";
import { ButtonLink } from "@/components/Button";
import { safeLeadCount } from "@/lib/db";
import {
  principles,
  workflow,
  checklistCategories,
  checklistTotal,
  siteConfig,
} from "@/lib/content";

// Statically rendered, revalidated periodically. Safe without a database:
// safeLeadCount() returns null at build and the page renders fine.
export const revalidate = 300;

const checklistHref = `${siteConfig.repo}/blob/main/.claude/skills/187webdesign/references/CHECKLIST.md`;

export default async function HomePage() {
  const leadCount = await safeLeadCount();

  return (
    <>
      <Hero />

      <Section
        id="rubric"
        eyebrow="The scoring lens"
        title="How “award-winning” is actually judged"
        intro="Top juries score four weighted axes. Design to the weights, not just to taste — a beautiful site that's hard to use still loses."
      >
        <ScoringLens />
      </Section>

      <Section
        id="principles"
        eyebrow="The kill shots"
        title="Twelve principles that separate good from award"
        intro="Each one earns its place or it gets cut. They're tool-agnostic — they hold in React, plain HTML/CSS, or anything else."
        className="bg-surface/60"
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {principles.map((p, i) => (
            <Reveal key={p.n} delay={(i % 3) * 80} className="h-full">
              <article className="h-full rounded-lg border border-line bg-surface p-6 transition-shadow duration-200 hover:shadow-card">
                <div className="font-display text-sm font-semibold tabular-nums text-accent">
                  {String(p.n).padStart(2, "0")}
                </div>
                <h3 className="mt-3 text-lg font-semibold tracking-tight text-ink">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{p.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section
        id="workflow"
        eyebrow="The process"
        title="Research → direction → build → critique → QA"
        intro="A repeatable path from brief to launch. Critique the plan before building, and remove one thing before you ship."
      >
        <Reveal>
          <ol className="grid gap-x-12 gap-y-8 sm:grid-cols-2">
            {workflow.map((step) => (
              <li key={step.n} className="flex gap-4">
                <span
                  aria-hidden="true"
                  className="font-display text-lg font-semibold tabular-nums text-accent"
                >
                  {String(step.n).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-semibold tracking-tight text-ink">{step.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </Reveal>
      </Section>

      <Section
        id="checklist"
        eyebrow="Pre-ship audit"
        title="A 50-point checklist, mapped to the score"
        intro="Run it before calling any page done. Every item ties back to Design, Usability, Creativity, or Content."
        className="bg-surface/60"
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {checklistCategories.map((c, i) => (
            <Reveal key={c.label} delay={(i % 3) * 70} className="h-full">
              <div className="flex h-full items-center justify-between gap-4 rounded-lg border border-line bg-surface px-5 py-4">
                <span className="text-sm font-medium text-ink">{c.label}</span>
                <span className="font-display text-sm tabular-nums text-muted">{c.count}</span>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-10">
          <div className="flex flex-col justify-between gap-6 rounded-lg bg-ink p-8 text-bg sm:flex-row sm:items-center">
            <p className="max-w-md text-lg leading-relaxed">
              A {checklistTotal}-point pre-ship audit ships with the skill — and this page was built
              to pass it.
            </p>
            <ButtonLink href={checklistHref} variant="primary" className="shrink-0">
              View the checklist
            </ButtonLink>
          </div>
        </Reveal>
      </Section>

      <Section
        id="start"
        eyebrow="Get started"
        title="Put it to work"
        intro="Clone the full-stack starter, or drop the skill into any Claude Code project. Both take a minute."
      >
        <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
          <Reveal className="h-full">
            <div className="h-full rounded-lg border border-line bg-surface p-6 sm:p-8">
              <h3 className="text-lg font-semibold tracking-tight text-ink">Quick start</h3>
              <pre className="mt-4 overflow-x-auto rounded-sm bg-ink p-4 font-mono text-sm leading-relaxed text-bg">
                <code>{`git clone ${siteConfig.repo}.git
cd 187webdesign
npm install
npm run dev`}</code>
              </pre>
              <p className="mt-5 text-sm leading-relaxed text-muted">
                Want only the skill? Copy{" "}
                <code className="rounded-xs bg-ink/[0.06] px-1.5 py-0.5 font-mono text-[0.85em] text-ink">
                  .claude/skills/187webdesign
                </code>{" "}
                into your project — Claude Code picks it up automatically.
              </p>
            </div>
          </Reveal>

          <Reveal delay={100} className="h-full">
            <div className="h-full rounded-lg border border-line bg-surface p-6 sm:p-8">
              <h3 className="text-lg font-semibold tracking-tight text-ink">Join the build list</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {leadCount != null && leadCount > 0
                  ? `${leadCount.toLocaleString()} already on the list. `
                  : ""}
                Get a note when there&rsquo;s a new pattern, component, or release worth your time.
              </p>
              <div className="mt-6">
                <LeadForm />
              </div>
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
