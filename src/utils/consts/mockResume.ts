export const mockResume = {
    id: "64ed9161ee1781214bf876de",
    name: "Mock Resume",
    content: {
        id: "64ed9161ee1781214bf876e6",
        personalDetails: {
            id: "64ed9161ee1781214bf876e7",
            fullName: "Uliana V",
            jobTitle: "Frontend developer",
            email: "test@gmail.com",
            phone: "",
            address: "",
            additionalInfo: [
                {
                    input:'test',
                    name:'test',
                    isLink:true
                }
            ]
        },
        skills: {
            id: "64ed9161ee1781214bf876e8",
            sectionName: "Skills",
            items: []
        },
        language: {
            id: "64ed9161ee1781214bf876eb",
            sectionName: "Languages",
            items: [
                {
                    language: "French",
                    info: "",
                    languageLevel: "Highly proficient (B2-C1)",
                    index: 0,
                    id: "64ed9194ee1781214bf8771e"
                },
                {
                    language: "German",
                    info: "",
                    languageLevel: "Limited working proficiency (B1)",
                    index: 1,
                    id: "64edb77df18a2324fe83038a"
                },
                {
                    language: "English",
                    info: "",
                    languageLevel: "Native / full working proficiency (C2)",
                    index: 2,
                    id: "64edb848f18a2324fe8303e6"
                }
            ]
        },
        professionalExperience: {
            id: "64ed9161ee1781214bf876ec",
            sectionName: "Professional Experience",
            items: []
        },
        profile: {
            id: "64ed9161ee1781214bf876ed",
            sectionName: "Profile",
            items: []
        },
        education: {
            id: "64ed9161ee1781214bf876e9",
            sectionName: "Education",
            items: []
        },
        project: {
            id: "64ed9161ee1781214bf876ea",
            sectionName: "Projects",
            items: [
                {
                    title: "test project",
                    startDate: "2023-01",
                    endDate: "2023-07",
                    description: "<p>Did smth</p>",
                    index: 0,
                    id: "64ed918aee1781214bf87715"
                }
            ]
        }
    },
    settings: {
        id: "64ed9161ee1781214bf876df",
        sectionsOrder: {
            top: [
                "project",
                "language"
            ],
            left: [
                "project"
            ],
            right: [
                "language"
            ]
        },
        layout: {
            id: "64ed9161ee1781214bf876e5",
            columns: 2,
            position: "left",
            columnWidth: {
                left: 50,
                right: 50
            }
        },
        colors: {
            id: "64ed9161ee1781214bf876e0",
            mode: "advanced",
            basic: {
                selected: "multicolor",
                accent: "#000000",
                multicolor: {
                    accent: "#f55c69",
                    font: "#323d5e",
                    background: "#ffffff"
                }
            },
            advanced: {
                selected: "multicolor",
                accent: "#000000",
                multicolor: {
                    primary: {
                        accent: "#f55c69",
                        font: "#fffcfa",
                        background: "#323d5e"
                    },
                    secondary: {
                        accent: "#f55c69",
                        font: "#323d5e",
                        background: "#fffcfa"
                    }
                }
            },
            applyAccentColor: {
                name: true,
                dots: false,
                headings: true,
                dates: false,
                headingsLine: true,
                linkIcons: false,
                headerIcons: false
            }
        },
        spacing: {
            id: "64ed9161ee1781214bf876e4",
            fontSize: 19,
            lineHeight: 1.3,
            leftRightMargin: 16,
            topBottomMargin: 16,
            spaceBetweenSections: 22
        },
        font: {
            type: "serif",
            font: "Times New Roman"
        },
        heading: {
            id: "64ed9161ee1781214bf876e1",
            style: "line",
            isUppercase: false,
            size: "s"
        },
        subtitle: {
            id: "64ed9161ee1781214bf876e3",
            style: "normal",
            position: "nextLine"
        },
        header: {
            id: "64ed9161ee1781214bf876e2",
            position: "center",
            additionalInfoStyle: "icon",
            additionalInfoOrder: []
        },
        name: {
            size: "m",
            style: "bold"
        },
        jobTitle: {
            size: "m",
            style: "italic"
        },
        date: {
            month: "digits",
            delimiter: "/ Slash"
        },
        skills: {
            format: "level",
            gridCols: "four",
            textFormat: "bullet",
            infoItalic: false
        },
        language: {
            format: "level",
            gridCols: "four",
            textFormat: "wrap",
            infoItalic: false
        },
        profile: {
            showHeading: true
        },
        education: {
            degreeFirst: true
        },
        professionalExperience: {
            jobTitleFirst: true
        }
    }
}

