import { ComponentStory, ComponentMeta } from "@storybook/react";

import { RichTextField } from "./RichTextField";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "BoatsoftEditor/RichTextField",
  component: RichTextField,
  args: {
    id: "rich-text-field",
    label: "Rich Text Field",
  },
} as ComponentMeta<typeof RichTextField>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof RichTextField> = (args) => (
  <RichTextField {...args} />
);

export const Basic = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
// Primary.args = {
//   label: "Button",
// };

const notesCollection = [
  [
    {
      type: "ul",
      children: [
        { type: "li", children: [{ text: "Raise sail" }] },
        { type: "li", children: [{ text: "Check Reef points" }] },
        { type: "li", children: [{ text: "Check insignia" }] },
        { type: "li", children: [{ text: "Check number on sail" }] },
        { type: "li", children: [{ text: "" }] },
      ],
    },
  ],
  [
    {
      type: "bulleted-list",
      children: [
        {
          type: "list-item",
          children: [{ text: "Install and affix macerator" }],
        },
        { type: "list-item", children: [{ text: "Wire macerator" }] },
        {
          type: "list-item",
          children: [{ text: "Install outlet hoses and vent elbow" }],
        },
        { type: "list-item", children: [{ text: "" }] },
      ],
    },
    {
      type: "paragraph",
      children: [{ text: "Install Y valve into waste hose" }],
    },
    {
      type: "bulleted-list",
      children: [
        { type: "list-item", children: [{ text: "Order a pump out first!" }] },
        {
          type: "list-item",
          children: [{ text: "Replace hose to deck pumpout" }],
        },
        { type: "list-item", children: [{ text: 'Add "Y" valve' }] },
        {
          type: "list-item",
          children: [{ text: "    Cut hose from tank to deckfill" }],
        },
        { type: "list-item", children: [{ text: "    Insert Y valve" }] },
        {
          type: "list-item",
          children: [{ text: "    Connect hose from Y to macerator" }],
        },
        {
          type: "list-item",
          children: [
            { text: "    " },
            { text: "Clamp all hoses.", bold: true },
          ],
        },
        { type: "list-item", children: [{ text: "" }] },
      ],
    },
    {
      type: "paragraph",
      children: [
        {
          text: "Note: now would be a good time to replace the holding tank hoses to cut down on the smell; also, look at fittings on tank to see if they need to be sealed with silicone to keep the smell from getting into forward cabin.",
        },
      ],
    },
    { type: "block-quote", children: [{ text: "" }] },
    {
      type: "paragraph",
      children: [{ text: "Changed due date since the boat is on the hard." }],
    },
    {
      type: "bulleted-list",
      children: [{ type: "paragraph", children: [{ text: "" }] }],
    },
  ],
];

export const Notes = Template.bind({});
Notes.args = {
  id: "notes",
  label: "Notes",
  initialValue: notesCollection[1],
};
