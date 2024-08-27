export const TABLE_HEADERS = [
  { key: "acceptNo", label: "Accept No", type: "text" },
  { key: "acceptSeq", label: "Accept Seq", type: "text" },
  { key: "itemNo", label: "Item No", type: "text" },
  { key: "itemName", label: "Item Name", type: "text" },
  { key: "spec", label: "Spec", type: "text" },
  { key: "storeHouse", label: "Store House", type: "text" },
  { key: "acceptDate", label: "Accept Date", type: "date" },
  { key: "enterQty", label: "Enter Qty", type: "number" },
  { key: "acceptUnits", label: "Accept Units", type: "text" },
  { key: "statusDescription", label: "Status", type: "text" },
  { key: "memo", label: "Memo", type: "text" },
  { key: "expireDate", label: "Expire Date", type: "date" },
  { key: "productionDate", label: "Production Date", type: "date" },
];

export const SEARCH = [
  { key: "acceptDate", label: "Accept Date", type: "date" },
  { key: "acceptNo", label: "Accept No", type: "text" },
];

export const SHELVE_HEADERS = [
  { key: "code", label: "Code", type: "text" },
  { key: "name", label: "Name", type: "text" },
  { key: "zone", label: "Zone", type: "text" },
  { key: "region", label: "Region", type: "text" },
  { key: "column", label: "Column", type: "text" },
  { key: "layer", label: "Layer", type: "number" },
  { key: "createdBy", label: "Created By", type: "text" },
  { key: "createdDate", label: "Created Date", type: "date" },
  { key: "updatedBy", label: "Updated By", type: "text" },
  { key: "updatedDate", label: "Updated Date", type: "date" },
];

export const SEARCH_SHELVE = [
  { key: "name", label: "Name", type: "text" },
  { key: "zone", label: "Zone", type: "text" },
];

export const USER_HEADERS = [
  { key: "firstName", label: "FirstName", type: "text" },
  { key: "lastName", label: "Last Name", type: "text" },
  { key: "userName", label: "User Name", type: "text" },
  { key: "roles", label: "Roles", type: "text" },
  { key: "lockoutEnabled", label: "Status", type: "text" },
];

export const SEARCH_USER = [
  { key: "username", label: "User Name", type: "text" },
  { key: "role", label: "Role", type: "text" },
];

export const ADD_USER = [
  { key: "firstName", label: "First Name", type: "text" },
  { key: "lastName", label: "Last Name", type: "text" },
  { key: "userName", label: "User Name", type: "text" },
  { key: "password", label: "Password", type: "password" },
  { key: "confirmPassword", label: "Confirm Password", type: "password" },
  {
    key: "roles",
    label: "Roles",
    type: "multi-select",
    options: [
      { value: "ADMIN", label: "Admin" },
      { value: "THU_KHO", label: "Thu Kho" },
    ],
  },
  { key: "status", label: "Status", type: "switch" },
];

export const UPDATE_USER = [
  { key: "firstName", label: "First Name", type: "text" },
  { key: "lastName", label: "Last Name", type: "text" },
  { key: "userName", label: "User Name", type: "text" },
  {
    key: "lockoutEnabled",
    label: "Status",
    type: "text",
  },
  {
    key: "roles",
    label: "Roles",
    type: "multi-select",
    options: [
      { value: "ADMIN", label: "Admin" },
      { value: "THU_KHO", label: "Thu Kho" },
    ],
  },
];

export const SHELVE_ITEM_HEADERS = [
  { key: "shelfId", label: "Shelf Id", type: "text" },
  { key: "acceptType", label: "Accept Type", type: "text" },
  { key: "acceptNo", label: "Accept No", type: "text" },
  { key: "acceptSeq", label: "Accept Seq", type: "text" },
  { key: "productId", label: "Product Id", type: "text" },
  { key: "productName", label: "Product Name", type: "text" },
  { key: "quantity", label: "Quantity", type: "text" },
  { key: "unit", label: "Unit", type: "text" },
  { key: "expireDate", label: "Expire Date", type: "date" },
];
