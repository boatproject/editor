import { useState } from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { AnyObject, TNode, Plate } from "@udecode/plate-core";

import { TextEditor } from "./TextEditor";

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
    value: undefined,
  },
} as ComponentMeta<typeof TextEditor>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof TextEditor> = (args) => (
  <TextEditor {...args} />
);

export const Basic = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

const DebugTemplate = Template.bind({});
/**
 * Story to print the value state as it updates
 * @param args
 * @returns
 */
export const Debug: ComponentStory<typeof TextEditor> = (args) => {
  const [debugValue, setDebugValue] = useState<TNode[] | null>(null);

  return (
    <DebugTemplate {...args} onChange={(value) => setDebugValue(value)}>
      {JSON.stringify(debugValue)}
    </DebugTemplate>
  );
};

const ErrorComponent = () => {
  throw new Error("Test Error");
};

export const RenderingError = Template.bind({});
RenderingError.args = {
  children: <ErrorComponent />,
};
