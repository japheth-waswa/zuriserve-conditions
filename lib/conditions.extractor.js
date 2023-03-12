// import util from "util"; //todo remove this line when publishing to npm
import lodash from "lodash";
import { shallowArrayToObject } from "../utils/helper.utils.js";

/**
 * Interface
 * Extracts conditional statements
 * @param {*} param0
 * @param conditions :- {"0de2c604-8e93-4a04-8b58-276a2a50eab5" : {conditionId,conditionalStatements:[]},"1de2c604-8e93-4a04-8b58-276a2a50eab9" : {conditionId,conditionalStatements:[]}}
 * @returns {conditionalStatements:[[],[],[]]} || false
 */
export const processGlobalConditionalStatementsExtractor = ({ conditions }) => {
  try {
    let conditionalStatements = [];
    if (lodash.isEmpty(conditions)) return { conditionalStatements };

    //loop condition objects
    for (const condition of Object.values(conditions)) {
      if (lodash.isEmpty(condition.conditionalStatements)) continue;

      let localConditions = [];
      //loop each conditional statement
      for (const {
        objectId,
        operator,
        value,
        binder,
      } of condition.conditionalStatements) {
        localConditions.push({
          objectId,
          operator,
          value,
          binder,
        });
      }

      if (!lodash.isEmpty(localConditions))
        conditionalStatements.push(localConditions);
    }

    return { conditionalStatements };
  } catch (e) {
    // console.log(util.inspect(e, false, null, true));
    return false;
  }
};

/**
 * Interface
 * Extracts fees's conditions from list of fee groups
 * @param {*} param0
 * @param feeGroups :- [{feeGroupFees:[]},{feeGroupFees:[{id,feeType,formulae,conditions}]}]
 * @returns {feesObject,triggerStepObjects} || false
 */
export const processExtractFeesWithConditionsFromFeeGroups = ({
  feeGroups,
}) => {
  try {
    if (
      !Array.isArray(feeGroups) ||
      (Array.isArray(feeGroups) && feeGroups.length <= 0)
    )
      return false;

    let triggerStepObjects = {};
    let feesObject = {};

    for (const feeGroup of feeGroups) {
      const fees = feeGroup.feeGroupFees;
      //do not include manual fees
      if (
        feeGroup.groupType === "manual" ||
        !Array.isArray(fees) ||
        (Array.isArray(fees) && fees.length <= 0)
      )
        continue;

      for (const fee of fees) {
        if (
          (!fee.id && !fee._id) ||
          fee.feeType !== "dynamic" ||
          !fee.formulae ||
          (fee.formulae && fee.formulae.trim().length <= 0) ||
          !fee.conditions ||
          (fee.conditions && Object.keys(fee.conditions) <= 0)
        )
          continue;

        feesObject[fee.id || fee._id] = {
          feeId: fee.id || fee._id,
          name: fee.name,
          formulae: fee.formulae.trim(),
          conditionalStatements: [],
        };

        // triggerStepObjects
        if (
          Array.isArray(fee.triggerStepObjects) &&
          fee.triggerStepObjects.length > 0
        ) {
          triggerStepObjects = {
            ...triggerStepObjects,
            ...shallowArrayToObject({ arr: fee.triggerStepObjects }),
          };
        }

        //loop condition objects
        for (const condition of Object.values(fee.conditions)) {
          if (
            !Array.isArray(condition.conditionalStatements) ||
            (Array.isArray(condition.conditionalStatements) &&
              condition.conditionalStatements.length <= 0)
          )
            continue;

          //loop each conditional statement
          for (const {
            objectId,
            operator,
            value,
            binder,
          } of condition.conditionalStatements) {
            feesObject[fee.id || fee._id].conditionalStatements.push({
              objectId,
              operator,
              value,
              binder,
            });
          }
        }
      }
    }
    return { feesObject, triggerStepObjects: Object.keys(triggerStepObjects) };
  } catch (e) {
    // console.log(util.inspect(e, false, null, true));
    return false;
  }
};

/**
 * Interface
 * Extracts fees's conditions from list of steps
 * @param {*} param0
 * @param steps :- [{fees:[]},{fees:[{id,feeType,formulae,conditions}]}]
 * @returns {feesObject,triggerStepObjects} || false
 */
export const processExtractFeesWithConditionsFromSteps = ({ steps }) => {
  try {
    //todo also include triggerStepObjects

    if (!Array.isArray(steps) || (Array.isArray(steps) && steps.length <= 0))
      return false;

    let triggerStepObjects = {};
    let feesObject = {};

    for (const step of steps) {
      const fees = step.fees;
      if (!Array.isArray(fees) || (Array.isArray(fees) && fees.length <= 0))
        continue;

      for (const fee of fees) {
        if (
          (!fee.id && !fee._id) ||
          fee.feeType !== "dynamic" ||
          !fee.formulae ||
          (fee.formulae && fee.formulae.trim().length <= 0) ||
          !fee.conditions ||
          (fee.conditions && Object.keys(fee.conditions) <= 0)
        )
          continue;

        feesObject[fee.id || fee._id] = {
          feeId: fee.id || fee._id,
          name: fee.name,
          formulae: fee.formulae.trim(),
          conditionalStatements: [],
        };

        // triggerStepObjects
        if (
          Array.isArray(fee.triggerStepObjects) &&
          fee.triggerStepObjects.length > 0
        ) {
          triggerStepObjects = {
            ...triggerStepObjects,
            ...shallowArrayToObject({ arr: fee.triggerStepObjects }),
          };
        }

        //loop condition objects
        for (const condition of Object.values(fee.conditions)) {
          if (
            !Array.isArray(condition.conditionalStatements) ||
            (Array.isArray(condition.conditionalStatements) &&
              condition.conditionalStatements.length <= 0)
          )
            continue;

          //loop each conditional statement
          for (const {
            objectId,
            operator,
            value,
            binder,
          } of condition.conditionalStatements) {
            feesObject[fee.id || fee._id].conditionalStatements.push({
              objectId,
              operator,
              value,
              binder,
            });
          }
        }
      }
    }
    return { feesObject, triggerStepObjects: Object.keys(triggerStepObjects) };
  } catch (e) {
    // console.log(util.inspect(e, false, null, true));
    return false;
  }
};

//extract object conditions
const processSteps = ({ stepsList, processedObjects = {} }) => {
  try {
    if (stepsList.length <= 0) return processedObjects;
    const step = stepsList.shift();
    //no objects
    if (
      !step.objects ||
      (step.objects && Object.keys(step.objects).length === 0)
    )
      return processSteps({ stepsList, processedObjects });

    for (const object of Object.values(step.objects)) {
      if (
        !object.conditions ||
        (object.conditions && Object.keys(object.conditions) === 0)
      )
        continue;
      processedObjects = {
        ...processedObjects,
        [object.id || object._id]: { ...object.conditions },
      };
    }

    return processSteps({ stepsList, processedObjects });
  } catch (e) {
    // console.log(util.inspect(e, false, null, true));
    return false;
  }
};

/**
 * Interface
 * Extracts object's conditions from a nested step
 * @param {*} param0
 * @returns
 */
export const processObjectWithConditions = ({ stepsData }) => {
  try {
    const res = processSteps({ stepsList: Object.values(stepsData) });
    return res;
  } catch (e) {
    // console.log(util.inspect(e, false, null, true));
    return false;
  }
};
