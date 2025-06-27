import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FaArrowLeft, FaGithub, FaExternalLinkAlt, FaChartLine, FaInfoCircle } from 'react-icons/fa';

// Tipe untuk data proyek
type Project = {
  title: string;
  description: string;
  tech: string[];
  github: string;
  live: string;
  background: string;
  objectives?: string[];
  insights?: string[];
  evaluation?: {
    accuracy: string;
    precision: string;
    recall: string;
    f1: string;
    roc_auc?: string;
  };
  image?: string;
  demo?: {
    title: string;
    description: string;
  };
};

const DetailContainer = styled.div`
  max-width: 1000px;
  margin: 2rem auto;
  padding: 2rem;
  background: #0f0f1a;
  border-radius: 10px;
  color: white;
`;

const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: #6e45e2;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 2rem;
  transition: all 0.3s ease;
  
  &:hover {
    background: #5d3ac9;
    transform: translateX(-5px);
  }
`;

const ProjectTitle = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  color: #fff;
  position: relative;
  display: inline-block;
  
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

// Styled Components for Demo Feature
const DemoContainer = styled.div`
  background: rgba(255, 255, 255, 0.03);
  border-radius: 10px;
  padding: 2rem;
  margin: 2rem 0;
  border: 1px solid rgba(255, 255, 255, 0.1);
  
  h3 {
    margin-top: 0;
    color: #fff;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
`;

const DemoForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-top: 1.5rem;
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 1rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  
  label {
    font-weight: 500;
    color: #ddd;
    font-size: 0.95rem;
  }
  
  input, select {
    padding: 0.7rem 1rem;
    border-radius: 6px;
    border: 1px solid #444;
    background: rgba(255, 255, 255, 0.05);
    color: white;
    font-size: 1rem;
    transition: all 0.3s ease;
    
    &:focus {
      outline: none;
      border-color: #6e45e2;
      box-shadow: 0 0 0 2px rgba(110, 69, 226, 0.2);
    }
  }
  
  input[type="range"] {
    padding: 0.5rem 0;
    width: 100%;
    height: 6px;
    -webkit-appearance: none;
    background: #333;
    border-radius: 3px;
    outline: none;
    
    &::-webkit-slider-thumb {
      -webkit-appearance: none;
      width: 18px;
      height: 18px;
      background: #6e45e2;
      border-radius: 50%;
      cursor: pointer;
      transition: all 0.2s ease;
      
      &:hover {
        transform: scale(1.1);
      }
    }
  }
`;

const RangeContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-top: 0.5rem;
`;

const RangeValue = styled.span`
  display: inline-block;
  min-width: 50px;
  text-align: right;
  color: #6e45e2;
  font-weight: 600;
`;

const SubmitButton = styled.button`
  background: #6e45e2;
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 6px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  margin-top: 1rem;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
  
  &:hover {
    background: #5d3ac9;
    transform: translateY(-2px);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

const ResultContainer = styled.div<{ $risk: 'low' | 'medium' | 'high' }>`
  margin-top: 2rem;
  padding: 1.5rem;
  background: ${props => {
    switch(props.$risk) {
      case 'high': return 'rgba(255, 71, 87, 0.1)';
      case 'medium': return 'rgba(255, 193, 7, 0.1)';
      default: return 'rgba(46, 213, 115, 0.1)';
    }
  }};
  border-radius: 8px;
  border-left: 4px solid ${props => {
    switch(props.$risk) {
      case 'high': return '#ff4757';
      case 'medium': return '#ffc107';
      default: return '#2ed573';
    }
  }};
  
  h4 {
    margin-top: 0;
    color: #fff;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  
  p {
    margin: 0.5rem 0;
    line-height: 1.6;
  }
`;

const PredictionText = styled.div<{ $risk: 'low' | 'medium' | 'high' }>`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${props => {
    switch(props.$risk) {
      case 'high': return '#ff4757';
      case 'medium': return '#ffc107';
      default: return '#2ed573';
    }
  }};
  margin: 0.5rem 0 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Disclaimer = styled.div`
  margin-top: 1.5rem;
  padding-top: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  font-size: 0.85rem;
  color: #888;
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  line-height: 1.5;
  
  svg {
    margin-top: 0.2rem;
    flex-shrink: 0;
  }
`;

const Section = styled.div`
  margin-bottom: 2rem;
  
  h2 {
    color: #88d3ce;
    margin-bottom: 1rem;
  }
  
  p {
    line-height: 1.6;
    margin-bottom: 1rem;
  }
`;

const TechList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin: 1rem 0;
`;

const TechItem = styled.span`
  background: rgba(110, 69, 226, 0.2);
  color: #b197fc;
  padding: 0.3rem 0.8rem;
  border-radius: 15px;
  font-size: 0.9rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
`;

const ActionButton = styled.a`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.8rem 1.5rem;
  background: #6e45e2;
  color: white;
  text-decoration: none;
  border-radius: 5px;
  transition: all 0.3s ease;
  
  &:hover {
    background: #5d3ac9;
    transform: translateY(-2px);
  }
  
  &.secondary {
    background: transparent;
    border: 1px solid #6e45e2;
    
    &:hover {
      background: rgba(110, 69, 226, 0.1);
    }
  }
`;

// Data proyek
const projectsData: Record<string, Project> = {
  '6': {
    title: 'Dashboard Persetujuan Peminjaman',
    description: 'Visualisasi keputusan kredit berdasarkan rasio pinjaman, usia, dan tujuan pinjaman.',
    tech: ['Looker Studio', 'Data Visualization', 'Finance'],
    github: '#',
    live: 'https://lookerstudio.google.com/reporting/a43d3665-1c55-4d99-b711-116820c3f413',
    background: 'Pinjaman online dan kredit mikro semakin populer, namun tidak semua pengajuan disetujui. Proyek ini bertujuan untuk menganalisis pola persetujuan pinjaman berdasarkan rasio pinjaman terhadap pendapatan, tujuan pinjaman, dan karakteristik peminjam.',
    objectives: [
      'Mengidentifikasi faktor yang memengaruhi persetujuan atau penolakan pinjaman',
      'Membantu lembaga keuangan memahami tren dan meningkatkan strategi evaluasi kredit'
    ],
    insights: [
      'Mayoritas pengajuan dari usia 19–29 tahun memiliki tingkat persetujuan tertinggi (65.8%)',
      'Tujuan pinjaman seperti MEDICAL dan VENTURE memiliki rasio disetujui lebih tinggi',
      'Rasio pinjaman terhadap pendapatan di atas 26% menunjukkan peningkatan tingkat persetujuan'
    ],
    evaluation: undefined
  },
  '5': {
    title: 'Prediksi Panic Disorder',
    description: 'Model machine learning berbasis decision tree untuk memprediksi gangguan panik berdasarkan data kesehatan dan gaya hidup',
    image: 'https://images.unsplash.com/photo-1582719471384-894e92f43098?ixlib=rb-4.0.3',
    tech: ['Python', 'Scikit-learn', 'Pandas', 'Colab', 'Decision Tree'],
    github: 'https://colab.research.google.com/drive/1UF8gFUxbUn5LJ9ervIjiwQ_NTJgvi3JM?usp=sharing',
    live: 'https://colab.research.google.com/drive/1UF8gFUxbUn5LJ9ervIjiwQ_NTJgvi3JM?usp=sharing',
    background: `Gangguan panik adalah kondisi kecemasan yang memengaruhi kualitas hidup dan sering sulit didiagnosis secara dini. Untuk membantu proses deteksi awal, pendekatan machine learning digunakan untuk menganalisis hubungan antara gaya hidup (seperti kualitas tidur dan olahraga) dengan risiko gangguan panik.

Proyek ini bertujuan untuk:
- Menganalisis apakah kualitas tidur dan kebiasaan olahraga berpengaruh terhadap risiko gangguan panik.
- Membangun model klasifikasi berbasis Decision Tree untuk memprediksi potensi gangguan panik berdasarkan data gaya hidup dan riwayat kesehatan peserta.
- Memberikan insight berbasis data yang dapat digunakan sebagai rekomendasi gaya hidup sehat dalam konteks kesehatan mental.`,
    insights: [
      'Olahraga teratur → 100% peserta tidak mengalami gangguan panik.',
      'Kualitas tidur buruk, jika disertai stres dan gejala seperti sesak napas → meningkatkan risiko.',
      'Stres tinggi → faktor signifikan dalam meningkatkan kemungkinan gangguan panik.',
      'Fitur paling berpengaruh: Lifestyle Factors, Symptoms, Psychiatric History.'
    ],
    evaluation: {
      accuracy: '96.87%',
      precision: '93.75%',
      recall: '100%',
      f1: '95.28%'
    }
  },
  '7': {
    title: 'Prediksi Kelayakan Pinjaman Menggunakan Logistic Regression',
    description: 'Model machine learning untuk mengevaluasi kelayakan kredit menggunakan algoritma Logistic Regression',
    tech: ['Python', 'scikit-learn', 'Pandas', 'NumPy', 'Matplotlib'],
    github: '#',
    live: 'https://colab.research.google.com/drive/1ZEkUL3tB74QLXb9o73E0HiUqvIuDC7Da?usp=sharing',
    background: `Dalam proses kredit, penting bagi lembaga keuangan untuk menilai apakah calon peminjam berisiko gagal bayar. Proyek ini bertujuan membangun model prediktif untuk mempermudah proses seleksi kelayakan pinjaman secara otomatis.`,
    objectives: [
      'Memprediksi apakah pinjaman akan disetujui atau ditolak',
      'Mengidentifikasi faktor-faktor penting yang memengaruhi keputusan pemberian pinjaman'
    ],
    insights: [
      'Model menunjukkan performa yang sangat baik dengan akurasi 89.3%',
      'Fitur yang paling berpengaruh: person_income, loan_int_rate, loan_amnt, dan person_education',
      'Kelompok usia muda dengan pendapatan tinggi memiliki peluang kelayakan lebih besar',
      'Tingkat bunga pinjaman (loan_int_rate) memiliki korelasi negatif dengan kelayakan kredit',
      'Pendidikan formal yang lebih tinggi cenderung meningkatkan nilai kelayakan kredit'
    ],
    evaluation: {
      accuracy: '89.3%',
      precision: '84%',
      recall: '83%',
      f1: '89%'
    }
  },
  '8': {
    title: 'Analisis dan Visualisasi Data Gunung Berapi Dunia Tahun 2021',
    description: 'Visualisasi data gunung berapi berdasarkan tipe, lokasi geografis, dan status aktivitas untuk memberikan gambaran sebaran globalnya',
    tech: ['Python', 'Pandas', 'Plotly', 'Matplotlib', 'Geopandas'],
    github: '',
    live: 'https://colab.research.google.com/drive/1c3VLB_vNfrv2SWdnShqBrdjCICIcalMp?usp=sharing',
    background: `Gunung berapi merupakan fenomena alam yang signifikan dan memiliki dampak besar terhadap lingkungan dan masyarakat di sekitarnya. Memantau aktivitas gunung berapi adalah hal penting untuk keamanan dan mitigasi risiko bencana. Namun, data tentang gunung berapi dari berbagai sumber dapat tersebar dan sulit diakses. Oleh karena itu, proyek ini bertujuan untuk mengumpulkan dan menyajikan data terkini seputar gunung berapi di seluruh dunia.`,
    objectives: [
      'Membuat peta interaktif menggunakan pustaka seperti Folium untuk menampilkan lokasi gunung berapi secara global',
      'Menganalisis data untuk mengidentifikasi tren atau pola aktivitas gunung berapi',
      'Memberikan informasi yang berharga kepada pihak berkepentingan, peneliti, dan masyarakat umum mengenai status gunung berapi'
    ]
  }
};

// Churn Prediction Demo Component
const ChurnPredictionDemo = () => {
  const [formData, setFormData] = useState({
    tenure: 12,
    monthlyCharges: 65.5,
    totalCharges: 786,
    contract: 'Month-to-month',
    paymentMethod: 'Electronic check',
    onlineSecurity: 'No',
    techSupport: 'No',
    internetService: 'Fiber optic',
    seniorCitizen: 'No',
    partner: 'No',
    dependents: 'No'
  });
  
  const [result, setResult] = useState<{
    churnRisk: 'low' | 'medium' | 'high';
    probability: number;
    explanation: string;
    recommendations: string[];
  } | null>(null);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? parseFloat(value) : value
    }));
  };
  
  const handleRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: parseFloat(value)
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate prediction logic (in a real app, this would be an API call)
    const score = calculateChurnRisk(formData);
    
    // Set result based on score
    if (score >= 0.7) {
      setResult({
        churnRisk: 'high',
        probability: Math.round(score * 100),
        explanation: 'Pelanggan memiliki risiko tinggi untuk berhenti berlangganan dalam waktu dekat. Segera lakukan tindakan retensi.',
        recommendations: [
          'Tawarkan diskon khusus atau paket promosi',
          'Hubungi pelanggan untuk menawarkan bantuan teknis',
          'Sosialisasikan fitur-fitur baru yang mungkin belum diketahui pelanggan',
          'Tawarkan upgrade layanan dengan harga khusus'
        ]
      });
    } else if (score >= 0.4) {
      setResult({
        churnRisk: 'medium',
        probability: Math.round(score * 100),
        explanation: 'Pelanggan menunjukkan beberapa tanda-tanda ketidakpuasan. Pertimbangkan untuk menawarkan insentif untuk mempertahankan mereka.',
        recommendations: [
          'Kirimkan survei kepuasan pelanggan',
          'Tawarkan paket tambahan yang relevan',
          'Ingatkan tentang manfaat layanan yang mungkin belum dimanfaatkan',
          'Berikan akses ke konten eksklusif atau fitur premium'
        ]
      });
    } else {
      setResult({
        churnRisk: 'low',
        probability: Math.round(score * 100),
        explanation: 'Pelanggan memiliki kepuasan yang baik dan risiko churn yang rendah. Terus berikan pelayanan terbaik.',
        recommendations: [
          'Ucapkan terima kasih atas kesetiaan pelanggan',
          'Tawarkan program referensi untuk mendapatkan hadiah',
          'Berikan akses awal ke fitur baru',
          'Tetap pantau pola penggunaan layanan'
        ]
      });
    }
  };
  
  // Simple heuristic to calculate churn risk (simplified for demo)
  const calculateChurnRisk = (data: any) => {
    let score = 0;
    
    // Higher monthly charges increase churn risk
    score += Math.min(data.monthlyCharges / 200, 0.3);
    
    // Shorter tenure increases churn risk
    score += (1 - Math.min(data.tenure / 60, 1)) * 0.3;
    
    // Contract type impact
    if (data.contract === 'Month-to-month') score += 0.2;
    else if (data.contract === 'One year') score += 0.1;
    
    // Service impact
    if (data.onlineSecurity === 'No') score += 0.1;
    if (data.techSupport === 'No') score += 0.1;
    if (data.internetService === 'Fiber optic') score += 0.1;
    
    // Demographics
    if (data.seniorCitizen === 'Yes') score += 0.1;
    if (data.partner === 'No') score += 0.05;
    if (data.dependents === 'No') score += 0.05;
    
    // Payment method
    if (data.paymentMethod === 'Electronic check') score += 0.1;
    
    return Math.min(Math.max(score, 0.1), 0.95); // Keep between 10% and 95%
  };
  
  return (
    <>
      <DemoForm onSubmit={handleSubmit}>
        <FormRow>
          <FormGroup>
            <label htmlFor="tenure">Masa Langganan (bulan)</label>
            <RangeContainer>
              <input
                type="range"
                id="tenure"
                name="tenure"
                min="1"
                max="72"
                value={formData.tenure}
                onChange={handleRangeChange}
              />
              <RangeValue>{formData.tenure} bln</RangeValue>
            </RangeContainer>
          </FormGroup>
          
          <FormGroup>
            <label htmlFor="monthlyCharges">Biaya Bulanan (USD)</label>
            <input
              type="number"
              id="monthlyCharges"
              name="monthlyCharges"
              min="0"
              step="0.01"
              value={formData.monthlyCharges}
              onChange={handleChange}
            />
          </FormGroup>
          
          <FormGroup>
            <label htmlFor="contract">Jenis Kontrak</label>
            <select
              id="contract"
              name="contract"
              value={formData.contract}
              onChange={handleChange}
            >
              <option value="Month-to-month">Bulanan</option>
              <option value="One year">1 Tahun</option>
              <option value="Two year">2 Tahun</option>
            </select>
          </FormGroup>
        </FormRow>
        
        <FormRow>
          <FormGroup>
            <label htmlFor="internetService">Layanan Internet</label>
            <select
              id="internetService"
              name="internetService"
              value={formData.internetService}
              onChange={handleChange}
            >
              <option value="Fiber optic">Fiber Optik</option>
              <option value="DSL">DSL</option>
              <option value="No">Tidak Ada</option>
            </select>
          </FormGroup>
          
          <FormGroup>
            <label htmlFor="onlineSecurity">Keamanan Online</label>
            <select
              id="onlineSecurity"
              name="onlineSecurity"
              value={formData.onlineSecurity}
              onChange={handleChange}
            >
              <option value="No">Tidak</option>
              <option value="Yes">Ya</option>
              <option value="No internet service">Tidak Ada Layanan Internet</option>
            </select>
          </FormGroup>
          
          <FormGroup>
            <label htmlFor="techSupport">Dukungan Teknis</label>
            <select
              id="techSupport"
              name="techSupport"
              value={formData.techSupport}
              onChange={handleChange}
            >
              <option value="No">Tidak</option>
              <option value="Yes">Ya</option>
              <option value="No internet service">Tidak Ada Layanan Internet</option>
            </select>
          </FormGroup>
        </FormRow>
        
        <FormRow>
          <FormGroup>
            <label htmlFor="paymentMethod">Metode Pembayaran</label>
            <select
              id="paymentMethod"
              name="paymentMethod"
              value={formData.paymentMethod}
              onChange={handleChange}
            >
              <option value="Electronic check">Cek Elektronik</option>
              <option value="Mailed check">Cek via Pos</option>
              <option value="Bank transfer">Transfer Bank</option>
              <option value="Credit card">Kartu Kredit</option>
            </select>
          </FormGroup>
          
          <FormGroup>
            <label htmlFor="seniorCitizen">Warga Senior (65+)</label>
            <select
              id="seniorCitizen"
              name="seniorCitizen"
              value={formData.seniorCitizen}
              onChange={handleChange}
            >
              <option value="No">Tidak</option>
              <option value="Yes">Ya</option>
            </select>
          </FormGroup>
          
          <FormGroup>
            <label htmlFor="partner">Memiliki Pasangan</label>
            <select
              id="partner"
              name="partner"
              value={formData.partner}
              onChange={handleChange}
            >
              <option value="No">Tidak</option>
              <option value="Yes">Ya</option>
            </select>
          </FormGroup>
        </FormRow>
        
        <SubmitButton type="submit">
          <FaChartLine /> Prediksi Risiko Churn
        </SubmitButton>
      </DemoForm>
      
      {result && (
        <ResultContainer $risk={result.churnRisk}>
          <h4>Hasil Prediksi</h4>
          <PredictionText $risk={result.churnRisk}>
            Risiko Churn: {result.probability}% - {result.churnRisk === 'high' ? 'Tinggi' : result.churnRisk === 'medium' ? 'Sedang' : 'Rendah'}
          </PredictionText>
          
          <p>{result.explanation}</p>
          
          <h4>Rekomendasi Tindakan:</h4>
          <ul style={{ margin: '0.5rem 0 0 1.5rem', lineHeight: '1.8' }}>
            {result.recommendations.map((rec, idx) => (
              <li key={idx}>{rec}</li>
            ))}
          </ul>
        </ResultContainer>
      )}
    </>
  );
};

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = projectsData[id as keyof typeof projectsData];

  if (!project) {
    return <div>Project not found</div>;
  }

  return (
    <DetailContainer>
      <BackButton onClick={() => navigate(-1)}>
        <FaArrowLeft /> Kembali ke Portfolio
      </BackButton>
      
      <ProjectTitle>{project.title}</ProjectTitle>
      
      <Section>
        <h2>Deskripsi</h2>
        <p>{project.description}</p>
      </Section>
      
      <Section>
        <h2>Latar Belakang</h2>
        <p style={{ whiteSpace: 'pre-line', lineHeight: '1.8' }}>{project.background}</p>
      </Section>

      {project.objectives && project.objectives.length > 0 && (
        <Section>
          <h2>Tujuan</h2>
          <ul style={{ marginTop: '0.5rem', paddingLeft: '1.5rem' }}>
            {project.objectives.map((objective, index) => (
              <li key={index} style={{ marginBottom: '0.5rem', lineHeight: '1.6' }}>{objective}</li>
            ))}
          </ul>
        </Section>
      )}
      
      {project.insights && project.insights.length > 0 && (
        <Section>
          <h2>Insight Utama</h2>
          <ul style={{ marginBottom: '1.5rem' }}>
            {project.insights.map((insight, index) => (
              <li key={index} style={{ marginBottom: '0.8rem', lineHeight: '1.6' }}>• {insight}</li>
            ))}
          </ul>
        </Section>
      )}
      
      {project.evaluation && (
        <Section>
          <h2>Evaluasi Model</h2>
          <div style={{ overflowX: 'auto', marginTop: '1rem' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem' }}>
              <thead>
                <tr style={{ backgroundColor: 'rgba(110, 69, 226, 0.2)' }}>
                  <th style={{ padding: '0.75rem', textAlign: 'left', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>Metrik</th>
                  <th style={{ padding: '0.75rem', textAlign: 'left', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>Nilai</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ padding: '0.75rem', borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>Akurasi</td>
                  <td style={{ padding: '0.75rem', borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>{project.evaluation.accuracy}</td>
                </tr>
                <tr>
                  <td style={{ padding: '0.75rem', borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>Precision</td>
                  <td style={{ padding: '0.75rem', borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>{project.evaluation.precision}</td>
                </tr>
                <tr>
                  <td style={{ padding: '0.75rem', borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>Recall</td>
                  <td style={{ padding: '0.75rem', borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>{project.evaluation.recall}</td>
                </tr>
                <tr>
                  <td style={{ padding: '0.75rem' }}>F1-Score</td>
                  <td style={{ padding: '0.75rem' }}>{project.evaluation.f1}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Section>
      )}
      
      <Section>
        <h2>Teknologi</h2>
        <TechList>
          {project.tech.map((tech, index) => (
            <TechItem key={index}>{tech}</TechItem>
          ))}
        </TechList>
      </Section>

      {project.demo && (
        <Section>
          <h2>Demo Interaktif</h2>
          <DemoContainer>
            <h3>{project.demo.title}</h3>
            <p>{project.demo.description}</p>
            
            {id === '8' && (
              <ChurnPredictionDemo />
            )}
            
            <Disclaimer>
              <FaInfoCircle style={{ marginRight: '0.5rem' }} />
              Demo ini menggunakan data simulasi dan prediksi dari model machine learning. Hasil yang ditampilkan adalah prediksi dan bukan diagnosis atau saran profesional.
            </Disclaimer>
          </DemoContainer>
        </Section>
      )}
      
      <ButtonGroup>
        {project.github && project.github !== '#' && (
          <ActionButton href={project.github} target="_blank" rel="noopener noreferrer">
            <FaGithub /> Kode Sumber
          </ActionButton>
        )}
        {project.live && project.live !== '#' && (
          <ActionButton href={project.live} target="_blank" rel="noopener noreferrer">
            <FaExternalLinkAlt /> Lihat Proyek
          </ActionButton>
        )}
      </ButtonGroup>
    </DetailContainer>
  );
};

export default ProjectDetail;
