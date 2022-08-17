import { common, red } from "@mui/material/colors";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "../../../test/util";
import ColorPickerMenu, { ColorPickerMenuProps } from "../ColorPickerMenu";
import { ColorOption } from "../colors";

describe("<ColorPickerMenu />", () => {
  let props: ColorPickerMenuProps;
  let colorOptions: ColorOption[] = [];

  beforeEach(() => {
    colorOptions = [
      ["black", common.black],
      ["white", common.white],
      ["red", red[500]],
    ];
    props = {
      open: true,
      onClose: vi.fn(),
      anchorEl: document.body,
      onSelectColor: vi.fn((color) => color),
      onClearColor: vi.fn(),
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

  describe.each(colorOptions)(
    "color tile representing: %j",
    ([name, value]) => {
      const color = JSON.stringify({ name, value });
      it(`should render a tile for ${color}`, () => {
        render(<ColorPickerMenu {...props} />);

        const button = screen.getByRole<HTMLButtonElement>("button", { name });

        expect(button.value).toEqual(value);
      });

      it(`should call onSelectColor with ${color} when selected`, async () => {
        render(<ColorPickerMenu {...props} />);

        const button = screen.getByRole("button", { name });

        await userEvent.click(button);

        expect(props.onSelectColor).toHaveBeenCalledWith(value);
      });
    }
  );

  describe("clear color button", () => {
    it("should be disabled when no color is set", async () => {
      render(<ColorPickerMenu {...props} />);

      const button = screen.getByRole<HTMLButtonElement>("button", {
        name: /clear/i,
      });

      expect(button.disabled).toBeTruthy();
    });

    it("should call clearColor when clicked", async () => {
      render(<ColorPickerMenu {...props} color="#000" />);

      const button = screen.getByRole("button", {
        name: /clear/i,
      });

      await userEvent.click(button);

      expect(props.onClearColor).toHaveBeenCalledWith();
    });
  });
});
