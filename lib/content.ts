// All site copy lives here so it can be edited without touching animation code.
// Voice: Murugan speaks to the visitor in the first person everywhere except the
// testimonials. Lines marked LOCKED were written/approved by the user.

export const hero = {
  bubble: "Scroll Down, Now!!", // LOCKED
  scrollCue: "Scroll to begin",
  greeting: "வணக்கம்",
  translit: "Vanakkam",
  sub: "I am Murugan. Come — walk with me through my story.",
  primary: "Begin the Journey",
  secondary: "Seek My Blessings",
};

export const sectionTitles = {
  projects: { index: "01", title: "My Projects", tamil: "என் சாதனைகள்", kicker: "Deeds I am known for" },
  skills: { index: "03", title: "Skills", tamil: "என் திறமைகள்", kicker: "What I carry within me" },
  testimonials: { index: "04", title: "Testimonials", tamil: "பாராட்டுரைகள்", kicker: "What others say of me" },
  contact: { index: "05", title: "Contact", tamil: "தொடர்புக்கு", kicker: "How you may reach me" },
};

export const projects = {
  soorasamharam: {
    index: "I",
    title: "Soorasamharam",
    tamil: "சூரசம்ஹாரம்",
    tagline: "The war I ended with mercy.",
    cardA: "Surapadman held a boon — only Shiva's son could defeat him. He believed it made him safe. I am Shiva's son.",
    cardB: "My weapon of choice: the Vel. It was never made to destroy — it was made to discern.",
    cardC: ["I did not end Surapadman. I gave him a new purpose.", "Victory was never the lesson. What I did with it was."],
  },
  devas: {
    index: "II",
    title: "Leading the Devas",
    tamil: "தேவர்களின் தலைவன்",
    tagline: "The heavens followed me into battle.",
    card: "Command is not given; it is earned at the front. So I ride ahead — my peacock beneath me, the armies of the heavens behind me.",
  },
  swamimalai: {
    index: "III",
    title: "The Swamimalai Incident",
    tamil: "சுவாமிமலை",
    tagline: "The day I became my father's teacher.",
    cards: [
      "I asked Brahma the simplest question in creation — the meaning of Om. He had no answer.",
      "So I held him until he could learn it. Creation can wait. Ignorance cannot.",
      "With Brahma silenced, creation stood still, and the devas went to my father for help.",
      "My father asked me to set Brahma free. I agreed — on one condition: that I teach first.",
      "And so the son became the teacher. Even Lord Shiva sat down to listen.",
    ],
  },
};

export const about = {
  heading: "About me?",
  shy: "Ohh!! You wish to know about… me?",
  calm: {
    lead: "Ohh!! I am just… the one who comes when you call.",
    lines: [
      "Kumaran, Kandan, Velan, Senthil, Arumugam — call me by any of my names, and I will answer.",
      "I was born of six sparks from my father's eye, and raised by six mothers beside the Saravana pond.",
      "To the pure of heart I am the nearest of gods. Call me once, sincerely, and I am already on my way.",
    ],
  },
  wrath: {
    lead: "But to those who prey upon the weak…",
    lines: [
      "Ask Surapadman. He had a boon, an army and a fortress upon the sea. I had my Vel.",
      "I do not hold grudges, and I do not need to destroy.",
      "I end the part of you that was the problem.",
    ],
  },
};

export const skills = {
  cards: [
    {
      numeral: "I",
      name: "Tamil Mastery",
      cls: "Scholar",
      emblem: "tamil" as const,
      hook: "I gave Tamil its grammar, and I taught it to Agastya.",
      footnote:
        "The Tamil people call me Tamil Kadavul — the god of Tamil. The Sangam poem Thirumurugatruppadai, Thiruppugazh and Kandhar Sashti Kavasam were all sung to me.",
    },
    {
      numeral: "II",
      name: "Shanmukha Vision",
      cls: "Seer",
      emblem: "shatkona" as const,
      hook: "I see in six directions at once. Nothing escapes my sight.",
      footnote: "I am Arumugam, the six-faced. My six faces are mastery over the five senses and the mind — command of every direction at once.",
    },
    {
      numeral: "III",
      name: "Transformative Combat",
      cls: "Warrior",
      emblem: "feather" as const,
      hook: "I do not destroy my enemies. I transform them.",
      footnote: "When I defeated Surapadman, I split him in two. He lives on as my peacock and as the rooster on my banner.",
    },
  ],
};

export const testimonials = {
  place: {
    name: "Murugan",
    category: "Deity · Tamil Kadavul",
    rating: "4.9",
    count: "∞ reviews",
    hours: "Open 24 hours, every yuga",
    button: "Write a review",
  },
  reviews: [
    {
      id: "shiva",
      name: "Shiva",
      avatar: "/media/review-shiva.webp",
      meta: "Local Guide · 1,008 reviews · Kailasam",
      stars: 5,
      when: "a few yugas ago",
      text: "I asked my son to release Brahma. He said fine — but first he'd teach me the meaning of Om. So I took the student's seat and listened. Best class I've ever attended. Proud father. Humbled student.",
      helpful: "Helpful (3.3 crore)",
      anchor:
        "Swamimalai: after Brahma's imprisonment, Shiva heard the meaning of the Pranava (Om) from his son as a disciple — which is why Murugan there is called Swaminatha, “teacher of the Lord”.",
    },
    {
      id: "tamil",
      name: "The Tamil People",
      avatar: "/media/review-tamil.webp",
      meta: "Local Guide · Level ∞ · 2,000+ years of reviews",
      stars: 5,
      when: "every single day",
      text: "Been coming here for over two thousand years. Never closed, never late, never once asked us for an appointment. We named our children, our hills and our poetry after him. Five stars feels low.",
      helpful: "Helpful (8 crore)",
      anchor:
        "Tamil Kadavul: the Sangam-era Thirumurugatruppadai sings of him, and Kandhar Sashti Kavasam is still recited in Tamil homes every day.",
    },
    {
      id: "brahma",
      name: "Brahma",
      avatar: "/media/review-brahma.webp",
      meta: "Creator · 4 reviews",
      stars: 4,
      when: "Edited · a kalpa ago",
      text: "Asked me one “simple” question: what does Om mean? I created the universe. I did not know. Next thing I knew, I was in a cell and creation was on hold. One star off for the cell. Four for the lesson — I know what Om means now.",
      helpful: "Helpful (1)",
      anchor:
        "Brahma couldn't explain the meaning of Om to the young Murugan, who imprisoned him until he could — and creation stalled until Shiva stepped in.",
      ownerReply: "I am glad the lesson stayed with you. The cell was part of the curriculum.",
    },
  ],
};

export const contact = {
  kicker: "Contact",
  title: "Call Upon Me",
  titleTa: "என்னை அழைக்க",
  // LOCKED
  lead: "If you wanna contact me:",
  values: [
    "Be rightfully courageous.",
    "Do the right thing.",
    "Seek knowledge and humility.",
    "Keep purity in thought.",
    "Show compassion towards all living beings.",
  ],
  close: "Follow these, and I will be there for you when you need me.",
  primary: "Call Upon Me",
  secondary: "Walk the Path",
  tamil: "யாமிருக்க பயமேன்",
  translit: "Yaamirukka bayamen",
  translation: "Why fear, when I am here?",
};
