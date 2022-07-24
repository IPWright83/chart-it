/**
 * Ensures that the scale is valid and logs if there's a problem
 * @param  {d3.Scale} scale          The d3 scale
 * @param  {String} componentName    The name of the component that requires the band scale
 * @return {Boolean}                 True if the scale is valid
 */
const ensureBandScale = (scale, componentName) => {
    if (!scale.bandwidth) {
        console.error(
            `E001 - Incompatible scale for a <${componentName} />. Are you missing the 'scaleType="band"' in your <Axis /> or <Scale /> component?`
        );

        return false;
    }

    return true;
};

export { ensureBandScale };
