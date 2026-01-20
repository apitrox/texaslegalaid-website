# Texas Legal Aid - Online Application Page Flow

**File:** `apply-online.html`
**Last Updated:** 2026-01-19

This document provides a complete flow chart of all logic conditions in the online application. Questions and page names are abbreviated for readability but remain consistent throughout.

---

## Table of Contents

1. [Step 1 - Legal Area Selection](#1-step-1---legal-area-selection)
2. [Public Benefits Flow](#2-public-benefits-flow)
3. [Criminal Record Flow](#3-criminal-record-flow)
4. [Housing & Debt Flow](#4-housing--debt-flow)
5. [Elder Law Flow](#5-elder-law-flow)
6. [Family Law Flow](#6-family-law-flow)
7. [Military & Benefits Flow](#7-military--benefits-flow)
8. [Violence & Abuse Flow](#8-violence--abuse-flow)
9. [Other Legal Areas](#9-other-legal-areas)
10. [Household Info Step](#10-household-info-step)
11. [Screening Questions](#11-screening-questions)
12. [Contact Info Step](#12-contact-info-step)
13. [Poverty Thresholds Summary](#13-poverty-thresholds-summary)
14. [Radio Button Reference](#14-radio-button-reference)
15. [Complete Flow Diagram](#15-complete-flow-diagram)

---

## 1. Step 1 - Legal Area Selection

**Question:** "What type of legal issue do you need help with?"

| Value | Label | Description |
|-------|-------|-------------|
| `benefits` | Public Benefits | SNAP, Medicaid, Medicare, SSI, SSDI, TANF |
| `criminal-record` | Criminal Record Expungement | Clear or seal criminal records |
| `housing` | Housing & Debt | Eviction, debt collection, garnishment, property |
| `elder-law` | Elder Law | Retirement, estate planning, long-term care |
| `family` | Family Law | Divorce, guardianship, CPS, custody, support |
| `military` | Military & Benefits | VA benefits, discharge upgrades, military law |
| `violence` | Violence & Abuse | Physical/sexual abuse, stalking, harassment |
| `other` | Other | Don't see your issue? |

---

## 2. Public Benefits Flow

```
Public Benefits Selected
│
├─► Age 60+ Question (age_60_or_older)
│   │
│   ├─► YES ─────────────────────────────────► Household Info (125%)
│   │                                           │
│   │                                           ├─► poverty ≤ 125% ─► Contact Info ─► Thank You
│   │                                           │
│   │                                           └─► poverty > 125% ─► NOT ELIGIBLE
│   │
│   └─► NO ──────────────────────────────────► NOT ELIGIBLE
```

**Abbreviations:**
- NOT ELIGIBLE = Redirect to `not-eligible-resources.html`

**Note:** The Medicare and Medicare Dispute questions have been deprecated. Users who answer "No" to the Age 60+ question are now immediately redirected to the Not Eligible Resources page.

---

## 3. Criminal Record Flow

```
Criminal Record Selected
│
├─► Defense Attorney Question (defense_attorney)
│   "Do you need a defense attorney in a criminal case?"
│   │
│   ├─► YES ─────────────────────────────────────────────► NOT ELIGIBLE
│   │
│   └─► NO
│       │
│       ├─► Texas Crime Question (texas_crime)
│       │   "Did the alleged crime occur in Texas?"
│       │   │
│       │   ├─► NO ──────────────────────────────────────► NOT ELIGIBLE
│       │   │
│       │   └─► YES
│       │       │
│       │       ├─► CR Veterans Question (cr_is_veteran)
│       │       │   "Are you a veteran, spouse, or dependent?"
│       │       │   │
│       │       │   ├─► NO ──────────────────────────────► NOT ELIGIBLE
│       │       │   │
│       │       │   └─► YES
│       │       │       │
│       │       │       ├─► CR Veteran Type (cr_veteran_type)
│       │       │       │   │
│       │       │       │   ├─► veteran ──────────────────► Household Info (200%)
│       │       │       │   │                                │
│       │       │       │   │                                ├─► poverty ≤ 200% ─► Contact Info ─► Thank You
│       │       │       │   │                                │
│       │       │       │   │                                └─► poverty > 200% ─► NOT ELIGIBLE
│       │       │       │   │
│       │       │       │   ├─► spouse ───────────────────► Household Info (200%)
│       │       │       │   │                                │
│       │       │       │   │                                ├─► poverty ≤ 200% ─► Contact Info ─► Thank You
│       │       │       │   │                                │
│       │       │       │   │                                └─► poverty > 200% ─► NOT ELIGIBLE
│       │       │       │   │
│       │       │       │   ├─► dependent_under_18 ───────► Household Info (200%)
│       │       │       │   │                                │
│       │       │       │   │                                ├─► poverty ≤ 200% ─► Contact Info ─► Thank You
│       │       │       │   │                                │
│       │       │       │   │                                └─► poverty > 200% ─► NOT ELIGIBLE
│       │       │       │   │
│       │       │       │   ├─► dependent_over_18
│       │       │       │   │   │
│       │       │       │   │   ├─► CR Guardianship (cr_has_guardianship)
│       │       │       │   │   │   ├─► YES ──────────────► Household Info (125%)
│       │       │       │   │   │   │                        │
│       │       │       │   │   │   │                        ├─► poverty ≤ 125% ─► Contact Info ─► Thank You
│       │       │       │   │   │   │                        │
│       │       │       │   │   │   │                        └─► poverty > 125% ─► NOT ELIGIBLE
│       │       │       │   │   │   │
│       │       │       │   │   │   └─► NO ───────────────► NOT ELIGIBLE
│       │       │       │   │
│       │       │       │   └─► other ────────────────────► NOT ELIGIBLE
```

**Abbreviations:**
- CR = Criminal Record

---

## 4. Housing & Debt Flow

```
Housing & Debt Selected
│
├─► Housing Type Question (housing_type)
│   "Which would you like help with?"
│   │
│   ├─► identity_theft ─────────────────────────────────► Household Info (125%)
│   │                                                     │
│   │                                                     ├─► poverty ≤ 125% ─► Contact Info ─► Thank You
│   │                                                     │
│   │                                                     └─► poverty > 125% ─► NOT ELIGIBLE
│   │
│   ├─► early_termination
│   │   │
│   │   ├─► Sexual Assault Question (housing_sexual_assault)
│   │   │   "Ending lease early for safety following sexual assault?"
│   │   │   │
│   │   │   ├─► YES ────────────────────────────────────► Household Info (187.5%)
│   │   │   │                                              │
│   │   │   │                                              ├─► poverty ≤ 187.5% ─► Contact Info ─► Thank You
│   │   │   │                                              │
│   │   │   │                                              └─► poverty > 187.5% ─► NOT ELIGIBLE
│   │   │   │
│   │   │   └─► NO
│   │   │       └─► [Falls through to Housing Veterans]
│   │
│   ├─► other_housing ───────────────────────────────────► Housing Veterans
│   │
│   └─► something_else ──────────────────────────────────► Housing Veterans


Housing Veterans Question (housing_is_veteran)
"Are you a veteran, spouse, or dependent of a veteran?"
│
├─► NO
│   │
│   └─► Housing Age 60+ Question (housing_age_60)
│       "Are you 60 years of age or older?"
│       │
│       ├─► YES ────────────────────────────────────────► Household Info (125%)
│       │                                                  │
│       │                                                  ├─► poverty ≤ 125% ─► Contact Info ─► Thank You
│       │                                                  │
│       │                                                  └─► poverty > 125% ─► NOT ELIGIBLE
│       │
│       └─► NO ─────────────────────────────────────────► NOT ELIGIBLE
│
└─► YES
    │
    ├─► Housing Veteran Type (housing_veteran_type)
    │   │
    │   ├─► veteran ────────────────────────────────────► Household Info (200%)
    │   │                                                  │
    │   │                                                  ├─► poverty ≤ 200% ─► Contact Info ─► Thank You
    │   │                                                  │
    │   │                                                  └─► poverty > 200% ─► NOT ELIGIBLE
    │   │
    │   ├─► spouse ─────────────────────────────────────► Household Info (200%)
    │   │                                                  │
    │   │                                                  ├─► poverty ≤ 200% ─► Contact Info ─► Thank You
    │   │                                                  │
    │   │                                                  └─► poverty > 200% ─► NOT ELIGIBLE
    │   │
    │   ├─► dependent_under_18 ─────────────────────────► Household Info (200%)
    │   │                                                  │
    │   │                                                  ├─► poverty ≤ 200% ─► Contact Info ─► Thank You
    │   │                                                  │
    │   │                                                  └─► poverty > 200% ─► NOT ELIGIBLE
    │   │
    │   ├─► dependent_over_18
    │   │   │
    │   │   ├─► Housing Guardianship (housing_has_guardianship)
    │   │   │   ├─► YES ────────────────────────────────► Household Info (125%)
    │   │   │   │                                          │
    │   │   │   │                                          ├─► poverty ≤ 125% ─► Contact Info ─► Thank You
    │   │   │   │                                          │
    │   │   │   │                                          └─► poverty > 125% ─► NOT ELIGIBLE
    │   │   │   │
    │   │   │   └─► NO ─────────────────────────────────► NOT ELIGIBLE
    │   │
    │   └─► other ──────────────────────────────────────► NOT ELIGIBLE
```

---

## 5. Elder Law Flow

```
Elder Law Selected
│
├─► Elder Deceased Question (elder_deceased)
│   "Does your issue involve funds/property of a deceased person?"
│   │
│   ├─► YES ──────────────────────────────────────────────► Elder Veterans
│   │
│   └─► NO ───────────────────────────────────────────────► Elder Pension


Elder Veterans Question (elder_is_veteran)
"Are you a veteran, spouse, or dependent of a veteran?"
│
├─► NO ───────────────────────────────────────────────────► NOT ELIGIBLE
│
└─► YES
    │
    ├─► Elder Veteran Type (elder_veteran_type)
    │   │
    │   ├─► veteran ────────────────────────────────────► Household Info (200%)
    │   │                                                  │
    │   │                                                  ├─► poverty ≤ 200% ─► Contact Info ─► Thank You
    │   │                                                  │
    │   │                                                  └─► poverty > 200% ─► NOT ELIGIBLE
    │   │
    │   ├─► spouse ─────────────────────────────────────► Household Info (200%)
    │   │                                                  │
    │   │                                                  ├─► poverty ≤ 200% ─► Contact Info ─► Thank You
    │   │                                                  │
    │   │                                                  └─► poverty > 200% ─► NOT ELIGIBLE
    │   │
    │   ├─► dependent_under_18 ─────────────────────────► Household Info (200%)
    │   │                                                  │
    │   │                                                  ├─► poverty ≤ 200% ─► Contact Info ─► Thank You
    │   │                                                  │
    │   │                                                  └─► poverty > 200% ─► NOT ELIGIBLE
    │   │
    │   ├─► dependent_over_18
    │   │   │
    │   │   ├─► Elder Guardianship (elder_has_guardianship)
    │   │   │   ├─► YES ────────────────────────────────► Household Info (125%)
    │   │   │   │                                          │
    │   │   │   │                                          ├─► poverty ≤ 125% ─► Contact Info ─► Thank You
    │   │   │   │                                          │
    │   │   │   │                                          └─► poverty > 125% ─► NOT ELIGIBLE
    │   │   │   │
    │   │   │   └─► NO ─────────────────────────────────► NOT ELIGIBLE
    │   │
    │   └─► other ──────────────────────────────────────► NOT ELIGIBLE


Elder Pension Question (elder_pension)
"Does your issue involve a pension or 401(k)?"
│
├─► YES ──────────────────────────────────────────────────► Household Info (125%)
│                                                            │
│                                                            ├─► poverty ≤ 125% ─► Contact Info ─► Thank You
│                                                            │
│                                                            └─► poverty > 125% ─► NOT ELIGIBLE
│
└─► NO
    │
    ├─► Elder Violence Question (elder_violence)
    │   "Have you experienced physical violence or abuse?"
    │   │
    │   ├─► YES ──────────────────────────────────────────► Household Info (125%)
    │   │                                                    │
    │   │                                                    ├─► poverty ≤ 125% ─► Contact Info ─► Thank You
    │   │                                                    │
    │   │                                                    └─► poverty > 125% ─► NOT ELIGIBLE
    │   │
    │   └─► NO
    │       │
    │       ├─► Elder Age 60+ Question (elder_age_60)
    │       │   "Are you 60 years of age or older?"
    │       │   │
    │       │   ├─► YES ──────────────────────────────────► Household Info (125%)
    │       │   │                                            │
    │       │   │                                            ├─► poverty ≤ 125% ─► Contact Info ─► Thank You
    │       │   │                                            │
    │       │   │                                            └─► poverty > 125% ─► NOT ELIGIBLE
    │       │   │
    │       │   └─► NO ───────────────────────────────────► NOT ELIGIBLE
```

---

## 6. Family Law Flow

```
Family Law Selected
│
├─► Safety Concerns Question (family_safety)
│   "Are you seeking help with divorce, custody, or a family matter
│   due to safety concerns regarding your spouse or your child's other parent?"
│   │
│   ├─► YES ─────────────────────────────────────► Household Info (125%)
│   │                                              │
│   │                                              ├─► poverty ≤ 125% ─► Contact Info ─► Thank You
│   │                                              │
│   │                                              └─► poverty > 125% ─► NOT ELIGIBLE
│   │
│   └─► NO
│       │
│       ├─► Best Fit Question (family_best_fit)
│       │   "Which of the following best fits your situation?"
│       │   │
│       │   ├─► raising_child ──────────────────► Household Info (125%)
│       │   │   ("I'm raising a child who is      │
│       │   │   not my biological or adopted      ├─► poverty ≤ 125% ─► Contact Info ─► Thank You
│       │   │   child and want to establish a     │
│       │   │   legal relationship")              └─► poverty > 125% ─► NOT ELIGIBLE
│       │   │
│       │   └─► other_family ───────────────────► Household Info (125%)
│       │       ("I'm seeking help with divorce,  │
│       │       custody, child support, or        ├─► poverty ≤ 125% ─► Contact Info ─► Thank You
│       │       other family matter")             │
│       │                                         └─► poverty > 125% ─► NOT ELIGIBLE
```

**Abbreviations:**
- NOT ELIGIBLE = Redirect to `not-eligible-resources.html`

---

## 7. Military & Benefits Flow

```
Military & Benefits Selected
│
├─► Veterans/Dependent Question (military_is_veteran)
│   "Are you a veteran, a spouse of a veteran, or a dependent of a veteran?"
│   │
│   ├─► NO ─────────────────────────────────────► Household Info (125%)
│   │                                              │
│   │                                              ├─► poverty ≤ 125% ─► Contact Info ─► Thank You
│   │                                              │
│   │                                              └─► poverty > 125% ─► NOT ELIGIBLE
│   │
│   └─► YES
│       │
│       ├─► Military Veteran Type (military_veteran_type)
│       │   "Which best describes you?"
│       │   │
│       │   ├─► veteran ─────────────────────────► Household Info (200%)
│       │   │                                       │
│       │   │                                       ├─► poverty ≤ 200% ─► Contact Info ─► Thank You
│       │   │                                       │
│       │   │                                       └─► poverty > 200% ─► NOT ELIGIBLE
│       │   │
│       │   ├─► spouse ──────────────────────────► Household Info (200%)
│       │   │                                       │
│       │   │                                       ├─► poverty ≤ 200% ─► Contact Info ─► Thank You
│       │   │                                       │
│       │   │                                       └─► poverty > 200% ─► NOT ELIGIBLE
│       │   │
│       │   ├─► dependent_under_18 ──────────────► Household Info (125%)
│       │   │                                       │
│       │   │                                       ├─► poverty ≤ 125% ─► Contact Info ─► Thank You
│       │   │                                       │
│       │   │                                       └─► poverty > 125% ─► NOT ELIGIBLE
│       │   │
│       │   ├─► dependent_over_18
│       │   │   │
│       │   │   ├─► Military Guardianship (military_has_guardianship)
│       │   │   │   "Does the veteran have guardianship over yourself (the dependent)?"
│       │   │   │   ├─► YES ─────────────────────► Household Info (125%)
│       │   │   │   │                               │
│       │   │   │   │                               ├─► poverty ≤ 125% ─► Contact Info ─► Thank You
│       │   │   │   │                               │
│       │   │   │   │                               └─► poverty > 125% ─► NOT ELIGIBLE
│       │   │   │   │
│       │   │   │   └─► NO ──────────────────────► NOT ELIGIBLE
│       │   │
│       │   └─► other ───────────────────────────► NOT ELIGIBLE
```

**Abbreviations:**
- NOT ELIGIBLE = Redirect to `not-eligible-resources.html`

---

## 8. Violence & Abuse Flow

```
Violence & Abuse Selected
│
├─► Sexual Assault Question (violence_sexual_assault)
│   "Does your issue involve sexual assault?"
│   │
│   ├─► YES ─────────────────────────────────► Household Info (200%)
│   │                                           │
│   │                                           ├─► poverty ≤ 200% ─► Contact Info ─► Thank You
│   │                                           │
│   │                                           └─► poverty > 200% ─► NOT ELIGIBLE
│   │
│   └─► NO ──────────────────────────────────► Household Info (125%)
│                                               │
│                                               ├─► poverty ≤ 125% ─► Contact Info ─► Thank You
│                                               │
│                                               └─► poverty > 125% ─► NOT ELIGIBLE
```

**Abbreviations:**
- NOT ELIGIBLE = Redirect to `not-eligible-resources.html`

---

## 9. Other Legal Areas

```
Other Selected
│
└─► Household Info (125%)
    │
    ├─► poverty ≤ 125% ─────────────────► Contact Info ─► Thank You
    │
    └─► poverty > 125% ─────────────────► NOT ELIGIBLE
```

---

## 10. Household Info Step

**Step ID:** `step-household-info`

**Accessed From:**
- Public Benefits: Age 60+ = Yes (125% threshold)
- Criminal Record: CR Veterans = Yes, Type = veteran (200% threshold)
- Criminal Record: CR Veterans = Yes, Type = spouse (200% threshold)
- Criminal Record: CR Veterans = Yes, Type = dependent_under_18 (200% threshold)
- Criminal Record: CR Veterans = Yes, Type = dependent_over_18, Guardianship = Yes (125% threshold)
- Housing & Debt: identity_theft (125% threshold)
- Housing & Debt: early_termination + Sexual Assault = Yes (187.5% threshold)
- Housing & Debt: Housing Veterans = No + Age 60+ = Yes (125% threshold)
- Housing & Debt: Housing Veterans = Yes, Type = veteran (200% threshold)
- Housing & Debt: Housing Veterans = Yes, Type = spouse (200% threshold)
- Housing & Debt: Housing Veterans = Yes, Type = dependent_under_18 (200% threshold)
- Housing & Debt: Housing Veterans = Yes, Type = dependent_over_18, Guardianship = Yes (125% threshold)
- Elder Law: Deceased = Yes, Veterans = Yes, Type = veteran (200% threshold)
- Elder Law: Deceased = Yes, Veterans = Yes, Type = spouse (200% threshold)
- Elder Law: Deceased = Yes, Veterans = Yes, Type = dependent_under_18 (200% threshold)
- Elder Law: Deceased = Yes, Veterans = Yes, Type = dependent_over_18, Guardianship = Yes (125% threshold)
- Family Law: Safety = Yes
- Family Law: Safety = No, Best Fit = (any option)
- Military & Benefits: Veterans = No
- Military & Benefits: Veterans = Yes, Type = veteran or spouse
- Military & Benefits: Veterans = Yes, Type = dependent_under_18
- Military & Benefits: Veterans = Yes, Type = dependent_over_18, Guardianship = Yes
- Violence & Abuse: Sexual Assault = Yes (200% threshold)
- Violence & Abuse: Sexual Assault = No (125% threshold)
- Other: (125% threshold)

**Form Fields:**
- `household_size` - Number of persons (1-20)
- `household_income` - Income amount
- `income_frequency` - weekly, monthly, yearly

**Poverty Calculation:**
```
Annual Income = household_income × multiplier
  - weekly: × 52
  - monthly: × 12
  - yearly: × 1

Poverty Percent = (Annual Income / Federal Poverty Level) × 100
```

**Federal Poverty Guidelines (2024 fallback):**
| Household Size | Annual Level |
|----------------|--------------|
| 1 | $15,060 |
| 2 | $20,440 |
| 3 | $25,820 |
| 4 | $31,200 |
| 5 | $36,580 |
| 6 | $41,960 |
| 7 | $47,340 |
| 8 | $52,720 |
| 8+ | Add $5,380 per person |

**Decision Logic:**

```
From Public Benefits Path (all sub-paths):
│
├─► poverty > 125% ──────────────────► NOT ELIGIBLE
│
└─► poverty ≤ 125% ──────────────────► Contact Info ──► Thank You


From Elder Law Veterans Path:
│
├─► poverty > 200% ──────────────────► NOT ELIGIBLE
│
└─► poverty ≤ 200% ──────────────────► Contact Info ──► Thank You


From Family Law Path:
│
├─► poverty > 125% ──────────────────► NOT ELIGIBLE
│
└─► poverty ≤ 125% ──────────────────► Contact Info ──► Thank You


From Military & Benefits Path (Veterans = No):
│
├─► poverty > 125% ──────────────────► NOT ELIGIBLE
│
└─► poverty ≤ 125% ──────────────────► Contact Info ──► Thank You


From Military & Benefits Path (Veterans = Yes, Type = veteran or spouse):
│
├─► poverty > 200% ──────────────────► NOT ELIGIBLE
│
└─► poverty ≤ 200% ──────────────────► Contact Info ──► Thank You


From Military & Benefits Path (Veterans = Yes, Type = dependent):
│
├─► poverty > 125% ──────────────────► NOT ELIGIBLE
│
└─► poverty ≤ 125% ──────────────────► Contact Info ──► Thank You


From Violence & Abuse Path (Sexual Assault = Yes):
│
├─► poverty > 200% ──────────────────► NOT ELIGIBLE
│
└─► poverty ≤ 200% ──────────────────► Contact Info ──► Thank You


From Violence & Abuse Path (Sexual Assault = No):
│
├─► poverty > 125% ──────────────────► NOT ELIGIBLE
│
└─► poverty ≤ 125% ──────────────────► Contact Info ──► Thank You


From Criminal Record Path (CR Veterans = Yes, Type = veteran/spouse/dependent_under_18):
│
├─► poverty > 200% ──────────────────► NOT ELIGIBLE
│
└─► poverty ≤ 200% ──────────────────► Contact Info ──► Thank You


From Criminal Record Path (CR Veterans = Yes, Type = dependent_over_18, Guardianship = Yes):
│
├─► poverty > 125% ──────────────────► NOT ELIGIBLE
│
└─► poverty ≤ 125% ──────────────────► Contact Info ──► Thank You


From Housing & Debt Path (identity_theft):
│
├─► poverty > 125% ──────────────────► NOT ELIGIBLE
│
└─► poverty ≤ 125% ──────────────────► Contact Info ──► Thank You


From Housing & Debt Path (early_termination + Sexual Assault = Yes):
│
├─► poverty > 187.5% ────────────────► NOT ELIGIBLE
│
└─► poverty ≤ 187.5% ────────────────► Contact Info ──► Thank You


From Housing & Debt Path (Housing Veterans = No + Age 60+ = Yes):
│
├─► poverty > 125% ──────────────────► NOT ELIGIBLE
│
└─► poverty ≤ 125% ──────────────────► Contact Info ──► Thank You


From Housing & Debt Path (Housing Veterans = Yes, Type = veteran/spouse/dependent_under_18):
│
├─► poverty > 200% ──────────────────► NOT ELIGIBLE
│
└─► poverty ≤ 200% ──────────────────► Contact Info ──► Thank You


From Housing & Debt Path (Housing Veterans = Yes, Type = dependent_over_18, Guardianship = Yes):
│
├─► poverty > 125% ──────────────────► NOT ELIGIBLE
│
└─► poverty ≤ 125% ──────────────────► Contact Info ──► Thank You
```

---

## 11. Screening Questions

**Used by:** Public Benefits path after Household Info (poverty ≤ 200%)

### 10.1 Crime Victim Question

**Step ID:** `step-crime-victim`
**Radio Name:** `crime_victim`

```
"Were you a victim of a violent crime and need assistance
applying for crime victims' compensation?"
│
├─► YES ─────────────────────────────► Contact Info ──► Thank You
│
└─► NO ──────────────────────────────► Veterans Question
```

### 10.2 Veterans Question

**Step ID:** `step-veterans`
**Radio Name:** `is_veteran`

```
"Are you a veteran, spouse, or dependent of a veteran?"
│
├─► NO ──────────────────────────────► Child Care Question
│
└─► YES
    │
    ├─► Veteran Type (veteran_type)
    │   │
    │   ├─► veteran ─────────────────► Contact Info ──► Thank You
    │   ├─► spouse ──────────────────► Contact Info ──► Thank You
    │   ├─► dependent_under_18 ──────► Contact Info ──► Thank You
    │   │
    │   ├─► dependent_over_18
    │   │   │
    │   │   ├─► Guardianship (has_guardianship)
    │   │   │   ├─► YES ─────────────► Contact Info ──► Thank You
    │   │   │   └─► NO ──────────────► Child Care Question
    │   │
    │   └─► other ───────────────────► Child Care Question
```

### 10.3 Child Care Question

**Step ID:** `step-child-care`
**Radio Name:** `child_care`

```
"Do you have children under 18 in your care?"
│
├─► YES ─────────────────────────────► Contact Info ──► Thank You
│
└─► NO
    │
    ├─► poverty ≤ 125% ──────────────► Contact Info ──► Thank You
    │
    └─► poverty > 125% ──────────────► NOT ELIGIBLE
```

---

## 12. Contact Info Step

**Step ID:** `step-pb-contact-no-medicare`

**Used by:** Most paths leading to application completion

**Alternative Step:** `step-pb-contact` (legacy - no longer used)

**Form Fields:**
- `pb_nm_referral_source` - How did you find us? (required)
- `pb_nm_first_name` - First name (required)
- `pb_nm_middle_name` - Middle name (optional)
- `pb_nm_last_name` - Last name (required)
- `pb_nm_suffix` - Suffix (optional)
- `pb_nm_email` - Email (optional)
- `pb_nm_phone` - Phone (optional)
- `pb_nm_county` - County (optional)
- `pb_nm_legal_problem` - Problem description (optional)

**Display Elements:**
- Annual household income (from Household Info, if applicable)
- Poverty percent (from Household Info, if applicable)

**Back Button Navigation Logic:**
Priority order for determining previous step:
1. `legal_area` = benefits AND `age_60_or_older` answered → Household Info (all Public Benefits paths go through Household Info)
2. `violence_sexual_assault` answered → Household Info (all Violence paths go through Household Info)
3. `military_is_veteran` answered → Household Info (all Military paths go through Household Info)
4. `family_safety` answered → Household Info
5. `elder_age_60` answered → Elder Age 60 step
6. `elder_violence` = yes → Elder Pension step
7. `elder_pension` = yes → Elder Pension step
8. `elder_is_veteran` answered → Household Info
9. `housing_type` = identity_theft → Household Info (all Housing paths now go through Household Info)
10. `housing_type` = early_termination AND `housing_sexual_assault` = yes → Household Info
11. `housing_age_60` = yes answered → Household Info
12. `housing_is_veteran` = yes answered → Household Info
13. `cr_is_veteran` = yes answered → Household Info (all CR paths now go through Household Info)
14. `child_care` answered → Child Care step
15. `is_veteran` = yes → Veterans step
16. `crime_victim` = yes → Crime Victim step
17. Default → Household Info

**Submit Action:** Show Thank You page

---

## 13. Poverty Thresholds Summary

| Path | Initial Threshold | Secondary Threshold |
|------|-------------------|---------------------|
| Public Benefits → Age 60+ = Yes → Household Info | 125% | N/A |
| Criminal Record → CR Veterans = Yes → veteran/spouse/dependent_under_18 → Household Info | 200% | N/A |
| Criminal Record → CR Veterans = Yes → dependent_over_18 + Guardianship = Yes → Household Info | 125% | N/A |
| Housing & Debt → identity_theft → Household Info | 125% | N/A |
| Housing & Debt → early_termination + Sexual Assault = Yes → Household Info | 187.5% | N/A |
| Housing & Debt → Housing Veterans = No + Age 60+ = Yes → Household Info | 125% | N/A |
| Housing & Debt → Housing Veterans = Yes → veteran/spouse/dependent_under_18 → Household Info | 200% | N/A |
| Housing & Debt → Housing Veterans = Yes → dependent_over_18 + Guardianship = Yes → Household Info | 125% | N/A |
| Elder Law → Deceased = Yes → Veterans = Yes → veteran/spouse/dependent_under_18 → Household Info | 200% | N/A |
| Elder Law → Deceased = Yes → Veterans = Yes → dependent_over_18 + Guardianship = Yes → Household Info | 125% | N/A |
| Elder Law → Deceased = No → Pension/Violence/Age60+ = Yes → Household Info | 125% | N/A |
| Family Law → Household Info | 125% | N/A |
| Military & Benefits → Veterans = No → Household Info | 125% | N/A |
| Military & Benefits → Veterans = Yes → veteran/spouse → Household Info | 200% | N/A |
| Military & Benefits → Veterans = Yes → dependent → Household Info | 125% | N/A |
| Violence & Abuse → Sexual Assault = Yes → Household Info | 200% | N/A |
| Violence & Abuse → Sexual Assault = No → Household Info | 125% | N/A |
| Other → Household Info | 125% | N/A |
| All Other Paths | N/A | N/A |

---

## 14. Radio Button Reference

### Step 1 Questions
| Name | Values |
|------|--------|
| `legal_area` | benefits, criminal-record, housing, elder-law, family, military, violence, other |
| `age_60_or_older` | yes, no |
| ~~`has_medicare`~~ | ~~yes, no~~ *(Deprecated - No longer shown)* |
| ~~`medicare_dispute`~~ | ~~yes, no~~ *(Deprecated - No longer shown)* |
| `housing_type` | identity_theft, early_termination, other_housing, something_else |
| `housing_sexual_assault` | yes, no |
| `family_safety` | yes, no |
| `military_is_veteran` | yes, no |
| `military_veteran_type` | veteran, spouse, dependent_under_18, dependent_over_18, other |
| `military_has_guardianship` | yes, no |

### Family Law Questions
| Name | Values |
|------|--------|
| `family_safety` | yes, no |
| `family_best_fit` | raising_child, other_family |

### Criminal Record Questions
| Name | Values |
|------|--------|
| `defense_attorney` | yes, no |
| `texas_crime` | yes, no |
| `cr_is_veteran` | yes, no |
| `cr_veteran_type` | veteran, spouse, dependent_under_18, dependent_over_18, other |
| `cr_has_guardianship` | yes, no |

### Housing Questions
| Name | Values |
|------|--------|
| `housing_is_veteran` | yes, no |
| `housing_veteran_type` | veteran, spouse, dependent_under_18, dependent_over_18, other |
| `housing_has_guardianship` | yes, no |
| `housing_age_60` | yes, no |

### Elder Law Questions
| Name | Values |
|------|--------|
| `elder_deceased` | yes, no |
| `elder_is_veteran` | yes, no |
| `elder_veteran_type` | veteran, spouse, dependent_under_18, dependent_over_18, other |
| `elder_has_guardianship` | yes, no |
| `elder_pension` | yes, no |
| `elder_violence` | yes, no |
| `elder_age_60` | yes, no |

### Military & Benefits Questions
| Name | Values |
|------|--------|
| `military_is_veteran` | yes, no |
| `military_veteran_type` | veteran, spouse, dependent_under_18, dependent_over_18, other |
| `military_has_guardianship` | yes, no |

### Violence & Abuse Questions
| Name | Values |
|------|--------|
| `violence_sexual_assault` | yes, no |

### Screening Questions
| Name | Values |
|------|--------|
| `crime_victim` | yes, no |
| `is_veteran` | yes, no |
| `veteran_type` | veteran, spouse, dependent_under_18, dependent_over_18, other |
| `has_guardianship` | yes, no |
| `child_care` | yes, no |

### Household Info
| Name | Values |
|------|--------|
| `household_size` | 1-20 |
| `household_income` | numeric |
| `income_frequency` | weekly, monthly, yearly |

---

## 15. Complete Flow Diagram

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                           STEP 1 - LEGAL AREA                                   │
│                    "What type of legal issue do you need help with?"            │
└─────────────────────────────────────────────────────────────────────────────────┘
                                        │
       ┌────────────┬───────────┬───────┴───────┬──────────┬──────────────────────┐
       │            │           │               │          │                      │
       ▼            ▼           ▼               ▼          ▼                      ▼
┌──────────┐ ┌───────────┐ ┌─────────┐  ┌───────────┐ ┌─────────┐    ┌────────────────┐
│ PUBLIC   │ │ CRIMINAL  │ │ HOUSING │  │ ELDER     │ │ FAMILY  │    │ MILITARY/      │
│ BENEFITS │ │ RECORD    │ │ & DEBT  │  │ LAW       │ │ LAW     │    │ VIOLENCE/OTHER │
└────┬─────┘ └─────┬─────┘ └────┬────┘  └─────┬─────┘ └────┬────┘    └───────┬────────┘
     │             │            │              │            │                 │
     ▼             ▼            ▼              ▼            │                 │
┌──────────┐ ┌───────────┐ ┌─────────┐  ┌───────────┐      │                 │
│ Age 60+? │ │ Defense   │ │ Housing │  │ Deceased  │      │                 │
│          │ │ Attorney? │ │ Type?   │  │ Funds?    │      │                 │
└────┬─────┘ └─────┬─────┘ └────┬────┘  └─────┬─────┘      │                 │
     │             │            │              │            │                 │
     │             │            │              │            ▼                 ▼
  YES│NO        YES│NO          │           YES│NO    ┌─────────────────────────┐
     │             │            │              │      │   STANDARD FORM FLOW    │
     ▼             ▼            │              │      │   (No special logic)    │
┌─────────┐   ┌────────┐       │              │      └─────────────────────────┘
│ PB      │   │ NOT    │       │              │
│ Contact │   │ ELIGIBLE│       │              │
│ (60+)   │   └────────┘       │              │
└────┬────┘                    │              │
     │         NO│             │              │
     │            ▼            │              │
     │       ┌─────────┐       │              │
     │       │ TX      │       │              │
     │       │ Crime?  │       │              │
     │       └────┬────┘       │              │
     │            │            │              │
     │         YES│NO          │              │
     │            │            │              │
     │            ▼            │              │
     │       ┌────────┐        │              │
     │       │ NOT    │        │              │
     │       │ ELIGIBLE│        │              │
     │       └────────┘        │              │
     │                         │              │
     │            YES          │              │
     │             │           │              │
     │             ▼           │              │
     │       ┌───────────┐     │              │
     │       │ CR        │     │              │
     │       │ Veterans? │     │              │
     │       └─────┬─────┘     │              │
     │             │           │              │
     │          YES│NO         │              │
     │             │           │              │
     ▼             ▼           ▼              ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│                        [SEE DETAILED FLOWS IN SECTIONS 2-5]                     │
└─────────────────────────────────────────────────────────────────────────────────┘
                                        │
                                        ▼
                            ┌─────────────────────┐
                            │    HOUSEHOLD INFO   │
                            │  (Poverty Check)    │
                            └──────────┬──────────┘
                                       │
                              ≤200%    │    >200%
                        ┌──────────────┴──────────────┐
                        │                             │
                        ▼                             ▼
              ┌─────────────────┐            ┌────────────┐
              │ SCREENING       │            │    NOT     │
              │ QUESTIONS       │            │  ELIGIBLE  │
              │ (PB path only)  │            └────────────┘
              └────────┬────────┘
                       │
                       ▼
              ┌─────────────────┐
              │   CONTACT INFO  │
              │  (Submit App)   │
              └────────┬────────┘
                       │
                       ▼
              ┌─────────────────┐
              │    THANK YOU    │
              └─────────────────┘
```

---

## Ineligibility Paths Summary

All paths leading to `not-eligible-resources.html`:

| Path | Condition |
|------|-----------|
| Public Benefits | Age 60+ = No |
| Public Benefits | Household Info poverty > 125% |
| Criminal Record | Defense Attorney = Yes |
| Criminal Record | Texas Crime = No |
| Criminal Record | CR Veterans = No |
| Criminal Record | CR Veteran Type = Other |
| Criminal Record | CR Guardianship = No |
| Criminal Record | CR Veterans = Yes, veteran/spouse/dependent_under_18 AND Household poverty > 200% |
| Criminal Record | CR Veterans = Yes, dependent_over_18 + Guardianship = Yes AND Household poverty > 125% |
| Housing & Debt | identity_theft AND Household poverty > 125% |
| Housing & Debt | early_termination + Sexual Assault = Yes AND Household poverty > 187.5% |
| Housing & Debt | Housing Veterans = No + Age 60+ = Yes AND Household poverty > 125% |
| Housing & Debt | Housing Veterans = Yes, veteran/spouse/dependent_under_18 AND Household poverty > 200% |
| Housing & Debt | Housing Veterans = Yes, dependent_over_18 + Guardianship = Yes AND Household poverty > 125% |
| Housing & Debt | Housing Veteran Type = Other |
| Housing & Debt | Housing Guardianship = No |
| Housing & Debt | Housing Age 60+ = No |
| Elder Law | Deceased = Yes, Veterans = No |
| Elder Law | Deceased = Yes, Veteran Type = Other |
| Elder Law | Deceased = Yes, Guardianship = No |
| Elder Law | Deceased = Yes, veteran/spouse/dependent_under_18 AND Household poverty > 200% |
| Elder Law | Deceased = Yes, dependent_over_18 + Guardianship = Yes AND Household poverty > 125% |
| Elder Law | Deceased = No, Pension = No, Violence = No, Age 60+ = No |
| Family Law | Household Info poverty > 125% |
| Military & Benefits | Veteran Type = Other |
| Military & Benefits | Guardianship = No |
| Military & Benefits | Veterans = No AND Household poverty > 125% |
| Military & Benefits | Veterans = Yes, veteran/spouse AND Household poverty > 200% |
| Military & Benefits | Veterans = Yes, dependent AND Household poverty > 125% |
| Violence & Abuse | Sexual Assault = Yes AND Household poverty > 200% |
| Violence & Abuse | Sexual Assault = No AND Household poverty > 125% |
| Other | Household poverty > 125% |

---

## Direct Contact Info Paths (Skip Screening)

Paths that go directly to Contact Info without additional screening:

1. Housing + identity_theft AND poverty ≤ 125%
2. Housing + early_termination + sexual_assault = Yes AND poverty ≤ 187.5%
3. Housing + Veterans = Yes, veteran/spouse/dependent_under_18 AND poverty ≤ 200%
4. Housing + Veterans = Yes, dependent_over_18 + Guardianship = Yes AND poverty ≤ 125%
5. Housing + Veterans = No + Age 60+ = Yes AND poverty ≤ 125%
6. Criminal Record + CR Veterans = Yes, veteran/spouse/dependent_under_18 AND poverty ≤ 200%
7. Criminal Record + CR Veterans = Yes, dependent_over_18 + Guardianship = Yes AND poverty ≤ 125%
8. Elder Law + Deceased = Yes, Veterans = Yes, veteran/spouse/dependent_under_18 AND poverty ≤ 200%
9. Elder Law + Deceased = Yes, Veterans = Yes, dependent_over_18 + Guardianship = Yes AND poverty ≤ 125%
10. Elder Law + Pension = Yes AND poverty ≤ 125%
11. Elder Law + Pension = No, Violence = Yes AND poverty ≤ 125%
12. Elder Law + Pension = No, Violence = No, Age 60+ = Yes AND poverty ≤ 125%
13. Public Benefits + Age 60+ = Yes AND poverty ≤ 125%
14. Family Law + Safety = Yes AND poverty ≤ 125%
15. Family Law + Safety = No + Best Fit AND poverty ≤ 125%
16. Military & Benefits + Veterans = Yes, veteran/spouse AND poverty ≤ 200%
17. Military & Benefits + Veterans = Yes, dependent AND poverty ≤ 125%
18. Military & Benefits + Veterans = No AND poverty ≤ 125%
19. Violence & Abuse + Sexual Assault = Yes AND poverty ≤ 200%
20. Violence & Abuse + Sexual Assault = No AND poverty ≤ 125%
21. Other AND poverty ≤ 125%

---

*This document should be updated whenever the online application logic changes.*
