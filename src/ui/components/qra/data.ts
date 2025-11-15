export const PIN_DATA = [
  {
    id: "lossiemouth",
    name: "RAF Lossiemouth",
    x: 57,
    y: 30,
    content: {
      title: "RAF Lossiemouth",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi unde saepe, assumenda totam excepturi, odio aut harum corrupti cumque at voluptate illo accusantium velit nobis error atque eum nemo quidem.",
    },
  },
  {
    id: "example",
    name: "Example Pin",
    x: 79,
    y: 79,
    content: {
      title: "Example Pin Content Title",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi unde saepe, assumenda totam excepturi, odio aut harum corrupti cumque at voluptate illo accusantium velit nobis error atque eum nemo quidem.",
    },
  },
];

export type PinData = (typeof PIN_DATA)[number];
