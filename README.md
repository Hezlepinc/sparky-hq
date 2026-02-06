# Sparky HQ

Free electrical calculator tools for electricians. Built for speed, accuracy, and the job site.

**Live site:** [sparky-hq.com](https://sparky-hq.com)

---

## Tools

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
- **Cost note:** Suggests shorter route or higher voltage when upsized 2+ sizes

### Conduit Fill Calculator
Check conduit fill compliance per NEC Chapter 9.

- **Fill limit info box:** Explains why 53/31/40% limits differ by conductor count
- **Quick-start presets:** 20A, 30A, 50A, 100A typical circuits
- **Nipple exception:** Automatic 60% fill for conduit ≤24"
- **Remaining capacity:** Shows room for additional conductors
- **Derating trigger warning:** Alerts when >3 CCCs require ampacity adjustment per 310.15(C)(1)
- **Approaching limit caution:** Orange warning at 85%+ of fill limit

### Box Fill Calculator
Calculate box fill per NEC 314.16.

- **Three modes:** Count by Cables (default), Count by Conductors, What Fits?
- **Cable entry mode:** Auto-counts conductors from cable types (e.g., "2× 14/2 NM-B")
- **Common scenario presets:** Single switch, single receptacle, switch+receptacle, junction 3 cables
- **What Fits reverse mode:** Select a box, see max conductors/devices
- **Pigtail reminder:** Pigtails originating inside the box are NOT counted

### Residential Load Calculator
Dwelling unit load calculation per NEC Article 220.

- **Two methods:** Standard (Part III) and Optional (Part IV)
- **Method guidance:** Explains when each method applies (new construction vs existing 100A+)
- **Typical nameplate hints:** Placeholder values for common appliances
- **Compare Methods button:** Side-by-side Standard vs Optional results
- **Service conductor sizing:** SE cable size per 310.16 at 75°C (copper + aluminum)
- **GEC sizing:** Grounding electrode conductor per Table 250.66
- **Upgrade guidance:** >200A options (320A parallel, 400A CT metering)

### Generator Sizing Calculator
Size a standby generator for residential backup.

- **A/C LRA input:** Dropdown by tonnage + manual override for starting surge
- **Starting surge calculation:** Running + A/C surge + other loads = peak demand
- **Generac model recommendations:** Checks both running AND surge capability
- **NEC 445.12:** Main breaker sizing (115% of rated current)
- **NEC 445.13:** Conductor sizing from generator to transfer switch
- **Transfer switch note:** Sizing + neutral bonding warning for non-separately derived systems

### NEC References

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

### Methodology
Voltage drop is calculated using NEC Chapter 9, Table 8 DC resistance values (stranded, uncoated conductors at 75°C):

- **Single-phase / DC:** `VD = (2 x L x I x R) / 1000`
- **Three-phase:** `VD = (1.732 x L x I x R) / 1000`

This is the standard method used in NEC exam preparation and field calculations. It produces conservative results appropriate for residential and commercial branch circuit and feeder sizing.

---

## Tech Stack

- Static HTML, CSS, vanilla JavaScript
- No frameworks, no build step, no dependencies
- Hosted on GitHub Pages
- PWA-ready with offline support

---

## Disclaimer

Tools are for reference only. Always verify results with the current National Electrical Code and local amendments. See [Terms of Use](https://sparky-hq.com/terms.html).
