// Pentium Constructions — content library (sourced from pentiumconstructions.in)
// Some project details flagged "verify" on the live site; only public facts are used here.

export const BRAND = {
  name: "Pentium Constructions",
  legal: "Pentium Construction Pvt. Ltd.",
  since: 1994,
  tagline: "Responsible Building. Unmatched Craft.",
  sub: "Premium Living, Kerala",
  phone: "+91 9544 141 000",
  phoneHref: "tel:+919544141000",
  phoneUAE: "+971 56 724 1497",
  whatsapp: "https://wa.me/919544141000",
  salesEmail: "sales@pentiumconstructions.in",
  adminEmail: "admin@pentiumconstructions.in",
  emailHref: "mailto:sales@pentiumconstructions.in",
  adminPhone: "0495 - 2768946",
  address: "2nd Floor, Mananchira Tower, A.G. Road, Kozhikode, Kerala",
  branch: "1st Floor, Lucia Tower, Bypass Jn., Perinthalmanna - 679 322",
};

export const STATS = [
  { value: 2000, suffix: "+", label: "Happy Clients" },
  { value: 23, suffix: "+", label: "Projects Built" },
  { value: 3, suffix: "", label: "Active Projects" },
  { value: 1994, suffix: "", label: "Established", noPlus: true },
];

export const IMAGES = {
  hero: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600",
  apartment: "https://images.unsplash.com/photo-1624204386084-dd8c05e32226?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600",
  villa1: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600",
  villa2: "https://images.unsplash.com/photo-1721815693498-cc28507c0ba2?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600",
  villa3: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600",
  interior1: "https://images.unsplash.com/photo-1564078516393-cf04bd966897?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600",
  interior2: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600",
  interior3: "https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600",
};

// Projects. status: "ongoing" | "completed" (completed = delivered / ready to move)
export const PROJECTS = [
  {
    key: "project_harmony",
    name: "Pentium Harmony Heights",
    type: "Apartments",
    location: "Kerala",
    status: "ongoing",
    badge: "45% Complete",
    rera: true,
    blurb: "A landmark apartment development, currently rising and RERA certified. Book an early consultation to learn more.",
    image: IMAGES.apartment,
    gallery: [IMAGES.apartment, IMAGES.interior2, IMAGES.hero],
  },
  {
    key: "project_eternia",
    name: "Pentium Eternia Vertical Homes",
    type: "2 & 3 BHK High-Rise Apartments",
    location: "Karaparamba, near Eranhipalam, Calicut",
    status: "completed",
    badge: "Delivered",
    rera: true,
    blurb: "High-rise 2 & 3 BHK vertical homes in the heart of Calicut — delivered and part of the Pentium skyline.",
    image: IMAGES.hero,
    gallery: [IMAGES.hero, IMAGES.interior1, IMAGES.apartment],
  },
  {
    key: "project_tranquil",
    name: "Pentium Tranquil Vertical Home",
    type: "2 & 3 BHK Apartments · 28 units · G+4",
    location: "Nellikavu, near Eranhipalam, Calicut",
    status: "completed",
    badge: "Ready to Move",
    rera: true,
    blurb: "A calm, well-crafted G+4 residence of 28 homes — completed and ready to move in.",
    image: IMAGES.interior2,
    gallery: [IMAGES.interior2, IMAGES.apartment, IMAGES.interior3],
  },
  {
    key: "project_spring_green",
    name: "Pentium Spring Green Villas",
    type: "3, 4 & 5 BHK Villas",
    location: "Perinthalmanna, Malappuram",
    status: "completed",
    badge: "Delivered",
    rera: true,
    blurb: "Spacious 3, 4 & 5 BHK villas set in green surroundings at Perinthalmanna — delivered.",
    image: IMAGES.villa1,
    gallery: [IMAGES.villa1, IMAGES.villa3, IMAGES.interior1],
  },
  {
    key: "project_palm_grove",
    name: "Pentium Palm Grove",
    type: "2 BHK Apartments",
    location: "Padippura, Malappuram",
    status: "completed",
    badge: "Ready to Move",
    rera: true,
    blurb: "Thoughtfully planned 2 BHK apartments at Padippura — ready to move in.",
    image: IMAGES.interior1,
    gallery: [IMAGES.interior1, IMAGES.apartment, IMAGES.interior2],
  },
  {
    key: "project_civil_park",
    name: "Pentium Civil Park",
    type: "3 BHK Apartments",
    location: "Parammal, Calicut",
    status: "completed",
    badge: "Ready to Move",
    rera: true,
    blurb: "Comfortable 3 BHK apartments at Parammal, Calicut — ready to move in.",
    image: IMAGES.interior3,
    gallery: [IMAGES.interior3, IMAGES.interior2, IMAGES.hero],
  },
  {
    key: "project_aishwarya",
    name: "Pentium Aishwarya",
    type: "Premium Residences",
    location: "Kerala",
    status: "completed",
    badge: "Ready to Move",
    rera: true,
    blurb: "A ready-to-move Pentium residence. Speak to our team for full details and a site visit.",
    image: IMAGES.villa2,
    gallery: [IMAGES.villa2, IMAGES.villa3, IMAGES.interior1],
  },
];

export const PROJECT_OPTIONS = PROJECTS.map((p) => p.name).concat(["General enquiry", "Not sure yet"]);

export const SERVICES = [
  { name: "Residential Construction", desc: "Custom homes, villas and apartments." },
  { name: "Commercial Construction", desc: "Offices, retail and mixed-use developments." },
  { name: "Industrial Construction", desc: "Factories, warehouses and manufacturing facilities." },
  { name: "Turnkey Projects", desc: "Concept, design, construction and handover by one team." },
  { name: "Renovation & Remodeling", desc: "Structural upgrades, interior renovation and restoration." },
  { name: "Project Management", desc: "Scheduling, budgeting, quality oversight and site supervision." },
  { name: "Interior & Finishing", desc: "Flooring, painting, electrical, plumbing and finishing." },
];

export const DIFFERENTIATORS = [
  "Precision engineering to IS 800 standards",
  "Passive ventilation & climate-resilient layouts",
  "Premium teakwood & granite finish palette",
  "RERA-certified, transparent documentation",
  "On-time delivery track record",
  "Support that continues after handover",
];

export const WHY_PILLARS = [
  { title: "Advanced Facilities", desc: "Modern technology and infrastructure across every build." },
  { title: "World-Class Amenities", desc: "Swimming pools, gyms, clubhouses and landscaped gardens." },
  { title: "Spacious Rooms", desc: "Airy, generously sized apartments and villas." },
];

export const QUALITY_STAGES = [
  { title: "Planning", desc: "Scope review, design validation, resource planning, early risk ID." },
  { title: "Procurement", desc: "Approved vendors, on-site material inspection, certified materials." },
  { title: "Construction", desc: "Skilled crews, active supervision, process & safety checks." },
  { title: "Inspection", desc: "Structural & finishing checks plus a final client walkthrough." },
  { title: "Handover", desc: "Final review, documentation, completion report & satisfaction check." },
];

export const GO_GREEN = [
  "Energy-efficient design",
  "Water conservation",
  "Responsible waste management",
  "Eco-friendly materials",
  "Lower carbon footprint",
  "Green landscaping",
];

export const CSR = [
  "Education support",
  "Community development",
  "Health & wellness outreach",
  "Environmental conservation",
  "Employee volunteering",
  "Disaster relief",
  "Skill development & youth programmes",
];

export const LEADERSHIP = [
  { name: "Mr. V. Gopinathan", role: "Chairman & Managing Director" },
  { name: "Mr. V. Sethu Madhavan", role: "Director" },
];
