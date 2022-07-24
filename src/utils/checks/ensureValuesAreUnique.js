import { areValuesUnique } from "../areValuesUnique";

/**
 * /**
 * Ensures that all the values are unique and logs a warning if not
 * @param  {Array} data     The full dataset
 * @param  {String} field   The name of the field
 * @param  {String} componentName    The name of the component that requires the band scale
 * @return {Boolean}        True if all the values are unique
 */
const ensureValuesAreUnique = (data, field, componentName) => {
    if (areValuesUnique(data.map((d) => d[field])) === false) {
        console.warn(
            `W002 - There are duplicate values in the ${field} field. This may cause rendering artifacts with a <${componentName}>.`
        );

        return false;
    }

    return true;
};

export { ensureValuesAreUnique };
