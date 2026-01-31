import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import "./Team.css";

// Team data - update this with your actual team members
const teamData = [
  {
    name: "Team Member 1",
    role: "Role/Position",
    description: "Brief description or bio",
  },
  {
    name: "Team Member 2",
    role: "Role/Position",
    description: "Brief description or bio",
  },
  {
    name: "Team Member 3",
    role: "Role/Position",
    description: "Brief description or bio",
  },
];

function TeamMember({ name, role, description, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="team-member"
    >
      <motion.div
        className="team-content"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.5, delay: index * 0.15 }}
      >
        <h3 className="team-name">{name}</h3>
        <p className="team-role">{role}</p>
        {description && <p className="team-description">{description}</p>}
      </motion.div>
    </motion.div>
  );
}

export default function Team() {
  return (
    <div className="team-container">
      <motion.h2
        className="team-title"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Conference Team
      </motion.h2>
      <div className="team-grid">
        {teamData.map((member, index) => (
          <TeamMember key={index} {...member} index={index} />
        ))}
      </div>
    </div>
  );
}

