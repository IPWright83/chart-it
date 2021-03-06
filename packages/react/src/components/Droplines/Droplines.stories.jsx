import React from "react";
import { Provider } from "react-redux";

import { themes } from "../../themes";
import { Droplines } from ".";
import mdx from "./Droplines.mdx";

import { createMockStorybookStore } from "../../testUtils";

export default {
    title: "Components/Droplines",
    component: Droplines,
    parameters: {
        docs: {
            page: mdx,
        },
        chromatic: { delay: 300 },
    },
};

const DroplinesTemplate = (args) => {
    const store = createMockStorybookStore({
        chart: {
            theme: themes.light,
        },
        event: {
            droplines: [
                { isHorizontal: true, color: "steelblue", x1: 150, x2: 0, y1: 50, y2: 50 },
                { isVertical: true, color: "steelblue", x1: 150, x2: 150, y1: 150, y2: 50 },
            ],
        },
    });

    return (
        <Provider store={store}>
            <svg>
                <Droplines showVertical={args.showVertical} showHorizontal={args.showHorizontal} />
            </svg>
        </Provider>
    );
};

export const Default = DroplinesTemplate.bind({});
Default.storyName = "Horizontal & Vertical Droplines";
Default.args = {
    showVertical: true,
    showHorizontal: true,
};

export const VerticalDroplines = DroplinesTemplate.bind({});
VerticalDroplines.storyName = "Vertical Droplines";
VerticalDroplines.args = {
    showVertical: true,
    showHorizontal: false,
};

export const HorizontalDroplines = DroplinesTemplate.bind({});
HorizontalDroplines.storyName = "Horizontal Droplines";
HorizontalDroplines.args = {
    showVertical: false,
    showHorizontal: true,
};
