import { processObjectConditionalResult } from "./lib/object.conditions.js";
import { processTransactionData } from "./lib/transaction.data.js";
//this file is just an interface to specific methods in lib
/**
 * TYPES OF CONDITIONS
 * 1. object conditions (/\)
 * 2. fee conditions
 * 3. end result conditions
 * todo `conditional result` can be gotten for specified objects in list ie [object1,object2] or if an empty list [] then compute all conditional results for all objects
 *
 */

/**
 * 
 * @param objectLabelsData :- Parsed transaction data that this method can interpret. Use the method `parseTransactionData` to get a valid data format.
 * @param objectLabelConditions :- {
    objectLabel1: { conditionId1: {objectId,affects,conditionalStatements,objectActions} },
    objectLabel2: { conditionId3: {objectId,affects,conditionalStatements,objectActions} },
  }
  @param triggerObjectIds :- specifiy object ids whose effect you wish to determine. Basically which effects do the specified object(s) trigger.
  @removeDuplicates :- Whether to remove duplicate actionTypes in an affected object(s) or step(s).
 * @returns {effects: { objects: {}, steps: {} }} :- Always check if `objects` or `steps` is set before using them in your code.
 */
export const parseObjectConditionalResult = ({
  objectLabelsData = {},
  objectLabelConditions = {},
  triggerObjectIds = [],
  removeDuplicates = true,
}) => {
  try {
    return processObjectConditionalResult({
      objectLabelsData,
      objectLabelConditions,
      triggerObjectIds,
      removeDuplicates,
    });
  } catch (e) {
    return false;
  }
};

/**
 * Interface
 * Parse data into a format that can be used in conditions
 * @param data This is the transaction data
 * @returns {objectLabelsData,steps}
 */
export const parseTransactionData = ({ data }) => {
  try {
    return processTransactionData({ data });
  } catch (e) {
    return false;
  }
};
