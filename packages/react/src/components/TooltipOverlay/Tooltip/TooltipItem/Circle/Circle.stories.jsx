import React from "react";
import { Circle } from "./Circle";

import mdx from "../TooltipItem.mdx";

export default {
    title: "Components/Tooltip/TooltipItem/Circle",
    component: Circle,
    parameters: {
        docs: {
            page: mdx,
        },
    },
};

const CircleTemplate = (args) => {
    return <Circle fill={args.fill} />;
};

export const Default = CircleTemplate.bind({});
Default.args = {
    fill: "steelblue",
};
