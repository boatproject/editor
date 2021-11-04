import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Toolbar } from "../components/Toolbar/Toolbar";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "BoatsoftEditor/Toolbar",
  component: Toolbar,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  // argTypes: {
  //   backgroundColor: { control: "color" },
  // },
} as ComponentMeta<typeof Toolbar>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Toolbar> = (args) => (
  <Toolbar {...args} />
);

export const Basic = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
// Primary.args = {
//   label: "Button",
// };
