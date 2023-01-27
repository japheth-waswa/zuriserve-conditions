import {
  ENDRESULT_FORMULAE_CUSTOMFIELD_OPENING_CLOSING_TAGS_UTIL,
  ENDRESULT_FORMULAE_LIST_OPENING_CLOSING_TAGS_UTIL,
  interpolateStringExpressions,
  OBJECTLABEL_FIELD_VALUE_OPENING_CLOSING_TAGS_UTIL,
  OBJECTLABEL_LARGEDATASET_FIELD_OPENING_CLOSING_TAGS_UTIL,
} from "../utils/helper.utils.js";

/**
 * Computes formulae to validate whether it computes successfuly.
 * @param {*} param0
 * @returns int | float | string
 */
export const formulaeValidate = ({ formulae, formulaeData={} }) => {
  let formulaePassed = formulae;
  for (const formulaeVariable of Object.keys(formulaeData)) {
    const formulaeVariableValue = formulaeData[formulaeVariable];
    formulaePassed = formulaePassed.replaceAll(
      formulaeVariable,
      formulaeVariableValue
    );
  }
  try {
    const val = eval(formulaePassed);
    if (isNaN(val))
      return "Formulae failed to compute. Reset the formulae or the test data & try again";
    return val;
  } catch (e) {
    return "Formulae failed. Reset the formulae or the test data & try again";
  }
};

/**
 * Extract formulae variables from the formulae
 * @param {*} param0
 * @returns {formulaeVar1:formulaeVar1,formulaeVar2:formulaeVar2}
 */
export const extractFormulaeVariables = ({ formulae }) => {
  // get normal fields
  const { fields: normalFieldTriggers } = interpolateStringExpressions({
    str: formulae,
    dataTags: { ...OBJECTLABEL_FIELD_VALUE_OPENING_CLOSING_TAGS_UTIL },
    requestFields: true,
  });

  // extract trigger objects for largedataset fields
  const { fields: largeDatasetFieldTriggers } = interpolateStringExpressions({
    str: formulae,
    dataTags: { ...OBJECTLABEL_LARGEDATASET_FIELD_OPENING_CLOSING_TAGS_UTIL },
    requestFields: true,
  });

   // formulae list
   const { fields: formulaeListTriggers } = interpolateStringExpressions({
    str: formulae,
    dataTags: {...ENDRESULT_FORMULAE_LIST_OPENING_CLOSING_TAGS_UTIL},
    requestFields: true,
  });

  // formulae custom fields
  const { fields: formulaeCustomFieldTriggers } = interpolateStringExpressions({
    str: formulae,
    dataTags: {...ENDRESULT_FORMULAE_CUSTOMFIELD_OPENING_CLOSING_TAGS_UTIL},
    requestFields: true,
  });

  let formulaeVariables = {};

  if (normalFieldTriggers.length > 0) {
    for (const formulaeVariable of normalFieldTriggers) {
      const parsedFormulaeVariable = `${OBJECTLABEL_FIELD_VALUE_OPENING_CLOSING_TAGS_UTIL.stringVarOpeningStr}${formulaeVariable}${OBJECTLABEL_FIELD_VALUE_OPENING_CLOSING_TAGS_UTIL.stringVarClosingStr}`;
      formulaeVariables[parsedFormulaeVariable] = parsedFormulaeVariable;
    }
  }
  if (largeDatasetFieldTriggers.length > 0) {
    for (const formulaeVariable of largeDatasetFieldTriggers) {
      const parsedFormulaeVariable = `${OBJECTLABEL_LARGEDATASET_FIELD_OPENING_CLOSING_TAGS_UTIL.stringVarOpeningStr}${formulaeVariable}${OBJECTLABEL_LARGEDATASET_FIELD_OPENING_CLOSING_TAGS_UTIL.stringVarClosingStr}`;
      formulaeVariables[parsedFormulaeVariable] = parsedFormulaeVariable;
    }
  }
  if (formulaeListTriggers.length > 0) {
    for (const formulaeVariable of formulaeListTriggers) {
      const parsedFormulaeVariable = `${ENDRESULT_FORMULAE_LIST_OPENING_CLOSING_TAGS_UTIL.stringVarOpeningStr}${formulaeVariable}${ENDRESULT_FORMULAE_LIST_OPENING_CLOSING_TAGS_UTIL.stringVarClosingStr}`;
      formulaeVariables[parsedFormulaeVariable] = parsedFormulaeVariable;
    }
  }
  if (formulaeCustomFieldTriggers.length > 0) {
    for (const formulaeVariable of formulaeCustomFieldTriggers) {
      const parsedFormulaeVariable = `${ENDRESULT_FORMULAE_CUSTOMFIELD_OPENING_CLOSING_TAGS_UTIL.stringVarOpeningStr}${formulaeVariable}${ENDRESULT_FORMULAE_CUSTOMFIELD_OPENING_CLOSING_TAGS_UTIL.stringVarClosingStr}`;
      formulaeVariables[parsedFormulaeVariable] = parsedFormulaeVariable;
    }
  }

  return formulaeVariables;
};
