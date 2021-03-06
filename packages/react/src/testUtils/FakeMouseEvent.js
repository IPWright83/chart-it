/**
 * Create a Fake MouseEvent for testing
 */
export class FakeMouseEvent extends MouseEvent {
    /**
     * Construct a new instance of a FakeMoustEvent
     * @param  {String} type    The type of event, e.g. "click", "mouseenter"
     * @param  {Object} values  An object containing values for the x,y co-ordinates for the event
     */
    constructor(type, values) {
        const { pageX, pageY, offsetX, offsetY, x, y, ...mouseValues } = values;
        super(type, mouseValues);

        Object.assign(this, {
            offsetX: offsetX || 0,
            offsetY: offsetY || 0,
            pageX: pageX || 0,
            pageY: pageY || 0,
            x: x || 0,
            y: y || 0,
        });
    }
}
