import DiceBoard from "../../../components/Board";

export default function BoardGamePage() {
  const questions = [
  { q: "King Prithu was greater than the greatest soul and was therefore worshipable by everyone. He performed many glorious activities in ruling over the surface of the universe and was always magnanimous.", qHindi: "", ans: "No. (surface of the world). (text 7).", ansHindi: "" },

  { q: "O Saunaka, leader of all noble men, after hearing Maitreya speak about the various activities of King Prithu, the original King, who was fully qualified, glorified and widely praised all over the world, Vidura, the great devotee, very submissively worshiped Maitreya Rishi and asked him the following question.", qHindi: "", ans: "No. (leader of the great sages). (text 8).", ansHindi: "" },

  { q: "No one could disobey his irrevocable orders but the saintly persons, the brahmanas and the descendants of the Supreme Personality of Godhead (the Vaishnavas).", qHindi: "", ans: "Yes. (text 12).", ansHindi: "" },

  { q: "O gentle members of the assembly, may all good fortune be upon you! May all of you great souls who have come to attend this meeting kindly hear my decision attentively.", qHindi: "", ans: "No. (my prayer). (text 21).", ansHindi: "" },

  { q: "By the grace of the Supreme Lord I have been appointed the King of this planet, and I carry the sceptre to rule the citizens, protect them from all danger and give them employment according to their respective positions in the social order established by Vedic injunction.", qHindi: "", ans: "Yes. (text 22).", ansHindi: "" },

  { q: "I think that upon the execution of my duties as King, I shall be able to achieve the desirable objectives described by the great sages in Vedic knowledge. This destination is certainly achieved by the pleasure of the SPOG, who is the seer of all destiny.", qHindi: "", ans: "No. (described by experts). (text 23).", ansHindi: "" },

  { q: "Any king who does not teach his citizens about their respective duties in terms of varna and ashram but who simply exacts tolls and taxes from them is liable to suffer for the impious activities which have been performed by the citizens.", qHindi: "", ans: "Yes. (text 24).", ansHindi: "" },

  { q: "Therefore, my dear citizens, for the welfare of your king after his death, you should execute your duties properly in terms of your positions of varna and ashrama and should always think of the SPOG within your hearts.", qHindi: "", ans: "Yes. (text 25).", ansHindi: "" },

  { q: "This is confirmed not only by the evidence of the Vedas but also by the demonstrative behaviour of great personalities like Manu, Uttanapada, Dhruva, Priyavrata and my grandfather Anga, as well as by many other great personalities and ordinary living entities, exemplified by Maharaja Prahlada and Bali, all of whom are theists, believing in the existence of the SPOG, who carries a club.", qHindi: "", ans: "No. (personal behaviour). (text 28/29).", ansHindi: "" },

  { q: "Although abominable persons like my father, Vena, the grandson of death personified, are bewildered on the path of religion, all great personalities like those mentioned agree that in this world the only bestower of the benedictions of religion, economic development, sense gratification, liberation or elevation to the heavenly planets is the SPOG.", qHindi: "", ans: "Yes. (text 30).", ansHindi: "" },

  { q: "Like the Ganges water, which emanates from the lotus feet of the Lord, such a process gradually cleanses the mind, and thus spiritual or Krishna consciousness immediately increases.", qHindi: "", ans: "No. (immediately cleanses; gradually increases). (text 31).", ansHindi: "" },

  { q: "Once having taken shelter at the root of the lotus feet of the Lord, a devotee never comes back to this material existence, which is full of repeated cycles of birth and death.", qHindi: "", ans: "No. (full of threefold miseries). (text 32).", ansHindi: "" },

  { q: "According to your abilities and the occupations in which you are situated, you should engage your service at the lotus feet of the SPOG with full confidence and without reservation. Then you will surely be successful in achieving the final objective in your lives.", qHindi: "", ans: "Yes. (text 33).", ansHindi: "" },

  { q: "The SPOG is transcendental and not contaminated by this material world. But although He is concentrated spirit soul without material variety, for the benefit of the unconditioned soul He nevertheless accepts different types of sacrifice performed with various material elements, rituals and mantras and offered to the demigods under different names according to the interests and purposes of the performers.", qHindi: "", ans: "No. (benefit of the conditioned soul). (text 34).", ansHindi: "" },

  { q: "The SPOG is all-pervading, but He is also manifested in different types of bodies which arise from a combination of material nature, time, desires and occupational duties.", qHindi: "", ans: "Yes. (text 35).", ansHindi: "" },

  { q: "The SPOG is the master and enjoyer of the results of all sacrifices, and He is the supreme spiritual master as well. All of you citizens on the surface of the globe who have a relationship with me and are worshiping Him by dint of your occupational duties are bestowing your mercy upon me.", qHindi: "", ans: "Yes. (text 36).", ansHindi: "" },

  { q: "The brahmanas and Vaishnavas are personally glorified by their characteristics powers of tolerance, penance, knowledge and education. By dint of all these spiritual assets, Vaishnavas are more powerful than brahmanas.", qHindi: "", ans: "No. (more powerful than royalty). (text 37).", ansHindi: "" },

  { q: "The SPOG, the ancient, eternal Godhead, who is foremost amongst all great personalities, obtained the opulence of His staunch reputation, which purifies the entire universe, by worshiping the lotus feet of those brahmanas and Vaishnavas.", qHindi: "", ans: "Yes. (text 38).", ansHindi: "" },

  { q: "The SPOG, who is everlastingly independent and who exists in everyone’s heart, is very pleased with those who follow in His footsteps and engage without reservation in the service of the descendants of brahmanas and Vaishnavas, for He is always near to brahmanas and Vaishnavas and they are always near to Him.", qHindi: "", ans: "No. (not near, but dear). (text 39).", ansHindi: "" },

  { q: "By regular service to the brahmanas and Vaishnavas, one can clear the dirt from his heart and thus enjoy supreme peace and liberation from material desires and be satisfied.", qHindi: "", ans: "No. (material attachment). (text 40).", ansHindi: "" },

  { q: "Although the SPOG, Ananta, eats through the fire sacrifices offered in the names of the different demigods, He does not take as much pleasure in eating through fire as He does in accepting offerings through the mouths of learned brahmanas and Vaishnavas, for then He does not leave the association of devotees.", qHindi: "", ans: "No. (learned sages and devotees). (text 41).", ansHindi: "" },

  { q: "In brahminical culture a brahmana’s transcendental position is eternally maintained because the injunctions of the Vedas are accepted with faith, austerity, scriptural conclusions, full sense and mind control, and meditation. In this way the real goal of life is illuminated, just as one’s face is fully reflected in a clear mirror.", qHindi: "", ans: "Yes. (text 42).", ansHindi: "" },

  { q: "O respectable personalities present here, I beg the blessings of all of you that I may perpetually carry on my crown the dust of the lotus feet of such brahmanas and Vaishnavas until the end of my life.", qHindi: "", ans: "Yes. (text 43).", ansHindi: "" },

  { q: "Whoever acquires the brahminical qualifications — whose only wealth is good behaviour, who is grateful and who takes shelter of experienced persons — gets all the blessings of the world. I therefore wish that the SPOG and His associates be pleased with the brahmana class, with cows and with me.", qHindi: "", ans: "No. (gets all the opulences of the world). (text 44).", ansHindi: "" },

  { q: "They all declared that the Vedic conclusion that one can conquer the heavenly planets by the action of a putra, or son, was fulfilled, for the most sinful Vena, who had been killed by the curse of the great sages, was now delivered from the darkest region of hellish life by his son, Maharaja Prithu.", qHindi: "", ans: "No. (curse of the brahmanas). (text 46).", ansHindi: "" },

  { q: "Similarly, Hiranyakashipu, who by the dint of his sinful activities always defied the supremacy of the SPOG, entered into the darkest region of hellish life; but by the grace of his great son, Prahlad Maharaj, he also was delivered and went back home, back to Godhead.", qHindi: "", ans: "Yes. (text 47).", ansHindi: "" },

  { q: "Dear King Prithu, your reputation is the purest of all, for you are preaching the glories of the most glorified of all, the SPOG, the Lord of the brahmanas. Since, due to our great fortune, we have you as our master, we think that we are living directly under the master of all the universe.", qHindi: "", ans: "No. (under the agency of the Lord). (text 49).", ansHindi: "" },

  { q: "O father of this globe, it is your occupational duty to rule over your citizens. That is not a very wonderful task for a personality like you, who are so affectionate in seeing to the interests of the citizens, because you are full of mercy. That is the greatness of your character.", qHindi: "", ans: "No. (Our dear Lord). (text 50).", ansHindi: "" },

  { q: "Today you have opened our eyes and revealed how to cross to the other side of the ocean of darkness. By our past deeds and by the arrangement of superior authority, we are entangled in a network of fruitive activities and have been wandering within the universe.", qHindi: "", ans: "Yes. (text 51).", ansHindi: "" },

  { q: "Dear Lord, you are situated in your existential position of goodness; therefore you are the perfect representative of the Supreme Lord. You are glorified by your own prowess, and thus you are maintaining the entire world by introducing brahminical culture and protecting everyone in your line of duty as a Ksatriya.", qHindi: "", ans: "Yes. (text 52).", ansHindi: "" }
];



  const specialBlocks = {
    4: { 
      color: "red", 
      type: "move", 
      stepCount: -3,
      message: "Late for seva, go back to start" 
    },

    5: { 
      color: "red", 
      type: "move", 
      stepCount: -3,
      message: "Missed Mangala, go back to 2." 
    },

    9: { 
      color: "blue", 
      type: "move",
      stepCount: 4,
      message: "16 rounds done, move to 13.",
    },

    17: { 
      color: "red", 
      type: "move", 
      stepCount: -6,
      message: "Chanting incomplete, go back to 11." 
    },

    18: {
      color: "blue",
      type: "move",
      stepCount: 4,
      message: "Good reading, move to 22.",
    },

    20: { 
      color: "blue", 
      type: "flipTheQuestion", 
      stepCount: 4,
      message: "Attentive chanting, you can flip the question, if you want to. Move 4 paces.",
      // flipQuestion: {
      //   q: "In text 39, who is the supreme teacher?",
      //   ans: "Lord Brahma"
      // }
    },

    26: {
      color: "red", 
      type: "answerToMove",
      questionsCount: 2,
      stepCount: 1, // move 1 place for each correct answer
      message: "Prajalpa, answer 2 qs and move 2 paces"
    },

    28: { 
      color: "red", 
      type: "skipTurn", 
      stepCount: 1,
      skipCount: 1,
      message: "Offensive chanting, miss a turn and move 1 pace.",
    },

    35: {
      color: "blue",
      type: "extraTurn", 

      // dice rolling 2 times, answering question only once at the end of both rolls
      // if answered incorrectly, go 2nd roll value steps back 
      
      message: "Vrindavan parikrama done, extra turn, roll again.",
    },

    36: { 
      color: "blue", 
      type: "otherTeamAnswers", // player gets to move 2 places more unconditionally
      stepCount: 2, 
      message: " Mode of goodness, the other team will answer your question. Move 2 paces.",
    },

    42: { 
      color: "red", 
      type: "move",
      stepCount: -2,
      message: "Class cancelled, go back to 40."
    },

    46: {
      color: "red", 
      type: "skipTurn", 
      skipCount: 1,
      stepCount: 1,
      message: "Missed extra chanting for ekadashi, miss a turn.Move "
    },

    55: { 
      color: "blue", 
      type: "move",
      stepCount: 4,
      message: "Ekadashi chanting done, move to 59 and follow",
    },

    59: {
      color : "blue",
      type: "move",
      stepCount: 6,
      message: "Good sewa. Move to 65"
    },

    67: { 
      color: "red", 
      type: "answerForOppositeTeam",  // opposite team moves the dice value no. of steps unconditionally
      stepCount: 1,
      message: "Mode of ignorance,answer the other team's next question. Move one pace."
    },
    68: { 
      color: "blue", 
      type: "extraTurn", 
      message: "Completed Govardhana parikrama, take an extra turn.",
    },

    72: {
      color: "red",
      type: "answerTwoAndMove",
      questionsCount: 2,
      stepCount: 1,
      message: "Woke up late, answer 2 qs and move one pace."
    },

    74: {
      color: "red",
      type: "move", 
      stepCount: -4,
      message: "Ate without offering, go back to 70."
    },


    80: { 
      color: "red", 
      type: "move",
      stepCount: -8,
      message: "Missed ekadashi fasting, go back to 72 and follow instructions."
    },


    83: { 
      color: "blue", 
      type: "move",
      stepCount: 5,
      message: "Cleaned the temple, move to 88.",
    },

    84: {
      color: "blue",
      type: "otherTeamAnswers", // player gets to move 2 places more unconditionally
      stepCount: 2,
      message: "Gifted a BG, the other team shall answer your question and move 2 paces."
    },

    90: {
      color: "blue",
      type: "move",
      stepCount: 4,
      message: "Attended Mangala, move to 94."
    },

    95: {
      color: "blue",
      type: "move", 
      stepCount: 5,
      message: "Answered all questions correctly, go to finish!!!"
    },

    98: {
      color: "red",
      type: "skipTurn",
      stepCount: 1,
      message: "Offended a Vaishnava, miss a question"
    }
  };



  return (
    <div className="p-4 flex justify-center align-items-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <DiceBoard
        questions={questions}
        playerScores={{ p1: 0, p2: 0 }}
        specialBlocks={specialBlocks}
      />
    </div>
  );
}
