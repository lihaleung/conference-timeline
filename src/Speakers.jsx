import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import "./Speakers.css";

const speakersData = [
  {
    name: "Larry Kramer",
    title: "President",
    company: "London School of Economics",
    bio: "Larry Kramer serves as the President of the London School of Economics, bringing extensive experience in academic leadership and policy development.",
    image: null,
  },
  {
    name: "Ashyana-Jasmina Kachra",
    title: "AI Ethics & Safety Manager",
    company: "",
    bio: "Ashyana-Jasmina Kachra specializes in AI ethics and safety, working to ensure responsible development and deployment of artificial intelligence systems.",
    image: null,
  },
  {
    name: "Julian Jacobs",
    title: "Economics",
    company: "Google DeepMind",
    bio: "Julian Jacobs works on economics research at Google DeepMind, exploring the intersection of AI and economic systems.",
    image: null,
  },
  {
    name: "Michael Maltese",
    title: "ex-Google APAC",
    company: "",
    bio: "Michael Maltese brings valuable experience from his time at Google APAC, offering insights into technology governance in the Asia-Pacific region.",
    image: null,
  },
  {
    name: "Martin Bauer",
    title: "Psychological and Behavioural Science",
    company: "LSE",
    bio: "Martin Bauer is a researcher at LSE's Department of Psychological and Behavioural Science, studying the human dimensions of technology adoption and governance.",
    image: null,
  },
  {
    name: "Kayla Blomquist",
    title: "Researcher",
    company: "Oxford China Policy Lab",
    bio: "Kayla Blomquist conducts research at the Oxford China Policy Lab, focusing on technology policy and international relations.",
    image: null,
  },
  {
    name: "Maria Axente",
    title: "ex-PWC",
    company: "",
    bio: "Maria Axente brings expertise from her work at PWC, specializing in responsible AI implementation and corporate governance.",
    image: null,
  },
  {
    name: "Emma Thwaites",
    title: "Director",
    company: "ODI, Allegory",
    bio: "Emma Thwaites leads initiatives at ODI and Allegory, working on open data and digital transformation strategies.",
    image: null,
  },
  {
    name: "Ulysse Richard",
    title: "AI Governance",
    company: "UN Disarmament",
    bio: "Ulysse Richard works on AI governance at the UN Office for Disarmament Affairs, addressing international security implications of AI.",
    image: null,
  },
  {
    name: "SOLOMONIC",
    title: "Litigation Data & Dispute Analytics",
    company: "Firm",
    bio: "SOLOMONIC is a leading litigation data and dispute analytics firm, providing insights for legal and governance decisions.",
    image: null,
  },
  {
    name: "Francesco Liberatore",
    title: "Partner",
    company: "Squire Patton Boggs",
    bio: "Francesco Liberatore is a partner at Squire Patton Boggs, specializing in technology law and regulatory compliance.",
    image: null,
  },
  {
    name: "David Leslie",
    title: "Director of Ethics and Responsible Innovation Research",
    company: "Alan Turing Institute",
    bio: "David Leslie leads ethics and responsible innovation research at the Alan Turing Institute, shaping best practices for AI development.",
    image: null,
  },
  {
    name: "Raj Choudhury",
    title: "Department of Management",
    company: "LSE",
    bio: "Raj Choudhury is a researcher at LSE's Department of Management, studying organizational dynamics and technology adoption.",
    image: null,
  },
  {
    name: "Vivek Madlani",
    title: "Founder",
    company: "Multiply.ai",
    bio: "Vivek Madlani is the founder of Multiply.ai, building innovative AI solutions for business transformation.",
    image: null,
  },
  {
    name: "Ritam Gandhi",
    title: "Founder",
    company: "Studio Graphene",
    bio: "Ritam Gandhi founded Studio Graphene, a technology consultancy helping organizations navigate digital innovation.",
    image: null,
  },
  {
    name: "Devin Kohli",
    title: "Investor",
    company: "Outward VC",
    bio: "Devin Kohli is an investor at Outward VC, supporting early-stage startups in the technology and AI space.",
    image: null,
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
          <img src={speaker.image} alt={speaker.name} className="speaker-image" />
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
                <img src={speaker.image} alt={speaker.name} className="modal-image" />
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
