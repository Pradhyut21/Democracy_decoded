export interface QuizQuestion {
  id: number;
  country: string;
  countryCode: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    country: "United States",
    countryCode: "US",
    question: "How many electors make up the U.S. Electoral College?",
    options: ["435", "538", "270", "100"],
    correctIndex: 1,
    explanation: "The U.S. Electoral College consists of 538 electors. A majority of 270 electoral votes is required to win the presidency. The number equals 435 Representatives + 100 Senators + 3 electors for D.C.",
  },
  {
    id: 2,
    country: "United Kingdom",
    countryCode: "UK",
    question: "What is the maximum term length for the UK Parliament?",
    options: ["4 years", "5 years", "6 years", "No limit"],
    correctIndex: 1,
    explanation: "The UK Parliament has a maximum term of 5 years under the Dissolution and Calling of Parliament Act 2022. However, snap elections can be called earlier by the Prime Minister.",
  },
  {
    id: 3,
    country: "India",
    countryCode: "IN",
    question: "How many Lok Sabha constituencies are there in India?",
    options: ["543", "552", "500", "600"],
    correctIndex: 0,
    explanation: "The Lok Sabha (House of the People) has 543 elected members from single-member constituencies across India's 28 states and 8 union territories.",
  },
  {
    id: 4,
    country: "Germany",
    countryCode: "DE",
    question: "What percentage of votes is needed for a party to enter the Bundestag?",
    options: ["3%", "5%", "7%", "10%"],
    correctIndex: 1,
    explanation: "Germany has a 5% electoral threshold (Fünf-Prozent-Hürde). Parties must win at least 5% of the second votes or 3 direct mandates to gain seats in the Bundestag.",
  },
  {
    id: 5,
    country: "Brazil",
    countryCode: "BR",
    question: "How is the Brazilian President elected?",
    options: ["Two-round system", "First-past-the-post", "Proportional representation", "Electoral College"],
    correctIndex: 0,
    explanation: "Brazil uses a two-round system for presidential elections. If no candidate receives over 50% in the first round, a runoff is held between the top two candidates.",
  },
  {
    id: 6,
    country: "France",
    countryCode: "FR",
    question: "What is the term length of the French President?",
    options: ["4 years", "5 years", "6 years", "7 years"],
    correctIndex: 1,
    explanation: "The French President serves a 5-year term (quinquennat), reduced from 7 years in 2000. Presidents can serve a maximum of two consecutive terms.",
  },
  {
    id: 7,
    country: "Japan",
    countryCode: "JP",
    question: "How often are House of Representatives elections held in Japan?",
    options: ["Every 3 years", "Every 4 years", "Every 5 years", "Every 6 years"],
    correctIndex: 1,
    explanation: "Japan's House of Representatives serves a 4-year maximum term, though snap elections can be called earlier by the Prime Minister dissolving the house.",
  },
  {
    id: 8,
    country: "Australia",
    countryCode: "AU",
    question: "Is voting compulsory in Australian federal elections?",
    options: ["Yes", "No", "Only for citizens over 21", "Only in some states"],
    correctIndex: 0,
    explanation: "Australia has compulsory voting for all citizens aged 18 and over. Failure to vote without a valid reason results in a fine. This contributes to Australia's high voter turnout of over 90%.",
  },
  {
    id: 9,
    country: "Canada",
    countryCode: "CA",
    question: "How is the Canadian Prime Minister chosen?",
    options: ["Direct election", "Leader of the party with the most seats", "Appointed by the monarch", "Elected by the Senate"],
    correctIndex: 1,
    explanation: "The Canadian Prime Minister is the leader of the party that commands the confidence of the House of Commons, typically the party with the most seats after a general election.",
  },
  {
    id: 10,
    country: "South Africa",
    countryCode: "ZA",
    question: "How is the South African President elected?",
    options: ["Direct popular vote", "National Assembly vote", "Electoral College", "Appointed by the Chief Justice"],
    correctIndex: 1,
    explanation: "South Africa's President is elected by the National Assembly from among its members after general elections. This is a parliamentary-style system where voters elect parties, and parties select the president.",
  },
];