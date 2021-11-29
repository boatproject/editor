import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { RichTextField } from "../components/RichTextField";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "BoatsoftEditor/RichTextField",
  component: RichTextField,
  arg: {
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
