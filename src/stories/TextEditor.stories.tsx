import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { TextEditor } from "../TextEditor";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "BoatsoftEditor/TextEditor",
  component: TextEditor,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  // argTypes: {
  //   backgroundColor: { control: "color" },
  // },
  args: {
    id: "TextEditor-story",
  },
} as ComponentMeta<typeof TextEditor>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof TextEditor> = (args) => (
  <TextEditor {...args} />
);

export const Basic = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
// Primary.args = {
//   label: "Button",
// };
