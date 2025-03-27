// Listen for messages from the extension
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "autofillSkills") {
      // Find skills input fields
      const skillsInputs = [
        // Common input selectors for skills
        'textarea[name*="skills"]',
        'input[name*="skills"]',
        'textarea[id*="skills"]',
        'input[id*="skills"]',
        'textarea[placeholder*="skills"]',
        'input[placeholder*="skills"]'
      ];
  
      // Try each selector
      for (let selector of skillsInputs) {
        const skillsField = document.querySelector(selector);
        if (skillsField) {
          skillsField.value = request.skills;
          skillsField.dispatchEvent(new Event('input', { bubbles: true }));
          skillsField.dispatchEvent(new Event('change', { bubbles: true }));
          sendResponse({ success: true });
          return true;
        }
      }
      
      sendResponse({ success: false });
      return true;
    }
  });