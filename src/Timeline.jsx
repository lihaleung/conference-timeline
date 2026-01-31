import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const timelineData = [
  { 
    time: "9:30-10am", 
    title: "Event Registration",
    location: "Old Theatre"
  },
  { 
    time: "10-11am", 
    title: "Opening Ceremony",
    description: "Welcoming Remarks and Framing Debate",
    location: "Old Theatre"
  },
  { 
    time: "11:15-12pm", 
    title: "Lessons from the Frontier: Industry Reflections on Governing AI",
    description: "Policy heads from frontier tech companies discussing responsible scaling policies and governance frameworks",
    location: "Centre Building"
  },
  { 
    time: "12-1pm", 
    title: "Lunch Break",
    location: "Marshall Building/Shaw Library"
  },
  { 
    time: "1-2pm", 
    title: "Headline Address",
    description: "A discussion on digital democracy and international AI coordination",
    location: "Old Theatre"
  },
  { 
    time: "2:30-3:15pm", 
    title: "AI Governance in a Multipolar World: Power, Authority, and Legitimacy",
    description: "UK policymakers on regulatory approaches to transformative AI",
    location: "Centre Building"
  },
  { 
    time: "3:15-4pm", 
    title: "Coffee Break",
    location: "Shaw Library"
  },
  { 
    time: "4-5:15pm", 
    title: "Breakout Sessions",
    description: [
      "Law Clinic: Legal experts guide students through live governance scenarios (eg. designing oversight mechanisms, drafting policy proposals)",
      "Research Pathways: Direct exposure to career trajectories at AI safety organisations, think tanks, and advocacy groups",
      "Frontier Innovation: Responsible development practices at leading AI/tech start-ups, understanding governance from the inside"
    ],
    location: "Marshall Building"
  },
  { 
    time: "4-5:15pm", 
    title: "Student Presentations",
    description: "15-20 selected submissions on governance research",
    location: "Marshall Building"
  },
  { 
    time: "5:30-6pm", 
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
