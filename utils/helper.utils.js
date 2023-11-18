import lodash from "lodash";

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
    label: "Less than or equal to",
  },
  IN: {
    value: "in",
    label: "In",
  },
  NOT_IN: {
    value: "nin",
    label: "Not in",
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

export const SESSION_OBJECT_SOURCES = {
  ROOT: {
    value: "source",
    label: "Source",
  },
  TITLE: { value: "title", label: "Title" },
};

export const SESSION_OBJECT_MATCH_TYPES = {
  TERM: {
    value: "term",
    label: "Term",
  },
  FIELD: { value: "field", label: "Field" },
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
  TRANSACTION_REF_NO: {
    value: "transactionRefNo",
    label: "Transaction ref no",
  },
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
  PAYMENT_MODES: { value: "paymentModes", label: "Payment Modes" },
};

export const FEE_GROUP_FEE_STATICS = {
  NONE: { value: "", label: "None" },
  FEE_NAME: { value: "feeName", label: "Fee Name" },
  FEE_AMOUNT: { value: "feeAmount", label: "Fee Amount" },
  FEE_DATE: { value: "feeDate", label: "Fee Date" },
};

export const MAP_TYPES = {
  POSITION: { value: "position", label: "Select position on the map" },
  DRAW: { value: "draw", label: "Draw shapes on the map" },
  CURRENT_LOCATION: {
    value: "currentLocation",
    label: "Choose current Location",
  },
};

export const API_PAYLOAD_TYPES = {
  SCHEDULE: { value: "schedule", label: "Schedule" },
  API_ROUTE: { value: "apiRoute", label: "Api Route" },
};

export const API_DATA_STRUCTURE_TYPES = {
  CUSTOM: { value: "custom", label: "Custom" },
  STRING: { value: "string", label: "String" },
  NUMBER: { value: "number", label: "Number" },
  PLAIN_OBJECT: { value: "plainObject", label: "Plain Object" },
  ARRAY: { value: "array", label: "Array" },
};

export const API_COLLECTION_MAP_TYPES = {
  COLLECTION_FIELD: { value: "collectionField", label: "Collection Field" },
  CUSTOM: { value: "custom", label: "Custom" },
};

export const REQUEST_METHODS = {
  GET: { value: "get", label: "Get" },
  POST: { value: "post", label: "Post" },
  PATCH: { value: "patch", label: "Patch" },
  DELETE: { value: "delete", label: "Delete" },
};

export const REQUEST_DATA_PAYLOAD_TYPES = {
  ACCESS_TOKEN: { value: "accessToken", label: "Access Token" },
  CUSTOM: { value: "custom", label: "Custom" },
};

export const API_AUTH_TYPES = {
  NONE: { value: "none", label: "None" },
  ACCESS_TOKEN: { value: "accessToken", label: "Access Token" },
  BASIC_AUTH: { value: "basicAuth", label: "Basic Auth" },
};

export const API_DATA_TYPE = {
  INPUT: { value: "input", label: "Input" },
  OUTPUT: { value: "output", label: "Output" },
};

export const API_COLLECTION_INPUT_MAP_TYPES = {
  DATASTRUCTURE_FIELD: {
    value: "dataStructureField",
    label: "Data Structure Field",
  },
  CUSTOM: { value: "custom", label: "Custom" },
};

export const CLIENT_TYPES = {
  BACKOFFICE: {
    value: "backoffice",
    label: "Backoffice",
  },
  CLIENT: { value: "client", label: "Client" },
};

export const API_ASSIGNMENT_TYPE = {
  REPLACE: {
    value: "replace",
    label: "Replace",
  },
  APPEND: { value: "append", label: "Append" },
};

export const API_SECTION_TYPES = {
  HEADER: {
    value: "header",
    label: "Header",
  },
  BODY: { value: "body", label: "Body" },
};

export const CONDITIONAL_STATEMENT_VALUE_TYPE = {
  VALUE: {
    value: "value",
    label: "Value",
  },
  STEP_OBJECT: { value: "stepObject", label: "Step Object" },
};

export const QUERY_OBJECT_FIELD_VALUE_DECORATOR = {
  START_OF_DAY: {
    value: "startOfDay",
    label: "Start of Day",
  },
  END_OF_DAY: { value: "endOfDay", label: "End of Day" },
};

export const DB_FIELD_ACTION = {
  ADD_TO_ARRAY: {
    value: "addToArray",
    label: "Add To Array",
  },
  REMOVE_FROM_ARRAY: { value: "removeFromArray", label: "Remove From Array" },
};

export const BUILD_IMAGE_TYPES = {
  NO_IMAGE_INITIATOR: {
    value: "noImageInitiator",
    label: "No Image Initiator",
  },
  IMAGE_INITIATOR: { value: "imageInitiator", label: "Image Initiator" },
};

export const BUILD_IMAGE_FONT_FAMILY = {
  ARIAL: {
    value: "Arial",
    label: "Arial",
    default: true,
  },
  ARIAL_SANS: {
    value: "Arial, Sans",
    label: "Arial, Sans",
    default: true,
  },
  COMIC_SANS_MS: {
    value: "Comic Sans MS",
    label: "Comic Sans MS",
    default: true,
  },
};

export const PDF_PAGE_SIZE = {
  A4: {
    value: "A4",
    label: "A4",
  },
  A3: {
    value: "A3",
    label: "A3",
  },
  A5: {
    value: "A5",
    label: "A5",
  },
  A2: {
    value: "A2",
    label: "A2",
  },
};

export const PDF_PAGE_ORIENTATION = {
  PORTRAIT: {
    value: "portrait",
    label: "Portrait",
  },
  LANDSCAPE: {
    value: "landscape",
    label: "Landscape",
  },
};

export const PDF_BG_IMAGE_REPEAT = {
  REPEAT: {
    value: "repeat",
    label: "Repeat",
  },
  NO_REPEAT: {
    value: "no-repeat",
    label: "No Repeat",
  },
};

export const MAP_POSITION = {
  LATITUDE: {
    value: "latitude",
    label: "Latitude",
  },
  LONGITUDE: {
    value: "longitude",
    label: "Longitude",
  },
};

export const EDMS_OBJECT_TARGET = {
  DIR: {
    value: "dir",
    label: "Dir",
  },
  FILE: {
    value: "file",
    label: "File",
  },
};

export const EDMS_ACCESS_TYPES = {
  DIR: {
    value: "dir",
    label: "Dir",
  },
  FILE: {
    value: "file",
    label: "File",
  },
  OBJECT: {
    value: "object",
    label: "Object",
  },
  DATA: {
    value: "data",
    label: "Data",
  },
};

export const EDMS_ACCESS_RIGHTS = {
  MODIFY_ACCESS_RIGHTS: {
    value: "modifyAccessRights",
    label: "Modify Access Rights",
  },
  ADD_METADATA_OBJECTS: {
    value: "addMetadataObjects",
    label: "Add metadata objects",
  },
  MODIFY_METADATA_OBJECTS: {
    value: "modifyMetadataObjects",
    label: "Modify metadata objects",
  },
  DELETE_METADATA_OBJECTS: {
    value: "deleteMetadataObjects",
    label: "Delete metadata objects",
  },

  // PUBLIC_VIEW_FILE: { value: "publicViewFile", label: "Public View File" },
  VIEW_FILE: { value: "viewFile", label: "View File" },
  UPLOAD_FILE: { value: "uploadFile", label: "Upload File" },
  VERSION_FILE: { value: "versionFile", label: "Version File" },
  RENAME_FILE: { value: "renameFile", label: "Rename File" },
  DELETE_FILE: { value: "deleteFile", label: "Delete File" },
  RESTORE_DELETED_FILE: {
    value: "restoreDeletedFile",
    label: "Restore Deleted File",
  },
  VIEW_FILE_METADATA: {
    value: "viewFileMetadata",
    label: "View File Metadata",
  },
  MODIFY_FILE_METADATA: {
    value: "modifyFileMetadata",
    label: "Modify File Metadata",
  },

  // PUBLIC_VIEW_DIR: { value: "publicViewDir", label: "Public View Dir" },
  VIEW_DIR: { value: "viewDir", label: "View Dir" },
  MODIFY_DIR: { value: "modifyDir", label: "Modify Dir" },
  RENAME_DIR: { value: "renameDir", label: "Rename Dir" },
  DELETE_DIR: { value: "deleteDir", label: "Delete Dir" },
  RESTORE_DELETED_DIR: {
    value: "restoreDeletedDir",
    label: "Restore Deleted Dir",
  },
  VIEW_DIR_METADATA: {
    value: "viewDirMetadata",
    label: "View Dir Metadata",
  },
  MODIFY_DIR_METADATA: {
    value: "modifyDirMetadata",
    label: "Modify Dir Metadata",
  },
};

export const EDMS_ACCESS_TYPE_RIGHTS = {
  [EDMS_ACCESS_TYPES.DIR.value]: [
    // EDMS_ACCESS_RIGHTS.PUBLIC_VIEW_DIR,
    EDMS_ACCESS_RIGHTS.VIEW_DIR,
    EDMS_ACCESS_RIGHTS.MODIFY_DIR,
    EDMS_ACCESS_RIGHTS.RENAME_DIR,
    EDMS_ACCESS_RIGHTS.DELETE_DIR,
    EDMS_ACCESS_RIGHTS.RESTORE_DELETED_DIR,
  ],
  [EDMS_ACCESS_TYPES.FILE.value]: [
    // EDMS_ACCESS_RIGHTS.PUBLIC_VIEW_FILE,
    EDMS_ACCESS_RIGHTS.VIEW_FILE,
    EDMS_ACCESS_RIGHTS.UPLOAD_FILE,
    EDMS_ACCESS_RIGHTS.VERSION_FILE,
    EDMS_ACCESS_RIGHTS.RENAME_FILE,
    EDMS_ACCESS_RIGHTS.DELETE_FILE,
    EDMS_ACCESS_RIGHTS.RESTORE_DELETED_FILE,
  ],
  [EDMS_ACCESS_TYPES.OBJECT.value]: [
    EDMS_ACCESS_RIGHTS.ADD_METADATA_OBJECTS,
    EDMS_ACCESS_RIGHTS.MODIFY_METADATA_OBJECTS,
    EDMS_ACCESS_RIGHTS.DELETE_METADATA_OBJECTS,
  ],
  [`${EDMS_ACCESS_TYPES.DATA.value}_file`]: [
    EDMS_ACCESS_RIGHTS.MODIFY_ACCESS_RIGHTS,
    EDMS_ACCESS_RIGHTS.VIEW_FILE_METADATA,
    EDMS_ACCESS_RIGHTS.MODIFY_FILE_METADATA,
  ],
  [`${EDMS_ACCESS_TYPES.DATA.value}_dir`]: [
    EDMS_ACCESS_RIGHTS.MODIFY_ACCESS_RIGHTS,
    EDMS_ACCESS_RIGHTS.VIEW_DIR_METADATA,
    EDMS_ACCESS_RIGHTS.MODIFY_DIR_METADATA,
    EDMS_ACCESS_RIGHTS.VIEW_FILE_METADATA,
    EDMS_ACCESS_RIGHTS.MODIFY_FILE_METADATA,
  ],
};

export const SYSTEM_WIDE_SETTINGS = {
  SETTINGS_MODULE: "settingsModule.status",

  USER_MODULE: "userModule.status",
  USER_MODULE_READ: "userModule.read.status",
  USER_MODULE_WRITE: "userModule.write.status",
  USER_MODULE_DELETE: "userModule.delete.status",
  USER_MODULE_LOGIN: "userModule.login.status",

  OBJECT_MODULE: "objectsModule.status",
  OBJECT_MODULE_READ: "objectsModule.read.status",
  OBJECT_MODULE_WRITE: "objectsModule.write.status",
  OBJECT_MODULE_DELETE: "objectsModule.delete.status",

  DEPARTMENT_MODULE: "departmentsModule.status",
  DEPARTMENT_MODULE_READ: "departmentsModule.read.status",
  DEPARTMENT_MODULE_WRITE: "departmentsModule.write.status",
  DEPARTMENT_MODULE_DELETE: "departmentsModule.delete.status",

  MESSAGE_MODULE: "messagesModule.status",
  MESSAGE_MODULE_READ: "messagesModule.read.status",
  MESSAGE_MODULE_WRITE: "messagesModule.write.status",
  MESSAGE_MODULE_DELETE: "messagesModule.delete.status",

  DESIGN_MODULE: "designsModule.status",
  DESIGN_MODULE_READ: "designsModule.read.status",
  DESIGN_MODULE_WRITE: "designsModule.write.status",
  DESIGN_MODULE_DELETE: "designsModule.delete.status",

  WORKFLOW_MODULE: "workflowModule.status",
  WORKFLOW_MODULE_MAX_WORKFLOWS: "workflowModule.maxWorkflows",
  WORKFLOW_MODULE_SERVICE_CREATE:
    "workflowModule.services.createService.status",
  WORKFLOW_MODULE_SERVICE_MODIFY:
    "workflowModule.services.modifyService.status",
  WORKFLOW_MODULE_SERVICE_DELETE:
    "workflowModule.services.deleteService.status",

  WORKFLOW_MODULE_SERVICE_DEPARTMENTS:
    "workflowModule.services.serviceDepartments.status",
  WORKFLOW_MODULE_SERVICE_DEPARTMENTS_READ:
    "workflowModule.services.serviceDepartments.read.status",
  WORKFLOW_MODULE_SERVICE_DEPARTMENTS_WRITE:
    "workflowModule.services.serviceDepartments.write.status",
  WORKFLOW_MODULE_SERVICE_DEPARTMENTS_DELETE:
    "workflowModule.services.serviceDepartments.delete.status",

  WORKFLOW_MODULE_SERVICE_FEES: "workflowModule.services.serviceFees.status",
  WORKFLOW_MODULE_SERVICE_FEES_READ:
    "workflowModule.services.serviceFees.read.status",
  WORKFLOW_MODULE_SERVICE_FEES_WRITE:
    "workflowModule.services.serviceFees.write.status",
  WORKFLOW_MODULE_SERVICE_FEES_DELETE:
    "workflowModule.services.serviceFees.delete.status",

  WORKFLOW_MODULE_SERVICE_STEPS: "workflowModule.services.serviceSteps.status",
  WORKFLOW_MODULE_SERVICE_STEPS_READ:
    "workflowModule.services.serviceSteps.read.status",
  WORKFLOW_MODULE_SERVICE_STEPS_WRITE:
    "workflowModule.services.serviceSteps.write.status",
  WORKFLOW_MODULE_SERVICE_STEPS_DELETE:
    "workflowModule.services.serviceSteps.delete.status",

  WORKFLOW_MODULE_SERVICE_STEP_OBJECTS:
    "workflowModule.services.stepObjects.status",
  WORKFLOW_MODULE_SERVICE_STEP_OBJECTS_READ:
    "workflowModule.services.stepObjects.read.status",
  WORKFLOW_MODULE_SERVICE_STEP_OBJECTS_WRITE:
    "workflowModule.services.stepObjects.write.status",
  WORKFLOW_MODULE_SERVICE_STEP_OBJECTS_DELETE:
    "workflowModule.services.stepObjects.delete.status",

  WORKFLOW_MODULE_SERVICE_ENDRESULT:
    "workflowModule.services.serviceEndresult.status",
  WORKFLOW_MODULE_SERVICE_ENDRESULT_READ:
    "workflowModule.services.serviceEndresult.read.status",
  WORKFLOW_MODULE_SERVICE_ENDRESULT_WRITE:
    "workflowModule.services.serviceEndresult.write.status",
  WORKFLOW_MODULE_SERVICE_ENDRESULT_DELETE:
    "workflowModule.services.serviceEndresult.delete.status",

  WORKFLOW_MODULE_SERVICE_TRANSACTION_TRANSITION:
    "workflowModule.services.transaction.transitionTransaction.status",
  WORKFLOW_MODULE_SERVICE_TRANSACTION_INITIATE:
    "workflowModule.services.transaction.initiateTransaction.status",
  WORKFLOW_MODULE_SERVICE_TRANSACTION_HISTORY_LIST:
    "workflowModule.services.transaction.transactionHistoryList.status",
  WORKFLOW_MODULE_SERVICE_TRANSACTION_FETCH_DATA:
    "workflowModule.services.transaction.fetchTransactionData.status",
  WORKFLOW_MODULE_SERVICE_TRANSACTION_MODIFY_DATA:
    "workflowModule.services.transaction.modifyTransactionData.status",
  WORKFLOW_MODULE_SERVICE_TRANSACTION_FETCH_STEPS:
    "workflowModule.services.transaction.fetchTransactionSteps.status",
  WORKFLOW_MODULE_SERVICE_TRANSACTION_COMPUTE_FEES:
    "workflowModule.services.transaction.computeTransactionFees.status",
  WORKFLOW_MODULE_SERVICE_TRANSACTION_FETCH_SUMMARY:
    "workflowModule.services.transaction.fetchTransactionSummary.status",
  WORKFLOW_MODULE_SERVICE_TRANSACTION_LINK_USER:
    "workflowModule.services.transaction.linkUser.status",
  WORKFLOW_MODULE_SERVICE_TRANSACTION_MANAGE_UNCLAIMED:
    "workflowModule.services.transaction.manageUnclaimed.status",
  WORKFLOW_MODULE_SERVICE_TRANSACTION_MANAGE_CLAIMED:
    "workflowModule.services.transaction.manageClaimed.status",
  WORKFLOW_MODULE_SERVICE_TRANSACTION_MANAGE_RETURNED:
    "workflowModule.services.transaction.manageReturned.status",
  WORKFLOW_MODULE_SERVICE_TRANSACTION_MANAGE_REJECTED:
    "workflowModule.services.transaction.manageRejected.status",
  WORKFLOW_MODULE_SERVICE_TRANSACTION_MANAGE_APPROVED:
    "workflowModule.services.transaction.manageApproved.status",

  // WORKFLOW_MODULE_INITIATE_TRANSACTION:
  //   "workflowModule.services.initiateTransaction.status",
  // WORKFLOW_MODULE_SERVICE_TRANSITION:
  //   "workflowModule.services.serviceTransition.status",

  PAYMENT_MODULE: "paymentModule.status",
  ANALYTICS_MODULE: "analyticsModule.status",
  ANALYTICS_MODULE_SETTINGS: "analyticsModule.settings.status",

  DATASET_MODULE: "datasetModule.status",
  DATASET_MODULE_READ: "datasetModule.read.status",
  DATASET_MODULE_WRITE: "datasetModule.write.status",
  DATASET_MODULE_DELETE: "datasetModule.delete.status",
  DATASET_MODULE_UPLOAD_DATA: "datasetModule.uploadData.status",

  DATASET_MODULE_CONFIGURE_PERMUTATION:
    "datasetModule.configurePermutation.status",
  DATASET_MODULE_CONFIGURE_PERMUTATION_READ:
    "datasetModule.configurePermutation.read.status",
  DATASET_MODULE_CONFIGURE_PERMUTATION_WRITE:
    "datasetModule.configurePermutation.write.status",
  DATASET_MODULE_CONFIGURE_PERMUTATION_DELETE:
    "datasetModule.configurePermutation.delete.status",

  DATASET_MODULE_CONFIGURE_OFFICER_ACCESS:
    "datasetModule.configureOfficerAccess.status",
  DATASET_MODULE_CONFIGURE_OFFICER_ACCESS_READ:
    "datasetModule.configureOfficerAccess.read.status",
  DATASET_MODULE_CONFIGURE_OFFICER_ACCESS_WRITE:
    "datasetModule.configureOfficerAccess.write.status",
  DATASET_MODULE_CONFIGURE_OFFICER_ACCESS_DELETE:
    "datasetModule.configureOfficerAccess.delete.status",

  EDMS_MODULE: "edmsModule.status",
  CLIENT_SESSION_MODULE: "clientSessionMenuModule.status",
  CRONJOB_MODULE_READ: "cronjobModule.read.status",
  CRONJOB_MODULE_WRITE: "cronjobModule.write.status",
  CRONJOB_MODULE_DELETE: "cronjobModule.delete.status",
  CRONJOB_MODULE_EXECUTE: "cronjobModule.execute.status",
};

export const EDMS_RESOURCE_ACTION_TYPE = {
  MOVE: "move",
  COPY: "copy",
};

export const EDMS_LINK_SHARE_RIGHTS = {
  VIEW: { value: "view", label: "Can View" },
  EDIT: { value: "edit", label: "Can Edit" },
};

export const EDMS_LAYOUT_TYPE = {
  LIST: "list",
  GRID: "grid",
};

export const SYSTEM_WIDE_SETTING_ACTIONS = {
  EQUALS: { value: "equals", label: "EqualS" },
  NOT_EQUAL: { value: "notEquals", label: "Not Equals" },
  GREATER_THAN: { value: "greaterThan", label: "Greater Than" },
  GREATER_THAN_OR_EQUALS_TO: {
    value: "greateThanOrEqualTo",
    label: "Greater Than Or Equals To",
  },
  LESS_THAN: { value: "lessThan", label: "Less Than" },
  LESS_THAN_OR_EQUALS_TO: {
    value: "lessThanOrEqualsTo",
    label: "Less Than Or Equals To",
  },
};

export const DATE_COMPUTE_FIELD_TYPES = {
  CUSTOM: { value: "custom", label: "Custom" },
  FIELD: { value: "field", label: "Field" },
};

export const DATE_COMPUTE_OPERAND_DIFF = {
  NONE: { value: "", label: "None" },
  START: { value: "start", label: "Start" },
  END: { value: "end", label: "End" },
};

export const DATE_COMPUTE_OPERAND_DIFF_TYPE = {
  SECOND: { value: "second", label: "Second" },
  MINUTE: { value: "minute", label: "Minute" },
  HOUR: { value: "hour", label: "Hour" },
  DAY: { value: "day", label: "Day" },
  WEEK: { value: "week", label: "Week" },
  MONTH: { value: "month", label: "Month" },
  YEAR: { value: "year", label: "Year" },
};

// export const OBJECT_API_TYPE = { INPUT: "input", OUTPUT: "output" };

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

export const API_OBJECT_QUERY_OPENING_CLOSING_TAGS_UTIL = {
  stringVarOpening: /<<<!/g,
  stringVarOpeningStr: "<<<!",
  stringVarClosing: /!>>>/g,
  stringVarClosingStr: "!>>>",
};

export const QUERY_OBJECT_OPENING_CLOSING_TAGS_UTIL = {
  stringVarOpening: /⫪/g,
  stringVarOpeningStr: "⫪",
  stringVarClosing: /⫫/g,
  stringVarClosingStr: "⫫",
};

export const IMAGE_BUILDER_OPENING_CLOSING_TAGS_UTIL = {
  stringVarOpening: /⟖/g,
  stringVarOpeningStr: "⟖",
  stringVarClosing: /⟗/g,
  stringVarClosingStr: "⟗",
};

export const FEE_FORMULAE_OPENING_CLOSING_TAGS_UTIL = {
  stringVarOpening: /◎/g,
  stringVarOpeningStr: "◎",
  stringVarClosing: /◉/g,
  stringVarClosingStr: "◉",
};

export const ENDRESULT_STATICS = {
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

  "transaction initiator username": {
    label: "transaction initiator username",
    value: "transactionInitiatorUsername",
    type: "transactionInitiatorUsername",
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
  "transaction initiator boxoffice": {
    label: "transaction initiator boxoffice",
    value: "transactionInitiatorBoxOffice",
    type: "transactionInitiatorBoxOffice",
  },

  "client username": {
    label: "client username",
    value: "clientUsername",
    type: "clientUsername",
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
  "client boxoffice": {
    label: "client boxoffice",
    value: "clientBoxOffice",
    type: "clientBoxOffice",
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

  //--new start
  "current department status": {
    label: "current department status",
    value: "currentDepartmentStatus",
    type: "currentDepartmentStatus",
  },
  "current department created date": {
    label: "current department created date",
    value: "currentDepartmentCreatedDate",
    type: "currentDepartmentCreatedDate",
  },
  "current department updated date": {
    label: "current department updated date",
    value: "currentDepartmentUpdatedDate",
    type: "currentDepartmentUpdatedDate",
  },
  "current department name": {
    label: "current department name",
    value: "currentDepartmentName",
    type: "currentDepartmentName",
  },
  "current department level name": {
    label: "current department level name",
    value: "currentDepartmentLevelName",
    type: "currentDepartmentLevelName",
  },
  "current department level approval status": {
    //at the department level
    label: "current department level approval status",
    value: "currentDepartmentLevelApprovalStatus",
    type: "currentDepartmentLevelApprovalStatus",
  },
  "current department level user full names": {
    label: "current department level user full names",
    value: "currentDepartmentLevelUserFullNames",
    type: "currentDepartmentLevelUserFullNames",
  },
  "current department level username": {
    label: "current department level username",
    value: "currentDepartmentLevelUsername",
    type: "currentDepartmentLevelUsername",
  },
  "current department level assign date": {
    label: "current department level assign date",
    value: "currentDepartmentLevelAssignDate",
    type: "currentDepartmentLevelAssignDate",
  },
  "current department level completion date": {
    label: "current department level completion date",
    value: "currentDepartmentLevelCompletionDate",
    type: "currentDepartmentLevelCompletionDate",
  },
  //--new end

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
  "transaction verification url": {
    label: "transaction verification url",
    value: "transactionVerificationURL",
    type: "transactionVerificationURL",
  },
};

export const ENDRESULT_STATICS_GROUP = {
  generic: {
    ["transaction verification url"]: {
      ...ENDRESULT_STATICS["transaction verification url"],
    },
    ["file verification url"]: {
      ...ENDRESULT_STATICS["file verification url"],
    },
    ["current date"]: {
      ...ENDRESULT_STATICS["current date"],
    },
    ["transaction ref no"]: {
      ...ENDRESULT_STATICS["transaction ref no"],
    },
    ["service name"]: {
      ...ENDRESULT_STATICS["service name"],
    },
    ["transaction creation date"]: {
      ...ENDRESULT_STATICS["transaction creation date"],
    },
    ["transaction completion date"]: {
      ...ENDRESULT_STATICS["transaction completion date"],
    },
    ["transaction initiator username"]: {
      ...ENDRESULT_STATICS["transaction initiator username"],
    },
    ["transaction initiator full names"]: {
      ...ENDRESULT_STATICS["transaction initiator full names"],
    },
    ["transaction initiator first name"]: {
      ...ENDRESULT_STATICS["transaction initiator first name"],
    },
    ["transaction initiator phone"]: {
      ...ENDRESULT_STATICS["transaction initiator phone"],
    },
    ["transaction initiator email"]: {
      ...ENDRESULT_STATICS["transaction initiator email"],
    },
    ["transaction initiator boxoffice"]: {
      ...ENDRESULT_STATICS["transaction initiator boxoffice"],
    },
  },
  client: {
    ["client username"]: {
      ...ENDRESULT_STATICS["client username"],
    },
    ["client full names"]: {
      ...ENDRESULT_STATICS["client full names"],
    },
    ["client first name"]: {
      ...ENDRESULT_STATICS["client first name"],
    },
    ["client phone"]: {
      ...ENDRESULT_STATICS["client phone"],
    },
    ["client email"]: {
      ...ENDRESULT_STATICS["client email"],
    },
    ["client boxoffice"]: {
      ...ENDRESULT_STATICS["client boxoffice"],
    },
  },
  department: {
    ["current department"]: {
      ...ENDRESULT_STATICS["current department"],
    },
    ["current department with levels"]: {
      ...ENDRESULT_STATICS["current department with levels"],
    },
    ["current department with level approvers"]: {
      ...ENDRESULT_STATICS["current department with level approvers"],
    },
    ["previous departments"]: {
      ...ENDRESULT_STATICS["previous departments"],
    },
    ["previous departments with levels"]: {
      ...ENDRESULT_STATICS["previous departments with levels"],
    },
    ["previous departments with level approvers"]: {
      ...ENDRESULT_STATICS["previous departments with level approvers"],
    },
    ["next departments"]: {
      ...ENDRESULT_STATICS["next departments"],
    },
    ["next departments with levels"]: {
      ...ENDRESULT_STATICS["next departments with levels"],
    },

    //start
    ["current department status"]: {
      ...ENDRESULT_STATICS["current department status"],
    },
    ["current department created date"]: {
      ...ENDRESULT_STATICS["current department created date"],
    },
    ["current department updated date"]: {
      ...ENDRESULT_STATICS["current department updated date"],
    },
    ["current department name"]: {
      ...ENDRESULT_STATICS["current department name"],
    },
    ["current department level name"]: {
      ...ENDRESULT_STATICS["current department level name"],
    },
    ["current department level approval status"]: {
      ...ENDRESULT_STATICS["current department level approval status"],
    },
    ["current department level user full names"]: {
      ...ENDRESULT_STATICS["current department level user full names"],
    },
    ["current department level username"]: {
      ...ENDRESULT_STATICS["current department level username"],
    },
    ["current department level assign date"]: {
      ...ENDRESULT_STATICS["current department level assign date"],
    },
    ["current department level completion date"]: {
      ...ENDRESULT_STATICS["current department level completion date"],
    },
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
  "date format:- 19.7.18": {
    label: "date format:- 19.7.18",
    value: "D.M.YY",
    type: "date",
  },
  "date format:- 19.07.18": {
    label: "date format:- 19.07.18",
    value: "DD.MM.YY",
    type: "date",
  },
  "number to words": {
    label: "number to words",
    value: "numberToWords",
    type: "numberToWords",
  },
  "number format with comma": {
    label: "number format with comma",
    value: "numberFormatWithComma",
    type: "numberFormatWithComma",
  },
  "remove all spaces": {
    label: "remove all spaces",
    value: "removeAllSpaces",
    type: "removeAllSpaces",
  },
  trim: {
    label: "trim",
    value: "trim",
    type: "trim",
  },
  "encode to base64": {
    label: "encode to base64",
    value: "encodeToBase64",
    type: "encodeToBase64",
  },
  "decode from base64": {
    label: "decode from base64",
    value: "decodeFromBase64",
    type: "decodeFromBase64",
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
 * @param {*} param0
 * @returns String
 */
export const largedatasetFieldBinding = ({ fieldsData = {} }) => {
  if (lodash.isEmpty(fieldsData)) return "";

  let dataList = [];
  for (const fieldName of Object.keys(fieldsData)) {
    // dataList = [...dataList, `${fieldName}:- ${fieldsData[fieldName]}`];
    dataList = [...dataList, fieldsData[fieldName]];
  }
  return dataList.join(" | ");
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
 * Check if module(s) meets the criteria
 * @required {*} settings
 * @required {*} modules [
                            {
                                module: "e.y.z",
                                value: "abc",
                                action:
                                "equals | notEqual | greaterThan | greateThanOrEqualTo | lessThan  | lessThanOrEqualTo",
                            },
                        ]
 * @optional {*} any determines whether if any of the modules returns true or all must return true.
 */
export const validateModuleAccess = ({
  settings = {},
  modules = [],
  any = true,
  isSuper = false,
}) => {
  if (isSuper) return true; //is super admin just allow

  const actionsList = Object.values(SYSTEM_WIDE_SETTING_ACTIONS).map(
    ({ value }) => value
  );

  let boolVals = [];
  for (const { module, action, value } of modules) {
    //ensure action is valid
    if (actionsList.indexOf(action) === -1) {
      //   falseyValue = false;
      boolVals = [...boolVals, false];
      continue;
    }

    const settingsValue = extractNestedKeyValueDotNotation({
      obj: { ...settings },
      dotNotationPath: module,
    });

    if (lodash.isUndefined(settingsValue)) {
      //   falseyValue = false;
      boolVals = [...boolVals, false];
      continue;
    }

    //check if its meets the crietria

    if (action === SYSTEM_WIDE_SETTING_ACTIONS.EQUALS.value) {
      boolVals = [...boolVals, value === settingsValue];
    } else if (action === SYSTEM_WIDE_SETTING_ACTIONS.NOT_EQUAL.value) {
      boolVals = [...boolVals, value !== settingsValue];
    } else if (action === SYSTEM_WIDE_SETTING_ACTIONS.GREATER_THAN.value) {
      boolVals = [...boolVals, value > settingsValue];
    } else if (
      action === SYSTEM_WIDE_SETTING_ACTIONS.GREATER_THAN_OR_EQUALS_TO.value
    ) {
      boolVals = [...boolVals, value >= settingsValue];
    } else if (action === SYSTEM_WIDE_SETTING_ACTIONS.LESS_THAN.value) {
      boolVals = [...boolVals, value < settingsValue];
    } else if (
      action === SYSTEM_WIDE_SETTING_ACTIONS.LESS_THAN_OR_EQUALS_TO.value
    ) {
      boolVals = [...boolVals, value <= settingsValue];
    } else {
      //default false.
      boolVals = [...boolVals, false];
    }
  }

  let returnStatus = false;
  if (any && boolVals.indexOf(true) !== -1) {
    returnStatus = true;
  } else if (!any && boolVals.indexOf(false) !== -1) {
    //check if there is a falsey value
    returnStatus = false;
  } else if (!any && boolVals.indexOf(true) !== -1) {
    //check if there is a truthy value
    returnStatus = true;
  }

  return returnStatus;
};

/**
 * Extract value of a dot notation path in an object even when nested inside array
 * @required {*} obj {}
 * @required {*} dotNotationPath x.y
 * @returns val
 */
const extractNestedKeyValueDotNotationSuper = ({
  obj,
  dotNotationPath,
  isInit = true,
  pathList = [],
}) => {
  if (lodash.isEmpty(pathList) && !isInit) return obj;

  pathList = !lodash.isEmpty(pathList)
    ? pathList
    : !lodash.isEmpty(dotNotationPath)
    ? dotNotationPath.split(".")
    : [];

  const key = pathList.shift();

  const value = lodash.isPlainObject(obj) ? obj[key] : undefined;

  //loop the array & flatten it finally on the result.
  if (!lodash.isEmpty(pathList) && lodash.isArray(obj[key])) {
    let parsedList = [];
    for (const itemObj of obj[key]) {
      const res = extractNestedKeyValueDotNotationSuper({
        obj: { ...itemObj },
        dotNotationPath,
        isInit: false,
        pathList: [...pathList],
      });
      parsedList = [...parsedList, res];
    }
    return parsedList;
  }

  if (lodash.isUndefined(value)) return;

  return extractNestedKeyValueDotNotationSuper({
    obj: value,
    dotNotationPath,
    isInit: false,
    pathList,
  });
};
export const extractNestedKeyValueDotNotationSuperInit = ({
  obj,
  dotNotationPath,
  isInit = true,
  pathList = [],
  flattenNestedArray = false,
}) => {
  const res = extractNestedKeyValueDotNotationSuper({
    obj,
    dotNotationPath,
    isInit,
    pathList,
  });

  if (!lodash.isArray(res) || !flattenNestedArray) return res;

  const flattenedRes = lodash.flattenDeep(res);

  return flattenedRes;
};

/**
 * Extract value of a dot notation path in an object.
 * @required {*} obj {}
 * @required {*} dotNotationPath x.y
 * @returns val
 */
export const extractNestedKeyValueDotNotation = ({
  obj,
  dotNotationPath,
  isInit = true,
  pathList = [],
}) => {
  if (lodash.isEmpty(pathList) && !isInit) return obj;

  pathList = !lodash.isEmpty(pathList)
    ? pathList
    : !lodash.isEmpty(dotNotationPath)
    ? dotNotationPath.split(".")
    : [];

  const key = pathList.shift();

  const value = lodash.isPlainObject(obj) ? obj[key] : undefined;

  if (lodash.isUndefined(value)) return;

  return extractNestedKeyValueDotNotation({
    obj: value,
    dotNotationPath,
    isInit: false,
    pathList,
  });
};

/**
 * Append dot notation data to object.
 * @param {*} param0
 * @returns {}
 */
export const dotNotationToObjectValue = ({
  dotNotationKey,
  dotNotationValue,
  initialObject = {},
}) => {
  const parsedObject = lodash.set({}, dotNotationKey, dotNotationValue);
  return lodash.merge(initialObject, parsedObject);
};

/**
 * Carmel case to spaced text string
 * @param {*} str
 * @returns String
 */
export const fromCarmelCase = (str) => String(str).replace(/([A-Z])/g, " $1");

/**
 * Checks if string contains only letters
 * @param {*} str
 * @returns false | true
 */
export const containsOnlyLetters = (str) => {
  return Boolean(String(str).match(/^[A-Za-z]*$/));
};

/**
 * Checks whether string is numeric
 * @param {*} str
 * @returns false | true
 */
export const containsOnlyNumbers = (str) => {
  return Boolean(String(str).match(/^[.0-9]*$/));
};

/**
 * Convert shallow array to object
 * @param {*} param0
 * @returns
 */
export const shallowArrayToObject = ({ arr, defaultVal }) =>
  arr.reduce((a, v) => ({ ...a, [v]: defaultVal || v }), {});
