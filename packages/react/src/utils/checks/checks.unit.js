import * as d3 from "d3";
import { ensureBandScale } from "./ensureBandScale";
import { ensureNoScaleOverflow } from "./ensureNoScaleOverflow";
import { ensureValuesAreUnique } from "./ensureValuesAreUnique";

describe("/utils/checks", () => {
    afterEach(() => {
        jest.resetAllMocks();
    });

    describe("ensureBandScale", () => {
        it("should return false if not a d3.scaleBand", () => {
            jest.spyOn(console, "error").mockImplementation(() => {});

            expect(ensureBandScale(d3.scaleLinear(), "unit_test")).toBe(false);
            expect(console.error).toHaveBeenCalledWith(
                `Incompatible scale for a <unit_test />. Are you missing the 'scaleType="band"' in your <Axis /> or <Scale /> component?`
            );
        });

        it("should return true if a d3.scaleBand", () => {
            expect(ensureBandScale(d3.scaleBand(), "unit_test")).toBe(true);
        });
    });

    describe("ensureNoScaleOverflow for aggregated data", () => {
        it("should return true if the data is larger than the scale", () => {
            jest.spyOn(console, "warn").mockImplementation(() => {});

            const scale = d3.scaleLinear().domain([0, 10]);
            const data = [
                { x: 2, y: 5 },
                { x: 5, y: 8 },
            ];
            const fields = ["x", "y"];

            expect(ensureNoScaleOverflow(scale, data, fields)).toBe(false);
            expect(console.warn).toHaveBeenCalledWith(
                "The scale appears too small for the dataset. Are you missing the `aggregate={true}` in your <Axis /> or <Scale /> component?"
            );
        });

        it("should return false if the data is smaller than the scale", () => {
            const scale = d3.scaleLinear().domain([0, 20]);
            const data = [
                { x: 2, y: 5 },
                { x: 5, y: 8 },
            ];
            const fields = ["x", "y"];

            expect(ensureNoScaleOverflow(scale, data, fields)).toBe(true);
        });
    });

    describe("ensureValuesAreUnique", () => {
        it("should return true if all the values are unique", () => {
            const data = [{ x: "a" }, { x: "b" }, { x: "c" }];
            const field = "x";

            expect(ensureValuesAreUnique(data, field, "unit_test")).toBe(true);
        });

        it("should return false if not all the values are unique", () => {
            jest.spyOn(console, "warn").mockImplementation(() => {});

            const data = [{ x: "a" }, { x: "b" }, { x: "a" }];
            const field = "x";

            expect(ensureValuesAreUnique(data, field, "unit_test")).toBe(false);
            expect(console.warn).toHaveBeenCalledWith(
                `There are duplicate values in the x field. This may cause rendering artifacts with a <unit_test>.`
            );
        });
    });
});
