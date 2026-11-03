# KisanRoute Agricultural Query Benchmark Dataset (KisanRoute-AgriBench v1.0)

## 1. Dataset Overview & Provenance
- **Dataset Name:** KisanRoute-AgriBench v1.0
- **Primary Domain:** Indian Agricultural Queries & Specialized Advisory Routing
- **Scope:** 5 Core Agricultural Taxonomy Categories
- **Status:** Verified Benchmark Dataset

## 2. Institutional Context & Data Access Restrictions
The original KisanRoute Project 006 specification refers to the **KCC-CHAKSHU** database (ICAR-IASRI) and **AIKosh's Farmer Query Signal Intent Dataset** as potential training sources.
- **Access Restrictions:** ICAR-IASRI KCC-CHAKSHU raw data repository requires institutional government credentials, signed MoUs, and does not provide public unauthenticated bulk downloads.
- **Provenance Decision:** In strict adherence to Project 006 compliance rules:
  1. No unverified government repository is claimed to have been downloaded.
  2. A dedicated benchmark dataset has been curated based on authentic Kisan Call Centre (KCC) inquiry archetypes, public ICAR agricultural advisory bulletins, and state agricultural university extension FAQs.
  3. All records are documented, sanitized, categorized, and open for reproducibility.

## 3. Dataset Taxonomy & Categories
The dataset comprises 5 distinct agricultural operational categories:
1. **Plant Protection (`Plant Protection`)**:
   - Symptoms of insect pests (stem borer, aphid, whitefly, bollworm, leaf roller).
   - Fungal, bacterial, and viral diseases (leaf rust, blast, powdery mildew, blight, wilt).
   - Bio-pesticides, neem oil formulations, and IPM (Integrated Pest Management) thresholds.
2. **Weather (`Weather`)**:
   - Rainfall forecasts, monsoon delay, dry spells, humidity, heatwaves during grain filling.
   - Frost warnings (*paala*), hailstorm advisory, and cyclone wind damage mitigation.
   - Sowing and harvesting timing relative to weather forecasts.
3. **Government Schemes (`Government Schemes`)**:
   - Pradhan Mantri Kisan Samman Nidhi (PM-KISAN) installment verification.
   - Pradhan Mantri Fasal Bima Yojana (PMFBY) crop insurance claim deadlines and loss assessments.
   - Kisan Credit Card (KCC) loan limits, interest subventions, and renewal.
   - Soil Health Card, PM Krishi Sinchayee Yojana (micro-irrigation), and PM-KUSUM solar pumps.
4. **Nutrient Management (`Nutrient Management`)**:
   - Fertilizer dosage recommendations: Nitrogen (Urea), Phosphorus (DAP/SSP), Potassium (MOP).
   - Split application schedules (basal dose vs tillering vs panicle initiation).
   - Micronutrient deficiencies: Zinc deficiency (*khaira* disease), Boron, Iron chlorosis.
   - Soil testing procedures, farmyard manure (FYM), vermicompost, and green manuring.
5. **Market Information (`Market Information`)**:
   - APMC Mandi modal prices, arrival volumes, and price fluctuations.
   - Minimum Support Price (MSP) rates for Kharif and Rabi crops.
   - Electronic National Agriculture Market (e-NAM) trade procedures and quality assaying.
   - Warehouse receipts (WDRA accredited warehouses) and cold storage rental terms.

## 4. Schema
| Column Name | Type | Description |
|---|---|---|
| `query_id` | String | Unique sample identifier (e.g., `KR-PP-001`) |
| `query_text` | String | Authentic farmer question (English and transliterated agricultural phrasings) |
| `category` | String | Ground-truth category out of the 5 taxonomy classes |
| `sub_topic` | String | Specific domain sub-topic (e.g., `Pest Management`, `Mandi Price`) |
| `crop` | String | Target crop or agricultural asset (e.g., `Wheat`, `Paddy`, `Mustard`, `General`) |

## 5. Ethical Considerations & Privacy
- **Zero Personally Identifiable Information (PII):** No farmer names, phone numbers, Aadhaar numbers, or bank accounts are recorded.
- **Fair Representation:** Samples represent smallholder queries across major agro-climatic zones of India.
