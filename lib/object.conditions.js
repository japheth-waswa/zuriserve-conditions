// import util from "util"; //todo remove this line when publishing to npm

const SAME_ACTION_GROUP = {
  showHide: ["show", "hide"],
};

//binds together grouped actions such as hide & show which either is to be executed but not both.
const processGroupedActions = ({ parsedActions }) => {
  try {
    //parse those in the same group
    let parsedGroup = {};
    for (const action of Object.values(parsedActions)) {
      //check if action in either of the groups
      let isGrouped = false;
      let groupedKey;
      for (const groupKey of Object.keys(SAME_ACTION_GROUP)) {
        if (SAME_ACTION_GROUP[groupKey].indexOf(action.actionType) > -1) {
          isGrouped = true;
          groupedKey = groupKey;
        }
      }

      if (isGrouped && groupedKey) {
        //add to parsed group
        parsedGroup[groupedKey] = action;
        //remove from parsed actions
        delete parsedActions[action.actionType];
      }
    }

    //add the grouped back to parsedActions
    if (Object.keys(parsedGroup).length > 0) {
      for (const action of Object.values(parsedGroup)) {
        parsedActions[action.actionType] = action;
      }
    }

    return parsedActions;
  } catch (e) {
    console.log(e);
    return parsedActions;
  }
};

//removes duplicate actions in an object or step
const processRemoveDuplicateActions = ({ data }) => {
  try {
    //todo you need to do grouping of simalar actions for example 'hide' & 'show' cancel out.
    //work on objects
    if (data.effects && data.effects.objects) {
      let objectLabels = data.effects.objects;
      const objectLabelIds = Object.keys(data.effects.objects);
      for (const objectLabelId of objectLabelIds) {
        const actions = objectLabels[objectLabelId].actions || [];

        if (actions.length <= 0) continue;

        let parsedActions = {};
        for (const action of actions) {
          //removes duplicates,by retaining the last record.
          parsedActions[action.actionType] = action;
        }

        //process grouped actions
        parsedActions = processGroupedActions({ parsedActions });
        //re-assign back
        objectLabels[objectLabelId].actions = Object.values(parsedActions);
      }
      //re-assign back
      data.effects.objects = objectLabels;
    }

    if (data.effects && data.effects.steps) {
      let steps = data.effects.steps;
      const stepIds = Object.keys(data.effects.steps);
      for (const stepId of stepIds) {
        const actions = steps[stepId].actions || [];

        if (actions.length <= 0) continue;

        let parsedActions = {};
        for (const action of actions) {
          //removes duplicates,by retaining the last record.
          parsedActions[action.actionType] = action;
        }

        //process grouped actions
        parsedActions = processGroupedActions({ parsedActions });
        //re-assign back
        steps[stepId].actions = Object.values(parsedActions);
      }
      //re-assign back
      data.effects.steps = steps;
    }
    // console.log(util.inspect(data, false, null, true));process.exit();
    return { ...data };
  } catch (e) {
    //console.log(util.inspect(e, false, null, true));
    console.log(e);
    return e;
  }
};

//process object that its value changes,this is for querying largedataset(s)
const processObjectChangeValue = ({ objectAction, objectLabelsData }) => {
  try {
    //todo we have not implement greater than,less than,... etc when value is changed.First change in react then come update this method
    if (["term", "objectField"].indexOf(objectAction.matchType) < 0) {
      console.log('Either "term", "objectField" not set');
      return false;
    }

    let returnObject = {
      isDb: true,
      actionType: objectAction.objectActionType,
      matchType: objectAction.matchType,
      filterField: objectAction.filterField,
    };

    if (
      (objectAction.matchType === "term" &&
        (!objectAction.filterTerm ||
          (objectAction.filterTerm &&
            objectAction.filterTerm.trim().length <= 0))) ||
      !Array.isArray(objectAction.filterField) ||
      (Array.isArray(objectAction.filterField) &&
        objectAction.filterField.length <= 0)
    ) {
      console.log("objectAction.filterField not set or not valid array");
      return false;
    } else if (objectAction.matchType === "term") {
      returnObject.filterTerm = objectAction.filterTerm;

      const filterField = [...returnObject.filterField].map(
        (item) => `\`${item}\`='${returnObject.filterTerm}'`
      );
      returnObject.queryInfo = ` Query largedataset linked to object label \`${
        objectAction.objectId
      }\` where ${filterField.join(" or ")} `;
    } else if (
      objectAction.matchType === "objectField" &&
      (!Array.isArray(objectAction.filterField) ||
        (Array.isArray(objectAction.filterField) &&
          objectAction.filterField.length <= 0) ||
        !objectAction.filterObjectId ||
        !Array.isArray(objectAction.filterObjectFields) ||
        (Array.isArray(objectAction.filterObjectFields) &&
          objectAction.filterObjectFields.length <= 0))
    ) {
      console.log(
        "objectAction.filterField or objectAction.filterObjectFields not set or not valid array"
      );
      return false;
    } else if (objectAction.matchType === "objectField") {
      //get the data for objectAction.filterObjectId
      const filterObjectData = objectLabelsData[objectAction.filterObjectId];

      if (
        !filterObjectData ||
        (filterObjectData && !filterObjectData.value) ||
        (filterObjectData &&
          filterObjectData.value &&
          !filterObjectData.value.extras) ||
        (filterObjectData &&
          filterObjectData.value &&
          filterObjectData.value.extras &&
          !filterObjectData.value.extras.records) ||
        (filterObjectData &&
          filterObjectData.value &&
          filterObjectData.value.extras &&
          filterObjectData.value.extras.records &&
          !Array.isArray(filterObjectData.value.extras.records)) ||
        (filterObjectData &&
          filterObjectData.value &&
          filterObjectData.value.extras &&
          filterObjectData.value.extras.records &&
          Array.isArray(filterObjectData.value.extras.records) &&
          filterObjectData.value.extras.records.length <= 0)
      ) {
        console.log("`value` field in transaction data is not valid");
        return false;
      }

      returnObject.filterObjectId = objectAction.filterObjectId;
      returnObject.filterObjectFields = objectAction.filterObjectFields;

      // filterObjectData.value.extras.records.push({
      //   countryoforigin: "kenya",
      //   id: "4541802410001adf705cf037",
      // }); //testing...

      let ids = [];
      if (filterObjectData.value.extras.records.length == 1) {
        returnObject.filterObjectValue =
          filterObjectData.value.extras.records[0];

        if (!returnObject.filterObjectValue.id) {
          console.log("filterObjectValue.id not set");
          return false;
        }
        //set ids
        ids = [...ids, returnObject.filterObjectValue.id];
      } else {
        returnObject.filterObjectValue =
          filterObjectData.value.extras.records.filter((item) =>
            item.id ? true : false
          ); //ensure it has id field
        //set ids
        ids = returnObject.filterObjectValue.map((item) => item.id);
      }
      let isPlainObject = ids.length == 1;
      returnObject.isPlainObject = isPlainObject;
      // console.log(util.inspect("---------passed---------", false, null, true));
      // console.log(util.inspect(returnObject, false, null, true));
      // process.exit();

      let queryInfo = ` Query largedataset linked to object label \`${
        returnObject.filterObjectId
      }\` select (\`${objectAction.filterObjectFields.join("`,`")}\`) `;

      if (isPlainObject) {
        queryInfo = `${queryInfo}where \`id\`='${ids.join(",")}'. `;
      } else {
        queryInfo = `${queryInfo}where \`id\` in (\`${ids.join("`,`")}\`). `;
      }

      // returnObject.filterField.push("Brand"); //testing...
      // returnObject.filterField.pop(); //testing...
      // returnObject.filterObjectFields.pop(); //testing...

      let rootBinder = "or";
      let idsQueryFields = [];
      let idsWhereFields = [];
      for (const id of ids) {
        let idQueryFields = [];
        let idWhereFields = [];
        let filterFieldHasExtraFields = false;
        for (const index in returnObject.filterObjectFields) {
          let filterFieldIndex = index;
          if (
            !returnObject.filterField[index] &&
            !returnObject.filterField[0]
          ) {
            continue;
          } else if (
            !returnObject.filterField[index] &&
            returnObject.filterField[0]
          ) {
            filterFieldIndex = 0;
          }
          //equalize
          idQueryFields = [
            ...idQueryFields,
            ` \`${returnObject.filterField[filterFieldIndex]}\`=valueOf:-'${id}.${returnObject.filterObjectFields[index]}' `,
          ];
          idWhereFields = [
            ...idWhereFields,
            {
              field: returnObject.filterField[filterFieldIndex],
              valueOf: `${id}.${returnObject.filterObjectFields[index]}`,
            },
          ];

          //check if returnObject.filterField has extra fields,which in this case will never be hit.
          //This implies the array in filterField is not the same size as array in filterObjectFields
          if (
            returnObject.filterField.length >
            returnObject.filterObjectFields.length
          ) {
            const extraFilterFieldList = [...returnObject.filterField];
            extraFilterFieldList.splice(
              0,
              returnObject.filterObjectFields.length
            );
            if (extraFilterFieldList.length > 0) {
              filterFieldHasExtraFields = true;
              for (const fieldName of extraFilterFieldList) {
                //equalize
                idQueryFields = [
                  ...idQueryFields,
                  ` \`${fieldName}\`=valueOf:-'${id}.${returnObject.filterObjectFields[index]}' `,
                ];
                idWhereFields = [
                  ...idWhereFields,
                  {
                    field: fieldName,
                    valueOf: `${id}.${returnObject.filterObjectFields[index]}`,
                  },
                ];
              }
            }
          }
        }
        // console.log(util.inspect(idQueryFields, false, null, true));
        // console.log(util.inspect(idWhereFields, false, null, true));
        // process.exit();
        //comibine with or
        const binder = filterFieldHasExtraFields
          ? "or"
          : isPlainObject
          ? "or"
          : "and";
        const prepender = isPlainObject ? "" : "(";
        const appender = isPlainObject ? "" : ")";
        idsQueryFields =
          idQueryFields.length > 0
            ? [
                ...idsQueryFields,
                `${prepender}${idQueryFields.join(binder)}${appender}`,
              ]
            : [...idsQueryFields];
        idsWhereFields =
          idWhereFields.length > 0
            ? [
                ...idsWhereFields,
                { group: !isPlainObject, binder, where: idWhereFields },
              ]
            : [...idsWhereFields];
      }

      //prepare query data
      returnObject.queryData = {
        largeDatasetQueryValue: {
          objectLabelId: returnObject.filterObjectId,
          fields: objectAction.filterObjectFields,
          where: { ids: [...ids] },
        },
        largeDatasetQueryData: {
          objectLabelId: objectAction.objectId,
          rootBinder,
          query: idsWhereFields,
        },
      };

      //query info
      queryInfo = `${queryInfo} Query largedataset linked to object label \`${
        objectAction.objectId
      }\` where ${idsQueryFields.join(` ${rootBinder} `)} `;
      returnObject.queryInfo = queryInfo;

      // console.log(util.inspect("---------passed---------", false, null, true));
      // console.log(
      //   util.inspect(filterObjectData.value.extras.records, false, null, true)
      // );
      // console.log(util.inspect(returnObject, false, null, true));
      // // console.log(util.inspect(idsSelectFields, false, null, true));
      // // console.log(util.inspect(idsQueryFields, false, null, true));
      // // console.log(util.inspect(idsWhereFields, false, null, true));
      // console.log(util.inspect(queryInfo, false, null, true));
      // process.exit();
    }
    // console.log(
    //   util.inspect("----------return object--------------", false, null, true)
    // );
    // console.log(util.inspect(returnObject, false, null, true));
    // process.exit();
    return { ...returnObject };
  } catch (e) {
    console.log(e);
    return e;
  }
};

//process object actions
const processObjectActions = ({
  objectActions,
  objectLabelsData,
  processedObject,
  triggerObjectIds,

  removeDuplicates,
}) => {
  try {
    if (objectActions.length <= 0) return processedObject;
    const objectAction = objectActions.shift();

    if (!objectAction.objectId)
      return processObjectActions({
        objectActions,
        objectLabelsData,
        processedObject,
        triggerObjectIds,

        removeDuplicates,
      });

    let actionData = {};
    if (["hide", "show"].indexOf(objectAction.objectActionType) >= 0) {
      actionData = {
        actionType: objectAction.objectActionType,
      };
    } else if (
      objectAction.objectActionType === "restrictValue" &&
      objectAction.min &&
      objectAction.max
    ) {
      actionData = {
        actionType: objectAction.objectActionType,
        min: objectAction.min,
        max: objectAction.max,
      };
    } else if (objectAction.objectActionType === "changeValue") {
      const res = processObjectChangeValue({ objectAction, objectLabelsData });
      if (res !== false)
        actionData = {
          ...res,
        };
    }

    //check if action data is empty
    if (Object.keys(actionData).length <= 0)
      return processObjectActions({
        objectActions,
        objectLabelsData,
        processedObject,
        triggerObjectIds,

        removeDuplicates,
      });

    //check if effects & this object have been set.
    if (!processedObject.effects) {
      processedObject = { effects: {} };
    }
    if (processedObject.effects && !processedObject.effects.objects) {
      processedObject.effects = { ...processedObject.effects, objects: {} };
    }
    if (
      processedObject.effects.objects &&
      !processedObject.effects.objects[objectAction.objectId]
    ) {
      processedObject.effects.objects[objectAction.objectId] = { actions: [] };
    }
    if (
      processedObject.effects.objects[objectAction.objectId] &&
      !processedObject.effects.objects[objectAction.objectId].actions
    ) {
      processedObject.effects.objects[objectAction.objectId] = {
        ...processedObject.effects.objects[objectAction.objectId],
        actions: [],
      };
    }

    //add content to list
    processedObject.effects.objects[objectAction.objectId].actions.push(
      actionData
    );

    return processObjectActions({
      objectActions,
      objectLabelsData,
      processedObject,
      triggerObjectIds,

      removeDuplicates,
    });
  } catch (e) {
    //console.log(util.inspect(e, false, null, true));
    console.log(e);
    return e;
  }
};

//process step actions
const processStepActions = ({
  stepActions,
  processedObject,
  triggerObjectIds,

  removeDuplicates,
}) => {
  try {
    if (stepActions.length <= 0) return processedObject;
    const stepAction = stepActions.shift();

    if (
      ["show", "hide"].indexOf(stepAction.stepAction) < 0 ||
      !stepAction.stepId
    )
      return processStepActions({
        stepActions,
        processedObject,
        triggerObjectIds,

        removeDuplicates,
      });

    const actionData = { actionType: stepAction.stepAction };
    //check if effects & this step have been set.
    if (!processedObject.effects) {
      processedObject = { effects: {} };
    }
    if (processedObject.effects && !processedObject.effects.steps) {
      processedObject.effects = { ...processedObject.effects, steps: {} };
    }
    if (
      processedObject.effects.steps &&
      !processedObject.effects.steps[stepAction.stepId]
    ) {
      processedObject.effects.steps[stepAction.stepId] = { actions: [] };
    }
    if (
      processedObject.effects.steps[stepAction.stepId] &&
      !processedObject.effects.steps[stepAction.stepId].actions
    ) {
      processedObject.effects.steps[stepAction.stepId] = {
        ...processedObject.effects.steps[stepAction.stepId],
        actions: [],
      };
    }

    //add content to list
    processedObject.effects.steps[stepAction.stepId].actions.push(actionData);

    return processStepActions({
      stepActions,
      processedObject,
      triggerObjectIds,

      removeDuplicates,
    });
  } catch (e) {
    //console.log(util.inspect(e, false, null, true));
    console.log(e);
    return e;
  }
};

//process all the conditional statements
export const processConditionalStatements = ({
  objectId,
  conditionalStatements,
  objectLabelsData,
  status,
  binder = "and",
  forType = "forObjects",
}) => {
  try {
    if (conditionalStatements.length === 0) return status;

    const conditionalStatement = conditionalStatements.shift();

    //select which field is to be used to extract data.
    let forObjectId;
    if (forType === "forObjects") {
      forObjectId = conditionalStatement.operatorObjectId;
    } else if (forType === "forFees") {
      forObjectId = conditionalStatement.objectId;
    }

    const dataObject = objectLabelsData[forObjectId || objectId];
    if (
      !dataObject ||
      (dataObject && !dataObject.value) ||
      (dataObject && dataObject.value && !dataObject.value.data)
    )
      return processConditionalStatements({
        objectId,
        conditionalStatements,
        objectLabelsData,
        status,
        forType,
      });

    //value to be used for comparison from condition
    let conditionalStatementValue =
      typeof conditionalStatement.value === "string"
        ? conditionalStatement.value.toLowerCase()
        : conditionalStatement.value;

    //transaction data value
    let data = dataObject.value.data;

    //check if data has data
    let dataExists = false;
    if (Array.isArray(data) && data.length > 0) {
      dataExists = true;
      data.map((item) =>
        typeof item === "string" ? item.toLowerCase() : item
      ); //map list items to lowercase
    } else if (typeof data === "string" && data.trim().length > 0) {
      dataExists = true;
    } else if (data) {
      dataExists = false;
    }

    //try to parse both data & conditionalStatementValue to integer
    try {
      const parsedInt = parseInt(data);
      if (!isNaN(parsedInt)) data = parsedInt;
    } catch (e) {}

    if (conditionalStatement.operator !== "in") {
      //not parse if is `in`
      try {
        const parsedInt = parseInt(conditionalStatementValue);
        if (!isNaN(parsedInt)) conditionalStatementValue = parsedInt;
      } catch (e) {}
    }

    let localStatus = false;
    if (conditionalStatement.operator === "notEmpty") {
      localStatus = dataExists;
    } else if (conditionalStatement.operator === "is") {
      localStatus = data === conditionalStatementValue;
    } else if (conditionalStatement.operator === "contains") {
      localStatus = data.includes(conditionalStatementValue);
    } else if (conditionalStatement.operator === "lessThan") {
      localStatus = data < conditionalStatementValue;
    } else if (conditionalStatement.operator === "lessThanOrEqualTo") {
      localStatus = data <= conditionalStatementValue;
    } else if (conditionalStatement.operator === "greaterThan") {
      localStatus = data > conditionalStatementValue;
    } else if (conditionalStatement.operator === "greaterThanOrEqualTo") {
      localStatus = data >= conditionalStatementValue;
    } else if (conditionalStatement.operator === "in") {
      //data must be comma separate ie mac,windows,samsung

      localStatus =
        conditionalStatementValue
          .split(",")
          .map((item) => {
            try {
              //try to parse conditionalStatementValue to integer
              const parsedInt = parseInt(item);
              if (isNaN(parsedInt)) {
                return item;
              } else {
                return parsedInt;
              }
            } catch (e) {
              return item;
            }
          })
          .indexOf(data) >= 0
          ? true
          : false;
    }

    let computedStatus;
    if (typeof status !== "boolean") {
      computedStatus = localStatus;
    } else {
      computedStatus =
        binder === "or" ? status || localStatus : status && localStatus;
    }

    return processConditionalStatements({
      objectId,
      conditionalStatements,
      objectLabelsData,
      status: computedStatus,
      binder: conditionalStatement.binder,
      forType,
    });
  } catch (e) {
    //console.log(util.inspect(e, false, null, true));
    console.log(e);
    return e;
  }
};

//process each condition in an object
const processConditionObject = ({
  conditionObjectList = [],
  objectLabelsData = {},
  processedObject = {},
  triggerObjectIds,
  removeDuplicates,
  byPassConditionalStatements,
}) => {
  try {
    if (conditionObjectList.length === 0) return processedObject;
    const condition = conditionObjectList.shift();

    //check if specific trigger object has been requested
    if (
      Array.isArray(triggerObjectIds) &&
      triggerObjectIds.length > 0 &&
      triggerObjectIds.indexOf(condition.objectId) < 0
    )
      return processConditionObject({
        conditionObjectList,
        objectLabelsData,
        processedObject,
        triggerObjectIds,
        removeDuplicates,
        byPassConditionalStatements,
      });

    if (!Array.isArray(condition.conditionalStatements))
      return processConditionObject({
        conditionObjectList,
        objectLabelsData,
        processedObject,
        triggerObjectIds,
        removeDuplicates,
        byPassConditionalStatements,
      });

    let conditionalStatus;
    if (byPassConditionalStatements) {
      conditionalStatus = true;
    } else {
      conditionalStatus = processConditionalStatements({
        objectId: condition.objectId,
        conditionalStatements: condition.conditionalStatements,
        objectLabelsData,
      });
    }

    //conditions not met
    if (!conditionalStatus)
      return processConditionObject({
        conditionObjectList,
        objectLabelsData,
        processedObject,
        triggerObjectIds,
        removeDuplicates,
        byPassConditionalStatements,
      });

    const { object, step } = condition.affects || {};
    const { objectActions, stepActions } = condition;

    if (object && Array.isArray(objectActions) && objectActions.length > 0) {
      //work on object actions
      const res = processObjectActions({
        objectActions,
        objectLabelsData,
        processedObject,
        triggerObjectIds,
        removeDuplicates,
        byPassConditionalStatements,
      });
      if (res !== false) processedObject = res;
    }
    if (step && Array.isArray(stepActions) && stepActions.length > 0) {
      //work on step actions
      const res = processStepActions({
        stepActions,
        processedObject,
        triggerObjectIds,
        removeDuplicates,
        byPassConditionalStatements,
      });
      if (res !== false) processedObject = res;
    }

    return processConditionObject({
      conditionObjectList,
      objectLabelsData,
      processedObject,
      triggerObjectIds,
      removeDuplicates,
      byPassConditionalStatements,
    });
  } catch (e) {
    //console.log(util.inspect(e, false, null, true));
    console.log(e);
    return e;
  }
};

//process each object
const processObjectConditions = ({
  objectLabelConditionsList = [],
  objectLabelsData = {},
  processedObject = {},
  triggerObjectIds,
  removeDuplicates,
  byPassConditionalStatements,
}) => {
  try {
    if (objectLabelConditionsList.length === 0) return processedObject;
    const conditionObject = objectLabelConditionsList.shift();
    const conditionObjectList = Object.values(conditionObject);

    const res = processConditionObject({
      conditionObjectList,
      objectLabelsData,
      processedObject,
      triggerObjectIds,
      removeDuplicates,
      byPassConditionalStatements,
    });
    if (res !== false) processedObject = res;

    return processObjectConditions({
      objectLabelConditionsList,
      objectLabelsData,
      processedObject,
      triggerObjectIds,
      removeDuplicates,
      byPassConditionalStatements,
    });
  } catch (e) {
    //console.log(util.inspect(e, false, null, true));
    return e;
  }
};

/**
 * Interface
 * @param {*} param0
 * @triggerObjectIds [a,b,c] to determine what effect specific object label(s) have. Empty or not specified computes for all objects
 *
 */
export const processObjectConditionalResult = ({
  objectLabelsData = {},
  objectLabelConditions = {},
  triggerObjectIds = [],
  removeDuplicates = true,
  byPassConditionalStatements = false,
}) => {
  try {
    
    let res = processObjectConditions({
      objectLabelConditionsList: Object.values(objectLabelConditions),
      objectLabelsData,
      triggerObjectIds,
      removeDuplicates,
      byPassConditionalStatements,
    });

    //removing duplicates
    if (removeDuplicates) {
      res = processRemoveDuplicateActions({ data: { ...res } });
    }

    // console.log(JSON.stringify(res)); 

    if (Object.keys(res).length === 0) return false;

    return { ...res };
  } catch (e) {
    //console.log(util.inspect(e, false, null, true));
    console.log(e);
    return e;
  }
};
//.
