// Define the types/interfaces
interface PersonalInfo {
    name: string;
    email: string;
    phone: string;
    photo: string; // Base64 encoded image
}

interface Education {
    degree: string;
    institution: string;
    year: string;
}

interface WorkExperience {
    company: string;
    role: string;
    duration: string;
    description: string;
}

class ResumeBuilder {
    private educationCount: number = 0;
    private workExperienceCount: number = 0;

    constructor() {
        document.getElementById("add-education")?.addEventListener("click", this.addEducationField.bind(this));
        document.getElementById("add-work-experience")?.addEventListener("click", this.addWorkExperienceField.bind(this));
        document.getElementById("resume-form")?.addEventListener("submit", this.generateResume.bind(this));
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
        educationSection?.appendChild(newEducation);
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
        workExperienceSection?.appendChild(newWorkExperience);
    }

    // Method to handle resume generation in a new window
    async generateResume(event: Event) {
        event.preventDefault();

        // Collect personal info
        const personalInfo: PersonalInfo = {
            name: (document.getElementById("name") as HTMLInputElement).value,
            email: (document.getElementById("email") as HTMLInputElement).value,
            phone: (document.getElementById("phone") as HTMLInputElement).value,
            photo: await this.getBase64((document.getElementById("photo") as HTMLInputElement).files?.[0])
        };

        // Collect education info
        const education: Education[] = [];
        for (let i = 1; i <= this.educationCount; i++) {
            education.push({
                degree: (document.getElementById(`degree-${i}`) as HTMLInputElement).value,
                institution: (document.getElementById(`institution-${i}`) as HTMLInputElement).value,
                year: (document.getElementById(`year-${i}`) as HTMLInputElement).value,
            });
        }

        // Collect work experience info
        const workExperience: WorkExperience[] = [];
        for (let i = 1; i <= this.workExperienceCount; i++) {
            workExperience.push({
                company: (document.getElementById(`company-${i}`) as HTMLInputElement).value,
                role: (document.getElementById(`role-${i}`) as HTMLInputElement).value,
                duration: (document.getElementById(`duration-${i}`) as HTMLInputElement).value,
                description: (document.getElementById(`description-${i}`) as HTMLTextAreaElement).value,
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
                        <p>${(document.getElementById("skills") as HTMLInputElement).value}</p>
                    </div>

                    <hr>
                    <footer>
                        <p>Generated by Professional Resume Builder</p>
                    </footer>
                </body>
                </html>
            `);
        }
    }

    // Convert uploaded image to base64
    private getBase64(file: File | undefined): Promise<string> {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            if (file) {
                reader.readAsDataURL(file);
                reader.onload = () => resolve(reader.result as string);
                reader.onerror = (error) => reject(error);
            } else {
                resolve("");
            }
        });
    }
}

new ResumeBuilder();
