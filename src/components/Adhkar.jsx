import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import FavoriteIcon from '@mui/icons-material/Favorite';

const adhkarList = [
  {
    text: "سُبْحَانَ اللَّهِ وَبِحَمْدِهِ",
    translation: "Glory be to Allah and praise Him",
    reward: "من قالها مائة مرة حُطت خطاياه وإن كانت مثل زبد البحر"
  },
  {
    text: "لَا إِلَٰهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ",
    translation: "There is no god but Allah alone, with no partner",
    reward: "من قالها عشر مرات كان كمن أعتق أربعة أنفس من ولد إسماعيل"
  },
  {
    text: "سُبْحَانَ اللَّهِ وَالْحَمْدُ لِلَّهِ وَلَا إِلَٰهَ إِلَّا اللَّهُ وَاللَّهُ أَكْبَرُ",
    translation: "Glory be to Allah, praise be to Allah, there is no god but Allah, Allah is the Greatest",
    reward: "أحب الكلام إلى الله"
  },
  {
    text: "لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ",
    translation: "There is no power and no strength except with Allah",
    reward: "كنز من كنوز الجنة"
  },
  {
    text: "أَسْتَغْفِرُ اللَّهَ الْعَظِيمَ الَّذِي لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ وَأَتُوبُ إِلَيْهِ",
    translation: "I seek forgiveness from Allah, the Mighty, besides whom there is no god, the Living, the Sustainer, and I repent to Him",
    reward: "غُفرت ذنوبه وإن كان فاراً من الزحف"
  },
  {
    text: "اللَّهُمَّ صَلِّ وَسَلِّمْ عَلَى نَبِيِّنَا مُحَمَّدٍ",
    translation: "O Allah, send blessings and peace upon our Prophet Muhammad",
    reward: "من صلى عليّ صلاة واحدة صلى الله عليه بها عشراً"
  },
  {
    text: "رَضِيتُ بِاللَّهِ رَبًّا وَبِالْإِسْلَامِ دِينًا وَبِمُحَمَّدٍ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ نَبِيًّا",
    translation: "I am pleased with Allah as Lord, Islam as religion, and Muhammad (PBUH) as Prophet",
    reward: "وجبت له الجنة"
  },
  {
    text: "بِسْمِ اللَّهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ",
    translation: "In the name of Allah with whose name nothing on earth or in heaven can cause harm, and He is the All-Hearing, All-Knowing",
    reward: "من قالها ثلاث مرات لم يضره شيء"
  }
];

export default function Adhkar() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % adhkarList.length);
        setIsAnimating(false);
      }, 500);
    }, 10000); // تغيير الذكر كل 10 ثواني

    return () => clearInterval(interval);
  }, []);

  const currentDhikr = adhkarList[currentIndex];

  return (
    <Box
      sx={{
        marginTop: 5,
        marginBottom: 3,
        padding: { xs: '1rem', md: '2rem' }
      }}
    >
      {/* العنوان */}
      <Box sx={{ textAlign: 'center', marginBottom: 4 }}>
        <Typography
          variant="h4"
          sx={{
            color: '#D2691E',
            fontWeight: 700,
            fontSize: { xs: '1.8rem', md: '2.5rem' },
            fontFamily: 'Cairo, sans-serif',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 2
          }}
        >
          <AutoAwesomeIcon sx={{ fontSize: { xs: 30, md: 40 } }} />
          أذكار وتسبيحات
          <AutoAwesomeIcon sx={{ fontSize: { xs: 30, md: 40 } }} />
        </Typography>
      </Box>

      {/* بطاقة الذكر */}
      <Card
        sx={{
          background: 'linear-gradient(135deg, rgba(139, 69, 19, 0.15) 0%, rgba(210, 105, 30, 0.1) 100%)',
          backdropFilter: 'blur(10px)',
          border: '2px solid rgba(210, 105, 30, 0.3)',
          borderRadius: '20px',
          maxWidth: '900px',
          margin: '0 auto',
          position: 'relative',
          overflow: 'hidden',
          opacity: isAnimating ? 0 : 1,
          transform: isAnimating ? 'scale(0.95)' : 'scale(1)',
          transition: 'all 0.5s ease-in-out',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '3px',
            background: 'linear-gradient(90deg, #8B4513 0%, #D2691E 50%, #8B4513 100%)',
            animation: 'shimmer 3s infinite'
          },
          '@keyframes shimmer': {
            '0%': { transform: 'translateX(-100%)' },
            '100%': { transform: 'translateX(100%)' }
          }
        }}
      >
        <CardContent sx={{ padding: { xs: '30px 20px', md: '40px 30px' } }}>
          {/* نص الذكر بالعربية */}
          <Typography
            variant="h4"
            sx={{
              color: '#FFD700',
              textAlign: 'center',
              fontWeight: 700,
              fontSize: { xs: '1.8rem', md: '2.8rem' },
              fontFamily: 'Cairo, sans-serif',
              marginBottom: 3,
              lineHeight: 1.8,
              textShadow: '0 0 20px rgba(255, 215, 0, 0.3)'
            }}
          >
            {currentDhikr.text}
          </Typography>

          {/* الترجمة */}
          <Typography
            variant="body1"
            sx={{
              color: 'rgba(255, 255, 255, 0.8)',
              textAlign: 'center',
              fontSize: { xs: '0.9rem', md: '1.1rem' },
              marginBottom: 3,
              fontStyle: 'italic'
            }}
          >
            {currentDhikr.translation}
          </Typography>

          {/* الفضل والثواب */}
          <Box
            sx={{
              background: 'rgba(0, 0, 0, 0.3)',
              borderRadius: '15px',
              padding: { xs: '15px', md: '20px' },
              marginTop: 3,
              border: '1px solid rgba(255, 215, 0, 0.2)'
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, marginBottom: 1 }}>
              <FavoriteIcon sx={{ color: '#D2691E', fontSize: 20 }} />
              <Typography
                variant="subtitle1"
                sx={{
                  color: '#D2691E',
                  fontWeight: 600,
                  fontSize: { xs: '1rem', md: '1.2rem' }
                }}
              >
                الفضل والثواب
              </Typography>
            </Box>
            <Typography
              variant="body2"
              sx={{
                color: 'rgba(255, 255, 255, 0.9)',
                textAlign: 'center',
                fontSize: { xs: '0.85rem', md: '1rem' },
                lineHeight: 1.6
              }}
            >
              {currentDhikr.reward}
            </Typography>
          </Box>
        </CardContent>
      </Card>

      {/* مؤشر الأذكار */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          gap: 1,
          marginTop: 3
        }}
      >
        {adhkarList.map((_, index) => (
          <Box
            key={index}
            sx={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              background: index === currentIndex ? '#FFD700' : 'rgba(210, 105, 30, 0.3)',
              transition: 'all 0.3s ease',
              cursor: 'pointer',
              '&:hover': {
                transform: 'scale(1.5)'
              }
            }}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </Box>
    </Box>
  );
}