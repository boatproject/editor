import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import ColorPicker, { ColorPickerProps } from "./ColorPicker";
import { black, red, white, Color } from "./colors";

describe("<ColorPicker />", () => {
  let props: ColorPickerProps;
  let colorOptions: Color[] = [];

  beforeEach(() => {
    colorOptions = [
      { name: "black", value: black },
      { name: "white", value: white },
      { name: "red", value: red[500] },
    ];
    props = {
      open: true,
      anchorEl: document.body,
      onSelectColor: jest.fn((color) => color),
      clearColor: jest.fn(),
      colorOptions,
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

  it("should render a button for each color", () => {
    const { getByRole } = render(<ColorPicker {...props} />);

    colorOptions.forEach(({ name, value }) => {
      const button = getByRole("button", { name }) as HTMLButtonElement;
      expect(button).toBeInTheDocument();
      expect(button.value).toEqual(value);
    });
  });

  describe("on color select", () => {
    it("should close window if closeOnSelect = true", () => {
      const { getByRole } = render(<ColorPicker {...props} closeOnSelect />);

      const button = getByRole("button", {
        name: colorOptions[0].name,
      }) as HTMLButtonElement;
      button.click();
    });

    it("should call onSelectColor with the clicked color", () => {
      const { getByRole } = render(<ColorPicker {...props} />);

      colorOptions.forEach(({ name, value }) => {
        const button = getByRole("button", { name }) as HTMLButtonElement;
        button.click();
        expect(props.onSelectColor).toHaveBeenCalledWith(value);
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

    it("should call clearColor when clicked", () => {
      const { getByRole } = render(<ColorPicker {...props} color={"#000"} />);

      const button = getByRole("button", {
        name: /clear/i,
      }) as HTMLButtonElement;

      button.click();
      expect(props.clearColor).toHaveBeenCalled();
    });
  });
});
