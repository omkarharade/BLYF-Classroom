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
    q: "What does Karma-atisayam mean?",
    qHindi: "कर्म-अतिशयम का क्या अर्थ है?",
    ans: "Excelling in fruitive activities (t2)",
    ansHindi: "सकाम कर्मों में उत्कृष्टता। (क 2)"
  },
  {
    q: "Since no one in this material world can tolerate another's advancement, everyone in the material world is called _______, envious.",
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
    q: `Abandon all varieties of religion and just surrender unto Me. I shall deliver you from all sinful reaction. Do not fear." This is from the Bhagavad Gita, text number ______.`,
    qHindi: `सभी प्रकार के धर्मों को त्याग दो और केवल मेरी शरण में आओ। मैं तुम्हें सभी पापों से मुक्त कर दूँगा। डरो मत।" यह भगवद् गीता से है, पाठ संख्या ———।`,
    ans: `BG, 18.66 (t3)`,
    ansHindi: "BG, 18.66. (क 3)"
  },
  {
    q: "What does 'sarvabhyam' mean?",
    qHindi: "'सर्वाभ्याम्' का क्या अर्थ है?",
    ans: "and by Lord Shiva (t4)",
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
    qHindi: "इस श्लोक में धर्म-दुघा शब्द सार्थक है क्योंकि यह ———————- को इंगित करता है, जिसे ————- के नाम से भी जाना जाता है।",
    ans: "Kama-Dhenu; Surabhi (t7)",
    ansHindi: "काम-धेनु; सुरभि। (क 7)"
  },
  {
    q: `The words "______ ______ ______" indicate very luxuriantly grown, big-bodied trees. (from purport).`,
    qHindi: `शब्द "———- ———- ———-" बहुत ही भव्य रूप से विकसित, विशाल वृक्षों को इंगित करते हैं। (तात्पर्य से)।`,
    ans: "Taravo-Bhuri-varsmanah (t8)",
    ansHindi: "तरवो-भूरि-वर्षमानः। (ता 8)"
  },
  {
    q: "There are four kinds of foodstuffs. These are technically known as ______ (chewed), ______ (licked), ______ (swallowed) and ______ (drunk).",
    qHindi: "खाद्य पदार्थ चार प्रकार के होते हैं। इन्हें तकनीकी रूप से ———-(चबाया हुआ), ————— (चाटा हुआ), ———— (निगल लिया हुआ) और ——— (पीया हुआ) कहा जाता है।",
    ans: "carvya; lehya; cusya; peya (t9)",
    ansHindi: "चर्व्य; लेह्य; चूस्य; पेय। (ता 9)"
  },
  {
    q: "The opulence of King Prithu was not dependent on material conditions. As described in this verse, he was a great devotee of ______. The word ______ indicates the Personality Of Godhead, who is beyond the expression of mind and words.",
    qHindi: "राजा पृथु का ऐश्वर्य भौतिक परिस्थितियों पर निर्भर नहीं था। जैसा कि इस श्लोक में वर्णित है, वे ————- के महान भक्त थे। शब्द ——- भगवान के व्यक्तित्व को इंगित करता है, जो मन और शब्दों की अभिव्यक्ति से परे हैं।",
    ans: "Adhoksaja; adhoksaja (t10)",
    ansHindi: "अधोक्षज; अधोक्षज। (ता 10)"
  },
  {
    q: "King Indra is known as Sata-kratu, which indicates that he has performed 100 horse sacrifices. When King Prithu was performing one hundred Yajnas, King Indra did not want anyone to excel him. Being an ______ ______ _____, he became envious of King Prithu, and, making himself invisible, he stole the horse and thus impeded the yajna performance.",
    qHindi: "राजा इंद्र को शत-क्रतु के नाम से जाना जाता है, जो दर्शाता है कि उन्होंने 100 अश्वमेध यज्ञ किए हैं। जब राजा पृथु सौ यज्ञ कर रहे थे, राजा इंद्र नहीं चाहते थे कि कोई उनसे श्रेष्ठ हो। एक ———- ———- ———, वह राजा पृथु से ईर्ष्या करने लगे और स्वयं को अदृश्य बनाकर, घोड़ा चुरा लिया और इस प्रकार यज्ञ में बाधा उत्पन्न की।",
    ans: "Ordinary living entity (t11)",
    ansHindi: "साधारण जीव। (क 11)"
  },
  {
    q: "One who offers the results of his activities to the Supreme Personality of Godhead is actually a sannyasi and yogi. Cheating sannyasis and yogis have existed since the time of Prithu Maharaj's sacrifice. This cheating was very foolishly introduced by ______ _______.",
    qHindi: "जो अपने कर्मों के फल भगवान को अर्पित करता है, वह वास्तव में एक संन्यासी और योगी है। धोखेबाज संन्यासी और योगी पृथु महाराज के यज्ञ के समय से ही मौजूद हैं। यह धोखाधड़ी बहुत ही मूर्खतापूर्ण ढंग से ———- ———— द्वारा शुरू की गई थी।",
    ans: "King Indra (t12)",
    ansHindi: "राजा इंद्र। (क 12)"
  },
  {
    q: "What do the words tistha tistha mean?",
    qHindi: "तिष्ठ तिष्ठ शब्दों का क्या अर्थ है?",
    ans: "Just wait, just wait (t13)",
    ansHindi: "बस रुको, बस रुको। (क 13)"
  },
  {
    q: "What does vibudha-adhamam mean?",
    qHindi: "विबुध-अधमम् का क्या अर्थ है?",
    ans: "the lowest of all Demi-Gods (t15)",
    ansHindi: "सभी देवताओं में सबसे निम्न। (क 15)"
  },
  {
    q: "When the great sages observed the wonderful prowess of the son of King Prithu, they agreed to give him the name ______.",
    qHindi: "जब महान ऋषियों ने राजा पृथु के पुत्र के अद्भुत पराक्रम को देखा, तो वे उसे ————— नाम देने के लिए सहमत हुए।",
    ans: "Vijitasva (t18)",
    ansHindi: "विजितास्वा (क 18)"
  },
  {
    q: "What does the word Vijitasva mean?",
    qHindi: "विजितास्वा शब्द का क्या अर्थ है?",
    ans: "he who has won the horse (t18)",
    ansHindi: "वह जिसने घोड़ा जीत लिया हो। (क 18)"
  },
  {
    q: "When the great sage ______ again gave directions, the son of King Prthu became very angry and placed an arrow on his bow.",
    qHindi: "जब महान ऋषि ———- ने फिर से निर्देश दिए, तो राजा पृथु के पुत्र बहुत क्रोधित हुए और उन्होंने अपने धनुष पर एक बाण चढ़ा लिया।",
    ans: "Atri (t21)",
    ansHindi: "अत्रि। (क 21)"
  },
  {
    q: "A tridandi-sannyasi is a ______ sannyasi, and an ekdandi-sannyasi is a _______ sannyasi.",
    qHindi: "एक त्रिदंडी-संन्यासी एक ———— संन्यासी होता है, और एक एकदंडी-संन्यासी एक ————- संन्यासी होता है।",
    ans: "Vaishnava; Mayavadi (t22)",
    ansHindi: "वैष्णव; मायावादी। (क 22)"
  },
  {
    q: "In Kali-yuga the ______ are very prominent. However, Lord Sri Caitanya Mahaprabhu has tried to kill all these ______ by introducing His Sankirtana movement.",
    qHindi: "कलियुग में ———— बहुत प्रमुख हैं। हालाँकि, भगवान श्री चैतन्य महाप्रभु ने अपने संकीर्तन आंदोलन को शुरू करके इन सभी ———— को मारने की कोशिश की है।",
    ans: "Pakhandis; pakhandis (t22)",
    ansHindi: "पाखंडी; पाखंडी। (क 22)"
  },
  {
    q: "The ______ _______ practically prohibit the adoption of sannyasa in the age of Kali because less intelligent men may accept the sannyasa order for cheating purposes.",
    qHindi: "——— ————- कलियुग में संन्यास लेने पर व्यावहारिक रूप से प्रतिबंध लगाते हैं, क्योंकि कम बुद्धिमान लोग धोखे के उद्देश्य से संन्यास संप्रदाय को स्वीकार कर सकते हैं।",
    ans: "Vedic Sastras (t24-25)",
    ansHindi: "वैदिक शास्त्र। (क 24-25)"
  },
  {
    q: "What does Sakra-Vadha mean?",
    qHindi: "शक्र-वध का क्या अर्थ है?",
    ans: "Killing the king of heaven (t27)",
    ansHindi: "स्वर्ग के राजा का वध। (क 27)"
  },
  {
    q: "When they were just ready to put the oblations in the fire, ______ _______ appeared on the scene and forbade them to start the sacrifice.",
    qHindi: "जब वे अग्नि में आहुति डालने ही वाले थे, ——— ———- प्रकट हुए और उन्हें यज्ञ शुरू करने से मना किया।",
    ans: "Lord Brahma (t29)",
    ansHindi: "ब्रह्माजी (क 29)"
  },
  {
    q: "There is no possibility of Goddess Kali eating flesh or fish. Such offerings are accepted by the associates of Goddess Kali, known as ______, ______ and ______, and those who take the prasada of Goddess Kali in the shape of flesh or fish are not actually taking the prasada left by Goddess Kali, but the food left by the associates.",
    qHindi: "देवी काली के मांस या मछली खाने की कोई संभावना नहीं है। ऐसे प्रसाद देवी काली के सहयोगियों द्वारा स्वीकार किए जाते हैं, जिन्हें ———-, ———और ———- के रूप में जाना जाता है, और जो लोग मांस या मछली के रूप में देवी काली का प्रसाद ग्रहण करते हैं, वे वास्तव में देवी काली द्वारा छोड़ा गया प्रसाद नहीं, बल्कि सहयोगियों द्वारा छोड़ा गया भोजन ग्रहण कर रहे होते हैं।",
    ans: "bhutas, pisacas and raksasas (t36)",
    ansHindi: "भूत, पिशाच और राक्षस। (क 36)"
  },
  {
    q: "If one criticises or finds fault with such an empowered personality, one is to be considered an offender against Lord Vishnu and is punishable. Though such offenders may dress as Vaishnavas with false ______ and ______, they are never forgiven by the Lord if they offend a pure Vaishnava.",
    qHindi: "यदि कोई ऐसे सशक्त व्यक्तित्व की आलोचना करता है या उसमें दोष ढूँढ़ता है, तो उसे भगवान विष्णु के विरुद्ध अपराधी माना जाएगा और दंडनीय होगा। भले ही ऐसे अपराधी झूठे ——— और ———- के साथ वैष्णवों का वेश धारण करते हों, लेकिन यदि वे किसी शुद्ध वैष्णव को ठेस पहुँचाते हैं, तो भगवान उन्हें कभी क्षमा नहीं करते।",
    ans: "tilaka; mala (t37)",
    ansHindi: "तिलक; माला। (क 37)"
  },
  {
    q: "Lord Brahma addresses King Prthu as ______ just to remind him of his great responsibility in maintaining the peace and prosperity of the citizens.",
    qHindi: "भगवान ब्रह्मा ने राजा पृथु को ————- कहकर संबोधित किया ताकि उन्हें नागरिकों की शांति और समृद्धि बनाए रखने की उनकी महान जिम्मेदारी की याद दिलाई जा सके।",
    ans: "Prajapate (t38)",
    ansHindi: "प्रजापते। (क 38)"
  }
];

  const specialBlocks = {
    4: { 
      color: "red", 
      type: "move", 
      value: -3,
      message: "Late for seva, go back to start" 
    },
    9: { 
      color: "blue", 
      type: "extraTurn",
      message: "Good chanting. Extra turn",
      requiresAnswer: true
    },
    20: { 
      color: "blue", 
      type: "move", 
      value: 4,
      message: "Good reading. Move 4 places",
      requiresAnswer: true
    },
    21: { 
      color: "red", 
      type: "move", 
      value: -4,
      message: "Chanting incomplete. Go back 4 places"
    },
    36: { 
      color: "blue", 
      type: "flipQuestion",
      message: "Mandir darshan. You can flip the question",
      requiresAnswer: true,
      flipQuestion: {
        q: "In text 39, who is the supreme teacher?",
        ans: "Lord Brahma"
      }
    },
    42: { 
      color: "red", 
      type: "skipTurn",
      message: "Missed mangala. Miss a turn"
    },
    55: { 
      color: "blue", 
      type: "extraTurn",
      message: "In Vrindavan. Extra turn",
      requiresAnswer: true
    },
    67: { 
      color: "red", 
      type: "skipTurn",
      message: "Ekadashi, didn't chant. Miss a turn"
    },
    68: { 
      color: "blue", 
      type: "move", 
      value: 3,
      message: "Regular seva. Move 3 places",
      requiresAnswer: true
    },
    80: { 
      color: "red", 
      type: "answerOppositeTeamQuestion",
      message: "Mode of ignorance. You have to answer the other team's next question"
    },
    83: { 
      color: "blue", 
      type: "oppositeAnswers",
      message: "Mode of goodness. The opposite team shall answer for you",
      requiresAnswer: true
    },
    99: { 
      color: "red", 
      type: "skipTurn",
      message: "Class cancelled. Miss a turn"
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
