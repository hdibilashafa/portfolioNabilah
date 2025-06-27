import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaInfoCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Section = styled.section`
  padding: 8rem 10%;
  background: #0f0f1a;
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

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s ease-out 0.3s, transform 0.6s ease-out 0.3s;
  will-change: opacity, transform;

  .visible & {
    opacity: 1;
    transform: translateY(0);
  }
`;

const ProjectCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 15px;
  overflow: hidden;
  transition: transform 0.3s, box-shadow 0.3s;
  border: 1px solid rgba(255, 255, 255, 0.1);
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  }
`;

const ProjectImage = styled.div<{ bg: string }>`
  height: 200px;
  background: url(${props => props.bg}) center/cover;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(to bottom, rgba(110, 69, 226, 0.1), rgba(16, 14, 29, 0.9));
  }
`;

const ProjectContent = styled.div`
  padding: 1.5rem;
`;

const ProjectTitle = styled.h3`
  font-size: 1.5rem;
  margin: 0 0 1rem 0;
  color: #fff;
`;

const ProjectDescription = styled.p`
  color: #aaa;
  margin-bottom: 1.5rem;
  line-height: 1.6;
`;

const TechList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  padding: 0;
  list-style: none;
`;

const TechItem = styled.li`
  background: rgba(110, 69, 226, 0.2);
  color: #b197fc;
  padding: 0.3rem 0.8rem;
  border-radius: 15px;
  font-size: 0.8rem;
`;

const ProjectLinks = styled.div`
  display: flex;
  gap: 1rem;
`;

const ProjectLink = styled.a`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #fff;
  text-decoration: none;
  font-size: 0.9rem;
  transition: color 0.3s;
  
  &:hover {
    color: #b197fc;
  }
`;

const projects = [
  // Development Projects (3)
  {
    id: 1,
    title: 'Aplikasi Rekomendasi Musik Berdasarkan Mood',
    description: 'Aplikasi web berbasis Laravel yang merekomendasikan lagu berdasarkan mood pengguna dengan integrasi Last.fm API dan sistem rekomendasi personal.',
    image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?ixlib=rb-4.0.3',
    tech: ['Laravel', 'PHP', 'MySQL', 'Last.fm API'],
    github: '#',
    live: 'https://melody-match.auroraweb.id/',
    type: 'development'
  },
  {
    id: 2,
    title: 'Platform Mini Game Interaktif untuk Edukasi Ringan',
    description: 'Web game interaktif dengan permainan ringan seperti tebak-tebakan dan kuis cepat. Dirancang untuk meningkatkan fokus dan memberikan hiburan edukatif.',
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-4.0.3',
    tech: ['React JS', 'Material-UI'],
    github: '#',
    live: 'https://funrush.vercel.app/',
    type: 'development'
  },
  {
    id: 3,
    title: 'Chatbot Interaktif untuk Tanya Jawab Seputar Topik Khusus',
    description: 'Chatbot berbasis web yang mampu menjawab pertanyaan pengguna dengan gaya percakapan. Cocok untuk digunakan sebagai asisten virtual atau proyek demo NLP sederhana.',
    image: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    tech: ['React', 'JavaScript'],
    github: '#',
    live: 'https://narabot.vercel.app/',
    type: 'development'
  },
  // Data Analysis Projects (2)
  // Note: First project is Panic Disorder Prediction
  {
    id: 5,
    title: 'Prediksi Panic Disorder',
    description: 'Model machine learning berbasis decision tree untuk memprediksi gangguan panik berdasarkan data kesehatan dan gaya hidup',
    image: 'https://images.pexels.com/photos/4145354/pexels-photo-4145354.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    tech: ['Python', 'Scikit-learn', 'Pandas', 'Colab'],
    github: '#',
    live: 'https://colab.research.google.com/drive/1UF8gFUxbUn5LJ9ervIjiwQ_NTJgvi3JM?usp=sharing',
    type: 'data-analysis'
  },
  {
    id: 6,
    title: 'Dashboard Persetujuan Peminjaman',
    description: 'Visualisasi keputusan kredit berdasarkan rasio pinjaman, usia, dan tujuan pinjaman.',
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3',
    tech: ['Looker Studio', 'Data Visualization', 'Finance'],
    github: '#',
    live: 'https://lookerstudio.google.com/reporting/a43d3665-1c55-4d99-b711-116820c3f413',
    type: 'data-analysis',
    background: 'Analisis data keputusan kredit untuk memahami pola persetujuan pinjaman berdasarkan berbagai faktor seperti rasio pinjaman, usia peminjam, dan tujuan pinjaman.',
    insights: [
      'Visualisasi interaktif untuk mengeksplorasi data keputusan kredit',
      'Analisis tren persetujuan berdasarkan berbagai parameter',
      'Dashboard yang informatif untuk pengambilan keputusan keuangan'
    ]
  },
  {
    id: 7,
    title: 'Prediksi Kelayakan Pinjaman Menggunakan Logistic Regression',
    description: 'Implementasi model machine learning untuk mengevaluasi kelayakan kredit menggunakan Logistic Regression dengan Python dan scikit-learn',
    image: 'https://images.pexels.com/photos/4386158/pexels-photo-4386158.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    tech: ['Python', 'scikit-learn', 'Logistic Regression', 'Pandas'],
    github: '#',
    live: 'https://colab.research.google.com/drive/1ZEkUL3tB74QLXb9o73E0HiUqvIuDC7Da?usp=sharing',
    type: 'data-analysis',
    background: 'Proyek ini mengembangkan model Logistic Regression untuk memprediksi kelayakan peminjam berdasarkan berbagai faktor seperti pendapatan, riwayat kredit, dan informasi keuangan lainnya. Model ini membantu lembaga keuangan dalam pengambilan keputusan pemberian pinjaman.',
    insights: [
      'Pemodelan Logistic Regression untuk klasifikasi kelayakan kredit',
      'Analisis fitur yang mempengaruhi keputusan persetujuan pinjaman',
      'Evaluasi performa model dengan metrik klasifikasi',
      'Aplikasi prediksi interaktif dengan Streamlit'
    ],
    evaluation: {
      accuracy: '89.3%',
      precision: '84%',
      recall: '83%',
      f1: '89%'
    }
  },
  {
    id: 8,
    title: 'Analisis dan Visualisasi Data Gunung Berapi Dunia Tahun 2021',
    description: 'Visualisasi data gunung berapi berdasarkan tipe, lokasi geografis, dan status aktivitas untuk memberikan gambaran sebaran globalnya',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3',
    tech: ['Python', 'Pandas', 'Plotly', 'Matplotlib', 'Geopandas'],
    github: '',
    live: 'https://colab.research.google.com/drive/1c3VLB_vNfrv2SWdnShqBrdjCICIcalMp?usp=sharing',
    type: 'data-analysis',
    background: 'Proyek ini menganalisis data aktivitas gunung berapi di seluruh dunia sepanjang tahun 2021. Analisis mencakup distribusi geografis, frekuensi letusan, tingkat bahaya, dan pola temporal aktivitas vulkanik. Visualisasi interaktif membantu memahami pola dan tren aktivitas gunung berapi global.',
    insights: [
      'Identifikasi wilayah dengan aktivitas vulkanik tertinggi di dunia',
      'Analisis pola waktu aktivitas gunung berapi sepanjang tahun 2021',
      'Visualisasi interaktif menggunakan Plotly untuk eksplorasi data',
      'Pemetaan distribusi gunung berapi berdasarkan tingkat bahaya',
      'Korelasi antara aktivitas seismik dan letusan gunung berapi'
    ],
    evaluation: {
      completeness: '95%',
      accuracy: '98%',
      visualization: 'Interaktif',
      insights: 'Mendalam'
    },
    demo: {
      title: 'Visualisasi Data Gunung Berapi',
      description: 'Jelajahi data aktivitas gunung berapi dunia tahun 2021 dengan visualisasi interaktif.'
    }
  }
];

const Projects = () => {
  const [filter, setFilter] = useState('all');
  const projectsRef = useRef<HTMLElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (!projectsRef.current) return;
      
      const elementTop = projectsRef.current.getBoundingClientRect().top;
      const elementVisible = 150;
      
      if (elementTop < window.innerHeight - elementVisible) {
        projectsRef.current.classList.add('visible');
      } else {
        projectsRef.current.classList.remove('visible');
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <Section id="projects" ref={projectsRef} className="fade-in">
      <SectionTitle>Proyek Saya</SectionTitle>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <button 
          onClick={() => setFilter('all')}
          style={{
            background: filter === 'all' ? '#6e45e2' : 'transparent',
            color: 'white',
            border: '1px solid #6e45e2',
            padding: '0.5rem 1.5rem',
            margin: '0 0.5rem',
            borderRadius: '20px',
            cursor: 'pointer',
            transition: 'all 0.3s ease'
          }}
        >
          Semua
        </button>
        <button 
          onClick={() => setFilter('development')}
          style={{
            background: filter === 'development' ? '#6e45e2' : 'transparent',
            color: 'white',
            border: '1px solid #6e45e2',
            padding: '0.5rem 1.5rem',
            margin: '0 0.5rem',
            borderRadius: '20px',
            cursor: 'pointer',
            transition: 'all 0.3s ease'
          }}
        >
          Development
        </button>
        <button 
          onClick={() => setFilter('data-analysis')}
          style={{
            background: filter === 'data-analysis' ? '#6e45e2' : 'transparent',
            color: 'white',
            border: '1px solid #6e45e2',
            padding: '0.5rem 1.5rem',
            margin: '0 0.5rem',
            borderRadius: '20px',
            cursor: 'pointer',
            transition: 'all 0.3s ease'
          }}
        >
          Data Analysis
        </button>
      </div>
      <ProjectsGrid>
        {projects
          .filter(project => filter === 'all' || project.type === filter)
          .map((project, index) => (
          <ProjectCard
            key={project.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
          >
            <ProjectImage bg={project.image} />
            <ProjectContent>
              <ProjectTitle>{project.title}</ProjectTitle>
              <ProjectDescription>{project.description}</ProjectDescription>
              <TechList>
                {project.tech.map(tech => (
                  <TechItem key={tech}>{tech}</TechItem>
                ))}
              </TechList>
              <ProjectLinks>
                {project.type === 'development' ? (
                  <ProjectLink 
                    href={project.live !== '#' ? project.live : '#'} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={project.live === '#' ? { opacity: 0.7, cursor: 'not-allowed' } : {}}
                  >
                    <FaExternalLinkAlt /> Demo
                  </ProjectLink>
                ) : (
                  <>
                    <ProjectLink 
                      onClick={() => navigate(`/projects/${project.id || 'project'}`)}
                      className="info"
                      style={{ cursor: 'pointer' }}
                    >
                      <FaInfoCircle /> Lihat Detail
                    </ProjectLink>
                    {project.github && project.github !== '#' && (
                      <ProjectLink href={project.github} target="_blank" rel="noopener noreferrer">
                        <FaGithub /> Kode
                      </ProjectLink>
                    )}
                    {project.live && project.live !== '#' && (
                      <ProjectLink href={project.live} target="_blank" rel="noopener noreferrer" className="secondary">
                        <FaExternalLinkAlt /> Demo
                      </ProjectLink>
                    )}
                  </>
                )}
              </ProjectLinks>
            </ProjectContent>
          </ProjectCard>
        ))}
      </ProjectsGrid>
    </Section>
  );
};

export default Projects;
