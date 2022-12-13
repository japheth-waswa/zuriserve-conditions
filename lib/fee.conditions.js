// import util from "util"; //todo remove this line when publishing to npm
import {
  interpolateStringExpressions,
  OBJECTLABEL_FIELD_VALUE_OPENING_CLOSING_TAGS_UTIL,
  OBJECTLABEL_LARGEDATASET_FIELD_OPENING_CLOSING_TAGS_UTIL,
  OBJECT_SECTIONS_BINDER_UTIL,
  shallowArrayToObject,
} from "../utils/helper.utils.js";
import { processConditionalStatements } from "./object.conditions.js";

//process largedataset. Scenario 1 - has 1 record. Scenario 2 - has more than 1 record.
const largeDatasetFieldBuilder = ({
  feeObject,
  objectLabelsData,
  largeDatasetFieldTriggers,
  processedObject = {},
}) => {
  try {
    if (largeDatasetFieldTriggers.length === 0) return processedObject;
    const fieldName = largeDatasetFieldTriggers.shift();
    const fieldNameArray = fieldName.split(OBJECT_SECTIONS_BINDER_UTIL);
    const objectLabelId = fieldNameArray[0];
    const largeDatasetFieldName = fieldNameArray[2];
    const objectLabelData = objectLabelsData[objectLabelId];
    
    //if it does not exist,return
    if (
      !objectLabelData ||
      (objectLabelData && !objectLabelData.value) ||
      (objectLabelData &&
        objectLabelData.value &&
        !objectLabelData.value.extras) ||
      (objectLabelData &&
        objectLabelData.value &&
        objectLabelData.value.extras &&
        !objectLabelData.value.extras.records)
    )
      return largeDatasetFieldBuilder({
        feeObject,
        objectLabelsData,
        largeDatasetFieldTriggers,
        processedObject,
      });

    const records = objectLabelData.value.extras.records;

    //check if it does not exist.
    if (!processedObject[objectLabelId])
      processedObject[objectLabelId] = { ids: [], fields: [] };

    //parse ids
    const parsedIds = records.filter((item) => item.id).map((item) => item.id);

    processedObject[objectLabelId] = {
      ids: [...processedObject[objectLabelId].ids, ...parsedIds],
      fields: [...processedObject[objectLabelId].fields, largeDatasetFieldName.toLowerCase()],
    };

    //remove duplicate ids
    processedObject[objectLabelId].ids = Object.keys(
      shallowArrayToObject({ arr: processedObject[objectLabelId].ids })
    );

    //remove duplicate large dataset field names
    processedObject[objectLabelId].fields = Object.keys(
      shallowArrayToObject({ arr: processedObject[objectLabelId].fields })
    );

    return largeDatasetFieldBuilder({
      feeObject,
      objectLabelsData,
      largeDatasetFieldTriggers,
      processedObject,
    });
  } catch (e) {
    // console.log(util.inspect(e, false, null, true));
    return {};
  }
};

//process normal field,just get their values from transaction data such as text,number,dropdown etc
const normalFieldsBuilder = ({
  feeObject,
  objectLabelsData,
  normalFieldTriggers,
  processedObject = {},
}) => {
  try {
    if (normalFieldTriggers.length === 0) return processedObject;
    const fieldName = normalFieldTriggers.shift();
    const objectLabelId = fieldName.split(OBJECT_SECTIONS_BINDER_UTIL)[0];
    const objectLabelData = objectLabelsData[objectLabelId];

    //if it does not exist,return
    if (
      !objectLabelData ||
      (objectLabelData && !objectLabelData.value) ||
      (objectLabelData && objectLabelData.value && !objectLabelData.value.data)
    )
      return normalFieldsBuilder({
        feeObject,
        objectLabelsData,
        normalFieldTriggers,
        processedObject,
      });

    //ensure values object exists.
    if (!processedObject.values) processedObject.values = {};

    //add this data
    processedObject.values[fieldName.toLowerCase()] =
      objectLabelData.value.data;

    return normalFieldsBuilder({
      feeObject,
      objectLabelsData,
      normalFieldTriggers,
      processedObject,
    });
  } catch (e) {
    // console.log(util.inspect(e, false, null, true));
    return {};
  }
};

//process parameters & queryData for this fee object.
const processFormulaeParams = ({ feeObject, objectLabelsData }) => {
  try {
    //todo extract trigger objects for normal fields
    const { fields: normalFieldTriggers } = interpolateStringExpressions({
      str: feeObject.formulae,
      dataTags: { ...OBJECTLABEL_FIELD_VALUE_OPENING_CLOSING_TAGS_UTIL },
      requestFields: true,
    });
    //todo extract trigger objects for largedataset fields
    const { fields: largeDatasetFieldTriggers } = interpolateStringExpressions({
      str: feeObject.formulae,
      dataTags: { ...OBJECTLABEL_LARGEDATASET_FIELD_OPENING_CLOSING_TAGS_UTIL },
      requestFields: true,
    });

    let buildObject = {
      ...feeObject,
      triggers:
        normalFieldTriggers.length === 0 &&
        largeDatasetFieldTriggers.length === 0
          ? false
          : true,
    };
    //remove conditionalStatements
    delete buildObject.conditionalStatements;

    if (!buildObject.triggers) {
      //no variables just return this object.
      return buildObject;
    }

    if (normalFieldTriggers.length > 0) {
      const fieldsBuilderRes = normalFieldsBuilder({
        feeObject,
        objectLabelsData,
        normalFieldTriggers,
      });
      buildObject = { ...buildObject, ...fieldsBuilderRes };
    }

    if (largeDatasetFieldTriggers.length > 0) {
      const fieldsBuilderRes = largeDatasetFieldBuilder({
        feeObject,
        objectLabelsData,
        largeDatasetFieldTriggers,
      });
      buildObject = { ...buildObject, queryData:{...fieldsBuilderRes} };
      
    }
    return buildObject;
  } catch (e) {
    // console.log(util.inspect(e, false, null, true));
    return false;
  }
};

//process a single object
const processFeeObject = ({
  feeObject,
  objectLabelsData,
  triggerStepObjects,
  byPassConditionalStatements,
}) => {
  try {
    let returnObject = {};
    let conditionalStatus;
    if (byPassConditionalStatements) {
      conditionalStatus = true;
    } else if (
      !Array.isArray(feeObject.conditionalStatements) ||
      (Array.isArray(feeObject.conditionalStatements) &&
        feeObject.conditionalStatements.length <= 0)
    ) {
      //those without conditional statements mark them as passed
      conditionalStatus = true;
    } else {
      conditionalStatus = processConditionalStatements({
        conditionalStatements: feeObject.conditionalStatements,
        objectLabelsData,
        forType: "forFees",
      });
    }

    // console.log(util.inspect(conditionalStatus, false, null, true));
    if (!conditionalStatus) return false;

    const res = processFormulaeParams({ feeObject, objectLabelsData });
    if (res !== false)
      returnObject = { ...returnObject, [feeObject.feeId]: { ...res } };
    return returnObject;
  } catch (e) {
    // console.log(util.inspect(e, false, null, true));
    return {};
  }
};

//process each object from list
const processFeeConditions = ({
  feeObjectsList,
  objectLabelsData,
  triggerStepObjects,
  processedObject = {},
  byPassConditionalStatements,
}) => {
  try {
    if (feeObjectsList.length === 0) return processedObject;
    const feeObject = feeObjectsList.shift();

    const res = processFeeObject({
      feeObject,
      objectLabelsData,
      triggerStepObjects,
      byPassConditionalStatements,
    });
    processedObject = { ...processedObject, ...res };

    return processFeeConditions({
      feeObjectsList,
      objectLabelsData,
      triggerStepObjects,
      processedObject,
      byPassConditionalStatements,
    });
  } catch (e) {
    // console.log(util.inspect(e, false, null, true));
    return false;
  }
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
export const processFeesConditionalResult = ({
  objectLabelsData = {},
  feeObjects = {},
  triggerStepObjects = [],
  byPassConditionalStatements = false,
}) => {
  try {
    
    if (Object.keys(feeObjects).length <= 0) return false;

    let res = processFeeConditions({
      feeObjectsList: Object.values(feeObjects),
      objectLabelsData,
      triggerStepObjects,
      byPassConditionalStatements,
    });

    // console.log(JSON.stringify(res));

    if (Object.keys(res).length === 0) return false;

    return { ...res };
  } catch (e) {
    // console.log(util.inspect(e, false, null, true));
    return false;
  }
};
