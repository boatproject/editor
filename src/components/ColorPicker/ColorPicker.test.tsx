import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import ColorPicker, { ColorPickerProps } from "./ColorPicker";
import { black, red, white } from "./colors";

describe("<ColorPicker />", () => {
  let props: ColorPickerProps;
  let colorEntries: [string, string][] = [];

  beforeEach(() => {
    colorEntries = [
      ["black", black],
      ["white", white],
      ["red", red[500]],
    ];
    props = {
      open: true,
      anchorEl: document.body,
      onSelectColor: jest.fn((color) => color),
      clearColor: jest.fn(),
      colorEntries,
    };
  });

  it("should render when open is true", () => {
    const { queryByRole } = render(<ColorPicker {...props} />);

    const rootElement = queryByRole("presentation");

    expect(rootElement).toBeInTheDocument();
  });

  it("should not render when open is false", () => {
    const { queryByRole } = render(<ColorPicker {...props} open={false} />);

    const rootElement = queryByRole("presentation");

    expect(rootElement).not.toBeInTheDocument();
  });

  describe("ColorTile buttons", () => {
    it("should render a button for each color", () => {
      const { getByRole } = render(<ColorPicker {...props} />);

      colorEntries.forEach(([name, color]) => {
        const button = getByRole("button", { name }) as HTMLButtonElement;
        expect(button).toBeInTheDocument();
        expect(button.value).toEqual(color);
      });
    });

    it("should call onSelectColor with a color when it is clicked", () => {
      const { getByRole } = render(<ColorPicker {...props} />);

      colorEntries.forEach(([name, color]) => {
        const button = getByRole("button", { name }) as HTMLButtonElement;
        button.click();
        expect(props.onSelectColor).toHaveBeenCalledWith(color);
      });
    });
  });

  describe("clear color button", () => {
    it("should be disabled when no color is set", () => {
      const { getByRole } = render(<ColorPicker {...props} />);

      const button = getByRole("button", {
        name: /clear/i,
      }) as HTMLButtonElement;
      button.click();
      expect(button.disabled).toBeTruthy();
    });

    it("should call clearColor when clicked and a color is set", () => {
      const { getByRole } = render(<ColorPicker {...props} color={"#000"} />);

      const button = getByRole("button", {
        name: /clear/i,
      }) as HTMLButtonElement;

      screen.debug(button);
      button.click();
      expect(props.clearColor).toHaveBeenCalled();
    });
  });
});
