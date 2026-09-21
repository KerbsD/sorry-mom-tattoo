export const HeaderItems = [
  {
    title: "Home",
    link: "/",
  },
  {
    title: "Design",
    link: "/design",
  },
  {
    title: "Portfolio",
    link: "/portfolio",
  },
  {
    title: "Merch",
    link: "/merch",
  },
  {
    title: "Aftercare",
    link: "/aftercare",
  },
  {
    title: "Contact",
    link: "/contact",
  },
];

export const CartLinks = HeaderItems.filter((item) =>
  ["/design", "/merch"].includes(item.link),
);