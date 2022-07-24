import * as d3 from "d3";

/**
 * Validates that the scale can cope with aggregated data
 * @param  {d3.Scale} scale             The d3 scale
 * @param  {Array} data                 The full dataset
 * @param  {Array<String>} fields       The set of fields to check
 * @return {Boolean}                    True if the domain can cope with the aggregated dataset
 */
const ensureNoScaleOverflow = (scale, data, fields) => {
    const maxValue = d3.max(data.map((d) => fields.reduce((sum, key) => sum + d[key], 0)));
    if (maxValue > scale.domain()[1]) {
        console.warn(
            "W001 - The scale appears too small for the dataset. Are you missing the `aggregate={true}` in your <Axis /> or <Scale /> component?",
            fields
        );

        return false;
    }

    return true;
};

export { ensureNoScaleOverflow };
