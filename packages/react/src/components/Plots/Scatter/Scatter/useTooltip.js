import { useState, useEffect } from "react";

import { eventActions } from "../../../../store";

/**
 * Handles the user interacting with a DataPoint on the Scatter chart and the need to display a tooltip
 * @param  {Function} options.dispatch     The redux store dispatch function
 
 * @param  {String} options.x              The key for the x value
 * @param  {String} options.y              The key for the y value
 * @return {Function}                      A function to set the tooltip datum
 */
const useTooltip = ({ dispatch, x, y }) => {
    const [datum, setDatum] = useState(null);
    const [color, setColor] = useState(null);
    const [positionEvent, setPositionEvent] = useState(null);

    useEffect(() => {
        if (!datum) return;

        const tooltipItemX = {
            datum,
            name: x,
            value: datum[x],
        };

        const tooltipItemY = {
            datum,
            name: y,
            seriesType: "scatter",
            fill: color,
            value: datum[y],
        };

        dispatch(eventActions.setTooltipBorderColor(color));
        dispatch(eventActions.addTooltipItem(tooltipItemX));
        dispatch(eventActions.addTooltipItem(tooltipItemY));
        dispatch(eventActions.setPositionEvent(positionEvent?.offsetX, positionEvent?.offsetY));

        return () => {
            dispatch(eventActions.setTooltipBorderColor(undefined));
            dispatch(eventActions.removeTooltipItem(tooltipItemX));
            dispatch(eventActions.removeTooltipItem(tooltipItemY));
        };
    }, [dispatch, color, x, y, positionEvent]);

    /**
     * A function to set the tooltip parameters
     * @param  {String} options.datum      The datum that triggered the tooltip event
     * @param  {String} options.fillColor  The border color of the tooltip
     * @param  {Object} options.event      The MouseEvent that triggered the tooltip
     */
    return (tooltipParams) => {
        if (!tooltipParams) {
            setDatum(undefined);
            setColor(undefined);
            setPositionEvent(undefined);
            return;
        }

        const { datum, event, fillColor } = tooltipParams;

        setDatum(datum);
        setColor(fillColor);
        setPositionEvent(event);
    };
};

export { useTooltip };
