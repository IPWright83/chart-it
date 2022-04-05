import type { ICoordinate } from "../types";

/**
 * Obtain the x, y offsets from a transform string
 * @param  transform    The transform string
 * @return              The x,y offsets
 */
export const getXYFromTransform = (transform: string): ICoordinate => {
  if (transform && transform.match) {
    const result = transform.match(/translate\(([\d.]+),\s?([\d.]+)\)/);
    if (result) {
      return { x: +result[1], y: +result[2] };
    }
  }

  return { x: 0, y: 0 };
};
