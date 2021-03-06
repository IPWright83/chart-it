import React from "react";
import { render } from "@testing-library/react";

import { Square } from "./Square";

describe("Square", () => {
    it("renders correctly", () => {
        const { asFragment } = render(<Square fill="steelblue" />);

        expect(asFragment()).toMatchSnapshot();
    });
});
