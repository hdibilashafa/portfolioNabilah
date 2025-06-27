import React from 'react';
import styled from 'styled-components';
import { FaHeart } from 'react-icons/fa';

const FooterContainer = styled.footer`
  background: #050510;
  color: #aaa;
  padding: 2rem 10%;
  text-align: center;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
`;

const Content = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: #fff;
  margin-bottom: 1rem;
`;

const Links = styled.div`
  display: flex;
  gap: 2rem;
  margin-bottom: 1.5rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const Link = styled.a`
  color: #aaa;
  text-decoration: none;
  transition: color 0.3s;
  
  &:hover {
    color: #6e45e2;
  }
`;

const Copyright = styled.p`
  font-size: 0.9rem;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.3rem;
  
  svg {
    color: #ff6b6b;
    margin: 0 0.2rem;
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      <Content>
        <Links>
          <Link href="#home">Home</Link>
          <Link href="#skills">Skills</Link>
          <Link href="#projects">Projects</Link>
          <Link href="#contact">Contact</Link>
        </Links>
        <Copyright>
          © 2025 Made by Nabilah Shafa Nur Sofyani
        </Copyright>
      </Content>
    </FooterContainer>
  );
};

export default Footer;
