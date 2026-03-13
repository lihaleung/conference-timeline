import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import "./Speakers.css";

const speakersData = [
  // Featured speakers first
  {
    name: "Larry Kramer",
    title: "President & Vice Chancellor",
    company: "London School of Economics",
    bio: "Larry Kramer became LSE's 18th President and Vice Chancellor in April 2024, bringing with him a distinguished career spanning academia, philanthropy, and law. He previously served as President of the William and Flora Hewlett Foundation (2012–2024) and as Dean of Stanford Law School (2004–2012). A constitutional law scholar and graduate of the University of Chicago Law School, Kramer has taught at the University of Chicago, Michigan, NYU, Princeton, Yale, and Harvard. He is a Fellow of the American Academy of Arts and Sciences and a member of the American Philosophical Society.",
    image: "/speakers/larry-kramer.png",
  },
  {
    name: "Maria Axente",
    title: "Founder & CEO, Responsible Intelligence",
    company: "Former Responsible AI Lead, PwC",
    bio: "Maria Luciana Axente is a globally recognised AI ethics and public policy expert with over two decades of experience. Formerly PwC's Responsible AI and AI for Good Lead, she was instrumental in establishing PwC's UK AI Centre of Excellence and its Responsible AI toolkit. She now leads Responsible Intelligence, a strategic AI advisory firm, and is a Senior Research Associate at the Intellectual Forum, Jesus College, Cambridge. She has advised UNICEF, the World Economic Forum, NATO's Advisory Group on Emerging and Disruptive Technologies, and the UK Parliament's All-Party Parliamentary Group on AI.",
    image: "/speakers/maria-axente.png",
    imagePosition: "center 20%",
  },
  {
    name: "Emma Thwaites",
    title: "Director of Global Policy & Corporate Affairs",
    company: "ODI; Executive Chair, Allegory",
    bio: "Emma Thwaites is Director of Global Policy and Corporate Affairs at the Open Data Institute (ODI) and Executive Chair of Allegory, the strategic communications agency she founded. With over 30 years of experience, she has worked at the BBC, led the UK Cabinet Office's strategic communications team, and is a board director of OpenUK. At the ODI, Emma oversees public policy, communications, and engagement, working to shape global data and AI governance conversations.",
    image: "/speakers/emma-thwaites.png",
  },
  {
    name: "David Leslie",
    title: "Director of Ethics and Responsible Innovation Research",
    company: "Alan Turing Institute",
    bio: "Professor David Leslie is Director of Ethics and Responsible Innovation Research at the Alan Turing Institute and Professor of Ethics, Technology and Society at Queen Mary University of London. He is the author of the UK Government's official guidance on the responsible design and implementation of AI in the public sector, and co-authored the ICO/Turing guidance on AI explainability. He has taught at Princeton, Yale, and Harvard, and sits on UNESCO's High-Level Expert Group steering its Recommendation on the Ethics of AI. He co-launched the Global AI Ethics and Governance Observatory at UNESCO and is founding editor of the Springer journal AI and Ethics.",
    image: "/speakers/david-leslie.png",
  },
  {
    name: "Ulysse Richard",
    title: "Military AI Governance Consultant",
    company: "UN Office for Disarmament Affairs",
    bio: "Ulysse Richard works within the UN Office for Disarmament Affairs (UNODA), focusing on the governance of AI in the military domain. He is the host of the PodMAPS podcast series, part of UNODA's Military AI, Peace & Security (MAPS) Dialogues. He co-authored UNODA Occasional Paper No. 42 on the governance of AI in the military domain and serves as a key point of contact for UNODA's ongoing work on military AI, peace, and international security. He studied at Sciences Po Paris.",
    image: "/speakers/ulysse-richard.png",
  },
  {
    name: "Gaia Marcus",
    title: "",
    company: "",
    bio: "Gaia Marcus is a speaker at the AILG conference.",
    image: "/speakers/gaia-marcus.png",
  },
  {
    name: "Ashyana-Jasmina Kachra",
    title: "AI Ethics & Safety Manager",
    company: "Google DeepMind",
    bio: "Ashyana-Jasmina Kachra is currently AI Ethics and Safety Manager at Google DeepMind, having previously held policy roles at OpenAI, Holistic AI, and AI Safety Fundamentals. She holds an MSc in International Social and Public Policy from LSE. Her prior work includes AI regulatory research at the OECD and consulting at Boston Consulting Group. She has published widely on topics including the EU AI Act, AI risk management frameworks, and global AI regulation.",
    image: "/speakers/ashyana-kachra.png",
  },
  // Other speakers
  {
    name: "Julian Jacobs",
    title: "Economics Researcher & DPhil Candidate",
    company: "Google DeepMind / University of Oxford",
    bio: "Julian Jacobs is an AI Policy Researcher at Google DeepMind and a Political Economy doctoral candidate at Oxford, where his research focuses on the economic impacts of AI, labour market inequality, and worker retraining. He holds an MSc from LSE and a BA from Brown University, and has previously worked at the Office of Barack Obama, the Brookings Institution, and the Center for AI Safety. He is a Fulbright Scholar and a Google Public Policy Fellow with ITIF.",
    image: "/speakers/julian-jacobs.png",
  },
  {
    name: "Michael Maltese",
    title: "Former APAC AI Regional Leader; AI Advisor",
    company: "Google",
    bio: "Michael Maltese is a senior technology executive with deep expertise in AI strategy and global innovation. For over four years he served as Google's APAC AI Regional Leader, first as the region's AI Business and Innovation Lead and then as Head of AI Capacity Planning for Google Cloud, advising CXOs and board directors across India, Korea, Greater China, Southeast Asia, and Australasia. Prior to Google, he was Cisco's most senior innovation executive across Asia Pacific, Japan, and China, overseeing innovation centres in Singapore, Japan, and Australia. He is a Harvard graduate and holds a master's degree in Law from the University of Oxford. Earlier in his career, he served as Founding Managing Director of MIT's $50M Legatum Centre for Development and Entrepreneurship. He currently advises high-impact startups through Balderton Capital's Launched programme and works with CXOs on AI strategy and implementation.",
    image: "/speakers/michael-maltese.png",
  },
  {
    name: "Martin Bauer",
    title: "Professor of Social Psychology & Research Methodology",
    company: "LSE",
    bio: "Professor Martin W. Bauer is Professor of Social Psychology and Research Methodology in LSE's Department of Psychological and Behavioural Science, which he joined in 1994. A PhD graduate of LSE, he is a former Editor-in-Chief of Public Understanding of Science (2009–2016) and directs the MSc in Social and Public Communication. He is an International Fellow of acatech (the German Academy of Technical Sciences) and has advised government agencies in Britain, China, and the European Commission on measuring public attitudes to science and technology. His research explores the relationship between science and common sense, using surveys, media analysis, and qualitative methods.",
    image: "/speakers/martin-bauer.png",
  },
  {
    name: "Kayla Blomquist",
    title: "Co-Founder & Director",
    company: "Oxford China Policy Lab",
    bio: "Kayla Blomquist is a technology and geopolitics researcher focused on AI governance and US-China relations. She is Co-Founder and Executive Director of the Oxford China Policy Lab and a DPhil candidate at the Oxford Internet Institute, with an affiliation to the Oxford Martin School AI Governance Initiative. Prior to Oxford, she served as a US Diplomat to the People's Republic of China (2018–2021), specialising in the governance of emerging technologies and human rights. She is professionally fluent in Mandarin and has been featured in The Economist, the BBC, and Foreign Policy.",
    image: "/speakers/kayla-blomquist.png",
  },
  {
    name: "SOLOMONIC",
    title: "Litigation Data & Dispute Analytics",
    company: "",
    bio: "Solomonic is the UK's leading litigation intelligence and analytics platform, founded in 2017. Co-founded by barrister Gideon Cohen and solicitor David Cohen, alongside behavioural data scientist Dr Henry Stott, Solomonic uses machine learning and expert legal input to analyse thousands of High Court claims, providing previously unavailable data-driven insights on UK civil litigation. Its platform is used by leading law firms including Herbert Smith Freehills, Linklaters, and Eversheds Sutherland, as well as litigation funders and insurers.",
    image: "/speakers/solomonic.png",
  },
  {
    name: "Francesco Liberatore",
    title: "Partner",
    company: "Squire Patton Boggs",
    bio: "Francesco Liberatore is a Partner at Squire Patton Boggs and the firm's EMEA lead for competition law in technology, digital markets, and communications. Dual-qualified in England & Wales and Italy, he is ranked in the Hall of Fame in Legal 500 UK and listed among the top 10 most influential competition lawyers in digital markets in the UK. He coordinates Squire Patton Boggs's EMEA Communications Practice and its AI Law & Policy Hub, and is a regular speaker on competition law as it applies to artificial intelligence and emerging technology regulation.",
    image: "/speakers/francesco-liberatore.png",
  },
  {
    name: "Raj Choudhury",
    title: "Professor of Organisational Behaviour",
    company: "LSE Department of Management",
    bio: "Professor Prithwiraj (Raj) Choudhury is a Professor of Organisational Behaviour at LSE and a globally recognised authority on the future of work. Formerly on the faculties of Harvard Business School and the Wharton School, his research explores remote work, the geography of talent, and the organisational implications of AI and automation. His 2025 book The World is Your Office became a national bestseller in the United States. In 2024 he was named on Time's list of thirty thought leaders shaping the future of work, and in 2023 on Forbes' Future of Work 50 list.",
    image: "/speakers/raj-choudhury.png",
  },
  {
    name: "Vivek Madlani",
    title: "Co-Founder & CEO",
    company: "Multiply.ai",
    bio: "Vivek Madlani is Co-Founder and CEO of Multiply.ai, a B2B AI platform that helps financial institutions deliver digital and hybrid financial advice at scale. An LSE alumnus (Mathematics & Philosophy), he spent twelve years as a derivatives trader, serving as Global Head of the Dynamic Strategic and Index Trading business at RBS, before pivoting to entrepreneurship in 2016. Multiply became the UK's first fully automated, independent financial advice app, helping over 12,500 households manage their personal finances. Vivek is also an active angel investor in fintech.",
    image: "/speakers/vivek-madlani.png",
  },
  {
    name: "Ritam Gandhi",
    title: "Founder & CEO",
    company: "Studio Graphene",
    bio: "Ritam Gandhi founded Studio Graphene in 2014 after a decade as a management consultant at Accenture and Bank of America Merrill Lynch. An LSE alumnus (Management Sciences), he built Studio Graphene into a 130+ person digital product studio, headquartered in London with offices in Delhi, Lisbon, and Geneva. The firm works with startups and global brands to design and build AI-powered digital products. Studio Graphene is a certified B Corporation and partners with clients across healthcare, fintech, and the public sector.",
    image: "/speakers/ritam-gandhi.png",
  },
  {
    name: "Youngjin Yoo",
    title: "Professor of Information Systems and Innovation",
    company: "LSE Department of Management",
    bio: "Professor Youngjin Yoo is widely recognised as one of the leading intellectual voices on digital innovation. At LSE, his research spans digital innovation, responsible digital architecture, platform strategy, and digital health. He has published over 170 peer-reviewed articles, cited more than 31,000 times, with an H-index of 61, and has received over $10 million in research grants from sources including the National Science Foundation, NASA, and Samsung Electronics. He previously held the Elizabeth M. and William C. Treuhaft Professorship in Entrepreneurship at Case Western Reserve University, and has been a visiting professor at institutions across Europe, Japan, and Asia. He is a Senior Editor of Information Systems Research and co-founded Halo Harbor, a decentralised privacy-preserving data platform for AI-enabled digital service ecosystems.",
    image: "/speakers/youngjin-yoo.png",
  },
  {
    name: "Mark Lewis",
    title: "Visiting Professor in Practice",
    company: "LSE Law School; Stephenson Harwood LLP",
    bio: "Mark Lewis is a Visiting Professor in Practice at LSE Law School, where he lectures on the legal, regulatory, and commercial dimensions of AI and machine learning, cybersecurity, cloud computing, and legal technologies. He is also a Senior Consultant at Stephenson Harwood LLP, with forty years of experience spanning senior UK government roles, private legal practice, and corporate board-level advisory. He is recognised as one of the UK's foremost technology legal practitioners, advising global banks, insurers, asset managers, and leading IT and outsourcing providers. He contributed to the 2022 white paper Future of Work: Investors' Expectations of Ethical AI in Human Capital Management, co-published with LSE.",
    image: "/speakers/mark-lewis.png",
  },
  {
    name: "Devin Kohli",
    title: "Co-Founder & General Partner",
    company: "Outward VC",
    bio: "Devin Kohli is Co-Founder and General Partner at Outward VC, a London-based venture capital firm focused on early-stage fintech and connected technology companies across the UK and Europe. An LSE alumnus, Devin began his career advising growth-stage companies before channelling that experience into backing founders directly. Outward VC invests at late seed and Series A, with portfolio companies including Bud and Monese. The firm is known for its thesis that technology innovation in financial services can drive positive outcomes for businesses, societies, and individuals.",
    image: "/speakers/devin-kohli.png",
  },
];

function getInitials(name) {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function SpeakerCard({ speaker, index, onClick }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="speaker-card"
      onClick={() => onClick(speaker)}
    >
      <div className="speaker-image-container">
        {speaker.image ? (
          <img 
            src={speaker.image} 
            alt={speaker.name} 
            className="speaker-image" 
            style={speaker.imagePosition ? { objectPosition: speaker.imagePosition } : {}}
          />
        ) : (
          <div className="speaker-placeholder">
            <span>{getInitials(speaker.name)}</span>
          </div>
        )}
      </div>
      <h3 className="speaker-name">{speaker.name}</h3>
      <p className="speaker-title">{speaker.title}</p>
      {speaker.company && <p className="speaker-company">{speaker.company}</p>}
    </motion.div>
  );
}

function SpeakerModal({ speaker, onClose }) {
  if (!speaker) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="modal-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="modal-content"
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.3 }}
          onClick={(e) => e.stopPropagation()}
        >
          <button className="modal-close" onClick={onClose}>
            ×
          </button>
          <div className="modal-header">
            <div className="modal-image-container">
              {speaker.image ? (
                <img 
                  src={speaker.image} 
                  alt={speaker.name} 
                  className="modal-image"
                  style={speaker.imagePosition ? { objectPosition: speaker.imagePosition } : {}}
                />
              ) : (
                <div className="modal-placeholder">
                  <span>{getInitials(speaker.name)}</span>
                </div>
              )}
            </div>
            <div className="modal-info">
              <h2 className="modal-name">{speaker.name}</h2>
              <p className="modal-title">{speaker.title}</p>
              {speaker.company && <p className="modal-company">{speaker.company}</p>}
            </div>
          </div>
          <div className="modal-body">
            <p className="modal-bio">{speaker.bio}</p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default function Speakers() {
  const [selectedSpeaker, setSelectedSpeaker] = useState(null);

  return (
    <div className="speakers-container">
      <motion.h2
        className="speakers-title"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Speakers
      </motion.h2>
      <div className="speakers-grid">
        {speakersData.map((speaker, index) => (
          <SpeakerCard
            key={index}
            speaker={speaker}
            index={index}
            onClick={setSelectedSpeaker}
          />
        ))}
      </div>
      {selectedSpeaker && (
        <SpeakerModal
          speaker={selectedSpeaker}
          onClose={() => setSelectedSpeaker(null)}
        />
      )}
    </div>
  );
}
