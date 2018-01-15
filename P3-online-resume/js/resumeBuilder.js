/* This is empty on purpose! Your code to build the resume will go here. */
/* Bio Section*/
var bio = {
    "name": "Mark Tannert",
    "role": "Senior Staff Application Engineer",
    "contacts": {
        "mobile": "(513) 555 1234",
        "email": "mark@tannert.net",
        "github": "mtannertdev",
        "twitter": "@wn8u",
        "location": "Cincinnati"
    },
    "welcomeMessage": "An experienced enterprise architect",
    "skills": [
        "C#/.NET Development",
        "Automation",
        "Directory Data Management"
    ],
    "biopic": "https://avatars1.githubusercontent.com/u/28304023?s=460&v=4'"
};

bio.display = function() {
    $("#header").prepend(HTMLheaderRole.replace("%data%", bio.role));
    $("#header").prepend(HTMLheaderName.replace("%data%", bio.name));
    $("#topContacts,#footerContacts").append(HTMLmobile.replace("%data%", bio.contacts.mobile));
    $("#topContacts,#footerContacts").append(HTMLemail.replace("%data%", bio.contacts.email));
    $("#topContacts,#footerContacts").append(HTMLgithub.replace("%data%", bio.contacts.github));
    $("#topContacts,#footerContacts").append(HTMLtwitter.replace("%data%", bio.contacts.twitter));
    $("#topContacts,#footerContacts").append(HTMLlocation.replace("%data%", bio.contacts.location));
    $("#header").append(HTMLwelcomeMsg.replace("%data%", bio.welcomeMessage));
    $("#header").append(HTMLbioPic.replace("%data%", bio.biopic));
    $("#header").append(HTMLskillsStart);
    bio.skills.forEach(function(el) {
        $("#skills-h3").append(HTMLskills.replace("%data%", el));
    });
};



/* Work Section */

var work = {
    "jobs": [{
            "employer": "General Electric",
            "title": "Senior Staff Application Engineer",
            "location": "Cincinnati, OH",
            "dates": "May 2016 - Current",
            "description": "Manager of global Office 365 service"
        },
        {
            "employer": "General Electric",
            "title": "Senior Client Services Engineer",
            "location": "Cincinnati, OH",
            "dates": "March 2012 - May 2016",
            "description": "Primary designer for global workstation image program"
        }
    ]
};

work.display = function() {
    work.jobs.forEach(function(el) {
        $("#workExperience").append(HTMLworkStart);
        $(".work-entry:last").append(HTMLworkEmployer.replace("%data%", el.employer) + HTMLworkTitle.replace("%data%", el.title));
        $(".work-entry:last").append(HTMLworkDates.replace("%data%", el.dates));
        $(".work-entry:last").append(HTMLworkLocation.replace("%data%", el.location));
        $(".work-entry:last").append(HTMLworkDescription.replace("%data%", el.description));
    });
};



/* Projects Section */

var projects = {
    "projects": [{
            "title": "HPA account manager for Office 365/IDM",
            "dates": "January 2017 - June 2017",
            "description": "Integrated central management of HPA accounts in Office 365 with IDM for central identity management",
            "images": [
                "https://placeimg.com/200/150/animals",
                "https://placeimg.com/200/150/tech"
            ]
        },
        {
            "title": "Skpe for Business profile configuration manager",
            "dates": "June 2017 - Current",
            "description": "Central management of Skype for Business profiles linked to central identy in IDM",
            "images": [
                "https://placeimg.com/200/150/nature",
                "https://placeimg.com/200/150/people"
            ]
        }
    ]
};

projects.display = function() {
    projects.projects.forEach(function(el) {
        $("#projects").append(HTMLprojectStart);
        $(".project-entry:last").append(HTMLprojectTitle.replace("%data%", el.title));
        $(".project-entry:last").append(HTMLprojectDates.replace("%data%", el.dates));
        $(".project-entry:last").append(HTMLprojectDescription.replace("%data%", el.description));
        el.images.forEach(function(im) {
            $(".project-entry:last").append(HTMLprojectImage.replace("%data%", im));
        });
    });
};



/* Education Section */

var education = {
    "schools": [{
            "name": "The University of Arizona",
            "location": "Tucson, AZ",
            "degree": "B.S.",
            "majors": [
                "Computer Engineering"
            ],
            "dates": "1997-2001",
            "url": "http://www.arizona.edu/"
        },
        {
            "name": "George Mason University",
            "location": "Fairfax, Virginia",
            "degree": "M.S.",
            "majors": [
                "Information Security and Assurance"
            ],
            "dates": "2006-2008",
            "url": "http://www.gmu.edu/"
        }
    ],
    "onlineCourses": [{
        "title": "Front-End Web Developer Nanodegree",
        "school": "Udacity",
        "dates": "2017",
        "url": "https://www.udacity.com/course/front-end-web-developer-nanodegree--nd001"
    }]
};

education.display = function() {
    education.schools.forEach(function(el) {
        $("#education").append(HTMLschoolStart);
        $(".education-entry:last").append(HTMLschoolName.replace("%data%", el.name)	+ HTMLschoolDegree.replace("%data%", el.degree));
        $(".education-entry:last").append(HTMLschoolDates.replace("%data%", el.dates));
        $(".education-entry:last").append(HTMLschoolLocation.replace("%data%", el.location));
        $(".education-entry:last").append(HTMLschoolMajor.replace("%data%", el.majors.join(", ")));
    });
    $("#education").append(HTMLonlineClasses);
    education.onlineCourses.forEach(function(el) {
        $("#education").append(HTMLschoolStart);
        $(".education-entry:last").append(HTMLonlineTitle.replace("%data%", el.title) + HTMLonlineSchool.replace("%data%", el.school));
        $(".education-entry:last").append(HTMLonlineDates.replace("%data%", el.dates));
        $(".education-entry:last").append(HTMLonlineURL.replace("%data%", el.url));
    });
};




/* Main Section */


bio.display();
work.display();
projects.display();
education.display();
$("#mapDiv").append(googleMap);