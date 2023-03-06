// import util from "util"; //todo remove this line when publishing to npm
import {
  ENDRESULT_DECORATOR_BINDER_UTIL,
  ENDRESULT_FEE_OPENING_CLOSING_TAGS_UTIL,
  ENDRESULT_FORMULAE_CUSTOMFIELD_OPENING_CLOSING_TAGS_UTIL,
  ENDRESULT_FORMULAE_LIST_OPENING_CLOSING_TAGS_UTIL,
  ENDRESULT_FORMULAE_OPENING_CLOSING_TAGS_UTIL,
  ENDRESULT_OBJECT_OPENING_CLOSING_TAGS_UTIL,
  ENDRESULT_QRCODE_OPENING_CLOSING_TAGS_UTIL,
  ENDRESULT_STATIC_VARS_OPENING_CLOSING_TAGS_UTIL,
  interpolateStringExpressions,
  INVOICE_STATIC_OPENING_CLOSING_TAGS_UTIL,
  OBJECT_SECTIONS_BINDER_UTIL,
} from "../utils/helper.utils.js";

/**
 * parses fees
 * @param {*} param0
 * @returns {fees}
 */
const parseFeeFields = ({ feeFields }) => {
  try {
    let fees = {};

    if (
      !Array.isArray(feeFields) ||
      (Array.isArray(feeFields) && feeFields.length <= 0)
    )
      return { fees };

    //each separation, add type: basic || largedataset
    for (const feeField of feeFields) {
      let feeData = {};
      const [channel, feeName] = feeField.split(OBJECT_SECTIONS_BINDER_UTIL);

      feeData = {
        ...feeData,
        channel,
        feeName,
      };

      const feeKey = `${feeData.channel}${OBJECT_SECTIONS_BINDER_UTIL}${feeData.feeName}`;

      if (!fees[feeKey]) {
        //does not exist,add it.
        fees[feeKey] = {
          ...feeData,
        };
      }
    }
    return { fees };
  } catch (e) {
    // console.log(util.inspect(e, false, null, true));
    return false;
  }
};

/**
 * parses objects & groups them into basic & largedataset
 * @param {*} param0
 * @returns {objects}
 */
const parseObjectFields = ({ objectFields }) => {
  try {
    let objects = {};

    if (
      !Array.isArray(objectFields) ||
      (Array.isArray(objectFields) && objectFields.length <= 0)
    )
      return { objects };

    //each separation, add type: basic || largedataset
    for (const objectField of objectFields) {
      let objectData = {};
      const [channel, step, objectLabel, largedatasetField] = objectField.split(
        OBJECT_SECTIONS_BINDER_UTIL
      );

      objectData = {
        ...objectData,
        objectField: { [objectField]: true },
        type: largedatasetField ? "largedataset" : "basic",
        channel,
        step,
        objectLabel,
        fields: {},
      };

      //extract decorators
      let parsedLargeDatasetField = largedatasetField;
      let parsedDecorators = {};
      if (objectData.type === "basic") {
        const decorators = objectLabel.split(ENDRESULT_DECORATOR_BINDER_UTIL);
        if (decorators.length > 1) {
          //reset objectLabel
          objectData.objectLabel = decorators[0];
          //decorators do exist.
          const decoratorsList = decorators.splice(1);
          parsedDecorators = {
            ...parsedDecorators,
            [decoratorsList.join(ENDRESULT_DECORATOR_BINDER_UTIL)]:
              decoratorsList,
          };
          objectData = {
            ...objectData,
            decorators: { ...parsedDecorators },
          };
        }
      } else if (objectData.type === "largedataset") {
        objectData = { ...objectData, fields: { [largedatasetField]: {} } };
        // largedatasetField
        const decorators = largedatasetField.split(
          ENDRESULT_DECORATOR_BINDER_UTIL
        );
        if (decorators.length > 1) {
          //reset field
          parsedLargeDatasetField = decorators[0];
          delete objectData.fields[largedatasetField];

          //decorators do exist.
          const decoratorsList = decorators.splice(1);
          parsedDecorators = {
            ...parsedDecorators,
            [decoratorsList.join(ENDRESULT_DECORATOR_BINDER_UTIL)]:
              decoratorsList,
          };

          //set field decorators
          objectData.fields[parsedLargeDatasetField] = {
            decorators: { ...parsedDecorators },
          };
        }
      }

      const objectKey = `${objectData.channel}${OBJECT_SECTIONS_BINDER_UTIL}${objectData.step}${OBJECT_SECTIONS_BINDER_UTIL}${objectData.objectLabel}`;

      if (objects[objectKey]) {
        //already exists,just add decorators
        objects[objectKey] = {
          ...objects[objectKey],
          objectField: {
            ...objects[objectKey].objectField,
            ...objectData.objectField,
          },
        };

        if (objectData.type === "basic") {
          //basic append decorators
          objects[objectKey].decorators = {
            ...objects[objectKey].decorators,
            ...parsedDecorators,
          };
        } else if (objectData.type === "largedataset") {
          if (!objects[objectKey].fields[parsedLargeDatasetField])
            objects[objectKey].fields[parsedLargeDatasetField] = {};

          if (!objects[objectKey].fields[parsedLargeDatasetField].decorators)
            objects[objectKey].fields[parsedLargeDatasetField].decorators = {};

          //largedataset append decorators
          objects[objectKey].fields[parsedLargeDatasetField].decorators = {
            ...objects[objectKey].fields[parsedLargeDatasetField].decorators,
            ...parsedDecorators,
          };
        }
      } else {
        //does not exist,add it.
        objects[objectKey] = {
          ...objectData,
        };
      }
    }
    return { objects };
  } catch (e) {
    // console.log(util.inspect(e, false, null, true));
    return false;
  }
};

/**
 * Interface
 * Extracts object labels,fees,formulae,static & decorators from content in editor
 * @param {*} param0
 * @returns {objects:{},fees:{},statics:[],formulaes:{}}
 */
export const processEndResultVarGroup = ({ contentString }) => {
  try {
    let parsedContentString = contentString;

    // extract formulae
    let formulaesObject = {};
    const { fields: formulaes } = interpolateStringExpressions({
      str: parsedContentString,
      dataTags: ENDRESULT_FORMULAE_OPENING_CLOSING_TAGS_UTIL,
      requestFields: true,
    });

    if (Array.isArray(formulaes) && formulaes.length > 0) {
      for (const formulae of formulaes) {
        //parse each formulae
        if (formulaesObject[formulae]) continue;
        formulaesObject[formulae] = processEndResultVarGroup({
          contentString: formulae,
        });
      }
    }


    // formulae list
    const { fields: formulaeList } = interpolateStringExpressions({
      str: parsedContentString,
      dataTags: ENDRESULT_FORMULAE_LIST_OPENING_CLOSING_TAGS_UTIL,
      requestFields: true,
    });

    // formulae custom fields
    const { fields: formulaeCustomFields } = interpolateStringExpressions({
      str: parsedContentString,
      dataTags: ENDRESULT_FORMULAE_CUSTOMFIELD_OPENING_CLOSING_TAGS_UTIL,
      requestFields: true,
    });
    
    // extract objects
    const { fields: objectFields } = interpolateStringExpressions({
      str: parsedContentString,
      dataTags: ENDRESULT_OBJECT_OPENING_CLOSING_TAGS_UTIL,
      requestFields: true,
    });
    const { objects } = parseObjectFields({
      objectFields,
    });

    // extract fees
    const { fields: feeFields } = interpolateStringExpressions({
      str: parsedContentString,
      dataTags: ENDRESULT_FEE_OPENING_CLOSING_TAGS_UTIL,
      requestFields: true,
    });
    const { fees } = parseFeeFields({ feeFields });

    // extract statics
    const { fields: staticFields } = interpolateStringExpressions({
      str: parsedContentString,
      dataTags: ENDRESULT_STATIC_VARS_OPENING_CLOSING_TAGS_UTIL,
      requestFields: true,
    });

    // qr codes
    const { fields: qrcodes } = interpolateStringExpressions({
      str: parsedContentString,
      dataTags: ENDRESULT_QRCODE_OPENING_CLOSING_TAGS_UTIL,
      requestFields: true,
    });

    // fee groups
    const { fields: feeGroups } = interpolateStringExpressions({
      str: parsedContentString,
      dataTags: INVOICE_STATIC_OPENING_CLOSING_TAGS_UTIL,
      requestFields: true,
    });

    return {
      objects: objects || {},
      fees: fees || {},
      statics: staticFields || [],
      formulaes: formulaesObject || {},
      qrcodes: qrcodes || [],
      formulaeList: formulaeList || [],
      formulaeCustomFields: formulaeCustomFields || [],
      feeGroups: feeGroups || [],
    };
  } catch (e) {
    // console.log(util.inspect(e, false, null, true));
    return false;
  }
};

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
    return { objects, fees };
  } catch (e) {
    // console.log(util.inspect(e, false, null, true));
    return false;
  }
};
