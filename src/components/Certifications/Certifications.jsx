import React, { useEffect, useState } from 'react';
import { 
  FaCertificate, 
  FaTrophy, 
  FaMedal, 
  FaAward,
  FaUserGraduate,
  FaGlobeAmericas
} from 'react-icons/fa';
import './Certifications.scss';

const Certifications = () => {
  const [windowWidth, setWindowWidth] = useState(0);
  
  const certifications = [
  {
    id: 1,
    icon: <FaCertificate />,
    issuer: 'NASM – National Academy of Sports Medicine (USA)',
    color: '#E91E63'
  },
  {
    id: 2,
    icon: <FaTrophy />,
    issuer: 'ISSA – International Sports Sciences Association',
    color: '#E91E63'
  },
  {
    id: 3,
    icon: <FaMedal />,
    issuer: 'ACE – American Council on Exercise',
    color: '#E91E63'
  },
  {
    id: 4,
    icon: <FaAward />,
    issuer: 'NSCA – National Strength & Conditioning Association',
    color: '#E91E63'
  },
  {
    id: 5,
    icon: <FaUserGraduate />,
    issuer: 'CrossFit Level 1 Trainer (International)',
    color: '#E91E63'
  },
  {
    id: 6,
    icon: <FaGlobeAmericas />,
    issuer: 'Yoga Alliance – RYT Certified',
    color: '#E91E63'
  }
];

  // حساب عدد النسخ المطلوبة بناءً على عرض الشاشة
  const calculateCopies = () => {
    if (typeof window === 'undefined') return 4; // قيمة افتراضية
    
    const cardWidth = window.innerWidth <= 768 ? 240 : 280;
    const gap = window.innerWidth <= 768 ? 1.5 : 2;
    const totalCardWidth = cardWidth + (gap * 16); // تحويل rem إلى px (1rem = 16px)
    
    const cardsPerScreen = Math.ceil(window.innerWidth / totalCardWidth);
    const copiesNeeded = Math.ceil(cardsPerScreen / certifications.length) + 3;
    
    return Math.max(copiesNeeded, 4); // الحد الأدنى 4 نسخ
  };

  const [copies, setCopies] = useState(calculateCopies());

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      setCopies(calculateCopies());
    };

    handleResize(); // استدعاء فوري للتهيئة
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // إنشاء مصفوفة مكررة للتغطية الكاملة
  const createInfiniteItems = () => {
    let infiniteItems = [];
    for (let i = 0; i < copies; i++) {
      infiniteItems = [...infiniteItems, ...certifications];
    }
    return infiniteItems;
  };

  const infiniteItems = createInfiniteItems();

  const handleCardClick = (issuer) => {
    console.log(`تم النقر على شهادة: ${issuer}`);
    // يمكنك إضافة سلوك إضافي هنا، مثل فتح نافذة منبثقة
  };

  return (
    <section className="certifications" aria-label="الشهادات المعتمدة">
      <div className="certifications-slider">
        <div 
          className="slider-track" 
          role="marquee"
          aria-live="polite"
        >
          {infiniteItems.map((cert, index) => (
            <div 
              key={`cert-${cert.id}-${index}`} 
              className="cert-card"
              onClick={() => handleCardClick(cert.issuer)}
              role="button"
              tabIndex={0}
              onKeyPress={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  handleCardClick(cert.issuer);
                }
              }}
              aria-label={`شهادة معتمدة من ${cert.issuer}`}
            >
              <div 
                className="cert-icon"
                style={{
                  background: `linear-gradient(135deg, ${cert.color}, ${cert.color}99)`
                }}
              >
                {cert.icon}
              </div>
              <div className="cert-info">
                <p className="cert-label">موثوق من قبل</p>
                <h4>{cert.issuer}</h4>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;