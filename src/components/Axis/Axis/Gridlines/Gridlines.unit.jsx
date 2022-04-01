import * as d3 from "d3";
import React from "react";
import { Provider } from "react-redux";

import { render } from "@testing-library/react";

import { Gridlines } from "./Gridlines";
import { getTickSize } from "./getTickSize";

describe("Gridlines", () => {
    const width = 1000;
    const height = 500;
    const margin = { left: 10, right: 20, top: 30, bottom: 40 };

    const store = {
        getState: () => ({
            chart: {
                dimensions: {
                    width,
                    height,
                    margin,
                },
            },
        }),
        dispatch: () => {},
        subscribe: () => {},
    };

    describe("getTickSize", () => {
        describe("should return full width", () => {
            it("for left axis", () => {
                expect(getTickSize("left", width, height, margin)).toBe(970);
            });
            it("for right axis", () => {
                expect(getTickSize("right", width, height, margin)).toBe(970);
            });
        });

        describe("should return 0", () => {
            it("for 0 width", () => {
                expect(getTickSize("right", 0, height, margin)).toBe(0);
            });
            it("for 0 height", () => {
                expect(getTickSize("right", width, 0, margin)).toBe(0);
            });
        });

        describe("should return full height", () => {
            it("for top axis", () => {
                expect(getTickSize("top", width, height, margin)).toBe(430);
            });
            it("for bottom axis", () => {
                expect(getTickSize("bottom", width, height, margin)).toBe(430);
            });
        });

        it("throws an error with an invalid position", () => {
            expect(() => getTickSize("invalid", width, height, margin)).toThrow();
        });
    });

    describe("component", () => {
        it("renders horizontal gridlines", async () => {
            const layer = { current: document.createElement("custom") };

            const scale = d3
                .scaleLinear()
                .domain([0, 100])
                .range([0, width - margin.left - margin.right]);

            render(
                <Provider store={store}>
                    <Gridlines layer={layer} position="bottom" scale={scale} />
                </Provider>,
            );

            expect(layer).toMatchSnapshot();
        });

        it("renders vertical gridlines", async () => {
            const layer = { current: document.createElement("custom") };
            const scale = d3
                .scaleLinear()
                .domain([0, 10])
                .range([0, height - margin.top - margin.bottom]);

            render(
                <Provider store={store}>
                    <Gridlines layer={layer} position="left" scale={scale} />
                </Provider>,
            );

            expect(layer).toMatchSnapshot();
        });
    });
});