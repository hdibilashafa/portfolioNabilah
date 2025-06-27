import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiSend, FiMail, FiMapPin, FiPhone, FiGithub, FiLinkedin, FiTwitter, FiInstagram } from 'react-icons/fi';

const Section = styled.section`
  padding: 8rem 10%;
  background: #0a0a14;
  color: white;
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

const ContactContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  margin-top: 3rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ContactInfo = styled.div`
  h3 {
    font-size: 1.8rem;
    margin-bottom: 1.5rem;
    color: #fff;
  }
  
  p {
    color: #aaa;
    line-height: 1.6;
    margin-bottom: 2.5rem;
  }
`;

const InfoItem = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 1.5rem;
  
  svg {
    font-size: 1.5rem;
    color: #6e45e2;
    margin-right: 1.5rem;
    margin-top: 0.3rem;
  }
  
  div {
    h4 {
      margin: 0 0 0.3rem 0;
      color: #fff;
    }
    
    span {
      color: #aaa;
      font-size: 0.9rem;
    }
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
  
  a {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.05);
    color: #fff;
    font-size: 1.2rem;
    transition: all 0.3s;
    
    &:hover {
      background: #6e45e2;
      transform: translateY(-3px);
    }
  }
`;

const Form = styled.form`
  background: rgba(255, 255, 255, 0.03);
  padding: 2rem;
  border-radius: 15px;
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
  
  label {
    display: block;
    margin-bottom: 0.5rem;
    color: #fff;
    font-size: 0.9rem;
  }
  
  input,
  textarea {
    width: 100%;
    padding: 0.8rem 1rem;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 8px;
    color: #fff;
    font-family: 'Poppins', sans-serif;
    transition: border-color 0.3s;
    
    &:focus {
      outline: none;
      border-color: #6e45e2;
    }
    
    &::placeholder {
      color: #555;
    }
  }
  
  textarea {
    min-height: 150px;
    resize: vertical;
  }
`;

const SubmitButton = styled(motion.button)`
  background: linear-gradient(90deg, #6e45e2, #88d3ce);
  color: white;
  border: none;
  padding: 0.8rem 2rem;
  border-radius: 30px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 1rem;
  
  svg {
    font-size: 1.2rem;
  }
`;

const Contact = () => {
  return (
    <Section id="contact">
      <SectionTitle>Hubungi Saya</SectionTitle>
      <ContactContainer>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          
          <div style={{ marginTop: '2rem' }}>
            <div style={{ 
              display: 'flex', 
              flexDirection: 'row', 
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: '2rem', 
              width: '100%', 
              maxWidth: '800px', 
              margin: '0 auto'
            }}>
              <div style={{ flex: '1', minWidth: '250px', maxWidth: '100%' }}>
                <InfoItem style={{ 
                  display: 'flex',
                  flexDirection: 'row', 
                  alignItems: 'center', 
                  textAlign: 'left', 
                  background: 'rgba(255, 255, 255, 0.03)', 
                  padding: '1.25rem', 
                  borderRadius: '10px',
                  height: '100%'
                }}>
                  <FiMapPin style={{ fontSize: '1.5rem', color: '#6e45e2', marginRight: '1rem', flexShrink: 0 }} />
                  <div>
                    <h4 style={{ margin: '0 0 0.25rem 0', color: '#fff' }}>Lokasi</h4>
                    <span style={{ color: '#aaa' }}>Bandung, Indonesia</span>
                  </div>
                </InfoItem>
              </div>
              
              <div style={{ flex: '1', minWidth: '250px', maxWidth: '100%' }}>
                <InfoItem style={{ 
                  display: 'flex',
                  flexDirection: 'row', 
                  alignItems: 'center', 
                  textAlign: 'left', 
                  background: 'rgba(255, 255, 255, 0.03)', 
                  padding: '1.25rem', 
                  borderRadius: '10px',
                  height: '100%'
                }}>
                  <FiMail style={{ fontSize: '1.5rem', color: '#6e45e2', marginRight: '1rem', flexShrink: 0 }} />
                  <div>
                    <h4 style={{ margin: '0 0 0.25rem 0', color: '#fff' }}>Email</h4>
                    <a href="mailto:hdibilashafa@gmail.com" style={{ color: '#aaa', textDecoration: 'none', transition: 'color 0.3s' }} onMouseOver={(e) => e.currentTarget.style.color = '#6e45e2'} onMouseOut={(e) => e.currentTarget.style.color = '#aaa'}>hdibilashafa@gmail.com</a>
                  </div>
                </InfoItem>
              </div>
            </div>
            
            <div style={{ marginTop: '3rem' }}>
              <h4 style={{ color: '#fff', marginBottom: '1.5rem' }}>Temukan Saya di</h4>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <a href="https://www.linkedin.com/in/nabilah-shafa-3437a2249" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(255, 255, 255, 0.05)', color: '#fff', fontSize: '1.2rem', transition: 'all 0.3s' }} onMouseOver={(e) => { e.currentTarget.style.background = '#6e45e2'; e.currentTarget.style.transform = 'translateY(-3px)'; }} onMouseOut={(e) => { e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'; e.currentTarget.style.transform = 'translateY(0)'; }}>
                  <FiLinkedin />
                </a>
                <a href="https://www.instagram.com/nabilahshfa?igshid=MWlxdGJuNHJyN2d0NA==" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(255, 255, 255, 0.05)', color: '#fff', fontSize: '1.2rem', transition: 'all 0.3s' }} onMouseOver={(e) => { e.currentTarget.style.background = '#6e45e2'; e.currentTarget.style.transform = 'translateY(-3px)'; }} onMouseOut={(e) => { e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'; e.currentTarget.style.transform = 'translateY(0)'; }}>
                  <FiInstagram />
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </ContactContainer>
    </Section>
  );
};

export default Contact;
