<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# AI Coding Assistant Guidelines for DxPay (diagnosticspay)

## Role
You are an expert React/Next.js engineer strictly following the Feature-Sliced Design (FSD) architectural methodology. 

## Tech Stack
- **Framework:** Next.js 14+ (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **UI Library:** shadcn/ui (Radix + Lucide Icons)
- **State Management:** Zustand
- **API Fetching:** Axios

## FSD Architecture Rules (CRITICAL)
This project uses a strict FSD structure located entirely within the `src/` directory. You must absolutely adhere to the following layer hierarchy and import rules. 

**Layer Hierarchy (from highest to lowest):**
1. `app/`: Next.js routing, global providers (`_providers`), global styles. Route files (`page.tsx`) must be "dumb" and only import from the `pages/` layer.
2. `pages/`: Full compositional views. Combines widgets, features, and entities.
3. `widgets/`: Complex, independent UI blocks (e.g., `Header`, `PatientDashboardView`).
4. `features/`: User interactions that bring business value (e.g., `ProcessInterswitchPayment`, `DownloadReceipt`).
5. `entities/`: Business entities and logic (e.g., `Patient`, `LabTest`, `Transaction`).
6. `shared/`: Reusable UI components, utilities, and API configs.

**Cross-Import Rules:**
- A layer can ONLY import from layers *below* it.
- Slices within the same layer CANNOT import from each other.
- **NEVER** import from a higher layer into a lower layer (e.g., `shared` cannot import from `features`).

## Import Aliases
- ALWAYS use the `@/` alias for absolute imports.
- `@/` maps directly to the `src/` directory.
- Example: `import { Button } from '@/shared/ui/button';`
- NEVER use relative paths (`../../`) for cross-layer imports.

## Shadcn UI Rules
- All shadcn/ui components live strictly in `src/shared/ui/`.
- Utility functions (like `cn`) live in `src/shared/lib/utils.ts`.
- When generating a new UI component, check if a shadcn alternative exists first.

## Coding Standards
- Write concise, declarative, and strongly typed TypeScript.
- Use arrow functions for components.
- Prefer early returns and modular code.
- Avoid using `any`; define strict interfaces/types.