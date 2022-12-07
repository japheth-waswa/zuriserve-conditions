import { processObjectConditionalResult } from "./lib/object.conditions.js";
import { processTransactionData } from "./lib/transaction.data.js";
//this file is just an interface to specific methods in lib
/**
 * TYPES OF CONDITIONS
 * 1. object conditions
 * 2. fee conditions
 * 3. end result conditions
 * todo `conditional result` can be gotten for specified objects in list ie [object1,object2] or if an empty list [] then compute all conditional results for all objects
 *
 */
// export const computeObjectConditionalResult = ({
//   objectLabelIds = [],
//   objectLabelData = {},
//   serviceConditions = [],
//   channels = [],
// }) => {
//   try {
//     return processObjectConditionalResult({
//       objectLabelIds,
//       objectLabelData,
//       serviceConditions,
//       channels,
//     });
//   } catch (e) {
//     return false;
//   }
// };

export const parseTransactionData = ({ data }) => {
  try {
    return processTransactionData({ data });
  } catch (e) {
    return false;
  }
};
