import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import ColorPickerMenu, { ColorPickerMenuProps } from "./ColorPickerMenu";
import { black, red, white, ColorOption } from "./colors";

describe("<ColorPickerMenu />", () => {
  let props: ColorPickerMenuProps;
  let colorOptions: ColorOption[] = [];

  beforeEach(() => {
    colorOptions = [
      { name: "black", value: black },
      { name: "white", value: white },
      { name: "red", value: red[500] },
    ];
    props = {
      open: true,
      onClose: jest.fn(),
      anchorEl: document.body,
      onSelectColor: jest.fn((color) => color),
      onClearColor: jest.fn(),
      colorOptions,
    };
  });

  it("should render when open is true", () => {
    const { queryByRole } = render(<ColorPickerMenu {...props} />);

    const rootElement = queryByRole("presentation");

    expect(rootElement).toBeInTheDocument();
  });

  it("should not render when open is false", () => {
    const { queryByRole } = render(<ColorPickerMenu {...props} open={false} />);

    const rootElement = queryByRole("presentation");

    expect(rootElement).not.toBeInTheDocument();
  });

  it("should render a button for each color", () => {
    const { getByRole } = render(<ColorPickerMenu {...props} />);

    colorOptions.forEach(({ name, value }) => {
      const button = getByRole("button", { name }) as HTMLButtonElement;
      expect(button).toBeInTheDocument();
      expect(button.value).toEqual(value);
    });
  });

  describe("on color select", () => {
    it("should close window if closeOnSelect = true", () => {
      const { getByRole } = render(
        <ColorPickerMenu {...props} closeOnSelect />
      );

      const button = getByRole("button", {
        name: colorOptions[0].name,
      }) as HTMLButtonElement;
      button.click();

      expect(props.onClose).toHaveBeenCalled();
    });

    it("should call onSelectColor with the clicked color", () => {
      const { getByRole } = render(<ColorPickerMenu {...props} />);

      colorOptions.forEach(({ name, value }) => {
        const button = getByRole("button", { name }) as HTMLButtonElement;
        button.click();
        expect(props.onSelectColor).toHaveBeenCalledWith(value);
      });
    });
  });

  describe("clear color button", () => {
    it("should be disabled when no color is set", () => {
      const { getByRole } = render(<ColorPickerMenu {...props} />);

      const button = getByRole("button", {
        name: /clear/i,
      }) as HTMLButtonElement;
      button.click();
      expect(button.disabled).toBeTruthy();
    });

    it("should call clearColor when clicked", () => {
      const { getByRole } = render(
        <ColorPickerMenu {...props} color={"#000"} />
      );

      const button = getByRole("button", {
        name: /clear/i,
      }) as HTMLButtonElement;

      button.click();
      expect(props.onClearColor).toHaveBeenCalled();
    });
  });
});
