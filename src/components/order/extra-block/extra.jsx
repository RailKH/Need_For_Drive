import React, { useState, useEffect } from "react";
import classnames from "classnames";
import { connect } from "react-redux";
import {
  setColorText,
  setDateStartText,
  setDateFinishText,
  setDateCountText,
  setRateText,
  setAdditionalText,
} from "../../../store/extra/action";

let checkboxData = [];
function Extra({
  id,
  listCars,
  listRate,
  changeProps,

  setAdditionalText,
  setDateCountText,
  setColorText,
  setRateText,
  setDateStartText,

  car,
  color,
  rate,
  dateCount,
  props,
}) {
  const [additional, setAdditional] = useState({
    checkbox1: false,
    checkbox2: false,
    checkbox3: false,
  });
  const [dateStart, setDateStart] = useState("");
  const [dateFinish, setDateFinish] = useState("");
  useEffect(() => {
    color && rate && dateCount && changeProps(true, "paramExtra");
  });
  let colorsCar = listCars.find((item) => item.name === car);
  function selectColor(color) {
    setColorText(color[0].toUpperCase() + color.slice(1));
  }

  function selectAdditional(item, name) {
    let value = !additional[item];
    setAdditional((prevState) => {
      return { ...prevState, [item]: value };
    });

    if (value) {
      checkboxData.push(name);
    } else {
      let deletItem = checkboxData.indexOf(name);
      checkboxData.splice(deletItem, 1);
    }
    setAdditionalText(checkboxData);
  }
  function selectDate(e, item) {
    if (item === "setDateStart") {
      setDateStart(e.target.value);
      setDateStartText(e.target.value);
    } else {
      setDateFinish(e.target.value);
      setDateCountText(diffDates(e.target.value));
    }
  }
  function diffDates(date_finish) {
    if (dateStart) {
      let diffDate = Math.floor(
        new Date(new Date(date_finish) - new Date(dateStart)) / (1000 * 60 * 60)
      );
      if (diffDate % 24 == 0) {
        return `${diffDate / 24}д`;
      } else {
        let dif = diffDate % 24;
        if (diffDate < 24) {
          return `${Math.floor(dif)}ч`;
        }
        return `${(diffDate - dif) / 24}д ${Math.floor(dif)}ч`;
      }
    }
  }
  return (
    <div
      className={classnames("order__content__extra", {
        disabled: id !== 2,
      })}>
      <div className="extra__form">
        <div className="extra__form__color">
          <p>Цвет</p>
          <div>
            <input
              type="radio"
              id="m0"
              name="color"
              onClick={() => selectColor("Любой")}
            />
            <label htmlFor="m0">
              <span />
              Любой
            </label>
          </div>
          {colorsCar &&
            colorsCar.colors.map((item, id) => (
              <div key={`${++id}_${item}`}>
                <input
                  type="radio"
                  id={`m${++id}`}
                  name="color"
                  onClick={() => selectColor(item)}
                />
                <label htmlFor={`m${id}`}>
                  <span />
                  {item[0].toUpperCase() + item.slice(1)}
                </label>
              </div>
            ))}
        </div>
        <div className="extra__form__date">
          <p>Дата аренды</p>
          <div>
            <label>С</label>
            <input
              type="datetime-local"
              value={dateStart}
              onChange={(e) => selectDate(e, "setDateStart")}
            />
          </div>
          <label>По</label>
          <input
            type="text"
            type="datetime-local"
            value={dateFinish}
            min={dateStart}
            onChange={(e) => selectDate(e, "setDateFinish")}
          />
        </div>
        <div className="extra__form__rate">
          <p>Тариф</p>
          {listRate && (
            <>
              {listRate.map((item, id) => {
                return (
                  <div className="wrap" key={`${id}_${item}`}>
                    <input
                      type="radio"
                      id={`t${id}`}
                      name="rate"
                      onClick={() => setRateText(item.rateTypeId.name)}
                    />
                    <label htmlFor={`t${id}`}>
                      <span />
                      {`${item.rateTypeId.name}, ${item.price}₽/${item.rateTypeId.unit}`}
                    </label>
                  </div>
                );
              })}
            </>
          )}
        </div>
        <div className="extra__form__additional">
          <p>Доп услуги</p>
          <div className="additional__checkbox">
            <input
              type="checkbox"
              className="additional__checkbox__custom"
              id="tank"
              name="tank"
              value="tank"
              checked={additional.checkbox1}
              onChange={() => selectAdditional("checkbox1", "Полный бак")}
            />
            <label htmlFor="tank">
              <span />
              Полный бак, 500р
            </label>
          </div>
          <div className="additional__checkbox">
            <input
              type="checkbox"
              className="additional__checkbox__custom"
              id="chair"
              name="chair"
              value="chair"
              checked={additional.checkbox2}
              onChange={() => selectAdditional("checkbox2", "Детское кресло")}
            />
            <label htmlFor="chair">
              <span />
              Детское кресло, 200р
            </label>
          </div>
          <div className="additional__checkbox">
            <input
              type="checkbox"
              className="additional__checkbox__custom"
              id="wheel"
              name="wheel"
              value="wheel"
              checked={additional.checkbox3}
              onChange={() => selectAdditional("checkbox3", "Правый руль")}
            />
            <label htmlFor="wheel">
              <span />
              Правый руль, 1600р
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    color: state.ext.color,
    dateStart: state.ext.dateStart,
    dateFinish: state.ext.dateFinish,
    rate: state.ext.rate,
    additional: state.ext.additional,
    dateCount: state.ext.dateCount,
    car: state.mod.selectCar,
  };
};
const mapDispatchToProps = {
  setColorText,
  setDateStartText,
  setDateFinishText,
  setRateText,
  setAdditionalText,
  setDateCountText,
};

export default connect(mapStateToProps, mapDispatchToProps)(Extra);
