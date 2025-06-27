import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaReact, FaNodeJs, FaHtml5, FaCss3Alt, FaJs, FaFigma, FaPython, FaDatabase, FaTable, FaChartLine, FaCode, FaBook, FaGithub, FaLaravel } from 'react-icons/fa';
import { SiTypescript, SiMongodb, SiJupyter } from 'react-icons/si';
import { FaChartBar, FaBrain } from 'react-icons/fa';
import { FaRProject } from 'react-icons/fa6';
import { IconType } from 'react-icons';

const Section = styled.section`
  padding: 8rem 10%;
  background: #0a0a14;
  color: white;
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.6s ease-out, transform 0.6s ease-out;
  will-change: opacity, transform;

  &.visible {
    opacity: 1;
    transform: translateY(0);
  }
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 4rem;
  position: relative;
  display: inline-block;
  left: 50%;
  transform: translateX(-50%);
  
  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 0;
    width: 100%;
    height: 4px;
    background: linear-gradient(90deg, #6e45e2, #88d3ce);
    border-radius: 2px;
  }
`;

const SkillsContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 4rem 1rem;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s ease-out 0.2s, transform 0.6s ease-out 0.2s;
  will-change: opacity, transform;

  .visible & {
    opacity: 1;
    transform: translateY(0);
  }
`;

const SkillsGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
  margin-top: 2rem;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s ease-out 0.4s, transform 0.6s ease-out 0.4s;
  will-change: opacity, transform;

  .visible & {
    opacity: 1;
    transform: translateY(0);
  }
`;

const SkillCard = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 1.5rem;
  text-align: center;
  transition: all 0.3s ease;
  cursor: default;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(255, 255, 255, 0.1);
  min-height: 120px;
  width: 120px;
  margin: 0.5rem;

  &:hover {
    transform: translateY(-5px);
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(0, 240, 255, 0.3);
  }
`;

const IconWrapper = styled.div`
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.8rem;
  color: #00f0ff;
  font-size: 2rem;
  border-radius: 5px;
`;

interface Skill {
  name: string;
  icon: IconType;
}

const skills = {
  'Development': [
    { name: 'React', icon: FaReact },
    { name: 'TypeScript', icon: SiTypescript },
    { name: 'JavaScript', icon: FaJs },
    { name: 'Node.js', icon: FaNodeJs },
    { name: 'HTML5', icon: FaHtml5 },
    { name: 'CSS3', icon: FaCss3Alt },
    { name: 'Laravel', icon: FaCode },
    { name: 'MongoDB', icon: SiMongodb },
  ],
  'Data Analysis': [
    { name: 'Python', icon: FaPython },
    { name: 'SQL', icon: FaDatabase },
    { name: 'Excel', icon: FaTable },
    { name: 'Tableau', icon: FaChartLine },
    { name: 'Power BI', icon: FaChartBar },
    { name: 'TensorFlow', icon: FaBrain },
  ],
  'Tools & Others': [
    { name: 'Figma', icon: FaFigma },
    { name: 'VS Code', icon: FaCode },
    { name: 'Jupyter', icon: FaBook },
    { name: 'GitHub', icon: FaGithub },
  ]
};

const SkillsSection = styled(Section)``;

const SkillName = styled.span`
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.8);
  margin-top: 0.8rem;
`;

const Skills = () => {
  const skillsRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!skillsRef.current) return;
      
      const elementTop = skillsRef.current.getBoundingClientRect().top;
      const elementVisible = 150;
      
      if (elementTop < window.innerHeight - elementVisible) {
        skillsRef.current.classList.add('visible');
      } else {
        skillsRef.current.classList.remove('visible');
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <SkillsSection id="skills" ref={skillsRef} className="fade-in">
      <SectionTitle>Skills & Tools</SectionTitle>
      {Object.entries(skills).map(([category, skillList]) => (
        <div key={category} style={{ marginBottom: '2rem' }}>
          <h3 style={{ 
            color: '#88d3ce', 
            marginBottom: '1.5rem',
            fontSize: '1.5rem',
            textAlign: 'center',
            fontWeight: 600
          }}>
            {category}
          </h3>
          <SkillsGrid>
            {skillList.map((skill) => {
              const Icon = skill.icon;
              return (
                <SkillCard key={`${category}-${skill.name}`}>
                  <IconWrapper>
                    <Icon size={24} />
                  </IconWrapper>
                  <SkillName>{skill.name}</SkillName>
                </SkillCard>
              );
            })}
          </SkillsGrid>
        </div>
      ))}
    </SkillsSection>
  );
};

export default Skills;
