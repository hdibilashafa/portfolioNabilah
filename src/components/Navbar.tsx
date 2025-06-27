import React from 'react';
import styled from 'styled-components';
import { FaLinkedin, FaInstagram } from 'react-icons/fa';

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 5%;
  background: rgba(10, 10, 20, 0.8);
  backdrop-filter: blur(10px);
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 1000;
`;

const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: #fff;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;
`;

const NavLink = styled.a`
  color: #aaa;
  text-decoration: none;
  transition: color 0.3s;
  
  &:hover {
    color: #fff;
  }
`;

const SocialIcons = styled.div`
  display: flex;
  gap: 1rem;
`;

const SocialIcon = styled.a`
  color: #aaa;
  font-size: 1.2rem;
  transition: color 0.3s;
  
  &:hover {
    color: #fff;
  }
`;

const ConnectButton = styled.button`
  background: linear-gradient(90deg, #6e45e2, #88d3ce);
  border: none;
  padding: 0.5rem 1.5rem;
  border-radius: 25px;
  color: white;
  font-weight: 500;
  cursor: pointer;
  margin-left: 2rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: transform 0.3s;
  
  &:hover {
    transform: translateY(-2px);
  }
`;

const socialIcons = [
  { icon: FaLinkedin, url: 'https://www.linkedin.com/in/nabilah-shafa-3437a2249' },
  { icon: FaInstagram, url: 'https://www.instagram.com/nabilahshfa?igsh=MWlxdGJuNHJyN2d0NA==' },
];

const Navbar = () => {
  return (
    <Nav>
      <Logo></Logo>
      <NavLinks>
        <NavLink href="#home">Home</NavLink>
        <NavLink href="#about">About</NavLink>
        <NavLink href="#skills">Skills</NavLink>
        <NavLink href="#projects">Projects</NavLink>
        <NavLink href="#contact">Contact</NavLink>
      </NavLinks>
      <SocialIcons>
        {socialIcons.map((social, index) => {
          const Icon = social.icon;
          return (
            <SocialIcon key={index} href={social.url} target="_blank" rel="noopener noreferrer">
              <Icon size={20} />
            </SocialIcon>
          );
        })}
      </SocialIcons>
    </Nav>
  );
};

export default Navbar;
