const InputOutput = [
  {
    direction: "row",
    isLine: false,
    text: "Input",
    className: "atc-calculet-input",
  },
  {
    direction: "row",
    isLine: true,
    text: "Output",
    className: "atc-calculet-output",
  },
];

const Save = [
  {
    direction: "row",
    isLine: true,
    text: "Save",
    code: "<button class=”atc-calculet-save”>\n   저장하기\n</button>",
  },
];

const Design = [
  {
    direction: "column",
    isLine: true,
    text: "Button",
    existDesign: true,
    className: "atc-button",
  },
  {
    direction: "column",
    isLine: true,
    text: "Input",
    existDesign: true,
    className: "atc-input",
  },
  {
    direction: "column",
    isLine: true,
    text: "Output",
    existDesign: true,
    className: "atc-output",
  },
];

export { InputOutput, Save, Design };
