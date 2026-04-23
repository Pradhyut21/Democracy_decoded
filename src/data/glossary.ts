export interface GlossaryTerm {
  term: string;
  definition: string;
  category: string;
}

export const glossaryTerms: GlossaryTerm[] = [
  { term: "Electoral College", definition: "A body of electors chosen by each state who formally elect the President and Vice President of the United States. Each state gets electors equal to its congressional delegation (House + Senate).", category: "Voting Systems" },
  { term: "First-Past-The-Post (FPTP)", definition: "An electoral system where the candidate with the most votes in a constituency wins, even without an absolute majority. Used in the UK, US House, India, and Canada.", category: "Voting Systems" },
  { term: "Proportional Representation", definition: "A system where parties receive legislative seats proportional to their share of the total votes cast. Variants include party-list systems and single transferable vote.", category: "Voting Systems" },
  { term: "Gerrymandering", definition: "The practice of manipulating electoral district boundaries to favor one political party or group. Named after Elbridge Gerry, who created a salamander-shaped district in 1812.", category: "Electoral Manipulation" },
  { term: "Coalition Government", definition: "A government formed by multiple parties working together when no single party has a majority of seats in the legislature. Common in parliamentary systems.", category: "Government Formation" },
  { term: "Two-Round System", definition: "An electoral method where a second election (runoff) is held between the top two candidates if no candidate achieves a majority in the first round. Used in France and Brazil.", category: "Voting Systems" },
  { term: "Voter Turnout", definition: "The percentage of eligible voters who cast a ballot in an election. Turnout varies widely by country, from mandatory voting systems (Australia: ~90%) to voluntary (US: ~60-70%).", category: "Election Metrics" },
  { term: "Swing State", definition: "A US state where no single candidate or party has overwhelming support, making it competitive and crucial for winning presidential elections. Also called a battleground state.", category: "US Politics" },
  { term: "Hung Parliament", definition: "A situation in a parliamentary system where no single political party has an absolute majority of seats. Requires coalition building or minority government formation.", category: "Government Formation" },
  { term: "Ranked Choice Voting", definition: "An electoral system where voters rank candidates by preference. If no candidate has a majority, the lowest-ranked candidate is eliminated and their votes redistributed until someone has a majority.", category: "Voting Systems" },
  { term: "Political Action Committee (PAC)", definition: "An organization in the United States that pools campaign contributions from members and donates those funds to campaigns for or against candidates, ballot initiatives, or legislation.", category: "Campaign Finance" },
  { term: "Electoral Threshold", definition: "The minimum share of votes a party must receive to secure representation in a legislature. Germany has a 5% threshold; Turkey has a 7% threshold.", category: "Voting Systems" },
  { term: "Constituency", definition: "A geographic area represented by a single member in a legislature. Also called a district, riding (Canada), or electorate (Australia).", category: "Electoral Geography" },
  { term: "Exit Poll", definition: "A poll of voters taken immediately after they have exited the polling stations. Used to predict election outcomes before official results are announced.", category: "Polling" },
  { term: "Midterm Election", definition: "An election held in the middle of a President's four-year term in the United States. All House seats and about one-third of Senate seats are contested.", category: "US Politics" },
  { term: "Primary Election", definition: "An election in which registered voters select candidates whom a political party will nominate for subsequent general elections. Can be open (any voter) or closed (party members only).", category: "US Politics" },
  { term: "Proportional Allocation", definition: "A method of distributing legislative seats where each party's seat share closely matches its vote share. Contrasts with winner-take-all systems.", category: "Voting Systems" },
  { term: "Electoral Fraud", definition: "Illegal interference with the process of an election. Acts of fraud include vote buying, false voter registration, intimidation, and tampering with voting machines or results.", category: "Election Integrity" },
];