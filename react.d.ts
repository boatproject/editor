/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { memo } from "react";

/**
 * Override memo to allow for generics
 * @see https://stackoverflow.com/a/60389122/4272428
 */
declare module "react" {
  // augment React types
  function memo<A, B>(
    Component: (props: A) => B
  ): (props: A) => ReactElement | null;
  // return type is same as ReturnType<ExoticComponent<any>>
}
