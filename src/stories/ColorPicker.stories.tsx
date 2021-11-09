import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { ColorPicker } from "../components/ColorPicker";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "BoatsoftEditor/ColorPicker",
  component: ColorPicker,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  // argTypes: {
  //   color: { control: "color" },
  // },
  args: {
    open: true,
    anchorEl: document.querySelector("body"),
  },
} as ComponentMeta<typeof ColorPicker>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof ColorPicker> = (args) => (
  <ColorPicker {...args} />
);

export const Basic = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
// Primary.args = {
//   label: "Button",
// };
