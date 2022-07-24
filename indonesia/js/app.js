ScrollReveal({
  reset: true,
  distance: "60px",
  duration: 2500,
});

ScrollReveal().reveal(
  ".tagline, .home__text-header, .article__header, .article__text, .article__link, .section__link",
  {
    delay: 300,
  }
);
ScrollReveal().reveal(".article__img", {
  delay: 300,
  origin: "left",
});
