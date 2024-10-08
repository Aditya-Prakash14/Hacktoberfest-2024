const cyberBtn = document.getElementById('cyberBtn');
const aiBtn = document.getElementById('aiBtn');
const roadmap = document.getElementById('roadmap');
const nodeDetails = document.getElementById('node-details');
const nodeTitle = document.getElementById('node-title');
const nodeDescription = document.getElementById('node-description');
const resourceList = document.getElementById('resource-list');
const completeBtn = document.getElementById('complete-btn');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const progressBar = document.getElementById('progress-bar');
const progressText = document.getElementById('progress-text');

const cybersecurityPath = [
    {
        title: "Introduction to Computer Networks",
        description: "Learn about OSI model, TCP/IP, and basic networking concepts.",
        resources: [
            { name: "Networking Fundamentals", url: "https://www.coursera.org/learn/computer-networking" },
            { name: "TCP/IP Guide", url: "http://www.tcpipguide.com/" }
        ]
    },
    {
        title: "Fundamentals of Information Security",
        description: "Understand CIA triad, security policies, and risk management.",
        resources: [
            { name: "Information Security Basics", url: "https://www.cybrary.it/course/intro-to-infosec/" },
            { name: "NIST Cybersecurity Framework", url: "https://www.nist.gov/cyberframework" }
        ]
    },
    {
        title: "Cryptography and Network Security",
        description: "Study encryption algorithms, digital signatures, and secure protocols.",
        resources: [
            { name: "Cryptography I", url: "https://www.coursera.org/learn/crypto" },
            { name: "Practical Cryptography", url: "https://www.practicalnetworking.net/series/cryptography/cryptography-basics/" }
        ]
    },
    {
        title: "Ethical Hacking and Penetration Testing",
        description: "Learn methodologies for identifying and exploiting vulnerabilities.",
        resources: [
            { name: "Ethical Hacking Course", url: "https://www.udemy.com/course/ethical-hacking-kali-linux/" },
            { name: "OWASP Top Ten", url: "https://owasp.org/www-project-top-ten/" }
        ]
    },
    {
        title: "Security Operations and Incident Response",
        description: "Develop skills in monitoring, detecting, and responding to security incidents.",
        resources: [
            { name: "Incident Response Lifecycle", url: "https://www.sans.org/white-papers/34785/" },
            { name: "SIEM Fundamentals", url: "https://www.splunk.com/en_us/resources/siem.html" }
        ]
    },
    {
        title: "Digital Forensics",
        description: "Explore techniques for collecting and analyzing digital evidence.",
        resources: [
            { name: "Digital Forensics Basics", url: "https://www.sans.org/digital-forensics-incident-response/" },
            { name: "Forensic Toolkit", url: "https://accessdata.com/products-services/forensic-toolkit-ftk" }
        ]
    },
    {
        title: "Cloud Security",
        description: "Understand security challenges and best practices in cloud environments.",
        resources: [
            { name: "Cloud Security Alliance", url: "https://cloudsecurityalliance.org/" },
            { name: "AWS Security Fundamentals", url: "https://aws.amazon.com/training/course-descriptions/security-fundamentals/" }
        ]
    },
    {
        title: "Advanced Cybersecurity Topics",
        description: "Delve into emerging threats, AI in cybersecurity, and advanced defense strategies.",
        resources: [
            { name: "AI in Cybersecurity", url: "https://www.darktrace.com/en/resources/wp-ai-cyber-security.pdf" },
            { name: "Threat Intelligence", url: "https://www.crowdstrike.com/cybersecurity-101/threat-intelligence/" }
        ]
    }
];

const aiPath = [
    {
        title: "Introduction to Programming",
        description: "Learn fundamental programming concepts and a language like Python.",
        resources: [
            { name: "Python for Everybody", url: "https://www.py4e.com/" },
            { name: "Codecademy Python Course", url: "https://www.codecademy.com/learn/learn-python-3" }
        ]
    },
    {
        title: "Data Structures and Algorithms",
        description: "Study essential data structures and algorithm design techniques.",
        resources: [
            { name: "Algorithms Specialization", url: "https://www.coursera.org/specializations/algorithms" },
            { name: "LeetCode", url: "https://leetcode.com/" }
        ]
    },
    {
        title: "Linear Algebra and Calculus",
        description: "Master the mathematical foundations crucial for AI and machine learning.",
        resources: [
            { name: "Linear Algebra Course", url: "https://ocw.mit.edu/courses/mathematics/18-06-linear-algebra-spring-2010/" },
            { name: "Calculus for Machine Learning", url: "https://www.coursera.org/learn/multivariate-calculus-machine-learning" }
        ]
    },
    {
        title: "Machine Learning Fundamentals",
        description: "Understand basic ML algorithms, supervised and unsupervised learning.",
        resources: [
            { name: "Machine Learning by Andrew Ng", url: "https://www.coursera.org/learn/machine-learning" },
            { name: "Scikit-Learn Documentation", url: "https://scikit-learn.org/stable/" }
        ]
    },
    {
        title: "Deep Learning and Neural Networks",
        description: "Explore neural network architectures and deep learning frameworks.",
        resources: [
            { name: "Deep Learning Specialization", url: "https://www.coursera.org/specializations/deep-learning" },
            { name: "TensorFlow Tutorials", url: "https://www.tensorflow.org/tutorials" }
        ]
    },
    {
        title: "Natural Language Processing",
        description: "Learn techniques for processing and analyzing human language data.",
        resources: [
            { name: "NLP Specialization", url: "https://www.coursera.org/specializations/natural-language-processing" },
            { name: "NLTK Book", url: "https://www.nltk.org/book/" }
        ]
    },
    {
        title: "Computer Vision",
        description: "Study algorithms for understanding and processing visual information.",
        resources: [
            { name: "Computer Vision Course", url: "https://www.udacity.com/course/introduction-to-computer-vision--ud810" },
            { name: "OpenCV Tutorials", url: "https://docs.opencv.org/master/d9/df8/tutorial_root.html" }
        ]
    },
    {
        title: "Advanced AI and Ethics",
        description: "Explore cutting-edge AI topics and ethical considerations in AI development.",
        resources: [
            { name: "AI Ethics Course", url: "https://www.edx.org/course/ethics-of-ai" },
            { name: "AI100 Report", url: "https://ai100.stanford.edu/2021-report" }
        ]
    }
];

let currentPath = cybersecurityPath;
let currentStep = 0;
let completedSteps = new Set();

function createRoadmap(path) {
    roadmap.innerHTML = '';
    path.forEach((node, index) => {
        const nodeElement = document.createElement('div');
        nodeElement.classList.add('node');
        nodeElement.textContent = node.title;
        nodeElement.addEventListener('click', () => showNodeDetails(index));
        roadmap.appendChild(nodeElement);
    });
    updateProgress();
}

function showNodeDetails(index) {
    const node = currentPath[index];
    nodeTitle.textContent = node.title;
    nodeDescription.textContent = node.description;
    resourceList.innerHTML = '';
    node.resources.forEach(resource => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = resource.url;
        a.textContent = resource.name;
        a.target = '_blank';
        li.appendChild(a);
        resourceList.appendChild(li);
    });
    
    nodeDetails.classList.remove('hidden');
    currentStep = index;
    updateProgress();
}

function updateProgress() {
    const totalSteps = currentPath.length;
    const completedCount = completedSteps.size;
    progressBar.style.width = `${(completedCount / totalSteps) * 100}%`;
    progressText.textContent = `Step ${currentStep + 1} of ${totalSteps}`;
    prevBtn.disabled = currentStep === 0;
    nextBtn.disabled = currentStep === totalSteps - 1;

    document.querySelectorAll('.node').forEach((node, index) => {
        node.classList.toggle('completed', completedSteps.has(index));
    });
}

cyberBtn.addEventListener('click', () => {
    cyberBtn.classList.add('active');
    aiBtn.classList.remove('active');
    currentPath = cybersecurityPath;
    currentStep = 0;
    completedSteps.clear();
    createRoadmap(currentPath);
    nodeDetails.classList.add('hidden');
});

aiBtn.addEventListener('click', () => {
    aiBtn.classList.add('active');
    cyberBtn.classList.remove('active');
    currentPath = aiPath;
    currentStep = 0;
    completedSteps.clear();
    createRoadmap(currentPath);
    nodeDetails.classList.add('hidden');
});

completeBtn.addEventListener('click', () => {
    completedSteps.add(currentStep);
    updateProgress();
});

prevBtn.addEventListener('click', () => {
    if (currentStep > 0) {
        currentStep--;
        showNodeDetails(currentStep);
    }
});

nextBtn.addEventListener('click', () => {
    if (currentStep < currentPath.length - 1) {
        currentStep++;
        showNodeDetails(currentStep);
    }
});

// Initialize with Cybersecurity path
createRoadmap(cybersecurityPath);

// Add animations
gsap.from('.node', {
    duration: 0.5,
    opacity: 0,
    y: 50,
    stagger: 0.1,
    ease: 'power2.out'
});