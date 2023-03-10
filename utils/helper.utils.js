export const CONDITIONAL_STATEMENT_OPERATORS = {
  notEmpty: "Has value",
  isEmpty: "Has no value",
  is: "Is",
  contains: "Contains",
  lessThan: "Less Than",
  lessThanOrEqualTo: "Less Than or Equal To",
  greaterThan: "Greater Than",
  greaterThanOrEqualTo: "Greater Than or Equal To",
  in: "In (separate values with comma)",
  isNot: "Is Not",
  doesNotContain: "Does not contain",
  notIn: "Not in (separate values with comma)",
};

export const QUERY_BUILDER_OPERANDS = {
  EQUALS: {
    value: "equals",
    label: "Equals",
  },
  NOT_EQUALS: {
    value: "notEquals",
    label: "Not Equals",
  },
  LIKE: {
    value: "like",
    label: "Like",
  },
  GT: {
    value: "gt",
    label: "Greater than",
  },
  GTE: {
    value: "gte",
    label: "Greater than or equal to",
  },
  LT: {
    value: "lt",
    label: "Less than",
  },
  LTE: {
    value: "lte",
    label: "Less than or equal to ",
  },
};

export const QUERY_BUILDER_RECORD_TYPES = {
  SINGLE: {
    value: "single",
    label: "Single Record",
  },
  MULTIPLE: { value: "multiple", label: "Multiple Records" },
};

export const QUERY_BUILDER_MATCH_TYPES = {
  TERM: {
    value: "term",
    label: "Term",
  },
  OBJECTFIELD: { value: "objectField", label: "Largedataset Field" },
  CONSTANTVAR: { value: "constantVar", label: "Constants" },
  NONLARGEDATASETOBJECTFIELD: {
    value: "nonLargedatasetObjectField",
    label: "Non-Largedataset object labels",
  },
};

export const STEP_OBJECT_VISIBILITY = {
  VISIBLE: {
    value: 1,
    label: "Visible",
  },
  INVISIBLE: { value: 2, label: "Invisible" },
  HIDDEN: { value: 3, label: "Hidden" },
};

export const ASSIGN_RECORD_TYPES = {
  ASSIGN: {
    value: "assign",
    label: "Assign",
  },
  DONTASSIGN: { value: "dontassign", label: "Don't Assign" },
};

export const OBJECT_ACTION_TYPES = {
  HIDE: { name: "Hide object", value: "hide" },
  SHOW: { name: "Show object", value: "show" },
  RESTRICTVALUE: { name: "Restrict value", value: "restrictValue" },
  CHANGEVALUE: { name: "Change value", value: "changeValue" },
};

export const GLOBAL_DATA_CONSTS = {
  CURRENT_DAY_TIME: { value: "currentDayTime", label: "Current Day & Time" },
  CURRENT_DAY_START: {
    value: "currentDayStart",
    label: "Start of current day",
  },
  CURRENT_DAY_END: { value: "currentDayEnd", label: "End of current day" },
  CURRENT_MONTH_START: {
    value: "currentMonthStart",
    label: "Start of current month",
  },
  CURRENT_MONTH_END: {
    value: "currentMonthEnd",
    label: "End of current month",
  },
  CURRENT_YEAR_START: {
    value: "currentYearStart",
    label: "Start of current year",
  },
  CURRENT_YEAR_END: { value: "currentYearEnd", label: "End of current year" },
};

export const GLOBAL_CONSTS_LIST = Object.values(GLOBAL_DATA_CONSTS).map(
  ({ value }) => value
);

export const GLOBAL_DATA_CONSTS_DATE_TYPES = [
  GLOBAL_DATA_CONSTS.CURRENT_DAY_TIME.value,
  GLOBAL_DATA_CONSTS.CURRENT_DAY_START.value,
  GLOBAL_DATA_CONSTS.CURRENT_DAY_END.value,
  GLOBAL_DATA_CONSTS.CURRENT_MONTH_START.value,
  GLOBAL_DATA_CONSTS.CURRENT_MONTH_END.value,
  GLOBAL_DATA_CONSTS.CURRENT_YEAR_START.value,
  GLOBAL_DATA_CONSTS.CURRENT_YEAR_END.value,
];

export const DATE_TYPE_OPERANDS = {
  ADD: { value: "add", label: "Add" },
  SUBTRACT: {
    value: "subtract",
    label: "Subtract",
  },
};

export const DATE_TYPE_OPERANDS_LIST = Object.values(DATE_TYPE_OPERANDS).map(
  ({ value }) => value
);

export const DATE_TYPE_CATEGORY = {
  SECONDS: { value: "seconds", label: "Seconds" },
  MINUTES: { value: "minutes", label: "Minutes" },
  HOURS: { value: "hours", label: "Hours" },
  DAYS: { value: "days", label: "Days" },
  MONTHS: { value: "months", label: "Months" },
  YEARS: { value: "years", label: "Years" },
};

export const DATE_TYPE_CATEGORY_MIN = {
  DAYS: { value: "days", label: "Days" },
  MONTHS: { value: "months", label: "Months" },
  YEARS: { value: "years", label: "Years" },
};

export const DATE_TYPE_CATEGORY_LIST = Object.values(DATE_TYPE_CATEGORY).map(
  ({ value }) => value
);

export const NONCONFIGURABLE_OBJECT_TYPES = ["file", "linkuser"];

export const TRANSACTION_ACTIONS = {
  NONE: { value: "", label: "None" },
  ENABLE: {
    value: "enable",
    label: "Allow transaction to proceed from this step & department",
  },
  TERMINATE: {
    value: "terminate",
    label:
      "Terminate at this step(will not proceed to the next step & department)",
  },
};

export const FEE_GROUP_BIND_TYPE = {
  NONE: { value: "", label: "None" },
  GROUP: { value: "group", label: "Group" },
  FEE: { value: "fee", label: "Fee" },
};

export const FEE_GROUP_STATICS = {
  NONE: { value: "", label: "None" },
  INVOICE_NAME: { value: "name", label: "Invoice Name" },
  INVOICE_REF: { value: "invoiceRef", label: "Invoice Ref" },
  TOTAL_AMOUNT: { value: "totalAmount", label: "Total Amount" },
  PENDING_AMOUNT: { value: "pendingAmount", label: "Pending Amount" },
  PAID_AMOUNT: { value: "paidAmount", label: "Paid Amount" },
  CREDIT_AMOUNT: { value: "creditAmount", label: "Credit Amount" },
  INVOICE_DATE: { value: "invoiceDate", label: "Invoice Date" },
  PAYMENT_DATE: { value: "paymentDate", label: "Payment Date" },
};

export const FEE_GROUP_FEE_STATICS = {
  NONE: { value: "", label: "None" },
  FEE_NAME: { value: "feeName", label: "Fee Name" },
  FEE_AMOUNT: { value: "feeAmount", label: "Fee Amount" },
  FEE_DATE: { value: "feeDate", label: "Fee Date" },
};

export const DB_DATE_FORMAT = "YYYY-MM-DD HH:mm:ss";

export const OBJECT_SECTIONS_BINDER_UTIL = "@@";
export const ENDRESULT_DECORATOR_BINDER_UTIL = "⟤";
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
export const ENDRESULT_OBJECT_OPENING_CLOSING_TAGS_UTIL = {
  stringVarOpening: /⋉/g,
  stringVarOpeningStr: "⋉",
  stringVarClosing: /⋊/g,
  stringVarClosingStr: "⋊",
};
export const ENDRESULT_FEE_OPENING_CLOSING_TAGS_UTIL = {
  stringVarOpening: /⋤/g,
  stringVarOpeningStr: "⋤",
  stringVarClosing: /⋥/g,
  stringVarClosingStr: "⋥",
};
export const ENDRESULT_FORMULAE_LIST_OPENING_CLOSING_TAGS_UTIL = {
  stringVarOpening: /⫷/g,
  stringVarOpeningStr: "⫷",
  stringVarClosing: /⫸/g,
  stringVarClosingStr: "⫸",
};
export const ENDRESULT_FORMULAE_CUSTOMFIELD_OPENING_CLOSING_TAGS_UTIL = {
  stringVarOpening: /⩚/g,
  stringVarOpeningStr: "⩚",
  stringVarClosing: /⩛/g,
  stringVarClosingStr: "⩛",
};
export const ENDRESULT_FORMULAE_OPENING_CLOSING_TAGS_UTIL = {
  stringVarOpening: /⨭/g,
  stringVarOpeningStr: "⨭",
  stringVarClosing: /⨮/g,
  stringVarClosingStr: "⨮",
};
export const ENDRESULT_STATIC_VARS_OPENING_CLOSING_TAGS_UTIL = {
  stringVarOpening: /⋋/g,
  stringVarOpeningStr: "⋋",
  stringVarClosing: /⋌/g,
  stringVarClosingStr: "⋌",
};
export const ENDRESULT_QRCODE_OPENING_CLOSING_TAGS_UTIL = {
  stringVarOpening: /⫍/g,
  stringVarOpeningStr: "⫍",
  stringVarClosing: /⫎/g,
  stringVarClosingStr: "⫎",
};
export const INVOICE_OPENING_CLOSING_TAGS_UTIL = {
  stringVarOpening: /⊞/g,
  stringVarOpeningStr: "⊞",
  stringVarClosing: /⊟/g,
  stringVarClosingStr: "⊟",
};
export const INVOICE_STATIC_OPENING_CLOSING_TAGS_UTIL = {
  stringVarOpening: /⊰/g,
  stringVarOpeningStr: "⊰",
  stringVarClosing: /⊱/g,
  stringVarClosingStr: "⊱",
};

export const ENDRESULT_STATICS = {
  /**"backoffice fees": {
    label: "backoffice fees",
    value: "backofficeFees",
    type: "backofficeFees",
  },
  "client fees": {
    label: "client fees",
    value: "clientFees",
    type: "clientFees",
  },
  "ussd fees": {
    label: "ussd fees",
    value: "ussdFees",
    type: "ussdFees",
  },

  "backoffice received payments": {
    label: "backoffice received payments",
    value: "backofficeReceivedPayments",
    type: "backofficeReceivedPayments",
  },
  "client received payments": {
    label: "client received payments",
    value: "clientReceivedPayments",
    type: "clientReceivedPayments",
  },
  "ussd received payments": {
    label: "ussd received payments",
    value: "ussdReceivedPayments",
    type: "ussdReceivedPayments",
  },

  "backoffice pending bills": {
    label: "backoffice pending bills",
    value: "backofficePendingBills",
    type: "backofficePendingBills",
  },
  "client pending bills": {
    label: "client pending bills",
    value: "clientPendingBills",
    type: "clientPendingBills",
  },
  "ussd pending bills": {
    label: "ussd pending bills",
    value: "ussdPendingBills",
    type: "ussdPendingBills",
  },

  "backoffice bill ref no": {
    label: "backoffice bill ref no",
    value: "backofficeBillRefNo",
    type: "backofficeBillRefNo",
  },
  "client bill ref no": {
    label: "client bill ref no",
    value: "clientBillRefNo",
    type: "clientBillRefNo",
  },
  "ussd bill ref no": {
    label: "ussd bill ref no",
    value: "ussdBillRefNo",
    type: "ussdBillRefNo",
  },
  **/

  "transaction ref no": {
    label: "transaction ref no",
    value: "transactionRefNo",
    type: "transactionRefNo",
  },
  "service name": {
    label: "service name",
    value: "serviceName",
    type: "serviceName",
  },

  "transaction creation date": {
    label: "transaction creation date",
    value: "transactionCreationDate",
    type: "transactionCreationDate",
  },
  "transaction completion date": {
    label: "transaction completion date",
    value: "transactionCompletionDate",
    type: "transactionCompletionDate",
  },

  "transaction initiator full names": {
    label: "transaction initiator full names",
    value: "transactionInitiatorFullNames",
    type: "transactionInitiatorFullNames",
  },
  "transaction initiator first name": {
    label: "transaction initiator first name",
    value: "transactionInitiatorFirstName",
    type: "transactionInitiatorFirstName",
  },
  "transaction initiator phone": {
    label: "transaction initiator phone",
    value: "transactionInitiatorPhone",
    type: "transactionInitiatorPhone",
  },
  "transaction initiator email": {
    label: "transaction initiator email",
    value: "transactionInitiatorEmail",
    type: "transactionInitiatorEmail",
  },

  "client full names": {
    label: "client full names",
    value: "clientFullNames",
    type: "clientFullNames",
  },
  "client first name": {
    label: "client first name",
    value: "clientFirstName",
    type: "clientFirstName",
  },
  "client phone": {
    label: "client phone",
    value: "clientPhone",
    type: "clientPhone",
  },
  "client email": {
    label: "client email",
    value: "clientEmail",
    type: "clientEmail",
  },

  "current department": {
    label: "current department",
    value: "currentDepartment",
    type: "currentDepartment",
  },
  "current department with levels": {
    label: "current department with levels",
    value: "currentDepartmentWithLevels",
    type: "currentDepartmentWithLevels",
  },
  "current department with level approvers": {
    label: "current department with level approvers",
    value: "currentDepartmentWithLevelApprovers",
    type: "currentDepartmentWithLevelApprovers",
  },

  "previous departments": {
    label: "previous departments",
    value: "previousDepartments",
    type: "previousDepartments",
  },
  "previous departments with levels": {
    label: "previous departments with levels",
    value: "previousDepartmentsWithLevels",
    type: "previousDepartmentsWithLevels",
  },
  "previous departments with level approvers": {
    label: "previous departments with level approvers",
    value: "previousDepartmentsWithLevelApprovers",
    type: "previousDepartmentsWithLevelApprovers",
  },

  "next departments": {
    label: "next departments",
    value: "nextDepartments",
    type: "nextDepartments",
  },
  "next departments with levels": {
    label: "next departments with levels",
    value: "nextDepartmentsWithLevels",
    type: "nextDepartmentsWithLevels",
  },

  "current date": {
    label: "current date",
    value: "currentDate",
    type: "currentDate",
  },
  "file verification url": {
    label: "file verification url",
    value: "fileVerificationURL",
    type: "fileVerificationURL",
  },
};
export const ENDRESULT_DECORATORS = {
  "to lowercase": {
    label: "to lowercase",
    value: "toLowerCase",
    type: "toLowerCase",
  },
  "to uppercase": {
    label: "to uppercase",
    value: "toUpperCase",
    type: "toUpperCase",
  },
  "date format:- 1970-01-01 23:09:12": {
    label: "date format:- 1970-01-01 23:09:12",
    value: "YYYY-MM-DD HH:mm:ss",
    type: "date",
  },
  "date format:- 23/12/1970": {
    label: "date format:- 23/12/1970",
    value: "DD/MM/YYYY",
    type: "date",
  },
  "date format:- 23/12/1970 12:18 pm": {
    label: "date format:- 23/12/1970 12:18 pm",
    value: "DD/MM/YYYY h:mm a",
    type: "date",
  },
  "date format:- Aug 13, 1970": {
    label: "date format:- Aug 13, 1970",
    value: "MMM DD, YYYY",
    type: "date",
  },
  "date format:- December 13, 1970": {
    label: "date format:- December 13, 1970",
    value: "MMMM DD, YYYY",
    type: "date",
  },
  "number to words": {
    label: "number to words",
    value: "numberToWords",
    type: "numberToWords",
  },
};
// export const INVOICE_STATICS = {
//   invoice: {
//     label: "invoice",
//     value: "invoice",
//     type: "invoice",
//   },
// };

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

export const containsOnlyNumbers = (str) => {
  return /^(\d+.)*(\d+)$/.test(String(str));
};

/**
 * Convert shallow array to object
 * @param {*} param0
 * @returns
 */
export const shallowArrayToObject = ({ arr, defaultVal }) =>
  arr.reduce((a, v) => ({ ...a, [v]: defaultVal || v }), {});
