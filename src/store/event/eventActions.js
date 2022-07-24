// TODO: Validate shape of each object

/**
 * Sets the mouse move event as being active in the store
 * @param  {Object} mouseEventArgs  The event arguments from the mouse event
 * @return {Object}                 A redux store action
 */
const mouseMove = (mouseEventArgs) => ({
    type: "EVENT.MOUSE_MOVE",
    payload: mouseEventArgs,
});

/**
 * Sets the mouse enter event as being active in the store
 * @param  {Object} mouseEventArgs  The event arguments from the mouse event
 * @return {Object}                 A redux store action
 */
const mouseEnter = (mouseEventArgs) => ({
    type: "EVENT.MOUSE_ENTER",
    payload: mouseEventArgs,
});

/**
 * Sets the mouse exit event as being active in the store
 * @param  {Object} mouseEventArgs  The event arguments from the mouse event
 * @return {Object}                 A redux store action
 */
const mouseExit = (mouseEventArgs) => ({
    type: "EVENT.MOUSE_EXIT",
    payload: mouseEventArgs,
});

/**
 * Adds a dropline to the store
 * @param  {Object} dropline    The dropline to add
 * @return {Object}             A redux store action
 */
const addDropline = (dropline) => ({
    type: "EVENT.ADD_DROPLINE",
    payload: dropline,
});

/**
 * Removes a dropline from the store
 * @param  {Object} dropline    The dropline to remove
 * @return {Object}             A redux store action
 */
const removeDropline = (dropline) => ({
    type: "EVENT.REMOVE_DROPLINE",
    payload: dropline,
});

/**
 * Adds a marker to the store
 * @param  {Object} marker      The marker to add
 * @return {Object}             A redux store action
 */
const addMarker = (marker) => ({
    type: "EVENT.ADD_MARKER",
    payload: marker,
});

/**
 * Removes a marker from the store
 * @param  {Object} marker      The marker to remove
 * @return {Object}             A redux store action
 */
const removeMarker = (marker) => ({
    type: "EVENT.REMOVE_MARKER",
    payload: marker,
});

/**
 * Sets the color of the tooltip border
 * @param {String} color        The hex color to use for the tooltip border
 * @return {Object}             A redux store action
 */
const setTooltipBorderColor = (color) => ({
    type: "EVENT.SET_TOOLTIP_COLOR",
    payload: color,
});

/**
 * Adds a tooltip item to the list of entries the tooltip should display
 * @param  {Object} tooltipItem     The tooltip item to add
 * @return {Object}                 A redux store action
 */
const addTooltipItem = (tooltipItem) => ({
    type: "EVENT.ADD_TOOLTIP_ITEM",
    payload: tooltipItem,
});

/**
 * Removes a tooltip item to the list of entries the tooltip should display
 * @param  {Object} tooltipItem     The tooltip item to add
 * @return {Object}                 A redux store action
 */
const removeTooltipItem = (tooltipItem) => ({
    type: "EVENT.REMOVE_TOOLTIP_ITEM",
    payload: tooltipItem,
});

/**
 * Updates the position of the tooltip based on the given mouse event
 * @param {Number} x        The mouse x location
 * @param {Number} y        The mouse y location
 * @return {Object}         A redux store action
 */
const setPositionEvent = (x, y) => ({
    type: "EVENT.SET_POSITION_TOOLTIP_ITEM_EVENT",
    payload: { x, y },
});

const eventActions = {
    mouseMove,
    mouseExit,
    mouseEnter,
    addDropline,
    removeDropline,
    addMarker,
    removeMarker,
    setTooltipBorderColor,
    addTooltipItem,
    removeTooltipItem,
    setPositionEvent,
};

export { eventActions };
