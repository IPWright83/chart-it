/**
 * Gets the maximum length of a string in the data
 * @param  data     The dataset
 * @return          The max length of a string in the data
 */
export const getMaxStringLength = (data: Array<string> = []): number => {
  if (data.length === 0) {
    return 0;
  }

  return Math.max(...data.map((d) => (d ? d.length : 0)));
};
