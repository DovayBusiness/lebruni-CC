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
- Product setup for fixed rates, yields, processing inputs, overheads, packaging prices, legacy stored values, editable item-code mean-cost rows, and configurable soybean joint-cost allocation percentages. Each Soybean input’s NRV-pool and direct percentages must total 100%.
- Live landed-cost, direct-cost, yield, NRV joint-cost allocation, cost-per-MT, packaged-product, break-even, target-price and profitability summaries.
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
- For Soybean-to-refined-oil, the first allocation percentage creates the shared NRV pool and the second is a direct addition. The pool is shared between refined oil and meal by their NRV percentages. Direct additions go to refinery except meal packaging, which is assigned directly to meal once and excluded from the shared pool. Allocation percentages are editable in Soybean Product Setup, with a 100% total required for each input. Defaults are 100/0 for raw material, gas 10-ton and hexane; 70/30 for labor, diesel, generator, water and indirect labor; and 0/100 for gas 5-ton, the four 19%-factor acids/clay and meal packaging.
- Rates and formulas should be checked against known examples from the existing calculator before using this version for accounting or financial decisions.
