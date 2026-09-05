export interface PortfolioImage {
  src: string;
  title: string;
  style: string;
  description?: string;
  artist?: string;
  duration?: string;
  date?: string;
}

export const PortfolioImages: PortfolioImage[] = [
  {
    src: "/portfolio/TP1.jpg",
    title: "Houdini",
    style: "black_grey",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer semper neque in odio hendrerit posuere. Quisque eget enim sit amet odio accumsan luctus sit amet eget dui. Praesent porta metus eget turpis convallis tincidunt.",
    artist: "Sorry Mom",
    duration: "3 hours",
    date: "September 5, 2026",
  },
  {
    src: "/portfolio/TP2.jpg",
    title: "Lorem Ipsum",
    style: "fonts-text",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer semper neque in odio hendrerit posuere. Quisque eget enim sit amet odio accumsan luctus sit amet eget dui. Praesent porta metus eget turpis convallis tincidunt. Praesent blandit ipsum vitae justo dictum posuere. Phasellus faucibus leo",
    artist: "Sorry Mom",
    duration: "3 hours",
    date: "September 5, 2026",
  },
  {
    src: "/portfolio/TP3.jpg",
    title: "Clown",
    style: "minimalist",
    description:
      "sit amet odio accumsan luctus sit amet eget dui. Praesent porta metus eget turpis convallis tincidunt. Praesent blandit ipsum vitae justo dictum posuere. Phasellus faucibus leo quis volutpat porttitor. Vivamus tempor tincidunt ipsum, eget pretium lectus ultricies quis. Donec tempor sem vel quam egestas, nec hendrerit neque viverra.",
    artist: "Sorry Mom",
    duration: "3 hours",
    date: "September 5, 2026",
  },
  {
    src: "/portfolio/TP4.jpg",
    title: "Shattered",
    style: "illustrative",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. .",
    artist: "Sorry Mom",
    duration: "3 hours",
    date: "September 5, 2026",
  },
  {
    src: "/portfolio/TP5.jpg",
    title: "Lorem Ipsum",
    style: "realism",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer semper neque in odio hendrerit posuere. Quisque eget enim sit amet odio accumsan luctus sit amet eget dui. Praesent porta metus eget turpis convallis tincidunt. Praesent blandit ipsum vitae justo dictum posuere. Phasellus faucibus leo quis volutpat porttitor. Vivamus tempor tincidunt ipsum",
    artist: "Sorry Mom",
    duration: "3 hours",
    date: "September 5, 2026",
  },
];
