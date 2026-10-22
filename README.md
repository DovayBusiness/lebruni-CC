# Lebruni CostCalculator

A standalone responsive cost-calculator prototype based on the supplied PHP calculator and cost-setup form. The first release has no PHP or database dependency.

## Run it

Open `index.html` in a modern browser. For a local development server, run from this folder:

```sh
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

## What is included

- Batch inputs for ERP quantity, additional soya, raw-material price, exchange rate, oil/meal selling prices and profit margins.
- Product setup for fixed rates, yields, processing inputs, overheads, packaging prices, legacy stored values and editable item-code mean-cost rows.
- Live landed-cost, direct-cost, yield, NRV joint-cost allocation, cost-per-MT, packaged-product, break-even, target-price and profitability summaries.
- Editable per-input NRV-pool and direct-share percentages for soybean joint costing; each pair must total 100%. Meal packaging remains assigned to meal, and the remaining shared pool is distributed between oil and meal by NRV%.
- Save/open/delete calculations in browser history, print, per-calculation JSON export, and full JSON backup/restore.
- Responsive desktop and mobile interface with larger text and four round top-bar themes (ocean blue is the default; forest, plum and amber are also available). Each palette colors the full interface, and the selected theme is saved locally.

## Where data is saved for now

The browser saves setup and calculation data in `localStorage` under `lebruni-costcalculator-v1`. It stays in the same browser profile on the same device. It is not shared with other users or devices and can be lost if browser data is cleared. Use **Backup & restore** to download a JSON copy before moving devices or clearing data.

When the Supabase version is started, the local data format can be imported and the persistence layer replaced with Supabase. Do not put Supabase secret/service-role keys in browser code; only a restricted public anon key belongs in a frontend, with database row-level security configured.

## Initial setup

Two product templates are included: **Soyabean to refined oil** and **Imported crude oil to refined oil**. The Soyabean setup is prefilled with user-provided demo/testing values; the imported-crude template starts at zero. Three legacy quantities and the item-code mean-cost rows are retained for setup reference, but are not used by the current calculation formulas. Verify all demo figures against current business data before using results for actual decisions.

## Legacy formula notes

The PHP logic was translated from the supplied file. It contains some unusual or inconsistent calculations, preserved or called out here rather than silently corrected:

- The raw-material landed-cost total adds both a CIS line and a clearing/terminal line using the same configured CIS rate.
- The direct-material display applies a 19% factor to phosphoric acid, caustic soda, citric acid and bleaching clay, but other legacy calculation blocks use those costs without that factor.
- The break-even calculation includes a fixed NGN 550,000,000 overhead pool.
- Soybean joint-cost shares are editable in Product setup; each input has an NRV-pool percentage and a direct-share percentage that must total 100%. The shared pool is allocated by oil and meal NRV, while direct costs are charged to refinery except meal packaging, which is assigned once to meal.
- Rates and formulas should be checked against known examples from the existing calculator before using this version for accounting or financial decisions.
