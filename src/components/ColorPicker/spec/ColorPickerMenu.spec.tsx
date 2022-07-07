import { render, screen } from "@testing-library/react";
import ColorPickerMenu, { ColorPickerMenuProps } from "../ColorPickerMenu";
import { black, red, white, ColorOption } from "../colors";

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
    render(<ColorPickerMenu {...props} />);

    const rootElement = screen.queryByRole("presentation");

    expect(rootElement).toBeInTheDocument();
  });

  it("should not render when open is false", () => {
    render(<ColorPickerMenu {...props} open={false} />);

    const rootElement = screen.queryByRole("presentation");

    expect(rootElement).not.toBeInTheDocument();
  });

  it("should render a button for each color", () => {
    render(<ColorPickerMenu {...props} />);

    colorOptions.forEach(({ name, value }) => {
      const button = screen.getByRole("button", { name }) as HTMLButtonElement;
      expect(button).toBeInTheDocument();
      expect(button.value).toEqual(value);
    });
  });

  describe("on color select", () => {
    it("should call onSelectColor with the clicked color", () => {
      render(<ColorPickerMenu {...props} />);

      colorOptions.forEach(({ name, value }) => {
        const button = screen.getByRole("button", {
          name,
        }) as HTMLButtonElement;
        button.click();
        expect(props.onSelectColor).toHaveBeenCalledWith(value);
      });
    });
  });

  describe("clear color button", () => {
    it("should be disabled when no color is set", () => {
      render(<ColorPickerMenu {...props} />);

      const button = screen.getByRole("button", {
        name: /clear/i,
      }) as HTMLButtonElement;
      button.click();
      expect(button.disabled).toBeTruthy();
    });

    it("should call clearColor when clicked", () => {
      render(<ColorPickerMenu {...props} color={"#000"} />);

      const button = screen.getByRole("button", {
        name: /clear/i,
      }) as HTMLButtonElement;

      button.click();
      expect(props.onClearColor).toHaveBeenCalled();
    });
  });
});
