
/**
 * Entry
 * Parse data into a format that can be used in conditions
 * @param {*} param0
 * @returns {objectLabelsData,steps}
 */
export const processTransactionData = ({ data }) => {
  try {
    let returnData = { objectLabelsData: {}, steps: {} };
    if (!data) return false;
    for (const stepId of Object.keys(data)) {
        //loop each step extracting object
      if (!data[stepId]["stepData"]) continue;
      returnData.steps[stepId] = { objectLabels: [] }; //init step objectLabels
      for (const objectLabelId of Object.keys(data[stepId]["stepData"])) {
        returnData.steps[stepId]["objectLabels"].push(objectLabelId); //update step objectLabels
        returnData["objectLabelsData"][objectLabelId] = {
          ...data[stepId]["stepData"][objectLabelId],
          stepId
        };//update objectLabelsData
      }
    }
    return returnData;
  } catch (e) {
    return false;
  }
};
