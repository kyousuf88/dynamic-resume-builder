"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class ResumeBuilder {
    constructor() {
        var _a, _b, _c;
        this.educationCount = 0;
        this.workExperienceCount = 0;
        (_a = document.getElementById("add-education")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", this.addEducationField.bind(this));
        (_b = document.getElementById("add-work-experience")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", this.addWorkExperienceField.bind(this));
        (_c = document.getElementById("resume-form")) === null || _c === void 0 ? void 0 : _c.addEventListener("submit", this.generateResume.bind(this));
    }
    // Method to add an education field dynamically
    addEducationField() {
        this.educationCount++;
        const educationSection = document.getElementById("education-section");
        const newEducation = document.createElement("div");
        newEducation.innerHTML = `
            <label for="degree-${this.educationCount}">Degree:</label>
            <input type="text" id="degree-${this.educationCount}" required><br>
            <label for="institution-${this.educationCount}">Institution:</label>
            <input type="text" id="institution-${this.educationCount}" required><br>
            <label for="year-${this.educationCount}">Graduation Year:</label>
            <input type="text" id="year-${this.educationCount}" required><br>
        `;
        educationSection === null || educationSection === void 0 ? void 0 : educationSection.appendChild(newEducation);
    }
    // Method to add a work experience field dynamically
    addWorkExperienceField() {
        this.workExperienceCount++;
        const workExperienceSection = document.getElementById("work-experience-section");
        const newWorkExperience = document.createElement("div");
        newWorkExperience.innerHTML = `
            <label for="company-${this.workExperienceCount}">Company:</label>
            <input type="text" id="company-${this.workExperienceCount}" required><br>
            <label for="role-${this.workExperienceCount}">Role:</label>
            <input type="text" id="role-${this.workExperienceCount}" required><br>
            <label for="duration-${this.workExperienceCount}">Duration:</label>
            <input type="text" id="duration-${this.workExperienceCount}" required><br>
            <label for="description-${this.workExperienceCount}">Description:</label>
            <textarea id="description-${this.workExperienceCount}" required></textarea><br>
        `;
        workExperienceSection === null || workExperienceSection === void 0 ? void 0 : workExperienceSection.appendChild(newWorkExperience);
    }
    // Method to handle resume generation in a new window
    generateResume(event) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            event.preventDefault();
            // Collect personal info
            const personalInfo = {
                name: document.getElementById("name").value,
                email: document.getElementById("email").value,
                phone: document.getElementById("phone").value,
                photo: yield this.getBase64((_a = document.getElementById("photo").files) === null || _a === void 0 ? void 0 : _a[0])
            };
            // Collect education info
            const education = [];
            for (let i = 1; i <= this.educationCount; i++) {
                education.push({
                    degree: document.getElementById(`degree-${i}`).value,
                    institution: document.getElementById(`institution-${i}`).value,
                    year: document.getElementById(`year-${i}`).value,
                });
            }
            // Collect work experience info
            const workExperience = [];
            for (let i = 1; i <= this.workExperienceCount; i++) {
                workExperience.push({
                    company: document.getElementById(`company-${i}`).value,
                    role: document.getElementById(`role-${i}`).value,
                    duration: document.getElementById(`duration-${i}`).value,
                    description: document.getElementById(`description-${i}`).value,
                });
            }
            // Open a new window and generate the resume
            const newWindow = window.open("", "_blank");
            if (newWindow) {
                newWindow.document.write(`
                <html>
                <head>
                    <title>${personalInfo.name}'s Resume</title>
                    <style>
                        body {
                            font-family: 'Calibri', sans-serif;
                            padding: 30px;
                            line-height: 1.6;
                        }
                        h1 {
                            color: #007bff;
                            border-bottom: 2px solid #007bff;
                            padding-bottom: 5px;
                        }
                        .section-title {
                            color: #007bff;
                            font-size: 1.2em;
                            font-weight: bold;
                            margin-top: 20px;
                            border-bottom: 1px solid #007bff;
                            padding-bottom: 5px;
                        }
                        .profile-photo {
                            max-width: 150px;
                            border-radius: 50%;
                            margin-bottom: 20px;
                        }
                        .info {
                            margin-bottom: 15px;
                        }
                        .info p {
                            margin: 0;
                        }
                        .experience, .education {
                            margin-bottom: 20px;
                        }
                        hr {
                            border: 1px solid #007bff;
                            margin: 20px 0;
                        }
                    </style>
                </head>
                <body>
                    <h1>${personalInfo.name}</h1>
                    <img src="${personalInfo.photo}" alt="Profile Photo" class="profile-photo"><br>
                    <div class="section-title">Personal Information</div>
                    <div class="info">
                        <p><strong>Email:</strong> ${personalInfo.email}</p>
                        <p><strong>Phone:</strong> ${personalInfo.phone}</p>
                    </div>

                    <div class="section-title">Education</div>
                    <div class="education">
                        ${education.map(ed => `
                            <p><strong>${ed.degree}</strong>, ${ed.institution} (${ed.year})</p>
                        `).join('')}
                    </div>

                    <div class="section-title">Work Experience</div>
                    <div class="experience">
                        ${workExperience.map(we => `
                            <p><strong>${we.role}</strong> at ${we.company} (${we.duration})</p>
                            <p>${we.description}</p>
                        `).join('')}
                    </div>

                    <div class="section-title">Skills</div>
                    <div class="info">
                        <p>${document.getElementById("skills").value}</p>
                    </div>

                    <hr>
                    <footer>
                        <p>Generated by Professional Resume Builder</p>
                    </footer>
                </body>
                </html>
            `);
            }
        });
    }
    // Convert uploaded image to base64
    getBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            if (file) {
                reader.readAsDataURL(file);
                reader.onload = () => resolve(reader.result);
                reader.onerror = (error) => reject(error);
            }
            else {
                resolve("");
            }
        });
    }
}
new ResumeBuilder();
