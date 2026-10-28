/**
 * Central Portfolio Data File
 * 
 * All personal, educational, professional, project, and contact information
 * is managed here for easy editing and maintenance.
 * 
 * Strict Guideline: No invented qualifications, metrics, employment, or links.
 */

export interface EducationItem {
  degree: string;
  institution: string;
  period: string;
  statusNote?: string;
  logo?: string;
  logoAlt?: string;
}

export interface WorkExperienceItem {
  role: string;
  company: string;
  period: string;
  type: string;
  highlights: string[];
}

export interface ProjectScreenshot {
  title: string;
  image: string;
  caption: string;
}

export interface ProjectItem {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  status: string;
  category: 'Cybersecurity & Threat Analysis' | 'Cloud & Distributed Systems' | 'Web & Software Architecture';
  institution: string;
  moduleCode?: string;
  context: string;
  shortDescription: string;
  technologies: string[];
  isFeatured: boolean;
  overview: string;
  whatHappened: string;
  whatIDid: string[];
  whatIGained: string[];
  keyFindings?: string[];
  complianceOrStandards?: string[];
  screenshots?: ProjectScreenshot[];
}

export interface LabEntry {
  id: string;
  title: string;
  platform: string;
  status: 'Draft' | 'In Progress' | 'Placeholder';
  description: string;
  tools: string[];
  notes: string;
}

export const PORTFOLIO_DATA = {
  identity: {
    heroGreeting: "HI, I'M MARK",
    preferredName: 'Mark',
    fullName: 'Mark Daniel Ferdinandaz',
    onlineIdentity: 'MXRKDXNL',
    domain: 'mxrkdxnl.com',
    location: 'Negombo, Sri Lanka',
    currentStatus: 'Final-year BSc (Hons) Cyber-Security student',
    university: 'Staffordshire University, studying through APIIT Sri Lanka',
    careerInterests: [
      'Entry-level Cybersecurity Analyst',
      'Junior SOC Analyst',
      'SOC Intern opportunities',
    ],
    introduction:
      "Hi, I’m Mark, a final-year BSc (Hons) Cyber-Security student based in Sri Lanka. My background includes hands-on hardware engineering and office IT support. I’m developing practical skills in cybersecurity through projects, structured learning, and lab work, with a focus on starting my career in security operations.",
  },

  currentLearning: [
    'Security monitoring and log analysis',
    'Incident response fundamentals',
    'Vulnerability management',
    'Linux',
    'Networking',
    'Python',
    'Cloud security fundamentals',
  ],

  education: [
    {
      degree: 'BSc (Hons) Cyber-Security',
      institution: 'Staffordshire University | APIIT Sri Lanka',
      period: '2025–2027',
      statusNote: 'Currently a final-year student',
      logo: '/logos/staffordshire-logo.png',
      logoAlt: 'Staffordshire University Logo',
    },
    {
      degree: 'University Foundation of Science (Computing/IT)',
      institution: 'Edith Cowan University Sri Lanka',
      period: '2023–2024',
      logo: '/logos/ecu-logo.png',
      logoAlt: 'Edith Cowan University Australia Logo',
    },
    {
      degree: 'Aquinas Higher Diploma in Advanced English',
      institution: 'BCI University, Sri Lanka',
      period: 'August 2022–2024',
      logo: '/logos/bci-logo.png',
      logoAlt: 'BCI Campus Logo',
    },
    {
      degree: 'Certification in Hardware Engineering',
      institution: 'BCI University, Sri Lanka',
      period: '2023',
      logo: '/logos/bci-logo.png',
      logoAlt: 'BCI Campus Logo',
    },
    {
      degree: 'Local Syllabus – English Medium',
      institution: "St. Peter's College",
      period: '2001–2022',
      statusNote: 'Primary & Secondary Education',
      logo: '/logos/stpeters-logo.png',
      logoAlt: "St. Peter's College Crest",
    },
  ] as EducationItem[],

  workExperience: [
    {
      role: 'Office IT Support Assistant',
      company: 'Prime Tech Limited',
      period: 'June 2025–February 2026',
      type: 'Part-time',
      highlights: [
        'Supported office hardware, software, and connectivity issues.',
        'Assisted users with device setup and technical troubleshooting.',
        'Documented issues and escalated problems requiring specialist support.',
      ],
    },
    {
      role: 'Jr. Divisional Hardware Engineer',
      company: 'Jubilant FoodWorks Lanka (Pvt) Ltd.',
      period: 'October 2023–January 2024',
      type: 'Part-time',
      highlights: [
        'Supported company hardware infrastructure in the Gampaha district.',
        'Troubleshot desktops, laptops, printers, peripherals, POS devices, and basic connectivity.',
        'Replaced approved components and recorded faults.',
        'Escalated specialist issues and verified equipment operation after support.',
      ],
    },
  ] as WorkExperienceItem[],

  skills: {
    practicalFoundation: [
      { name: 'Windows endpoint and hardware support', category: 'Support & Hardware' },
      { name: 'Technical troubleshooting', category: 'Support & Hardware' },
      { name: 'Basic networking (TCP/IP, DNS, Wi-Fi)', category: 'Networking' },
      { name: 'Technical documentation', category: 'Operations' },
      { name: 'Manual software testing & QA', category: 'QA & Testing' },
      { name: 'Team communication & reporting', category: 'Collaboration' },
    ],
    developingSkills: [
      { name: 'Security monitoring & basic alert triage', category: 'SecOps' },
      { name: 'Log analysis', category: 'SecOps' },
      { name: 'Incident response fundamentals', category: 'SecOps' },
      { name: 'Vulnerability management', category: 'Security' },
      { name: 'Linux administration', category: 'Systems' },
      { name: 'Python scripting', category: 'Programming' },
      { name: 'Security tooling: Nmap, Wireshark, Burp Suite, Metasploit', category: 'Tooling' },
    ],
  },

  howIWork: [
    {
      title: 'Structured Troubleshooting',
      description:
        'Isolating issues systematically from hardware and network layers up to application logic, verifying each diagnostic step.',
    },
    {
      title: 'Clear Documentation',
      description:
        'Maintaining accurate notes, sprint logs, issue tickets, and step-by-step resolution records to ensure clarity and continuity.',
    },
    {
      title: 'Testing & Checking Assumptions',
      description:
        'Validating behaviors with test cases, verifying access boundaries, and confirming resolutions rather than assuming outcomes.',
    },
    {
      title: 'Communicating Technical Issues',
      description:
        'Relaying technical details clearly to both technical specialists and non-technical stakeholders without unnecessary jargon.',
    },
    {
      title: 'Continuous Learning',
      description:
        'Actively strengthening cybersecurity foundations through dedicated lab environments, hands-on practice, and academic study.',
    },
  ],

  projects: [
    {
      id: 'ticketmaster-breach',
      name: '2024 Ticketmaster Cyber-Attack & Adversary Investigation',
      slug: 'ticketmaster-breach-analysis',
      tagline: 'Threat Intelligence, Attack Lifecycle & Defense-in-Depth Analysis of a 560M-Record Breach',
      status: 'Completed Academic Case Study',
      category: 'Cybersecurity & Threat Analysis',
      institution: 'Edith Cowan University Sri Lanka',
      moduleCode: 'CSI1101',
      context: 'CSI1101 Computer Security academic forensic report investigating the May 2024 Ticketmaster breach.',
      shortDescription:
        'A comprehensive cybersecurity investigation into the 560-million customer Ticketmaster breach orchestrated by ShinyHunters, examining attack timelines, CIA Triad impact, DiD failures, and multi-extortion ransomware tactics.',
      technologies: [
        'Threat Intelligence',
        'CIA Triad',
        'Defense in Depth (DiD)',
        'MITRE ATT&CK TTPs',
        'Dark Web Reconnaissance',
        'Advanced Persistent Threats (APTs)',
        'Incident Response Triage',
      ],
      isFeatured: true,
      overview:
        'In May 2024, Ticketmaster (Live Nation) suffered one of the largest data breaches in corporate history when the cybercriminal collective ShinyHunters exfiltrated over 1.3 TB of sensitive consumer and financial records affecting 560 million users. This project analyzes the adversary methodology, the sequence of organizational missteps, and technical defense remediations required to prevent such catastrophic compromises.',
      whatHappened:
        'Hackers breached Ticketmaster’s systems via targeted phishing and gained unauthorized access to an exposed third-party cloud database holding private client records. Despite early internal monitoring alerts, the activity was initially dismissed as a false positive. The attackers subsequently exfiltrated 1.3 TB of data (including names, addresses, emails, phone numbers, and partial credit card numbers) and listed the stolen database for sale on BreachForums for $500,000 USD while attempting double-extortion ransom demands.',
      whatIDid: [
        'Reconstructed the end-to-end incident chronology from initial phishing delivery through containment, ransom demands, and law enforcement involvement.',
        'Assessed organizational compromise across the CIA Triad (severe Confidentiality breach, Integrity risks during resale, and Availability hits due to incident isolation).',
        'Dissected ShinyHunters’ attack methods, including credential theft, lateral movement, persistence via stealth malware, and data packaging for dark web auctions.',
        'Analyzed multi-extortion ransomware mechanics, contrasting double-extortion (data theft + encryption) with triple-extortion (direct customer & partner extortion).',
        'Conducted a Defense-in-Depth (DiD) failure analysis showing how weak third-party cloud controls, insufficient endpoint detection, and lack of staff phishing training enabled the intrusion.',
        'Formulated enterprise defensive recommendations including mandatory MFA, zero-trust IAM governance, active threat hunting, and automated anomaly detection.',
      ],
      whatIGained: [
        'Practical understanding of enterprise incident lifecycles and how alert fatigue leads to dismissing genuine attacks as false positives.',
        'Deep mastery of mapping real-world intrusions against the CIA Triad and Defense-in-Depth architectural frameworks.',
        'Knowledge of threat actor motivations, operational security (OpSec) evasion techniques, and dark web marketplace dynamics.',
        'Actionable insight into third-party cloud supply chain risks and the critical necessity of zero-trust access controls.',
      ],
      keyFindings: [
        '560 million customer records exfiltrated across US, Canada, Australia, and New Zealand.',
        'Early detection alerts were categorized as false positives, giving attackers an undetected 6-day dwell time.',
        'Adversaries utilized third-party cloud database misconfigurations rather than directly penetrating on-premises data centers.',
        'Stolen purchase history combined with personal contact details enables sophisticated targeted spear-phishing and counterfeit ticket scams.',
      ],
      complianceOrStandards: ['CIA Triad', 'Defense in Depth (DiD)', 'NIST SP 800-61', 'Australian Privacy Principles (APP)'],
      screenshots: [
        {
          title: 'Chronological Timeline of Breach Events',
          image: '/images/projects/ticketmaster-timeline.jpg',
          caption: 'Self-constructed timeline tracking the attack from initial phishing on May 1 to public disclosure, ransom demand, and final report.',
        },
        {
          title: 'Adversary Attack Lifecycle & Actions',
          image: '/images/projects/ticketmaster-attack-lifecycle.jpg',
          caption: 'Attack phase breakdown: Data exfiltration, establishing persistence, detection evasion, data packaging, and attempted dark web sale.',
        },
        {
          title: 'Dark Web Forum Leak & Data Sale',
          image: '/images/projects/ticketmaster-darkweb-leak.jpg',
          caption: 'Evidence of ShinyHunters listing 560M user records and card details for $500,000 USD on BreachForums.',
        },
        {
          title: 'Defense in Depth (DiD) Failure Analysis',
          image: '/images/projects/ticketmaster-did-architecture.jpg',
          caption: 'Analysis of security layer breakdowns across perimeter security, network controls, endpoint protection, and security awareness training.',
        },
      ],
    },
    {
      id: 'wireshark-analysis',
      name: 'Wireshark Network Traffic & Packet Inspection Report',
      slug: 'wireshark-network-analysis',
      tagline: 'Live Protocol Dissection of DNS Resolution, TCP 3-Way Handshake, and HTTP/1.1 Transactions',
      status: 'Completed Technical Report',
      category: 'Cybersecurity & Threat Analysis',
      institution: 'Edith Cowan University Sri Lanka',
      moduleCode: 'CSG1105',
      context: 'CSG1105 Applied Communications live network traffic capture and packet inspection investigation.',
      shortDescription:
        'A hands-on network forensic analysis utilizing Wireshark to capture and dissect live unencrypted network traffic, examining DNS resolution, TCP socket establishment, and HTTP request/response headers.',
      technologies: [
        'Wireshark',
        'TCP/IP Protocol Suite',
        'DNS Packet Analysis',
        'HTTP/1.1 Inspection',
        'OSI Model Mapping',
        'Network Packet Filtering',
        'Network Forensics',
      ],
      isFeatured: true,
      overview:
        'Network protocols underpin modern digital communication and security monitoring. In this project, live network packets were captured, filtered, and analyzed using Wireshark to investigate how endpoints translate domain names via DNS, establish reliable connections via the TCP three-way handshake, and exchange application data over HTTP.',
      whatHappened:
        'Network communication was established from a local client machine to an educational web server hosting an unencrypted web document (PL/I programming language page at groups.umd.umich.edu). Wireshark recorded all raw frames across the Wi-Fi adapter. By deliberately employing incognito browsing and disabling VPN tunnels, the entire end-to-end communication was recorded without caching interference or encryption obfuscation.',
      whatIDid: [
        'Isolated network interfaces and configured packet capturing while disabling VPN encryption to ensure raw protocol transparency.',
        'Eliminated local browser caching effects by forcing clean requests through an incognito session.',
        'Applied precise Wireshark display filters (dns, ip.addr == 141.215.69.69, and http) to sift target traffic from ambient network broadcast noise.',
        'Traced the DNS query and response pair resolving groups.umd.umich.edu to server IP 141.215.69.69.',
        'Identified the TCP three-way handshake: recorded client SYN packet with ephemeral port 49875, server SYN-ACK packet on port 80, and final client ACK.',
        'Dissected HTTP GET request headers, evaluating the performance impact of Connection: keep-alive and Accept-Encoding: gzip, deflate.',
        'Audited the HTTP response stream to fingerprint the server architecture (Server: Apache) and verify MIME formatting (Content-Type: text/html).',
        'Investigated a webpage rendering anomaly: discovered unexecuted server-side include directives in the raw HTML payload explaining a missing hit counter.',
      ],
      whatIGained: [
        'Practical command of Wireshark capture and display filter syntax, a vital skill for SOC analysts conducting packet-level alert verification.',
        'Thorough understanding of TCP socket mechanics, ephemeral port assignment, and handshake synchronization flags.',
        'Hands-on appreciation of plaintext protocol vulnerabilities (HTTP vs. HTTPS) and how easily sensitive headers and payloads can be inspected if unencrypted.',
        'Direct experience correlating application-layer symptoms (e.g., missing web elements) with raw network payload inspections.',
      ],
      keyFindings: [
        'DNS resolution translated target domain to server IP 141.215.69.69 over UDP port 53.',
        'Client dynamically negotiated ephemeral source port 49875 for the TCP connection.',
        'Persistent socket reuse was confirmed via Connection: keep-alive, reducing connection latency.',
        'Unexecuted SSI script (<!--#include virtual="/cgi-wrap/engweb/cis375.textcounter.pl"-->) in the response stream revealed why the counter failed to display.',
      ],
      complianceOrStandards: ['RFC 793 (TCP)', 'RFC 2616 (HTTP/1.1)', 'RFC 1035 (DNS)', 'OSI Reference Model'],
      screenshots: [
        {
          title: 'DNS Resolution & IP Address Filtering',
          image: '/images/projects/wireshark-ip-filter.jpg',
          caption: 'Wireshark screen after applying display filter ip.addr == 141.215.69.69 to isolate target web traffic.',
        },
        {
          title: 'TCP Three-Way Handshake & Port Allocation',
          image: '/images/projects/wireshark-tcp-handshake.jpg',
          caption: 'Highlighted SYN, SYN-ACK, and ACK packets confirming reliable socket setup between port 49875 and port 80.',
        },
        {
          title: 'HTTP GET Request Headers & Compression',
          image: '/images/projects/wireshark-http-headers.jpg',
          caption: 'Inspection of Connection: keep-alive and Accept-Encoding: gzip header fields.',
        },
        {
          title: 'HTTP Response Stream & Server Fingerprinting',
          image: '/images/projects/wireshark-http-response.jpg',
          caption: 'Response header analysis verifying Server: Apache and Content-Type: text/html.',
        },
      ],
    },
    {
      id: 'medsys-cloud',
      name: 'MedSys Healthcare Multi-AZ Cloud Architecture & Migration',
      slug: 'medsys-cloud-architecture',
      tagline: 'Secure Multi-Tier, Multi-AZ AWS Cloud Architecture & Healthcare Data Migration Plan',
      status: 'Completed Architectural Design',
      category: 'Cloud & Distributed Systems',
      institution: 'Staffordshire University / APIIT Sri Lanka',
      moduleCode: 'COMP50061',
      context: 'COMP50061 Cloud Infrastructure & Design migration and multi-tier AWS architecture.',
      shortDescription:
        'A comprehensive cloud transformation proposal for MedSys Health Solutions (40+ clinical branches), transitioning legacy on-premises servers to a multi-tier, multi-AZ AWS infrastructure featuring Amazon S3 tiering, RDS Multi-AZ, and stringent compliance.',
      technologies: [
        'AWS VPC',
        'Amazon S3',
        'S3 Intelligent-Tiering',
        'S3 Glacier Deep Archive',
        'Amazon RDS Multi-AZ',
        'EC2 Auto Scaling',
        'Application Load Balancer (ALB)',
        'AWS WAF & Shield',
        'AWS KMS',
        'AWS GuardDuty',
        'AWS CloudTrail',
      ],
      isFeatured: true,
      overview:
        'MedSys Health Solutions Ltd operates over 40 private healthcare clinics globally. Their legacy on-premises IT infrastructure suffered from peak-hour bandwidth bottlenecks during diagnostic image uploads, single points of failure, manual backup overheads, and high disaster recovery risks. This project designs a secure, high-availability AWS architecture that scales elastically while strictly adhering to international healthcare regulations.',
      whatHappened:
        'Concurrent uploads of medical imaging, diagnostic reports, and patient records overwhelmed legacy servers during clinic operating hours. With clinical data bound by strict statutory preservation rules, on-premises storage costs escalated while off-site backup recovery times were too sluggish to support 24/7 care. An enterprise cloud architecture was needed to deliver 99.999999999% durability, zero-downtime elasticity, and automated compliance.',
      whatIDid: [
        'Conducted an exhaustive assessment of MedSys’s on-premises environment under the AWS Well-Architected Framework (6 pillars).',
        'Evaluated Amazon S3 object storage capabilities: configured S3 Lifecycle rules, Object Lock (WORM compliance for medical records), and S3 Intelligent-Tiering to minimize costs.',
        'Designed a multi-tier, multi-Availability Zone (AZ) VPC topology:',
        '• Edge Defense: Route 53 DNS routing, CloudFront CDN, and AWS WAF mitigating SQL injection and cross-site scripting (XSS).',
        '• Public Subnets: Application Load Balancers (ALB) and NAT Gateways across Availability Zones A and B.',
        '• Private Subnets: EC2 Auto Scaling groups hosting core clinical appointment and management applications.',
        '• Data Tier: Multi-AZ Amazon RDS (primary with synchronous standby) and Amazon S3 with Glacier deep archival.',
        '• Security & Auditing: AWS KMS customer-managed keys for encryption at rest, IAM least-privilege role boundaries, AWS GuardDuty threat detection, and AWS CloudTrail immutable audit logs.',
        'Formulated a phased 8-step migration roadmap using AWS DataSync and AWS Storage Gateway to transfer multi-terabyte diagnostic images and relational databases without clinical downtime.',
      ],
      whatIGained: [
        'Architectural design skills for mission-critical, high-availability cloud systems across multiple availability zones.',
        'Deep mastery of storage lifecycle automation, comparing cost, retrieval speed, and retention policies across S3 storage classes.',
        'In-depth knowledge of healthcare data governance requirements (UK GDPR, Australian APP, and Sri Lankan PDPA).',
        'Experience engineering defense-in-depth within cloud perimeters using VPC subnets, security groups, and Web Application Firewalls.',
      ],
      keyFindings: [
        'Amazon S3 delivers 11 9s (99.999999999%) data durability, eliminating the risk of catastrophic medical record loss.',
        'Multi-AZ RDS automatic failover prevents single-server hardware outages from stopping 24/7 clinical operations.',
        'Automated S3 Intelligent-Tiering reduces healthcare storage expenditure by moving inactive historical imaging to archive tiers without manual overhead.',
        'AWS KMS and AWS WAF provide robust defense against ransomware and SQL injection threats targeting electronic health records.',
      ],
      complianceOrStandards: ['HIPAA Guidance', 'GDPR (UK)', 'Australian Privacy Principles (APP)', 'Sri Lankan PDPA', 'AWS Well-Architected Framework'],
      screenshots: [
        {
          title: 'Proposed AWS Healthcare Cloud Architecture Topology',
          image: '/images/projects/medsys-aws-architecture.jpg',
          caption: 'Image 1.1: Multi-tier architectural topology across Availability Zones A & B featuring WAF, CloudFront, ALBs, EC2 Auto Scaling, RDS Multi-AZ, and S3/Glacier backup lines.',
        },
      ],
    },
    {
      id: 'distributed-systems',
      name: 'Distributed Enterprise Systems Upgrade & Data Compliance',
      slug: 'distributed-systems-upgrade',
      tagline: 'Solving Global Data Duplication & Inventory De-sync with Amazon DynamoDB & CAP Theorem Strategy',
      status: 'Completed Architectural Proposal',
      category: 'Cloud & Distributed Systems',
      institution: 'Staffordshire University / APIIT Sri Lanka',
      moduleCode: 'COM2521',
      context: 'COM2521 Data and Distribution Systems global inventory and data compliance proposal.',
      shortDescription:
        'An enterprise cloud architecture designed for Global Sports Gear Ltd, resolving severe inventory desynchronization and customer data duplication across UK, Australia, Sri Lanka, and North American branches using Amazon DynamoDB and CAP Theorem principles.',
      technologies: [
        'Distributed Systems',
        'Amazon DynamoDB',
        'Amazon EC2',
        'Amazon S3',
        'CAP Theorem',
        'AWS API Gateway',
        'AWS WAF',
        'AWS KMS',
        'VPC Peering',
        'Cross-Border Compliance',
      ],
      isFeatured: true,
      overview:
        'Global Sports Gear Ltd operates retail branches in the UK, Australia, and Sri Lanka with active expansion into North America. The business suffered from fragmented local branch databases, causing severe customer data duplication, lost loyalty benefits during cross-border travel, out-of-sync inventory leading to stockouts, and inconsistent regional pricing. This project designs a centralized, distributed cloud system resolving operational bottlenecks while maintaining regional legal compliance.',
      whatHappened:
        'Each regional store operated an independent database with zero real-time cross-branch communication. When a product sold out in one branch, other branches still displayed it as available. Furthermore, customer accounts were siloed by country, causing lost loyalty points and inconsistent promotional pricing that damaged brand reputation.',
      whatIDid: [
        'Conducted a root-cause analysis of operational inefficiencies stemming from fragmented data silos and lack of real-time inventory propagation.',
        'Architected a 3-tier cloud-based distributed system on AWS:',
        '• Presentation Layer: Global employee and customer web portal providing synchronized profile and inventory views.',
        '• Application Layer: Cloud-native order processing, dynamic currency and pricing normalization, and payment microservices.',
        '• Data Layer: High-throughput, ultra-low latency Amazon DynamoDB NoSQL database powering real-time global stock allocation, complemented by Amazon RDS and S3.',
        'Applied the CAP Theorem to distributed retail transactions, evaluating trade-offs between Consistency, Availability, and Partition Tolerance to guarantee 100% store uptime during peak shopping events.',
        'Mapped multi-jurisdiction data privacy compliance across three legal frameworks:',
        '• UK GDPR: Implemented AWS KMS encryption and automated Data Subject Access Requests (DSARs) using AWS Lambda.',
        '• Australian Privacy Principles (APP): Configured secure cross-border transfer encryption via AWS Certificate Manager and comprehensive logging via CloudTrail.',
        '• Sri Lankan PDPA: Enforced localized consent tracking and data governance controls via AWS IAM.',
        'Formulated security mitigations against cloud misconfiguration, DDoS attacks (AWS Shield), and unauthorized data exfiltration.',
      ],
      whatIGained: [
        'In-depth mastery of distributed systems architecture and real-world CAP Theorem trade-offs in high-volume e-commerce.',
        'Practical proficiency modeling NoSQL data structures in Amazon DynamoDB for real-time inventory management.',
        'Clear understanding of cross-border data privacy regulations (GDPR, APP, PDPA) and cloud data residency enforcement.',
        'System design techniques for eliminating data duplication and maintaining multi-region operational consistency.',
      ],
      keyFindings: [
        'Centralizing inventory management in Amazon DynamoDB eliminates stockouts and phantom availability across international retail outlets.',
        'Prioritizing Availability and Partition Tolerance (AP) under CAP theorem ensures local branches continue processing sales even during transient network partitions.',
        'Unified customer account records enable frictionless international loyalty reward redemption regardless of store location.',
        'Automated compliance workflows using AWS Lambda significantly reduce legal exposure under GDPR and PDPA.',
      ],
      complianceOrStandards: ['CAP Theorem', 'GDPR (UK)', 'Australian Privacy Principles (APP)', 'Sri Lankan PDPA', 'AWS Well-Architected Framework'],
      screenshots: [
        {
          title: 'Proposed Distributed Architecture Diagram',
          image: '/images/projects/distributed-systems-architecture.jpg',
          caption: 'Section 3.2 Proposed Architecture Diagram showing regional branch VPCs (UK, Australia, Sri Lanka) peered with centralized DynamoDB, S3, API Gateway, and WAF.',
        },
      ],
    },
    {
      id: 'greenbite-platform',
      name: 'GreenBite: Health, Nutrition & Mindfulness Interactive Web Platform',
      slug: 'greenbite-wellness-platform',
      tagline: 'Modular Wellness Platform with Calorie Calculator, Workout Generator, Mindfulness Hub & PWA Offline Engine',
      status: 'Architecture & Prototype Specification',
      category: 'Web & Software Architecture',
      institution: 'Web Application Architecture & UI Prototype',
      moduleCode: 'Web App Project',
      context: 'Modular client-side health and wellness web application with PWA capabilities.',
      shortDescription:
        'A modular, responsive web application engineered to consolidate personalized calorie calculation (BMR & TDEE), workout routine generation, guided mindfulness breathing, and nutritional recipes with offline Progressive Web App support.',
      technologies: [
        'JavaScript (ES6+)',
        'HTML5 Semantic Markup',
        'CSS3 Design Systems & Themes',
        'Progressive Web App (PWA)',
        'Service Worker Offline Caching',
        'BMR / TDEE Mathematical Modeling',
        'Local Storage API',
        'UI/UX Architecture',
      ],
      isFeatured: false,
      overview:
        'GreenBite is an all-in-one personal wellness web platform engineered to eliminate friction in maintaining physical and mental health. The project encompasses a clean, modular architecture separating themes, animation keyframes, and application logic across interactive calorie calculators, dynamic workout generators, mindfulness tools, and offline-capable service workers.',
      whatHappened:
        'Many health applications require invasive account registration, complex server setups, or fail when network connectivity drops. GreenBite was architected as an accessible, client-side first platform delivering instant, reliable health insights directly in the browser with full offline support via Progressive Web App technology.',
      whatIDid: [
        'Structured the modular project file system separating themes (default, dark, light), global stylesheets, and functional JavaScript modules (calculator, workouts, mindfulness, recipes).',
        'Engineered the Personalized Calorie & Nutrition Calculator (calculator.js): implemented Basal Metabolic Rate (BMR) and Total Daily Energy Expenditure (TDEE) formulas with physical activity multipliers.',
        'Developed the Daily Workout Builder (workouts.js): designed dynamic exercise generation filtered by target muscle groups (Full Body, Upper, Lower) and available equipment (Bodyweight, Dumbbells).',
        'Built the Guided Breathing & Mindfulness Hub (mindfulness.js): integrated soothing visual breath pacing animations, ambient sound mixer (Rain, Waves, Forest, Zen), Pomodoro meditation timer, and session log history.',
        'Created a responsive Healthy Recipe Discovery library (recipes.js) featuring nutritional breakdowns and ingredient details.',
        'Configured PWA offline capabilities: authored manifest.json and service-worker.js to enable asset caching and home-screen mobile installation.',
      ],
      whatIGained: [
        'Practical experience architecting clean, maintainable, modular frontend codebases with vanilla JavaScript and CSS3 design tokens.',
        'Deep understanding of implementing nutritional and physiological calculation algorithms in client-side software.',
        'Experience building offline-first user experiences using Service Workers and Cache Storage APIs.',
        'Strong sense of visual hierarchy, accessibility, and interactive design for wellness applications.',
      ],
      keyFindings: [
        'Modular script separation enables maintainable feature scaling without heavy framework dependencies.',
        'Service Worker caching ensures critical mindfulness and workout tools remain accessible even in disconnected environments.',
        'Transparent mathematical equations for BMR and TDEE empower users with actionable, trustworthy nutritional targets.',
      ],
      complianceOrStandards: ['Progressive Web App (PWA) Standards', 'Mifflin-St Jeor Energy Equation', 'W3C Web Standards'],
      screenshots: [
        {
          title: 'Personalized Calorie & Nutrition Calculator',
          image: '/images/projects/greenbite-calculator.jpg',
          caption: 'Interactive results dashboard displaying Basal Metabolic Rate (BMR), Total Daily Energy Expenditure (TDEE), and daily target calories.',
        },
        {
          title: 'GreenBite Homepage & Recipe Explorer',
          image: '/images/projects/greenbite-recipes.jpg',
          caption: 'Clean, modern user interface displaying healthy recipe cards with nutritional macros and wellness tips of the day.',
        },
        {
          title: 'Guided Breathing Exercise & Mindfulness Hub',
          image: '/images/projects/greenbite-mindfulness.jpg',
          caption: 'Mindfulness suite featuring breathing animations, ambient sound generator, and Pomodoro meditation session log.',
        },
        {
          title: 'Daily Workout Builder & Routine Generator',
          image: '/images/projects/greenbite-workouts.jpg',
          caption: 'Dynamic workout builder tailoring routines by target body part and equipment availability.',
        },
        {
          title: 'Homepage Low-Fidelity Wireframe Design',
          image: '/images/projects/greenbite-wireframe-home.jpg',
          caption: 'COMP40053 Software Development: Homepage wireframe and structural layout plan.',
        },
        {
          title: 'W3C Validity & Google Lighthouse Performance Test',
          image: '/images/projects/greenbite-lighthouse-test.jpg',
          caption: 'Rigorous accessibility, SEO, best practices, and performance audit scores for GreenBite.',
        },
      ],
    },
    {
      id: 'cs-vulnerabilities',
      name: 'Municipal IT Infrastructure Vulnerability Audit & Defense Countermeasures',
      slug: 'cs-vulnerabilities-countermeasures',
      tagline: 'Enterprise Vulnerability Assessment, Threat Modeling, and 3-2-1 Data Backup Strategy for Public Infrastructure',
      status: 'Completed Security Audit & Countermeasures Report',
      category: 'Cybersecurity & Threat Analysis',
      institution: 'Edith Cowan University Sri Lanka',
      moduleCode: 'Computer Security',
      context: 'Comprehensive cybersecurity audit analyzing municipal digital infrastructure risks and remediation roadmaps.',
      shortDescription:
        'An in-depth cybersecurity vulnerability assessment evaluating six critical attack vectors across municipal IT infrastructure (physical access, weak passwords, exposed RDP, unencrypted storage, USB threats, and backup failures) with actionable defense countermeasures.',
      technologies: [
        'Vulnerability Assessment',
        '3-2-1 Backup Architecture',
        'Zero Trust Principles',
        'Multi-Factor Authentication (MFA)',
        'RDP Tunneling & Hardening',
        'Network Segmentation (802.1X)',
        'Full-Disk Encryption (AES-256)',
        'Endpoint Peripheral Control',
      ],
      isFeatured: true,
      overview:
        'Public administration infrastructure increasingly relies on digitized citizen services. This project performs an exhaustive technical audit of municipal IT infrastructure, identifying six foundational security vulnerabilities and architecting robust defense-in-depth countermeasures to protect public records against modern ransomware, physical tampering, and unauthorized exfiltration.',
      whatHappened:
        'A comprehensive audit of municipal infrastructure revealed widespread security weaknesses: unsecured server rooms with unrestricted physical access, weak and shared administrative passwords without MFA, unprotected Remote Desktop Protocol (RDP) listening directly on port 3389, unencrypted citizen databases, unrestricted endpoint USB ports vulnerable to BadUSB/malware, and absent disaster recovery backups. These gaps left public services vulnerable to immediate ransomware exploitation.',
      whatIDid: [
        'Conducted deep threat modeling across the Six Critical IT Vulnerabilities: Lack of Physical Security, Weak Password Policies, Unsecured Remote Desktop Protocol (RDP), Inadequate Data Encryption, Unrestricted USB Access, and Deficient Disaster Recovery.',
        'Analyzed the attack paths enabled by physical exposure: unauthorized hardware implants (hardware keyloggers, rogue dropboxes), local privilege escalation, and direct packet sniffing.',
        'Deconstructed RDP brute-force and credential-stuffing exploits targeting exposed port 3389, designing an IPsec / WireGuard VPN bastion architecture with TLS 1.3.',
        'Engineered endpoint peripheral defense policies utilizing Active Directory Group Policy (GPO) to restrict removable storage and prevent unauthorized data exfiltration.',
        'Architected an enterprise 3-2-1 Data Backup Strategy: 3 copies of data across 2 distinct media types (local high-speed NAS + secure cloud), with 1 immutable air-gapped copy off-site to defeat double-extortion ransomware.',
        'Drafted a comprehensive Municipal Incident Response Plan (IRP) defining containment, forensic triage, and continuity workflows.',
      ],
      whatIGained: [
        'Practical command of enterprise security auditing, identifying physical, host, and network-level security vulnerabilities.',
        'Expertise designing ransomware-resilient backup architectures using the 3-2-1 rule and immutable storage.',
        'Deep understanding of Windows Active Directory endpoint hardening (MFA, PAM, GPO device control, and RDP isolation).',
        'Ability to present complex risk assessments and mitigation roadmaps clearly to executive and administrative stakeholders.',
      ],
      keyFindings: [
        'Physical access vulnerabilities bypass network firewalls, allowing direct bus sniffing and rogue hardware installation.',
        'Unrestricted RDP on port 3389 accounts for a dominant percentage of initial corporate network compromise vectors.',
        'Adopting the 3-2-1 backup rule with air-gapped immutable copies provides definitive insurance against ransomware extortion demands.',
        'Mandatory Multi-Factor Authentication (MFA) and PAM mitigate over 98% of identity-based brute force attacks.',
      ],
      complianceOrStandards: ['NIST Cybersecurity Framework (CSF)', 'Zero Trust Architecture (ZTA)', '3-2-1 Backup Standard', 'ISO/IEC 27001'],
      screenshots: [
        {
          title: 'Physical Security Vulnerability & Attack Paths',
          image: '/images/projects/cs-vulnerabilities-physical.jpg',
          caption: 'Audit analysis of physical security deficits and subsequent attack progression into internal networks.',
        },
        {
          title: 'Unsecured RDP Attack Vectors & Remote Exploitation',
          image: '/images/projects/cs-vulnerabilities-rdp.jpg',
          caption: 'Deconstruction of Remote Desktop Protocol exposure and brute-force vulnerability vectors.',
        },
        {
          title: 'Enterprise 3-2-1 Backup Strategy Model',
          image: '/images/projects/cs-vulnerabilities-backup-321.jpg',
          caption: 'Implementation architecture of the 3-2-1 backup rule ensuring multi-media redundancy and off-site air-gapped protection.',
        },
      ],
    },
    {
      id: 'ceylon-reads-db',
      name: 'Ceylon Reads: Enterprise Relational Database Design & Normalization',
      slug: 'ceylon-reads-database-design',
      tagline: 'Relational Schema Architecture, 1NF–3NF Normalization, and SQL Implementation for Retail Digitalization',
      status: 'Completed Database Architecture & Normalization Design',
      category: 'Cloud & Distributed Systems',
      institution: 'Staffordshire University / APIIT Sri Lanka',
      moduleCode: 'COM2521',
      context: 'COM2521 Data and Distribution Systems (Report 01) database engineering proposal.',
      shortDescription:
        'A complete relational database transformation for Ceylon Reads bookshop, transitioning manual paper records into a fully normalized (1NF–3NF) SQL database system with role-based access control and inventory views.',
      technologies: [
        'Relational Database Design',
        'SQL (DDL & DML)',
        'Database Normalization (1NF–3NF)',
        'Entity-Relationship Modeling (ERD)',
        'SQL Views & Triggers',
        'Role-Based Database Security',
        'Referential Integrity',
      ],
      isFeatured: true,
      overview:
        'Ceylon Reads, a mid-sized retail bookstore in Colombo, operated entirely using physical paper ledgers and manual filing. This project architects a robust relational database schema that eliminates data anomalies through formal 1NF–3NF normalization and delivers high-performance SQL querying for sales, multi-genre book categorization, and inventory management.',
      whatHappened:
        'Manual bookkeeping created severe business hurdles: misplaced stock without accurate counts, customer purchase histories lost in physical binders, an inability to categorize multi-author/multi-genre titles, and checkout delays during peak sales. A structured relational database was required to digitize all transactions.',
      whatIDid: [
        'Conducted business domain analysis and compiled complete Functional and Non-Functional Requirements for retail book operations.',
        'Constructed conceptual Entity-Relationship Diagrams (ERDs) detailing cardinality (1:1, 1:N, M:N) and business integrity rules.',
        'Executed rigorous step-by-step database normalization from Unnormalized Form (UNF) through 1NF (atomic values), 2NF (removing partial dependencies), and 3NF (eliminating transitive dependencies).',
        'Penned the complete physical SQL DDL schema with primary keys, composite keys, foreign key constraints (ON DELETE RESTRICT/CASCADE), and data typing.',
        'Engineered optimized SQL database views: BookDetails view for real-time cashier stock checks and CustomerOrderDetails view for checkout itemization.',
        'Implemented database-level Role-Based Access Control (RBAC), restricting Cashier roles to transactional views while reserving DDL and audit logs for the Owner.',
      ],
      whatIGained: [
        'Formal mastery of relational schema design and mathematical normalization theory (1NF to 3NF).',
        'Advanced SQL engineering skills in authoring views, table constraints, indexing, and referential integrity enforcement.',
        'Experience translating unstructured physical business workflows into optimized relational database structures.',
        'Insight into database security administration and privilege separation between front-line staff and administrators.',
      ],
      keyFindings: [
        'Applying 3NF normalization eliminated data redundancy and solved insertion, update, and deletion anomalies across inventory dockets.',
        'Pre-compiled SQL views dramatically reduced query execution overhead on front-line cashier terminals.',
        'Enforcing foreign key constraints prevented orphan records across order lines and customer accounts.',
      ],
      complianceOrStandards: ['Database Normalization (1NF–3NF)', 'Relational Algebra', 'ACID Properties'],
      screenshots: [
        {
          title: 'Entity Relationship Modeling & Attribute Schema',
          image: '/images/projects/ceylon-reads-erd.jpg',
          caption: 'Entity attributes, primary keys, and relational cardinality structure for Ceylon Reads.',
        },
        {
          title: 'SQL BookDetails View Execution (Cashier Role)',
          image: '/images/projects/ceylon-reads-sql-view1.jpg',
          caption: 'Executed SQL output of BookDetails view demonstrating real-time inventory and pricing lookup.',
        },
        {
          title: 'SQL CustomerOrderDetails Transactional View',
          image: '/images/projects/ceylon-reads-sql-view2.jpg',
          caption: 'Execution of multi-table join view calculating customer invoice totals and itemized purchase history.',
        },
      ],
    },
    {
      id: 'port-city-colombo',
      name: 'CHEC Port City Colombo: Hotel Oasis Strategic Project Charter',
      slug: 'port-city-colombo-charter',
      tagline: 'Pre-Opening Digital Strategy, Work Breakdown Structure (WBS), and Infrastructure Project Charter',
      status: 'Completed Strategic Project Charter & WBS',
      category: 'Web & Software Architecture',
      institution: 'Staffordshire University / APIIT Sri Lanka',
      moduleCode: 'CHEC Port City Colombo Sponsored',
      context: 'Project Management consultancy project sponsored by CHEC Port City Colombo (Pvt) Ltd.',
      shortDescription:
        'A comprehensive project management charter, Work Breakdown Structure (WBS), and digital marketing infrastructure plan developed for luxury landmark Hotel Oasis at CHEC Port City Colombo.',
      technologies: [
        'Project Chartering',
        'Work Breakdown Structure (WBS)',
        'Risk Management Register',
        'Digital Marketing Architecture',
        'Milestone Action Planning',
        'Stakeholder Governance',
      ],
      isFeatured: false,
      overview:
        'Commissioned for CHEC Port City Colombo (Pvt) Ltd, this project delivers a formal project management charter, Work Breakdown Structure (WBS), risk register, and digital launch plan for the pre-opening phase of premier hospitality development Hotel Oasis.',
      whatHappened:
        'The multi-billion dollar Port City Colombo development required structured outsourcing to project management consultancies to coordinate high-priority commercial openings. Hotel Oasis required an authoritative project baseline coordinating branding, digital web platforms, stakeholder schedules, and risk mitigation prior to grand opening.',
      whatIDid: [
        'Formulated the comprehensive Project Charter establishing scope baselines, success metrics, resource allocations, and milestone targets.',
        'Engineered a 5-phase Work Breakdown Structure (WBS) spanning Planning & Development, Construction, Operations, Marketing, and Post-Opening.',
        'Designed the Digital Platform Architecture: online booking engine integration, UI/UX brand identity collaterals, and multi-channel marketing campaigns.',
        'Compiled an exhaustive Project Risk Register evaluating technical website bugs, vendor delays, budget limits, and branding inconsistency with corresponding mitigation plans.',
        'Authored the detailed Action Plan matrix mapping task codes, sub-activities, dependencies, and delivery deadlines across consultancy and client teams.',
      ],
      whatIGained: [
        'Professional project management proficiency adhering to industry-standard charter and WBS frameworks.',
        'Practical experience structuring complex enterprise initiatives with clear dependency chains and risk mitigation buffers.',
        'Insight into commercial digital strategy and web architecture for high-profile luxury tourism developments.',
        'Strategic communication and alignment skills interfacing between consulting teams and corporate sponsors.',
      ],
      keyFindings: [
        'Decomposing pre-opening activities into a hierarchical WBS prevents scope creep and milestone bottlenecks across multi-vendor teams.',
        'A proactive risk register ensures contingency reserves and technical web QA protocols are established before public launch.',
      ],
      complianceOrStandards: ['Project Management Institute (PMI) Standards', 'Work Breakdown Structure (WBS) Framework'],
      screenshots: [
        {
          title: 'Official Project Charter (Hotel Oasis)',
          image: '/images/projects/port-city-charter.jpg',
          caption: 'Formal project charter detailing objectives, scope, stakeholder responsibilities, and success criteria.',
        },
        {
          title: 'Hierarchical Work Breakdown Structure (WBS)',
          image: '/images/projects/port-city-wbs.jpg',
          caption: 'Decomposition of project deliverables across planning, digital marketing, and operations.',
        },
        {
          title: 'Action Plan & Milestone Dependency Matrix',
          image: '/images/projects/port-city-action-plan.jpg',
          caption: 'Activity schedule mapping task codes, lead times, resource assignments, and deliverables.',
        },
      ],
    },
    {
      id: 'altrium-tracker',
      name: 'Altrium Performance & Development Tracker',
      slug: 'altrium-performance-tracker',
      tagline: 'Role-Based Performance & Review Management System',
      status: 'Demo / Prototype',
      category: 'Web & Software Architecture',
      institution: 'Independent / Client Scenario',
      context: 'Developed for an Altrium Private Limited use case.',
      shortDescription:
        'A role-based web application that centralises employee performance reviews, confidential peer feedback, Personal Development Plans (PDP), and Performance Improvement Plans (PIP) across multi-tier user permissions.',
      technologies: [
        'React',
        'Vite',
        'Tailwind CSS',
        'JavaScript',
        'Node.js',
        'Express.js',
        'MySQL',
        'Sequelize ORM',
        'JSON Web Tokens',
        'bcryptjs',
        'Multer',
      ],
      isFeatured: true,
      overview:
        'A web-based platform built to consolidate employee evaluations, confidential peer feedback, Personal Development Plans (PDP), and Performance Improvement Plans (PIP) into a single structured system.',
      whatHappened:
        'Disconnected forms, spreadsheets, shared files, and manual follow-ups made employee review processes difficult to coordinate, track, and audit consistently across multiple departments.',
      whatIDid: [
        'Maintained Scrum board tracking, sprint logs, and technical task progression.',
        'Authored and executed comprehensive manual QA test cases across user authentication, review workflows, and submission integrity.',
        'Validated strict role-based access boundaries across Employee, Team Manager, Department Manager, and HR Manager tiers.',
        'Tested multi-role permission edge cases, ensuring confidential peer feedback remained inaccessible to unauthorized personnel.',
        'Collaborated on deployment troubleshooting between Vercel and Railway platforms.',
      ],
      whatIGained: [
        'Hands-on expertise verifying role-based access control (RBAC) boundaries across frontend and backend API layers.',
        'Structured software quality assurance methodologies and sprint documentation discipline.',
        'Understanding of data modeling for confidential employee records and sensitive evaluation workflows.',
      ],
      keyFindings: [
        'Enforcing access boundaries at both API middleware and database query layers prevents horizontal privilege escalation.',
        'Structured sprint QA test suites prevent regressions when altering complex review cycle rules.',
      ],
      complianceOrStandards: ['Role-Based Access Control (RBAC)', 'Agile / Scrum QA Methodologies'],
    },
  ] as ProjectItem[],

  altriumCaseStudy: {
    title: 'Altrium Performance & Development Tracker',
    subtitle: 'Case Study: Centralised Review, Feedback & Development System',
    status: 'Demo (Developed for an Altrium Private Limited use case)',
    statusDisclaimer:
      'Note: This project was developed for an Altrium Private Limited use case. It is presented as a demonstration project and does not claim verified production adoption or measured business results.',
    overview:
      'A web-based platform built to consolidate employee evaluations, confidential peer feedback, Personal Development Plans (PDP), and Performance Improvement Plans (PIP) into a single structured system.',
    problemAddressed:
      'Disconnected forms, spreadsheets, shared files, and manual follow-ups make employee review processes difficult to coordinate, track, and audit consistently across multiple departments.',
    userRoles: [
      {
        role: 'Employee',
        description: 'Completes assigned self-reviews, submits confidential peer reviews, and tracks personal development goals.',
      },
      {
        role: 'Team Manager',
        description: 'Oversees team members, assigns reviews, monitors deadlines, and evaluates direct reports.',
      },
      {
        role: 'Department Manager',
        description: 'Maintains oversight across departmental teams, progress cycles, and cross-team development initiatives.',
      },
      {
        role: 'HR Manager',
        description: 'Coordinates quarterly review cycles, accesses department-level reporting, and exports compliance summaries.',
      },
    ],
    features: [
      'Self-review and confidential peer-review assignments',
      'Quarterly review cycle management',
      'Task deadlines and submission history tracking',
      'Duplicate-assignment prevention checks',
      'Personal Development Plans (PDP)',
      'Performance Improvement Plans (PIP)',
      'Evidence file uploads and milestone tracking',
      'Role-specific dashboards tailored by access tier',
      'System notifications and task alerts',
      'Department-level HR analytics and review status reports',
      'Profile management and account details',
      'Historical review records and report data export',
    ],
    accessControlApproach: {
      summary:
        'Access boundaries are enforced through role-specific checks implemented across both the frontend routing and backend API endpoints.',
      details: [
        'Employees access only their own assigned evaluations and plans.',
        'Team Managers oversee evaluations for their direct team members.',
        'Department Managers have visibility across all teams within their department.',
        'HR Managers receive department-level aggregate reports and administrative tools.',
        'Confidential peer feedback is restricted strictly to authorised managers.',
      ],
      disclaimer:
        'These access-control mechanisms are described as implemented project features and functional architecture, not as independently audited third-party security guarantees.',
    },
    techStack: [
      { category: 'Frontend', tech: 'React, Vite, Tailwind CSS, JavaScript' },
      { category: 'Backend', tech: 'Node.js, Express.js' },
      { category: 'Database & ORM', tech: 'MySQL, Sequelize ORM' },
      { category: 'Security & Auth', tech: 'JSON Web Tokens (JWT), bcryptjs' },
      { category: 'File Handling', tech: 'Multer' },
      { category: 'Deployment', tech: 'Vercel (Frontend), Railway (Backend)' },
    ],
    contribution: {
      clarificationNote:
        'Contribution Notice (Marked for Mark’s confirmation): The original project documentation describes this as a team project with Mark’s Sprint 1 responsibilities covering Scrum Master and QA duties. Mark has also noted implementing the application. In accordance with strict portfolio integrity, this section explicitly highlights confirmed contributions while keeping final authorship attribution open for Mark’s confirmation.',
      confirmedResponsibilities: [
        'Scrum board maintenance and sprint task tracking',
        'Meeting notes, action items, and sprint documentation',
        'Task progress monitoring across iterations',
        'Design and execution of manual QA test cases',
        'Authentication and review workflow functional testing',
        'Role-based access boundary and authorization testing',
        'Validation of assignment integrity and submission rules',
        'Collaboration on deployment troubleshooting between Vercel and Railway',
        'Requirements clarification and acceptance criteria verification',
      ],
    },
    lessonsLearned: [
      'Coordinating role-based authorization rules across relational schemas requires strict consistency between database relationships and route middleware.',
      'Maintaining clear sprint documentation and QA test suites prevents regression bugs during workflow changes.',
      'Separating sensitive review inputs (e.g. peer feedback) early in data modeling simplifies privacy enforcement.',
    ],
    assetsNotice: {
      screenshots: 'Screenshots will be uploaded upon confirmation.',
      demoUrl: 'Live demo link pending confirmation from Mark.',
      repoUrl: 'Repository link pending confirmation from Mark.',
    },
  },

  labs: {
    intro:
      'A structured repository of cybersecurity lab exercises, hands-on practice, and defensive security notes. Entries reflect authorized, isolated lab environments.',
    knownActivities: [
      {
        id: 'dc-series',
        title: 'DC 1–7 Lab Series',
        platform: 'Vulnerable-by-Design CTF Lab Series (Authorized Local / Isolated Lab)',
        status: 'Placeholder',
        description:
          'Hands-on vulnerability identification, privilege escalation analysis, and defensive takeaways across the DC series.',
        tools: ['Linux', 'Nmap', 'Burp Suite', 'Terminal Utilities'],
        notes: 'Detailed write-up structure prepared; specific completion details and verification pending confirmation.',
      },
      {
        id: 'cybersploit-metasploit',
        title: 'CyberSploit & Metasploit Practice Labs',
        platform: 'Authorized Practice Lab Environment',
        status: 'Placeholder',
        description:
          'Exploration of exploit modules, service enumeration, payload behavior, and endpoint log signatures.',
        tools: ['Metasploit Framework', 'Nmap', 'Wireshark', 'Linux'],
        notes: 'Lab notes and defensive analysis pending confirmation.',
      },
    ] as LabEntry[],
    entryTemplateFields: [
      'Title',
      'Platform or environment',
      'Date',
      'Learning objectives',
      'Tools used',
      'Summary of work in an authorised lab',
      'Defensive lessons learned',
      'Screenshots or supporting evidence',
      'References',
    ],
  },

  contact: {
    primaryEmail: 'Mark@MxrkDxnl.Com',
    phone: '+94 77 803 4343',
    location: 'Negombo, Sri Lanka',
    inboxes: [
      { label: 'Primary Domain Email', address: 'Mark@MxrkDxnl.Com', type: 'Primary' },
      { label: 'Gmail', address: 'ferddanmark@gmail.com', type: 'Personal' },
      { label: 'Hotmail', address: 'mxrk.dxnl@hotmail.com', type: 'Secondary' },
      { label: 'Squirrel Mail (.Onion)', address: 'mxrk@morke.ru', type: 'Encrypted / Onion' },
    ],
    socials: [
      {
        name: 'GitHub',
        url: 'https://github.com/MxrkDxnl',
        handle: 'MxrkDxnl',
        category: 'Code & Repositories',
      },
      {
        name: 'LinkedIn',
        url: 'https://www.linkedin.com/in/mxrk-dxnl',
        handle: 'mxrk-dxnl',
        category: 'Professional Network',
      },
      {
        name: 'X (Twitter)',
        url: 'https://x.com/themarkdaniel_?s=11',
        handle: '@themarkdaniel_',
        category: 'Social / Tech',
      },
      {
        name: 'Instagram',
        url: 'https://www.instagram.com/mxrk.dxnl?psln=cDBlc2RlbHhydGUz&utm_source=qr',
        handle: '@mxrk.dxnl',
        category: 'Social',
      },
      {
        name: 'Facebook',
        url: 'https://www.facebook.com/share/1CcAWhu7uY/?mibextid=wwXIfr',
        handle: 'Mark Daniel',
        category: 'Social',
      },
      {
        name: 'Discord',
        url: 'https://discord.com/users/826119749783650345',
        handle: 'mxrk.dxnl',
        category: 'Chat & Community',
      },
      {
        name: 'Signal',
        url: 'https://signal.me/#eu/EiKpneA2YHWZs49nqeIZQJ5P8UGs10Z1YVgcN9aiiafIfqXRNn5F155lmSIhVvGk',
        handle: 'Mxrk.Dxnl.02',
        category: 'Secure Messenger',
      },
    ],
    cv: {
      available: true,
      url: '/cv.pdf',
      filename: 'Mark_Daniel_Ferdinandaz_CV.pdf',
    },
  },

  missingAssetsList: [
    'Altrium project screenshots',
    'Altrium demo and repository URLs (if public)',
    'Altrium authorship attribution confirmation',
    'Specific write-up notes and flags captured for DC 1–7 and CyberSploit labs',
  ],
};
