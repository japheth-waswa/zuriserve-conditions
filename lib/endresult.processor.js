// import util from "util"; //todo remove this line when publishing to npm

/**
 * Interface
 * Extracts end result objects & fees for in-design
 * @param {*} param0
 * @returns {objects:{backoffice:{objectLabel1:{}},client:{objectLabel2:{}}},fees:{backoffice:{stepFeeId1:{name}}}}
 */
export const processEndResultVars = ({ stepsList }) => {
  try {
    let objects = {};
    let fees = {};

    if (
      !Array.isArray(stepsList) ||
      (Array.isArray(stepsList) && stepsList.length <= 0)
    )
      return { objects, fees };

    for (const {
      name: stepName,
      objects: stepObjects,
      fees: stepFees,
      channel,
    } of stepsList) {
      if (!objects[channel]) {
        objects[channel] = {};
      }
      if (!fees[channel]) {
        fees[channel] = {};
      }
      if (!objects[channel][stepName]) {
        objects[channel][stepName] = {};
      }

      //step objects
      if (Array.isArray(stepObjects) && stepObjects.length > 0) {
        for (const {
          label,
          object: rootObject,
          status,
          isMultiple,
        } of stepObjects) {
          if (
            status !== 1 ||
            !rootObject ||
            (rootObject && rootObject.status !== 1)
          )
            continue;
          objects[channel][stepName] = {
            ...objects[channel][stepName],
            [label]: {
              objectLabel: label,
              objectType: rootObject.objectType,
              isMultiple,
            },
          };

          //add largedataset fields if they exist.
          if (
            rootObject.objectType === "largedataset" &&
            rootObject.extras &&
            Array.isArray(rootObject.extras.fields) &&
            rootObject.extras.fields.length > 0
          ) {
            objects[channel][stepName][label] = {
              ...objects[channel][stepName][label],
              fields: rootObject.extras.fields,
            };
          }
        }
      }

      //step fees
      if (Array.isArray(stepFees) && stepFees.length > 0) {
        for (const { id: stepFeeId, feeType, name, status } of stepFees) {
          if (status !== 1) continue;
          fees[channel][stepFeeId] = { stepFeeId, feeType, name };
        }
      }
    }

    // console.log(util.inspect(objects, false, null, true));
    // console.log(JSON.stringify({objects,fees}));
    // console.log(util.inspect({objects,fees}, false, null, true));
    return { objects, fees };
  } catch (e) {
    // console.log(util.inspect(e, false, null, true));
    return false;
  }
};
