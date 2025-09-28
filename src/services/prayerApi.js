const API_BASE_URL = 'https://api.aladhan.com/v1';

const cityCoordinates = {
  Makkah: { lat: 21.4225, lon: 39.8262 },
  Madinah: { lat: 24.4672, lon: 39.6024 },
  Riyadh: { lat: 24.7136, lon: 46.6753 },
  Jeddah: { lat: 21.5169, lon: 39.2192 },
  Dammam: { lat: 26.3927, lon: 49.9777 }
};

export async function fetchPrayerTimes(city = 'Makkah') {
  const coords = cityCoordinates[city] || cityCoordinates.Makkah;
  const today = new Date();
  const dateString = `${today.getDate()}-${today.getMonth() + 1}-${today.getFullYear()}`;

  try {
    const response = await fetch(
      `${API_BASE_URL}/timings/${dateString}?latitude=${coords.lat}&longitude=${coords.lon}&method=4`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch prayer times');
    }

    const data = await response.json();

    if (data.code === 200 && data.data && data.data.timings) {
      const timings = data.data.timings;
      return [
        { name: "الفجر", englishName: "Fajr", time: timings.Fajr },
        { name: "الظهر", englishName: "Dhuhr", time: timings.Dhuhr },
        { name: "العصر", englishName: "Asr", time: timings.Asr },
        { name: "المغرب", englishName: "Maghrib", time: timings.Maghrib },
        { name: "العشاء", englishName: "Isha", time: timings.Isha }
      ];
    }

    throw new Error('Invalid API response');
  } catch (error) {
    console.error('Error fetching prayer times:', error);
    return [
      { name: "الفجر", englishName: "Fajr", time: "05:00" },
      { name: "الظهر", englishName: "Dhuhr", time: "12:30" },
      { name: "العصر", englishName: "Asr", time: "15:45" },
      { name: "المغرب", englishName: "Maghrib", time: "18:15" },
      { name: "العشاء", englishName: "Isha", time: "19:45" }
    ];
  }
}