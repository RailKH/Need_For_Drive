import {
  EXT_CHANGE_COLOR_TEXT,
  EXT_CHANGE_DATESTART_TEXT,
  EXT_CHANGE_DATEFINISH_TEXT,
  EXT_CHANGE_DATECOUNT_TEXT,
  EXT_CHANGE_RATE_TEXT,
  EXT_CHANGE_ADDITIONAL_TEXT,
  EXT_CHANGE_STATUSID_TEXT,
  EXT_CHANGE_PARAMORDER_TEXT,
  EXT_CHANGE_PRICE_TEXT,
  EXT_CHANGE_TANK_TEXT,
  EXT_CHANGE_CHAIR_TEXT,
  EXT_CHANGE_WHEEL_TEXT,
} from "./action";
// const listAdditional = [
//   { name: "Полный бак", price: 500, checked: false, props: "isFullTank" },
//   {
//     name: "Детское кресло",
//     price: 200,
//     checked: false,
//     props: "isNeedChildChair",
//   },
//   {
//     name: "Правый руль",
//     price: 1600,
//     checked: false,
//     props: "isRightWheel",
//   },
// ];
const defaultState = {
  color: "",
  dateStart: "",
  dateFinish: "",
  dateCount: "",
  rate: {},
  // additional: [].concat(listAdditional),
  orderStatusId: "",
  paramOrder: false,
  price: "",
  tank: false,
  chair: true,
  wheel: false,
};

export const extReducer = (state = defaultState, action) => {
  switch (action.type) {
    case EXT_CHANGE_COLOR_TEXT:
      return {
        ...state,
        color: action.payload,
      };
    case EXT_CHANGE_DATESTART_TEXT:
      return {
        ...state,
        dateStart: action.payload,
      };
    case EXT_CHANGE_DATEFINISH_TEXT:
      return {
        ...state,
        dateFinish: action.payload,
      };
    case EXT_CHANGE_DATECOUNT_TEXT:
      return {
        ...state,
        dateCount: action.payload,
      };
    case EXT_CHANGE_RATE_TEXT:
      return {
        ...state,
        rate: Object.assign({}, action.payload),
      };
    // case EXT_CHANGE_ADDITIONAL_TEXT:
    //   return {
    //     ...state,
    //     additional: [].concat(action.payload),
    //   };
    case EXT_CHANGE_STATUSID_TEXT:
      return {
        ...state,
        orderStatusId: action.payload,
      };
    case EXT_CHANGE_PARAMORDER_TEXT:
      return {
        ...state,
        paramOrder: action.payload,
      };
    case EXT_CHANGE_PRICE_TEXT:
      return {
        ...state,
        price: action.payload,
      };
    case EXT_CHANGE_TANK_TEXT:
      return {
        ...state,
        tank: action.payload,
      };
    case EXT_CHANGE_CHAIR_TEXT:
      return {
        ...state,
        chair: action.payload,
      };
    case EXT_CHANGE_WHEEL_TEXT:
      return {
        ...state,
        wheel: action.payload,
      };
  }
  return state;
};