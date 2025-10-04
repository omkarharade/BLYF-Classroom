import DiceBoard from "../../../components/Board";

export default function BoardGamePage() {
  const questions = [
    {
      q: "The piece of land where the hundred horse sacrifices took place is known as Brahmavarto, and it was controlled by ______ _______.",
      qHindi: "वह भूमि जहाँ सौ अश्वमेध यज्ञ हुए थे, ब्रह्मवर्तो के नाम से जानी जाती है और इसका नियंत्रण ————— —————- के पास था।",
      ans: "Svayambhuva Manu (t1)",
      ansHindi: "स्वायंभुव मनु। (क 1)"
    },
    {
      q: "What does Karma - atisayam mean?",
      qHindi: "कर्म-अतिशयम का क्या अर्थ है?",
      ans: "Excelling in fruitive activities. (t2)",
      ansHindi: "सकाम कर्मों में उत्कृष्टता। (क 2)"
    },
    {
      q: "Since no one in this material world can tolerate another’s advancement, everyone in the material world is called _______, envious.",
      qHindi: "चूँकि इस भौतिक संसार में कोई भी दूसरे की उन्नति को सहन नहीं कर सकता, भौतिक संसार में सभी को ————-, ईर्ष्यालु कहा जाता है।",
      ans: "matsara (t2)",
      ansHindi: "मत्सर। (क 2)"
    },
    {
      q: "Maharaj Prthu belonged to the ______ ______. The Vishnu-tattva indicates God, whereas the ______ ______ indicates the part and parcel of God.",
      qHindi: "महाराज पृथु ——— ——- के थे। विष्णु-तत्व ईश्वर को दर्शाता है, जबकि ——- ——- ईश्वर के अंश को दर्शाता है।",
      ans: "Jiva-tattva ; Jiva-tattva (t3)",
      ansHindi: "जीव-तत्व; जीव-तत्व। (क 3)"
    },
    {
      q: "“Abandon all varieties of religion and just surrender unto Me. I shall deliver you from all sinful reaction. Do not fear.” This is from the Bhagavad Gita, text number ______.",
      qHindi: "“सभी प्रकार के धर्मों को त्याग दो और केवल मेरी शरण में आओ। मैं तुम्हें सभी पापों से मुक्त कर दूँगा। डरो मत।” यह भगवद् गीता से है, पाठ संख्या ———।",
      ans: "BG, 18.66 (t3)",
      ansHindi: "BG, 18.66. (क 3)"
    },
    {
      q: "What does ‘sarvabhyam’ mean?",
      qHindi: "'सर्वाभ्याम्' का क्या अर्थ है?",
      ans: "and by Lord Shiva. (t4)",
      ansHindi: "और भगवान शिव द्वारा। (क 4)"
    },
    {
      q: "The Lord was accompanied by the residents of Siddhaloka and ______, all the descendants of Diti, and the demons and the Yaksas.",
      qHindi: "भगवान के साथ सिद्धलोक के निवासी और ————-, दिति के सभी वंशज, राक्षस और यक्ष थे।",
      ans: "Vidyadhara-loka (t5)",
      ansHindi: "विद्याधर-लोक। (क 5)"
    },
    {
      q: "In this verse the word dharma-dugha is significant for it indicates ______ ______, which is also known as ______.",
      qHindi: "इस श्लोक में धर्म-दुग्ध शब्द सार्थक है क्योंकि यह ———————- को इंगित करता है, जिसे ————- के नाम से भी जाना जाता है।",
      ans: "Kama-Dhenu; Surabhi (t7)",
      ansHindi: "काम-धेनु; सुरभि। (क 7)"
    },
    {
      q: "The words “______ ______ ______” indicate very luxuriantly grown, big-bodied trees. (from purport).",
      qHindi: "शब्द “———- ———- ———-” बहुत ही भव्य रूप से विकसित, विशाल वृक्षों को इंगित करते हैं। (तात्पर्य से)।",
      ans: "Taravo-Bhuri-varsmanah (t8)",
      ansHindi: "तरवो-भूरि-वर्षमानः। (ता 8)"
    },
    {
      q: "There are four kinds of foodstuffs. These are technically known as ______ (chewed), ______ (licked), ______ (swallowed) and ______ (drunk).",
      qHindi: "खाद्य पदार्थ चार प्रकार के होते हैं। इन्हें तकनीकी रूप से ———-(चबाया हुआ), ————— (चाटा हुआ), ———— (निगल लिया हुआ) और ——— (पीया हुआ) कहा जाता है।",
      ans: "carvya; lehya; cusya; peya (t9)",
      ansHindi: "कार्व्य; लेह्य; कुस्य; पेय। (ता 9)"
    },
    {
      q: "The opulence of King Prithu was not dependent on material conditions. As described in this verse, he was a great devotee of ______. The word ______ indicates the Personality Of Godhead, who is beyond the expression of mind and words.",
      qHindi: "राजा पृथु का ऐश्वर्य भौतिक परिस्थितियों पर निर्भर नहीं था। जैसा कि इस श्लोक में वर्णित है, वे ————- के महान भक्त थे। शब्द ——- भगवान के व्यक्तित्व को इंगित करता है, जो मन और शब्दों की अभिव्यक्ति से परे हैं।",
      ans: "Adhoksaja ; adhoksaja (t10)",
      ansHindi: "अधोक्षज; अधोक्षज। (ता 10)"
    }
    // Continue similarly for all questions...
  ];

  const specialBlocks = {
    4: { color: "red", type: "move", value: -3 },
    9: { color: "blue", type: "extraTurn" },
    20: { color: "blue", type: "move", value: 4 },
    21: { color: "red", type: "move", value: -4 },
    36: { color: "blue", type: "flipQuestion" },
    42: { color: "red", type: "skipTurn" },
    55: { color: "blue", type: "extraTurn" },
    67: { color: "red", type: "skipTurn" },
    68: { color: "blue", type: "move", value: 3 },
    80: { color: "red", type: "answerOppositeTeamQuestion" },
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
