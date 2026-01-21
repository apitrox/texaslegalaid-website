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
    setupFamilyMembersManagement();
    setupOpposingPartiesManagement();
    setupIncomeManagement();
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

    // Show CPS resources button
    const showCpsResourcesBtn = form.querySelector('[data-show-cps-resources]');
    if (showCpsResourcesBtn) {
      showCpsResourcesBtn.addEventListener('click', handleShowCpsResources);
    }

    // Submit button
    const submitBtn = document.getElementById('fhl-submit-btn');
    if (submitBtn) {
      submitBtn.addEventListener('click', handleSubmit);
    }

    // Listen for applicant type changes to show screening questions and update labels
    const applicantTypeInputs = form.querySelectorAll('input[name="applicant_type"]');
    applicantTypeInputs.forEach(input => {
      input.addEventListener('change', function() {
        showScreeningQuestions();
        updateScreeningLabelsStep2();
      });
    });

    // Listen for CPS question changes to show/hide Family Helpline
    const cpsInputs = form.querySelectorAll('input[name="cps_involved"]');
    cpsInputs.forEach(input => {
      input.addEventListener('change', function() {
        toggleFamilyHelpline();
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

    // Load and display resources, then navigate to resources step
    loadAndDisplayResources(selectedTopics);
    currentStep = '2a-resources';
    showStep('2a-resources');
  }

  /**
   * Handle Show CPS Resources button click
   */
  function handleShowCpsResources(e) {
    e.preventDefault();

    const selectedTopics = Array.from(form.querySelectorAll('#cps_self_help_topics option:checked'))
      .map(option => option.value);

    if (selectedTopics.length === 0) {
      alert('Please select at least one topic to view resources.');
      return;
    }

    // Store selected topics
    formData.cps_self_help_topics = selectedTopics;

    // Load and display resources for CPS path
    loadAndDisplayCpsResources(selectedTopics);
    currentStep = '4c-resources';
    showStep('4c-resources');
  }

  /**
   * Load resources from JSON and display them for CPS path
   */
  function loadAndDisplayCpsResources(selectedTopics) {
    const container = document.getElementById('cps-self-help-resources-container');
    if (!container) return;

    // Clear previous content
    container.innerHTML = '';

    // Fetch resources data
    fetch('data/family-help-link-resources.json')
      .then(response => response.json())
      .then(data => {
        const resources = data.resources;

        selectedTopics.forEach(topicKey => {
          const topicData = resources[topicKey];
          if (!topicData) return;

          const topicSection = document.createElement('div');
          topicSection.className = 'mb-8';

          // Topic title
          const title = document.createElement('h3');
          title.className = 'text-xl font-bold text-primary-700 mb-4 pb-2 border-b-2 border-primary-200';
          title.textContent = topicData.title;
          topicSection.appendChild(title);

          // Articles and Toolkits section
          if (topicData.articles && topicData.articles.length > 0) {
            const articlesSection = document.createElement('div');
            articlesSection.className = 'mb-4';

            const articlesTitle = document.createElement('h4');
            articlesTitle.className = 'text-lg font-semibold text-gray-800 mb-3';
            articlesTitle.textContent = 'Articles and Toolkits';
            articlesSection.appendChild(articlesTitle);

            const articlesList = document.createElement('ul');
            articlesList.className = 'space-y-2';

            topicData.articles.forEach(article => {
              const li = document.createElement('li');
              li.className = 'flex items-start gap-2';

              const bullet = document.createElement('span');
              bullet.className = 'text-primary-600 mt-1';
              bullet.innerHTML = '&#8226;';

              const link = document.createElement('a');
              link.href = article.url;
              link.target = '_blank';
              link.rel = 'noopener noreferrer';
              link.className = 'text-primary-600 hover:text-primary-800 hover:underline';
              link.textContent = article.text;

              li.appendChild(bullet);
              li.appendChild(link);
              articlesList.appendChild(li);
            });

            articlesSection.appendChild(articlesList);
            topicSection.appendChild(articlesSection);
          }

          // Resources section
          if (topicData.resources && topicData.resources.length > 0) {
            const resourcesSection = document.createElement('div');
            resourcesSection.className = 'mb-4';

            const resourcesTitle = document.createElement('h4');
            resourcesTitle.className = 'text-lg font-semibold text-gray-800 mb-3';
            resourcesTitle.textContent = 'Resources';
            resourcesSection.appendChild(resourcesTitle);

            const resourcesList = document.createElement('ul');
            resourcesList.className = 'space-y-2';

            topicData.resources.forEach(resource => {
              const li = document.createElement('li');
              li.className = 'flex items-start gap-2';

              const bullet = document.createElement('span');
              bullet.className = 'text-primary-600 mt-1';
              bullet.innerHTML = '&#8226;';

              const link = document.createElement('a');
              link.href = resource.url;
              link.target = '_blank';
              link.rel = 'noopener noreferrer';
              link.className = 'text-primary-600 hover:text-primary-800 hover:underline';
              link.textContent = resource.text;

              li.appendChild(bullet);
              li.appendChild(link);
              resourcesList.appendChild(li);
            });

            resourcesSection.appendChild(resourcesList);
            topicSection.appendChild(resourcesSection);
          }

          container.appendChild(topicSection);
        });
      })
      .catch(error => {
        console.error('Error loading resources:', error);
        container.innerHTML = '<p class="text-red-600">Error loading resources. Please try again.</p>';
      });
  }

  /**
   * Load resources from JSON and display them
   */
  function loadAndDisplayResources(selectedTopics) {
    const container = document.getElementById('self-help-resources-container');
    if (!container) return;

    // Clear previous content
    container.innerHTML = '';

    // Fetch resources data
    fetch('data/family-help-link-resources.json')
      .then(response => response.json())
      .then(data => {
        const resources = data.resources;

        selectedTopics.forEach(topicKey => {
          const topicData = resources[topicKey];
          if (!topicData) return;

          const topicSection = document.createElement('div');
          topicSection.className = 'mb-8';

          // Topic title
          const title = document.createElement('h3');
          title.className = 'text-xl font-bold text-primary-700 mb-4 pb-2 border-b-2 border-primary-200';
          title.textContent = topicData.title;
          topicSection.appendChild(title);

          // Articles and Toolkits section
          if (topicData.articles && topicData.articles.length > 0) {
            const articlesSection = document.createElement('div');
            articlesSection.className = 'mb-4';

            const articlesTitle = document.createElement('h4');
            articlesTitle.className = 'text-lg font-semibold text-gray-800 mb-3';
            articlesTitle.textContent = 'Articles and Toolkits';
            articlesSection.appendChild(articlesTitle);

            const articlesList = document.createElement('ul');
            articlesList.className = 'space-y-2';

            topicData.articles.forEach(article => {
              const li = document.createElement('li');
              li.className = 'flex items-start gap-2';

              const bullet = document.createElement('span');
              bullet.className = 'text-primary-600 mt-1';
              bullet.innerHTML = '&#8226;';

              const link = document.createElement('a');
              link.href = article.url;
              link.target = '_blank';
              link.rel = 'noopener noreferrer';
              link.className = 'text-primary-600 hover:text-primary-800 hover:underline';
              link.textContent = article.text;

              li.appendChild(bullet);
              li.appendChild(link);
              articlesList.appendChild(li);
            });

            articlesSection.appendChild(articlesList);
            topicSection.appendChild(articlesSection);
          }

          // Resources section
          if (topicData.resources && topicData.resources.length > 0) {
            const resourcesSection = document.createElement('div');
            resourcesSection.className = 'mb-4';

            const resourcesTitle = document.createElement('h4');
            resourcesTitle.className = 'text-lg font-semibold text-gray-800 mb-3';
            resourcesTitle.textContent = 'Resources';
            resourcesSection.appendChild(resourcesTitle);

            const resourcesList = document.createElement('ul');
            resourcesList.className = 'space-y-2';

            topicData.resources.forEach(resource => {
              const li = document.createElement('li');
              li.className = 'flex items-start gap-2';

              const bullet = document.createElement('span');
              bullet.className = 'text-primary-600 mt-1';
              bullet.innerHTML = '&#8226;';

              const link = document.createElement('a');
              link.href = resource.url;
              link.target = '_blank';
              link.rel = 'noopener noreferrer';
              link.className = 'text-primary-600 hover:text-primary-800 hover:underline';
              link.textContent = resource.text;

              li.appendChild(bullet);
              li.appendChild(link);
              resourcesList.appendChild(li);
            });

            resourcesSection.appendChild(resourcesList);
            topicSection.appendChild(resourcesSection);
          }

          container.appendChild(topicSection);
        });
      })
      .catch(error => {
        console.error('Error loading resources:', error);
        container.innerHTML = '<p class="text-red-600">Error loading resources. Please try again.</p>';
      });
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
   * Restore data to current step from saved formData
   */
  function restoreStepData(stepElement) {
    const inputs = stepElement.querySelectorAll('input, select, textarea');

    inputs.forEach(input => {
      const savedValue = formData[input.name];

      if (savedValue === undefined || savedValue === null) {
        return; // No saved data for this field
      }

      if (input.type === 'radio') {
        // Check radio button if its value matches saved value
        if (input.value === savedValue) {
          input.checked = true;
        }
      } else if (input.type === 'checkbox') {
        // Check checkbox if its value is in the saved array
        if (Array.isArray(savedValue) && savedValue.includes(input.value)) {
          input.checked = true;
        }
      } else if (input.tagName === 'SELECT' && input.multiple) {
        // Select multiple options
        if (Array.isArray(savedValue)) {
          Array.from(input.options).forEach(option => {
            option.selected = savedValue.includes(option.value);
          });
        }
      } else {
        // Text, textarea, select (single)
        input.value = savedValue;
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

      // Check eligibility for youth applicants
      if (formData.applicant_type === 'myself' &&
          formData.foster_care === 'no' &&
          formData.cps_involved === 'no' &&
          formData.violence_victim === 'no' &&
          formData.health_condition === 'no') {
        // Youth with no qualifying risk factors - redirect to resources
        window.location.href = 'not-eligible-resources.html';
        return null;
      }

      return '4'; // Go directly to legal issue category
    } else if (currentStep === '3') {
      // From screening questions (Step 3 is now deprecated but kept for backward compatibility)
      return '4'; // Go to legal issue category
    } else if (currentStep === '4') {
      // From Legal Issue Category
      const legalCategory = formData.legal_category;
      if (legalCategory === 'family') {
        return '4a'; // Go to Family sub-problems
      }
      return '5'; // Go to Your Name for non-family categories
    } else if (currentStep === '4a') {
      // From Family sub-problems
      const familyProblem = formData.family_problem;
      if (familyProblem === 'cps-foster') {
        return '4b'; // Go to CPS narrowing
      }
      return '5'; // Go to Your Name for other family problems
    } else if (currentStep === '4b') {
      // From CPS narrowing - always go to self-help resources
      return '4c'; // Go to self-help topic selection for CPS
    } else if (currentStep === '4c') {
      // Handled by handleShowCpsResources
      return '4c-resources';
    } else if (currentStep === '4c-resources') {
      // Terminal step for CPS path
      return null;
    } else if (currentStep === '5') {
      // From Your Name
      return '6'; // Go to Family Members
    } else if (currentStep === '6') {
      // From Family Members
      return '7'; // Go to Opposing Parties
    } else if (currentStep === '7') {
      // From Opposing Parties
      return '8'; // Go to County
    } else if (currentStep === '8') {
      // From County
      return '9'; // Go to Household Income
    } else if (currentStep === '9') {
      // From Household Income
      return '10'; // Go to Contact Information
    } else if (currentStep === '10') {
      // From Contact Information
      return 'thank-you'; // Go to No Matching Organizations page
    }

    return null;
  }

  /**
   * Determine previous step
   */
  function determinePreviousStep() {
    if (currentStep === '2a' || currentStep === '2b') {
      return 1; // Back to welcome
    } else if (currentStep === '2a-resources') {
      return '2a'; // Back to self-help topic selection
    } else if (currentStep === '3') {
      return '2b'; // Back to who needs help
    } else if (currentStep === '4') {
      return '2b'; // Back to who needs help (skip deprecated Step 3)
    } else if (currentStep === '4a') {
      return '4'; // Back to legal issue category
    } else if (currentStep === '4b') {
      return '4a'; // Back to family sub-problems
    } else if (currentStep === '4c') {
      return '4b'; // Back to CPS narrowing
    } else if (currentStep === '4c-resources') {
      return '4c'; // Back to CPS self-help topic selection
    } else if (currentStep === '5') {
      // Check if we came from family sub-problems path
      if (formData.legal_category === 'family' && formData.family_problem && formData.family_problem !== 'cps-foster') {
        return '4a'; // Back to family sub-problems
      }
      return '4'; // Back to legal issue category
    } else if (currentStep === '6') {
      return '5'; // Back to your name
    } else if (currentStep === '7') {
      return '6'; // Back to family members
    } else if (currentStep === '8') {
      return '7'; // Back to opposing parties
    } else if (currentStep === '9') {
      return '8'; // Back to county
    } else if (currentStep === '10') {
      return '9'; // Back to household income
    } else if (currentStep === 'thank-you') {
      return '10'; // Back to contact information
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

      // Restore form selections from saved data
      restoreStepData(stepElement);

      // Scroll to top of form
      stepElement.scrollIntoView({ behavior: 'smooth', block: 'start' });

      // Special handling for step 2b (who needs help with screening questions)
      if (stepNumber === '2b') {
        // Restore screening questions visibility and parent question
        const applicantType = formData.applicant_type;
        if (applicantType) {
          showScreeningQuestions();
          updateScreeningLabelsStep2();
        }
        // Restore Family Helpline visibility based on saved CPS answer
        toggleFamilyHelpline();
      }

      // Special handling for step 3 (screening questions - deprecated but kept for compatibility)
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
      '2a-resources': 2,
      '2b': 2,
      '3': 3,
      '4': 3,
      '4a': 3,
      '4b': 3,
      '4c': 3,
      '4c-resources': 3,
      '5': 4,
      '6': 4,
      '7': 4,
      '8': 4,
      '9': 4,
      '10': 4,
      'thank-you': 5
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
      '1': 'Step 1 of 5: Welcome',
      '2a': 'Step 2 of 5: Self-Help Topic Selection',
      '2a-resources': 'Step 2 of 5: Self-Help Resources',
      '2b': 'Step 2 of 5: Eligibility',
      '3': 'Step 3 of 5: Screening Questions',
      '4': 'Step 3 of 5: Legal Issue Category',
      '4a': 'Step 3 of 5: Family Legal Problems',
      '4b': 'Step 3 of 5: CPS Legal Issues',
      '4c': 'Step 3 of 5: Self-Help Topic Selection',
      '4c-resources': 'Step 3 of 5: Self-Help Resources',
      '5': 'Step 4 of 5: Your Name',
      '6': 'Step 4 of 5: Family Members',
      '7': 'Step 4 of 5: Opposing Parties',
      '8': 'Step 4 of 5: County',
      '9': 'Step 4 of 5: Household Income',
      '10': 'Step 4 of 5: Contact Information',
      'thank-you': 'No Matching Organizations Found'
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

  /**
   * Toggle Family Helpline visibility based on CPS question answer
   */
  function toggleFamilyHelpline() {
    const cpsAnswer = form.querySelector('input[name="cps_involved"]:checked')?.value;
    const helplineBox = document.getElementById('family-helpline-box');

    if (helplineBox) {
      if (cpsAnswer === 'yes') {
        helplineBox.style.display = 'block';
        // Scroll to the helpline box
        setTimeout(() => {
          helplineBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 100);
      } else {
        helplineBox.style.display = 'none';
      }
    }
  }

  /**
   * Family Members Management
   */
  let familyMembers = [];
  let currentFamilyMemberIndex = -1;

  function setupFamilyMembersManagement() {
    const addBtn = document.getElementById('add-family-member-btn');
    const saveBtn = document.getElementById('save-family-member-btn');
    const removeBtn = document.getElementById('remove-family-member-btn');
    const familyMemberForm = document.getElementById('family-member-form');

    if (addBtn) {
      addBtn.addEventListener('click', () => {
        currentFamilyMemberIndex = -1;
        clearFamilyMemberForm();
        familyMemberForm.style.display = 'block';
      });
    }

    if (saveBtn) {
      saveBtn.addEventListener('click', saveFamilyMember);
    }

    if (removeBtn) {
      removeBtn.addEventListener('click', () => {
        familyMemberForm.style.display = 'none';
        currentFamilyMemberIndex = -1;
        clearFamilyMemberForm();
      });
    }
  }

  function saveFamilyMember() {
    const firstName = document.getElementById('fm_first_name').value.trim();
    const lastName = document.getElementById('fm_last_name').value.trim();
    const dob = document.getElementById('fm_dob').value;
    const relationship = document.querySelector('input[name="fm_relationship"]:checked')?.value;

    if (!firstName || !lastName || !relationship) {
      alert('Please fill in the required fields (First Name, Last Name, and Relationship Type).');
      return;
    }

    const member = { firstName, lastName, dob, relationship };

    if (currentFamilyMemberIndex >= 0) {
      familyMembers[currentFamilyMemberIndex] = member;
    } else {
      familyMembers.push(member);
    }

    renderFamilyMembersList();
    document.getElementById('family-member-form').style.display = 'none';
    clearFamilyMemberForm();
    currentFamilyMemberIndex = -1;
    formData.family_members = familyMembers;
  }

  function renderFamilyMembersList() {
    const list = document.getElementById('family-members-list');
    if (!list) return;

    list.innerHTML = familyMembers.map((member, index) => `
      <div class="bg-white border border-gray-200 rounded-lg p-4 flex justify-between items-center">
        <div>
          <p class="font-semibold text-primary-700">${member.firstName} ${member.lastName} ${member.dob ? '(' + member.dob + ')' : ''}</p>
          <p class="text-sm text-gray-600">Relationship: ${member.relationship}</p>
        </div>
        <button type="button" class="text-primary-600 hover:text-primary-800 text-sm font-semibold" onclick="editFamilyMember(${index})">
          Edit
        </button>
      </div>
    `).join('');
  }

  window.editFamilyMember = function(index) {
    currentFamilyMemberIndex = index;
    const member = familyMembers[index];
    document.getElementById('fm_first_name').value = member.firstName;
    document.getElementById('fm_last_name').value = member.lastName;
    document.getElementById('fm_dob').value = member.dob || '';
    const relationshipRadio = document.querySelector(`input[name="fm_relationship"][value="${member.relationship}"]`);
    if (relationshipRadio) relationshipRadio.checked = true;
    document.getElementById('family-member-form').style.display = 'block';
  };

  function clearFamilyMemberForm() {
    document.getElementById('fm_first_name').value = '';
    document.getElementById('fm_last_name').value = '';
    document.getElementById('fm_dob').value = '';
    const relationshipRadios = document.querySelectorAll('input[name="fm_relationship"]');
    relationshipRadios.forEach(radio => radio.checked = false);
  }

  /**
   * Opposing Parties Management
   */
  let opposingParties = [];
  let currentOpposingPartyIndex = -1;

  function setupOpposingPartiesManagement() {
    const addBtn = document.getElementById('add-opposing-party-btn');
    const saveBtn = document.getElementById('save-opposing-party-btn');
    const removeBtn = document.getElementById('remove-opposing-party-btn');
    const opposingPartyForm = document.getElementById('opposing-party-form');

    if (addBtn) {
      addBtn.addEventListener('click', () => {
        currentOpposingPartyIndex = -1;
        clearOpposingPartyForm();
        opposingPartyForm.style.display = 'block';
      });
    }

    if (saveBtn) {
      saveBtn.addEventListener('click', saveOpposingParty);
    }

    if (removeBtn) {
      removeBtn.addEventListener('click', () => {
        opposingPartyForm.style.display = 'none';
        currentOpposingPartyIndex = -1;
        clearOpposingPartyForm();
      });
    }
  }

  function saveOpposingParty() {
    const type = document.querySelector('input[name="op_type"]:checked')?.value;
    const firstName = document.getElementById('op_first_name').value.trim();
    const middleName = document.getElementById('op_middle_name').value.trim();
    const lastName = document.getElementById('op_last_name').value.trim();
    const dob = document.getElementById('op_dob').value;
    const relationship = document.querySelector('input[name="op_relationship"]:checked')?.value;

    if (!type || !firstName || !lastName || !relationship) {
      alert('Please fill in the required fields (Party Type, First Name, Last Name, and Relationship Type).');
      return;
    }

    const party = { type, firstName, middleName, lastName, dob, relationship };

    if (currentOpposingPartyIndex >= 0) {
      opposingParties[currentOpposingPartyIndex] = party;
    } else {
      opposingParties.push(party);
    }

    renderOpposingPartiesList();
    document.getElementById('opposing-party-form').style.display = 'none';
    clearOpposingPartyForm();
    currentOpposingPartyIndex = -1;
    formData.opposing_parties = opposingParties;
  }

  function renderOpposingPartiesList() {
    const list = document.getElementById('opposing-parties-list');
    if (!list) return;

    list.innerHTML = opposingParties.map((party, index) => `
      <div class="bg-white border border-gray-200 rounded-lg p-4 flex justify-between items-center">
        <div>
          <p class="font-semibold text-primary-700">${party.firstName} ${party.middleName} ${party.lastName} ${party.dob ? '(' + party.dob + ')' : ''}</p>
          <p class="text-sm text-gray-600">Type: ${party.type} | Relationship: ${party.relationship}</p>
        </div>
        <button type="button" class="text-primary-600 hover:text-primary-800 text-sm font-semibold" onclick="editOpposingParty(${index})">
          Edit
        </button>
      </div>
    `).join('');
  }

  window.editOpposingParty = function(index) {
    currentOpposingPartyIndex = index;
    const party = opposingParties[index];
    const typeRadio = document.querySelector(`input[name="op_type"][value="${party.type}"]`);
    if (typeRadio) typeRadio.checked = true;
    document.getElementById('op_first_name').value = party.firstName;
    document.getElementById('op_middle_name').value = party.middleName || '';
    document.getElementById('op_last_name').value = party.lastName;
    document.getElementById('op_dob').value = party.dob || '';
    const relationshipRadio = document.querySelector(`input[name="op_relationship"][value="${party.relationship}"]`);
    if (relationshipRadio) relationshipRadio.checked = true;
    document.getElementById('opposing-party-form').style.display = 'block';
  };

  function clearOpposingPartyForm() {
    const typeRadios = document.querySelectorAll('input[name="op_type"]');
    typeRadios.forEach(radio => radio.checked = false);
    document.getElementById('op_first_name').value = '';
    document.getElementById('op_middle_name').value = '';
    document.getElementById('op_last_name').value = '';
    document.getElementById('op_dob').value = '';
    const relationshipRadios = document.querySelectorAll('input[name="op_relationship"]');
    relationshipRadios.forEach(radio => radio.checked = false);
  }

  /**
   * Income Management
   */
  let incomeSources = [];
  let currentIncomeIndex = -1;

  function setupIncomeManagement() {
    const addBtn = document.getElementById('add-income-btn');
    const saveBtn = document.getElementById('save-income-btn');
    const removeBtn = document.getElementById('remove-income-btn');
    const incomeForm = document.getElementById('income-form');

    if (addBtn) {
      addBtn.addEventListener('click', () => {
        currentIncomeIndex = -1;
        clearIncomeForm();
        populateFamilyMemberSelect();
        incomeForm.style.display = 'block';
      });
    }

    if (saveBtn) {
      saveBtn.addEventListener('click', saveIncome);
    }

    if (removeBtn) {
      removeBtn.addEventListener('click', () => {
        incomeForm.style.display = 'none';
        currentIncomeIndex = -1;
        clearIncomeForm();
      });
    }
  }

  function populateFamilyMemberSelect() {
    const list = document.getElementById('income-family-member-list');
    if (!list) return;

    const applicantName = `${formData.applicant_first_name || 'Applicant'} ${formData.applicant_last_name || ''}`.trim();

    let html = `
      <label class="flex items-center gap-3 p-3 border border-gray-200 rounded hover:border-primary-500 cursor-pointer">
        <input type="radio" name="income_family_member" value="applicant" class="form-radio text-primary-600">
        <span class="text-base">${applicantName}</span>
      </label>
    `;

    familyMembers.forEach((member, index) => {
      html += `
        <label class="flex items-center gap-3 p-3 border border-gray-200 rounded hover:border-primary-500 cursor-pointer">
          <input type="radio" name="income_family_member" value="fm_${index}" class="form-radio text-primary-600">
          <span class="text-base">${member.firstName} ${member.lastName}</span>
        </label>
      `;
    });

    list.innerHTML = html;
  }

  function saveIncome() {
    const type = document.getElementById('income_type').value;
    const frequency = document.querySelector('input[name="income_frequency"]:checked')?.value;
    const familyMember = document.querySelector('input[name="income_family_member"]:checked')?.value;
    const amount = document.getElementById('income_amount').value;
    const note = document.getElementById('income_note').value.trim();

    if (!type || !frequency || !familyMember || !amount) {
      alert('Please fill in the required fields (Income Type, Frequency, Family Member, and Amount).');
      return;
    }

    const income = { type, frequency, familyMember, amount: parseFloat(amount), note };

    if (currentIncomeIndex >= 0) {
      incomeSources[currentIncomeIndex] = income;
    } else {
      incomeSources.push(income);
    }

    renderIncomeList();
    document.getElementById('income-form').style.display = 'none';
    clearIncomeForm();
    currentIncomeIndex = -1;
    formData.income_sources = incomeSources;
  }

  function renderIncomeList() {
    const list = document.getElementById('income-list');
    if (!list) return;

    list.innerHTML = incomeSources.map((income, index) => `
      <div class="bg-white border border-gray-200 rounded-lg p-4 flex justify-between items-center">
        <div>
          <p class="font-semibold text-primary-700">${income.type} - $${income.amount.toFixed(2)} (${income.frequency})</p>
          <p class="text-sm text-gray-600">Family Member: ${income.familyMember}</p>
          ${income.note ? `<p class="text-sm text-gray-500 italic">${income.note}</p>` : ''}
        </div>
        <button type="button" class="text-primary-600 hover:text-primary-800 text-sm font-semibold" onclick="editIncome(${index})">
          Edit
        </button>
      </div>
    `).join('');
  }

  window.editIncome = function(index) {
    currentIncomeIndex = index;
    const income = incomeSources[index];
    document.getElementById('income_type').value = income.type;
    const frequencyRadio = document.querySelector(`input[name="income_frequency"][value="${income.frequency}"]`);
    if (frequencyRadio) frequencyRadio.checked = true;
    populateFamilyMemberSelect();
    setTimeout(() => {
      const memberRadio = document.querySelector(`input[name="income_family_member"][value="${income.familyMember}"]`);
      if (memberRadio) memberRadio.checked = true;
    }, 100);
    document.getElementById('income_amount').value = income.amount;
    document.getElementById('income_note').value = income.note || '';
    document.getElementById('income-form').style.display = 'block';
  };

  function clearIncomeForm() {
    document.getElementById('income_type').value = '';
    const frequencyRadios = document.querySelectorAll('input[name="income_frequency"]');
    frequencyRadios.forEach(radio => radio.checked = false);
    const memberRadios = document.querySelectorAll('input[name="income_family_member"]');
    memberRadios.forEach(radio => radio.checked = false);
    document.getElementById('income_amount').value = '';
    document.getElementById('income_note').value = '';
  }

  /**
   * Handle Submit button click (from Step 10)
   */
  function handleSubmit(e) {
    e.preventDefault();

    // Save final data
    const currentStepElement = document.querySelector(`.form-step[data-step="${currentStep}"]`);
    saveStepData(currentStepElement);

    // In a production environment, this would submit to a backend API
    console.log('Form submitted with data:', formData);

    // Show no matching organizations page
    currentStep = 'thank-you';
    showStep('thank-you');
  }

  // Initialize form when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
