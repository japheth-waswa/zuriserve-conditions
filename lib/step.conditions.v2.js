// import util from "util"; //todo remove this line of code.
import lodash from "lodash";
import moment from "moment";
import { processConditionalStatements } from "./object.conditions.js";
import {
  ASSIGN_RECORD_TYPES,
  DATE_TYPE_CATEGORY_LIST,
  DATE_TYPE_OPERANDS,
  DATE_TYPE_OPERANDS_LIST,
  DB_DATE_FORMAT,
  GLOBAL_CONSTS_LIST,
  GLOBAL_DATA_CONSTS,
  GLOBAL_DATA_CONSTS_DATE_TYPES,
  OBJECT_ACTION_TYPES,
  QUERY_BUILDER_MATCH_TYPES,
} from "../utils/helper.utils.js";

/**
 *
 * @param {*} param0
 * @returns {objectAction:{...objectAction,query:[{...,largedatasetIds}]}largedatasetFields}
 */
const processObjectValueChange = ({
  objectAction,
  objectLabelsData,
  transaction = {},
}) => {
  try {
    const { query, assignType } = objectAction;
    if (lodash.isEmpty(query)) return false;

    let fieldsFound = false;
    let largedatasetFields = {};
    let queryData = [];

    for (const queryItem of query) {
      if (queryItem.matchType === QUERY_BUILDER_MATCH_TYPES.TERM.value) {
        //term
        if (
          lodash.isUndefined(queryItem.value) ||
          (!lodash.isUndefined(queryItem.value) &&
            lodash.isEmpty(queryItem.value.trim()))
        )
          continue;

        //value exists
        queryData.push({ ...queryItem, value: queryItem.value.trim() });
        continue;
      } else if (
        queryItem.matchType ===
        QUERY_BUILDER_MATCH_TYPES.NONLARGEDATASETOBJECTFIELD.value
      ) {
        const { nonlargedataset } = queryItem;
        if (lodash.isEmpty(nonlargedataset)) continue;
        const objectLabelData = objectLabelsData[nonlargedataset];
        if (
          lodash.isEmpty(objectLabelData) ||
          (!lodash.isEmpty(objectLabelData) &&
            lodash.isEmpty(objectLabelData.value)) ||
          (!lodash.isEmpty(objectLabelData) &&
            !lodash.isEmpty(objectLabelData.value) &&
            lodash.isEmpty(objectLabelData.value.data))
        )
          continue;

        //value exists
        queryData.push({ ...queryItem, value: objectLabelData.value.data });
        continue;
      } else if (
        queryItem.matchType === QUERY_BUILDER_MATCH_TYPES.CONSTANTVAR.value
      ) {
        const { globalconst, dateoperand, datecount, datetype } = queryItem;
        let value;
        //ensure globalConst is valid,
        if (GLOBAL_CONSTS_LIST.indexOf(globalconst) === -1) continue;

        if (GLOBAL_DATA_CONSTS_DATE_TYPES.indexOf(globalconst) !== -1) {
          try {
            //process date constants
            const currentDate = moment().format(DB_DATE_FORMAT);
            if (globalconst === GLOBAL_DATA_CONSTS.CURRENT_DAY_TIME.value) {
              value = currentDate;
            } else if (
              globalconst === GLOBAL_DATA_CONSTS.CURRENT_DAY_START.value
            ) {
              value = moment(currentDate).startOf("day").format(DB_DATE_FORMAT);
            } else if (
              globalconst === GLOBAL_DATA_CONSTS.CURRENT_DAY_END.value
            ) {
              value = moment(currentDate).endOf("day").format(DB_DATE_FORMAT);
            } else if (
              globalconst === GLOBAL_DATA_CONSTS.CURRENT_MONTH_START.value
            ) {
              value = moment(currentDate)
                .startOf("month")
                .format(DB_DATE_FORMAT);
            } else if (
              globalconst === GLOBAL_DATA_CONSTS.CURRENT_MONTH_END.value
            ) {
              value = moment(currentDate).endOf("month").format(DB_DATE_FORMAT);
            } else if (
              globalconst === GLOBAL_DATA_CONSTS.CURRENT_YEAR_START.value
            ) {
              value = moment(currentDate)
                .startOf("year")
                .format(DB_DATE_FORMAT);
            } else if (
              globalconst === GLOBAL_DATA_CONSTS.CURRENT_YEAR_END.value
            ) {
              value = moment(currentDate).endOf("year").format(DB_DATE_FORMAT);
            }

            if (
              !lodash.isEmpty(value) &&
              !lodash.isUndefined(dateoperand) &&
              DATE_TYPE_OPERANDS_LIST.indexOf(dateoperand) !== -1 &&
              !lodash.isUndefined(datecount) &&
              !lodash.isUndefined(datetype) &&
              DATE_TYPE_CATEGORY_LIST.indexOf(datetype) !== -1
            ) {
              //extra actions on the date
              if (dateoperand === DATE_TYPE_OPERANDS.ADD.value) {
                value = moment(value)
                  .add(datecount, datetype)
                  .format(DB_DATE_FORMAT);
              } else if (dateoperand === DATE_TYPE_OPERANDS.SUBTRACT.value) {
                value = moment(value)
                  .subtract(datecount, datetype)
                  .format(DB_DATE_FORMAT);
              }
            }
          } catch (e) {
            console.log(e);
          }
        } else if (
          globalconst === GLOBAL_DATA_CONSTS.TRANSACTION_REF_NO.value &&
          !lodash.isEmpty(transaction) &&
          !lodash.isEmpty(transaction.referenceId)
        ) {
          value = transaction.referenceId;
        }

        if (!lodash.isEmpty(value)) {
          //value exists
          queryData.push({ ...queryItem, value });
        }
        continue;
      }

      //largedataset
      const { field, largedataset, largedatasetField } = queryItem;

      if (!lodash.isEmpty(field)) fieldsFound = true;

      //check records
      const objectLabel = objectLabelsData[largedataset] || {};
      const records =
        !lodash.isEmpty(objectLabel.value) &&
        !lodash.isEmpty(objectLabel.value.extras) &&
        !lodash.isEmpty(objectLabel.value.extras.records)
          ? objectLabel.value.extras.records
          : [];
      const recordIds = records
        .filter((item) =>
          !lodash.isUndefined(item.id) || !lodash.isUndefined(item._id)
            ? true
            : false
        )
        .map(({ id, _id }) => id || _id);

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

    // console.log(util.inspect("queryData", false, null, true));
    // console.log(util.inspect(queryData, false, null, true));
    // process.exit();
    if (lodash.isEmpty(queryData)) return false;

    return {
      objectAction: { ...objectAction, query: queryData },
      largedatasetFields,
      isAssignable:
        assignType === ASSIGN_RECORD_TYPES.ASSIGN.value || !fieldsFound
          ? true
          : false,
    };
  } catch (e) {
    console.log(e);
    return e;
  }
};

/**
 *
 * @param {*} param0
 * @returns {objectActionsProcessed:{object1:{actions:[{actionType,objectId,recordType,query}]}}, largedatasetFields,apiObjectIds}
 */
const processObjectActions = ({
  objectActions,
  objectLabelsData,
  processedObject = {},
  largedatasetFields = {},
  transaction = {},
  assignable,
  stepObjectWithTypes,
  apiObjectIds = [],
}) => {
  try {
    if (lodash.isEmpty(objectActions))
      return {
        objectActionsProcessed: processedObject,
        largedatasetFields,
        apiObjectIds,
      };
    const objectAction = objectActions.shift();

    if (!objectAction.objectId)
      return processObjectActions({
        objectActions,
        objectLabelsData,
        processedObject,
        largedatasetFields,
        transaction,
        assignable,
        stepObjectWithTypes,
        apiObjectIds,
      });

    //check if typeof api
    if (
      !lodash.isEmpty(stepObjectWithTypes) &&
      !lodash.isEmpty(stepObjectWithTypes[objectAction.objectId]) &&
      stepObjectWithTypes[objectAction.objectId] === "api"
    )
      apiObjectIds = Array.from(
        new Set([...apiObjectIds, objectAction.objectId])
      );

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
        transaction,
      });

      if (
        (res !== false && !assignable) ||
        (res !== false && assignable && res.isAssignable === true)
      ) {
        hasChangeValue = true;

        // console.log(util.inspect(res, false, null, true));
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
        transaction,
        assignable,
        stepObjectWithTypes,
        apiObjectIds,
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
      transaction,
      assignable,
      stepObjectWithTypes,
      apiObjectIds,
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
  assignable,
  withSaveDraft,
  withSuccessObjectConditions,
  withSaveDraftObjectIds,
  transaction = {},
  stepObjectWithTypes,
}) => {
  try {
    if (lodash.isEmpty(conditions)) return parsedData;

    const condition = conditions.shift();

    const {
      conditionalStatements,
      stepActions,
      objectActions,
      transactionAction,
      triggerSaveDraft,
    } = condition;

    //no need for further processing no conditional statements
    if (lodash.isEmpty(conditionalStatements))
      return processEachCondition({
        conditions,
        objectLabelsData,
        parsedData,
        assignable,
        withSaveDraft,
        withSuccessObjectConditions,
        withSaveDraftObjectIds,
        transaction,
        stepObjectWithTypes,
      });

    //compute conditional statement
    const conditionalStatementStatus = processConditionalStatements({
      conditionalStatements: lodash.cloneDeep(conditionalStatements),
      objectLabelsData: lodash.cloneDeep(objectLabelsData),
      forType: "forGlobal",
    });
    // console.log("---------------------");
    // console.log({
    //   conditionalStatements,
    //   conditionalStatementStatus,
    // });

    if (!conditionalStatementStatus)
      return processEachCondition({
        conditions,
        objectLabelsData,
        parsedData,
        assignable,
        withSaveDraft,
        withSuccessObjectConditions,
        withSaveDraftObjectIds,
        transaction,
        stepObjectWithTypes,
      });

    //process step actions
    const processedStepActions = processStepActions({
      stepActions: lodash.cloneDeep(stepActions),
    });

    //process object actions
    const { objectActionsProcessed, largedatasetFields, apiObjectIds } =
      processObjectActions({
        objectActions: lodash.cloneDeep(objectActions),
        objectLabelsData: lodash.cloneDeep(objectLabelsData),
        assignable,
        transaction,
        stepObjectWithTypes,
      });

    let returnData = {};
    if (!lodash.isEmpty(processedStepActions)) {
      returnData = { ...returnData, stepActions: processedStepActions };
    }
    if (!lodash.isEmpty(objectActionsProcessed)) {
      returnData = { ...returnData, objectActions: objectActionsProcessed };
    }
    if (!lodash.isEmpty(transactionAction)) {
      returnData = { ...returnData, transactionAction };
    }
    if (!lodash.isEmpty(largedatasetFields)) {
      returnData = { ...returnData, largedatasetFields };
    }
    if (!lodash.isEmpty(apiObjectIds)) {
      returnData = { ...returnData, apiObjectIds, triggerSaveDraft: true };
    }

    if (
      !lodash.isUndefined(triggerSaveDraft) &&
      String(triggerSaveDraft) === "1"
    ) {
      returnData = { ...returnData, triggerSaveDraft: true };
    }

    if (
      withSuccessObjectConditions ||
      (withSaveDraftObjectIds && returnData.triggerSaveDraft)
    ) {
      //parse success conditions objects
      let successConditionObjects = {};
      for (const { objectId } of conditionalStatements) {
        if (objectId)
          successConditionObjects = {
            ...successConditionObjects,
            [objectId]: objectId,
          };
      }

      if (!lodash.isEmpty(successConditionObjects)) {
        returnData = {
          ...returnData,
          successConditionObjects,
        };
      }
      if (
        !lodash.isEmpty(successConditionObjects) &&
        withSaveDraftObjectIds &&
        returnData.triggerSaveDraft
      ) {
        returnData = {
          ...returnData,
          saveDraftObjects: successConditionObjects,
        };
      }
    }

    if (lodash.isEmpty(returnData))
      return processEachCondition({
        conditions,
        objectLabelsData,
        parsedData,
        assignable,
        withSaveDraft,
        withSuccessObjectConditions,
        withSaveDraftObjectIds,
        transaction,
        stepObjectWithTypes,
      });

    return processEachCondition({
      conditions,
      objectLabelsData,
      parsedData: [...parsedData, { ...returnData }],
      assignable,
      withSaveDraft,
      withSuccessObjectConditions,
      withSaveDraftObjectIds,
      transaction,
      stepObjectWithTypes,
    });
  } catch (e) {
    console.log(e);
  }
};

/**
 *
 * @param {*} param0
 * @returns [{},{stepActions,objectActions,largedatasetFields,transactionAction}]
 */
export const processStepConditionsV2 = ({
  objectLabelsData = {},
  conditions = [],
  assignable = false,
  withSaveDraft = false,
  withSaveDraftObjectIds = false,
  withSuccessObjectConditions = false,
  transaction = {},
  stepObjectWithTypes,
}) => {
  try {
    if (lodash.isEmpty(conditions)) return false;
    // if (lodash.isEmpty(objectLabelsData) || lodash.isEmpty(conditions))
    //   return false;
    if (!lodash.isPlainObject(objectLabelsData)) objectLabelsData = {};

    const res = processEachCondition({
      conditions: lodash.cloneDeep(conditions),
      objectLabelsData: lodash.cloneDeep(objectLabelsData),
      assignable,
      withSaveDraft,
      withSuccessObjectConditions,
      withSaveDraftObjectIds,
      transaction,
      stepObjectWithTypes,
    });
    if (res === false) return false;

    if (lodash.isEmpty(res)) return false;

    //consolidate to remove duplicates
    let objectActions = {},
      stepActions = {},
      transactionAction,
      triggerSaveDraft,
      largedatasetFields = {},
      successConditionObjects = {},
      saveDraftObjects = {},
      apiObjectIds = [];

    for (const {
      objectActions: objectActionsLoop,
      stepActions: stepActionsLoop,
      largedatasetFields: largedatasetFieldsLoop,
      transactionAction: transactionActionItem,
      triggerSaveDraft: triggerSaveDraftItem,
      successConditionObjects: successConditionObjectsItem,
      saveDraftObjects: saveDraftObjectsItem,
      apiObjectIds: apiObjectIdsLoop,
    } of res) {
      if (!lodash.isEmpty(objectActionsLoop))
        objectActions = { ...objectActions, ...objectActionsLoop };
      if (!lodash.isEmpty(stepActionsLoop))
        stepActions = { ...stepActions, ...stepActionsLoop };
      if (!lodash.isEmpty(transactionActionItem))
        transactionAction = transactionActionItem;
      if (!lodash.isEmpty(apiObjectIdsLoop))
        apiObjectIds = Array.from(
          new Set([...apiObjectIds, ...apiObjectIdsLoop])
        );

      if (!lodash.isEmpty(successConditionObjectsItem))
        successConditionObjects = {
          ...successConditionObjects,
          ...successConditionObjectsItem,
        };

      if (!lodash.isEmpty(saveDraftObjectsItem))
        saveDraftObjects = {
          ...saveDraftObjects,
          ...saveDraftObjectsItem,
        };

      if (triggerSaveDraftItem) triggerSaveDraft = triggerSaveDraftItem;

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
    // console.log("===objectActions===");
    // console.log(objectActions);
    // console.log("===apiObjectIds===");
    // console.log(apiObjectIds);

    let returnPayload = {
      objectActions,
      stepActions,
      largedatasetFields,
    };
    if (!lodash.isEmpty(transactionAction))
      returnPayload.transactionAction = transactionAction;

    if (!lodash.isUndefined(triggerSaveDraft))
      returnPayload.triggerSaveDraft = triggerSaveDraft;

    if (withSuccessObjectConditions && !lodash.isEmpty(successConditionObjects))
      returnPayload.successConditionObjects = Object.keys(
        successConditionObjects
      );
    if (withSaveDraftObjectIds && !lodash.isEmpty(saveDraftObjects))
      returnPayload.saveDraftObjects = Object.keys(saveDraftObjects);

    if (!lodash.isEmpty(apiObjectIds)) {
      returnPayload.apiObjectIds = apiObjectIds;
      // if (withSaveDraft) returnPayload.triggerSaveDraft = true;
    }

    // console.log(JSON.stringify({ ...returnPayload }));
    // console.log("...returnPayload");

    return {
      ...returnPayload,
    };
  } catch (e) {
    console.log(e);
  }
};

/**
 * Prepares query list
 * @param {*} param0
 * @param transaction :- {referenceId}
 * @returns {query:[]}
 */
export const processQueryList = ({
  queryList,
  objectLabelsData,
  transaction = {},
}) => {
  try {
    let query = [];

    if (lodash.isEmpty(queryList) || lodash.isEmpty(objectLabelsData))
      return { query };

    const objectId = "processQueryListObjectId";
    const objectActions = [
      {
        objectActionType: "changeValue",
        objectId,
        query: [...queryList],
      },
    ];

    const res = processObjectActions({
      objectActions,
      objectLabelsData,
      transaction,
    });

    if (res === false || (res !== false && !lodash.isPlainObject(res)))
      return { query };

    if (lodash.isEmpty(res.objectActionsProcessed)) return { query };

    //get the data
    const payload = res.objectActionsProcessed[objectId] || {};
    const { actions } = payload;
    if (lodash.isEmpty(actions)) return { query };
    const { query: queryPayload } = actions[0];

    if (lodash.isEmpty(queryPayload)) return { query };

    return { query: queryPayload };
  } catch (e) {
    console.log(e);
    return e;
  }
};
