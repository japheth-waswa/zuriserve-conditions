// import util from "util"; //todo remove this line of code.
import lodash from "lodash";
import { processConditionalStatements } from "./object.conditions.js";
import {
  OBJECT_ACTION_TYPES,
  QUERY_BUILDER_MATCH_TYPES,
} from "../utils/helper.utils.js";

/**
 *
 * @param {*} param0
 * @returns {objectAction:{...objectAction,query:[{...,largedatasetIds}]}largedatasetFields}
 */
const processObjectValueChange = ({ objectAction, objectLabelsData }) => {
  try {
    const { query } = objectAction;
    if (lodash.isEmpty(query)) return false;

    let largedatasetFields = {};
    let queryData = [];
    for (const queryItem of query) {
      if (queryItem.matchType === QUERY_BUILDER_MATCH_TYPES.TERM.value) {
        if (
          lodash.isUndefined(queryItem.value) ||
          (!lodash.isUndefined(queryItem.value) &&
            lodash.isEmpty(queryItem.value.trim()))
        )
          continue;

        queryData.push({ ...queryItem, value: queryItem.value.trim() });
        continue;
      }

      //largedataset
      const { largedataset, largedatasetField } = queryItem;

      //check records
      const objectLabel = objectLabelsData[largedataset] || {};
      const records =
        !lodash.isEmpty(objectLabel.value) &&
        !lodash.isEmpty(objectLabel.value.extras) &&
        !lodash.isEmpty(objectLabel.value.extras.records)
          ? objectLabel.value.extras.records
          : [];
      const recordIds = records
        .filter((item) => (!lodash.isUndefined(item.id) ? true : false))
        .map(({ id }) => id);

      //no record ids
      if (lodash.isEmpty(recordIds)) continue;

      //create set to remove duplicate ids
      const recordIdsSet = new Set(recordIds);

      //add query
      queryData.push({
        ...queryItem,
        largedatasetIds: [...Array.from(recordIdsSet)],
      });

      //save its fields
      if (lodash.isEmpty(largedataset) || lodash.isEmpty(largedatasetField))
        continue;
      if (lodash.isEmpty(largedatasetFields[largedataset])) {
        largedatasetFields[largedataset] = [largedatasetField];
      } else {
        largedatasetFields[largedataset] = Array.from(
          new Set([...largedatasetFields[largedataset], largedatasetField])
        );
      }
    }
    if (lodash.isEmpty(queryData)) return false;

    return {
      objectAction: { ...objectAction, query: queryData },
      largedatasetFields,
    };
  } catch (e) {
    console.log(e);
    return e;
  }
};

/**
 *
 * @param {*} param0
 * @returns {objectActionsProcessed:{object1:{actions:[{actionType,objectId,recordType,query}]}}, largedatasetFields}
 */
const processObjectActions = ({
  objectActions,
  objectLabelsData,
  processedObject = {},
  largedatasetFields = {},
}) => {
  try {
    if (lodash.isEmpty(objectActions))
      return { objectActionsProcessed: processedObject, largedatasetFields };
    const objectAction = objectActions.shift();

    if (!objectAction.objectId)
      return processObjectActions({
        objectActions,
        objectLabelsData,
        processedObject,
        largedatasetFields,
      });

    let actionData = { actionType: objectAction.objectActionType };
    delete objectAction.objectActionType;

    let hasChangeValue = false;
    if (
      actionData.actionType === OBJECT_ACTION_TYPES.RESTRICTVALUE.value &&
      objectAction.min &&
      objectAction.max
    ) {
      actionData = {
        min: objectAction.min,
        max: objectAction.max,
      };
    } else if (
      actionData.actionType === OBJECT_ACTION_TYPES.CHANGEVALUE.value
    ) {
      const res = processObjectValueChange({
        objectAction: lodash.cloneDeep(objectAction),
        objectLabelsData: lodash.cloneDeep(objectLabelsData),
      });

      if (res !== false) {
        hasChangeValue = true;

        actionData = { ...actionData, ...res.objectAction };

        //include largedataset fields
        if (!lodash.isEmpty(res.largedatasetFields)) {
          for (const largedatasetFieldId of Object.keys(
            res.largedatasetFields
          )) {
            if (lodash.isEmpty(largedatasetFields[largedatasetFieldId])) {
              largedatasetFields[largedatasetFieldId] =
                res.largedatasetFields[largedatasetFieldId];
            } else {
              largedatasetFields[largedatasetFieldId] = Array.from(
                new Set([
                  ...largedatasetFields[largedatasetFieldId],
                  ...res.largedatasetFields[largedatasetFieldId],
                ])
              );
            }
          }
        }
      }
    }

    //check if action data is empty
    if (lodash.isEmpty(actionData))
      return processObjectActions({
        objectActions,
        objectLabelsData,
        processedObject,
        largedatasetFields,
      });

    if (lodash.isUndefined(processedObject[objectAction.objectId])) {
      processedObject = {
        ...processedObject,
        [objectAction.objectId]: {
          hasChangeValue,
          actions: [{ ...actionData }],
        },
      };
    } else {
      processedObject[objectAction.objectId].actions.push({ ...actionData });
      if (hasChangeValue)
        processedObject[objectAction.objectId].hasChangeValue = hasChangeValue;
    }

    return processObjectActions({
      objectActions,
      objectLabelsData,
      processedObject,
      largedatasetFields,
    });
  } catch (e) {
    console.log(e);
    return false;
  }
};

/**
 *
 * @param {*} param0
 * @returns {step1:{actions:[{actionType:'hide'}]}}
 */
const processStepActions = ({ stepActions, processedObject = {} }) => {
  try {
    if (lodash.isEmpty(stepActions)) return processedObject;
    const stepAction = stepActions.shift();

    if (
      ["show", "hide"].indexOf(stepAction.stepAction) < 0 ||
      !stepAction.stepId
    )
      return processStepActions({
        stepActions,
        processedObject,
      });

    const actionData = { actionType: stepAction.stepAction };

    if (lodash.isUndefined(processedObject[stepAction.stepId])) {
      processedObject = {
        ...processedObject,
        [stepAction.stepId]: { actions: [{ ...actionData }] },
      };
    } else {
      processedObject[stepAction.stepId].actions.push({ ...actionData });
    }

    return processStepActions({
      stepActions,
      processedObject,
    });
  } catch (e) {
    console.log(e);
    return false;
  }
};

/**
 *
 * @param {*} param0
 * @returns [{},{stepActions,objectActions,largedatasetFields}]
 */
const processEachCondition = ({
  conditions,
  objectLabelsData,
  parsedData = [],
}) => {
  try {
    if (lodash.isEmpty(conditions)) return parsedData;

    const condition = conditions.shift();

    const { conditionalStatements, stepActions, objectActions } = condition;

    //no need for further processing no conditional statements
    if (lodash.isEmpty(conditionalStatements))
      return processEachCondition({
        conditions,
        objectLabelsData,
        parsedData,
      });

    //compute conditional statement
    const conditionalStatementStatus = processConditionalStatements({
      conditionalStatements: lodash.cloneDeep(conditionalStatements),
      objectLabelsData: lodash.cloneDeep(objectLabelsData),
      forType: "forGlobal",
    });

    if (!conditionalStatementStatus)
      return processEachCondition({
        conditions,
        objectLabelsData,
        parsedData,
      });

    //process step actions
    const processedStepActions = processStepActions({
      stepActions: lodash.cloneDeep(stepActions),
    });

    //process object actions
    const { objectActionsProcessed, largedatasetFields } = processObjectActions(
      {
        objectActions: lodash.cloneDeep(objectActions),
        objectLabelsData: lodash.cloneDeep(objectLabelsData),
      }
    );

    let returnData = {};
    if (!lodash.isEmpty(processedStepActions)) {
      returnData = { ...returnData, stepActions: processedStepActions };
    }
    if (!lodash.isEmpty(objectActionsProcessed)) {
      returnData = { ...returnData, objectActions: objectActionsProcessed };
    }
    if (!lodash.isEmpty(largedatasetFields)) {
      returnData = { ...returnData, largedatasetFields };
    }

    if (lodash.isEmpty(returnData))
      return processEachCondition({
        conditions,
        objectLabelsData,
        parsedData,
      });

    return processEachCondition({
      conditions,
      objectLabelsData,
      parsedData: [...parsedData, { ...returnData }],
    });
  } catch (e) {
    console.log(e);
  }
};

/**
 *
 * @param {*} param0
 * @returns [{},{stepActions,objectActions,largedatasetFields}]
 */
export const processStepConditions = ({
  objectLabelsData = {},
  conditions = [],
}) => {
  try {
    if (lodash.isEmpty(objectLabelsData) || lodash.isEmpty(conditions))
      return false;

    const res = processEachCondition({
      conditions: lodash.cloneDeep(conditions),
      objectLabelsData: lodash.cloneDeep(objectLabelsData),
    });
    if (res === false) return false;

    if (lodash.isEmpty(res)) return false;

    //consolidate to remove duplicates
    let objectActions = {},
      stepActions = {},
      largedatasetFields = {};
    for (const {
      objectActions: objectActionsLoop,
      stepActions: stepActionsLoop,
      largedatasetFields: largedatasetFieldsLoop,
    } of res) {
      if (!lodash.isEmpty(objectActionsLoop))
        objectActions = { ...objectActions, ...objectActionsLoop };
      if (!lodash.isEmpty(stepActionsLoop))
        stepActions = { ...stepActions, ...stepActionsLoop };
      if (!lodash.isEmpty(largedatasetFieldsLoop)) {
        for (const objectLabelId of Object.keys(largedatasetFieldsLoop)) {
          const fields = largedatasetFieldsLoop[objectLabelId];
          const existingFields = largedatasetFields[objectLabelId] || [];
          largedatasetFields = {
            ...largedatasetFields,
            [objectLabelId]: Array.from(
              new Set([...existingFields, ...fields])
            ),
          };
        }
      }
    }
    return { objectActions, stepActions, largedatasetFields };
  } catch (e) {
    console.log(e);
  }
};
