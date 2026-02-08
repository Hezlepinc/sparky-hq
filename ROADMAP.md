# Sparky HQ Roadmap

Future features beyond calculators — reference tables, field tools, and apprentice resources — organized by effort and value.

**Current state:** 15 tools live (13 calculators + formula sheet + reference tables), 2 stubbed.

---

## Tier 1: Reference Tables

**Low effort, high value.** Static HTML pages — no JS needed, just well-formatted data in Sparky HQ's layout. Data is factual/scientific (not copyrightable); reference NEC section numbers but use original formatting.

| Table | NEC Reference | Notes |
|-------|---------------|-------|
| Motor FLA | 430.248 (1ph), 430.250 (3ph) | Pairs with wire size + VD calcs for motor circuit sizing |
| Conductor Ampacity | 310.16 (60/75/90°C columns) | Cu + Al, all three temp columns side by side |
| Overcurrent Protection | 240.4(D), 240.4(G) | Max breaker/fuse by wire gauge |
| Raceway Fill Quick Chart | Ch.9 Table 4 | "How many #12 THHN fit in 3/4 EMT?" at a glance |
| EGC Sizing | 250.122 | Already in calcs but useful as standalone reference |
| Torque Specs | Manufacturer data | By lug type and wire size — gold for inspections |
| Conductor Properties | Ch.9 Table 8 | Resistance, area (cmil), weight — one-stop reference |

---

## Tier 2: Field Tools

**Medium effort, high value.** Interactive or printable resources for job-site use.

| Tool | Description |
|------|-------------|
| NEC Code Lookup by Topic | Searchable quick reference organized by task (e.g., "bathroom requirements" pulls up 210.11(C)(3), 210.52(D), GFCI rules) |
| Inspection Checklists | Rough-in, service change, panel swap — printable/saveable |
| Torque Spec Reference | Searchable by manufacturer and wire size |

---

## Tier 3: Apprentice / Exam Prep

**Medium effort, niche value.** This is the next major feature area after current tools stabilize.

| Tool | Status | Description |
|------|--------|-------------|
| Formula Sheet | **DONE** | Printable single-page with all electrical formulas |
| Practice Questions | Planned | Topic-based quizzes: Ohm's Law, NEC 310, Article 430, motor circuits, grounding, overcurrent protection, etc. |
| Timed Practice Mode | Planned | Simulate exam conditions — timed question sets with score tracking |
| Score Tracking | Planned | Track quiz scores over time via localStorage — see weak areas, measure improvement |

**Exam Prep Vision:** Build a free, offline-capable study tool that covers the core NEC topics tested on journeyman and master electrician exams. Topic-based quizzes let users drill specific areas. Timed practice mode simulates real exam pressure. Score history (localStorage) shows progress without requiring accounts. All questions reference NEC sections the site's calculators already cover, reinforcing practical understanding.

---

## Tier 4: Remaining Calculators (Existing stubs)

| Calculator | Status |
|------------|--------|
| Circuit Design Calculator | Stub — multi-step circuit design from panel to outlet |
| Conduit Bending Calculator | **Live** — offsets, saddles, 90s, + interactive stick planner |

---

## Tier 5: Conduit Run Design & Rack Layout

**Higher effort, high value.** Builds on the stick planner foundation to cover full conduit runs and multi-pipe rack planning.

| Tool | Description |
|------|-------------|
| Conduit Run Designer | Full run planner — chain multiple sticks together across a route with couplings, supports, and expansion fittings. Account for box pull points, support spacing (358.30 / 352.30), and total 360° bend limits between pull points. Output a cut list and bend sheet for the entire run. |
| Conduit Rack Layout | Plan conduit racks (Unistrut/trapeze) for multiple pipes. Input pipe sizes and quantities, choose rack style, get bin spacing per NEC 300.4 / manufacturer specs. Visual cross-section showing pipe positions, strut sizing, and trapeze dimensions. |
| Rack Bill of Materials | Extend rack layout to output a material list — strut lengths, clamps, beam clamps, threaded rod, channel nuts — ready to hand to a supply house. |

---

## NEC Copyright Note

- The NEC is copyrighted by NFPA — cannot reproduce tables verbatim (exact layout, headers, footnotes)
- Underlying electrical data (ampacity values, resistance, conductor properties) is factual/scientific data — **not copyrightable**
- Presenting data in your own format with your own descriptions and referencing the NEC section number = completely fine
- The existing calculators already follow this pattern correctly
- For reference tables: use original layout, add field notes, reference section numbers, don't copy NFPA formatting

---

## Site Structure Addition

Add a "Tables" nav section alongside "Tools":

```
sparky-hq/
├── tools/           ← Existing calculators
├── tables/          ← NEW: Reference tables
│   ├── index.html   ← Table listing page
│   ├── motor-fla/
│   ├── ampacity/
│   ├── overcurrent/
│   ├── raceway-fill/
│   ├── egc-sizing/
│   ├── torque-specs/
│   └── conductor-properties/
```
