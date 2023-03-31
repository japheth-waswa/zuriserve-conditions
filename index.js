import { processConditionObjectValue } from "./lib/condition.object.value.js";
import {
  processExtractFeesWithConditionsFromFeeGroups,
  processExtractFeesWithConditionsFromSteps,
  processGlobalConditionalStatementsExtractor,
  processObjectWithConditions,
} from "./lib/conditions.extractor.js";
import {
  processEndResultVarGroup,
  processEndResultVars,
} from "./lib/endresult.processor.js";
import { processFeesConditionalResult } from "./lib/fee.conditions.js";
import {
  extractFormulaeVariables,
  formulaeValidate,
} from "./lib/formulae.validation.js";
import {
  processConditionalStatements,
  processObjectConditionalResult,
} from "./lib/object.conditions.js";
import { processStepConditions } from "./lib/step.conditions.js";
import {
  processQueryList,
  processStepConditionsV2,
} from "./lib/step.conditions.v2.js";
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
 * todo add method to test formulae format,ie just replace all variable with 1 then eval() the formulae, return true or false.
 */

export const OBJECT_SECTIONS_BINDER = OBJECT_SECTIONS_BINDER_UTIL;
export const LARGEDATASET_FIELD_OPENING_CLOSING_TAGS =
  LARGEDATASET_FIELD_OPENING_CLOSING_TAGS_UTIL;
export const OBJECTLABEL_FIELD_VALUE_OPENING_CLOSING_TAGS =
  OBJECTLABEL_FIELD_VALUE_OPENING_CLOSING_TAGS_UTIL;
export const OBJECTLABEL_LARGEDATASET_FIELD_OPENING_CLOSING_TAGS =
  OBJECTLABEL_LARGEDATASET_FIELD_OPENING_CLOSING_TAGS_UTIL;

/**
 * Returns the object's changed value if it does not contain any largedataset
 * @param {*} param0
 * @returns {query:[]}
 */
export const parseConditionObjectValue = ({ query }) => {
  return processConditionObjectValue({ query });
};

/**
 * Prepares query list
 * @param {*} param0
 * @returns {query:[]}
 */
export const parseQueryList = ({
  queryList,
  objectLabelsData,
  transaction = {},
}) => {
  return processQueryList({ queryList, objectLabelsData, transaction });
};

/**
 * Computes step condition(s) v2
 * @param {*} param0
 * @returns [{},{stepActions,objectActions,largedatasetFields}]
 */
export const parseStepConditionsV2 = ({
  objectLabelsData = {},
  conditions = [],
  assignable = false,
  withSaveDraft = false,
  withSaveDraftObjectIds = false,
  withSuccessObjectConditions = false,
}) => {
  return processStepConditionsV2({
    objectLabelsData,
    conditions,
    assignable,
    withSaveDraft,
    withSaveDraftObjectIds,
    withSuccessObjectConditions,
  });
};

/**
 * Computes step condition(s)
 * @param {*} param0
 * @returns [{},{stepActions,objectActions,largedatasetFields}]
 */
export const parseStepConditions = ({
  objectLabelsData = {},
  conditions = [],
}) => {
  return processStepConditions({
    objectLabelsData,
    conditions,
  });
};

/**
 *
 * Globally compute conditional statements
 * @param {*} param0
 * @param conditionalStatements :- use the method `parseGlobalConditionalStatementsExtractor` to get this []
 * @param objectLabelsData :- use the method `parseTransactionData` to get this {}
 * @returns true | false
 */
export const parseConditionalStatements = ({
  conditionalStatements,
  objectLabelsData,
}) => {
  return processConditionalStatements({
    conditionalStatements,
    objectLabelsData,
    forType: "forGlobal",
  });
};

/**
 *
 * Extracts conditional statements
 * @param {*} param0
 * @param conditions :- {"0de2c604-8e93-4a04-8b58-276a2a50eab5" : {conditionId,conditionalStatements:[]},"1de2c604-8e93-4a04-8b58-276a2a50eab9" : {conditionId,conditionalStatements:[]}}
 * @returns {conditionalStatements:[[],[],[]]} || false
 */
export const parseGlobalConditionalStatementsExtractor = ({ conditions }) => {
  return processGlobalConditionalStatementsExtractor({ conditions });
};

/**
 * Extract data variables from content string from the editor.
 * @param {*} param0
 * @returns {objects:{},fees:{},statics:[],formulaes:{}}
 */
export const parseEndResultVarGroup = ({ contentString }) => {
  return processEndResultVarGroup({ contentString });
};

/**
 * Extract endresult variables
 * @param {*} param0
 * @returns {objects:{backoffice:{objectLabel1:{}},client:{objectLabel2:{}}},fees:{backoffice:{stepFeeId1:{name}}}}
 */
export const parseEndResultVars = ({ stepsList }) => {
  return processEndResultVars({ stepsList });
};

/**
 * Computes formulae to validate whether it computes successfuly.
 * @param {*} param0
 * @returns int | float | string
 */
export const parseFormulaeValidate = ({ formulae, formulaeData = {} }) => {
  return formulaeValidate({ formulae, formulaeData });
};

/**
 * Extract formulae variables from the formulae
 * @param {*} param0
 * @returns {formulaeVar1:formulaeVar1,formulaeVar2:formulaeVar2}
 */
export const parseExtractFormulaeVariables = ({ formulae }) => {
  return extractFormulaeVariables({ formulae });
};

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
 * Extracts fees's conditions from list of fee groups
 * @param {*} param0
 * @param feeGroups :- [{feeGroupFees:[]},{feeGroupFees:[{id,feeType,formulae,conditions}]}]
 * @returns {feesObject,triggerStepObjects} || false
 */
export const parseExtractFeesWithConditionsFromFeeGroups = ({ feeGroups }) => {
  return processExtractFeesWithConditionsFromFeeGroups({ feeGroups });
};

/**
 * Interface
 * Extracts fees's conditions from list of steps
 * @param {*} param0
 * @param steps :- [{fees:[]},{fees:[{id,name,feeType,formulae,conditions,triggerStepObjects}]}]
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
