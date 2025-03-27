document.addEventListener("DOMContentLoaded", function () {
    // Function to add a new experience entry
    function addExperienceEntry(title = '', company = '', dates = '', description = '') {
        let experienceList = document.getElementById("experienceList");
        let entry = document.createElement("div");
        entry.classList.add("experience-entry");
        entry.innerHTML = `
            <div class="entry-content">
                <input type="text" class="title" placeholder="Job Title" value="${title}">
                <input type="text" class="company" placeholder="Company" value="${company}">
                <input type="text" class="dates" placeholder="Dates (e.g. Jan 2020 - Present)" value="${dates}">
                <textarea class="description" placeholder="Job Description">${description}</textarea>
            </div>
            <button class="remove-experience"> - Remove Experience</button>
        `;
        
        // Add remove button functionality
        entry.querySelector(".remove-experience").addEventListener("click", function() {
            experienceList.removeChild(entry);
        });

        experienceList.appendChild(entry);
    }

    // Function to add a new education entry
    function addEducationEntry(school = '', dates = '', degree = '', major = '') {
        let educationList = document.getElementById("educationList");
        let entry = document.createElement("div");
        entry.classList.add("education-entry");
        entry.innerHTML = `
            <div class="entry-content">
                <input type="text" class="school" placeholder="School Name" value="${school}">
                <input type="text" class="dates" placeholder="Graduation Dates" value="${dates}">
                <input type="text" class="degree" placeholder="Degree (e.g., Bachelor of Science)" value="${degree}">
                <input type="text" class="major" placeholder="Major" value="${major}">
            </div>
            <button class="remove-education"> - Remove Education</button>
        `;
        
        // Add remove button functionality
        entry.querySelector(".remove-education").addEventListener("click", function() {
            educationList.removeChild(entry);
        });

        educationList.appendChild(entry);
    }

    // Skills formatting function
    function formatSkills() {
        const skillsInput = document.getElementById("skills");
        let skills = skillsInput.value
            .split(',')
            .map(skill => skill.trim())
            .filter(skill => skill.length > 0)
            .join(', ');
        skillsInput.value = skills;
    }

    // Event Listeners
    // Add experience button event listener
    document.getElementById("addExperience").addEventListener("click", function () {
        addExperienceEntry();
    });

    // Add education button event listener
    document.getElementById("addEducation").addEventListener("click", function () {
        addEducationEntry();
    });

    // Skills input formatting
    document.getElementById("skills").addEventListener('input', formatSkills);

    // Save button event listener
    document.getElementById("save").addEventListener("click", function () {
        // Save personal info
        const personalFields = [
            "name", "email", "phone", 
            "linkedin", "portfolio", "skills"
        ];

        personalFields.forEach(field => {
            localStorage.setItem(field, document.getElementById(field).value);
        });

        // Save experience data
        let experience = [];
        document.querySelectorAll(".experience-entry").forEach(entry => {
            experience.push({
                title: entry.querySelector(".title").value,
                company: entry.querySelector(".company").value,
                dates: entry.querySelector(".dates").value,
                description: entry.querySelector(".description").value
            });
        });
        localStorage.setItem("experience", JSON.stringify(experience));

        // Save education data
        let education = [];
        document.querySelectorAll(".education-entry").forEach(entry => {
            education.push({
                school: entry.querySelector(".school").value,
                dates: entry.querySelector(".dates").value,
                degree: entry.querySelector(".degree").value,
                major: entry.querySelector(".major").value
            });
        });
        localStorage.setItem("education", JSON.stringify(education));

        alert("Information saved successfully!");
    });

    // Load saved personal info
    const personalFields = [
        "name", "email", "phone", 
        "linkedin", "portfolio", "skills"
    ];

    personalFields.forEach(field => {
        const value = localStorage.getItem(field) || "";
        document.getElementById(field).value = value;
    });

    // Load saved experience entries
    let savedExperience = JSON.parse(localStorage.getItem("experience")) || [];
    savedExperience.forEach(exp => {
        addExperienceEntry(exp.title, exp.company, exp.dates, exp.description);
    });

    // Load saved education entries
    let savedEducation = JSON.parse(localStorage.getItem("education")) || [];
    savedEducation.forEach(edu => {
        addEducationEntry(edu.school, edu.dates, edu.degree, edu.major);
    });
});