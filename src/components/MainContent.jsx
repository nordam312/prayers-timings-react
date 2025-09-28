import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import PrayerCard from "./PrayerCards";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { fetchPrayerTimes } from "../services/prayerApi";

export default function MainContent() {
  const [selectedCity, setSelectedCity] = useState("Makkah");
  const [prayerTimes, setPrayerTimes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [nextPrayer, setNextPrayer] = useState({ name: "العصر", timeRemaining: "00:00:00" });
  const [currentTime, setCurrentTime] = useState(new Date());

  const cities = [
    { name: "Makkah", arabicName: "مكة المكرمة" },
    { name: "Madinah", arabicName: "المدينة المنورة" },
    { name: "Riyadh", arabicName: "الرياض" },
    { name: "Jeddah", arabicName: "جدة" },
    { name: "Dammam", arabicName: "الدمام" }
  ];

  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
  };

  useEffect(() => {
    async function loadPrayerTimes() {
      setLoading(true);
      const times = await fetchPrayerTimes(selectedCity);
      setPrayerTimes(times);
      setLoading(false);
    }
    loadPrayerTimes();
  }, [selectedCity]);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(now);
      const currentTimeMinutes = now.getHours() * 60 + now.getMinutes();

      let nextPrayerFound = false;

      // البحث عن الصلاة القادمة في نفس اليوم
      for (let i = 0; i < prayerTimes.length; i++) {
        const timeParts = prayerTimes[i].time.split(':');
        if (timeParts.length < 2) continue;
        const [hours, minutes] = timeParts.map(Number);
        const prayerTimeInMinutes = hours * 60 + minutes;

        if (prayerTimeInMinutes > currentTimeMinutes) {
          const diff = prayerTimeInMinutes - currentTimeMinutes;
          const hoursRemaining = Math.floor(diff / 60);
          const minutesRemaining = diff % 60;
          const secondsRemaining = 59 - now.getSeconds();

          setNextPrayer({
            name: prayerTimes[i].name,
            timeRemaining: `${String(hoursRemaining).padStart(2, '0')}:${String(minutesRemaining).padStart(2, '0')}:${String(secondsRemaining).padStart(2, '0')}`
          });
          nextPrayerFound = true;
          break;
        }
      }

      // إذا لم نجد صلاة قادمة اليوم، فالصلاة القادمة هي الفجر غداً
      if (!nextPrayerFound && prayerTimes.length > 0) {
        const timeParts = prayerTimes[0].time.split(':');
        if (timeParts.length >= 2) {
          const [hours, minutes] = timeParts.map(Number);
          const fajrTimeInMinutes = hours * 60 + minutes;

          // حساب الوقت المتبقي حتى الفجر (في اليوم التالي)
          const minutesUntilMidnight = (24 * 60) - currentTimeMinutes;
          const diff = minutesUntilMidnight + fajrTimeInMinutes;

          const hoursRemaining = Math.floor(diff / 60);
          const minutesRemaining = diff % 60;
          const secondsRemaining = 59 - now.getSeconds();

          setNextPrayer({
            name: prayerTimes[0].name,
            timeRemaining: `${String(hoursRemaining).padStart(2, '0')}:${String(minutesRemaining).padStart(2, '0')}:${String(secondsRemaining).padStart(2, '0')}`
          });
        }
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [prayerTimes]);

  return (
    <Box sx={{
      minHeight: '100vh',
      padding: { xs: '1rem', sm: '2rem', md: '3rem' },
      maxWidth: '1400px',
      margin: '0 auto'
    }}>
      {/* Header Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, rgba(139, 69, 19, 0.2) 0%, rgba(160, 82, 45, 0.1) 100%)',
          backdropFilter: 'blur(10px)',
          borderRadius: { xs: '15px', md: '25px' },
          padding: { xs: '20px', md: '40px' },
          marginBottom: '30px',
          border: '1px solid rgba(139, 69, 19, 0.3)',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Decorative Pattern */}
        <Box sx={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '200px',
          height: '200px',
          background: 'radial-gradient(circle, rgba(139, 69, 19, 0.1) 0%, transparent 70%)',
          borderRadius: '50%',
          transform: 'translate(50%, -50%)'
        }} />

        <Grid container spacing={3}>
          {/* City Selection - Mobile Optimized */}
          <Grid item xs={12} md={4}>
            <Box sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              alignItems: { xs: 'center', md: 'flex-start' }
            }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <LocationOnIcon sx={{ color: '#D2691E', fontSize: 24 }} />
                <Typography variant="h6" sx={{ color: '#D2691E', fontWeight: 600 }}>
                  المدينة
                </Typography>
              </Box>
              <FormControl
                fullWidth
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: 'rgba(0, 0, 0, 0.3)',
                    borderRadius: '10px',
                    '& fieldset': {
                      borderColor: 'rgba(210, 105, 30, 0.3)',
                    },
                    '&:hover fieldset': {
                      borderColor: 'rgba(210, 105, 30, 0.5)',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#D2691E',
                    },
                  },
                }}
              >
                <Select
                  value={selectedCity}
                  onChange={handleCityChange}
                  sx={{
                    color: '#fff',
                    fontSize: { xs: '1rem', md: '1.1rem' },
                    '& .MuiSvgIcon-root': { color: '#D2691E' }
                  }}
                >
                  {cities.map(city => (
                    <MenuItem
                      key={city.name}
                      value={city.name}
                      sx={{ fontSize: { xs: '0.9rem', md: '1rem' } }}
                    >
                      {city.arabicName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Grid>

          {/* Date & Time - Mobile Optimized */}
          <Grid item xs={12} md={4}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography
                variant="h3"
                sx={{
                  color: '#fff',
                  fontWeight: 700,
                  fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                  marginBottom: 1,
                  fontFamily: 'Cairo, sans-serif'
                }}
              >
                {currentTime.toLocaleTimeString('ar-SA', {
                  hour: '2-digit',
                  minute: '2-digit',
                  hour12: true
                })}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                <CalendarMonthIcon sx={{ color: '#D2691E', fontSize: 20 }} />
                <Typography
                  variant="body1"
                  sx={{
                    color: 'rgba(255, 255, 255, 0.8)',
                    fontSize: { xs: '0.9rem', md: '1rem' }
                  }}
                >
                  {currentTime.toLocaleDateString('ar-SA', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </Typography>
              </Box>
            </Box>
          </Grid>

          {/* Next Prayer - Mobile Optimized */}
          <Grid item xs={12} md={4}>
            <Box sx={{
              textAlign: { xs: 'center', md: 'right' },
              background: 'rgba(210, 105, 30, 0.1)',
              padding: '15px',
              borderRadius: '15px',
              border: '1px solid rgba(210, 105, 30, 0.2)'
            }}>
              <Typography
                variant="body2"
                sx={{
                  color: 'rgba(255, 255, 255, 0.7)',
                  marginBottom: 1,
                  fontSize: { xs: '0.85rem', md: '0.9rem' }
                }}
              >
                الصلاة القادمة: {nextPrayer.name}
              </Typography>
              <Typography
                variant="h4"
                sx={{
                  color: '#FFD700',
                  fontWeight: 'bold',
                  fontSize: { xs: '1.8rem', md: '2.2rem' },
                  fontFamily: 'monospace',
                  textShadow: '0 0 10px rgba(255, 215, 0, 0.3)'
                }}
              >
                {nextPrayer.timeRemaining}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>

      {/* Prayer Cards - Mobile Optimized Grid */}
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", padding: "50px" }}>
          <CircularProgress sx={{ color: "#D2691E" }} />
        </Box>
      ) : (
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(3, 1fr)',
              lg: 'repeat(5, 1fr)'
            },
            gap: { xs: 2, md: 3 },
            marginTop: 4
          }}
        >
          {prayerTimes.map((prayer, index) => (
            <PrayerCard
              key={index}
              name={prayer.name}
              time={prayer.time}
              index={index}
            />
          ))}
        </Box>
      )}
    </Box>
  );
}