document.addEventListener("DOMContentLoaded", function () {
    // Function to create copy buttons with functionality
    function setupCopyButton(elementId) {
        const copyElement = document.getElementById(elementId);
        const copyButton = copyElement.nextElementSibling;
        
        // Set initial text
        const storedValue = localStorage.getItem(elementId.replace('Copy', '')) || `No ${elementId.replace('Copy', '')} Saved`;
        copyElement.textContent = storedValue;
        
        // Add copy functionality
        copyButton.addEventListener("click", function() {
            const textToCopy = copyElement.textContent;
            navigator.clipboard.writeText(textToCopy).then(() => {
                copyButton.textContent = "✔"; // Indicate copied
                setTimeout(() => (copyButton.textContent = "📋"), 1000);
            }).catch(err => console.error("Copy failed:", err));
        });
    }

    // New Autofill Skills Button
    const autofillSkillsBtn = document.createElement('button');
    autofillSkillsBtn.textContent = ' Autofill Skills';
    autofillSkillsBtn.style.marginTop = '10px';
    autofillSkillsBtn.addEventListener('click', function() {
        const skills = localStorage.getItem('skills') || '';
        
        // Send message to content script
        chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {
                action: "autofillSkills", 
                skills: skills
            }, function(response) {
                if (response && response.success) {
                    autofillSkillsBtn.textContent = ' Skills Filled!';
                    setTimeout(() => {
                        autofillSkillsBtn.textContent = ' Autofill Skills';
                    }, 2000);
                } else {
                    autofillSkillsBtn.textContent = ' Could not find skills field';
                    setTimeout(() => {
                        autofillSkillsBtn.textContent = ' Autofill Skills';
                    }, 2000);
                }
            });
        });
    });

    // Add the autofill button to the popup
    document.body.appendChild(autofillSkillsBtn);

    // Setup copy buttons for personal info
    const personalInfoIds = [
        "nameCopy", 
        "emailCopy", 
        "phoneCopy",
        "locationCopy",
        "linkedinCopy", 
        "portfolioCopy", 
        "skillsCopy"
    ];
    personalInfoIds.forEach(setupCopyButton);

    // Load and display experience
    let experienceList = document.getElementById("experienceList");
    experienceList.innerHTML = ""; // Clear previous entries
    let savedExperience = JSON.parse(localStorage.getItem("experience")) || [];

    savedExperience.forEach((exp, index) => {
        let div = document.createElement("div");
        div.classList.add("experience-entry");
        div.innerHTML = `
            <div><strong>${exp.title}</strong></div>
            <div>Title: <span class="copy-text">${exp.title || "No Title"}</span> <button class="copy-btn">📋</button></div>
            <div>Company: <span class="copy-text">${exp.company || "No Company"}</span> <button class="copy-btn">📋</button></div>
            <div>Location: <span class="copy-text">${exp.location || "No Location"}</span> <button class="copy-btn">📋</button></div>
            <div>Dates: <span class="copy-text">${exp.dates || "No Dates"}</span> <button class="copy-btn">📋</button></div>
            <div>Description: <span class="copy-text">${exp.description || "No Description"}</span> <button class="copy-btn">📋</button></div>
            <hr>
        `;
        experienceList.appendChild(div);

        // Add copy functionality to experience entry buttons
        div.querySelectorAll(".copy-btn").forEach(button => {
            button.addEventListener("click", function () {
                let text = this.previousElementSibling.textContent.trim();
                navigator.clipboard.writeText(text).then(() => {
                    this.textContent = "✔"; // Indicate copied
                    setTimeout(() => (this.textContent = "📋"), 1000);
                }).catch(err => console.error("Copy failed:", err));
            });
        });
    });

    // Load and display education
    let educationList = document.getElementById("educationList");
    educationList.innerHTML = ""; // Clear previous entries
    let savedEducation = JSON.parse(localStorage.getItem("education")) || [];

    savedEducation.forEach((edu, index) => {
        let div = document.createElement("div");
        div.classList.add("education-entry");
        div.innerHTML = `
            <div><strong>${edu.school}</strong></div>
            <div>School: <span class="copy-text">${edu.school || "No School"}</span> <button class="copy-btn">📋</button></div>
            <div>Dates: <span class="copy-text">${edu.dates || "No Dates"}</span> <button class="copy-btn">📋</button></div>
            <div>Degree: <span class="copy-text">${edu.degree|| "No Degree"}</span> <button class="copy-btn">📋</button></div>
            <div>Major: <span class="copy-text">${edu.major || "No Major"}</span> <button class="copy-btn">📋</button></div>
           <hr>
        `;
        educationList.appendChild(div);

        // Add copy functionality to experience entry buttons
        div.querySelectorAll(".copy-btn").forEach(button => {
            button.addEventListener("click", function () {
                let text = this.previousElementSibling.textContent.trim();
                navigator.clipboard.writeText(text).then(() => {
                    this.textContent = "✔"; // Indicate copied
                    setTimeout(() => (this.textContent = "📋"), 1000);
                }).catch(err => console.error("Copy failed:", err));
            });
        });
    });
});
