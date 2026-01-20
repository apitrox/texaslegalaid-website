# Texas Legal Aid - Family Help Link Page Flow

**File:** `family-help-link.html`
**Last Updated:** 2026-01-20

This document provides a complete flow chart of all logic conditions in the Texas Family Help Link intake form. Questions and page names are abbreviated for readability but remain consistent throughout.

---

## Table of Contents

1. [Overview](#1-overview)
2. [Step 1 - Welcome & Terms Agreement](#2-step-1---welcome--terms-agreement)
3. [Step 2a - Self-Help Resources](#3-step-2a---self-help-resources)
4. [Step 2b - Who Needs Help & Screening](#4-step-2b---who-needs-help--screening)
5. [Step 3 - Screening Questions (Deprecated)](#5-step-3---screening-questions-deprecated)
6. [Step 4 - Legal Issue Category](#6-step-4---legal-issue-category)
7. [Complete Flow Diagram](#7-complete-flow-diagram)
8. [Radio Button Reference](#8-radio-button-reference)
9. [Self-Help Topics Reference](#9-self-help-topics-reference)
10. [Dynamic Label Updates](#10-dynamic-label-updates)
11. [Family Helpline Information](#11-family-helpline-information)
12. [Current Implementation Status](#12-current-implementation-status)

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

**Current Status:**
- Steps 1-4 are implemented
- Step 4 (Legal Issue Category) is the final step with a disabled Continue button
- No contact information collection or thank you page currently exists

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

## 3. Step 2a - Self-Help Resources

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
- Show Resources button → Displays alert with selected topics (placeholder functionality)

```
Step 2a: Self-Help Resources
│
├─► Back ──────────────► Step 1 (Welcome)
│
└─► Show Resources ────► Alert displaying selected topics
                         (Placeholder - full functionality not yet implemented)
```

**Implementation Note:**
The Show Resources functionality is currently a placeholder that displays an alert. In a future implementation, this will redirect to or display actual resources based on selected topics.

---

## 4. Step 2b - Who Needs Help & Screening

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

```
Step 2b: Who Needs Help & Screening
│
├─► Back ──────────────► Step 1 (Welcome)
│
└─► Next ──────────────► Step 4 (Legal Issue Category)
    (requires applicant type AND all screening questions answered)
```

---

## 5. Step 3 - Screening Questions (Deprecated)

**Step ID:** `data-step="3"`

**Status:** DEPRECATED - Kept for backward compatibility only

This step previously served as a separate screening questions page but has been deprecated in favor of embedding the screening questions directly into Step 2b. The step still exists in the HTML and JavaScript but is no longer part of the active user flow.

**Historical Content:**
- Displayed selected applicant type (read-only)
- Same screening questions as now shown in Step 2b
- Parent question for caregivers
- Foster care, CPS involvement, violence/abuse, and health condition questions
- Family Helpline info box (always shown, not conditional)

**Navigation (if accessed):**
```
Step 3: Screening Questions [DEPRECATED]
│
├─► Back ──────────────► Step 2b (Who Needs Help)
│
└─► Next ──────────────► Step 4 (Legal Issue Category)
```

**Implementation Notes:**
- JavaScript function `updateStep3Display()` handles this deprecated step
- Progress indicator maps this to "Step 3 of 4"
- Question labels update dynamically based on saved `applicant_type` value
- In normal flow, users skip directly from Step 2b to Step 4

---

## 6. Step 4 - Legal Issue Category

**Step ID:** `data-step="4"`

**Displayed When:** User completes Step 2b screening questions (or deprecated Step 3)

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
- Back button → Returns to Step 3 (Screening Questions - deprecated)
- Continue button → DISABLED with text "Continue (Coming Soon)"

```
Step 4: Legal Issue Category
│
├─► Back ──────────────► Step 3 (Screening Questions - Deprecated)
│
└─► Continue ──────────► DISABLED (Coming Soon)
                         No further steps currently implemented
```

**Implementation Status:**
This is currently the final step in the application flow. The Continue button is disabled and displays "Continue (Coming Soon)" text. Future implementation will likely include:
- Contact information collection
- Application submission
- Thank you / confirmation page

---

## 7. Complete Flow Diagram

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
   │        STEP 4 - LEGAL ISSUE      │
   │          CATEGORY                │
   │   (Select from 10 categories)    │
   │                                  │
   │   Continue Button: DISABLED      │
   │   "Continue (Coming Soon)"       │
   └──────────────────────────────────┘
                  │
                  ▼
          [ End of Form ]
      (Future steps not yet implemented)
```

**Note:** Step 3 (Screening Questions) is deprecated and not shown in the normal flow. Users proceed directly from Step 2b to Step 4.

---

## 8. Radio Button Reference

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

---

## 9. Self-Help Topics Reference

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

## 10. Dynamic Label Updates

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

## 11. Family Helpline Information

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

## 12. Current Implementation Status

| Step | Status | Notes |
|------|--------|-------|
| Step 1 - Welcome & Terms | ✅ Fully Implemented | Routes to Step 2a or Step 2b based on answer |
| Step 2a - Self-Help Resources | ⚠️ Partially Implemented | Active but "Show Resources" is placeholder functionality |
| Step 2b - Who Needs Help & Screening | ✅ Fully Implemented | Includes dynamic screening questions and CPS helpline integration |
| Step 3 - Screening Questions | ⚠️ Deprecated | Kept for backward compatibility, not used in normal flow |
| Step 4 - Legal Issue Category | ⚠️ Partially Implemented | Displayed but Continue button disabled; no further steps exist |

**Missing Components:**
- Contact information collection
- Form submission logic
- Thank you / confirmation page
- Resource display functionality for Step 2a
- Next step after legal category selection

**Future Enhancements:**
- Implement contact information step
- Add form submission to backend system
- Create thank you page with next steps information
- Implement actual resource display for self-help topics
- Enable Continue button on Step 4 and add subsequent steps

---

**Progress Indicator:** The form uses a progress tracking system that maps steps to numbered progression:
- Step 1 → Progress 1
- Steps 2a & 2b → Progress 2
- Step 3 → Progress 3
- Step 4 → Progress 4

**Screen Reader Support:** Step announcements are provided for accessibility:
- Step 1: "Step 1 of 4: Welcome"
- Step 2a: "Step 2 of 4: Self-Help Resources"
- Step 2b: "Step 2 of 4: Eligibility"
- Step 3: "Step 3 of 4: Screening Questions"
- Step 4: "Step 4 of 4: Legal Issue Category"

---

*This document should be updated whenever the Family Help Link form logic changes.*
