import { themes } from "../../themes";

/**
 * Sets the dimensions in the Redux store
 * @param  {Number} width   The width of the chart
 * @param  {Number} height  The height of the chart
 * @param  {Object} margin  The margin for the chart
 * @return {Object}         A redux action object
 */
const setDimensions = (width, height, margin) => ({
    type: "CHART.SET_DIMENSIONS",
    payload: { width, height, margin },
});

/**
 * Sets the scale for this field in the Redux store
 * @param  {Array<String>} fields   The names of the fields to set the scale for
 * @param  {Function} scale         A d3.Scale function
 * @return {Object}                 A redux action object
 */
const setScales = (fields, scale) => (dispatch) => {
    if (!scale) return;

    dispatch({
        type: "CHART.SET_SCALES",
        payload: { fields, scale },
    });
};

/**
 * Sets the theme for the chart in the Redux store
 * @param  {Object} theme   The theme object
 * @return {Object}                 A redux action object
 */
const setTheme = (theme) => (dispatch) => {
    if (theme === "light") {
        dispatch({
            type: "CHART.SET_THEME",
            payload: themes.light,
        });

        return;
    }

    if (theme === "dark") {
        dispatch({
            type: "CHART.SET_THEME",
            payload: themes.dark,
        });

        return;
    }

    dispatch({
        type: "CHART.SET_THEME",
        payload: theme,
    });
};

/**
 * Sets the duration for animations in the Redux store
 * @param  {Number} duration The duration in miliseconds
 * @return {Object}          A redux action object
 */
const setAnimationDuration = (duration) => ({
    type: "CHART.SET_ANIMATION_DURATION",
    payload: duration,
});

/**
 * Sets the data for the chart in the Redux store
 * @param  {Array}  data An array of the data for the chart
 * @return {Object}      A redux action object
 */
const setData = (data = []) => ({
    type: "CHART.SET_DATA",
    payload: data,
});

const chartActions = {
    setDimensions,
    setScales,
    setData,
    setTheme,
    setAnimationDuration,
};

export { chartActions };
