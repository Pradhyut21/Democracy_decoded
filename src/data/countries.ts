export interface CountryData {
  id: string;
  isoA3: string;
  name: string;
  flag: string;
  capital: string;
  rulingParty: string;
  leader: {
    name: string;
    title: string;
    since: number;
    portrait: string;
  };
  electionType: string;
  lastElection: string;
  nextElection: string;
  voterTurnout: number;
  population: string;
  coordinates: [number, number];
  howTheyWon: {
    summary: string;
    tactics: string[];
  };
  oppositionAnalysis: {
    summary: string;
    reasons: string[];
  };
  upcomingElections: {
    date: string;
    type: string;
    context: string;
  };
  timeline: { date: string; event: string }[];
  stats: {
    voterTurnout: number;
    electionFrequency: string;
    registration: number;
    lastElectionYear: number;
  };
}

export const countries: CountryData[] = [
  {
    id: "united-states",
    isoA3: "USA",
    name: "United States",
    flag: "\uD83C\uDDFA\uD83C\uDDF8",
    capital: "Washington, D.C.",
    rulingParty: "Republican",
    leader: {
      name: "Donald Trump",
      title: "47th President",
      since: 2025,
      portrait: "/images/leader-portrait-us.jpg",
    },
    electionType: "PRESIDENTIAL",
    lastElection: "November 2024",
    nextElection: "November 2028",
    voterTurnout: 67,
    population: "335M",
    coordinates: [37.09, -95.71],
    howTheyWon: {
      summary: "The Republican campaign focused on economic messaging, border security, and working-class outreach. Strategic targeting of Rust Belt states and increased turnout in rural areas proved decisive.",
      tactics: [
        "Economic populism messaging resonated in swing states",
        "Targeted outreach to working-class voters in Pennsylvania, Michigan, and Wisconsin",
        "High rural turnout energized the base",
        "Social media dominance and direct voter engagement",
      ],
    },
    oppositionAnalysis: {
      summary: "The Democratic campaign struggled with voter enthusiasm, economic messaging, and retaining key demographic support. Urban turnout was lower than projected.",
      reasons: [
        "Failed to energize the traditional Democratic base",
        "Economic messaging didn't connect with inflation-weary voters",
        "Lost support among Hispanic and young voters",
        "Over-reliance on anti-opposition messaging vs. positive vision",
      ],
    },
    upcomingElections: {
      date: "November 5, 2028",
      type: "Presidential Election",
      context: "The next presidential election will determine the 48th President. Both parties are already organizing campaigns.",
    },
    timeline: [
      { date: "Nov 2024", event: "General Election - Republican Victory" },
      { date: "Jan 2025", event: "Inauguration of 47th President" },
      { date: "Nov 2026", event: "Midterm Congressional Elections" },
      { date: "Nov 2028", event: "Next Presidential Election" },
    ],
    stats: { voterTurnout: 67, electionFrequency: "4 YEARS", registration: 92, lastElectionYear: 2024 },
  },
  {
    id: "india",
    isoA3: "IND",
    name: "India",
    flag: "\uD83C\uDDEE\uD83C\uDDF3",
    capital: "New Delhi",
    rulingParty: "BJP",
    leader: { name: "Narendra Modi", title: "Prime Minister", since: 2014, portrait: "/images/leader-portrait-india.jpg" },
    electionType: "PARLIAMENTARY",
    lastElection: "April-June 2024",
    nextElection: "April-May 2030",
    voterTurnout: 67,
    population: "1.43B",
    coordinates: [20.59, 78.96],
    howTheyWon: {
      summary: "The BJP-led NDA alliance secured a historic third consecutive term through Hindutva ideology, welfare schemes, and Modi's personal popularity. Strong organization at the booth level and effective use of technology were key.",
      tactics: [
        "Direct Benefit Transfer schemes reached 900M+ citizens",
        "Modi's personal brand and oratory skills",
        "Extensive booth-level worker network",
        "Social media and WhatsApp campaign outreach",
      ],
    },
    oppositionAnalysis: {
      summary: "The INDIA alliance fragmented on key issues, lacked a unifying leader, and failed to counter the BJP's welfare narrative effectively.",
      reasons: [
        "No clear prime ministerial face to challenge Modi",
        "Internal disagreements on seat sharing",
        "Couldn't match BJP's organizational strength",
        "Failed to consolidate anti-BJP vote completely",
      ],
    },
    upcomingElections: {
      date: "April-May 2029",
      type: "Lok Sabha (General) Election",
      context: "India will elect its 19th Lok Sabha. The BJP will seek a fourth consecutive term while the opposition aims to build a stronger coalition.",
    },
    timeline: [
      { date: "Apr-Jun 2024", event: "Lok Sabha Election - BJP Third Term" },
      { date: "Jun 2024", event: "Modi sworn in as PM for 3rd consecutive term" },
      { date: "2025-2028", event: "State Assembly Elections across 15 states" },
      { date: "Apr-May 2030", event: "Next Lok Sabha Election" },
    ],
    stats: { voterTurnout: 67, electionFrequency: "6 YEARS", registration: 96, lastElectionYear: 2024 },
  },
  {
    id: "united-kingdom",
    isoA3: "GBR",
    name: "United Kingdom",
    flag: "\uD83C\uDDEC\uD83C\uDDE7",
    capital: "London",
    rulingParty: "Labour",
    leader: { name: "Keir Starmer", title: "Prime Minister", since: 2024, portrait: "/images/leader-portrait-uk.jpg" },
    electionType: "PARLIAMENTARY",
    lastElection: "July 2024",
    nextElection: "By May 2029",
    voterTurnout: 60,
    population: "67M",
    coordinates: [55.38, -3.44],
    howTheyWon: {
      summary: "Labour achieved a landslide victory by positioning itself as a credible alternative after 14 years of Conservative rule. Centrist policies and professional presentation won back moderate voters.",
      tactics: [
        "'Change' messaging capitalized on voter fatigue",
        "Professional, cautious campaign avoided controversies",
        "Won back centrist voters from the Conservatives",
        "Strategic targeting of marginal seats",
      ],
    },
    oppositionAnalysis: {
      summary: "The Conservative Party faced voter fatigue after 14 years in power, internal divisions, and economic challenges. The Reform UK split the right-wing vote.",
      reasons: [
        "14 years of incumbency created voter fatigue",
        "Partygate scandal and leadership instability",
        "Economic mismanagement perception post-mini-budget",
        "Reform UK split the Conservative vote in key seats",
      ],
    },
    upcomingElections: {
      date: "By May 2029",
      type: "General Election",
      context: "The next UK general election must be held by May 2029. Labour will defend its large majority against a reorganized Conservative party.",
    },
    timeline: [
      { date: "Jul 2024", event: "General Election - Labour Landslide" },
      { date: "Jul 2024", event: "Starmer becomes PM" },
      { date: "May 2025", event: "Local and Mayoral Elections" },
      { date: "By May 2029", event: "Next General Election" },
    ],
    stats: { voterTurnout: 60, electionFrequency: "5 YEARS", registration: 94, lastElectionYear: 2024 },
  },
  {
    id: "brazil",
    isoA3: "BRA",
    name: "Brazil",
    flag: "\uD83C\uDDE7\uD83C\uDDF7",
    capital: "Bras\u00EDlia",
    rulingParty: "Workers' Party (PT)",
    leader: { name: "Luiz In\u00E1cio Lula da Silva", title: "President", since: 2023, portrait: "/images/leader-portrait-brazil.jpg" },
    electionType: "PRESIDENTIAL",
    lastElection: "October 2022",
    nextElection: "October 2026",
    voterTurnout: 79,
    population: "216M",
    coordinates: [-14.24, -51.93],
    howTheyWon: {
      summary: "Lula won a narrow victory by building a broad coalition against Bolsonaro. His campaign emphasized social programs, environmental protection, and democratic values.",
      tactics: [
        "Broad progressive coalition united against Bolsonaro",
        "Emphasis on social welfare and poverty reduction",
        "Strong performance in Northeast Brazil",
        "Mobilization of civil society organizations",
      ],
    },
    oppositionAnalysis: {
      summary: "Bolsonaro's campaign was hurt by economic challenges, controversial statements, and failure to fully consolidate the right-wing vote.",
      reasons: [
        "Economic stagnation and high inflation",
        "Controversial rhetoric alienated moderate voters",
        "Failed to expand beyond his base",
        "Women voters shifted decisively against him",
      ],
    },
    upcomingElections: {
      date: "October 2026",
      type: "Presidential Election",
      context: "Brazil will elect a new president. Lula is ineligible for a third consecutive term, opening the field for new candidates from both left and right.",
    },
    timeline: [
      { date: "Oct 2022", event: "Presidential Election - Lula Victory" },
      { date: "Jan 2023", event: "Lula sworn in for third term" },
      { date: "Oct 2024", event: "Municipal Elections" },
      { date: "Oct 2026", event: "Next Presidential Election" },
    ],
    stats: { voterTurnout: 79, electionFrequency: "4 YEARS", registration: 98, lastElectionYear: 2022 },
  },
  {
    id: "germany",
    isoA3: "DEU",
    name: "Germany",
    flag: "\uD83C\uDDE9\uD83C\uDDEA",
    capital: "Berlin",
    rulingParty: "SPD",
    leader: { name: "Friedrich Merz", title: "Chancellor", since: 2025, portrait: "/images/leader-portrait-germany.jpg" },
    electionType: "FEDERAL",
    lastElection: "September 2021",
    nextElection: "February 2025",
    voterTurnout: 77,
    population: "84M",
    coordinates: [51.17, 10.45],
    howTheyWon: {
      summary: "The SPD emerged as the largest party by focusing on social justice, minimum wage increases, and climate action. Post-Merkel positioning helped them capture disaffected voters.",
      tactics: [
        "Social justice and minimum wage campaign",
        "Post-Merkel positioning as change agent",
        "Strong debate performances by Scholz",
        "Coalition-building promise for stability",
      ],
    },
    oppositionAnalysis: {
      summary: "The CDU/CSU struggled without Merkel. The Greens gained but not enough, while the FDP claimed kingmaker status in coalition negotiations.",
      reasons: [
        "Merkel retirement left a leadership vacuum in CDU",
        "Weak candidate and campaign messaging",
        "Greens split the center-left vote",
        "AfD consolidated far-right but remained isolated",
      ],
    },
    upcomingElections: {
      date: "September 2029",
      type: "Federal Election",
      context: "The next federal election will determine if the CDU/CSU-led government can maintain its mandate or if the political landscape shifts again.",
    },
    timeline: [
      { date: "Feb 2025", event: "Federal Election - CDU/CSU Victory" },
      { date: "Mar 2025", event: "Merz becomes Chancellor" },
      { date: "Sep 2029", event: "Next Federal Election" },
    ],
    stats: { voterTurnout: 77, electionFrequency: "4 YEARS", registration: 91, lastElectionYear: 2021 },
  },
  {
    id: "japan",
    isoA3: "JPN",
    name: "Japan",
    flag: "\uD83C\uDDEF\uD83C\uDDF5",
    capital: "Tokyo",
    rulingParty: "Liberal Democratic Party (LDP)",
    leader: { name: "Sanae Takaichi", title: "Prime Minister", since: 2025, portrait: "/images/leader-portrait-japan.jpg" },
    electionType: "PARLIAMENTARY",
    lastElection: "October 2024",
    nextElection: "By October 2028",
    voterTurnout: 54,
    population: "125M",
    coordinates: [36.2, 138.25],
    howTheyWon: {
      summary: "The LDP maintained power despite reduced seats through coalition partnerships. Their campaign emphasized economic stability, defense strengthening, and continuity.",
      tactics: [
        "Komeito coalition partnership secured majority",
        "Economic stability messaging resonated",
        "Defense policy shifts appealed to security-conscious voters",
        "Strong rural support base remained intact",
      ],
    },
    oppositionAnalysis: {
      summary: "The CDP and other opposition parties made gains but failed to present a unified alternative. Fragmentation prevented a credible challenge to LDP rule.",
      reasons: [
        "Opposition remained fragmented across multiple parties",
        "No unified leader or platform",
        "Failed to break LDP's rural strongholds",
        "Economic uncertainty made voters risk-averse",
      ],
    },
    upcomingElections: {
      date: "By October 2028",
      type: "House of Representatives Election",
      context: "The next general election for Japan's House of Representatives must be held by October 2028. The LDP will seek to maintain its long-standing governance.",
    },
    timeline: [
      { date: "Oct 2025", event: "LDP Leadership Election - Takaichi Victory" },
      { date: "Oct 2025", event: "Takaichi becomes Japan's first female PM" },
      { date: "Jul 2025", event: "House of Councillors Election" },
      { date: "By Oct 2028", event: "Next General Election" },
    ],
    stats: { voterTurnout: 54, electionFrequency: "4 YEARS", registration: 88, lastElectionYear: 2024 },
  },
  {
    id: "france",
    isoA3: "FRA",
    name: "France",
    flag: "\uD83C\uDDEB\uD83C\uDDF7",
    capital: "Paris",
    rulingParty: "Renaissance",
    leader: { 
      name: "Emmanuel Macron", 
      title: "President", 
      since: 2017, 
      portrait: "/images/leader-portrait-france.jpg" 
    },
    electionType: "PRESIDENTIAL",
    lastElection: "April 2022",
    nextElection: "April 2027",
    voterTurnout: 71.9,
    population: "68M",
    coordinates: [46.22, 2.21],
    howTheyWon: {
      summary: "Macron secured a second term by building a 'Republican Front' (Front Républicain) to block the far-right. His campaign emphasized stability, pro-European integration, and moderate economic reforms amidst global uncertainty.",
      tactics: [
        "Positioned as a centrist bulwark against political extremes",
        "Strong pro-EU and internationalist platform",
        "Focus on economic modernization and lowering unemployment",
        "Effective direct engagement during the 'Grand Débat' post-protests",
      ],
    },
    oppositionAnalysis: {
      summary: "The far-right National Rally reached historic highs by tapping into cost-of-living concerns and rural discontent. Meanwhile, the left unified under the NUPES coalition to challenge Macron's legislative majority.",
      reasons: [
        "Normalisation of far-right rhetoric in mainstream media",
        "Voter fatigue with the centrist 'neither left nor right' approach",
        "Deep geographic divide between urban centers and 'forgotten' rural areas",
        "Economic anxiety regarding pension reforms and inflation",
      ],
    },
    upcomingElections: {
      date: "April 2027",
      type: "Presidential Election",
      context: "The 2027 election will be a major turning point as Macron is term-limited. The race will determine if the centrist 'Macronisme' can survive without its founder or if the far-right or a unified left will take power.",
    },
    timeline: [
      { date: "Apr 2022", event: "Presidential Election - Macron Re-elected" },
      { date: "Jun 2024", event: "Snap Legislative Elections" },
      { date: "Jul 2024", event: "Hung Parliament - New Government Formation" },
      { date: "Apr 2027", event: "Next Presidential Election" },
    ],
    stats: { voterTurnout: 71.9, electionFrequency: "5 YEARS", registration: 93, lastElectionYear: 2022 },
  },
  {
    id: "australia",
    isoA3: "AUS",
    name: "Australia",
    flag: "\uD83C\uDDE6\uD83C\uDDFA",
    capital: "Canberra",
    rulingParty: "Labor",
    leader: { 
      name: "Anthony Albanese", 
      title: "Prime Minister", 
      since: 2022, 
      portrait: "/images/leader-portrait-australia.jpg" 
    },
    electionType: "FEDERAL",
    lastElection: "May 2022",
    nextElection: "By May 2025",
    voterTurnout: 89.8,
    population: "26M",
    coordinates: [-25.27, 133.77],
    howTheyWon: {
      summary: "The Labor Party returned to power after nine years by offering a 'safe change' and focusing on healthcare, climate action, and the cost of living. They benefited from a major shift in urban seats toward independent candidates.",
      tactics: [
        "Strategic focus on suburban 'middle Australia' and healthcare",
        "Collaboration and non-aggression with climate-focused 'Teal' independents",
        "Commitment to the 'Uluru Statement from the Heart'",
        "Emphasis on integrity in government following scandals",
      ],
    },
    oppositionAnalysis: {
      summary: "The Liberal-National Coalition suffered from a 'pincer movement', losing moderate urban seats to Teal independents and regional support to Labor and the Greens over climate policy inaction.",
      reasons: [
        "Perceived inaction on climate change alienated metropolitan voters",
        "Loss of the 'women's vote' due to internal culture issues",
        "Long-term incumbency fatigue after three terms (9 years)",
        "Failure to adapt to the rise of community-backed independents",
      ],
    },
    upcomingElections: {
      date: "By May 2025",
      type: "Federal Election",
      context: "The next election will be a test of Labor's first-term performance, particularly regarding inflation and housing. The Coalition, under new leadership, aims to reclaim its lost heartland seats.",
    },
    timeline: [
      { date: "May 2022", event: "Federal Election - Labor Victory" },
      { date: "Oct 2023", event: "Indigenous Voice to Parliament Referendum" },
      { date: "2024", event: "Cost of Living and Tax Reform Packages" },
      { date: "By May 2025", event: "Next Federal Election" },
    ],
    stats: { voterTurnout: 89.8, electionFrequency: "3 YEARS", registration: 97, lastElectionYear: 2022 },
  },
  {
    id: "canada",
    isoA3: "CAN",
    name: "Canada",
    flag: "\uD83C\uDDE8\uD83C\uDDE6",
    capital: "Ottawa",
    rulingParty: "Liberal",
    leader: { 
      name: "Pierre Poilievre", 
      title: "Prime Minister", 
      since: 2025, 
      portrait: "/images/leader-portrait-canada.jpg" 
    },
    electionType: "FEDERAL",
    lastElection: "September 2021",
    nextElection: "By October 2025",
    voterTurnout: 62.6,
    population: "40M",
    coordinates: [56.13, -106.34],
    howTheyWon: {
      summary: "The Liberals secured a third term (second minority) by focusing on pandemic management, childcare, and climate leadership. They maintained a strong base in Ontario and Quebec through strategic regional campaigning.",
      tactics: [
        "Leveraged success of COVID-19 vaccine rollout and support programs",
        "Strategic 'Supply and Confidence' agreement with the NDP for stability",
        "Focus on social safety nets (National Childcare, Dental Care)",
        "Strong performance in urban and suburban Greater Toronto Area (GTA)",
      ],
    },
    oppositionAnalysis: {
      summary: "The Conservatives won the popular vote but failed to convert it into seats due to a lack of urban appeal. Since then, a leadership shift toward populism has unified the right-wing base.",
      reasons: [
        "Inability to breakthrough in major urban centers (Toronto, Montreal, Vancouver)",
        "Internal divisions over social issues and leadership direction",
        "The 'People's Party' (PPC) siphoned votes in key ridings",
        "Difficulty countering the Liberal-NDP governing arrangement",
      ],
    },
    upcomingElections: {
      date: "October 2029",
      type: "Federal Election",
      context: "The next federal election will be a test of the Conservative government's first term and its economic policies.",
    },
    timeline: [
      { date: "Oct 2025", event: "Federal Election - Conservative Victory" },
      { date: "Nov 2025", event: "Poilievre becomes Prime Minister" },
      { date: "Oct 2029", event: "Next Federal Election" },
    ],
    stats: { voterTurnout: 62.6, electionFrequency: "4 YEARS", registration: 95, lastElectionYear: 2021 },
  },
  {
    id: "south-africa",
    isoA3: "ZAF",
    name: "South Africa",
    flag: "\uD83C\uDDFD\uD83C\uDDE6",
    capital: "Pretoria",
    rulingParty: "Government of National Unity (ANC-led)",
    leader: { 
      name: "Cyril Ramaphosa", 
      title: "President", 
      since: 2018, 
      portrait: "/images/leader-portrait-south-africa.jpg" 
    },
    electionType: "PARLIAMENTARY-PRESIDENTIAL",
    lastElection: "May 2024",
    nextElection: "May 2029",
    voterTurnout: 58.6,
    population: "60M",
    coordinates: [-30.56, 22.94],
    howTheyWon: {
      summary: "Following the May 2024 election where the ANC lost its absolute majority for the first time since 1994, a Government of National Unity (GNU) was formed. The coalition emphasizes stability and economic recovery.",
      tactics: [
        "Formed a broad-based coalition with former rival parties (DA, IFP, etc.)",
        "Focused on 'Renewal' and addressing energy and transport crises",
        "Strategic use of the GNU to prevent political instability",
        "Social grant expansions targeted at vulnerable populations",
      ],
    },
    oppositionAnalysis: {
      summary: "The opposition landscape fractured, with the rise of the MK Party siphoning traditional ANC votes, while the DA consolidated its position as the second-largest party before joining the GNU.",
      reasons: [
        "Persistent issues with unemployment, load shedding, and service delivery",
        "Rise of regional and ethnocentric political movements",
        "Successful 'Moonshot Pact' strategy by opposition groups",
        "Internal ANC factionalism leading to new breakaway parties",
      ],
    },
    upcomingElections: {
      date: "May 2029",
      type: "General Election",
      context: "The 2029 election will be a crucial test for the longevity of coalition politics in South Africa and whether the ANC can regain lost ground or if a new political realignment will take hold.",
    },
    timeline: [
      { date: "May 2024", event: "General Election - ANC loses majority" },
      { date: "Jun 2024", event: "Formation of Government of National Unity" },
      { date: "Jun 2024", event: "Ramaphosa re-elected as President by Parliament" },
      { date: "May 2029", event: "Next General Election" },
    ],
    stats: { voterTurnout: 58.6, electionFrequency: "5 YEARS", registration: 98, lastElectionYear: 2024 },
  },
  {
    id: "mexico",
    isoA3: "MEX",
    name: "Mexico",
    flag: "\uD83C\uDDF2\uD83C\uDDFD",
    capital: "Mexico City",
    rulingParty: "Morena",
    leader: { 
      name: "Claudia Sheinbaum", 
      title: "President", 
      since: 2024, 
      portrait: "/images/leader-portrait-mexico.jpg" 
    },
    electionType: "PRESIDENTIAL",
    lastElection: "June 2024",
    nextElection: "June 2030",
    voterTurnout: 61,
    population: "128M",
    coordinates: [23.63, -102.55],
    howTheyWon: {
      summary: "Sheinbaum won a historic landslide victory as Mexico's first female president, benefiting from the immense popularity of her predecessor AMLO and a strong social welfare platform.",
      tactics: [
        "Continuation of 'The Fourth Transformation' (4T) social programs",
        "Focus on gender equality and environmental sustainability",
        "Strong mobilization in urban strongholds and among the youth",
        "Leveraged the well-organized Morena party machinery",
      ],
    },
    oppositionAnalysis: {
      summary: "The opposition coalition (PRI, PAN, PRD) struggled to present a unified vision and failed to counter the popular appeal of Morena's welfare schemes.",
      reasons: [
        "Historical baggage of traditional parties alienated voters",
        "Lacked a clear alternative to Morena's social focus",
        "Internal divisions within the opposition coalition",
        "Failed to bridge the gap with working-class voters",
      ],
    },
    upcomingElections: {
      date: "June 2030",
      type: "General Election",
      context: "Mexico will elect a new president and federal legislature. The election will test the long-term durability of Morena's political dominance.",
    },
    timeline: [
      { date: "Jun 2024", event: "General Election - Sheinbaum Landslide" },
      { date: "Oct 2024", event: "Inauguration of Mexico's first female President" },
      { date: "Jun 2027", event: "Midterm Legislative Elections" },
      { date: "Jun 2030", event: "Next Presidential Election" },
    ],
    stats: { voterTurnout: 61, electionFrequency: "6 YEARS", registration: 95, lastElectionYear: 2024 },
  },
  {
    id: "indonesia",
    isoA3: "IDN",
    name: "Indonesia",
    flag: "\uD83C\uDDEE\uD83C\uDDE9",
    capital: "Jakarta / Nusantara",
    rulingParty: "Gerindra (leading coalition)",
    leader: { 
      name: "Prabowo Subianto", 
      title: "President", 
      since: 2024, 
      portrait: "/images/leader-portrait-indonesia.jpg" 
    },
    electionType: "PRESIDENTIAL",
    lastElection: "February 2024",
    nextElection: "February 2029",
    voterTurnout: 81.7,
    population: "278M",
    coordinates: [-0.78, 113.92],
    howTheyWon: {
      summary: "Prabowo secured a decisive first-round victory by rebranding himself as a grandfatherly figure and picking Jokowi's son as his running mate, ensuring continuity of popular policies.",
      tactics: [
        "Social media campaign targeting Gen Z and Millennials ('Gemoy')",
        "Continuity messaging ('Keberlanjutan') of Jokowi's infrastructure and welfare",
        "Strategic alliance with incumbent family and influential regional leaders",
        "Promises of free lunch and milk programs for students",
      ],
    },
    oppositionAnalysis: {
      summary: "The opposition parties (Anies and Ganjar) focused on governance and ethics but couldn't overcome the 'continuity' narrative and Jokowi's implicit endorsement.",
      reasons: [
        "Fragmented opposition vote between two major challengers",
        "Lack of a unifying alternative economic vision",
        "Limited reach in rural heartlands compared to the incumbent-backed ticket",
        "Failed to capitalize on youth concerns about democratic backsliding",
      ],
    },
    upcomingElections: {
      date: "February 2029",
      type: "Presidential Election",
      context: "Indonesia will elect its next president and vice president. The election will determine the future of the new capital project and Indonesia's regional influence.",
    },
    timeline: [
      { date: "Feb 2024", event: "Presidential Election - Prabowo First-Round Win" },
      { date: "Oct 2024", event: "Inauguration of Prabowo Subianto as President" },
      { date: "Nov 2024", event: "Local Government Elections" },
      { date: "Feb 2029", event: "Next General Election" },
    ],
    stats: { voterTurnout: 81.7, electionFrequency: "5 YEARS", registration: 97, lastElectionYear: 2024 },
  },
];

export const featuredCountryIds = ["united-states", "india", "united-kingdom", "brazil", "germany", "japan", "france", "australia", "canada", "south-africa", "mexico", "indonesia"];