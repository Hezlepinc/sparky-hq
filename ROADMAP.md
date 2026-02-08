# Sparky HQ Roadmap

Future features beyond calculators — reference tables, field tools, and apprentice resources — organized by effort and value.

**Current state:** 13 tools publicly enabled, 5 tools locked (Coming Soon), 1 stub (Circuit Design). 9 reference tables live. Formula sheet live.

---

## Tier 1: Reference Tables — DONE

**All 9 reference tables are built and live.**

| Table | Path | NEC Reference | Status |
|-------|------|---------------|--------|
| Motor FLA | `/tables/motor-fla/` | 430.248, 430.250 | **DONE** |
| Conductor Ampacity | `/tables/ampacity/` | 310.16 | **DONE** |
| Overcurrent Protection | `/tables/overcurrent/` | 240.4(D), 240.6(A) | **DONE** |
| Raceway Fill | `/tables/raceway-fill/` | Ch.9 Table 4 | **DONE** |
| EGC Sizing | `/tables/egc-sizing/` | 250.122 | **DONE** |
| GEC Sizing | `/tables/gec-sizing/` | 250.66 | **DONE** |
| Torque Specs | `/tables/torque-specs/` | Manufacturer data | **DONE** |
| Conductor Properties | `/tables/conductor-properties/` | Ch.9 Table 8 | **DONE** |
| Conduit Bending Tables | `/tables/conduit-bending/` | Field Reference | **DONE** |

---

## Tier 2: Field Tools

**Medium effort, high value.** Interactive or printable resources for job-site use.

| Tool | Description |
|------|-------------|
| NEC Code Lookup by Topic | Searchable quick reference organized by task (e.g., "bathroom requirements" pulls up 210.11(C)(3), 210.52(D), GFCI rules) |
| Inspection Checklists | Rough-in, service change, panel swap — printable/saveable |
| Torque Spec Reference | Extend existing `/tables/torque-specs/` with searchable manufacturer-specific data |

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

## Tier 4: Remaining Stubs

| Calculator | Status |
|------------|--------|
| Circuit Design Calculator | Stub — multi-step circuit design from panel to outlet |

---

## Tier 5: Conduit Run Design & Rack Layout

**Higher effort, high value.** Builds on the stick planner foundation to cover full conduit runs and multi-pipe rack planning.

| Tool | Description |
|------|-------------|
| Conduit Run Designer | Full run planner — chain multiple sticks together across a route with couplings, supports, and expansion fittings. Account for box pull points, support spacing (358.30 / 352.30), and total 360° bend limits between pull points. Output a cut list and bend sheet for the entire run. |
| Conduit Rack Layout | Plan conduit racks (Unistrut/trapeze) for multiple pipes. Input pipe sizes and quantities, choose rack style, get bin spacing per NEC 300.4 / manufacturer specs. Visual cross-section showing pipe positions, strut sizing, and trapeze dimensions. |
| Rack Bill of Materials | Extend rack layout to output a material list — strut lengths, clamps, beam clamps, threaded rod, channel nuts — ready to hand to a supply house. |

---

## Tier 6: Panel Schedule Labels — Replacement Stickers & Affiliate Revenue

**Medium effort, revenue-generating.** Builds directly on the Panel Schedule Creator tool. Solves a real pain point: damaged, missing, or poorly filled panel schedule labels that are hard to get from manufacturers.

### The Problem

- Panel schedule labels (the stick-on cards inside panel doors) get damaged, faded, or lost constantly
- Manufacturers (Square D, Eaton, Siemens) make replacements hard to order — often require contacting reps or buying in bulk
- Many panels have hand-scrawled schedules that are unreadable during service calls or inspections
- No good online tool exists that outputs a print-ready replacement label sized for specific panel models

### The Opportunity

Users already on Sparky HQ filling in panel schedules → offer them a way to get a physical adhesive label that fits their exact panel door.

### Implementation Phases

#### Phase 1: PDF Export Sized to Real Panels (Low effort)

Add a "Download PDF" button to the Panel Schedule Creator that exports the schedule as a PDF sized to fit specific panel door label areas:

| Manufacturer | Panel Series | Label Size (approx) |
|-------------|-------------|---------------------|
| Square D | QO (20-40 space) | 4.5" x 7.5" |
| Square D | Homeline | 4" x 6.5" |
| Eaton | BR | 4.5" x 7" |
| Eaton | CH | 4.5" x 8" |
| Siemens | PL/ES | 4.5" x 7" |

User picks their panel model → PDF exports at the exact label dimensions → they print on adhesive label stock at home or at a shop.

#### Phase 2: Affiliate — Sell the Label Stock (Low effort, passive income)

Partner with label/adhesive suppliers so users can buy the right stock with one click:

- **Avery** — Custom-sized adhesive sheets. Avery has an affiliate program.
- **Brother P-touch** — For pre-printed labels. Brother has a partner program.
- **Amazon Associates** — Link to specific adhesive full-sheet labels (Avery 5165, 8165) or laminating pouches for weather resistance. Easy affiliate signup.
- **Specialty electrical suppliers** — Some already sell blank panel schedule stickers (check Platt, Graybar, CED)

Button placement: right next to "Print" on the Panel Schedule tool — "Need adhesive label stock? →"

#### Phase 3: Direct Sales — Pre-Cut Blank Labels (Higher effort, higher margin)

Sell packs of pre-cut adhesive panel schedule blanks directly:

- Buy full-sheet adhesive stock in bulk (Avery or equivalent)
- Die-cut or laser-cut to fit the top 5 panel models
- Sell 10-packs or 25-packs through a simple Shopify/Gumroad/Stripe storefront
- Include a QR code printed on each blank that links to sparky-hq.com/tools/panel-schedule/ for the fill-in tool
- Price point: $8-12 for a 10-pack (cost ~$1-2 for materials)

#### Phase 4: Print-and-Ship Filled Schedules (Future, validates demand first)

User fills in the panel schedule online → pays $3-5 → receives a pre-printed adhesive label by mail. Premium option: laminated/UV-resistant for outdoor panels.

Only pursue this if Phase 2-3 show real demand.

### Revenue Estimates (Conservative)

| Phase | Revenue Model | Est. Monthly |
|-------|--------------|-------------|
| Phase 2 | Affiliate commission (4-8% on ~$15 avg order) | $20-100 |
| Phase 3 | Direct label sales (10-pack @ $10, ~$8 margin) | $80-400 |
| Phase 4 | Print-and-ship ($3-5/order) | Depends on volume |

These are low numbers intentionally — this is passive income layered on top of a free tool that already drives traffic.

### Prerequisites

- [ ] Panel Schedule Creator tool is live and getting traffic (done)
- [ ] Identify the 5 most common residential/commercial panel models and their exact label dimensions
- [ ] Test print on adhesive stock to verify fit and readability
- [ ] Set up Amazon Associates or Avery affiliate account
- [ ] Add panel model selector to the tool's config form
- [ ] Add "Download PDF" export sized to selected panel model

### When to Start

Not yet. This is a Business/ domain idea that depends on Sparky HQ having consistent organic traffic first. Revisit when:
- The site has 500+ monthly visitors
- Panel Schedule Creator is the most-used or second-most-used tool
- A weekend is available for research (label sizing, affiliate signup)

---

## NEC Copyright Note

- The NEC is copyrighted by NFPA — cannot reproduce tables verbatim (exact layout, headers, footnotes)
- Underlying electrical data (ampacity values, resistance, conductor properties) is factual/scientific data — **not copyrightable**
- Presenting data in your own format with your own descriptions and referencing the NEC section number = completely fine
- The existing calculators already follow this pattern correctly
- For reference tables: use original layout, add field notes, reference section numbers, don't copy NFPA formatting

---

## Site Structure — Current

```
sparky-hq/
├── tools/                   ← 16 calculator tools
│   ├── voltage-drop/
│   ├── wire-size/
│   ├── conduit-fill/
│   ├── box-fill/
│   ├── residential-load/
│   ├── generator-sizing/
│   ├── circuit-design/      ← Stub (Coming Soon)
│   ├── ohms-law/
│   ├── conduit-bending/
│   ├── power-converter/
│   ├── formula-sheet/
│   ├── transformer-sizing/
│   ├── ampacity-derating/
│   ├── lighting-load/
│   ├── service-entrance/
│   └── panel-schedule/
├── tables/                  ← 9 reference tables
│   ├── motor-fla/
│   ├── ampacity/
│   ├── overcurrent/
│   ├── raceway-fill/
│   ├── egc-sizing/
│   ├── gec-sizing/
│   ├── torque-specs/
│   ├── conductor-properties/
│   └── conduit-bending/
```
