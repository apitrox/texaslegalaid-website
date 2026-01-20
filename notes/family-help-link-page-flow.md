# Texas Legal Aid - Family Help Link Page Flow

**File:** `family-help-link.html`
**Last Updated:** 2026-01-19

This document provides a complete flow chart of all logic conditions in the Texas Family Help Link intake form. Questions and page names are abbreviated for readability but remain consistent throughout.

---

## Table of Contents

1. [Overview](#1-overview)
2. [Step 1 - Welcome & Terms Agreement](#2-step-1---welcome--terms-agreement)
3. [Step 2a - Self-Help Resources](#3-step-2a---self-help-resources)
4. [Step 2b - Who Needs Help & Screening](#4-step-2b---who-needs-help--screening)
5. [Step 4 - Legal Issue Category](#5-step-4---legal-issue-category)
6. [Step 5 - Contact Information](#6-step-5---contact-information)
7. [Step 6 - Thank You](#7-step-6---thank-you)
8. [Complete Flow Diagram](#8-complete-flow-diagram)
9. [Radio Button Reference](#9-radio-button-reference)
10. [Self-Help Topics Reference](#10-self-help-topics-reference)
11. [Dynamic Label Updates](#11-dynamic-label-updates)
12. [Family Helpline Information](#12-family-helpline-information)
13. [Current Implementation Status](#13-current-implementation-status)

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
| `no` | No | Not Eligible Resources Page (not-eligible-resources.html) |

```
Step 1: Welcome & Terms
│
├─► terms_agreement = "yes" ────► Step 2b (Who Needs Help & Screening)
│
└─► terms_agreement = "no" ─────► Not Eligible Resources Page (exits form)
```

---

## 3. Step 2a - Self-Help Resources

**Step ID:** `data-step="2a"`

**Displayed When:** ~~User selects "No" to terms agreement~~ **DEPRECATED** - Users who select "No" are now redirected to [not-eligible-resources.html](../not-eligible-resources.html)

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
- Show Resources button → Displays selected resource topics (placeholder functionality)

```
Step 2a: Self-Help Resources
│
├─► Back ──────────────► Step 1 (Welcome)
│
└─► Show Resources ────► Display resources for selected topics
```

---

## 4. Step 2b - Who Needs Help & Screening

**Step ID:** `data-step="2b"`

**Displayed When:** User selects "Yes" to terms agreement

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

The screening questions container (`id="screening-questions-container"`) is hidden by default and displayed once an applicant type is selected.

#### 4.2.1 Parent Question (Caregivers Only)

**Element ID:** `parent-question-step2`
**Displayed When:** `applicant_type = "caregiver"`

**Question:** "Are you the parent of the child? (required)"

| Value | Label |
|-------|-------|
| `yes` | Yes |
| `no` | No |

#### 4.2.2 Foster Care Experience

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
- Phone: 844-888-5565
- Hours: Monday - Friday, 9:00 AM - 6:00 PM
- Provides free legal information about CPS issues
- All calls are anonymous
- Cannot provide court representation

#### 4.2.4 Violence/Abuse

**Question (Youth):** "Have you been the victim of family violence, child abuse, or sexual violence? (required)"
**Question (Caregiver):** "Have you or a child in your care been the victim of family violence, child abuse, or sexual violence? (required)"

| Value | Label |
|-------|-------|
| `yes` | Yes |
| `no` | No |

#### 4.2.5 Health Condition/Disability

**Question (Youth):** "Do you have a mental or physical health condition or disability? (required)"
**Question (Caregiver):** "Does the child have a mental or physical health condition or disability? (required)"

| Value | Label |
|-------|-------|
| `yes` | Yes |
| `no` | No |

### 4.3 Step 2b Navigation

```
Step 2b: Who Needs Help & Screening
│
├─► Back ──────────────► Step 1 (Welcome)
│
└─► Next ──────────────► Step 4 (Legal Issue Category)
    (requires all screening questions answered)
```

---

## 5. Step 4 - Legal Issue Category

**Step ID:** `data-step="4"`

**Displayed When:** User completes Step 2b screening questions

**Content:**
- Instruction to choose the category that best describes the legal issue
- Note to pick the most important issue if multiple apply
- Guidance to go back and try a different category if specific issue isn't found

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
- Continue button → Proceeds to Step 5 (Contact Information)

```
Step 4: Legal Issue Category
│
├─► Back ──────────────► Step 2b (Who Needs Help & Screening)
│
└─► Continue ──────────► Step 5 (Contact Information)
```

---

## 6. Step 5 - Contact Information

**Step ID:** `data-step="5"`

**Displayed When:** User completes Step 4 (Legal Issue Category selection)

**Content:**
- Explanation that this information will be used to connect them with legal resources
- Contact information form

**Form Fields:**
| Field | Name | Type | Required |
|-------|------|------|----------|
| First Name | `first_name` | text | Yes |
| Last Name | `last_name` | text | Yes |
| Email Address | `email` | email | Yes |
| Phone Number | `phone` | tel | Yes |
| Zip Code | `zip_code` | text (5 digits) | Yes |
| Description | `description` | textarea | No |

**Actions:**
- Back button → Returns to Step 4 (Legal Issue Category)
- Submit Application button → Validates form and proceeds to Step 6 (Thank You)

```
Step 5: Contact Information
│
├─► Back ──────────────► Step 4 (Legal Issue Category)
│
└─► Submit ────────────► Step 6 (Thank You)
```

---

## 7. Step 6 - Thank You

**Step ID:** `data-step="6"`

**Displayed When:** User successfully submits contact information in Step 5

**Content:**
- Success message with checkmark icon
- Confirmation that application was submitted
- Information about next steps (legal aid provider will contact within 2-3 business days)
- Family Helpline contact information for immediate assistance
- Return to Home button

**Actions:**
- Return to Home button → Redirects to `index.html`

```
Step 6: Thank You
│
└─► Return to Home ────► index.html
```

---

## 8. Complete Flow Diagram

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                           STEP 1 - WELCOME & TERMS                              │
│                    "Do you agree to these terms?"                               │
└─────────────────────────────────────────────────────────────────────────────────┘
                                        │
                         ┌──────────────┴──────────────┐
                         │                             │
                    YES  ▼                        NO   ▼
              ┌─────────────────┐            ┌─────────────────────┐
              │    STEP 2b      │            │  NOT ELIGIBLE       │
              │  Who Needs Help │            │  RESOURCES PAGE     │
              │  & Screening    │            │  (Exit Form)        │
              └────────┬────────┘            └─────────────────────┘
                       │
                       │
                       │
                       │
                       │
                       │
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
   │        STEP 4 - LEGAL ISSUE      │
   │          CATEGORY                │
   │   (Select from 10 categories)    │
   └──────────────┬───────────────────┘
                  │
                  ▼
   ┌──────────────────────────────────┐
   │    STEP 5 - CONTACT INFO         │
   │   (Name, Email, Phone, Zip)      │
   └──────────────┬───────────────────┘
                  │
                  ▼
   ┌──────────────────────────────────┐
   │      STEP 6 - THANK YOU          │
   │   Application Submitted          │
   └──────────────────────────────────┘
```

---

## 9. Radio Button Reference

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

### Step 4: Legal Issue Category
| Name | Values |
|------|--------|
| `legal_category` | consumer, education, employment, family, health, housing, income, individual-rights, juvenile, none |

### Step 5: Contact Information
| Name | Type |
|------|------|
| `first_name` | text |
| `last_name` | text |
| `email` | email |
| `phone` | tel |
| `zip_code` | text (5 digits) |
| `description` | textarea (optional) |

---

## 10. Self-Help Topics Reference

**Field Name:** `self_help_topics`
**Input Type:** Multi-select (`<select multiple>`)

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

## 11. Dynamic Label Updates

The form dynamically updates question labels based on the selected applicant type:

### Youth/Young Adult (applicant_type = "myself")
| Question | Label |
|----------|-------|
| Foster Care | "Have you had any experience in foster care?" |
| Violence | "Have you been the victim of family violence, child abuse, or sexual violence?" |
| Health | "Do you have a mental or physical health condition or disability?" |

### Caregiver (applicant_type = "caregiver")
| Question | Label |
|----------|-------|
| Foster Care | "Have you or the child in your care had any experience in foster care?" |
| Violence | "Have you or a child in your care been the victim of family violence, child abuse, or sexual violence?" |
| Health | "Does the child have a mental or physical health condition or disability?" |

---

## 12. Family Helpline Information

**Displayed When:** `cps_involved = "yes"`

**Phone:** 844-888-5565
**Hours:** Monday - Friday, 9:00 AM - 6:00 PM

**Services:**
- Speak with an experienced child welfare attorney about CPS issues in Texas
- Free legal information
- Resources and referrals
- All calls are anonymous

**Limitations:**
- Cannot represent clients in court
- Referrals will not be made through Family Help Link for privacy protection

---

## 13. Current Implementation Status

| Step | Status |
|------|--------|
| Step 1 - Welcome & Terms | Fully Implemented (redirects to not-eligible-resources.html when "No" is selected) |
| Step 2a - Self-Help Resources | Deprecated (users who select "No" are redirected to not-eligible-resources.html) |
| Step 2b - Who Needs Help & Screening | Fully Implemented |
| Step 3 - Screening Questions | Deprecated (kept for backward compatibility) |
| Step 4 - Legal Issue Category | Fully Implemented |
| Step 5 - Contact Information | Fully Implemented |
| Step 6 - Thank You | Fully Implemented |

---

*This document should be updated whenever the Family Help Link form logic changes.*
