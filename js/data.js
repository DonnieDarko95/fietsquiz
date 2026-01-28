// ============================================================================
// FIETSQUIZ - GAME DATA
// Dutch Cycling Rules Educational Game for 9-year-old Children
// ============================================================================

// ============================================================================
// LEVELS
// ============================================================================

const LEVELS = [
  {
    id: 1,
    name: "De Eerste Trap",
    description: "Leer de basisregels van het fietsen",
    icon: "🚲",
    color: "#FF6B35",
    requiredXP: 0,
    lessons: ["1-1", "1-2", "1-3", "1-4"]
  },
  {
    id: 2,
    name: "Bordenkenner",
    description: "Leer alle verkeersborden kennen",
    icon: "🪧",
    color: "#004E89",
    requiredXP: 80,
    lessons: ["2-1", "2-2", "2-3", "2-4", "2-5"]
  },
  {
    id: 3,
    name: "Voorrang Meester",
    description: "Word een expert in voorrangsregels",
    icon: "🏆",
    color: "#2EC4B6",
    requiredXP: 180,
    lessons: ["3-1", "3-2", "3-3", "3-4"]
  },
  {
    id: 4,
    name: "Veilig op Weg",
    description: "Leer hoe je veilig de weg op gaat",
    icon: "🛡️",
    color: "#7B2D8E",
    requiredXP: 260,
    lessons: ["4-1", "4-2", "4-3", "4-4"]
  },
  {
    id: 5,
    name: "Fietsexamen",
    description: "Laat zien wat je hebt geleerd!",
    icon: "🎓",
    color: "#06D6A0",
    requiredXP: 340,
    lessons: ["5-1", "5-2", "5-3", "5-4"]
  }
];

// ============================================================================
// LESSONS
// ============================================================================

const LESSONS = {
  // ------------------------------------------------------------------------
  // LEVEL 1: DE EERSTE TRAP (Basisregels)
  // ------------------------------------------------------------------------

  "1-1": {
    id: "1-1",
    levelId: 1,
    name: "Rechts Rijden",
    description: "Leer waarom we rechts rijden",
    mode: "quiz",
    xpReward: 20,
    questions: [
      {
        question: "Aan welke kant van de weg moet je fietsen?",
        options: ["Links", "Rechts", "In het midden", "Maakt niet uit"],
        correct: 1,
        explanation: "In Nederland fietsen we altijd rechts op de weg. Zo weet iedereen waar je bent!"
      },
      {
        question: "Wat doe je als je op een fietspad fietst?",
        options: ["Ik fiets in het midden", "Ik fiets links", "Ik fiets rechts", "Ik slingert heen en weer"],
        correct: 2,
        explanation: "Ook op het fietspad blijf je rechts rijden. Dan kan iedereen je veilig inhalen."
      },
      {
        question: "Er is een fietspad. Moet je daar dan fietsen?",
        options: ["Nee, mag op de straat", "Ja, het fietspad is verplicht", "Alleen als het donker is", "Alleen bij slecht weer"],
        correct: 1,
        explanation: "Als er een fietspad is met een blauw bord, dan moet je daar fietsen. Dat is veiliger!"
      },
      {
        question: "Mag je met twee naast elkaar fietsen?",
        options: ["Ja, altijd", "Nee, nooit", "Ja, maar alleen op het fietspad", "Ja, maar je moet soms achter elkaar als er weinig ruimte is"],
        correct: 3,
        explanation: "Je mag met z'n tweeën naast elkaar, maar als het druk is of als auto's moeten inhalen, ga je achter elkaar rijden."
      },
      {
        question: "Je fietst achter een langzamere fietser. Wat doe je?",
        options: ["Ik ga links inhalen", "Ik ga rechts inhalen", "Ik blijf bellen tot hij opzij gaat", "Ik duw hem opzij"],
        correct: 0,
        explanation: "Je haalt altijd links in! Net zoals auto's dat doen. Rechts inhalen is gevaarlijk."
      },
      {
        question: "Waarom is het belangrijk om rechts te fietsen?",
        options: ["Omdat het zo hoort", "Zodat het verkeer voorspelbaar is en iedereen veilig kan rijden", "Om snel te kunnen rijden", "Omdat de politie het zegt"],
        correct: 1,
        explanation: "Als iedereen rechts rijdt, weet iedereen wat hij kan verwachten. Dat maakt het verkeer veilig!"
      },
      {
        question: "Er komt een tegenligger aan op het fietspad. Wat doe je?",
        options: ["Ik blijf gewoon rechts rijden", "Ik ga naar links", "Ik stop midden op de weg", "Ik ga harder fietsen"],
        correct: 0,
        explanation: "Je blijft altijd rechts! Als jullie allebei rechts blijven, kunnen jullie veilig langs elkaar."
      },
      {
        question: "Mag je over de stoep fietsen?",
        options: ["Ja, altijd handig", "Nee, de stoep is voor voetgangers", "Alleen als het druk is op straat", "Ja, als je snel gaat"],
        correct: 1,
        explanation: "De stoep is speciaal voor voetgangers. Fietsen hoort op de weg of het fietspad!"
      }
    ]
  },

  "1-2": {
    id: "1-2",
    levelId: 1,
    name: "Hand Uitsteken",
    description: "Leer wanneer en hoe je richting aangeeft",
    mode: "truefalse",
    xpReward: 20,
    questions: [
      {
        statement: "Je moet altijd je hand uitsteken als je linksaf gaat.",
        correct: true,
        explanation: "Ja! Steek altijd je hand uit zodat andere weggebruikers weten waar je heen gaat."
      },
      {
        statement: "Je hoeft geen hand uit te steken als er niemand in de buurt is.",
        correct: false,
        explanation: "Niet waar! Er kan altijd iemand zijn die je niet ziet. Steek altijd je hand uit."
      },
      {
        statement: "Als je rechtsaf gaat, steek je je rechterhand uit.",
        correct: true,
        explanation: "Klopt helemaal! Rechtsaf = rechterhand, linksaf = linkerhand."
      },
      {
        statement: "Je steekt je hand uit als je gaat stoppen of afstappen.",
        correct: true,
        explanation: "Zeker! Als je stopt, steek je je hand omhoog zodat anderen kunnen afremmen."
      },
      {
        statement: "Hand uitsteken is alleen belangrijk op drukke wegen.",
        correct: false,
        explanation: "Nee, je doet het altijd! Ook op rustige straten kunnen er opeens auto's of fietsers komen."
      },
      {
        statement: "Je steekt je hand uit voordat je afdraait, niet tijdens het afdraaien.",
        correct: true,
        explanation: "Precies! Je steekt je hand uit vóórdat je gaat draaien, zodat anderen tijd hebben om te reageren."
      },
      {
        statement: "Als je van het fietspad af gaat naar de gewone weg, moet je ook richting aangeven.",
        correct: true,
        explanation: "Ja! Elke keer dat je van richting verandert, geef je dat aan met je hand."
      },
      {
        statement: "Je mag ook gewoon roepen waar je heen gaat in plaats van je hand uitsteken.",
        correct: false,
        explanation: "Nee! Andere weggebruikers zien je hand beter. Roepen is niet genoeg."
      },
      {
        statement: "Als je omkijkt over je schouder, weten anderen ook wel welke kant je op gaat.",
        correct: false,
        explanation: "Niet waar! Omkijken is goed, maar je moet ook altijd je hand uitsteken."
      },
      {
        statement: "Je hand uitsteken is een verkeersregel waar iedereen zich aan moet houden.",
        correct: true,
        explanation: "Klopt! Het is een echte verkeersregel. Zo houden we het verkeer veilig voor iedereen."
      }
    ]
  },

  "1-3": {
    id: "1-3",
    levelId: 1,
    name: "Eerste Verkeerssituaties",
    description: "Wat doe je in deze situaties?",
    mode: "situation",
    xpReward: 20,
    questions: [
      {
        scenario: "Je wilt linksaf een zijstraat in. Er komt van achteren een auto aanrijden.",
        image: "left-turn-car",
        options: [
          "Ik draai snel linksaf voordat de auto er is",
          "Ik steek mijn hand uit, kijk achterom, wacht tot de auto voorbij is en ga dan linksaf",
          "Ik stop midden op de weg",
          "Ik roep naar de auto"
        ],
        correct: 1,
        explanation: "Perfect! Eerst hand uitsteken, omkijken, wachten tot het veilig is, en dan pas afslaan."
      },
      {
        scenario: "Je komt bij een zebrapad. Er staat een mevrouw te wachten om over te steken.",
        image: "zebra-crossing",
        options: [
          "Ik fiets snel door",
          "Ik rem af en laat de mevrouw oversteken",
          "Ik bel met mijn fietsbel",
          "Ik fiets om haar heen"
        ],
        correct: 1,
        explanation: "Super! Bij een zebrapad hebben voetgangers altijd voorrang. Wacht tot ze over zijn."
      },
      {
        scenario: "Het regent hard. Je fietst naar school en het is glad op de weg.",
        image: "rainy-road",
        options: [
          "Ik ga extra hard fietsen zodat ik snel thuis ben",
          "Ik fiets voorzichtiger, rem op tijd en let extra goed op",
          "Ik ga slalommen, dat is leuker",
          "Ik fiets over de stoep, dat is droger"
        ],
        correct: 1,
        explanation: "Goed zo! Bij regen is het gladder, dus fiets je rustiger en ben je extra voorzichtig."
      },
      {
        scenario: "Je rijdt op een fietspad. Voor je zit een groep fietsers rustig te fietsen.",
        image: "slow-cyclists",
        options: [
          "Ik bel keihard en roep dat ze opzij moeten",
          "Ik ga rechts inhalen tussen hen en de stoep",
          "Ik bel vriendelijk, steek mijn hand uit en haal ze links in als het kan",
          "Ik blijf gewoon achter ze fietsen tot ze er af gaan"
        ],
        correct: 2,
        explanation: "Netjes! Je belt vriendelijk, geeft richting aan en haalt links in wanneer het veilig is."
      },
      {
        scenario: "Je ziet een bal de straat oprollen. Er zijn kinderen aan het spelen.",
        image: "ball-on-road",
        options: [
          "Ik fiets gewoon door",
          "Ik rem af en let goed op, want er kan zo een kind achter de bal aan rennen",
          "Ik ga harder fietsen om snel langs de bal te komen",
          "Ik pak de bal en gooi hem terug"
        ],
        correct: 1,
        explanation: "Heel goed! Als er een bal rolt, kan er zo een kind achter aan rennen. Altijd afremmen!"
      },
      {
        scenario: "Je fietst 's avonds naar huis en het begint donker te worden.",
        image: "getting-dark",
        options: [
          "Ik fiets snel naar huis voordat het helemaal donker is",
          "Ik doe mijn voor- en achterlicht aan",
          "Ik fiets in het midden van de weg, dan zien ze me beter",
          "Ik ga naar huis via de stoep"
        ],
        correct: 1,
        explanation: "Precies! Zodra het een beetje donker wordt, doe je je licht aan. Veiligheid eerst!"
      },
      {
        scenario: "Je komt bij een drempel in de weg (verkeersdrempel).",
        image: "speed-bump",
        options: [
          "Ik fiets er keihard overheen, dat is spannend",
          "Ik rem af en fiets er rustig overheen",
          "Ik ga eromheen via de stoep",
          "Ik til mijn fiets op"
        ],
        correct: 1,
        explanation: "Goed gedaan! Drempels zijn er om je langzamer te laten rijden. Rem af en ga rustig erover."
      },
      {
        scenario: "Je bent met je vrienden onderweg. Jullie fietsen met z'n drieën naast elkaar en achter jullie komt een auto.",
        image: "three-cyclists",
        options: [
          "We blijven gewoon met z'n drieën naast elkaar fietsen",
          "We gaan achter elkaar fietsen zodat de auto ons kan inhalen",
          "We gaan harder fietsen",
          "We stoppen aan de kant"
        ],
        correct: 1,
        explanation: "Keurig! Als er een auto moet inhalen, ga je achter elkaar rijden. Zo help je het verkeer!"
      }
    ]
  },

  "1-4": {
    id: "1-4",
    levelId: 1,
    name: "Basisregels Samenvatting",
    description: "Herhaal wat je hebt geleerd",
    mode: "flashcards",
    xpReward: 20,
    questions: [
      {
        front: "Aan welke kant van de weg fiets je?",
        back: "Altijd rechts! Zo weet iedereen waar je bent en kan het verkeer veilig doorrijden."
      },
      {
        front: "Wanneer moet je je hand uitsteken?",
        back: "Als je linksaf, rechtsaf gaat of stopt. Steek je hand uit vóórdat je gaat draaien, zodat anderen tijd hebben om te reageren."
      },
      {
        front: "Hoe haal je een andere fietser in?",
        back: "Altijd links inhalen! Bel vriendelijk, steek je hand uit en haal in als het veilig is. Nooit rechts inhalen."
      },
      {
        front: "Is er een fietspad met een blauw bord. Moet je daar fietsen?",
        back: "Ja! Als er een verplicht fietspad is (blauw rond bord met witte fiets), moet je daar fietsen. Het is veiliger."
      },
      {
        front: "Wat doe je als er een voetganger bij het zebrapad staat?",
        back: "Rem af en laat de voetganger oversteken. Bij een zebrapad hebben voetgangers altijd voorrang!"
      },
      {
        front: "Mag je over de stoep fietsen?",
        back: "Nee! De stoep is voor voetgangers. Jij fietst op de weg of het fietspad."
      },
      {
        front: "Het regent en de weg is glad. Wat doe je?",
        back: "Fiets rustiger, rem eerder af en let extra goed op. Bij slecht weer is het gevaarlijker!"
      },
      {
        front: "Wanneer moet je je fietslicht aandoen?",
        back: "Zodra het een beetje donker wordt of bij slecht zicht (regen, mist). Voor- én achterlicht aan!"
      },
      {
        front: "Waarom mag je niet met z'n drieën naast elkaar fietsen als er een auto komt?",
        back: "Dan kan de auto niet veilig inhalen. Ga achter elkaar rijden, dan help je het verkeer en blijft het veilig."
      },
      {
        front: "Wat is de belangrijkste regel in het verkeer?",
        back: "Veiligheid voor alles! Let altijd goed op, denk na over wat je doet en wees aardig voor andere weggebruikers."
      }
    ]
  },

  // ------------------------------------------------------------------------
  // LEVEL 2: BORDENKENNER (Verkeersborden)
  // ------------------------------------------------------------------------

  "2-1": {
    id: "2-1",
    levelId: 2,
    name: "Gebodsborden",
    description: "Leer de blauwe ronde borden kennen",
    mode: "quiz",
    xpReward: 20,
    questions: [
      {
        question: "Wat betekent een blauw rond bord met een witte fiets?",
        options: ["Hier mag je fietsen", "Hier MOET je fietsen (verplicht fietspad)", "Fietsen verboden", "Voorzichtig, fietsers"],
        correct: 1,
        explanation: "Dit is een verplicht fietspad! Als je dit bord ziet, moet je op het fietspad fietsen."
      },
      {
        question: "Je ziet een blauw bord met een witte pijl die naar rechts wijst. Wat betekent dit?",
        options: ["Je mag alleen rechtsaf", "Rechts is de goede richting", "Je MOET rechtsaf (verplichte rijrichting)", "Rechts is gevaarlijk"],
        correct: 2,
        explanation: "Een blauwe pijl betekent: dit is de verplichte rijrichting! Je moet de kant op die de pijl aangeeft."
      },
      {
        question: "Wat is de vorm van gebodsborden?",
        options: ["Vierkant", "Driehoek", "Rond", "Achthoek"],
        correct: 2,
        explanation: "Gebodsborden zijn altijd rond en blauw met witte symbolen!"
      },
      {
        question: "Welke kleur hebben gebodsborden?",
        options: ["Rood", "Blauw", "Geel", "Groen"],
        correct: 1,
        explanation: "Gebodsborden zijn blauw! Zo kun je ze makkelijk herkennen."
      },
      {
        question: "Een blauw rond bord met een witte auto en een witte fiets. Wat betekent dit?",
        options: ["Auto's en fietsen verboden", "Let op: auto's en fietsers", "Verplicht gezamenlijk pad voor auto's en fietsers", "Auto's moeten voor fietsers uitkijken"],
        correct: 2,
        explanation: "Dit bord betekent dat auto's en fietsers samen gebruik moeten maken van deze weg!"
      },
      {
        question: "Wat moet je doen als je een gebodsbord ziet?",
        options: ["Het is alleen een tip", "Je moet doen wat het bord zegt", "Je mag zelf kiezen", "Het geldt alleen voor auto's"],
        correct: 1,
        explanation: "Gebodsborden zijn verplicht! Je moet doen wat erop staat."
      },
      {
        question: "Je ziet een blauw rond bord met een witte fiets en een bromfiets. Wat betekent dit?",
        options: ["Fietsers en bromfietsers verboden", "Verplicht pad voor fietsers en bromfietsers", "Bromfietsers moeten opletten voor fietsers", "Alleen voor snelle fietsers"],
        correct: 1,
        explanation: "Dit is een verplicht pad voor fietsers EN bromfietsers. Jullie delen dit pad samen!"
      },
      {
        question: "Waarom zijn gebodsborden blauw en niet rood?",
        options: ["Blauw is mooier", "Blauw betekent dat iets MOET, rood betekent dat iets NIET MAG", "Dat is toevallig zo", "Blauw zie je beter"],
        correct: 1,
        explanation: "Slim! Blauwe borden = je moet iets doen. Rode borden = je mag iets niet doen."
      }
    ]
  },

  "2-2": {
    id: "2-2",
    levelId: 2,
    name: "Verbodsborden",
    description: "Leer de rode ronde borden kennen",
    mode: "quiz",
    xpReward: 20,
    questions: [
      {
        question: "Wat betekent een rood rond bord met een witte streep erdoor?",
        options: ["Parkeren verboden", "Inrijden verboden voor alle verkeer", "Gevaarlijke weg", "Eenrichtingsverkeer"],
        correct: 1,
        explanation: "Dit bord betekent: hier mag je niet in! Het geldt voor iedereen: auto's, fietsers, iedereen!"
      },
      {
        question: "Je ziet een rood rond bord met een fiets erop. Wat betekent dit?",
        options: ["Verplicht fietspad", "Fietsen verboden", "Let op: fietsers!", "Fietsers moeten afstappen"],
        correct: 1,
        explanation: "Een rode cirkel met een fiets = fietsen verboden! Je mag hier niet fietsen."
      },
      {
        question: "Welke kleur hebben verbodsborden?",
        options: ["Blauw", "Geel", "Rood", "Groen"],
        correct: 2,
        explanation: "Verbodsborden zijn altijd rood! Zo onthoud je: rood = stop, niet doen!"
      },
      {
        question: "Een rood rond bord met twee witte auto's naast elkaar. Wat betekent dit?",
        options: ["Twee auto's naast elkaar verplicht", "Inhalen verboden", "Parkeren voor twee auto's", "Langzaam rijden"],
        correct: 1,
        explanation: "Dit bord betekent: inhalen verboden! Je mag niet langs een ander voertuig rijden."
      },
      {
        question: "Je ziet een rood bord met '30' erop. Wat betekent dit?",
        options: ["Je moet 30 km/u rijden", "Je mag maximaal 30 km/u rijden", "Over 30 meter afslaan", "30 auto's per uur"],
        correct: 1,
        explanation: "Dit is een maximumsnelheid! Je mag niet harder dan 30 km/u rijden hier."
      },
      {
        question: "Wat is het verschil tussen een rood en een blauw bord?",
        options: ["Geen verschil", "Rood = verbod (niet doen), Blauw = gebod (moet doen)", "Rood is voor fietsers, blauw voor auto's", "Rood overdag, blauw 's nachts"],
        correct: 1,
        explanation: "Heel goed! Rood = VERBODEN, Blauw = VERPLICHT. Dat is het grote verschil!"
      },
      {
        question: "Een rood rond bord met een auto erop. Wat moet je doen als je fietst?",
        options: ["Het geldt alleen voor auto's, ik mag wel", "Ik moet ook opletten, misschien staat er een speciaal fietsbord", "Ik ga via een andere weg", "Ik stap af van mijn fiets"],
        correct: 1,
        explanation: "Let op! Een verbod voor auto's geldt niet automatisch voor fietsers. Kijk of er een apart bord voor fietsers hangt!"
      },
      {
        question: "Je ziet een rood driehoekig bord. Is dit een verbodsbord?",
        options: ["Ja, rood betekent altijd verbod", "Nee, verbodsborden zijn altijd rond. Een driehoek is een waarschuwingsbord", "Alleen als er een fiets op staat", "Alleen bij slecht weer"],
        correct: 1,
        explanation: "Goed opgelet! Verbodsborden zijn altijd ROND en rood. Driehoeken zijn waarschuwingsborden!"
      }
    ]
  },

  "2-3": {
    id: "2-3",
    levelId: 2,
    name: "Waarschuwingsborden",
    description: "Sleep het bord naar de juiste betekenis",
    mode: "matching",
    xpReward: 20,
    questions: [{
      instruction: "Sleep het verkeersbord naar de juiste betekenis",
      items: [
      { id: "d1", content: "🔺 Rood driehoekig bord met fiets", target: "t1" },
      { id: "d2", content: "🔺 Rood driehoekig bord met kinderen", target: "t2" },
      { id: "d3", content: "🔺 Rood driehoekig bord met glad wegdek (slingerende auto)", target: "t3" },
      { id: "d4", content: "🔺 Rood driehoekig bord met driehoek punten naar beneden (haaientanden)", target: "t4" },
      { id: "d5", content: "🔺 Rood driehoekig bord met uitroepteken", target: "t5" },
      { id: "d6", content: "🔺 Rood driehoekig bord met bocht", target: "t6" }
    ],
    targets: [
      { id: "t1", content: "Let op: fietsers steken over!" },
      { id: "t2", content: "Let op: kinderen kunnen oversteken!" },
      { id: "t3", content: "Let op: glad wegdek!" },
      { id: "t4", content: "Voorrang verlenen! Anderen gaan voor" },
      { id: "t5", content: "Let op: gevaar!" },
      { id: "t6", content: "Let op: gevaarlijke bocht!" }
    ]}]
  },

  "2-4": {
    id: "2-4",
    levelId: 2,
    name: "Borden Memory",
    description: "Zoek de bij elkaar horende borden",
    mode: "memory",
    xpReward: 20,
    questions: [{
      pairs: [
      { id: "m1", front: "🔵 Rond blauw bord", back: "Dit is een gebodsbord - het zegt wat je MOET doen", match: "a" },
      { id: "m2", front: "Gebodsbord", back: "🔵 Blauw rond bord", match: "a" },

      { id: "m3", front: "🔴 Rond rood bord", back: "Dit is een verbodsbord - het zegt wat NIET mag", match: "b" },
      { id: "m4", front: "Verbodsbord", back: "🔴 Rood rond bord", match: "b" },

      { id: "m5", front: "🔺 Rood driehoekig bord", back: "Dit is een waarschuwingsbord - let op gevaar!", match: "c" },
      { id: "m6", front: "Waarschuwingsbord", back: "🔺 Rode driehoek", match: "c" },

      { id: "m7", front: "🔵🚲 Blauw bord met fiets", back: "Verplicht fietspad - je MOET hier fietsen", match: "d" },
      { id: "m8", front: "Verplicht fietspad", back: "🔵🚲 Blauw rond bord met witte fiets", match: "d" },

      { id: "m9", front: "🔴🚲 Rood bord met fiets", back: "Fietsen verboden - je MAG hier NIET fietsen", match: "e" },
      { id: "m10", front: "Fietsen verboden", back: "🔴🚲 Rood rond bord met fiets", match: "e" },

      { id: "m11", front: "🔺▽ Haaientanden", back: "Voorrang verlenen - stop en laat anderen voorgaan", match: "f" },
      { id: "m12", front: "Voorrang verlenen", back: "🔺▽ Driehoekjes op de weg (haaientanden)", match: "f" }
    ]}]
  },

  "2-5": {
    id: "2-5",
    levelId: 2,
    name: "Bordenoverzicht",
    description: "Herhaal alle borden",
    mode: "flashcards",
    xpReward: 20,
    questions: [
      {
        front: "Welke vorm en kleur hebben gebodsborden?",
        back: "Gebodsborden zijn ROND en BLAUW met witte symbolen. Ze vertellen wat je MOET doen."
      },
      {
        front: "Welke vorm en kleur hebben verbodsborden?",
        back: "Verbodsborden zijn ROND en ROOD (soms met witte cirkel). Ze vertellen wat NIET mag."
      },
      {
        front: "Welke vorm en kleur hebben waarschuwingsborden?",
        back: "Waarschuwingsborden zijn DRIEHOEKIG met een RODE rand. Ze waarschuwen voor gevaar."
      },
      {
        front: "Wat betekent een blauw rond bord met een witte fiets?",
        back: "Verplicht fietspad! Als je dit bord ziet, moet je op het fietspad rijden."
      },
      {
        front: "Wat betekent een rood rond bord met een fiets erop?",
        back: "Fietsen verboden! Hier mag je niet fietsen. Zoek een andere route."
      },
      {
        front: "Wat betekent een rood rond bord met een witte streep (verboden in te rijden)?",
        back: "Hier mag niemand in! Dit geldt voor alle verkeer: auto's, fietsers, iedereen."
      },
      {
        front: "Wat zijn haaientanden en wat betekenen ze?",
        back: "Haaientanden zijn witte driehoekjes op de weg. Ze betekenen: STOP en verleen voorrang aan anderen!"
      },
      {
        front: "Wat betekent een driehoekig bord met fietsers erop?",
        back: "Let op! Hier kunnen fietsers oversteken. Wees extra voorzichtig!"
      },
      {
        front: "Wat betekent een driehoekig bord met kinderen erop?",
        back: "Let op! Hier kunnen kinderen de weg oversteken. Rijd langzaam en wees alert!"
      },
      {
        front: "Waarom zijn verkeersborden belangrijk?",
        back: "Ze zorgen dat iedereen weet wat de regels zijn. Zo blijft het verkeer veilig en voorspelbaar voor iedereen!"
      }
    ]
  },

  // ------------------------------------------------------------------------
  // LEVEL 3: VOORRANG MEESTER (Voorrang & Kruispunten)
  // ------------------------------------------------------------------------

  "3-1": {
    id: "3-1",
    levelId: 3,
    name: "Voorrangsregels Basis",
    description: "Wie mag er eerst?",
    mode: "quiz",
    xpReward: 20,
    questions: [
      {
        question: "Je fietst op een kruispunt zonder borden. Van rechts komt een auto. Wie mag er eerst?",
        options: ["Ik, want ik ben er het eerst", "De auto, want auto's gaan altijd voor", "De auto, want die komt van rechts", "We moeten allebei stoppen"],
        correct: 2,
        explanation: "Rechts gaat voor! Op een kruispunt zonder borden moet je voorrang geven aan verkeer van rechts."
      },
      {
        question: "Wat is de belangrijkste voorrangsregel?",
        options: ["Links gaat voor", "De grootste gaat voor", "Rechts gaat voor", "De snelste gaat voor"],
        correct: 2,
        explanation: "Onthoud dit goed: RECHTS GAAT VOOR! Dit is de basisregel bij kruispunten zonder borden."
      },
      {
        question: "Je komt bij haaientanden op de weg. Wat moet je doen?",
        options: ["Doorrijden, het zijn maar strepen", "Afremmen en voorrang verlenen aan verkeer op de andere weg", "Harder rijden", "Alleen kijken"],
        correct: 1,
        explanation: "Haaientanden betekenen: STOP en geef voorrang! Laat anderen eerst gaan."
      },
      {
        question: "Je fietst op een grote weg. Er is een zijweg met haaientanden. Wie gaat er voor?",
        options: ["De fietser uit de zijweg", "Ik, want ik zit op de grote weg", "Wie het hardst fietst", "We moeten allebei stoppen"],
        correct: 1,
        explanation: "Jij gaat voor! Verkeer uit de zijweg met haaientanden moet voorrang aan jou verlenen."
      },
      {
        question: "Er staat een bord met een gele ruit (voorrangsweg). Wat betekent dit?",
        options: ["Gevaarlijke weg", "Jij hebt voorrang op dit gedeelte", "Fietspad", "Langzaam rijden"],
        correct: 1,
        explanation: "De gele ruit betekent: jij rijdt op een voorrangsweg! Anderen moeten jou laten voorgaan."
      },
      {
        question: "Je wilt linksaf een kruispunt op. Er komt verkeer van voren. Wie gaat er voor?",
        options: ["Ik, want ik was er eerst", "Het verkeer dat rechtdoor gaat", "Ik, want ik ga linksaf", "We moeten allebei stoppen"],
        correct: 1,
        explanation: "Rechtdoor gaat voor links! Als jij linksaf gaat, moet je wachten op verkeer dat rechtdoor gaat."
      },
      {
        question: "Je fietst rechtdoor, iemand anders wil linksaf. Wie gaat er voor?",
        options: ["Wie linksaf gaat", "Ik, want rechtdoor gaat voor linksaf", "Degene die er eerst was", "Allebei tegelijk"],
        correct: 1,
        explanation: "Jij! Rechtdoor gaand verkeer gaat altijd voor op afslaand verkeer."
      },
      {
        question: "Bij een kruispunt zonder borden komt links, rechts en voren verkeer aan. Wie moet jij als eerste laten gaan?",
        options: ["Links", "Rechts", "Voren", "Niemand, ik ga eerst"],
        correct: 1,
        explanation: "Rechts gaat altijd eerst! Daarna mag degene die vóór je is, en dan pas links."
      },
      {
        question: "Waarom is de regel 'rechts gaat voor' zo belangrijk?",
        options: ["Omdat politie dat zegt", "Zodat iedereen weet wie er mag gaan en het verkeer veilig blijft", "Omdat rechts een mooiere kant is", "Het maakt niet uit"],
        correct: 1,
        explanation: "Precies! Als iedereen dezelfde regel kent, weet iedereen wat er gaat gebeuren. Dat is veilig!"
      }
    ]
  },

  "3-2": {
    id: "3-2",
    levelId: 3,
    name: "Kruispunten Met Borden",
    description: "Voorrang met verkeersborden",
    mode: "situation",
    xpReward: 20,
    questions: [
      {
        scenario: "Je komt bij een kruispunt. Er staan haaientanden en je ziet verkeer van links aankomen.",
        image: "intersection-sharks-teeth",
        options: [
          "Ik rijd snel door voordat het verkeer er is",
          "Ik stop, wacht tot het veilig is en geef voorrang aan het verkeer",
          "Ik bel hard zodat ze weten dat ik eraan kom",
          "Ik ga half stoppen en kijk alleen"
        ],
        correct: 1,
        explanation: "Perfect! Haaientanden betekenen: stoppen en voorrang geven. Wacht tot alles veilig is."
      },
      {
        scenario: "Je fietst op een weg met een gele ruit (voorrangsweg). Bij een kruispunt komt van rechts een fietser zonder voorrangsborden.",
        image: "priority-road-diamond",
        options: [
          "Ik moet stoppen want rechts gaat voor",
          "Ik mag doorrijden want ik heb voorrang door de gele ruit",
          "We moeten allebei stoppen",
          "Wie het eerst komt mag gaan"
        ],
        correct: 1,
        explanation: "Goed zo! De gele ruit geeft jou voorrang. De regel 'rechts gaat voor' geldt hier niet!"
      },
      {
        scenario: "Je wilt een grote weg oprijden vanuit een zijstraat. Er staan haaientanden bij jouw zijstraat.",
        image: "side-road-sharks-teeth",
        options: [
          "Ik rijd gewoon de grote weg op",
          "Ik stop, kijk goed en wacht tot het verkeer op de grote weg voorbij is",
          "Ik steek mijn hand uit en rijd",
          "Ik ga extra hard fietsen"
        ],
        correct: 1,
        explanation: "Uitstekend! Jij hebt haaientanden, dus jij moet wachten. Verkeer op de grote weg gaat voor."
      },
      {
        scenario: "Je komt bij een stopbord (achthoekig rood bord met STOP). Er is geen verkeer te zien.",
        image: "stop-sign",
        options: [
          "Geen verkeer, dus ik rijd door",
          "Ik moet altijd volledig stoppen bij een stopbord, ook als er niemand is",
          "Ik fiets heel langzaam",
          "Ik kijk alleen goed om me heen"
        ],
        correct: 1,
        explanation: "Heel goed! Bij een stopbord moet je ALTIJD stoppen, ook als er niemand te zien is!"
      },
      {
        scenario: "Je fietst op een voorrangsweg (gele ruit). Het bord met de gele ruit heeft een zwarte streep erdoor.",
        image: "end-priority-road",
        options: [
          "Ik heb nog steeds voorrang",
          "De voorrangsweg stopt hier, nu gelden de normale voorrangsregels weer",
          "Ik moet stoppen",
          "Het bord is kapot"
        ],
        correct: 1,
        explanation: "Slim! Een streep door een bord betekent: het bord stopt hier. Nu geldt 'rechts gaat voor' weer."
      },
      {
        scenario: "Je komt bij een T-kruising. Jij komt uit de straat die doodloopt. Er zijn geen borden.",
        image: "t-junction",
        options: [
          "Ik heb voorrang",
          "Ik moet voorrang verlenen aan verkeer op de doorgaande weg",
          "Rechts gaat voor, dus ik kijk alleen rechts",
          "Iedereen moet stoppen"
        ],
        correct: 1,
        explanation: "Goed gedaan! Bij een T-kruising zonder borden moet verkeer uit de doodlopende weg wachten."
      },
      {
        scenario: "Bij een kruispunt zie je een geel knipperend licht. Wat betekent dit?",
        image: "yellow-blinking-light",
        options: [
          "Stoppen!",
          "Extra opletten, er kan gevaar zijn",
          "Doorrijden, het stoplicht is kapot",
          "Rechtsaf gaan"
        ],
        correct: 1,
        explanation: "Geel knipperend licht betekent: wees extra voorzichtig! Let goed op en volg de voorrangsregels."
      },
      {
        scenario: "Je ziet een bord met een rode rand en daarin een zwarte voorrangskruispunt (dik en dun kruis). Wat betekent dit?",
        image: "priority-crossing-sign",
        options: [
          "Ik heb voorrang",
          "Kruispunt met voorrangsweg, ik moet voorrang verlenen",
          "Gevaarlijk kruispunt",
          "Stoppen verplicht"
        ],
        correct: 1,
        explanation: "Dit bord waarschuwt: er komt een kruispunt waar de andere weg voorrang heeft. Wees alert!"
      }
    ]
  },

  "3-3": {
    id: "3-3",
    levelId: 3,
    name: "Rotondes en Haaientanden",
    description: "Leer de regels op rotondes",
    mode: "truefalse",
    xpReward: 20,
    questions: [
      {
        statement: "Op een rotonde heeft het verkeer op de rotonde altijd voorrang.",
        correct: true,
        explanation: "Ja! Als je een rotonde oprijdt, moet je wachten op verkeer dat al op de rotonde rijdt."
      },
      {
        statement: "Haaientanden betekenen dat je moet stoppen en voorrang verlenen.",
        correct: true,
        explanation: "Precies! Haaientanden (witte driehoekjes) betekenen: stop en laat anderen voorgaan."
      },
      {
        statement: "Bij een rotonde moet je altijd naar links kijken voordat je erop rijdt.",
        correct: true,
        explanation: "Goed! Op de rotonde rijdt verkeer van links naar rechts, dus kijk naar links!"
      },
      {
        statement: "Als je van een rotonde afgaat, hoef je geen richting aan te geven.",
        correct: false,
        explanation: "Niet waar! Je moet altijd richting aangeven als je de rotonde verlaat. Steek je rechterhand uit!"
      },
      {
        statement: "Haaientanden staan altijd bij gevaarlijke bochten.",
        correct: false,
        explanation: "Nee! Haaientanden staan bij kruispunten waar je voorrang moet verlenen aan de andere weg."
      },
      {
        statement: "Op een rotonde rijd je met de klok mee (naar rechts).",
        correct: true,
        explanation: "Ja! In Nederland rijden we op rotondes altijd rechtsom (met de klok mee)."
      },
      {
        statement: "Je mag op een rotonde een andere fietser inhalen.",
        correct: false,
        explanation: "Niet doen! Rotondes zijn meestal te smal en het is gevaarlijk. Blijf achter de fietser."
      },
      {
        statement: "Als er haaientanden staan, mag je alleen doorfietsen als er echt niemand aankomt.",
        correct: true,
        explanation: "Helemaal juist! Haaientanden betekenen: wachten en alleen gaan als het veilig is."
      },
      {
        statement: "Bij het oprijden van een rotonde geef je rechts richting aan.",
        correct: false,
        explanation: "Nee! Je geeft alleen richting aan als je de rotonde AFgaat. Bij oprijden niet nodig."
      },
      {
        statement: "Sommige grote rotondes hebben fietsstroken met eigen voorrangsregels.",
        correct: true,
        explanation: "Klopt! Op grote rotondes kunnen speciale fietspaden zijn. Let altijd goed op de borden!"
      }
    ]
  },

  "3-4": {
    id: "3-4",
    levelId: 3,
    name: "Moeilijke Kruispunten",
    description: "Test je voorrang kennis",
    mode: "situation",
    xpReward: 20,
    questions: [
      {
        scenario: "Kruispunt zonder borden. Van links komt een bus, van rechts een fiets, van voren een auto. Jij wilt rechtdoor. Wie gaat er als eerste?",
        image: "complex-intersection-1",
        options: [
          "De bus, want die is het grootst",
          "De fiets van rechts",
          "De auto van voren",
          "Ik, want ik wil rechtdoor"
        ],
        correct: 1,
        explanation: "Rechts gaat altijd voor! De fiets van rechts mag als eerste, daarna de auto voren, dan jij, dan de bus links."
      },
      {
        scenario: "Je wilt linksaf. Op de weg waar je heen wil staan haaientanden. Jij hebt geen haaientanden. Wie heeft voorrang?",
        image: "sharks-teeth-other-road",
        options: [
          "Ik heb voorrang",
          "De weg met haaientanden heeft voorrang",
          "Niemand heeft voorrang",
          "Wie er het eerst is"
        ],
        correct: 0,
        explanation: "Jij! Haaientanden staan bij de weg die moet wachten. Jij hebt geen haaientanden, dus jij mag gaan!"
      },
      {
        scenario: "Je fietst op een rotonde. Er wil een auto de rotonde oprijden. Wie gaat er voor?",
        image: "roundabout-car-entering",
        options: [
          "De auto, want die is groter",
          "Ik, want ik zit al op de rotonde",
          "We moeten allebei stoppen",
          "Wie het hardst rijdt"
        ],
        correct: 1,
        explanation: "Jij! Verkeer dat al OP de rotonde rijdt heeft altijd voorrang op verkeer dat erop wil."
      },
      {
        scenario: "Groot kruispunt met stoplichten. Het licht is groen, maar er staat nog een auto midden op het kruispunt die er niet af kan. Wat doe je?",
        image: "green-light-blocked",
        options: [
          "Ik rijd gewoon door, het is groen",
          "Ik wacht tot het kruispunt leeg is, ook al is het groen",
          "Ik bel naar de auto",
          "Ik rijd om de auto heen"
        ],
        correct: 1,
        explanation: "Slim! Groen betekent: je MAG gaan als het veilig is. Wacht tot het kruispunt vrij is!"
      },
      {
        scenario: "Je komt bij een kruispunt met een politieagent die tekens geeft. Het stoplicht is rood, maar de agent wenkt je door. Wat doe je?",
        image: "police-officer-directing",
        options: [
          "Ik wacht op groen licht",
          "Ik luister naar de politieagent en rijd door",
          "Ik stop en vraag wat ik moet doen",
          "Ik ga een andere weg"
        ],
        correct: 1,
        explanation: "Perfect! Een politieagent gaat boven verkeerslichten. Luister naar wat de agent aangeeft!"
      },
      {
        scenario: "Je hebt voorrang (gele ruit), maar er rijdt een ambulance met zwaailicht en sirene aan. Wat doe je?",
        image: "ambulance-priority",
        options: [
          "Ik heb voorrang, dus ik rijd door",
          "Ik ga aan de kant en laat de ambulance door",
          "Ik rijd voor de ambulance uit",
          "Ik stop midden op de weg"
        ],
        correct: 1,
        explanation: "Goed gedaan! Hulpdiensten met sirene gaan ALTIJD voor. Ga veilig aan de kant!"
      },
      {
        scenario: "Smal weggetje. Van voren komt een grote vrachtwagen, er is niet genoeg ruimte om elkaar te passeren.",
        image: "narrow-road-truck",
        options: [
          "Ik fiets gewoon door",
          "Ik ga aan de kant en wacht tot de vrachtwagen voorbij is",
          "Ik ga achteruit fietsen",
          "Ik ga op de stoep"
        ],
        correct: 1,
        explanation: "Veilig gedacht! Als fietser ben je kwetsbaar. Ga aan de kant en laat de vrachtwagen veilig passeren."
      },
      {
        scenario: "Je wilt rechtdoor, auto van rechts wil linksaf (dezelfde richting in als jij gaat). Wie gaat voor?",
        image: "right-car-turning-left",
        options: [
          "De auto, want rechts gaat voor",
          "Ik, want rechtdoor gaat voor linksaf",
          "We gaan tegelijk",
          "Wie het eerst komt"
        ],
        correct: 0,
        explanation: "De auto! 'Rechts gaat voor' geldt eerst. Daarna pas 'rechtdoor gaat voor linksaf'."
      }
    ]
  },

  // ------------------------------------------------------------------------
  // LEVEL 4: VEILIG OP WEG (Veiligheid)
  // ------------------------------------------------------------------------

  "4-1": {
    id: "4-1",
    levelId: 4,
    name: "Verlichting en Reflectoren",
    description: "Leer alles over zichtbaar zijn",
    mode: "quiz",
    xpReward: 20,
    questions: [
      {
        question: "Wanneer moet je verlichting op je fiets hebben?",
        options: ["Alleen 's nachts", "Bij slecht zicht en van zonsondergang tot zonsopgang", "Alleen in de winter", "Nooit, reflectoren zijn genoeg"],
        correct: 1,
        explanation: "Bij slecht zicht (regen, mist) en van zonsondergang tot zonsopgang moet je licht aan! Veiligheid eerst."
      },
      {
        question: "Welke verlichting moet er op je fiets zitten?",
        options: ["Alleen een voorlicht", "Alleen een achterlicht", "Voor- én achterlicht", "Zijlichtjes"],
        correct: 2,
        explanation: "Je moet een wit of geel voorlicht EN een rood achterlicht hebben. Zo zien ze je van alle kanten!"
      },
      {
        question: "Welke kleur moet je achterlicht zijn?",
        options: ["Wit", "Geel", "Rood", "Blauw"],
        correct: 2,
        explanation: "Je achterlicht moet rood zijn! Zo zien auto's achter je meteen dat je voor hen rijdt."
      },
      {
        question: "Waarom zijn reflectoren belangrijk op je fiets?",
        options: ["Ze zijn mooi", "Autoplampen schijnen erop, dan zie je de fiets ook zonder licht", "Ze maken geluid", "Het is de wet"],
        correct: 1,
        explanation: "Reflectoren kaatsen het licht van auto's terug. Zo zie je de fiets zelfs als het licht uit is!"
      },
      {
        question: "Waar moeten er gele reflectoren op je fiets zitten?",
        options: ["Op het zadel", "In de pedalen en in de wielen (spaken)", "Op het stuur", "Alleen voorop"],
        correct: 1,
        explanation: "In de pedalen en in de wielen! Zo zien auto's je ook van de zijkant bewegen."
      },
      {
        question: "Je batterij van je achterlicht is leeg, maar je voorlicht doet het nog. Mag je fietsen als het donker is?",
        options: ["Ja, één licht is genoeg", "Nee, beide lichten moeten werken", "Ja, als ik maar voorzichtig ben", "Ja, als ik reflectoren heb"],
        correct: 1,
        explanation: "Nee! Je moet zowel een voor- als achterlicht hebben. Controleer je lichten voordat je gaat fietsen!"
      },
      {
        question: "Het is een beetje mistig overdag. Moet je licht aan?",
        options: ["Nee, het is overdag", "Ja, bij mist is het zicht slecht dus licht aan", "Alleen je achterlicht", "Alleen reflectoren zijn genoeg"],
        correct: 1,
        explanation: "Ja! Bij slecht zicht (ook overdag) doe je je licht aan. Dan zien auto's je beter!"
      },
      {
        question: "Wat is het beste: een knipperend achterlicht of een vast brandend achterlicht?",
        options: ["Knipperend, dat valt meer op", "Vast brandend, dat is verplicht in Nederland", "Maakt niet uit", "Beide tegelijk"],
        correct: 1,
        explanation: "In Nederland moet je achterlicht vast branden, niet knipperen! Dat is de regel."
      }
    ]
  },

  "4-2": {
    id: "4-2",
    levelId: 4,
    name: "Dode Hoek en Gevaren",
    description: "Leer over gevaarlijke situaties",
    mode: "truefalse",
    xpReward: 20,
    questions: [
      {
        statement: "De dode hoek is de plek naast een vrachtwagen waar de chauffeur je niet kan zien.",
        correct: true,
        explanation: "Precies! In de dode hoek kan de chauffeur je niet zien in zijn spiegels. Heel gevaarlijk!"
      },
      {
        statement: "Als je de chauffeur van de vrachtwagen kunt zien in zijn spiegel, kan hij jou ook zien.",
        correct: true,
        explanation: "Ja! Kun jij hem zien in de spiegel? Dan kan hij jou ook zien. Onthoud dit goed!"
      },
      {
        statement: "Het is veilig om naast een vrachtwagen te gaan staan bij het stoplicht.",
        correct: false,
        explanation: "Nee! Ga nooit naast een vrachtwagen staan. Blijf erachter of ga er helemaal voor. Dode hoek!"
      },
      {
        statement: "Een vrachtwagen die rechtsaf gaat is extra gevaarlijk voor fietsers.",
        correct: true,
        explanation: "Heel gevaarlijk! De achterkant van de vrachtwagen zwaait uit. Blijf ver achter de vrachtwagen!"
      },
      {
        statement: "Alle auto's hebben een dode hoek.",
        correct: true,
        explanation: "Klopt! Elke auto heeft dode hoeken. Grote voertuigen hebben nog grotere dode hoeken."
      },
      {
        statement: "Als een vrachtwagen zijn knipperlicht aan heeft om rechtsaf te gaan, mag ik snel rechts inhalen.",
        correct: false,
        explanation: "NEE! Nooit rechts inhalen bij een vrachtwagen die rechtsaf gaat. Levensgevaarlijk!"
      },
      {
        statement: "Een bus die wegrijdt van een bushalte moet je laten voorgaan.",
        correct: true,
        explanation: "Ja! Een bus die wegrijdt van een bushalte heeft voorrang. Wacht even en laat hem gaan."
      },
      {
        statement: "Portieren van geparkeerde auto's kunnen plotseling opengaan.",
        correct: true,
        explanation: "Heel gevaarlijk! Houd altijd afstand van geparkeerde auto's. Er kan zo een portier opengaan!"
      },
      {
        statement: "Als ik in de dode hoek sta en de chauffeur geeft geen richting aan, is er geen gevaar.",
        correct: false,
        explanation: "Wel gevaar! Misschien vergeet hij zijn knipperlicht. Ga nooit in de dode hoek staan!"
      },
      {
        statement: "Het is veiliger om achter een vrachtwagen te wachten dan ernaast.",
        correct: true,
        explanation: "Veel veiliger! Achter de vrachtwagen kan de chauffeur je zien en kun jij niet geraakt worden."
      }
    ]
  },

  "4-3": {
    id: "4-3",
    levelId: 4,
    name: "Veiligheidsregels",
    description: "Match de situatie met de veiligheidsregel",
    mode: "matching",
    xpReward: 20,
    questions: [{
      instruction: "Sleep de situatie naar de juiste veiligheidsregel",
      items: [
      { id: "s1", content: "Je fietst 's avonds naar huis", target: "r1" },
      { id: "s2", content: "Een vrachtwagen staat bij het stoplicht en wil rechtsaf", target: "r2" },
      { id: "s3", content: "Je fietst langs geparkeerde auto's", target: "r3" },
      { id: "s4", content: "Het regent hard en de weg is glad", target: "r4" },
      { id: "s5", content: "Je wilt oversteken bij een zebrapad", target: "r5" },
      { id: "s6", content: "Je hoort een ambulance met sirene aankomen", target: "r6" }
    ],
    targets: [
      { id: "r1", content: "Doe je voor- en achterlicht aan!" },
      { id: "r2", content: "Blijf achter de vrachtwagen, ga nooit naast hem staan!" },
      { id: "r3", content: "Houd afstand, portieren kunnen opengaan!" },
      { id: "r4", content: "Fiets langzamer en rem eerder af!" },
      { id: "r5", content: "Stap af en loop over het zebrapad!" },
      { id: "r6", content: "Ga veilig aan de kant en laat de ambulance door!" }
    ]}]
  },

  "4-4": {
    id: "4-4",
    levelId: 4,
    name: "Gevaarlijke Situaties Herkennen",
    description: "Wat is hier gevaarlijk?",
    mode: "situation",
    xpReward: 20,
    questions: [
      {
        scenario: "Je fietst naar school. Het heeft 's nachts gevroren en er ligt rijp op het fietspad.",
        image: "frozen-bike-path",
        options: [
          "Ik fiets gewoon zoals altijd",
          "Ik fiets extra voorzichtig, rem niet plotseling en maak geen snelle bewegingen",
          "Ik ga harder fietsen zodat ik snel thuis ben",
          "Ik ga slalommen"
        ],
        correct: 1,
        explanation: "Super voorzichtig! Bij gladheid is elk plotseling beweging gevaarlijk. Rustig en voorzichtig fietsen!"
      },
      {
        scenario: "Een auto parkeert en je ziet dat er iemand in zit. Je fietst er vlak langs.",
        image: "parked-car-person-inside",
        options: [
          "Ik fiets er vlak langs, het is maar een geparkeerde auto",
          "Ik ga iets naar links en houd afstand, het portier kan open gaan",
          "Ik ga harder fietsen",
          "Ik stop en wacht"
        ],
        correct: 1,
        explanation: "Goed gezien! Als er iemand in de auto zit, kan het portier open gaan. Houd afstand!"
      },
      {
        scenario: "Bij het stoplicht staat een grote vrachtwagen. Zijn rechterblinker knippert. Jij wil ook rechtdoor/rechtsaf.",
        image: "truck-right-indicator",
        options: [
          "Ik ga snel naast de vrachtwagen staan zodat ik voor ben",
          "Ik blijf ruim achter de vrachtwagen wachten tot hij weg is",
          "Ik ga rechts langs de vrachtwagen",
          "Ik bel naar de vrachtwagen"
        ],
        correct: 1,
        explanation: "Levensreddend antwoord! Nooit naast een vrachtwagen die rechtsaf gaat. Dode hoek = levensgevaarlijk!"
      },
      {
        scenario: "Je fietst op een smalle straat. Van voren komt een busje aanrijden, er is weinig ruimte.",
        image: "narrow-street-van",
        options: [
          "Ik fiets gewoon door in het midden",
          "Ik ga zover mogelijk naar rechts en maak mezelf klein, eventueel afstappen",
          "Ik ga naar links",
          "Ik ga harder fietsen"
        ],
        correct: 1,
        explanation: "Veilig! Op smalle wegen is samenwerken belangrijk. Ga opzij en stap af als het nodig is."
      },
      {
        scenario: "Je ziet een hond zonder riem bij de weg. De hond kijkt naar je.",
        image: "loose-dog",
        options: [
          "Ik fiets hard langs de hond",
          "Ik rem af en fiets rustig langs, want de hond kan naar me toe rennen",
          "Ik roep naar de hond",
          "Ik ga van mijn fiets om de hond te aaien"
        ],
        correct: 1,
        explanation: "Slim! Honden kunnen onvoorspelbaar zijn. Rustig blijven en langzaam passeren is veilig."
      },
      {
        scenario: "Het regent en je ziet een grote plas op het fietspad. Je weet niet hoe diep die is.",
        image: "large-puddle",
        options: [
          "Ik fiets er hard doorheen, dat is leuk",
          "Ik fiets eromheen of ga langzaam, want het kan een diep gat zijn",
          "Ik spring eroverheen",
          "Ik fiets op de stoep"
        ],
        correct: 1,
        explanation: "Voorzichtig! Onder water kunnen diepe gaten of scherpe dingen zitten. Eromheen of rustig erdoorheen."
      },
      {
        scenario: "Je fietst op een fietspad naast een drukke weg. Je moet naar de overkant om linksaf te slaan.",
        image: "crossing-busy-road",
        options: [
          "Ik steek snel over tussen de auto's door",
          "Ik zoek een veilige plek (stoplicht of zebrapad), stap af en steek over",
          "Ik fiets achteruit",
          "Ik blijf wachten tot er geen auto's meer zijn"
        ],
        correct: 1,
        explanation: "Veilige keuze! Bij drukke wegen zoek je een veilige oversteekplaats en stap je af."
      },
      {
        scenario: "Je rijdt over een fietstunneltje onder de weg door. Het is donker in de tunnel.",
        image: "bike-tunnel",
        options: [
          "Ik fiets snel door de tunnel",
          "Ik doe mijn licht aan en fiets rustig, want het is donker",
          "Ik sluit mijn ogen en hoop dat het goed gaat",
          "Ik ga wandelen"
        ],
        correct: 1,
        explanation: "Goed! In tunnels is het donker. Licht aan en rustig fietsen zodat je goed ziet waar je gaat."
      }
    ]
  },

  // ------------------------------------------------------------------------
  // LEVEL 5: FIETSEXAMEN (Eindexamen)
  // ------------------------------------------------------------------------

  "5-1": {
    id: "5-1",
    levelId: 5,
    name: "Gemengde Vragen",
    description: "Alle onderwerpen door elkaar",
    mode: "quiz",
    xpReward: 25,
    questions: [
      {
        question: "Wat is de basisregel bij een kruispunt zonder verkeersborden?",
        options: ["Links gaat voor", "Rechts gaat voor", "Wie het eerst komt gaat voor", "De grootste gaat voor"],
        correct: 1,
        explanation: "Rechts gaat voor! Deze basisregel moet je altijd onthouden."
      },
      {
        question: "Welke kleur en vorm heeft een verbodsbord?",
        options: ["Blauw en rond", "Rood en rond", "Rood en driehoekig", "Geel en vierkant"],
        correct: 1,
        explanation: "Verbodsborden zijn altijd rond en rood!"
      },
      {
        question: "Wanneer moet je je hand uitsteken?",
        options: ["Alleen als het druk is", "Als je afdraait of stopt", "Alleen bij linksaf", "Nooit nodig"],
        correct: 1,
        explanation: "Je steekt je hand uit als je afdraait (links of rechts) of als je stopt!"
      },
      {
        question: "Wat is de dode hoek?",
        options: ["Een hoek waar niemand woont", "De plek naast een vrachtwagen waar de chauffeur je niet kan zien", "Een gevaarlijke bocht", "De hoek van een kruispunt"],
        correct: 1,
        explanation: "De dode hoek is de plek waar de chauffeur je niet kan zien. Heel gevaarlijk!"
      },
      {
        question: "Welke verlichting moet er op je fiets als het donker is?",
        options: ["Alleen voorlicht", "Alleen achterlicht", "Voor- én achterlicht", "Verlichting is niet verplicht"],
        correct: 2,
        explanation: "Je moet altijd voor- EN achterlicht hebben bij slecht zicht en in het donker!"
      },
      {
        question: "Wat betekent een blauw rond bord met een witte fiets?",
        options: ["Fietsen verboden", "Verplicht fietspad", "Let op: fietsers", "Parkeren voor fietsen"],
        correct: 1,
        explanation: "Dit is een verplicht fietspad. Je moet daar fietsen!"
      },
      {
        question: "Je ziet haaientanden op de weg. Wat moet je doen?",
        options: ["Doorrijden", "Voorrang verlenen", "Harder rijden", "Omkijken"],
        correct: 1,
        explanation: "Haaientanden betekenen: voorrang verlenen aan verkeer op de andere weg!"
      },
      {
        question: "Aan welke kant van de weg moet je fietsen?",
        options: ["Links", "Rechts", "Midden", "Maakt niet uit"],
        correct: 1,
        explanation: "Altijd rechts! Zo blijft het verkeer voorspelbaar en veilig."
      },
      {
        question: "Wat doe je als een ambulance met sirene en zwaailicht aankomt?",
        options: ["Doorrijden, ik heb voorrang", "Veilig aan de kant gaan en de ambulance laten passeren", "Stoppen midden op de weg", "Voor de ambulance uit rijden"],
        correct: 1,
        explanation: "Hulpdiensten met sirene gaan altijd voor! Ga veilig opzij."
      },
      {
        question: "Mag je over de stoep fietsen?",
        options: ["Ja, als het druk is", "Nee, de stoep is voor voetgangers", "Ja, als je langzaam gaat", "Alleen 's avonds"],
        correct: 1,
        explanation: "Nee! De stoep is voor voetgangers. Fietsen horen op de weg of het fietspad."
      }
    ]
  },

  "5-2": {
    id: "5-2",
    levelId: 5,
    name: "Complexe Verkeerssituaties",
    description: "Moeilijke situaties oplossen",
    mode: "situation",
    xpReward: 25,
    questions: [
      {
        scenario: "Groot kruispunt: je wilt rechtdoor. Van rechts komt een auto die ook rechtdoor wil. Van links komt een fiets die linksaf wil. Van voren een auto die rechtsaf wil.",
        image: "complex-intersection-exam",
        options: [
          "Ik ga eerst, ik wil rechtdoor",
          "De auto van rechts gaat eerst (rechts gaat voor), dan ik (rechtdoor voor linksaf), dan auto voren, dan fiets links",
          "Iedereen tegelijk",
          "Wie het hardst rijdt gaat voor"
        ],
        correct: 1,
        explanation: "Perfect! Rechts gaat voor, dan rechtdoor voor afslaand verkeer. Je hebt alle regels goed toegepast!"
      },
      {
        scenario: "Je fietst op een voorrangsweg (gele ruit). Bij een kruispunt zie je een vrachtwagen van rechts komen, maar je hebt voorrang. De vrachtwagen remt niet af.",
        image: "priority-road-truck-not-stopping",
        options: [
          "Ik rijd door, ik heb voorrang",
          "Ik rem af en wacht, de vrachtwagen ziet me misschien niet",
          "Ik ga harder fietsen",
          "Ik bel naar de vrachtwagen"
        ],
        correct: 1,
        explanation: "Levensreddend! Gelijk hebben is niet hetzelfde als veilig zijn. Wacht altijd als het gevaarlijk is!"
      },
      {
        scenario: "Je komt bij een rotonde. Op de rotonde rijdt al een auto. Achter jou staat een bus te wachten. Wat is de juiste volgorde?",
        image: "roundabout-sequence",
        options: [
          "Bus, ik, auto op rotonde",
          "Ik, bus, auto op rotonde",
          "Auto op rotonde, ik, dan de bus",
          "Allemaal tegelijk"
        ],
        correct: 2,
        explanation: "Goed! Auto op rotonde heeft voorrang. Dan mag jij erop, dan de bus. Mooi gedaan!"
      },
      {
        scenario: "Avond, slecht weer, druk verkeer. Je licht doet het niet meer. Je bent nog 10 minuten van huis.",
        image: "broken-light-evening",
        options: [
          "Ik fiets snel naar huis, het is maar 10 minuten",
          "Ik stap af en loop naar huis of bel mijn ouders voor een lift",
          "Ik fiets in het midden van de weg zodat ze me zien",
          "Ik volg een andere fietser met licht"
        ],
        correct: 1,
        explanation: "Veilige keuze! Zonder licht fietsen in het donker is levensgevaarlijk. Lopen of ophalen!"
      },
      {
        scenario: "Je staat bij een stoplicht op rood. Een vrachtwagen staat naast je en heeft zijn rechter knipperlicht aan. Het licht springt op groen.",
        image: "red-light-truck-beside",
        options: [
          "Snel wegrijden voordat de vrachtwagen beweegt",
          "Wachten tot de vrachtwagen weg is, dode hoek is gevaarlijk",
          "Naast de vrachtwagen blijven rijden",
          "Rechts inhalen"
        ],
        correct: 1,
        explanation: "Levensreddend! Nooit naast een vrachtwagen rijden die afslaat. Wacht tot hij weg is!"
      },
      {
        scenario: "Fietspad kruist een uitrit van een parkeerplaats. Er staat een auto bij de uitrit die naar buiten wil. Jij fietst op het fietspad.",
        image: "driveway-crossing-bike-path",
        options: [
          "De auto moet wachten, ik heb altijd voorrang op het fietspad",
          "Ik let goed op en maak oogcontact met de bestuurder. Als hij me niet ziet, wacht ik",
          "Ik fiets snel door",
          "Ik stop altijd voor auto's"
        ],
        correct: 1,
        explanation: "Super verstandig! Je hebt wel voorrang, maar veiligheid gaat voor. Maak oogcontact!"
      },
      {
        scenario: "Je fietst in een groep vrienden. Jullie maken veel lawaai en letten niet goed op. Voor je zie je een gevaarlijke situatie ontstaan.",
        image: "group-cycling-distracted",
        options: [
          "Ik blijf gewoon doorpraten",
          "Ik waarschuw mijn vrienden en we letten beter op",
          "Ik fiets harder om voor de groep te komen",
          "Ik stap af"
        ],
        correct: 1,
        explanation: "Goed! In het verkeer moet je altijd opletten. Samen fietsen is leuk, maar veiligheid eerst!"
      },
      {
        scenario: "Je bent je huiswerk vergeten en moet heel snel naar school. Bij een zebrapad staat een oudere meneer te wachten.",
        image: "rushing-zebra-crossing",
        options: [
          "Ik fiets snel door, ik ben al laat",
          "Ik rem af en laat de meneer oversteken. Veiligheid is belangrijker dan te laat komen",
          "Ik bel dat hij moet opschieten",
          "Ik fiets om het zebrapad heen"
        ],
        correct: 1,
        explanation: "Respect! Voorrang regels gelden altijd, ook als je haast hebt. Goed gedaan!"
      }
    ]
  },

  "5-3": {
    id: "5-3",
    levelId: 5,
    name: "Snelvuur Eindtoets",
    description: "Waar of niet waar? Snel antwoorden!",
    mode: "truefalse",
    xpReward: 25,
    questions: [
      {
        statement: "Rechts gaat voor bij kruispunten zonder borden.",
        correct: true,
        explanation: "Correct! Dit is de basisregel."
      },
      {
        statement: "Gebodsborden zijn rood en rond.",
        correct: false,
        explanation: "Fout! Gebodsborden zijn BLAUW en rond. Rode ronde borden zijn verbodsborden!"
      },
      {
        statement: "Je moet altijd voor- en achterlicht hebben bij slecht zicht.",
        correct: true,
        explanation: "Ja! Bij slecht zicht en in het donker verlichting aan!"
      },
      {
        statement: "In de dode hoek kan de vrachtwagenchauffeur je goed zien.",
        correct: false,
        explanation: "Nee! In de dode hoek kan hij je NIET zien. Daarom is het zo gevaarlijk!"
      },
      {
        statement: "Bij een zebrapad moeten voetgangers wachten op fietsers.",
        correct: false,
        explanation: "Nee! Voetgangers hebben voorrang bij een zebrapad. Jij moet wachten!"
      },
      {
        statement: "Je mag over de stoep fietsen als het druk is op de weg.",
        correct: false,
        explanation: "Nooit! De stoep is altijd voor voetgangers, niet voor fietsers!"
      },
      {
        statement: "Haaientanden betekenen dat je voorrang moet verlenen.",
        correct: true,
        explanation: "Klopt! Haaientanden = stoppen en voorrang geven!"
      },
      {
        statement: "Je hoeft geen richting aan te geven als er niemand in de buurt is.",
        correct: false,
        explanation: "Altijd richting aangeven! Er kan altijd iemand zijn die je niet ziet!"
      },
      {
        statement: "Op een rotonde heeft verkeer dat al op de rotonde rijdt voorrang.",
        correct: true,
        explanation: "Ja! Wie al op de rotonde is, mag eerst. Wacht tot het veilig is!"
      },
      {
        statement: "Rechtdoor gaand verkeer gaat voor op afslaand verkeer.",
        correct: true,
        explanation: "Correct! Rechtdoor heeft voorrang op linksaf of rechtsaf."
      },
      {
        statement: "Een gele ruit betekent dat je op een voorrangsweg rijdt.",
        correct: true,
        explanation: "Ja! De gele ruit geeft aan dat jij voorrang hebt!"
      },
      {
        statement: "Bij glad weer moet je harder fietsen om snel thuis te zijn.",
        correct: false,
        explanation: "Gevaarlijk! Bij glad weer fiets je juist langzamer en voorzichtiger!"
      },
      {
        statement: "Als een bus met knipperlicht wegrijdt van de bushalte, moet je hem laten voorgaan.",
        correct: true,
        explanation: "Klopt! Bussen die wegrijden van een bushalte hebben voorrang!"
      },
      {
        statement: "Je mag naast een vrachtwagen gaan staan bij een stoplicht.",
        correct: false,
        explanation: "Levensgevaarlijk! Nooit naast een vrachtwagen staan. Dode hoek!"
      },
      {
        statement: "Hulpdiensten met sirene en zwaailicht gaan altijd voor.",
        correct: true,
        explanation: "Altijd! Ga veilig opzij en laat ze passeren, ze moeten iemand helpen!"
      }
    ]
  },

  "5-4": {
    id: "5-4",
    levelId: 5,
    name: "Het Grote Fietsexamen",
    description: "De laatste en moeilijkste test!",
    mode: "quiz",
    xpReward: 30,
    questions: [
      {
        question: "Wat is de belangrijkste regel in het verkeer?",
        options: ["Snel rijden", "Veiligheid en oplettendheid", "Altijd voorrang nemen", "Je hand niet uitsteken"],
        correct: 1,
        explanation: "Perfect! Veiligheid is altijd het allerbelangrijkste. Regels zijn er om iedereen veilig te houden!"
      },
      {
        question: "Je komt bij een kruispunt met een politieagent, stoplichten en verkeersborden. Naar wie luister je?",
        options: ["De verkeersborden", "De stoplichten", "De politieagent", "Rechts gaat voor"],
        correct: 2,
        explanation: "De politieagent gaat boven alles! Als er een agent staat, luister je naar zijn aanwijzingen!"
      },
      {
        question: "Welke situatie is het gevaarlijkst?",
        options: ["Fietsen zonder bel", "Fietsen zonder licht in het donker", "Fietsen met een lekke band", "Fietsen met een vies zadel"],
        correct: 1,
        explanation: "Zonder licht in het donker is levensgevaarlijk! Auto's kunnen je niet zien."
      },
      {
        question: "In welke situatie mag je het zebrapad overfietsen (niet afstappen)?",
        options: ["Als er niemand oversteekt", "Als je haast hebt", "Nooit, je moet altijd afstappen", "Als het regent"],
        correct: 2,
        explanation: "Bij een zebrapad moet je altijd afstappen en lopen! Het zebrapad is voor voetgangers."
      },
      {
        question: "Wat is de juiste volgorde van voorrang op een kruispunt zonder borden? Er komt verkeer van alle kanten.",
        options: [
          "Links, voren, rechts",
          "Rechts, voren, links",
          "Voren, rechts, links",
          "Wie het eerst komt"
        ],
        correct: 1,
        explanation: "Rechts gaat voor! Dan degene die van voren komt, dan pas links. Goed onthouden!"
      },
      {
        question: "Een auto met een groen kenteken (elektrische auto) rijdt heel stil. Wat is belangrijk?",
        options: [
          "Niets, gewone auto",
          "Extra opletten, je hoort hem misschien niet aankomen",
          "Ze gaan altijd langzaam",
          "Ze hebben geen voorrang"
        ],
        correct: 1,
        explanation: "Let op! Elektrische auto's zijn heel stil. Je moet goed kijken, want je hoort ze niet!"
      },
      {
        question: "Wat moet je controleren voor je gaat fietsen?",
        options: [
          "Alleen of je zadel goed staat",
          "Remmen, licht, bel en banden",
          "Alleen je licht",
          "Niets, gewoon fietsen"
        ],
        correct: 1,
        explanation: "Voor je gaat fietsen check je: remmen (werken ze?), licht (doet het?), bel (werkt ie?) en banden (genoeg lucht?)!"
      },
      {
        question: "Je bent op je fiets. Je telefoon gaat. Wat doe je?",
        options: [
          "Opnemen tijdens het fietsen",
          "Veilig stoppen aan de kant en dan pas opnemen",
          "Harder fietsen naar huis",
          "Bellen zonder handen aan het stuur"
        ],
        correct: 1,
        explanation: "Super! Altijd eerst veilig stoppen. Fietsen en bellen tegelijk is gevaarlijk!"
      },
      {
        question: "Wat betekent 'voorspelbaar gedrag' in het verkeer?",
        options: [
          "Dat je doet wat verwacht wordt en richting aangeeft",
          "Dat je altijd hetzelfde pad fietst",
          "Dat je snel rijdt",
          "Dat je nooit stopt"
        ],
        correct: 0,
        explanation: "Voorspelbaar zijn betekent: andere weggebruikers weten wat je gaat doen. Geef richting aan en hou je aan de regels!"
      },
      {
        question: "Wat is het allerbelangrijkste dat je hebt geleerd in deze fietsquiz?",
        options: [
          "Hoe je snel kunt fietsen",
          "Dat verkeersregels er zijn om iedereen veilig te houden",
          "Hoe je alle borden uit je hoofd leert",
          "Dat fietsen moeilijk is"
        ],
        correct: 1,
        explanation: "Helemaal goed! Regels zijn er niet voor niets - ze houden ons allemaal veilig. Geweldig gedaan! 🎉"
      }
    ]
  }
};

// ============================================================================
// BADGES
// ============================================================================

const BADGES = [
  {
    id: "first-ride",
    name: "Eerste Rit",
    description: "Voltooi je eerste les",
    icon: "🎯",
    condition: "completedLessons >= 1"
  },
  {
    id: "streak-3",
    name: "Trouwe Fietser",
    description: "Fiets 3 dagen achter elkaar",
    icon: "🔥",
    condition: "streak >= 3"
  },
  {
    id: "streak-7",
    name: "Fietskampioen",
    description: "Fiets 7 dagen achter elkaar!",
    icon: "🏆",
    condition: "streak >= 7"
  },
  {
    id: "perfect-score",
    name: "Foutloos",
    description: "Haal 100% in een les",
    icon: "💯",
    condition: "perfectScore >= 1"
  },
  {
    id: "speed-demon",
    name: "Bliksemfietser",
    description: "Rond een les af in minder dan 60 seconden",
    icon: "⚡",
    condition: "fastCompletion >= 1"
  },
  {
    id: "sign-expert",
    name: "Bordenexpert",
    description: "Voltooi alle lessen over verkeersborden",
    icon: "🪧",
    condition: "level2Complete"
  },
  {
    id: "safety-first",
    name: "Veiligheid Eerst",
    description: "Voltooi het veiligheidslevel",
    icon: "🛡️",
    condition: "level4Complete"
  },
  {
    id: "halfway",
    name: "Halverwege",
    description: "Voltooi 50% van alle lessen",
    icon: "🎖️",
    condition: "completedPercentage >= 50"
  },
  {
    id: "champion",
    name: "Verkeerskampioen",
    description: "Voltooi alle lessen!",
    icon: "👑",
    condition: "completedPercentage >= 100"
  },
  {
    id: "xp-100",
    name: "100 XP Club",
    description: "Verdien 100 ervaringspunten",
    icon: "⭐",
    condition: "totalXP >= 100"
  },
  {
    id: "xp-500",
    name: "500 XP Held",
    description: "Verdien 500 ervaringspunten",
    icon: "🌟",
    condition: "totalXP >= 500"
  },
  {
    id: "xp-1000",
    name: "1000 XP Legende",
    description: "Verdien 1000 ervaringspunten!",
    icon: "💫",
    condition: "totalXP >= 1000"
  },
  {
    id: "three-stars",
    name: "Sterrenrijder",
    description: "Behaal 3 sterren in 5 lessen",
    icon: "⭐⭐⭐",
    condition: "threeStarLessons >= 5"
  },
  {
    id: "memory-master",
    name: "Geheugenmeester",
    description: "Voltooi een memory spel zonder fouten",
    icon: "🧠",
    condition: "perfectMemory >= 1"
  }
];

// ============================================================================
// PLAYER TITLES (based on XP)
// ============================================================================

const PLAYER_TITLES = [
  { minXP: 0, title: "Beginner", icon: "🌱" },
  { minXP: 50, title: "Fietsleerling", icon: "🚲" },
  { minXP: 150, title: "Wegrijder", icon: "🛤️" },
  { minXP: 300, title: "Verkeerskenner", icon: "🏅" },
  { minXP: 500, title: "Fietsexpert", icon: "🌟" },
  { minXP: 800, title: "Wegkapitein", icon: "👑" },
  { minXP: 1200, title: "Verkeersmeester", icon: "🏆" }
];

// ============================================================================
// ENCOURAGEMENTS (positive feedback messages)
// ============================================================================

const ENCOURAGEMENTS = [
  "Super goed! 🎉",
  "Helemaal juist! ⭐",
  "Wat knap! 💪",
  "Je bent een echte verkeerskenner! 🚲",
  "Geweldig gedaan! 🌟",
  "Perfect! Je snapt het helemaal! ✨",
  "Fantastisch antwoord! 🎯",
  "Je wordt steeds beter! 📈",
  "Daar moet je trots op zijn! 🏆",
  "Uitstekend! 👏",
  "Je bent er helemaal klaar voor! 🚀",
  "Zo doe je dat! 💯",
  "Bravo! Heel goed! 🎊",
  "Je hebt het door! 🧠",
  "Kijk jou gaan! 🔥"
];

// ============================================================================
// WRONG ANSWER MESSAGES (encouraging feedback after mistakes)
// ============================================================================

const WRONG_ANSWER_MESSAGES = [
  "Bijna! Probeer het nog eens 💪",
  "Niet helemaal, maar je leert ervan! 📚",
  "Oeps! Probeer het opnieuw 🔄",
  "Dat was nog niet helemaal goed, maar geef niet op! 🌈",
  "Bijna raak! Nog een keer? 🎯",
  "Foutje! Lees de uitleg en probeer opnieuw 📖",
  "Niet erg! Fouten maken hoort bij leren 🌟",
  "Nog niet helemaal! Je kunt het wel! 💫",
  "Jammer! Kijk goed naar de uitleg 👀",
  "Helaas! Maar de volgende keer beter! 🚀"
];

// ============================================================================
// EXPORT NOTE
// ============================================================================

// All data is exported as global constants for use in the game
// No module system needed - simple static website
console.log("✅ Fietsquiz data loaded successfully!");
console.log(`📊 ${LEVELS.length} levels, ${Object.keys(LESSONS).length} lessons, ${BADGES.length} badges`);
