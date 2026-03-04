import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const timelineData = [
  { 
    time: "9:30-10:00am", 
    title: "Registration",
    location: "Old Theatre"
  },
  { 
    time: "10:00-11:00am", 
    title: "Opening Ceremony",
    location: "Old Theatre"
  },
  { 
    time: "11:15am-12:15pm", 
    title: "Lessons from the Frontier: Industry Reflections on Governing AI",
    description: "Policy heads from frontier tech companies discussing responsible scaling policies and governance frameworks",
    location: "Old Theatre"
  },
  { 
    time: "12:15-1:30pm", 
    title: "Lunch Break"
  },
  { 
    time: "1:30-2:00pm", 
    title: "Fireside Chat with Martin Bauer",
    location: "Old Theatre"
  },
  { 
    time: "2:15-3:15pm", 
    title: "AI Governance in a Multipolar World: Power, Authority, and Legitimacy",
    description: "Interdisciplinary perspectives on international AI Governance",
    location: "Old Theatre"
  },
  { 
    time: "3:30-4:30pm", 
    title: "Breakout Sessions",
    description: [
      "Tech Law in Action (MAR.1.04): A small-group roundtable with leading tech lawyers on regulation, risk, and responsible AI in practice",
      "Inside the Institutes (MAR.1.08): Direct exposure to career trajectories at AI safety organisations, think tanks, and advocacy groups",
      "Frontier Governance (MAR.2.04): Responsible development practices at leading AI/tech start-ups, understanding governance from the inside",
      "Open Forum (Marshall Lobby): Networking with panelists and other participants"
    ],
    location: "Marshall Building"
  },
  { 
    time: "4:45-5:30pm", 
    title: "Closing Ceremony",
    location: "Old Theatre"
  },
];

function TimelineItem({ time, title, description, location, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="timeline-item"
    >
      <div className="timeline-dot"></div>
      
      <motion.div 
        className="timeline-time"
        animate={isInView ? { scale: 1.2, color: "#ffffff" } : { scale: 1, color: "rgba(255,255,255,0.5)" }}
        transition={{ duration: 0.6 }}
      >
        {time}
      </motion.div>

      <motion.div
        className="timeline-content"
        initial={{ opacity: 0, x: -20 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <h3>{title}</h3>
        
        {description && (
          <div className="timeline-description">
            {Array.isArray(description) ? (
              <ul>
                {description.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            ) : (
              <p>{description}</p>
            )}
          </div>
        )}
        
        {location && (
          <div className="timeline-location">
            <span className="location-icon">📍</span> {location}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

export default function Timeline() {
  return (
    <div className="timeline-container">
      <div className="timeline-line"></div>
      {timelineData.map((item, index) => (
        <TimelineItem key={index} {...item} index={index} />
      ))}
    </div>
  );
}
