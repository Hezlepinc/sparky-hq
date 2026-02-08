# Sparky HQ

Free electrical calculator tools and NEC reference tables for electricians. Built for speed, accuracy, and the job site.

**Live site:** [sparky-hq.com](https://sparky-hq.com)

---

## Calculators (16 tools)

### Voltage Drop Calculator
Calculate voltage drop, find maximum distance for a wire size, or determine the right conductor for your run.

- **Three modes:** Check VD, Max Distance, Size Wire
- **Supports:** DC, single-phase AC, three-phase AC
- **Materials:** Copper and aluminum conductors, 14 AWG through 750 kcmil
- **Circuit application selector:** Branch (3%), Feeder (2%), Combined (5%) with auto VD limits
- **Conduit type selector:** PVC, Aluminum, Steel (with steel impedance note for large conductors)
- **Derating section:** Ambient temperature correction + CCC adjustment factors
- **EGC sizing:** Per NEC 250.122 with proportional increase per 250.122(B)
- **Show Your Work:** Every calculation includes a step-by-step breakdown

### Wire Size Calculator
Determine minimum conductor size based on ampacity with automatic voltage drop verification.

- **Circuit application:** Branch / Feeder with auto VD limits
- **VD limit selector:** 3% / 5% / 2% / Custom
- **Temperature rating guidance:** 60/75/90°C terminal explanations per 110.14(C)
- **OCPD selection:** Enables EGC sizing + 240.4(D) small conductor warnings
- **EGC sizing:** Minimum + proportional per 250.122(B) when upsized
- **Derating section:** Ambient temp + CCC adjustment
- **Show Your Work:** Step-by-step ampacity → VD → upsize → EGC

### Conduit Fill Calculator
Check conduit fill compliance per NEC Chapter 9.

- **Fill limit info box:** Explains why 53/31/40% limits differ by conductor count
- **Quick-start presets:** 20A, 30A, 50A, 100A typical circuits
- **Nipple exception:** Automatic 60% fill for conduit ≤24"
- **Remaining capacity:** Shows room for additional conductors
- **Derating trigger warning:** Alerts when >3 CCCs require ampacity adjustment per 310.15(C)(1)

### Box Fill Calculator
Calculate box fill per NEC 314.16.

- **Three modes:** Count by Cables (default), Count by Conductors, What Fits?
- **Cable entry mode:** Auto-counts conductors from cable types
- **Common scenario presets:** Single switch, single receptacle, switch+receptacle, junction
- **What Fits reverse mode:** Select a box, see max conductors/devices

### Residential Load Calculator
Dwelling unit load calculation per NEC Article 220.

- **Two methods:** Standard (Part III) and Optional (Part IV)
- **Compare Methods:** Side-by-side Standard vs Optional results
- **Service conductor sizing:** Per 310.16 at 75°C (copper + aluminum)
- **GEC sizing:** Grounding electrode conductor per Table 250.66

### Generator Sizing Calculator
Size a standby generator for residential backup.

- **A/C LRA input:** Dropdown by tonnage + manual override for starting surge
- **Generac model recommendations:** Checks both running AND surge capability
- **NEC 445.12/445.13:** Breaker sizing and conductor sizing

### Ohm's Law Calculator
Enter any two of voltage, current, resistance, or power and get the rest instantly.

- **Interactive SVG formula wheel** showing all 12 Ohm's Law formulas
- **Live highlighting:** Wheel highlights the formula being used as you type

### Conduit Bending Calculator
Calculate bending multipliers, shrink, and distances for conduit bends.

- **Bend types:** Offsets, saddles, kicks, 90-degree bends
- **Conduit sizes:** EMT, IMC, RMC with size-specific deduct values
- **Plan a Stick:** Interactive 3D stick planner with Three.js visualization

### Power Converter
Convert between kW, kVA, amps, HP, and watts.

- **Supports:** Single-phase, three-phase, DC circuits
- **Power factor input** for kW/kVA conversions

### Electrical Formulas (Formula Sheet)
Printable cheat sheet with all common electrical formulas.

- **Sections:** Ohm's Law, single/three-phase power, motor, transformer, NEC quick rules
- **Print-optimized:** Clean layout for field reference

### Transformer Sizing Calculator
Calculate kVA rating, primary and secondary full-load amps, and recommended standard sizes.

### Ampacity Derating Calculator
Apply temperature correction and conduit fill adjustment factors to NEC 310.16 base ampacity.

- **Three derating factors:** Base ampacity, ambient temperature correction, CCC adjustment
- **All three temperature columns:** 60°C, 75°C, 90°C

### Lighting Circuit Calculator
Enter square footage, get minimum general lighting circuits for a dwelling per NEC 220.12 and 210.11.

- **Dedicated circuit reminders:** Small-appliance, laundry, bathroom per 210.11(C)

### Service Entrance Sizing Calculator
Determine minimum service size, conductor, and grounding electrode conductor for residential services.

- **Service conductor sizing:** Per NEC 310.16 at 75°C
- **GEC sizing:** Per NEC 250.66

### Panel Schedule Creator
Generate blank or filled-in panel schedules for print.

- **Two modes:** Blank (printable) and Fill-In (interactive)
- **Supports:** Single-phase and three-phase panels, 2–84 spaces
- **Multi-pole breakers:** Tie button for 2-pole and 3-pole breakers
- **Print-optimized:** Landscape layout with crisp borders

### Circuit Design Calculator
*Coming soon* — Complete circuit design from panel to last outlet.

---

## Reference Tables (9 tables)

| Table | Path | NEC Reference |
|-------|------|---------------|
| Motor FLA | `/tables/motor-fla/` | NEC 430.248, 430.250 |
| Conductor Ampacity | `/tables/ampacity/` | NEC 310.16 |
| Overcurrent Protection | `/tables/overcurrent/` | NEC 240.4(D), 240.6(A) |
| Raceway Fill | `/tables/raceway-fill/` | NEC Ch.9 Table 4 |
| EGC Sizing | `/tables/egc-sizing/` | NEC 250.122 |
| GEC Sizing | `/tables/gec-sizing/` | NEC 250.66 |
| Torque Specs | `/tables/torque-specs/` | Manufacturer data |
| Conductor Properties | `/tables/conductor-properties/` | NEC Ch.9 Table 8 |
| Conduit Bending | `/tables/conduit-bending/` | Field Reference |

---

## NEC References

| Feature | NEC Source |
|---------|-----------|
| Wire resistance | Chapter 9, Table 8 — DC resistance at 75°C |
| Conduit fill | Chapter 9, Tables 1, 4, 5 |
| Box fill | 314.16 |
| Ampacity | 310.16 |
| Temp correction | 310.15(B) |
| CCC adjustment | 310.15(C)(1) |
| EGC sizing | 250.122, 250.122(B) |
| GEC sizing | 250.66 |
| Small conductor OCPD | 240.4(D) |
| Terminal temp ratings | 110.14(C) |
| Dwelling load calc | 220 (Parts III & IV) |
| Generator breaker | 445.12 |
| Generator conductor | 445.13 |
| Lighting load | 220.12, 210.11 |
| Service entrance | 230, 310.16, 250.66 |
| Motor FLA | 430.248, 430.250 |
| Overcurrent protection | 240.4(D), 240.6(A) |

### Methodology
Voltage drop is calculated using NEC Chapter 9, Table 8 DC resistance values (stranded, uncoated conductors at 75°C):

- **Single-phase / DC:** `VD = (2 x L x I x R) / 1000`
- **Three-phase:** `VD = (1.732 x L x I x R) / 1000`

---

## Tech Stack

- Static HTML, CSS, vanilla JavaScript
- No frameworks, no build step, no dependencies
- Hosted on GitHub Pages
- PWA-ready with offline support (service worker v30)

---

## Disclaimer

Tools are for reference only. Always verify results with the current National Electrical Code and local amendments. See [Terms of Use](https://sparky-hq.com/terms.html).
