import { useState, useEffect } from "react";

import { eventActions } from "../../../store";

/**
 * Handles the user interacting with a DataPoint on the Column chart and the need to display a tooltip
 * @param  {Function} options.dispatch     The redux store dispatch function
 
 * @param  {String} options.y              The key for the y value
 * @return {Function}                      A function to set the tooltip datum
 */
const useTooltip = ({ dispatch, y }) => {
    const [datum, setDatum] = useState(null);
    const [colors, setColors] = useState(null);
    const [xs, setXs] = useState(null);
    const [positionEvent, setPositionEvent] = useState(null);

    useEffect(() => {
        if (!datum) return;

        // Only use border colors for a single item
        if (colors && colors.length === 1) {
            dispatch(eventActions.setTooltipBorderColor(colors[0]));
        }

        // Common x value
        const tooltipItemX = {
            datum,
            name: y,
            value: datum[y],
        };
        dispatch(eventActions.addTooltipItem(tooltipItemX));

        const xTooltipItems = xs.map((x, index) => ({
            datum,
            name: x,
            value: datum[x],
            seriesType: "bar",
            fill: colors[index],
        }));

        xTooltipItems.forEach((x) => {
            dispatch(eventActions.addTooltipItem(x));
        });

        dispatch(eventActions.setPositionEvent(positionEvent.offsetX, positionEvent.offsetY));

        return () => {
            dispatch(eventActions.setTooltipBorderColor(undefined));
            dispatch(eventActions.removeTooltipItem(tooltipItemX));

            xTooltipItems.forEach((x) => {
                dispatch(eventActions.removeTooltipItem(x));
            });
        };
    }, [dispatch, colors, xs, y, datum, positionEvent]);

    /**
     * A function to set the tooltip parameters
     * @param  {String} options.datum      The datum that triggered the tooltip event
     * @param  {Array} options.fillColors  The fill colors for each series
     * @param  {Object} options.event      The MouseEvent that triggered the tooltip
     * @param  {Array} options.xs          The keys for the x value
     */
    return (tooltipParams) => {
        if (!tooltipParams) {
            setDatum(undefined);
            setColors(undefined);
            setPositionEvent(undefined);
            setXs(undefined);
            return;
        }

        const { datum, event, fillColors, xs } = tooltipParams;

        setColors(fillColors);
        setPositionEvent(event);
        setXs(xs);
        setDatum(datum);
    };
};

export { useTooltip };
