import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import WbTwilightIcon from '@mui/icons-material/WbTwilight';
import Brightness3Icon from '@mui/icons-material/Brightness3';
import Brightness5Icon from '@mui/icons-material/Brightness5';
import NightlightIcon from '@mui/icons-material/Nightlight';

const prayerIcons = {
  0: <WbTwilightIcon sx={{ fontSize: 40 }} />, // Fajr
  1: <WbSunnyIcon sx={{ fontSize: 40 }} />, // Dhuhr
  2: <WbTwilightIcon sx={{ fontSize: 40, transform: 'rotate(180deg)' }} />, // Asr - مقلوبة للدلالة على فترة بعد الظهر
  3: <WbTwilightIcon sx={{ fontSize: 40 }} />, // Maghrib
  4: <NightlightIcon sx={{ fontSize: 40 }} /> // Isha
};

export default function PrayerCard({ name, time, index }) {
  const icon = prayerIcons[index] || prayerIcons[0];
  const [isActive, setIsActive] = React.useState(false);

  React.useEffect(() => {
    const checkIfActive = () => {
      const now = new Date();
      const currentTimeMinutes = now.getHours() * 60 + now.getMinutes();
      const timeParts = time.split(':');
      if (timeParts.length >= 2) {
        const [hours, minutes] = timeParts.map(Number);
        const prayerTimeMinutes = hours * 60 + minutes;
        const diff = Math.abs(currentTimeMinutes - prayerTimeMinutes);
        setIsActive(diff < 30);
      }
    };

    checkIfActive();
    const interval = setInterval(checkIfActive, 60000);
    return () => clearInterval(interval);
  }, [time]);

  return (
    <Card
      sx={{
        background: isActive
          ? 'linear-gradient(135deg, rgba(210, 105, 30, 0.3) 0%, rgba(139, 69, 19, 0.2) 100%)'
          : 'linear-gradient(135deg, rgba(45, 45, 45, 0.8) 0%, rgba(26, 26, 26, 0.9) 100%)',
        backdropFilter: 'blur(10px)',
        borderRadius: '20px',
        overflow: 'hidden',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        border: isActive ? '2px solid rgba(255, 215, 0, 0.5)' : '1px solid rgba(255, 255, 255, 0.1)',
        position: 'relative',
        cursor: 'pointer',
        height: '100%',
        minHeight: { xs: '180px', md: '200px' },
        '&:hover': {
          transform: 'translateY(-8px) scale(1.02)',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4)',
          border: '1px solid rgba(210, 105, 30, 0.4)'
        },
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '4px',
          background: isActive ? '#FFD700' : 'linear-gradient(90deg, #8B4513 0%, #D2691E 100%)',
          opacity: isActive ? 1 : 0.7
        }
      }}
    >
      <CardContent sx={{
        padding: { xs: '20px', md: '24px' },
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
      }}>
        {/* Icon and Prayer Name */}
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 1
        }}>
          <Box sx={{
            color: isActive ? '#FFD700' : '#D2691E',
            filter: isActive ? 'drop-shadow(0 0 10px rgba(255, 215, 0, 0.5))' : 'none',
            transition: 'all 0.3s ease'
          }}>
            {icon}
          </Box>
          <Typography
            variant="h5"
            sx={{
              color: isActive ? '#FFD700' : '#fff',
              fontWeight: 700,
              fontSize: { xs: '1.2rem', md: '1.4rem' },
              fontFamily: 'Cairo, sans-serif',
              textShadow: isActive ? '0 0 10px rgba(255, 215, 0, 0.3)' : 'none'
            }}
          >
            {name}
          </Typography>
        </Box>

        {/* Prayer Time */}
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 1,
          marginTop: 2,
          padding: '10px',
          background: 'rgba(0, 0, 0, 0.3)',
          borderRadius: '12px',
          border: '1px solid rgba(210, 105, 30, 0.2)'
        }}>
          <AccessTimeIcon sx={{
            color: '#D2691E',
            fontSize: { xs: 18, md: 20 }
          }} />
          <Typography
            variant="h6"
            sx={{
              color: '#fff',
              fontWeight: 600,
              fontSize: { xs: '1.1rem', md: '1.3rem' },
              fontFamily: 'monospace',
              letterSpacing: '2px'
            }}
          >
            {time}
          </Typography>
        </Box>

        {/* Active Indicator */}
        {isActive && (
          <Box sx={{
            position: 'absolute',
            bottom: 10,
            right: 10,
            width: 10,
            height: 10,
            borderRadius: '50%',
            background: '#FFD700',
            animation: 'pulse 2s infinite',
            '@keyframes pulse': {
              '0%': {
                boxShadow: '0 0 0 0 rgba(255, 215, 0, 0.7)',
              },
              '70%': {
                boxShadow: '0 0 0 10px rgba(255, 215, 0, 0)',
              },
              '100%': {
                boxShadow: '0 0 0 0 rgba(255, 215, 0, 0)',
              },
            }
          }} />
        )}
      </CardContent>
    </Card>
  );
}