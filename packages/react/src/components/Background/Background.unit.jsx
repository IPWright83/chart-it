import React from "react";
import { Provider } from "react-redux";
import { render, fireEvent } from "@testing-library/react";
import { createMockStore, FakeMouseEvent, wait } from "../../testUtils";
import { MOUSE_MOVE_THROTTLE } from "../../constants";

import { Background } from ".";
import { Background as BackgroundBase } from "./Background";

describe("Background", () => {
    const store = createMockStore({
        chart: {
            dimensions: {
                width: 800,
                height: 400,
                margin: { left: 10, right: 20, top: 30, bottom: 40 },
            },
        },
    });

    it("should render correctly", async () => {
        const { asFragment } = render(
            <Provider store={store}>
                <svg>
                    <Background />
                </svg>
            </Provider>,
        );

        expect(asFragment()).toMatchSnapshot();
    });

    it("should trigger throttled mousemove event", async () => {
        const { container } = render(
            <Provider store={store}>
                <svg>
                    <Background />
                </svg>
            </Provider>,
        );

        jest.spyOn(store, "dispatch");

        const element = container.querySelector("rect");
        fireEvent(element, new FakeMouseEvent("mouseover", { pageX: 150, pageY: 150 }));
        fireEvent(element, new FakeMouseEvent("mousemove", { pageX: 150, pageY: 150 }));
        fireEvent(element, new FakeMouseEvent("mouseout", { pageX: 900, pageY: 900 }));

        await wait(2 * MOUSE_MOVE_THROTTLE);

        const dispatchCalls = store.dispatch.mock.calls.map((c) => c[0].type);
        expect(dispatchCalls).toEqual(["EVENT.MOUSE_ENTER", "EVENT.MOUSE_MOVE", "EVENT.MOUSE_EXIT"]);
    });

    it("should skip if there is no layer avaliable", () => {
        const layer = { current: null };

        render(
            <Provider store={store}>
                <svg>
                    <BackgroundBase layer={layer} />
                </svg>
            </Provider>,
        );

        // Should be empty
        expect(layer).toMatchSnapshot();
    });
});
