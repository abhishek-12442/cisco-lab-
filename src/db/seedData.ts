import type { SyllabusModule } from './schema.ts';

export interface SeedCourse {
  slug: string;
  title: string;
  shortDescription: string;
  overview: string;
  duration: string;
  level: string;
  schedule: string;
  feeNpr: string;
  imageKey: string;
  iconName: string;
  learningObjectives: string[];
  syllabus: SyllabusModule[];
  labInfo: string;
  certificationInfo: string;
  careerOpportunities: string[];
  featured: boolean;
  sortOrder: number;
}

export const INITIAL_COURSES: SeedCourse[] = [
  {
    slug: 'ccna-and-networking',
    title: 'CCNA & Networking',
    shortDescription:
      'Master enterprise routing, switching, VLANs, OSPF, BGP basics, and Cisco IOS configuration on physical lab racks.',
    overview:
      'Our flagship CCNA & Enterprise Networking program is built around Nepal’s ISP, banking, and corporate IT infrastructure requirements. Students spend over 75% of class hours configuring real Cisco Catalyst switches, ISR routers, and firewall appliances alongside Packet Tracer and EVE-NG enterprise topologies.',
    duration: '12 Weeks',
    level: 'Beginner to Intermediate',
    schedule: 'Morning (7:00 AM) · Day (11:00 AM) · Evening (5:30 PM)',
    feeNpr: 'NPR 22,000',
    imageKey: 'ccna-rack',
    iconName: 'Network',
    learningObjectives: [
      'Design and subnet IPv4 and IPv6 addressing schemes for multi-branch offices',
      'Configure VLANs, Trunking (802.1Q), EtherChannel, and Rapid Spanning Tree Protocol',
      'Implement static routing, OSPFv2 multi-area routing, and inter-VLAN routing',
      'Secure network infrastructure with Standard/Extended ACLs, NAT, DHCP snooping, and Port Security',
      'Troubleshoot live campus and ISP-style WAN connectivity issues using CLI diagnostics',
    ],
    syllabus: [
      {
        module: 'Module 01: Network Fundamentals & OSI Architecture',
        topics: [
          'OSI vs TCP/IP models, encapsulation, and physical cabling standards (Cat6, SFP Fiber)',
          'IPv4 binary math, VLSM subnetting, and IPv6 address planning',
          'Ethernet switching fundamentals and MAC address table operation',
        ],
      },
      {
        module: 'Module 02: Enterprise Switching & VLAN Design',
        topics: [
          'Cisco IOS CLI navigation, initial hardening, and SSH management',
          'VLAN segmentation, 802.1Q trunking, and Router-on-a-Stick',
          'STP, RSTP, LACP EtherChannel, and Layer-2 loop prevention',
        ],
      },
      {
        module: 'Module 03: Routing Protocols & WAN Services',
        topics: [
          'Static routes, floating static redundancy, and path selection',
          'Single and multi-area OSPFv2 configuration and neighbor troubleshooting',
          'NAT/PAT, DHCPv4 relay, NTP, Syslog, and SNMP monitoring',
        ],
      },
      {
        module: 'Module 04: Network Security, Wireless & Automation',
        topics: [
          'Access Control Lists (ACLs), DHCP snooping, Dynamic ARP Inspection',
          'Enterprise WLAN controller deployment and WPA3 security',
          'REST APIs, JSON, and introductory Ansible network automation',
        ],
      },
    ],
    labInfo:
      'Dedicated Cisco Lab Wing equipped with 18 physical Catalyst 2960/3750 switches, Cisco 2900/4321 ISR routers, MikroTik core routers, and high-RAM EVE-NG simulation workstations.',
    certificationInfo:
      'Prepares students directly for Cisco Certified Network Associate (CCNA 200-301) and awards the Himalaya NetTech Verified Network Engineer Completion Certificate.',
    careerOpportunities: [
      'Network Support Engineer (ISPs & Telecoms)',
      'NOC Technician / Operations Analyst',
      'Junior Network Administrator',
      'Campus Infrastructure Engineer',
    ],
    featured: true,
    sortOrder: 1,
  },
  {
    slug: 'computer-hardware-and-troubleshooting',
    title: 'Computer Hardware & Troubleshooting',
    shortDescription:
      'Hands-on desktop/laptop assembly, component-level diagnostics, BIOS/UEFI tuning, and OS deployment.',
    overview:
      'Designed for aspiring IT technicians, service center engineers, and technical support staff, this practical course covers complete PC architecture, laptop disassembly, multimeter testing, power supply diagnostics, RAID storage, and Windows/Linux workstation imaging.',
    duration: '8 Weeks',
    level: 'Beginner',
    schedule: 'Morning (7:30 AM) · Afternoon (2:00 PM)',
    feeNpr: 'NPR 14,500',
    imageKey: 'hardware-cctv',
    iconName: 'Cpu',
    learningObjectives: [
      'Assemble custom desktop workstations and diagnose POST beep/LED fault codes',
      'Test ATX power supplies, motherboard voltage rails, and storage health using multimeters',
      'Perform safe laptop chassis disassembly, thermal repasting, and RAM/NVMe upgrades',
      'Configure BIOS/UEFI, Secure Boot, GPT/MBR partitioning, and RAID arrays',
      'Execute OS deployment, driver troubleshooting, and data recovery workflows',
    ],
    syllabus: [
      {
        module: 'Module 01: Core PC Components & Architecture',
        topics: [
          'Motherboard chipsets, VRM power delivery, CPU sockets, and PCIe lanes',
          'DDR4/DDR5 memory channels, NVMe/SATA storage, and PSU wattage sizing',
          'ESD safety protocols and precision hardware toolkit handling',
        ],
      },
      {
        module: 'Module 02: Assembly, BIOS/UEFI & Storage',
        topics: [
          'Step-by-step workstation build, airflow optimization, and cable management',
          'UEFI firmware updates, fan curves, and hardware virtualization settings',
          'Disk partitioning, RAID 0/1/5 concepts, and SMART diagnostics',
        ],
      },
      {
        module: 'Module 03: Laptop Servicing & Component Diagnostics',
        topics: [
          'Laptop hinge, display panel, keyboard, and battery replacement',
          'Multimeter continuity and DC jack voltage testing',
          'Thermal management, dust remediation, and liquid-damage triage',
        ],
      },
      {
        module: 'Module 04: OS Deployment & Peripheral Integration',
        topics: [
          'Windows 11 / Ubuntu dual-boot installation and automated cloning',
          'Printer sharing, scanner drivers, and local office troubleshooting',
          'Customer ticketing etiquette and hardware warranty documentation',
        ],
      },
    ],
    labInfo:
      'Each student works at an individual ESD-protected workbench equipped with desktop training rigs, spare laptops, digital multimeters, POST diagnostic cards, and thermal stations.',
    certificationInfo:
      'Aligned with CompTIA A+ Core 1 (220-1101) hardware domains; includes practical bench examination and Institute Hardware Technician Certificate.',
    careerOpportunities: [
      'Computer Hardware Technician',
      'IT Service Center Engineer',
      'Desktop Support Specialist',
      'Hardware Procurement & QA Officer',
    ],
    featured: true,
    sortOrder: 2,
  },
  {
    slug: 'cctv-and-security-systems',
    title: 'CCTV & Security Systems',
    shortDescription:
      'Complete practical training in Analog HD, IP PoE surveillance cameras, NVR/DVR setup, and remote viewing.',
    overview:
      'Commercial buildings, schools, banks, and homes across Nepal rely heavily on reliable surveillance infrastructure. This intensive workshop teaches end-to-end CCTV design, structured Cat6 & coaxial cabling, PoE switching, NVR/VMS storage calculation, and mobile remote access.',
    duration: '6 Weeks',
    level: 'Beginner',
    schedule: 'Morning (8:00 AM) · Afternoon (3:00 PM)',
    feeNpr: 'NPR 15,000',
    imageKey: 'hardware-cctv',
    iconName: 'Camera',
    learningObjectives: [
      'Calculate camera focal lengths, blind spots, and HDD retention storage accurately',
      'Terminate BNC coaxial connectors, RJ45 Cat6 plugs, and weatherproof outdoor junctions',
      'Configure Hikvision/Dahua DVRs, PoE NVRs, and VLAN-isolated IP camera subnets',
      'Set up motion detection zones, line-crossing alerts, and P2P/DDNS remote viewing',
      'Troubleshoot power drops, IR night-vision glare, and NVR hard-drive faults',
    ],
    syllabus: [
      {
        module: 'Module 01: Surveillance Fundamentals & Site Survey',
        topics: [
          'HD-TVI/CVI analog vs IP PoE cameras, dome, bullet, and PTZ selection',
          'Lens sizing, lux ratings, WDR, and indoor/outdoor IP67 weatherproofing',
          'Site survey floor-plan marking and bill of quantities (BoQ) estimation',
        ],
      },
      {
        module: 'Module 02: Cabling, Power & Rack Termination',
        topics: [
          'Cat6 crimping (T568B), patch panels, and PoE injector/switch budgets',
          '12V DC centralized SMPS power distribution and surge protection',
          'Cable conduit routing and junction box waterproofing',
        ],
      },
      {
        module: 'Module 03: DVR/NVR Configuration & Networking',
        topics: [
          'Camera activation, static IP assignment, and ONVIF integration',
          'H.265+ bitrate tuning, RAID/HDD formatting, and scheduled recording',
          'Router port forwarding, VLAN isolation, and mobile app configuration',
        ],
      },
      {
        module: 'Module 04: Access Control & Live Field Project',
        topics: [
          'Biometric attendance & RFID door lock wiring overview',
          'Troubleshooting video loss, ground loops, and PoE link drops',
          'Full multi-camera lab installation assessment and handover checklist',
        ],
      },
    ],
    labInfo:
      'Live mounting wall featuring Hikvision and Dahua IP PoE cameras, 16-channel NVR, PoE managed switches, biometric door controllers, and cable testing analyzers.',
    certificationInfo:
      'Awards the Certified Surveillance & Security Systems Installer Credential upon completing a live 4-camera NVR installation test.',
    careerOpportunities: [
      'CCTV & Surveillance Installer',
      'Electronic Security Technician',
      'Building Automation Field Engineer',
      'Independent Surveillance Contractor',
    ],
    featured: true,
    sortOrder: 3,
  },
  {
    slug: 'cybersecurity',
    title: 'Cybersecurity',
    shortDescription:
      'Defensive security, network traffic inspection, ethical hacking fundamentals, SIEM monitoring, and hardening.',
    overview:
      'Built for network administrators and IT graduates entering Nepal’s fast-growing banking, FinTech, and SOC sectors. Learn how real attacks unfold inside isolated virtual ranges—and how to detect, contain, and harden Linux, Windows, and web systems against them.',
    duration: '14 Weeks',
    level: 'Intermediate',
    schedule: 'Morning (7:00 AM) · Evening (5:30 PM)',
    feeNpr: 'NPR 28,000',
    imageKey: 'cyber-linux',
    iconName: 'ShieldCheck',
    learningObjectives: [
      'Perform authorized network reconnaissance, vulnerability scanning, and risk prioritization',
      'Inspect malicious TCP/UDP sessions and HTTP payloads using Wireshark and tcpdump',
      'Configure host and perimeter firewalls, VPN tunnels, and Wazuh/ELK SIEM log alerts',
      'Identify OWASP Top 10 web vulnerabilities and apply secure server configurations',
      'Execute structured incident response triage and write executive remediation reports',
    ],
    syllabus: [
      {
        module: 'Module 01: Security Foundations & Threat Landscape',
        topics: [
          'CIA triad, MITRE ATT&CK framework, and Nepal Cyber Law compliance',
          'Cryptography essentials: TLS/SSL, PKI certificates, and hashing',
          'Isolated virtual lab setup with Kali Linux, Security Onion, and target VMs',
        ],
      },
      {
        module: 'Module 02: Network Security & Packet Analysis',
        topics: [
          'Nmap scanning techniques, service enumeration, and port hardening',
          'Wireshark protocol dissection and detecting ARP/DNS anomalies',
          'Firewall rule design (pfSense/iptables) and IPSec/WireGuard VPNs',
        ],
      },
      {
        module: 'Module 03: Web & System Vulnerability Assessment',
        topics: [
          'OWASP Top 10: SQL injection, XSS, broken access control, and CSRF',
          'Burp Suite interception and secure API/authentication testing',
          'Linux & Active Directory privilege escalation defense',
        ],
      },
      {
        module: 'Module 04: SOC Operations & Incident Response',
        topics: [
          'Centralized log collection and SIEM correlation rules',
          'Phishing triage, malware sandbox indicators, and containment playbooks',
          'Capstone Blue/Red defense exercise and audit report presentation',
        ],
      },
    ],
    labInfo:
      'Segmented Cyber Range server running isolated vulnerable targets, pfSense perimeter firewalls, and Wazuh SIEM collectors.',
    certificationInfo:
      'Maps directly to CompTIA Security+ (SY0-701) and Junior Penetration Tester / SOC Level 1 competencies.',
    careerOpportunities: [
      'SOC Analyst (Tier 1 / Tier 2)',
      'Information Security Officer',
      'Junior Penetration Tester',
      'Network Security Administrator',
    ],
    featured: true,
    sortOrder: 4,
  },
  {
    slug: 'linux-administration',
    title: 'Linux Administration',
    shortDescription:
      'Enterprise RHEL/Ubuntu server administration, bash scripting, systemd, storage LVM, and Docker containers.',
    overview:
      'Nearly every ISP core service, cloud VM, and web backend in Nepal runs on Linux. This course transforms beginners into confident Linux system administrators capable of managing production servers, automating backups, configuring Nginx/Apache, and deploying containerized apps.',
    duration: '10 Weeks',
    level: 'Beginner to Intermediate',
    schedule: 'Morning (7:30 AM) · Evening (6:00 PM)',
    feeNpr: 'NPR 19,500',
    imageKey: 'cyber-linux',
    iconName: 'Terminal',
    learningObjectives: [
      'Navigate the Linux filesystem, permissions, ACLs, and process management fluently via CLI',
      'Manage LVM logical volumes, ext4/xfs filesystems, and automated rsync/tar backups',
      'Configure systemd services, cron jobs, journalctl logging, and SSH key authentication',
      'Deploy Nginx/Apache virtual hosts, MariaDB/PostgreSQL, DNS (Bind), and firewalld',
      'Write practical Bash scripts and run Docker/Docker Compose production stacks',
    ],
    syllabus: [
      {
        module: 'Module 01: Linux Core, Shell & Permissions',
        topics: [
          'Ubuntu Server & AlmaLinux/RHEL installation and boot process',
          'File hierarchy, chmod/chown, SUID/SGID, and sudoers policy',
          'Text processing with grep, awk, sed, vim, and pipes',
        ],
      },
      {
        module: 'Module 02: Storage, Processes & Networking',
        topics: [
          'Partitioning, LVM volume groups, swap tuning, and fstab mounts',
          'systemd unit files, journald troubleshooting, and htop/iostat metrics',
          'Netplan/nmcli networking, ss/ip diagnostics, and UFW/firewalld',
        ],
      },
      {
        module: 'Module 03: Production Services & Hardening',
        topics: [
          'OpenSSH hardening, Fail2ban, and SELinux/AppArmor basics',
          'Nginx reverse proxy, Let’s Encrypt TLS certificates, and PHP-FPM/Node',
          'PostgreSQL/MySQL administration and automated off-site backups',
        ],
      },
      {
        module: 'Module 04: Bash Scripting & Containers',
        topics: [
          'Bash variables, loops, conditionals, and health-check automation scripts',
          'Docker images, volumes, networks, and multi-container Compose stacks',
          'Capstone: Deploy a secured, reverse-proxied web application server',
        ],
      },
    ],
    labInfo:
      'Dedicated virtualization nodes running AlmaLinux 9 and Ubuntu 24.04 LTS lab VMs accessible both in-class and over VPN.',
    certificationInfo:
      'Covers Red Hat RHCSA (EX200) and LPIC-1 administration objectives with practical terminal-only final exam.',
    careerOpportunities: [
      'Linux System Administrator',
      'Junior DevOps / Cloud Engineer',
      'ISP Server Operations Engineer',
      'Site Reliability Support Technician',
    ],
    featured: true,
    sortOrder: 5,
  },
  {
    slug: 'python-programming',
    title: 'Python Programming',
    shortDescription:
      'Clean Python software engineering, OOP, APIs, network/task automation, and SQL database integration.',
    overview:
      'From software development to network automation and data processing, Python is the most versatile language in Nepal’s tech industry. This hands-on course starts from programming fundamentals and progresses to building real REST APIs, database-backed tools, and automation scripts.',
    duration: '10 Weeks',
    level: 'Beginner',
    schedule: 'Day (11:00 AM) · Afternoon (2:30 PM) · Evening (5:30 PM)',
    feeNpr: 'NPR 18,000',
    imageKey: 'cyber-linux',
    iconName: 'Code2',
    learningObjectives: [
      'Write clean, modular Python 3 code using functions, data structures, and comprehensions',
      'Apply Object-Oriented Programming (classes, inheritance, dataclasses) to real projects',
      'Interact with JSON/CSV files, REST APIs, and PostgreSQL/SQLite databases',
      'Automate system tasks and network device backups using Paramiko/Netmiko',
      'Build and test a complete backend service with FastAPI or Flask and Git workflows',
    ],
    syllabus: [
      {
        module: 'Module 01: Python Foundations & Problem Solving',
        topics: [
          'Variables, control flow, loops, and functions with type hints',
          'Lists, tuples, sets, dictionaries, and string manipulation',
          'Virtual environments (venv), pip, and Git version control',
        ],
      },
      {
        module: 'Module 02: File I/O, Errors & OOP',
        topics: [
          'Exception handling, logging, and modular package structure',
          'Classes, objects, encapsulation, and clean code patterns',
          'Working with JSON, CSV, and Excel automation reports',
        ],
      },
      {
        module: 'Module 03: APIs, Databases & Automation',
        topics: [
          'Consuming external REST APIs with requests/httpx',
          'SQL fundamentals and Python database connectivity',
          'Automating SSH/network backups and scheduled CLI utilities',
        ],
      },
      {
        module: 'Module 04: Web Backends & Capstone Project',
        topics: [
          'Building structured REST API endpoints with FastAPI',
          'Unit testing with pytest and environment configuration',
          'Capstone project demo and GitHub portfolio review',
        ],
      },
    ],
    labInfo:
      'Modern dual-display coding lab with VS Code, Python 3.12, PostgreSQL sandboxes, and Git repository workflows.',
    certificationInfo:
      'Prepares for Python Institute PCAP certification and awards the Himalaya NetTech Python Developer Certificate.',
    careerOpportunities: [
      'Junior Python Developer',
      'Network Automation Engineer',
      'Backend API Developer',
      'QA Automation Engineer',
    ],
    featured: true,
    sortOrder: 6,
  },
  {
    slug: 'web-development',
    title: 'Web Development',
    shortDescription:
      'Full-stack web engineering with semantic HTML5, modern CSS/Tailwind, TypeScript, React, Node.js, and SQL.',
    overview:
      'Designed to take learners from zero code to deploying production-grade responsive web applications. You will master semantic markup, accessible UI design, modern JavaScript/TypeScript, React frontends, and Express/Node.js backends connected to relational SQL databases.',
    duration: '14 Weeks',
    level: 'Beginner to Intermediate',
    schedule: 'Morning (7:00 AM) · Day (11:30 AM) · Evening (5:30 PM)',
    feeNpr: 'NPR 24,000',
    imageKey: 'classroom-training',
    iconName: 'Globe',
    learningObjectives: [
      'Craft responsive, WCAG-accessible interfaces with HTML5, Tailwind CSS, and CSS Grid/Flexbox',
      'Build interactive client state and asynchronous data flows in JavaScript & React',
      'Develop RESTful Express/Node.js APIs with validation and authentication',
      'Design normalized relational SQL schemas and write safe database queries',
      'Deploy full-stack projects with clean Git workflows and production build pipelines',
    ],
    syllabus: [
      {
        module: 'Module 01: Semantic HTML5, CSS3 & Responsive UI',
        topics: [
          'Semantic document structure, SEO metadata, and forms',
          'Flexbox, CSS Grid, Tailwind CSS utility architecture',
          'Mobile-first breakpoints and responsive component patterns',
        ],
      },
      {
        module: 'Module 02: Modern JavaScript & TypeScript',
        topics: [
          'DOM manipulation, ES modules, async/await, and Fetch API',
          'TypeScript interfaces, strict types, and clean error handling',
          'Client-side form validation and state management',
        ],
      },
      {
        module: 'Module 03: React Component Architecture',
        topics: [
          'Hooks (useState, useEffect, useMemo), routing, and reusable layouts',
          'Integrating REST APIs, loading states, and admin dashboards',
          'Performance optimization and clean bundle builds',
        ],
      },
      {
        module: 'Module 04: Node.js, SQL Databases & Deployment',
        topics: [
          'Express routing, middleware, and JWT/session authentication',
          'Relational database modeling, CRUD APIs, and security hygiene',
          'Production deployment, reverse proxy setup, and portfolio capstone',
        ],
      },
    ],
    labInfo:
      'Dedicated software studio workstations with Node.js, PostgreSQL, Docker, and live staging deployment sandboxes.',
    certificationInfo:
      'Portfolio-reviewed Full-Stack Web Developer Diploma from Himalaya NetTech Institute.',
    careerOpportunities: [
      'Frontend React Developer',
      'Full-Stack JavaScript Developer',
      'Web Application Engineer',
      'Freelance Software Consultant',
    ],
    featured: true,
    sortOrder: 7,
  },
  {
    slug: 'it-support-and-system-administration',
    title: 'IT Support & System Administration',
    shortDescription:
      'Windows Server Active Directory, Microsoft 365, office networking, backup strategy, and helpdesk operations.',
    overview:
      'Every bank, NGO, hospital, and corporate office in Nepal needs dependable System Administrators to keep workstations, Active Directory domains, printers, Wi-Fi, and backups running smoothly. This job-ready course bridges hardware, networking, and enterprise Windows/Linux administration.',
    duration: '10 Weeks',
    level: 'Beginner to Intermediate',
    schedule: 'Day (11:00 AM) · Evening (5:30 PM)',
    feeNpr: 'NPR 20,000',
    imageKey: 'hero-lab',
    iconName: 'Server',
    learningObjectives: [
      'Deploy and manage Windows Server Active Directory, Group Policy (GPO), DNS, and DHCP',
      'Administer user onboarding, NTFS file server permissions, and print servers',
      'Configure office routers, dual-WAN failover, and enterprise guest/staff Wi-Fi',
      'Implement 3-2-1 backup policies, NAS storage, and disaster recovery drills',
      'Operate ITIL-aligned helpdesk ticketing and SLA troubleshooting workflows',
    ],
    syllabus: [
      {
        module: 'Module 01: Enterprise Helpdesk & Office Networking',
        topics: [
          'Structured office LAN cabling, MikroTik/Ubiquiti router basics',
          'TCP/IP troubleshooting, DNS resolution, and VPN client support',
          'SLA ticketing workflows and remote desktop support tools',
        ],
      },
      {
        module: 'Module 02: Windows Server & Active Directory',
        topics: [
          'Domain Controller promotion, Organizational Units (OUs), and user lifecycle',
          'Group Policy Objects (GPO) for security baselines and mapped drives',
          'Windows DNS, DHCP failover, and WSUS patch management',
        ],
      },
      {
        module: 'Module 03: Cloud Identity, Email & File Storage',
        topics: [
          'Microsoft 365 / Google Workspace admin essentials and SPF/DKIM/DMARC',
          'Synology/TrueNAS SMB shares, quotas, and NTFS permissions',
          'Endpoint antivirus management and BitLocker disk encryption',
        ],
      },
      {
        module: 'Module 04: Virtualization, Backups & Disaster Recovery',
        topics: [
          'VMware ESXi / Proxmox VE server virtualization lab',
          'Automated Veeam/image backups and bare-metal recovery testing',
          'Capstone corporate office infrastructure simulation',
        ],
      },
    ],
    labInfo:
      'Multi-server Proxmox & Windows Server rack environment simulating a 50-user corporate branch network.',
    certificationInfo:
      'Aligned with Google IT Support & CompTIA Server+ operational workflows; includes System Administrator Practical Credential.',
    careerOpportunities: [
      'IT Support Officer (NGOs / INGOs / Banks)',
      'Junior System Administrator',
      'Desktop & Network Operations Specialist',
      'Corporate IT Coordinator',
    ],
    featured: true,
    sortOrder: 8,
  },
];

export interface SeedBlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  category: string;
  tags: string[];
  status: 'published' | 'draft';
  authorName: string;
}

export const INITIAL_BLOG_POSTS: SeedBlogPost[] = [
  {
    slug: 'building-a-networking-career-in-nepal-2026',
    title: 'How to Build a High-Growth Networking Career in Nepal’s ISP & Banking Sectors',
    excerpt:
      'From fiber rollouts across all 77 districts to banking core infrastructure, discover the practical CCNA and Linux skills Nepali employers actually test during technical interviews.',
    content: `Nepal’s internet service providers, commercial banks, and enterprise cloud teams have rapidly modernized their core networks over the past five years. Today, employers in Kathmandu, Pokhara, and Biratnagar rarely hire based on memorized textbook definitions alone—they evaluate whether a candidate can troubleshoot a live BGP/OSPF flap, isolate a VLAN loop, or trace packet loss on a Linux host.

At Himalaya NetTech Institute, our placement team works directly with NOC managers and senior systems engineers. Three practical habits consistently separate hired graduates from the rest:

1. Physical Rack Fluency Over Slide Decks
Simulators are essential for exploring large topologies, yet nothing replaces plugging console cables into real switches, recovering corrupted IOS images, and verifying SFP fiber uplinks. Every student in our Putalisadak lab completes timed hardware rack drills before graduation.

2. Pairing Cisco Networking with Linux Fundamentals
Modern ISP and enterprise networks rely heavily on Linux-based monitoring (Zabbix, LibreNMS, Grafana), DNS resolvers, and jump hosts. Combining CCNA routing & switching with Linux CLI fluency makes junior candidates immediately productive on Day 1.

3. Documenting Real Troubleshooting Scenarios
During technical interviews, walk interviewers through structured root-cause steps: Layer 1 physical checks, MAC/ARP tables, routing tables, and packet captures. Clean documentation and calm methodology are what employers trust most.`,
    featuredImage: 'ccna-rack',
    category: 'Career Guide',
    tags: ['CCNA', 'Networking', 'Nepal IT Jobs', 'ISP'],
    status: 'published',
    authorName: 'Er. Ramesh Adhikari',
  },
  {
    slug: 'ip-poe-cctv-vs-analog-hd-guide-for-nepal-businesses',
    title: 'IP PoE vs Analog HD CCTV: Technical Comparison for Commercial Installations in Nepal',
    excerpt:
      'Choosing the right surveillance architecture requires balancing cable distance, low-light clarity, NVR retention, and power backup during voltage fluctuations.',
    content: `When designing surveillance systems for clinics, retail showrooms, schools, or warehouses in Nepal, installers frequently weigh cost-effective Analog HD (TVI/CVI) against scalable IP PoE architectures.

Analog HD systems remain budget-friendly for small 4-to-8 camera shops where coaxial runs are already installed. However, IP PoE systems have become the standard for new commercial projects because a single Cat6 cable carries both data and power from a central UPS-backed PoE switch.

Key Engineering Considerations:
- Power Resilience: Pairing a central managed PoE switch with a pure-sine-wave inverter ensures cameras stay online during brief power interruptions.
- Network Segmentation: Always place IP cameras and NVRs on a dedicated surveillance VLAN isolated from guest Wi-Fi traffic.
- Storage Retention Math: Switching from H.264 to H.265+ encoding cuts bandwidth and hard-drive storage requirements by up to 45%, letting a 4TB surveillance HDD store 30+ days of crisp 4MP footage.

In our 6-week CCTV & Security Systems course, trainees wire, crimp, configure, and troubleshoot both Analog HD and PoE NVR racks in realistic site simulations.`,
    featuredImage: 'hardware-cctv',
    category: 'Technical Guide',
    tags: ['CCTV', 'PoE', 'Security Systems', 'NVR'],
    status: 'published',
    authorName: 'Sujan Maharjan',
  },
  {
    slug: 'top-linux-commands-every-junior-sysadmin-must-master',
    title: '10 Essential Linux Diagnostic Workflows Every Junior Sysadmin Should Master',
    excerpt:
      'Move beyond basic file navigation—learn the exact networking, disk, and systemd commands senior engineers use to diagnose production Linux servers in minutes.',
    content: `When a production web server slows down or a service stops responding, guessing wastes valuable uptime. Junior system administrators who follow a disciplined diagnostic workflow resolve incidents cleanly and safely.

Here are the core diagnostic commands practiced weekly in our Linux Administration lab:
- ss -tulpn: Inspect listening TCP/UDP sockets and identify which process owns each port.
- journalctl -u nginx --since "15 minutes ago": Read structured systemd service logs without hunting across scattered files.
- df -h & lsblk: Verify mounted partitions and confirm disk space exhaustion isn’t blocking database writes.
- ip route & mtr: Trace packet paths and spot latency spikes between gateway hops.
- lsof +L1: Catch deleted-but-open log files silently consuming disk space.

Understanding what each output column means—and practicing on real AlmaLinux and Ubuntu servers—prepares you for both RHCSA exams and live NOC responsibilities.`,
    featuredImage: 'cyber-linux',
    category: 'Linux & Cloud',
    tags: ['Linux', 'SysAdmin', 'Troubleshooting', 'CLI'],
    status: 'published',
    authorName: 'Prakash Gurung',
  },
  {
    slug: 'winter-intake-admissions-scholarship-announcement',
    title: 'Admissions Open for New Morning, Day & Evening Batches — Practical Lab Scholarships Available',
    excerpt:
      'Registration is now open at our Putalisadak campus for CCNA, Cybersecurity, Linux, Hardware & CCTV, Python, and Web Development cohorts.',
    content: `Himalaya NetTech Institute is welcoming new applicants for our upcoming Morning, Day, and Evening technical cohorts at Putalisadak, Kathmandu.

To ensure personalized rack and workstation access for every learner, each batch is strictly capped at 16 students. Every enrolled trainee receives:
- Dedicated workstation and shared physical Cisco/Linux/CCTV lab hours
- Printable PDF lab manuals and structured weekly assignments
- Student Portal access for attendance, grades, and verifiable completion certificates
- Mock technical interviews and CV workshops during the final two weeks

Merit-based partial lab scholarships are available for engineering and IT students from outside the Kathmandu Valley. Visit our Admissions Desk or submit the online Enrollment Form to book a free counseling and lab tour session.`,
    featuredImage: 'classroom-training',
    category: 'Institute News',
    tags: ['Admissions', 'Kathmandu', 'Scholarships', 'New Batch'],
    status: 'published',
    authorName: 'Admissions Office',
  },
];

export interface SeedGalleryItem {
  title: string;
  category: string;
  caption: string;
  imageKey: string;
}

export const INITIAL_GALLERY_ITEMS: SeedGalleryItem[] = [
  {
    title: 'Cisco Catalyst & ISR Core Lab Rack',
    category: 'Networking Lab',
    caption: '18-port enterprise switching and routing racks wired with Cat6 patch panels for CCNA labs.',
    imageKey: 'ccna-rack',
  },
  {
    title: 'Dual-Monitor Linux & Cyber Range Studio',
    category: 'Computer Lab',
    caption: 'Workstations configured with isolated security VMs, Wireshark packet analyzers, and Python IDEs.',
    imageKey: 'cyber-linux',
  },
  {
    title: 'ESD Hardware & IP Surveillance Workbench',
    category: 'CCTV Training',
    caption: 'Anti-static benches with PoE IP dome cameras, NVR units, multimeters, and motherboard test rigs.',
    imageKey: 'hardware-cctv',
  },
  {
    title: 'Guided Topology & CLI Lab Session',
    category: 'Practical Classes',
    caption: 'Instructor walking trainees through live OSPF neighbor troubleshooting on dual displays.',
    imageKey: 'hero-lab',
  },
  {
    title: 'Evening Full-Stack & Python Cohort',
    category: 'Students',
    caption: 'University and working students collaborating on backend API and database projects.',
    imageKey: 'classroom-training',
  },
  {
    title: 'Campus Networking Workshop & Career Fair',
    category: 'Events',
    caption: 'Technical Q&A session with senior ISP and banking infrastructure engineers in Kathmandu.',
    imageKey: 'hero-lab',
  },
  {
    title: 'Cohort Graduation & Certificate Ceremony',
    category: 'Certificate Distribution',
    caption: 'Graduating CCNA and System Administration trainees completing practical lab assessments.',
    imageKey: 'classroom-training',
  },
];

export const INITIAL_MATERIALS = [
  {
    courseTitle: 'CCNA & Networking',
    title: 'IPv4 VLSM Subnetting & Route Summarization Workbook (PDF)',
    materialType: 'PDF Notes',
    dueDate: null,
    description: 'Step-by-step binary subnetting charts, CIDR prefix tables, and 25 practice scenarios.',
    contentMarkdown: `# IPv4 VLSM Subnetting & Route Summarization Workbook

## 1. Quick Prefix Reference
- /24 = 255.255.255.0 (254 usable hosts)
- /25 = 255.255.255.128 (126 usable hosts)
- /26 = 255.255.255.192 (62 usable hosts)
- /27 = 255.255.255.224 (30 usable hosts)
- /28 = 255.255.255.240 (14 usable hosts)
- /30 = 255.255.255.252 (2 usable hosts — Point-to-Point links)

## 2. Lab Topology Rules
1. Always allocate the largest host subnet first to avoid overlapping address ranges.
2. Reserve /30 or /31 blocks for router-to-router serial and Ethernet uplinks.
3. Verify reachability with \`show ip route\` and \`ping\` across loopback interfaces.`,
  },
  {
    courseTitle: 'CCNA & Networking',
    title: 'Lab 04: Multi-Area OSPFv2 & Inter-VLAN Routing Assignment',
    materialType: 'Assignment',
    dueDate: '2026-11-28',
    description: 'Configure Router-on-a-Stick with VLAN 10/20/30 and advertise subnets in OSPF Area 0.',
    contentMarkdown: `# Lab 04 Assignment: Inter-VLAN + OSPFv2

## Objectives
- Create VLAN 10 (Staff), VLAN 20 (Engineering), and VLAN 99 (Management) on Switch SW1.
- Configure 802.1Q trunking on interface G0/1 toward Router R1.
- Establish OSPFv2 neighbor adjacency between R1 and R2 over 10.0.12.0/30.

## Submission Requirements
Upload your running-config verification output and \`show ip ospf neighbor\` capture before the due date.`,
  },
  {
    courseTitle: 'Linux Administration',
    title: 'Systemd, LVM Storage & Nginx Hardening Lab Manual',
    materialType: 'Lab Guide',
    dueDate: null,
    description: 'Production checklist for creating LVM volumes, UFW rules, and TLS reverse proxies.',
    contentMarkdown: `# Systemd, LVM Storage & Nginx Hardening Guide

## Key Commands
- \`pvcreate /dev/sdb && vgcreate vg_data /dev/sdb\`
- \`lvcreate -L 20G -n lv_web vg_data\`
- \`systemctl enable --now nginx\`
- \`ufw allow 'Nginx Full' && ufw enable\`

Always test configuration syntax using \`nginx -t\` before reloading the service.`,
  },
  {
    courseTitle: 'Cybersecurity',
    title: 'Wireshark TCP Handshake & HTTP Payload Inspection Lab',
    materialType: 'PDF Notes',
    dueDate: null,
    description: 'Filter expressions and anomaly indicators for SOC Tier-1 packet triage.',
    contentMarkdown: `# Wireshark Packet Triage Cheat Sheet

## Essential Display Filters
- \`tcp.flags.syn == 1 && tcp.flags.ack == 0\` — Identify SYN flood or port scan sweeps
- \`dns.flags.rcode != 0\` — Spot NXDOMAIN or DNS tunneling anomalies
- \`http.request.method == "POST"\` — Inspect form and API payload submissions`,
  },
];

export const INITIAL_ANNOUNCEMENTS = [
  {
    title: 'Weekend Open Lab Hours Extended Until 6:00 PM',
    body: 'Students enrolled in CCNA, Linux, and Cybersecurity batches may book additional physical rack hours on Fridays and Sundays at the Putalisadak Lab Desk.',
    targetGroup: 'All Students',
  },
  {
    title: 'NOC Technical Interview Prep Workshop — Next Wednesday',
    body: 'Senior Network Engineers from Kathmandu ISPs will conduct mock CLI troubleshooting interviews for graduating networking and system administration students.',
    targetGroup: 'Graduating Cohorts',
  },
];
