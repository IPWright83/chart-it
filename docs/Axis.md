# `<Axis />` Component API

## Props

| Prop            | Type            | Default | Note                                                                                                                                                                      |
| --------------- | --------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `position`      | `string`        |         | The position of the axis. One of `top`, `bottom`, `left` or `right`. This will use the appropriate [d3.axis](https://github.com/d3/d3-axis#axisTop) orientation function. |
| `fields`        | `Array<string>` |         | The set of fields that this axis represents. These should correspond to the fields being displayed on this Axis within the data.                                          |
| `showGridlines` | `boolean`       | true    | Determines whether gridlines should be shown against this axis.                                                                                                           |
| `tickSizeInner` | `number`        | 6       | See https://github.com/d3/d3-axis#axis_tickSizeInner.                                                                                                                     |
| `tickSizeOuter` | `number`        | 6       | See https://github.com/d3/d3-axis#axis_tickSizeOuter.                                                                                                                     |
| `tickPadding`   | `number`        | 3       | See https://github.com/d3/d3-axis#axis_tickPadding.                                                                                                                       |
| `title`         | `string`        | null    | The title of the axis. This will default to the value in field(s)                                                                                                         |
