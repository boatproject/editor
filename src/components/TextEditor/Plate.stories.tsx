import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Plate } from "@udecode/plate";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "BoatsoftEditor/Plate",
  component: Plate,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  // argTypes: {
  //   backgroundColor: { control: "color" },
  // },
  args: {
    id: "Plate-story",
    value: undefined,
  },
} as ComponentMeta<typeof Plate>;

const Template: ComponentStory<typeof Plate> = (args) => <Plate {...args} />;

export const Basic = Template.bind({});
