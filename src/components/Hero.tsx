import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';

const HeroSection = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10%;
  position: relative;
  overflow: hidden;
  background: linear-gradient(135deg, #0f0c29, #302b63, #24243e);
  color: white;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s ease-out, transform 0.6s ease-out;
  will-change: opacity, transform;
  
  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
    padding-top: 100px;
  }

  &.visible {
    opacity: 1;
    transform: translateY(0);
  }
`;

const ProfileImage = styled.div`
  width: 220px;
  height: auto;
  position: relative;
  z-index: 2;
  border: none;
  background: none;
  box-shadow: none;
  margin-right: 90px;
  margin-left: -40px;
  overflow: visible;
  
  img {
    width: 100%;
    height: auto;
    display: block;
    border: none;
    box-shadow: none;
  }
  
  @media (max-width: 768px) {
    width: 180px;
    margin: 0 auto 20px;
    margin-left: -30px;
  }
`;

const Content = styled.div`
  max-width: 600px;
  z-index: 2;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s ease-out 0.3s, transform 0.6s ease-out 0.3s;
  will-change: opacity, transform;

  .visible & {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Label = styled.span`
  display: inline-block;
  background: rgba(255, 255, 255, 0.1);
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  margin-bottom: 1.5rem;
  backdrop-filter: blur(5px);
`;

const Title = styled.h1`
  font-size: 3.5rem;
  margin: 0 0 1.5rem 0;
  line-height: 1.2;
  background: linear-gradient(90deg, #fff, #aaa);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Description = styled.p`
  font-size: 1.1rem;
  color: #aaa;
  margin-bottom: 2.5rem;
  line-height: 1.6;
`;

const Button = styled(motion.button)`
  background: linear-gradient(90deg, #6e45e2, #88d3ce);
  border: none;
  padding: 1rem 2rem;
  border-radius: 30px;
  color: white;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  box-shadow: 0 4px 15px rgba(110, 69, 226, 0.4);
`;

const Planet = styled.div`
  position: absolute;
  right: 10%;
  top: 50%;
  transform: translateY(-50%);
  width: 400px;
  height: 400px;
  background: radial-gradient(circle at 30% 30%, #9d4edd, #5a189a);
  border-radius: 50%;
  box-shadow: 0 0 80px rgba(157, 78, 221, 0.5);
  z-index: 1;
`;

const Star = styled.div<{ size: string; top: string; left: string; delay: string }>`
  position: absolute;
  width: ${props => props.size};
  height: ${props => props.size};
  background: white;
  border-radius: 50%;
  top: ${props => props.top};
  left: ${props => props.left};
  animation: twinkle ${props => props.delay} infinite alternate;
  
  @keyframes twinkle {
    from { opacity: 0.2; }
    to { opacity: 1; }
  }
`;

const Highlight = styled.span`
  color: #fff;
`;

const HighlightText = styled.span`
  color: #88d3ce;
  font-weight: 600;
`;

const Hero = () => {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => {
      if (heroRef.current) {
        observer.unobserve(heroRef.current);
      }
    };
  }, []);

  return (
    <HeroSection id="home" ref={heroRef} className="fade-in">
      <Content>
        <Title>Halo, saya <Highlight>Nabilah</Highlight></Title>
        <Description>
          Menikmati proses <HighlightText>membangun aplikasi interaktif</HighlightText> dan <HighlightText>menggali cerita dari data</HighlightText>.
          <br />
          Kode dan data adalah alat saya untuk menciptakan solusi yang <HighlightText>bermanfaat</HighlightText>.
        </Description>
        <Button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            const contactSection = document.getElementById('contact');
            if (contactSection) {
              contactSection.scrollIntoView({ behavior: 'smooth' });
            }
          }}
        >
          Mari Terhubung <FiArrowRight size={20} />
        </Button>
      </Content>
      
      <ProfileImage>
        <img src="/images/profilehero.png" alt="Nabilah" />
      </ProfileImage>
      
      <Planet />
      
      {/* Stars */}
      <Star size="2px" top="20%" left="10%" delay="2s" />
      <Star size="3px" top="30%" left="15%" delay="1.5s" />
      <Star size="2px" top="25%" left="20%" delay="2.5s" />
      <Star size="4px" top="15%" left="25%" delay="1s" />
      <Star size="2px" top="35%" left="30%" delay="3s" />
    </HeroSection>
  );
};

export default Hero;
