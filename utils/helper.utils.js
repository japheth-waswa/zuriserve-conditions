export const OBJECT_SECTIONS_BINDER_UTIL = "@@";
export const LARGEDATASET_FIELD_OPENING_CLOSING_TAGS_UTIL = {
  stringVarOpening: /<<</g,
  stringVarOpeningStr: "<<<",
  stringVarClosing: />>>/g,
  stringVarClosingStr: ">>>",
};
export const OBJECTLABEL_FIELD_VALUE_OPENING_CLOSING_TAGS_UTIL = {
  stringVarOpening: /{{{/g,
  stringVarOpeningStr: "{{{",
  stringVarClosing: /}}}/g,
  stringVarClosingStr: "}}}",
};
export const OBJECTLABEL_LARGEDATASET_FIELD_OPENING_CLOSING_TAGS_UTIL = {
  stringVarOpening: /!##/g,
  stringVarOpeningStr: "!##",
  stringVarClosing: /##!/g,
  stringVarClosingStr: "##!",
};

/**
 *
 * @param {*} str
 * @param {*} data {key1:value1,key2:value2}
 * @param {*} dataTags  {stringVarOpening : /{{{/g,stringVarOpeningStr : '{{{',stringVarClosing : /}}}/g,stringVarClosingStr : '}}}'}
 * @returns {status,str,fields}
 */
 export const interpolateStringExpressions = function ({
    str,
    data,
    dataTags,
    requestFields = false,
  }) {
    try {
      const {
        stringVarOpening,
        stringVarOpeningStr,
        stringVarClosing,
        stringVarClosingStr,
      } = dataTags;
  
      //check opening if matches closing if
      let openingCount = (str.match(stringVarOpening) || []).length;
      let closingCount = (str.match(stringVarClosing) || []).length;
  
      if (openingCount !== closingCount) {
        return {
          status: false,
          string: str,
          message:
            stringVarOpeningStr +
            " do not have corresponding closing " +
            stringVarClosingStr,
        };
      }
  
      let fields = {};
      if (openingCount > 0) {
        for (let x = 1; x <= openingCount; x++) {
          //get the first occurence of the if statement
          let firstOccurence = str.indexOf(stringVarOpeningStr);
          let firstOccurencePost = firstOccurence + stringVarOpeningStr.length;
          let lastOccurence = str.indexOf(stringVarClosingStr, firstOccurence);
          let lastOccurencePost = lastOccurence + stringVarClosingStr.length;
          let propertyName = str.substring(firstOccurencePost, lastOccurence);
          let propertyNameString = String(propertyName);
  
          if (!requestFields) {
            if (
              data.hasOwnProperty(propertyNameString) &&
              typeof data[propertyNameString] === "string"
            ) {
              let replace = data[propertyNameString];
              str =
                str.substring(0, firstOccurence) +
                replace +
                str.substring(lastOccurencePost, str.length);
            } else {
              str =
                str.substring(0, firstOccurence) +
                "" +
                str.substring(lastOccurencePost, str.length);
            }
          } else {
            //clear this section
            str =
              str.substring(0, firstOccurence) +
              "" +
              str.substring(lastOccurencePost, str.length);
  
            fields = { ...fields, [propertyNameString]: "" };
          }
        }
      }
  
      let extras;
      if (requestFields) {
        extras = { ...extras, fields: Object.keys(fields) };
      } else {
        extras = { ...extras, str };
      }
  
      return extras;
    } catch (e) {
      return {};
    }
  };


/**
 * Convert shallow object to array
 * @param {*} param0
 * @returns
 */
 export const shallowArrayToObject = ({ arr }) =>
 arr.reduce((a, v) => ({ ...a, [v]: v }), {});