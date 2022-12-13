import {
  processExtractFeesWithConditionsFromSteps,
  processObjectWithConditions,
} from "./lib/conditions.extractor.js";
import { processFeesConditionalResult } from "./lib/fee.conditions.js";
import { processObjectConditionalResult } from "./lib/object.conditions.js";
import { processTransactionData } from "./lib/transaction.data.js";
import {
  LARGEDATASET_FIELD_OPENING_CLOSING_TAGS_UTIL,
  OBJECTLABEL_FIELD_VALUE_OPENING_CLOSING_TAGS_UTIL,
  OBJECTLABEL_LARGEDATASET_FIELD_OPENING_CLOSING_TAGS_UTIL,
  OBJECT_SECTIONS_BINDER_UTIL,
} from "./utils/helper.utils.js";
//this file is just an interface to specific methods in lib
/**
 * TYPES OF CONDITIONS
 * 1. object conditions (/\)
 * 2. fee conditions (/\)
 * 3. end result conditions
 * todo `conditional result` can be gotten for specified objects in list ie [object1,object2] or if an empty list [] then compute all conditional results for all objects
 *
 */

export const OBJECT_SECTIONS_BINDER = OBJECT_SECTIONS_BINDER_UTIL;
export const LARGEDATASET_FIELD_OPENING_CLOSING_TAGS =
  LARGEDATASET_FIELD_OPENING_CLOSING_TAGS_UTIL;
export const OBJECTLABEL_FIELD_VALUE_OPENING_CLOSING_TAGS =
  OBJECTLABEL_FIELD_VALUE_OPENING_CLOSING_TAGS_UTIL;
export const OBJECTLABEL_LARGEDATASET_FIELD_OPENING_CLOSING_TAGS =
  OBJECTLABEL_LARGEDATASET_FIELD_OPENING_CLOSING_TAGS_UTIL;

/**
 * Interface
 * @required objectLabelsData,feeObjects
 * @param objectLabelsData :- Parsed transaction data that this method can interpret. Use the method `parseTransactionData` to get a valid data format.
 * @param feeObjects :- {
    feeId1:{feeId,formulae,conditionalStatements:[]}
    feeId2:{feeId,formulae,conditionalStatements:[]}
  }
  @param triggerStepObjects :- Object Label ids of those that trigger fee computation.
 * @returns { feeId1:{feeId,name,formulae,triggers,values,queryData:{objectLabelId1:{ids:[],fields:[]}}} }
 */
export const parseFeesConditionalResult = ({
  objectLabelsData = {},
  feeObjects = {},
  triggerStepObjects = [],
  byPassConditionalStatements = false,
}) => {
  return processFeesConditionalResult({
    objectLabelsData,
    feeObjects,
    triggerStepObjects,
    byPassConditionalStatements,
  });
};

/**
 * Interface
 * Extracts fees's conditions from list of steps
 * @param {*} param0
 * @param steps :- [{fees:[]},{fees:[{id,feeType,formulae,conditions}]}]
 * @returns {feesObject,triggerStepObjects} || false
 */
export const parseExtractFeesWithConditionsFromSteps = ({ steps }) => {
  return processExtractFeesWithConditionsFromSteps({ steps });
};

/**
 * @required objectLabelsData,objectLabelConditions
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
  objectLabelsData,
  objectLabelConditions,
  triggerObjectIds = [],
  removeDuplicates = true,
  byPassConditionalStatements = false,
}) => {
  try {
    return processObjectConditionalResult({
      objectLabelsData,
      objectLabelConditions,
      triggerObjectIds,
      removeDuplicates,
      byPassConditionalStatements,
    });
  } catch (e) {
    return false;
  }
};

/**
 * Extracts object's conditions from a nested step
 * @required stepsData 
 * @param stepsData :- Thi is `steps` object received from the endpoing `transaction/steps`
 * @returns :- {
    objectLabel5: { conditionId7: {objectId,affects,conditionalStatements,objectActions} },
    objectLabel1: { conditionId1: {} },
    objectLabel2: { conditionId3: {} },
  }
 */
export const parseStepsObjectWithConditions = ({ stepsData }) => {
  try {
    return processObjectWithConditions({ stepsData });
  } catch (e) {
    return false;
  }
};

/**
 * Interface
 * Parse data into a format that can be used in conditions
 * @required data
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
