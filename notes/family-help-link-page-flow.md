# Texas Legal Aid - Family Help Link Page Flow

**File:** `family-help-link.html`
**Last Updated:** 2026-01-21

This document provides a complete flow chart of all logic conditions in the Texas Family Help Link intake form. Questions and page names are abbreviated for readability but remain consistent throughout.

---

## Table of Contents

1. [Overview](#1-overview)
2. [Step 1 - Welcome & Terms Agreement](#2-step-1---welcome--terms-agreement)
3. [Step 2a - Self-Help Topic Selection](#3-step-2a---self-help-topic-selection)
4. [Step 2a-resources - Self-Help Resources Display](#4-step-2a-resources---self-help-resources-display)
5. [Step 2b - Who Needs Help & Screening](#5-step-2b---who-needs-help--screening)
6. [Step 3 - Screening Questions (Deprecated)](#6-step-3---screening-questions-deprecated)
7. [Step 4 - Legal Issue Category](#7-step-4---legal-issue-category)
8. [Step 5 - Your Name](#8-step-5---your-name)
9. [Step 6 - Family Members](#9-step-6---family-members)
10. [Step 7 - Opposing Parties](#10-step-7---opposing-parties)
11. [Step 8 - County](#11-step-8---county)
12. [Step 9 - Household Income](#12-step-9---household-income)
13. [Step 10 - Contact Information](#13-step-10---contact-information)
14. [Step 11 - No Matching Organizations](#14-step-11---no-matching-organizations)
15. [Complete Flow Diagram](#15-complete-flow-diagram)
16. [Radio Button Reference](#16-radio-button-reference)
17. [Self-Help Topics Reference](#17-self-help-topics-reference)
18. [Dynamic Label Updates](#18-dynamic-label-updates)
19. [Family Helpline Information](#19-family-helpline-information)
20. [Current Implementation Status](#20-current-implementation-status)

---

## 1. Overview

The Texas Family Help Link is a specialized intake portal designed to connect children and caregivers in Texas with local legal resources. The application focuses specifically on legal issues involving a child's health, stability, safety, or security.

**Target Audiences:**
- Youth or young adults under age 26 seeking legal assistance for themselves
- Caregivers applying on behalf of the wellbeing of a child

**Key Features:**
- Conditional question flow based on applicant type
- Family Helpline integration for CPS-related issues
- Self-help resources for users who don't agree to terms
- Dynamic label updates based on applicant type (youth vs. caregiver)
- Complete intake flow with detailed applicant information collection matching Texas Law Help
- Dynamic add/remove functionality for family members, opposing parties, and income sources
- Comprehensive demographic and household information collection

**Current Status:**
- Steps 1-11 are fully implemented
- Complete application flow from Welcome to No Matching Organizations page
- Form submission is currently client-side only (backend integration pending)
- Application has been significantly updated to match the Texas Law Help flow

---

## 2. Step 1 - Welcome & Terms Agreement

**Step ID:** `data-step="1"`

**Content:**
- Welcome message explaining the program's goal
- Disclaimer that the intake form does not create an attorney-client relationship
- Disclaimer that it does not guarantee legal representation

**Question:** "Do you agree to these terms? (required)"

| Value | Label | Next Step |
|-------|-------|-----------|
| `yes` | Yes | Step 2b (Who Needs Help & Screening) |
| `no` | No | Step 2a (Self-Help Resources) |

```
Step 1: Welcome & Terms
│
├─► terms_agreement = "yes" ────► Step 2b (Who Needs Help & Screening)
│
└─► terms_agreement = "no" ─────► Step 2a (Self-Help Resources)
```

**Actions:**
- Next button → Validates selection and navigates based on answer

---

## 3. Step 2a - Self-Help Topic Selection

**Step ID:** `data-step="2a"`

**Displayed When:** User selects "No" to terms agreement in Step 1

**Content:**
- Message asking user to select topics they want to learn about
- Multi-select dropdown with self-help topic options

**Question:** "Please select which topics you would like resources on"

**Input Type:** Multi-select (`<select multiple>`)

**Available Topics:**
| Value | Label |
|-------|-------|
| `custody-visitation-adoption` | Custody, Visitation, and Adoption |
| `changing-childs-name` | Changing a Child's Name |
| `child-abuse-neglect-cps` | Child Abuse, Child Neglect, and Child Protective Services (CPS) Issues |
| `child-support` | Child Support |
| `community-resources` | Community Resources for Families (Non-Legal) |
| `education-special-education` | Education and Special Education Issues |
| `government-benefits-ssi` | Government Benefits and SSI |
| `identification-documents` | Identification Documents for a Child |
| `immigration-issues` | Immigration Issues for Children |
| `kinship-caregivers` | Kinship Caregivers (Non-Parents Raising Children) |
| `medical-mental-health` | Medical Care and Mental Health for Children |
| `parents-rights-paternity` | Parents Rights and Paternity (Fatherhood) |

**Actions:**
- Back button → Returns to Step 1
- Next button → Navigates to Step 2a-resources (Self-Help Resources Display)

```
Step 2a: Self-Help Topic Selection
│
├─► Back ──────────────► Step 1 (Welcome)
│
└─► Next ──────────────► Step 2a-resources (Self-Help Resources Display)
    (requires at least one topic selected)
```

---

## 4. Step 2a-resources - Self-Help Resources Display

**Step ID:** `data-step="2a-resources"`

**Displayed When:** User clicks "Next" after selecting topics in Step 2a

**Content:**
- Displays resources for each selected topic
- Resources are loaded from `data/family-help-link-resources.json`
- Each topic section includes:
  - Topic title
  - Articles and Toolkits (links to educational content)
  - Resources (links to external organizations and services)

**Data Source:** `data/family-help-link-resources.json`

**Resource Categories:**
Each topic may contain two types of links:
1. **Articles and Toolkits**: Educational content, guides, and how-to resources
2. **Resources**: Links to organizations, government services, and external help

**Available Topics with Resources:**

| Topic Key | Title | Articles | Resources |
|-----------|-------|----------|-----------|
| `changing-childs-name` | Changing a Child's Name | 1 | 0 |
| `child-abuse-neglect-cps` | Child Safety/Abuse/Neglect | 6 | 2 |
| `child-support` | Child Support | 6 | 4 |
| `community-resources` | Community Resources for Families (Non-Legal) | 0 | 4 |
| `custody-visitation-adoption` | Custody, Visitation, and Adoption | 4 | 3 |
| `education-special-education` | Education and Special Education Issues | 6 | 2 |
| `government-benefits-ssi` | Government Benefits and SSI | 4 | 2 |
| `identification-documents` | Identification Documents for a Child | 2 | 0 |
| `immigration-issues` | Immigration Issues for Children | 3 | 1 |
| `kinship-caregivers` | Kinship Caregivers (Non-Parents Raising Children) | 7 | 2 |
| `medical-mental-health` | Medical Care and Mental Health for Children | 4 | 4 |
| `parents-rights-paternity` | Parents Rights and Paternity (Fatherhood) | 6 | 0 |

**Actions:**
- Back button → Returns to Step 2a (Self-Help Topic Selection)

```
Step 2a-resources: Self-Help Resources Display
│
└─► Back ──────────────► Step 2a (Self-Help Topic Selection)
```

**Note:** This is a terminal step for users who selected "No" to terms agreement. Users can go back to select different topics but cannot proceed to the application form from this path.

---

## 5. Step 2b - Who Needs Help & Screening

**Step ID:** `data-step="2b"`

**Displayed When:** User selects "Yes" to terms agreement in Step 1

This step combines the applicant type selection with screening questions. The screening questions appear dynamically after an applicant type is selected.

### 4.1 Applicant Type Question

**Introductory Text:**
- Explains that a child's parent or caregiver will typically apply on behalf of the child
- Notes that children under 17 may apply for themselves if in foster care, homeless, or feel unsafe
- Notes that young adults 18-25 may qualify if transitioning out of foster care or have health conditions

**Question:** "Are you seeking legal help for YOURSELF or SOMEONE ELSE?"

| Value | Label | Effect |
|-------|-------|--------|
| `myself` | Myself (I am a youth or young adult under the age of 26 seeking legal assistance) | Shows screening questions with youth-focused labels |
| `caregiver` | I am a caregiver applying on behalf of the wellbeing of a child | Shows screening questions with caregiver-focused labels + parent question |

```
Applicant Type Selection
│
├─► applicant_type = "myself" ────► Show Screening Questions (youth labels)
│                                    - Foster care question
│                                    - CPS involvement question
│                                    - Violence/abuse question
│                                    - Health condition question
│
└─► applicant_type = "caregiver" ─► Show Screening Questions (caregiver labels)
                                     - Parent question (additional)
                                     - Foster care question
                                     - CPS involvement question
                                     - Violence/abuse question
                                     - Health condition question
```

### 4.2 Screening Questions

The screening questions container (`id="screening-questions-container"`) is hidden by default and displayed once an applicant type is selected. The form scrolls smoothly to the screening questions when they appear.

#### 4.2.1 Parent Question (Caregivers Only)

**Element ID:** `parent-question-step2`
**Displayed When:** `applicant_type = "caregiver"`

**Question:** "Are you the parent of the child? (required)"

| Value | Label |
|-------|-------|
| `yes` | Yes |
| `no` | No |

#### 4.2.2 Foster Care Experience

**Label ID:** `foster-care-label-step2`

**Question (Youth):** "Have you had any experience in foster care? (required)"
**Question (Caregiver):** "Have you or the child in your care had any experience in foster care? (required)"

| Value | Label |
|-------|-------|
| `yes` | Yes |
| `no` | No |

#### 4.2.3 CPS Involvement

**Question:** "Is CPS (Child Protective Services or Child Protective Investigations) involved with your family right now? (required)"

| Value | Label | Effect |
|-------|-------|--------|
| `yes` | Yes | Shows Family Helpline info box |
| `no` | No | Hides Family Helpline info box |

**Family Helpline Info Box (shown when CPS = Yes):**
- **Element ID:** `family-helpline-box`
- **Phone:** 844-888-5565
- **Hours:** Monday - Friday, 9:00 AM - 6:00 PM
- Provides free legal information about CPS issues
- All calls are anonymous
- Cannot provide court representation
- Referrals will not be made through Family Help Link for privacy protection

#### 4.2.4 Violence/Abuse

**Label ID:** `violence-label-step2`

**Question (Youth):** "Have you been the victim of family violence, child abuse, or sexual violence? (required)"
**Question (Caregiver):** "Have you or a child in your care been the victim of family violence, child abuse, or sexual violence? (required)"

| Value | Label |
|-------|-------|
| `yes` | Yes |
| `no` | No |

#### 4.2.5 Health Condition/Disability

**Label ID:** `health-label-step2`

**Question (Youth):** "Do you have a mental or physical health condition or disability? (required)"
**Question (Caregiver):** "Does the child have a mental or physical health condition or disability? (required)"

| Value | Label |
|-------|-------|
| `yes` | Yes |
| `no` | No |

### 4.3 Step 2b Navigation

**Eligibility Check:**
Youth applicants (applicant_type = "myself") who answer "No" to all screening questions are automatically redirected to the Not Eligible Resources page instead of continuing to legal issue selection.

**Ineligibility Criteria (Youth Only):**
- Applicant Type = "Myself" (youth/young adult under 26)
- Foster care experience = "No"
- CPS involvement = "No"
- Violence victim = "No"
- Health condition/disability = "No"

When all above conditions are met, the user is redirected to `not-eligible-resources.html`.

**Normal Navigation:**
```
Step 2b: Who Needs Help & Screening
│
├─► Back ──────────────► Step 1 (Welcome)
│
└─► Next:
    │
    ├─► IF applicant_type = "myself" AND
    │   all screening questions = "no"
    │   ────────────────────────► not-eligible-resources.html (INELIGIBLE)
    │
    └─► OTHERWISE ───────────► Step 4 (Legal Issue Category)
        (requires applicant type AND all screening questions answered)
```

---

## 5. Step 3 - Screening Questions (Deprecated)

**Step ID:** `data-step="3"`

**Status:** DEPRECATED - Kept for backward compatibility only

This step previously served as a separate screening questions page but has been deprecated in favor of embedding the screening questions directly into Step 2b. The step still exists in the HTML and JavaScript but is no longer part of the active user flow.

**Navigation (if accessed):**
```
Step 3: Screening Questions [DEPRECATED]
│
├─► Back ──────────────► Step 2b (Who Needs Help)
│
└─► Next ──────────────► Step 4 (Legal Issue Category)
```

---

## 6. Step 4 - Legal Issue Category

**Step ID:** `data-step="4"`

**Displayed When:** User completes Step 2b screening questions

**Content:**
- Instruction to choose the category that best describes the legal issue
- Note to pick the most important issue if multiple apply
- Guidance to go back and try a different category if specific issue isn't found on next page

**Question:** "Legal Problem Category"

| Value | Label |
|-------|-------|
| `consumer` | CONSUMER ISSUES: I am having problems paying a debt, dealing with a debt collector, or my identity has been stolen |
| `education` | EDUCATION: I have questions about special education services, financial aid, school discipline, school enrollment, bullying or harassment at school |
| `employment` | EMPLOYMENT: I have questions about tax issues related to raising this child |
| `family` | FAMILY: I have questions about conservatorship (custody), child support, visitation, terminating parents' rights, CPS and foster youth issues, child abuse, adoption, changing name or gender markers |
| `health` | HEALTH/PUBLIC BENEFITS: I need help getting Medicaid, Medicare, or CHIP, or help planning for long-term health needs of the child |
| `housing` | HOUSING: I have questions about public housing, eviction, or my rights as a tenant |
| `income` | INCOME MAINTENANCE: I have questions about applying for or appealing a denial of Social Security benefits, SSI, TANF, or Food Stamps |
| `individual-rights` | INDIVIDUAL RIGHTS: I need help with immigration issues, obtaining a birth certificate, erasing criminal records, dealing with driver's license fees, or understanding my right to a criminal defense attorney |
| `juvenile` | JUVENILE: I need help with a misdemeanor, sealing juvenile records, separation from parents (emancipation), de-registering as a juvenile sex offender |
| `none` | None of the above |

**Actions:**
- Back button → Returns to Step 2b (Who Needs Help & Screening)
- Continue button → If "family" selected, proceeds to Step 4a (Family Sub-Problems); otherwise proceeds to Step 5 (Your Name)

```
Step 4: Legal Issue Category
│
├─► Back ──────────────► Step 2b (Who Needs Help & Screening)
│
└─► Continue:
    │
    ├─► IF legal_category = "family" ────► Step 4a (Family Sub-Problems)
    │
    └─► OTHERWISE ─────────────────────► Step 5 (Your Name)
```

---

## 6a. Step 4a - Family Sub-Problems

**Step ID:** `data-step="4a"`

**Displayed When:** User selects "FAMILY" category in Step 4

**Content:**
- Message: "Great! Here is a list of common family legal problems we can help with."
- Instruction to select the one that most closely describes their situation

**Question:** "Legal Problem"

| Value | Label |
|-------|-------|
| `adoption` | I have questions about adoption |
| `name-change` | I have questions about changing a child's name or gender markers |
| `custody-visitation` | I have questions about child custody and visitation |
| `cps-foster` | I have questions about Child Protective Services (CPS) involvement, child abuse, or foster youth rights |
| `child-support` | I have questions about child support |
| `divorce` | I have questions about divorce |
| `paternity` | I have questions about paternity (fatherhood) |
| `termination` | I have questions about termination of parental rights |
| `guardianship` | I need help setting up or ending a guardianship to support decision-making for an adult |
| `none` | None of the above apply to my situation |

**Actions:**
- Back button → Returns to Step 4 (Legal Issue Category)
- Next button → If "cps-foster" selected, proceeds to Step 4b (CPS Narrowing); otherwise proceeds to Step 5 (Your Name)

```
Step 4a: Family Sub-Problems
│
├─► Back ──────────────► Step 4 (Legal Issue Category)
│
└─► Next:
    │
    ├─► IF family_problem = "cps-foster" ────► Step 4b (CPS Narrowing)
    │
    └─► OTHERWISE ───────────────────────────► Step 5 (Your Name)
```

---

## 6b. Step 4b - CPS Narrowing

**Step ID:** `data-step="4b"`

**Displayed When:** User selects "CPS involvement, child abuse, or foster youth rights" in Step 4a

**Content:**
- Title: "Let's Narrow Down The Legal Issue"
- Message explaining user indicated situation involves foster care, CPS, and/or domestic violence
- Instruction to select specific issue or "None of the above" to look at other possible legal issues
- Family Helpline information box (always displayed)
- Message that referrals cannot be made through portal for CPS issues

**Question:** "Legal Problem Code Descriptive"

| Value | Label |
|-------|-------|
| `cps-case` | I have questions about a Child Protective Services (CPS) case |
| `family-violence` | I have questions about a child who has been a victim of family violence or child abuse |
| `sexual-assault-stranger` | I have questions about a child who has been a victim of sexual assault, stalking or trafficking by a stranger or acquaintance |
| `sexual-assault-family` | I have questions about a child who has been the victim of sexual assault by a family member |
| `foster-benefits` | I have questions about foster youth benefits (college tuition waiver, ETV program, Medicaid) |
| `cps-records` | I have questions about requesting CPS records for a child who was in foster care |
| `none` | None of the above apply to my situation |

**Family Helpline Info Box (always displayed):**
- **Phone:** 844-888-5565
- **Hours:** Monday - Friday, 9:00 AM - 6:00 PM
- Provides free legal information about CPS issues
- All calls are anonymous
- Cannot provide court representation
- Referrals will not be made through Family Help Link for privacy protection

**Actions:**
- Back button → Returns to Step 4a (Family Sub-Problems)
- Next button → Proceeds to Step 4c (Self-Help Resources for CPS)

```
Step 4b: CPS Narrowing
│
├─► Back ──────────────► Step 4a (Family Sub-Problems)
│
└─► Next ──────────────► Step 4c (Self-Help Resources for CPS)
```

**Note:** CPS-related issues cannot be referred through the portal. Users are directed to call the Family Helpline and/or view self-help resources.

---

## 6c. Step 4c - Self-Help Resources for CPS

**Step ID:** `data-step="4c"`

**Displayed When:** User clicks "Next" from Step 4b (CPS Narrowing)

**Content:**
- Title: "Self-Help Resources"
- Message asking user to select topics they want to learn about
- Multi-select dropdown with self-help topic options (same as Step 2a)

**Question:** "Please select which topics you would like resources on"

**Input Type:** Multi-select (`<select multiple>`)

**Available Topics:**
| Value | Label |
|-------|-------|
| `child-abuse-neglect-cps` | Child Abuse, Child Neglect, and Child Protective Services (CPS) Issues |
| `custody-visitation-adoption` | Custody, Visitation, and Adoption |
| `changing-childs-name` | Changing a Child's Name |
| `community-resources` | Community Resources for Families (Non-Legal) |
| `child-support` | Child Support |
| `education-special-education` | Education and Special Education Issues |
| `government-benefits-ssi` | Government Benefits and SSI |
| `identification-documents` | Identification Documents for a Child |
| `immigration-issues` | Immigration Issues for Children |
| `kinship-caregivers` | Kinship Caregivers (Non-Parents Raising Children) |
| `medical-mental-health` | Medical Care and Mental Health for Children |
| `parents-rights-paternity` | Parents Rights and Paternity (Fatherhood) |

**Actions:**
- Back button → Returns to Step 4b (CPS Narrowing)
- Next button → Navigates to Step 4c-resources (Self-Help Resources Display)

```
Step 4c: Self-Help Resources for CPS
│
├─► Back ──────────────► Step 4b (CPS Narrowing)
│
└─► Next ──────────────► Step 4c-resources (Self-Help Resources Display)
    (requires at least one topic selected)
```

---

## 6d. Step 4c-resources - Self-Help Resources Display (CPS Path)

**Step ID:** `data-step="4c-resources"`

**Displayed When:** User clicks "Next" after selecting topics in Step 4c

**Content:**
- Displays resources for each selected topic
- Resources are loaded from `data/family-help-link-resources.json`
- Each topic section includes:
  - Topic title
  - Articles and Toolkits (links to educational content)
  - Resources (links to external organizations and services)

**Actions:**
- Back button → Returns to Step 4c (Self-Help Topic Selection)

```
Step 4c-resources: Self-Help Resources Display
│
└─► Back ──────────────► Step 4c (Self-Help Topic Selection)
```

**Note:** This is a terminal step for the CPS path. Users can go back to select different topics but the application flow ends here for CPS-related issues.

---

## 7. Step 5 - Your Name

**Step ID:** `data-step="5"`

**Displayed When:** User completes Step 4 (non-family category) or Step 4a (non-CPS family issue)

**Content:**
- Success message: "Good news! It looks like we may be able to refer you to a legal aid organization."
- Instruction to enter name with note that family members can be added on the next step
- Collects applicant's personal information including demographics

**Form Fields:**

| Field Name | Type | Required | Description |
|------------|------|----------|-------------|
| `applicant_first_name` | text | Yes | First name |
| `applicant_middle_name` | text | No | Middle name |
| `applicant_last_name` | text | Yes | Last name |
| `applicant_suffix` | text | No | Suffix (Jr., Sr., III, etc.) |
| `applicant_dob` | date | Yes | Date of Birth |
| `applicant_gender` | radio | No | Gender (optional with "prefer not to answer") |
| `applicant_race` | radio | No | Race/Ethnicity (optional with "prefer not to answer") |

**Gender Options:**
- Female
- Male
- Non-Binary
- Transgender
- Other
- I prefer not to answer

**Race/Ethnicity Options:**
- Asian or Pacific Islander
- Black (Not Hispanic)
- Hispanic
- Multi-Racial
- Native American
- White (Not Hispanic)
- Other
- I prefer not to answer

**Navigation:**
```
Step 5: Your Name
│
├─► Back ──────────────► Step 4 (Legal Issue Category)
│
└─► Next ──────────────► Step 6 (Family Members)
    (requires first name, last name, and date of birth)
```

**Implementation Notes:**
- Gender and race/ethnicity fields are optional with "prefer not to answer" options
- Date of birth is required
- This step matches the Texas Law Help intake flow

---

## 8. Step 6 - Family Members

**Step ID:** `data-step="6"`

**Displayed When:** User completes Step 5 (Your Name)

**Content:**
- Instructions on how to add family members
- Guidance to add the first child involved, then additional children, parents, or caretakers
- Dynamic add/remove interface for family members

**Instructions:**
1. Click "+ New Family Member" and enter the first child involved
2. Click "+ Save Family Member" and then "+ New Family Member" again to continue adding additional children, other parents, or caretakers
3. Once all family members are added, click Next
4. If you don't know a person's date of birth, leave it blank

**Family Member Form Fields:**

| Field Name | Type | Required | Description |
|------------|------|----------|-------------|
| `fm_first_name` | text | No | First name |
| `fm_last_name` | text | No | Last name |
| `fm_dob` | date | No | Date of Birth (optional) |
| `fm_relationship` | radio | No | Relationship type |

**Relationship Type Options:**
- Child
- Parent of the child(ren) involved
- Another adult who lives in the child's home, none of the above relationships

**Dynamic Functionality:**
- Container: `#family-members-list` - displays added family members
- Add button: `#add-family-member-btn` - shows the family member form
- Form: `#family-member-form` - hidden by default
- Save button: `#save-family-member-btn` - saves and adds to list
- Remove button: `#remove-family-member-btn` - removes current family member from form

**Navigation:**
```
Step 6: Family Members
│
├─► Back ──────────────► Step 5 (Your Name)
│
└─► Next ──────────────► Step 7 (Opposing Parties)
```

**Implementation Notes:**
- Family members are optional (can proceed without adding any)
- Uses dynamic add/remove functionality
- All fields within the family member form are optional
- Matches Texas Law Help flow for collecting family member information

---

## 9. Step 7 - Opposing Parties

**Step ID:** `data-step="7"`

**Displayed When:** User completes Step 6 (Family Members)

**Content:**
- Explanation of "opposing party" concept
- Information about conflict of interest checks
- Guidance to enter other parents or persons with legal custody rights not already listed

**Question:** "Is anyone else involved in this case?"

**Opposing Party Form Fields:**

| Field Name | Type | Required | Description |
|------------|------|----------|-------------|
| `op_type` | radio | No | Individual or Organization/Business |
| `op_first_name` | text | No | First name |
| `op_middle_name` | text | No | Middle name |
| `op_last_name` | text | No | Last name |
| `op_dob` | date | No | Date of Birth |
| `op_relationship` | radio | No | Relationship type |

**Opposing Party Type Options:**
- Individual
- Organization/Business

**Relationship Type Options:**
- Landlord
- Legal Guardian or Conservator
- Other Family Member
- Parent
- Spouse
- Unknown
- Work/Business Acquaintance

**Dynamic Functionality:**
- Container: `#opposing-parties-list` - displays added opposing parties
- Add button: `#add-opposing-party-btn` - shows the opposing party form
- Form: `#opposing-party-form` - hidden by default
- Save button: `#save-opposing-party-btn` - saves and adds to list
- Remove button: `#remove-opposing-party-btn` - removes current party from form

**Navigation:**
```
Step 7: Opposing Parties
│
├─► Back ──────────────► Step 6 (Family Members)
│
└─► Next ──────────────► Step 8 (County)
```

**Implementation Notes:**
- Opposing parties are optional (can proceed without adding any)
- Uses dynamic add/remove functionality
- All fields within the opposing party form are optional
- Before attorneys can represent, they must ensure no conflict of interest with opposing parties

---

## 10. Step 8 - County

**Step ID:** `data-step="8"`

**Displayed When:** User completes Step 7 (Opposing Parties)

**Content:**
- Explanation that location helps determine which legal aid organization can assist
- Dropdown selects for both residence county and dispute county

**Form Fields:**

| Field Name | Type | Required | Description |
|------------|------|----------|-------------|
| `county_residence` | select | Yes | County of residence |
| `county_dispute` | select | No | County where legal dispute is occurring |

**County Options:**
Complete list of all 254 Texas counties in alphabetical order, including:
- Anderson County
- Andrews County
- Angelina County
- [... all Texas counties ...]
- Zavala County

**Navigation:**
```
Step 8: County
│
├─► Back ──────────────► Step 7 (Opposing Parties)
│
└─► Next ──────────────► Step 9 (Household Income)
    (requires residence county selection)
```

**Implementation Notes:**
- Residence county is required
- Dispute county is optional
- Both dropdowns contain all 254 Texas counties
- Helps route applicant to appropriate legal aid organization by geographic service area

---

## 11. Step 9 - Household Income

**Step ID:** `data-step="9"`

**Displayed When:** User completes Step 8 (County)

**Content:**
- Explanation of household income questions for determining legal aid qualification
- Instructions to consider all income sources for everyone in the household
- Dynamic add/remove interface for income sources

**Form Fields:**

| Field Name | Type | Required | Description |
|------------|------|----------|-------------|
| `household_under_18` | number | Yes | Number of people under 18 in household |
| `household_18_over` | number | Yes | Number of people 18 and over in household |
| `income_change` | radio | Yes | Whether income is likely to change significantly |
| `has_income` | radio | Yes | Whether household has any income |

**Income Source Form Fields:**

| Field Name | Type | Required | Description |
|------------|------|----------|-------------|
| `income_type` | select | No | Type of income source |
| `income_frequency` | radio | No | How often income is received |
| `income_family_member` | radio | No | Which family member receives the income |
| `income_amount` | number | No | Amount of income |
| `income_note` | textarea | No | Optional notes about income source |

**Income Type Options:**
- Employment Income
- Self-Employment Income
- Social Security
- SSI (Supplemental Security Income)
- Disability Benefits
- Unemployment Benefits
- Veterans Benefits
- Pension/Retirement
- Child Support
- Alimony/Spousal Support
- TANF (Temporary Assistance for Needy Families)
- SNAP/Food Stamps
- Rental Income
- Investment Income
- Other

**Income Frequency Options:**
- Weekly
- Biweekly
- Semi-Monthly
- Monthly
- Quarterly
- Annually

**Dynamic Functionality:**
- Container: `#income-list` - displays added income sources
- Add button: `#add-income-btn` - shows the income form
- Form: `#income-form` - hidden by default
- Family member list: `#income-family-member-list` - populated dynamically from Step 6 family members
- Save button: `#save-income-btn` - saves and adds to list
- Remove button: `#remove-income-btn` - removes current income from form

**Navigation:**
```
Step 9: Household Income
│
├─► Back ──────────────► Step 8 (County)
│
└─► Next ──────────────► Step 10 (Contact Information)
    (requires household size and income change answer)
```

**Implementation Notes:**
- Household size (both under 18 and 18+) is required
- Income change question is required
- Has income question is required
- Adding specific income sources is optional
- Income sources can be assigned to specific family members added in Step 6
- Uses dynamic add/remove functionality matching Texas Law Help flow

---

## 12. Step 10 - Contact Information

**Step ID:** `data-step="10"`

**Displayed When:** User completes Step 9 (Household Income)

**Content:**
- Message: "We're almost done! To finalize the application, we'll need a few more details about you."
- Simple contact information collection (phone and email only)

**Form Fields:**

| Field Name | Type | Required | Description |
|------------|------|----------|-------------|
| `contact_phone` | tel | No | Phone number |
| `contact_email` | email | No | Email address |

**Actions:**
- Back button → Returns to Step 9 (Household Income)
- Submit Application button → Submits form and proceeds to Step 11

**Navigation:**
```
Step 10: Contact Information
│
├─► Back ──────────────► Step 9 (Household Income)
│
└─► Submit Application ─► Step 11 (No Matching Organizations)
```

**Implementation Notes:**
- Both phone and email are optional fields
- This is the final data collection step
- Simplified from previous version - only collects phone and email
- Submit button has ID `#fhl-submit-btn`

---

## 13. Step 11 - No Matching Organizations

**Step ID:** `data-step="thank-you"`

**Displayed When:** User submits the application from Step 10

**Content:**
- Message: "You have not yet submitted your application to any organization."
- Instructions to go back and click "Refer me here" on an organization
- Alternative option to see self-help resources instead
- Collapsible section showing "No matching referral organizations found"
- Information box with immediate legal help resources

**Key Messages:**
- You have not yet submitted your application to any organization
- Click Back to return and select "Refer me here" on an organization
- Or click Next to see self-help resources instead

**Alternative Organizations Section:**
- Expandable details section
- Shows "No matching referral organizations found"
- Message: "There are no alternative legal aid organizations that match your specific situation at this time."
- Directs to self-help resources or Texas Legal Services Center at 1-800-622-2520

**Immediate Help Resources:**
- Call Texas Legal Services Center at 1-800-622-2520
- Visit TexasLawHelp.org for free legal information and resources
- Contact local county bar association for lawyer referral services

**Actions:**
- Back button → Returns to Step 10
- Next button → Links to `not-eligible-resources.html` for self-help resources

**Navigation:**
```
Step 11: No Matching Organizations
│
├─► Back ──────────────► Step 10 (Contact Information)
│
└─► Next ──────────────► not-eligible-resources.html (Self-Help Resources)
```

**Implementation Notes:**
- This replaces the previous "Thank You" confirmation page
- Current implementation shows "no matching organizations" message
- In future implementation, this would show actual matched organizations
- Provides alternative pathways: go back to select organization or proceed to self-help resources
- Includes helpful contact information for immediate legal assistance

---

## 14. Complete Flow Diagram

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                           STEP 1 - WELCOME & TERMS                              │
│                    "Do you agree to these terms?"                               │
└─────────────────────────────────────────────────────────────────────────────────┘
                                        │
                         ┌──────────────┴──────────────┐
                         │                             │
                    YES  ▼                         NO  ▼
              ┌─────────────────┐            ┌─────────────────┐
              │    STEP 2b      │            │    STEP 2a      │
              │  Who Needs Help │            │  Self-Help      │
              │  & Screening    │            │  Resources      │
              └────────┬────────┘            └────────┬────────┘
                       │                              │
                       │                              ▼
                       │                     ┌─────────────────┐
                       │                     │ Select Topics & │
                       │                     │ Show Resources  │
                       │                     │  (Placeholder)  │
                       │                     └─────────────────┘
                       ▼
        ┌──────────────────────────────────┐
        │     APPLICANT TYPE SELECTION     │
        │   "Are you seeking help for      │
        │    YOURSELF or SOMEONE ELSE?"    │
        └──────────────┬───────────────────┘
                       │
          ┌────────────┴────────────┐
          │                         │
     MYSELF                    CAREGIVER
          │                         │
          ▼                         ▼
   ┌──────────────┐         ┌──────────────┐
   │ Show Youth   │         │ Show Caregiver│
   │ Questions:   │         │ Questions:    │
   │ - Foster care│         │ - Parent?     │
   │ - CPS?       │         │ - Foster care │
   │ - Violence?  │         │ - CPS?        │
   │ - Health?    │         │ - Violence?   │
   └──────┬───────┘         │ - Health?     │
          │                 └───────┬───────┘
          │                         │
          │    ┌────────────────────┘
          │    │
          ▼    ▼
   ┌──────────────────────────────────┐
   │  IF CPS = YES: Show Family       │
   │  Helpline Info Box               │
   │  (844-888-5565)                  │
   └──────────────┬───────────────────┘
                  │
                  ▼
   ┌──────────────────────────────────┐
   │     ELIGIBILITY CHECK            │
   │  (Youth applicants only)         │
   └──────────────┬───────────────────┘
                  │
          ┌───────┴────────┐
          │                │
          │                ▼
          │     ┌─────────────────────┐
          │     │ IF applicant_type = │
          │     │ "myself" AND all    │
          │     │ screening = "no"    │
          │     └──────────┬──────────┘
          │                │
          │                ▼
          │     ┌─────────────────────┐
          │     │  NOT ELIGIBLE       │
          │     │  RESOURCES PAGE     │
          │     │  (End of flow)      │
          │     └─────────────────────┘
          │
          ▼
   ┌──────────────────────────────────┐
   │        STEP 4 - LEGAL ISSUE      │
   │          CATEGORY                │
   │   (Select from 10 categories)    │
   └──────────────┬───────────────────┘
                  │
          ┌───────┴────────┐
          │                │
     FAMILY            OTHER CATEGORIES
          │                │
          ▼                │
   ┌──────────────────┐    │
   │  STEP 4a - FAMILY│    │
   │   SUB-PROBLEMS   │    │
   │  (10 options)    │    │
   └────────┬─────────┘    │
            │              │
    ┌───────┴──────┐       │
    │              │       │
 CPS/FOSTER    OTHER       │
    │              │       │
    ▼              │       │
┌────────────────┐ │       │
│ STEP 4b - CPS  │ │       │
│   NARROWING    │ │       │
│ (7 options +   │ │       │
│ Family Helpline│ │       │
└───────┬────────┘ │       │
        │          │       │
        ▼          │       │
┌────────────────┐ │       │
│  STEP 4c -     │ │       │
│ SELF-HELP      │ │       │
│ RESOURCES      │ │       │
│ (Topic Select) │ │       │
└───────┬────────┘ │       │
        │          │       │
        ▼          │       │
┌────────────────┐ │       │
│STEP 4c-RESOURCES│       │
│ Display Links  │ │       │
│ (END OF CPS    │ │       │
│  PATH)         │ │       │
└────────────────┘ │       │
                   │       │
                   ▼       ▼
   ┌──────────────────────────────────┐
   │      STEP 5 - YOUR NAME          │
   │  - First, Middle, Last, Suffix   │
   │  - Date of Birth (required)      │
   │  - Gender (optional)             │
   │  - Race/Ethnicity (optional)     │
   └──────────────┬───────────────────┘
                  │
                  ▼
   ┌──────────────────────────────────┐
   │    STEP 6 - FAMILY MEMBERS       │
   │  Dynamic add/remove interface    │
   │  - First, Last name              │
   │  - Date of Birth (optional)      │
   │  - Relationship type             │
   └──────────────┬───────────────────┘
                  │
                  ▼
   ┌──────────────────────────────────┐
   │    STEP 7 - OPPOSING PARTIES     │
   │  Dynamic add/remove interface    │
   │  - Party type (Individual/Org)   │
   │  - Name fields                   │
   │  - DOB, Relationship             │
   └──────────────┬───────────────────┘
                  │
                  ▼
   ┌──────────────────────────────────┐
   │        STEP 8 - COUNTY           │
   │  - Residence county (required)   │
   │  - Dispute county (optional)     │
   │  (All 254 Texas counties)        │
   └──────────────┬───────────────────┘
                  │
                  ▼
   ┌──────────────────────────────────┐
   │    STEP 9 - HOUSEHOLD INCOME     │
   │  - Household size (required)     │
   │  - Income change (required)      │
   │  - Has income (required)         │
   │  Dynamic add/remove for income:  │
   │    - Type, Frequency, Amount     │
   │    - Family member assignment    │
   └──────────────┬───────────────────┘
                  │
                  ▼
   ┌──────────────────────────────────┐
   │    STEP 10 - CONTACT INFO        │
   │  - Phone (optional)              │
   │  - Email (optional)              │
   └──────────────┬───────────────────┘
                  │
                  ▼
   ┌──────────────────────────────────┐
   │  STEP 11 - NO MATCHING ORGS      │
   │  "You have not yet submitted     │
   │   your application"              │
   │  - Go back to select org         │
   │  - Or proceed to self-help       │
   │  - Contact info for immediate    │
   │    legal assistance              │
   └──────────────────────────────────┘
```

---

## 15. Radio Button Reference

### Step 1: Welcome & Terms
| Name | Values |
|------|--------|
| `terms_agreement` | yes, no |

### Step 2b: Who Needs Help & Screening
| Name | Values | Condition |
|------|--------|-----------|
| `applicant_type` | myself, caregiver | Always shown |
| `is_parent` | yes, no | Only if applicant_type = caregiver |
| `foster_care` | yes, no | After applicant_type selected |
| `cps_involved` | yes, no | After applicant_type selected |
| `violence_victim` | yes, no | After applicant_type selected |
| `health_condition` | yes, no | After applicant_type selected |

### Step 3: Screening Questions (Deprecated)
| Name | Values | Condition |
|------|--------|-----------|
| `is_parent` | yes, no | Only if applicant_type = caregiver |
| `foster_care` | yes, no | Always shown (if step is accessed) |
| `cps_involved` | yes, no | Always shown (if step is accessed) |
| `violence_victim` | yes, no | Always shown (if step is accessed) |
| `health_condition` | yes, no | Always shown (if step is accessed) |

### Step 4: Legal Issue Category
| Name | Values |
|------|--------|
| `legal_category` | consumer, education, employment, family, health, housing, income, individual-rights, juvenile, none |

### Step 4a: Family Sub-Problems
| Name | Values |
|------|--------|
| `family_problem` | adoption, name-change, custody-visitation, cps-foster, child-support, divorce, paternity, termination, guardianship, none |

### Step 4b: CPS Narrowing
| Name | Values |
|------|--------|
| `cps_problem` | cps-case, family-violence, sexual-assault-stranger, sexual-assault-family, foster-benefits, cps-records, none |

### Step 5: Your Name
| Name | Values | Required |
|------|--------|----------|
| `applicant_gender` | female, male, non-binary, transgender, other, prefer-not-to-answer | No |
| `applicant_race` | asian-pacific-islander, black-not-hispanic, hispanic, multi-racial, native-american, white-not-hispanic, other, prefer-not-to-answer | No |

### Step 6: Family Members
| Name | Values |
|------|--------|
| `fm_relationship` | child, parent, other |

### Step 7: Opposing Parties
| Name | Values |
|------|--------|
| `op_type` | individual, organization |
| `op_relationship` | landlord, guardian-conservator, other-family, parent, spouse, unknown, work-business |

### Step 9: Household Income
| Name | Values | Required |
|------|--------|----------|
| `income_change` | yes, no | Yes |
| `has_income` | yes, no | Yes |
| `income_frequency` | weekly, biweekly, semi-monthly, monthly, quarterly, annually | No (within income form) |

---

## 16. Self-Help Topics Reference

**Field Name:** `self_help_topics`
**Input Type:** Multi-select (`<select multiple>`)
**Used In:** Step 2a

| Value | Display Label |
|-------|--------------|
| `custody-visitation-adoption` | Custody, Visitation, and Adoption |
| `changing-childs-name` | Changing a Child's Name |
| `child-abuse-neglect-cps` | Child Abuse, Child Neglect, and Child Protective Services (CPS) Issues |
| `child-support` | Child Support |
| `community-resources` | Community Resources for Families (Non-Legal) |
| `education-special-education` | Education and Special Education Issues |
| `government-benefits-ssi` | Government Benefits and SSI |
| `identification-documents` | Identification Documents for a Child |
| `immigration-issues` | Immigration Issues for Children |
| `kinship-caregivers` | Kinship Caregivers (Non-Parents Raising Children) |
| `medical-mental-health` | Medical Care and Mental Health for Children |
| `parents-rights-paternity` | Parents Rights and Paternity (Fatherhood) |

---

## 17. Dynamic Label Updates

The form dynamically updates question labels based on the selected applicant type to provide contextually appropriate wording.

### Youth/Young Adult (applicant_type = "myself")
| Question | Label | Element ID |
|----------|-------|------------|
| Foster Care (Step 2b) | "Have you had any experience in foster care?" | foster-care-label-step2 |
| Violence (Step 2b) | "Have you been the victim of family violence, child abuse, or sexual violence?" | violence-label-step2 |
| Health (Step 2b) | "Do you have a mental or physical health condition or disability?" | health-label-step2 |
| Foster Care (Step 3) | "Have you had any experience in foster care?" | foster-care-label |
| Violence (Step 3) | "Have you been the victim of family violence, child abuse, or sexual violence?" | violence-label |
| Health (Step 3) | "Do you have a mental or physical health condition or disability?" | health-label |

### Caregiver (applicant_type = "caregiver")
| Question | Label | Element ID |
|----------|-------|------------|
| Foster Care (Step 2b) | "Have you or the child in your care had any experience in foster care?" | foster-care-label-step2 |
| Violence (Step 2b) | "Have you or a child in your care been the victim of family violence, child abuse, or sexual violence?" | violence-label-step2 |
| Health (Step 2b) | "Does the child have a mental or physical health condition or disability?" | health-label-step2 |
| Foster Care (Step 3) | "Have you or the child in your care had any experience in foster care?" | foster-care-label |
| Violence (Step 3) | "Have you or a child in your care been the victim of family violence, child abuse, or sexual violence?" | violence-label |
| Health (Step 3) | "Does the child have a mental or physical health condition or disability?" | health-label |

**JavaScript Functions:**
- `updateScreeningLabelsStep2()` - Updates labels in Step 2b
- `updateScreeningLabels()` - Updates labels in Step 3 (deprecated)

---

## 18. Family Helpline Information

**Element ID:** `family-helpline-box`
**Displayed When:** `cps_involved = "yes"` in Step 2b
**Display Logic:** Controlled by `toggleFamilyHelpline()` JavaScript function

**Contact Information:**
- **Phone:** 844-888-5565
- **Hours:** Monday - Friday, 9:00 AM - 6:00 PM

**Services:**
- Speak with an experienced child welfare attorney about CPS issues in Texas
- Free legal information
- Resources and referrals
- All calls are anonymous
- Helps callers understand their rights and legal options

**Limitations:**
- Cannot represent clients in court
- Referrals will not be made through Family Help Link for privacy protection
- Callers directed to call the helpline directly instead

**User Experience:**
- Info box appears smoothly when user selects "Yes" for CPS involvement
- Page scrolls to show the helpline box
- Info box is hidden if user changes answer to "No"

---

## 20. Current Implementation Status

| Step | Status | Notes |
|------|--------|-------|
| Step 1 - Welcome & Terms | ✅ Fully Implemented | Routes to Step 2a or Step 2b based on answer |
| Step 2a - Self-Help Topic Selection | ✅ Fully Implemented | Multi-select dropdown for 12 topics |
| Step 2a-resources - Self-Help Resources | ✅ Fully Implemented | Displays resources dynamically from JSON data |
| Step 2b - Who Needs Help & Screening | ✅ Fully Implemented | Includes dynamic screening questions and CPS helpline integration |
| Step 3 - Screening Questions | ⚠️ Deprecated | Kept for backward compatibility, not used in normal flow |
| Step 4 - Legal Issue Category | ✅ Fully Implemented | Displays all 10 legal issue categories, routes to 4a for family |
| Step 4a - Family Sub-Problems | ✅ Fully Implemented | 10 specific family legal problems, routes to 4b for CPS |
| Step 4b - CPS Narrowing | ✅ Fully Implemented | 7 CPS-specific issues with Family Helpline, routes to 4c |
| Step 4c - Self-Help Resources (CPS) | ✅ Fully Implemented | Topic selection for CPS path users |
| Step 4c-resources - Resources Display | ✅ Fully Implemented | Terminal step for CPS path, displays selected resources |
| Step 5 - Your Name | ✅ Fully Implemented | Collects name, DOB, gender, race/ethnicity |
| Step 6 - Family Members | ✅ Fully Implemented | Dynamic add/remove of family members |
| Step 7 - Opposing Parties | ✅ Fully Implemented | Dynamic add/remove of opposing parties |
| Step 8 - County | ✅ Fully Implemented | Residence and dispute county |
| Step 9 - Household Income | ✅ Fully Implemented | Household size and dynamic income sources |
| Step 10 - Contact Information | ✅ Fully Implemented | Phone and email only |
| Step 11 - No Matching Organizations | ✅ Fully Implemented | Shows no matching orgs message |

**Completed Features:**
- Full application flow from Welcome to No Matching Organizations (Steps 1-11)
- Complete Texas Law Help matching flow implementation
- **Family category sub-problems selection (Step 4a)** - Matches Texas Law Help flow
- **CPS narrowing with Family Helpline redirect to self-help (Steps 4b-4c)** - Matches Texas Law Help flow
- Self-Help Resources display with 12 topic categories loaded from JSON
- Detailed applicant information collection (Step 5)
- Dynamic family member management (Step 6)
- Dynamic opposing party management (Step 7)
- County selection for routing (Step 8)
- Comprehensive household income collection (Step 9)
- Simplified contact information (Step 10)
- No matching organizations page with alternative resources (Step 11)
- Form validation for required fields
- Screen reader accessibility announcements
- Responsive design for mobile devices
- Eligibility check for youth applicants (redirects to Not Eligible Resources when youth answer "no" to all screening questions)

**Resource Data:**
- Self-help resources are stored in `data/family-help-link-resources.json`
- Resources include Articles and Toolkits plus external Resources for each topic
- 12 topic categories with links to Texas Law Help, government agencies, and other organizations
- Gender and race/ethnicity fields with "prefer not to answer" options
- Dynamic add/remove functionality for family members, opposing parties, and income sources

**Pending Features:**
- Backend API integration for form submission
- Actual organization matching and display functionality
- Resource display functionality for Step 2a self-help topics
- Email confirmation to applicants
- Integration with legal aid provider systems

---

**Progress Indicator:** The form uses a progress tracking system that maps steps to numbered progression:
- Step 1 → Progress 1
- Steps 2a & 2b → Progress 2
- Steps 3 & 4 → Progress 3
- Steps 5, 6, 7, 8, 9, 10 → Progress 4
- Step 11 (No Matching Organizations) → Progress 5

**Screen Reader Support:** Step announcements are provided for accessibility:
- Step 1: "Step 1 of 5: Welcome"
- Step 2a: "Step 2 of 5: Self-Help Resources"
- Step 2b: "Step 2 of 5: Eligibility"
- Step 3: "Step 3 of 5: Screening Questions"
- Step 4: "Step 3 of 5: Legal Issue Category"
- Step 5: "Step 4 of 5: Your Name"
- Step 6: "Step 4 of 5: Family Members"
- Step 7: "Step 4 of 5: Opposing Parties"
- Step 8: "Step 4 of 5: County Information"
- Step 9: "Step 4 of 5: Household Income"
- Step 10: "Step 4 of 5: Contact Information"
- Step 11: "Application Submitted - No Matching Organizations Found"

---

*This document should be updated whenever the Family Help Link form logic changes.*
