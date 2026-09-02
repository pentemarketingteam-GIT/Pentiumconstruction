// School of Play — content inventory (source of truth)
// All copy drawn only from the supplied content inventory. Nothing invented.

export const CONTACT = {
  phone: "0161 726 5022",
  phoneHref: "tel:01617265022",
  email: "info@schoolofplay.org.uk",
  emailHref: "mailto:info@schoolofplay.org.uk",
  address: "Warren Bruce Court, Warren Bruce Road, Trafford Park, M17 1LB",
  bookingUrl: "https://schoolofplay.ipalbookings.com/",
};

export const SERVICE_OPTIONS = [
  "Wraparound Care",
  "Holiday Camps",
  "Sports Provision / PE",
  "Extra-Curricular Sports Classes",
  "Other",
];

export const AUDIENCE_OPTIONS = ["Parent", "School", "Other"];

export const NAV = {
  parents: {
    label: "Parents",
    to: "/parents",
    links: [
      { label: "Holiday Camps", to: "/parents/holiday-camps" },
      { label: "Before & After School Clubs", to: "/parents/clubs" },
      { label: "Sports Classes", to: "/parents/sports-classes" },
      { label: "How To Book", to: "/parents/how-to-book" },
      { label: "Holiday Camp FAQs & Pricing", to: "/parents/faqs" },
    ],
  },
  schools: {
    label: "Schools",
    to: "/schools",
    links: [
      { label: "PE & Sports Provision", to: "/schools/pe" },
      { label: "Swim:ED", to: "/schools/swim-ed" },
      { label: "Before & After School Clubs", to: "/schools/clubs" },
      { label: "Game, Set & MATHS", to: "/schools/game-set-maths" },
      { label: "Extra-Curricular Clubs", to: "/schools/extra-curricular" },
      { label: "Sports Tournaments", to: "/schools/tournaments" },
    ],
  },
  about: {
    label: "About",
    to: "/about",
    links: [
      { label: "Why Choose Us", to: "/about" },
      { label: "Meet the Team", to: "/team" },
    ],
  },
};

export const IMAGES = {
  heroKids: "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368",
  soccer: "https://images.pexels.com/photos/296302/pexels-photo-296302.jpeg",
  running: "https://images.pexels.com/photos/2539281/pexels-photo-2539281.jpeg",
  playground: "https://images.pexels.com/photos/5275836/pexels-photo-5275836.jpeg",
  handInHand: "https://images.unsplash.com/photo-1769288884665-61351d4387ff",
  parachute: "https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5",
  peLesson: "https://images.unsplash.com/photo-1706841534379-95682aac32d4?crop=entropy&cs=srgb&fm=jpg&q=85",
  swimGroup: "https://images.unsplash.com/photo-1651614158095-b98b6c1da74b?crop=entropy&cs=srgb&fm=jpg&q=85",
  swimGirl: "https://images.unsplash.com/photo-1574744918163-6cef6f4a31b0?crop=entropy&cs=srgb&fm=jpg&q=85",
  tournament: "https://images.unsplash.com/photo-1622659097509-4d56de14539e?crop=entropy&cs=srgb&fm=jpg&q=85",
};

export const HOME = {
  campaign: {
    badge: "Summer Bookings Now Live",
    title: "Summer Camp 2026 — Summer of Nations",
    blurb:
      "WOW activities, inflatables, multi-sports, crafts, games, friendships and feel-good memories.",
    ctas: [
      { label: "Reserve Your Spot Today", type: "book" },
      { label: "Activity Timetables", to: "/parents/holiday-camps" },
    ],
    note: "Read the new Ofsted report",
  },
  parentProps: [
    "Holiday and after-school care centred on active days, friendships and qualified staff.",
    "Free first day / first-day guarantee offer.",
    '“Can I Go Back?” Guarantee: unhappy children can receive a refund for the relevant day and booked sessions.',
  ],
  programmes: [
    { title: "Engaging Holiday Camps", to: "/parents/holiday-camps", color: "coral" },
    { title: "Reliable Before & After School Care", to: "/parents/clubs", color: "blue" },
    { title: "PE / School Provision", to: "/schools/pe", color: "green" },
    { title: "Swim:ED", to: "/schools/swim-ed", color: "sky" },
    { title: "School Partnerships", to: "/schools", color: "purple" },
  ],
  venues: [
    "Chorlton", "Branwood (Monton)", "Urmston", "St Hugh's (Timperley)",
    "Prestbury (Macclesfield)", "Broadheath (Altrincham)", "Templemoor (Sale)",
    "Oak Tree (Cheadle)", "St Michael's CE (Flixton)", "Button Lane HAF (Wythenshawe)",
  ],
  benefits: [
    { title: "On-site convenience", icon: "MapPin" },
    { title: "Flexible bookings", icon: "CalendarCheck" },
    { title: "Fun and learning", icon: "Sparkles" },
    { title: "Qualified childcare professionals", icon: "ShieldCheck" },
    { title: "Healthy snacks", icon: "Apple" },
  ],
  schoolProp:
    "School of Play positions its programmes as a way to reduce staffing and administrative pressure while supporting pupil wellbeing, activity and learning.",
};

export const HOLIDAY_CAMPS = {
  campaignTitle: "Summer of Nations",
  campaignBlurb:
    "Country-themed sports, creative challenges, games and WOW experiences.",
  safety: "A 100% pass rate across Ofsted inspections for our holiday-camp settings.",
  locations: [
    "Urmston", "Chorlton", "Davyhulme", "Eccles", "Altrincham", "Timperley",
    "Sale", "Macclesfield", "Cheadle", "Flixton", "Wythenshawe", "Reddish",
  ],
  createGroups: {
    ages: "ages 3.5–11",
    items: [
      "Arts & crafts", "Science experiments", "Food creation", "Theme workshops",
      "Character visits", "Outdoor activities", "Nature trails", "Construction play",
      "Imaginative play",
    ],
  },
  multiSports: {
    ages: "ages 5–11",
    items: [
      "Football", "Dodgeball", "Hockey", "Archery", "Kwik-cricket", "Mini-tennis",
      "Tri-golf", "Rounders", "Kickball", "Badminton", "Volleyball", "Disc golf",
      "Lacrosse", "Athletics", "Basketball", "Hoopball", "Ultimate frisbee",
      "Netball", "Skittleball",
    ],
  },
  whatToBring: [
    "Packed lunch", "Morning and afternoon snacks", "Drink",
    "Weather-appropriate clothing", "Suitable footwear", "Sun lotion in summer",
    "Required medication where applicable",
  ],
  whatNotToBring: [
    "Nuts / nut-containing foods", "Sesame-containing foods", "Whole grapes",
    "Phones, tablets or electronic devices", "Toys",
  ],
};

export const FAQS = [
  { q: "How much does a day cost?", a: "Published price range: approximately £25.49–£30.49 per day, depending on venue." },
  { q: "Are early drop-off and late collection available?", a: "Yes — early drop-off and late collection are available for an additional charge." },
  { q: "What are the standard hours?", a: "Standard hours are 09:00–17:00. Early drop-off from 08:00 and late collection until 18:00." },
  { q: "Can I book half days?", a: "Full-day sessions only." },
  { q: "What ages do you cater for?", a: "Create groups: ages 3 years 6 months–11. Sports groups: ages 5–11." },
  { q: "Does my child need to be toilet trained?", a: "Yes, children must be toilet trained." },
  { q: "Do you accept childcare vouchers?", a: "Yes, childcare vouchers are accepted." },
];

export const HOW_TO_BOOK = [
  "How to use the iPal booking system",
  "Add a child to an account",
  "Pay monthly",
  "Book and pay with childcare vouchers",
  "Pay by card",
  "Find and pay an outstanding payment",
  "Cancel a booked day",
];

export const CLUBS_PARENTS = {
  proposition:
    "Ofsted-registered before and after-school clubs across Greater Manchester, focused on active bodies, creative minds, new skills and memorable experiences.",
  locations: ["Urmston", "Davyhulme", "Prestbury", "Stretford", "Wythenshawe", "Rusholme"],
  activities: ["Sports", "Creative projects", "Workshops", "Special experiences"],
};

export const CLUBS_SCHOOLS = {
  positioning: "Wraparound care tailored to each school community.",
  benefits: [
    "Remove staffing headaches", "Reduce pressure on teaching staff",
    "Enriching activities", "Support school reputation",
    "Ofsted-approved provision", "Online booking management",
  ],
  activities: [
    "Multi-sports", "Glow-in-the-dark games", "Science experiments",
    "Arts & crafts", "Fencing", "Radio-controlled cars", "Laser tag",
  ],
};

export const SCHOOLS = {
  services: [
    { title: "Before & After School Clubs", to: "/schools/clubs", icon: "Sunrise" },
    { title: "PE, School Sport & Physical Activity", to: "/schools/pe", icon: "Dumbbell" },
    { title: "Swim:ED", to: "/schools/swim-ed", icon: "Waves" },
    { title: "Free Sports Tournaments", to: "/schools/tournaments", icon: "Trophy" },
    { title: "Game, Set & MATHS Workshop", to: "/schools/game-set-maths", icon: "Calculator" },
    { title: "Holiday Camps", to: "/parents/holiday-camps", icon: "Tent" },
    { title: "Extra-Curricular Clubs", to: "/schools/extra-curricular", icon: "Star" },
  ],
  coreMessage:
    "Reliable programmes designed to reduce school admin and staffing pressure while keeping children safe, active and inspired.",
  suitability: {
    title: "See if this works for our school",
    points: [
      "15-minute school suitability call",
      "Discuss timetable, space, costs and outcomes",
    ],
  },
};

export const PE = {
  coreMessage:
    "PE sessions develop pupil skills through engaging, supportive and exploratory learning.",
  additional: ["Breakfast / After School Clubs", "Lunchtime Sports Provision"],
  lunchtimeBenefits: [
    "Better behaviour management", "More structured activity",
    "Team sports and individual challenges",
    "Smaller-group support for children who may feel isolated",
  ],
  pricing: [
    { tier: "Bronze", detail: "Half day", price: "£121/day" },
    { tier: "Silver", detail: "Full day", price: "£196/day" },
    { tier: "Gold", detail: "2+ full school days", price: "£178/day" },
  ],
  addons: [
    { label: "Sports Coach", price: "£41/hour" },
    { label: "PE Teacher", price: "£46/hour" },
    { label: "Lunch provision", price: "£47 (1 hr) / £59.40 (2 hrs)" },
    { label: "After School Club cover", price: "£47/hour" },
  ],
};

export const SWIM = {
  tagline: "Making Waves in Primary Education",
  proposition:
    "An on-site pop-up swimming pool programme intended to reduce travel and logistical problems associated with traditional school swimming.",
  benefits: [
    "More learning time", "Reduced transport/logistical pressure", "Pupil progress data",
    "Safety-focused delivery", "Inclusive swimming education", "Cost-efficient provision",
  ],
  features: [
    "Heated pop-up pool", "Temporary modular structure",
    "Qualified instructors and lifeguards", "Progress reporting",
    "Curriculum-aligned swimming and water safety", "Secure set-up", "Inclusive access",
  ],
  pricing: [
    { label: "On-site swimming", price: "from £11,104" },
    { label: "Temporary changing rooms", price: "from £258" },
  ],
  process: ["Apply", "Site Visit", "Sign Up", "Set-up", "Delivery", "Impact"],
};

export const GSM = {
  proposition: "A workshop combining tennis, physical movement and mathematics.",
  benefits: [
    "Cross-curricular learning", "High female participation",
    "Lifelong participation in sport", "Fundamental movement skills",
  ],
  pricing: [
    { label: "Half day", price: "£270" },
    { label: "1 day", price: "£330" },
    { label: "2 days", price: "£600" },
    { label: "3 days", price: "£810" },
  ],
  included: [
    "Game, Set & Maths workshop",
    "Prize-draw entry for £100 of tennis equipment",
    "Interactive assembly",
    "Six weeks of extra-curricular tennis lesson plans",
  ],
};

export const EXTRA_CURRICULAR = {
  proposition:
    "Flexible extra-curricular provision delivered by qualified and experienced coaches, with School of Play handling administration.",
  activities: [
    "Football / Futsal", "Gymnastics", "Dance", "Mini Golf",
    "Mini Tennis", "Hockey", "Kwik-Cricket", "Lacrosse",
  ],
};

export const TOURNAMENTS = {
  proposition:
    "Free-to-enter primary-school sports tournaments at indoor or all-weather facilities.",
  benefits: [
    "Supports School Games Mark criteria", "Free participation", "Managed logistics",
    "All-weather facilities", "Regular competition opportunities", "Prizes and awards",
  ],
};

export const WHY_US = {
  vision:
    "Positively impact the lives of 1 million children through purposeful play and physical activity by 2035.",
  mission:
    "Create fulfilling experiences in purposeful play and physical activity so children can lead unique, empowered and connected lives.",
  values: ["Safety First", "Delivering with Passion", "Working Together", "Thinking Differently"],
  themes: [
    "Memories to Last a Lifetime", "Keeping Kids Moving", "Child wellbeing",
    "Physical activity", "Creative exploration", "Confidence and life skills",
  ],
  trust: "We highlight Ofsted inspections and parent feedback as evidence of quality and safety.",
};

export const TEAM = {
  leadership: [
    { name: "Ashlea Brewin", role: "Managing Director" },
    { name: "Ryan Harris", role: "Business Development Director" },
    { name: "Sean Reid", role: "Operations Director" },
    { name: "Kelsey", role: "Head of PE & Sport" },
    { name: "Abbie Gibson", role: "Head of Childcare & SENDco" },
    { name: "Laura Basson", role: "Holiday Camp Co-ordinator" },
    { name: "Hayley", role: "Office Manager" },
  ],
  settingLeaders: [
    { name: "Cael", role: "Urmston" },
    { name: "Rachel", role: "Lily Lane" },
    { name: "Michelle", role: "Prestbury" },
    { name: "Ruzena", role: "St Hilda's" },
    { name: "Cheetah", role: "Oswald Road" },
  ],
  coaches: [
    { name: "Cam", role: "PE Educator" },
    { name: "Ben", role: "Swimming Team" },
    { name: "Chloe", role: "PE Educator" },
    { name: "Evie", role: "PE & Dance Teacher" },
    { name: "Seren", role: "Dance Teacher" },
    { name: "Aaron", role: "PE Educator" },
    { name: "Josh", role: "Football Coach" },
    { name: "Vic", role: "Gymnastics Teacher" },
  ],
};
