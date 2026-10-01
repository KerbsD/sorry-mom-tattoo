import type { Design } from "@/types/design";

const DESIGN: Design[] = [
  {
    id: "1",
    title: "Clear Vision",
    description:
      "The ability to see people, objects, locations, or events in the past, present or future.",
    style: "Minimalist",
    placement: "Forearm / Chest",
    image: "/design/dfs-1.png",
    category: "Minimalist",
    price: 0,
  },
  {
    id: "2",
    title: "Sands of Time",
    description:
      "A symbol of death, the end of time on Earth, but also a symbol of rebirth and new beginnings when turned over.",
    style: "Black & Grey Illustrative",
    placement: "Forearm / Calf",
    image: "/design/dfs-3.png",
    category: "Black & Grey",
    price: 0,
  },
  {
    id: "3",
    title: "Change Your Mind",
    description: "Change how you feel by changing the way you think.",
    style: "Minimalist",
    placement: "Forearm / Spine",
    image: "/design/dfs-4.png",
    category: "Minimalist",
    price: 0,
  },
  {
    id: "4",
    title: "Faith Over Fear",
    description:
      "Trusting in God's plan and facing our fears but not allowing them to control or consume us.",
    style: "Illustrative",
    placement: "Arm / Shoulder",
    image: "/design/dfs-2.png",
    category: "Illustrative",
    price: 0,
  },
];

const DESIGN_CATEGORIES = [
  "All Designs",
  ...new Set(DESIGN.map((d) => d.category)),
];

export { DESIGN, DESIGN_CATEGORIES };
