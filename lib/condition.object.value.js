// import util from "util"; //todo remove this line of code.
import lodash from "lodash";
import {
  OBJECT_ACTION_TYPES,
  QUERY_BUILDER_MATCH_TYPES,
} from "../utils/helper.utils.js";
/**
 * Returns the object's changed value if it does not contain any largedataset
 * @param {*} param0
 * @returns {query:[]}
 */
export const processConditionObjectValue = ({ query }) => {
  try {
    if (lodash.isEmpty(query)) return false;

    let builtValue = "";
    for (const { matchType, value } of query) {
      if (matchType === QUERY_BUILDER_MATCH_TYPES.OBJECTFIELD.value) {
        //dont parse queries with largedataset.since they need to make reques to api.
        return false;
      }
      builtValue = `${builtValue}${value}`;
    }
    return builtValue;
  } catch (e) {
    console.log(e);
    return e;
  }
};
