/**
 * Ensures that the scale is valid and logs if there's a problem
 * @param  {d3.Scale} scale          The d3 scale
 * @param  componentName    The name of the component that requires the band scale
 * @return                  True if the scale is valid
 */
export const ensureBandScale = (scale, componentName: string): boolean => {
  if (!scale.bandwidth) {
    console.error(
      `Incompatible scale for a <${componentName} />. Are you missing the 'scaleType="band"' in your <Axis /> or <Scale /> component?`
    );

    return false;
  }

  return true;
};
