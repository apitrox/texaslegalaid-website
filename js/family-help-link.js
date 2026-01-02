/**
 * Texas Family Help Link - Multi-Step Form Logic
 * Handles conditional navigation, step progression, and form state management
 */

(function () {
  'use strict';

  // Form state
  let currentStep = 1;
  let formData = {};

  // DOM elements
  const form = document.getElementById('family-help-form');
  const progressSteps = document.querySelectorAll('[data-step-indicator]');
  const formSteps = document.querySelectorAll('.form-step');
  const stepAnnouncement = document.querySelector('.step-announcement');

  /**
   * Initialize the form
   */
  function init() {
    attachEventListeners();
    showStep(1);
  }

  /**
   * Attach event listeners to form controls
   */
  function attachEventListeners() {
    // Next button clicks
    const nextButtons = form.querySelectorAll('[data-step-next]');
    nextButtons.forEach(btn => {
      btn.addEventListener('click', handleNext);
    });

    // Back button clicks
    const backButtons = form.querySelectorAll('[data-step-back]');
    backButtons.forEach(btn => {
      btn.addEventListener('click', handleBack);
    });

    // Show resources button
    const showResourcesBtn = form.querySelector('[data-show-resources]');
    if (showResourcesBtn) {
      showResourcesBtn.addEventListener('click', handleShowResources);
    }

    // Listen for applicant type changes to show screening questions and update labels
    const applicantTypeInputs = form.querySelectorAll('input[name="applicant_type"]');
    applicantTypeInputs.forEach(input => {
      input.addEventListener('change', function() {
        showScreeningQuestions();
        updateScreeningLabelsStep2();
      });
    });
  }

  /**
   * Handle Next button click
   */
  function handleNext(e) {
    e.preventDefault();

    const currentStepElement = document.querySelector(`.form-step[data-step="${currentStep}"]`);
    if (!validateCurrentStep(currentStepElement)) {
      return;
    }

    // Save current step data
    saveStepData(currentStepElement);

    // Determine next step based on answers
    const nextStep = determineNextStep();

    if (nextStep) {
      currentStep = nextStep;
      showStep(nextStep);
    }
  }

  /**
   * Handle Back button click
   */
  function handleBack(e) {
    e.preventDefault();

    const previousStep = determinePreviousStep();

    if (previousStep) {
      currentStep = previousStep;
      showStep(previousStep);
    }
  }

  /**
   * Handle Show Resources button click
   */
  function handleShowResources(e) {
    e.preventDefault();

    const selectedTopics = Array.from(form.querySelectorAll('#self_help_topics option:checked'))
      .map(option => option.value);

    if (selectedTopics.length === 0) {
      alert('Please select at least one topic to view resources.');
      return;
    }

    // Store selected topics
    formData.self_help_topics = selectedTopics;

    // In a future implementation, this would show resources or redirect
    alert('Resource display functionality will be implemented in a future update.\n\nYou selected:\n' + selectedTopics.join('\n'));
  }

  /**
   * Validate current step
   */
  function validateCurrentStep(stepElement) {
    const requiredInputs = stepElement.querySelectorAll('[required]');
    let isValid = true;

    requiredInputs.forEach(input => {
      if (input.type === 'radio') {
        const radioGroup = stepElement.querySelectorAll(`input[name="${input.name}"]`);
        const isChecked = Array.from(radioGroup).some(radio => radio.checked);
        if (!isChecked) {
          isValid = false;
          // Highlight the question
          const questionContainer = input.closest('.bg-secondary-100, [class*="bg-"]');
          if (questionContainer) {
            questionContainer.classList.add('border-2', 'border-red-500');
            setTimeout(() => {
              questionContainer.classList.remove('border-2', 'border-red-500');
            }, 3000);
          }
        }
      } else if (input.type === 'checkbox') {
        // Handle checkbox validation if needed
      } else if (!input.value.trim()) {
        isValid = false;
        input.classList.add('border-red-500');
        setTimeout(() => {
          input.classList.remove('border-red-500');
        }, 3000);
      }
    });

    if (!isValid) {
      alert('Please answer all required questions before continuing.');
    }

    return isValid;
  }

  /**
   * Save data from current step
   */
  function saveStepData(stepElement) {
    const inputs = stepElement.querySelectorAll('input, select, textarea');

    inputs.forEach(input => {
      if (input.type === 'radio') {
        if (input.checked) {
          formData[input.name] = input.value;
        }
      } else if (input.type === 'checkbox') {
        if (!formData[input.name]) {
          formData[input.name] = [];
        }
        if (input.checked) {
          formData[input.name].push(input.value);
        }
      } else if (input.type === 'select-multiple') {
        formData[input.name] = Array.from(input.selectedOptions).map(opt => opt.value);
      } else {
        formData[input.name] = input.value;
      }
    });
  }

  /**
   * Determine next step based on current answers
   */
  function determineNextStep() {
    if (currentStep === 1) {
      // From Welcome page
      const termsAgreement = formData.terms_agreement;
      if (termsAgreement === 'yes') {
        return '2b'; // Go to "Who needs help" page (which now includes screening questions)
      } else if (termsAgreement === 'no') {
        return '2a'; // Go to "Self-help resources" page
      }
    } else if (currentStep === '2b') {
      // From "Who needs help" page (now includes screening questions)
      return '4'; // Go directly to legal issue category
    } else if (currentStep === '3') {
      // From screening questions (Step 3 is now deprecated but kept for backward compatibility)
      return '4'; // Go to legal issue category
    }

    return null;
  }

  /**
   * Determine previous step
   */
  function determinePreviousStep() {
    if (currentStep === '2a' || currentStep === '2b') {
      return 1; // Back to welcome
    } else if (currentStep === '3') {
      return '2b'; // Back to who needs help
    } else if (currentStep === '4') {
      return '3'; // Back to screening questions
    }

    return null;
  }

  /**
   * Show specific step
   */
  function showStep(stepNumber) {
    // Hide all steps
    formSteps.forEach(step => {
      step.style.display = 'none';
    });

    // Show current step
    const stepElement = document.querySelector(`.form-step[data-step="${stepNumber}"]`);
    if (stepElement) {
      stepElement.style.display = 'block';

      // Update progress indicator
      updateProgressIndicator(stepNumber);

      // Update screen reader announcement
      announceStep(stepNumber);

      // Scroll to top of form
      stepElement.scrollIntoView({ behavior: 'smooth', block: 'start' });

      // Special handling for step 3 (screening questions)
      if (stepNumber === '3') {
        updateStep3Display();
      }
    }
  }

  /**
   * Update progress indicator
   */
  function updateProgressIndicator(stepNumber) {
    // Map step IDs to progress numbers
    const stepMapping = {
      '1': 1,
      '2a': 2,
      '2b': 2,
      '3': 3,
      '4': 4
    };

    const progressNumber = stepMapping[stepNumber] || 1;

    progressSteps.forEach((step, index) => {
      const stepNum = index + 1;
      step.classList.remove('is-active', 'is-complete');

      if (stepNum < progressNumber) {
        step.classList.add('is-complete');
      } else if (stepNum === progressNumber) {
        step.classList.add('is-active');
      }
    });
  }

  /**
   * Announce step change for screen readers
   */
  function announceStep(stepNumber) {
    const stepNames = {
      '1': 'Step 1 of 4: Welcome',
      '2a': 'Step 2 of 4: Self-Help Resources',
      '2b': 'Step 2 of 4: Eligibility',
      '3': 'Step 3 of 4: Screening Questions',
      '4': 'Step 4 of 4: Legal Issue Category'
    };

    if (stepAnnouncement) {
      stepAnnouncement.textContent = stepNames[stepNumber] || '';
    }
  }

  /**
   * Update Step 3 display based on applicant type
   */
  function updateStep3Display() {
    const applicantType = formData.applicant_type;
    const parentQuestion = document.getElementById('parent-question');
    const selectedApplicantType = document.getElementById('selected-applicant-type');

    // Update displayed selection
    if (selectedApplicantType) {
      if (applicantType === 'myself') {
        selectedApplicantType.textContent = 'Myself (I am a youth or young adult under the age of 26 seeking legal assistance)';
      } else if (applicantType === 'caregiver') {
        selectedApplicantType.textContent = 'I am a caregiver applying on behalf of the wellbeing of a child';
      }
    }

    // Show/hide parent question based on applicant type
    if (parentQuestion) {
      if (applicantType === 'caregiver') {
        parentQuestion.style.display = 'block';
        // Make parent question required
        const parentInputs = parentQuestion.querySelectorAll('input[name="is_parent"]');
        parentInputs.forEach(input => input.required = true);
      } else {
        parentQuestion.style.display = 'none';
        // Make parent question not required
        const parentInputs = parentQuestion.querySelectorAll('input[name="is_parent"]');
        parentInputs.forEach(input => {
          input.required = false;
          input.checked = false;
        });
      }
    }

    // Update question labels based on applicant type
    updateScreeningLabels();
  }

  /**
   * Show screening questions in Step 2 when applicant type is selected
   */
  function showScreeningQuestions() {
    const applicantType = form.querySelector('input[name="applicant_type"]:checked')?.value;
    const screeningContainer = document.getElementById('screening-questions-container');
    const parentQuestionStep2 = document.getElementById('parent-question-step2');

    if (applicantType && screeningContainer) {
      // Show the screening questions container
      screeningContainer.style.display = 'block';

      // Show/hide parent question based on applicant type
      if (parentQuestionStep2) {
        if (applicantType === 'caregiver') {
          parentQuestionStep2.style.display = 'block';
          // Make parent question required
          const parentInputs = parentQuestionStep2.querySelectorAll('input[name="is_parent"]');
          parentInputs.forEach(input => input.required = true);
        } else {
          parentQuestionStep2.style.display = 'none';
          // Make parent question not required
          const parentInputs = parentQuestionStep2.querySelectorAll('input[name="is_parent"]');
          parentInputs.forEach(input => {
            input.required = false;
            input.checked = false;
          });
        }
      }

      // Scroll to the screening questions
      setTimeout(() => {
        screeningContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 100);
    }
  }

  /**
   * Update screening question labels in Step 2 based on applicant type
   */
  function updateScreeningLabelsStep2() {
    const applicantType = form.querySelector('input[name="applicant_type"]:checked')?.value;

    const fosterCareLabelStep2 = document.getElementById('foster-care-label-step2');
    const violenceLabelStep2 = document.getElementById('violence-label-step2');
    const healthLabelStep2 = document.getElementById('health-label-step2');

    if (applicantType === 'myself') {
      // Youth/young adult applying for themselves
      if (fosterCareLabelStep2) {
        fosterCareLabelStep2.textContent = 'Have you had any experience in foster care? (required)';
      }
      if (violenceLabelStep2) {
        violenceLabelStep2.textContent = 'Have you been the victim of family violence, child abuse, or sexual violence? (required)';
      }
      if (healthLabelStep2) {
        healthLabelStep2.textContent = 'Do you have a mental or physical health condition or disability? (required)';
      }
    } else if (applicantType === 'caregiver') {
      // Caregiver applying on behalf of child
      if (fosterCareLabelStep2) {
        fosterCareLabelStep2.textContent = 'Have you or the child in your care had any experience in foster care? (required)';
      }
      if (violenceLabelStep2) {
        violenceLabelStep2.textContent = 'Have you or a child in your care been the victim of family violence, child abuse, or sexual violence? (required)';
      }
      if (healthLabelStep2) {
        healthLabelStep2.textContent = 'Does the child have a mental or physical health condition or disability? (required)';
      }
    }
  }

  /**
   * Update screening question labels based on applicant type
   */
  function updateScreeningLabels() {
    const applicantType = formData.applicant_type || form.querySelector('input[name="applicant_type"]:checked')?.value;

    const fosterCareLabel = document.getElementById('foster-care-label');
    const violenceLabel = document.getElementById('violence-label');
    const healthLabel = document.getElementById('health-label');

    if (applicantType === 'myself') {
      // Youth/young adult applying for themselves
      if (fosterCareLabel) {
        fosterCareLabel.textContent = 'Have you had any experience in foster care? (required)';
      }
      if (violenceLabel) {
        violenceLabel.textContent = 'Have you been the victim of family violence, child abuse, or sexual violence? (required)';
      }
      if (healthLabel) {
        healthLabel.textContent = 'Do you have a mental or physical health condition or disability? (required)';
      }
    } else if (applicantType === 'caregiver') {
      // Caregiver applying on behalf of child
      if (fosterCareLabel) {
        fosterCareLabel.textContent = 'Have you or the child in your care had any experience in foster care? (required)';
      }
      if (violenceLabel) {
        violenceLabel.textContent = 'Have you or a child in your care been the victim of family violence, child abuse, or sexual violence? (required)';
      }
      if (healthLabel) {
        healthLabel.textContent = 'Does the child have a mental or physical health condition or disability? (required)';
      }
    }
  }

  // Initialize form when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
