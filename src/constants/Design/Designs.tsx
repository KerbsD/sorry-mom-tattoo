// constants/Design/Designs.ts
export interface Design {
  id: string;
  title: string;
  description: string;
  style: string;
  placement: string;
  image: string;
  category: string;
}

export const designs: Design[] = [
  {
    id: "1",
    title: "Clear Vision",
    description:
      "The ability to see people, objects, locations, or events in the past, present or future.",
    style: "Minimalist",
    placement: "Forearm / Chest",
    image: "/design/dfs-1.png",
    category: "Minimalist",
  },
  {
    id: "2",
    title: "Sands of Time",
    description:
      "A symbol of death, the end of time on Earth, but also a symbol of rebirth and new beginnings when turned over.",
    style: "Black & Grey Illustrative",
    placement: "Forearm / Calf",
    image: "/design/dfs-2.png",
    category: "Black & Grey",
  },
  {
    id: "3",
    title: "Change Your Mind",
    description: "Change how you feel by changing the way you think.",
    style: "Minimalist",
    placement: "Forearm / Spine",
    image: "/design/dfs-3.png",
    category: "Minimalist",
  },
  {
    id: "4",
    title: "Faith Over Fear",
    description:
      "Trusting in God's plan and facing our fears but not allowing them to control or consume us.",
    style: "Illustrative",
    placement: "Arm / Shoulder",
    image: "/design/dfs-4.png",
    category: "Illustrative",
  },
  // ...add the rest of your real designs here
];

export const designCategories = [
  "All Designs",
  ...new Set(designs.map((d) => d.category)),
];
