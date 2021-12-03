import setRef from "./setRef";

describe("setRef function", () => {
  const testValues = [[1], [{ x: 1 }], ["st"], [[1, 2, 3]]] as const;

  it.each(testValues)("should call a function ref with %j", (val) => {
    const ref = jest.fn();
    setRef(ref, val);

    expect(ref).toHaveBeenCalledWith(val);
  });

  it.each(testValues)(
    "should set the current property of an object ref to %t",
    (val) => {
      const ref = { current: null };
      setRef(ref, val);

      expect(ref.current).toBe(val);
    }
  );
});
