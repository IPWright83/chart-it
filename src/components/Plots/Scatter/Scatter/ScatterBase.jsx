import * as d3 from "d3";
import PropTypes from "prop-types";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useFocused } from "./useFocused";
import { useTooltip } from "./useTooltip";
import { chartSelectors } from "../../../../store";
import { eventDefaultProps, eventPropTypes, plotDefaultProps, plotPropTypes } from "../../../../types";

import { renderCanvas } from "../../renderCanvas";

/**
 * Represents a base Scatter plot that is common across both SVG and Canvas based charts
 * @param  {Object} props       The set of React properties
 * @return {ReactDOMComponent}  The Scatter plot component
 */
const ScatterBase = ({
    x,
    y,
    z,
    canvas,
    renderVirtualCanvas,
    radius,
    color,
    onMouseOver,
    onMouseOut,
    onClick,
    layer,
}) => {
    const dispatch = useDispatch();
    const data = useSelector((s) => chartSelectors.data(s));
    const width = useSelector((s) => chartSelectors.dimensions.width(s));
    const height = useSelector((s) => chartSelectors.dimensions.height(s));
    const xScale = useSelector((s) => chartSelectors.scales.getScale(s, x));
    const yScale = useSelector((s) => chartSelectors.scales.getScale(s, y));
    const zScale = useSelector((s) => chartSelectors.scales.getScale(s, z));
    const theme = useSelector((s) => chartSelectors.theme(s));
    const animationDuration = useSelector((s) => chartSelectors.animationDuration(s));

    // This useEffect handles mouseOver/mouseExit through the use of the `focused` value
    const fillColor = d3.color(color || theme.colors[0]);
    fillColor.opacity = 0.8;
    const strokeColor = fillColor.darker();

    const setFocused = useFocused({ dispatch, xScale, yScale });
    const setTooltip = useTooltip({ dispatch, fillColor, x, y });

    // This is the main render function
    useEffect(() => {
        // D3 data join
        const join = d3
            .select(layer.current)
            .selectAll("circle")
            .data(data.filter((d) => d[y] !== null && d[y] !== undefined));

        // Exit points
        const exit = join.exit().transition("scatter").duration(animationDuration).attr("r", 0).remove();

        // Enter in new points
        const enter = join
            .enter()
            .append("circle")
            .attr("class", "scatter-point")
            .attr("cx", (d) => xScale(d[x]))
            .attr("cy", (d) => yScale(d[y]))
            .attr("r", 0)
            .style("stroke", () => strokeColor)
            .style("fill", () => fillColor)
            .style("opacity", 0.8);

        // Update new and existing points
        const update = enter
            .merge(join)
            .on("mouseover", function (event, datum) {
                onMouseOver(datum, this, event);
                setTooltip({ dispatch, datum, fillColor, event, key: x, value: y, type: "scatter" });
                setFocused({ element: this, event, datum });
            })
            .on("mouseout", function (event, datum) {
                onMouseOut(datum, this, event);
                setTooltip(null);
                setFocused(null);
            })
            .on("click", function (event, datum) {
                onClick(datum, this, event);
            })
            .transition("scatter")
            .duration(animationDuration)
            .attr("cx", (d) => xScale(d[x]))
            .attr("cy", (d) => yScale(d[y]))
            .attr("r", (d) => (z ? zScale(d[z]) : radius))
            .style("fill", () => fillColor);

        renderCanvas({
            canvas,
            renderVirtualCanvas,
            width,
            height,
            exit,
            update,
        });
    }, [
        x,
        y,
        data,
        canvas,
        renderVirtualCanvas,
        xScale,
        yScale,
        layer,
        animationDuration,
        onMouseOver,
        onMouseOut,
        onClick,
    ]);

    return null;
};

ScatterBase.propTypes = {
    ...plotPropTypes,
    ...eventPropTypes,

    /**
     * The optional key of the field used for the relative z size. This overrides the radius
     * @type {String}
     */
    z: PropTypes.string,

    /**
     * The fixed radius to use for points. This is ignored if z is provided
     * @type {Number}
     */
    radius: PropTypes.number,
};

ScatterBase.defaultProps = {
    ...plotDefaultProps,
    ...eventDefaultProps,
    radius: 5,
};

export { ScatterBase };