export const cityDate = (timezone) => {
  var b = new Date();
  var utc = b.getTime() + b.getTimezoneOffset() * 60000;
  var cityTime = new Date(utc + timezone * 1000);

  return cityTime;
};

export const autoChangeMode = (hour) => {
  // var hour = cityDate().getHours();
  const bodyClass = document.body.classList;

  if (hour >= 7 && hour <= 18) {
    bodyClass.add("light-mode");
    if (bodyClass.contains("dark-mode")) bodyClass.remove("dark-mode");
  } else {
    bodyClass.add("dark-mode");
    if (bodyClass.contains("light-mode")) bodyClass.remove("light-mode");
  }
};
