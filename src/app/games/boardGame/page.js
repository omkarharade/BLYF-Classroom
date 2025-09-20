import DiceBoard from "../../../components/Board";

export default function BoardGamePage() {
  const questions = [
  { q: "The piece of land where the hundred horse sacrifices took place is known as Brahmavarto, and it was controlled by ______ _______.", ans: "Svayambhuva Manu (t1)" },
  { q: "What does Karma - atisayam mean?", ans: "Excelling in fruitive activities. (t2)" },
  { q: "Since no one in this material world can tolerate another’s advancement, everyone in the material world is called _______, envious.", ans: "matsara (t2)" },
  { q: "Maharaj Prthu belonged to the ______ ______. The Vishnu-tattva indicates God, whereas the ______ ______ indicates the part and parcel of God.", ans: "Jiva-tattva ; Jiva-tattva (t3)" },
  { q: "“Abandon all varieties of religion and just surrender unto Me. I shall deliver you from all sinful reaction. Do not fear.” This is from the Bhagavad Gita, text number ______.", ans: "BG, 18.66 (t3)" },
  { q: "What does ‘sarvabhyam’ mean?", ans: "and by Lord Shiva. (t4)" },
  { q: "The Lord was accompanied by the residents of Siddhaloka and ______, all the descendants of Diti, and the demons and the Yaksas.", ans: "Vidyadhara-loka (t5)" },
  { q: "In this verse the word dharma-dugha is significant for it indicates ______ ______, which is also known as ______.", ans: "Kama-Dhenu; Surabhi (t7)" },
  { q: "The words “______ ______ ______” indicate very luxuriantly grown, big-bodied trees. (from purport).", ans: "Taravo-Bhuri-varsmanah (t8)" },
  { q: "There are four kinds of foodstuffs. These are technically known as ______ (chewed), ______ (licked), ______ (swallowed) and ______ (drunk).", ans: "carvya; lehya; cusya; peya (t9)" },
  { q: "The opulence of King Prithu was not dependent on material conditions. As described in this verse, he was a great devotee of ______. The word ______ indicates the Personality Of Godhead, who is beyond the expression of mind and words.", ans: "Adhoksaja ; adhoksaja (t10)" },
  { q: "King Indra is known as Sata-kratu, which indicates that he has performed 100 horse sacrifices. When King Prithu was performing one hundred Yajnas, King Indra did not want anyone to excel him. Being an ______ ______ ______, he became envious of King Prithu and stole the horse.", ans: "Ordinary living entity (t11)" },
  { q: "One who offers the results of his activities to the Supreme Personality of Godhead is actually a sannyasi and yogi. Cheating sannyasis and yogis have existed since the time of Prithu Maharaj’s sacrifice. This cheating was very foolishly introduced by ______ ______.", ans: "King Indra (t12)" },
  { q: "What do the words tistha tistha mean?", ans: "Just wait, just wait. (t13)" },
  { q: "What does vibudha-adhamam mean?", ans: "the lowest of all Demi-Gods. (t17)" },
  { q: "When the great sages observed the wonderful prowess of the son of King Prithu, they agreed to give him the name ______.", ans: "Vijitasva (t18)" },
  { q: "What does the word Vijitasva mean?", ans: "he who has won the horse. (t18)" },
  { q: "When the great sage ______ again gave directions, the son of King Prthu became very angry and placed an arrow on his bow.", ans: "Atri (t21)" },
  { q: "A tridandi-sannyasi is a ______ sannyasi, and an ekdandi-sannyasi is a ______ sannyasi.", ans: "Vaishnava; Mayavadi (t22)" },
  { q: "In Kali-yuga the ______ are very prominent. However, Lord Sri Caitanya Mahaprabhu has tried to kill all these ______ by introducing His Sankirtana movement.", ans: "Pakhandis; pakhandis (t22)" },
  { q: "The ______ ______ practically prohibit the adoption of sannyasa in the age of Kali because less intelligent men may accept the sannyasa order for cheating purposes.", ans: "Vedic Sashtras (t24 - 25)" },
  { q: "What does Sakra-Vadha mean?", ans: "Killing the king of heaven. (t27)" },
  { q: "When they were just ready to put the oblations in the fire, ______ ______ appeared on the scene and forbade them to start the sacrifice.", ans: "Lord Brahmana" },
  { q: "There is no possibility of Goddess Kali eating flesh or fish. Such offerings are accepted by the associates of Goddess Kali, known as ______, ______ and ______.", ans: "bhutas; pisacas; raksasas (t36)" },
  { q: "If one criticises or finds fault with such an empowered personality, one is to be considered an offender against Lord Vishnu and is punishable. Even though such offenders may dress as Vaishnavas with false ______ and ______, they are never forgiven by the Lord if they offend a pure Vaishnava.", ans: "tilaka; mala (t37)" },
  { q: "Lord Brahma addresses King Prthu as ______ just to remind him of his great responsibility in maintaining the peace and prosperity of the citizens.", ans: "Prajapate (t38)" }
];


  const specialBlocks = {
    4: { color: "red", type: "move", value: -3 }, // Go back to start
    9: { color: "blue", type: "extraTurn" },
    20: { color: "blue", type: "move", value: 4 },
    21: { color: "red", type: "move",    value: -4 },
    36: { color: "blue", type: "flipQuestion" },
    42: { color: "red", type: "doubleQuestion" },
    55: { color: "blue", type: "extraTurn" },
    67: { color: "red", type: "skipTurn" },
    68: { color: "blue", type: "move", value: 3 },
    80: { color: "red", type: "otherTeamAnswers" },
    83: { color: "blue", type: "oppositeAnswers" },
    99: { color: "red", type: "skipTurn" },
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
