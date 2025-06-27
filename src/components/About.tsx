import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaUserGraduate, FaLaptopCode, FaLightbulb } from 'react-icons/fa';

// Animasi untuk section
const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.8,
      ease: 'easeOut'
    }
  }
};

const slideInLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: {
      duration: 0.8,
      ease: 'easeOut'
    }
  }
};

const slideInRight = {
  hidden: { opacity: 0, x: 50 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: {
      duration: 0.8,
      ease: 'easeOut',
      delay: 0.2
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5
    }
  }
};

const Section = styled.section`
  padding: 8rem 10%;
  background: #0a0a14;
  color: white;
  overflow: hidden;
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
    width: 60%;
    height: 4px;
    background: linear-gradient(90deg, #00f0ff, #5773ff);
    bottom: -10px;
    left: 20%;
    border-radius: 2px;
  }
`;

const AboutContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4rem;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
`;

const AboutContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: 4rem;
  align-items: center;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    text-align: center;
  }
`;

const AboutImage = styled.div`
  position: relative;
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  
  img {
    width: 100%;
    height: auto;
    border-radius: 20px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  }
`;

const AboutText = styled.div`
  h3 {
    font-size: 2rem;
    margin-bottom: 1.5rem;
    color: #fff;
  }
  
  p {
    font-size: 1.1rem;
    line-height: 1.8;
    color: #ccc;
    margin-bottom: 2rem;
  }
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  margin-top: 2rem;
`;

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  
  svg {
    color: #5773ff;
    font-size: 1.5rem;
  }
  
  div {
    h4 {
      font-size: 1rem;
      color: #fff;
      margin: 0;
    }
    
    span {
      font-size: 0.9rem;
      color: #aaa;
    }
  }
`;

const About = () => {
  return (
    <Section id="about">
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px 0px" }}
        variants={fadeIn}
      >
        <SectionTitle>Tentang Saya</SectionTitle>
      </motion.div>
      
      <AboutContainer>
        <AboutContent>
          <motion.div
            variants={slideInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px 0px" }}
            style={{ width: '100%' }}
          >
            <AboutImage>
              <img 
                src="/images/profileabout.jpg" 
                alt="Nabilah" 
                style={{
                  borderRadius: '20px',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
                  transition: 'all 0.3s ease',
                  width: '100%',
                  maxWidth: '400px',
                  height: 'auto',
                  objectFit: 'cover',
                  backgroundColor: '#f0f0f0',
                  display: 'block',
                  margin: '0 auto'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.02)';
                  e.currentTarget.style.boxShadow = '0 15px 40px rgba(0,0,0,0.25)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.2)';
                }}
              />
            </AboutImage>
          </motion.div>
          
          <motion.div
            variants={slideInRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px 0px" }}
            style={{ width: '100%' }}
          >
            <AboutText>
              <motion.p variants={item} style={{ marginTop: 0 }}>
                Saya seorang mahasiswa Teknik Informatika di Universitas Komputer Indonesia yang bersemangat untuk mengembangkan karir di bidang teknologi sebagai Developer dan Data Analyst. Saya memiliki ketertarikan yang kuat dalam pengembangan perangkat lunak dan analisis data untuk menciptakan solusi yang berdampak.
                <br /><br />
                Dengan dasar pemrograman yang kuat dan kemampuan analitis yang baik, saya siap untuk berkontribusi dalam tim pengembangan maupun analisis data. Saya senang memecahkan masalah kompleks dan terus belajar teknologi terbaru untuk meningkatkan keterampilan saya.
              </motion.p>
              
              <InfoGrid>
                <motion.div variants={item}>
                  <InfoItem>
                    <FaUserGraduate />
                    <div>
                      <h4>Pendidikan</h4>
                      <span>S1 Teknik Informatika<br />Universitas Komputer Indonesia<br />2022-sekarang</span>
                    </div>
                  </InfoItem>
                </motion.div>
                <motion.div variants={item}>
                  <InfoItem>
                    <FaLaptopCode />
                    <div>
                      <h4>Minat Karir</h4>
                      <span>Frontend Development<br />Data Analysis</span>
                    </div>
                  </InfoItem>
                </motion.div>

              </InfoGrid>
            </AboutText>
          </motion.div>
        </AboutContent>
      </AboutContainer>
    </Section>
  );
};

export default About;
