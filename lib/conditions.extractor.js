// import util from "util"; //todo remove this line when publishing to npm

import { shallowArrayToObject } from "../utils/helper.utils.js";

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
      if (!Array.isArray(fees) || (Array.isArray(fees) && fees.length <= 0))continue;

      for (const fee of fees) {
        if (
          !fee.id ||
          fee.feeType !== "dynamic" ||
          !fee.formulae ||
          (fee.formulae && fee.formulae.trim().length <= 0) ||
          !fee.conditions ||
          (fee.conditions && Object.keys(fee.conditions) <= 0)
        )
          continue;

        feesObject[fee.id] = {
          feeId: fee.id,
          name: fee.name,
          formulae: fee.formulae.trim(),
          conditionalStatements: [],
        };

        // triggerStepObjects
        if(Array.isArray(fee.triggerStepObjects) && fee.triggerStepObjects.length>0){
          triggerStepObjects = {...triggerStepObjects,...shallowArrayToObject({arr:fee.triggerStepObjects})};
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
            feesObject[fee.id].conditionalStatements.push({
              objectId,
              operator,
              value,
              binder,
            });
          }
        }
      }
    }
    return {feesObject,triggerStepObjects:Object.keys(triggerStepObjects)};

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
        [object.id]: { ...object.conditions },
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
    const res= processSteps({ stepsList: Object.values(stepsData) });
    return res;
  } catch (e) {
    // console.log(util.inspect(e, false, null, true));
    return false;
  }
};
