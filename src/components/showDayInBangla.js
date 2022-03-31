export const showDayInBangla = (data) => {
  const weekday = ["রবিবার", "সোমবার", "মঙ্গলবার", "বুধবার", "বৃহস্পতিবার", "শুক্রবার", "শনিবার"];

  return weekday[new Date(data).getDay()];


}