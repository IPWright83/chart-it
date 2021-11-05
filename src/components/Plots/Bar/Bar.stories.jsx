import React from "react";

import { argTypes } from "../../../../stories/argTypes";
import { sales_records_dataset } from "../../../../data/sales_records_dataset";
import { Bar } from "./Bar";
import { Bars } from "./Bars";
import { XYChart } from "../../XYChart";
import { XAxis, YAxis } from "../../Axis";

import mdx from "./Bar.mdx";

const { width, height, margin, useCanvas, theme, color } = argTypes;

export default {
    title: "XYCharts/Bar",
    component: Bar,
    parameters: {
        docs: {
            page: mdx,
            transformSource: (src) => {
                src = src.replace(/data={\[.*?\]}/gs, "data={[ ...dataset ]}");
                src = src.replaceAll(/undefined,?/g, "");
                src = src.replace(/^\s*\n/gm, "");
                return src;
            },
        },
        chromatic: { delay: 300 },
    },
    argTypes: {
        useCanvas,
        width,
        height,
        theme,
        color,
        leftMargin: margin,
        rightMargin: margin,
        topMargin: margin,
        bottomMargin: margin,
    },
};

const BarTemplate = (args) => (
    <XYChart
        data={sales_records_dataset}
        margin={{ left: args.leftMargin, right: args.rightMargin, top: args.topMargin, bottom: args.bottomMargin }}
        width={args.width}
        height={args.height}
        animationDuration={args.animationDuration}
    >
        <YAxis fields={[args.y]} scaleType="band" showGridlines={false} />
        <XAxis fields={[args.x, args.x2, args.x3]} />
        <Bar x={args.x} y={args.y} color={args.color} />
        {args.x2 ? <Bar x={args.x2} y={args.y} color={args.color2} /> : undefined}
    </XYChart>
);

const BarsTemplate = (args) => (
    <XYChart
        data={sales_records_dataset}
        margin={{ left: args.leftMargin, right: args.rightMargin, top: args.topMargin, bottom: args.bottomMargin }}
        width={args.width}
        height={args.height}
        animationDuration={args.animationDuration}
    >
        <YAxis fields={[args.y]} scaleType="band" showGridlines={false} />
        <XAxis fields={[args.x, args.x2, args.x3]} aggregate={args.stacked} />
        <Bars y={args.y} xs={[args.x, args.x2]} grouped={args.grouped} stacked={args.stacked} />
    </XYChart>
);

export const Basic = BarTemplate.bind({});
Basic.storyName = "Basic Plot";
Basic.args = {
    useCanvas: false,
    width: 800,
    height: 400,
    animationDuration: 250,
    color: "#99C1DC",
    color2: "#FF7F28",
    theme: "light",
    leftMargin: 120,
    rightMargin: 40,
    topMargin: 40,
    bottomMargin: 40,
    onClick: console.debug,
    onMouseOver: console.debug,
    onMouseOut: console.debug,
    x: "Unit Price",
    y: "Item Type",
};

export const Color = BarTemplate.bind({});
Color.storyName = "Custom Color";
Color.args = {
    ...Basic.args,
    color: "orange",
};

export const Canvas = BarTemplate.bind({});
Canvas.storyName = "Using Canvas";
Canvas.args = {
    ...Basic.args,
    useCanvas: true,
};

export const Ratio = BarTemplate.bind({});
Ratio.storyName = "Ratio Bars";
Ratio.args = {
    ...Basic.args,
    x2: "Unit Cost",
};

export const Stacked = BarsTemplate.bind({});
Stacked.storyName = "Stacked Bars";
Stacked.args = {
    ...Basic.args,
    x2: "Unit Cost",
    stacked: true,
};

export const Grouped = BarsTemplate.bind({});
Grouped.storyName = "Grouped Bars";
Grouped.args = {
    ...Basic.args,
    x2: "Unit Cost",
    grouped: true,
};