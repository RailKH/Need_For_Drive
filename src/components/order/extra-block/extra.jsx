import React, { useEffect } from "react";
import classnames from "classnames";
import { connect } from "react-redux";
import {
  setColorText,
  setDateStartText,
  setDateFinishText,
  setDateCountText,
  setRateText,
  // setAdditionalText,
  setTankText,
  setChairText,
  setWheelText,
} from "../../../store/extra/action";
const listAdditional = [
  { name: "Полный бак", price: 500, set: "tank", fun: "setTankText" },
  {
    name: "Детское кресло",
    price: 200,

    set: "chair",
    fun: "setChairText",
  },
  {
    name: "Правый руль",
    price: 1600,

    set: "wheel",
    fun: "setWheelText",
  },
];
function Extra({
  id,
  listRate,
  changeProps,
  car,
  color,
  rate,
  dateCount,
  setDateCountText,
  setColorText,
  setRateText,
  setDateStartText,
  setDateFinishText,
  setTankText,
  setChairText,
  setWheelText,
  dateStart,
  dateFinish,
  tank,
  chair,
}) {
  let colorsCar = car.colors && ["любой", ...car.colors];

  useEffect(() => {
    color && rate && dateCount && changeProps(true, "paramExtra");
  });
  useEffect(() => {
    dateStart && dateFinish && setDateCountText(diffDates());
  }, [dateStart, dateFinish]);

  function selectColor(color) {
    setColorText(color[0].toUpperCase() + color.slice(1));
  }

  function selectAdditional(fun, value) {
    console.log(fun, value);
    console.log(tank);
  }

  function diffDates() {
    if (dateStart) {
      let diffDate = Math.floor(
        new Date(new Date(dateFinish) - new Date(dateStart)) / (1000 * 60 * 60)
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
  function getFormate(value) {
    const date = new Date(value);
    const trueMonth = date.getMonth() + 1;
    const month = `${trueMonth}`.length === 1 ? `0${trueMonth}` : trueMonth;
    const day =
      `${date.getDate()}`.length === 1 ? `0${date.getDate()}` : date.getDate();
    const hour =
      `${date.getHours()}`.length === 1
        ? `0${date.getHours()}`
        : date.getHours();
    const minute =
      `${date.getMinutes()}`.length === 1
        ? `0${date.getMinutes()}`
        : date.getMinutes();

    return `${date.getFullYear()}-${month}-${day}T${hour}:${minute}`;
  }
  return (
    <div
      className={classnames("order__content__extra", {
        disabled: id !== 2,
      })}>
      <div className="extra__form">
        <div className="extra__form__color">
          <p>Цвет</p>

          {colorsCar &&
            colorsCar.map((item, id) => (
              <div key={`${id}_${item}`}>
                <input
                  type="radio"
                  id={`m${id}`}
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
              value={getFormate(dateStart)}
              onChange={(e) => {
                setDateStartText(new Date(e.target.value).getTime());
              }}
            />
          </div>
          <label>По</label>
          <input
            type="text"
            type="datetime-local"
            value={getFormate(dateFinish)}
            min={getFormate(dateStart)}
            onChange={(e) =>
              setDateFinishText(new Date(e.target.value).getTime())
            }
          />
        </div>
        <div className="extra__form__rate">
          <p>Тариф</p>
          {listRate &&
            listRate.map((item, id) => {
              return (
                <>
                  <div className="wrap" key={item.id}>
                    <input
                      type="radio"
                      id={`t${id}`}
                      name="rate"
                      onClick={() => setRateText(item)}
                    />
                    <label htmlFor={`t${id}`}>
                      <span />
                      {`${item.rateTypeId.name}, ${item.price}₽/${item.rateTypeId.unit}`}
                    </label>
                  </div>
                </>
              );
            })}
        </div>
        <div className="extra__form__additional">
          <p>Доп услуги</p>
          {listAdditional.map((item, id) => {
            return (
              <div className="additional__checkbox" key={`${id}_${item.set}`}>
                <input
                  type="checkbox"
                  className="additional__checkbox__custom"
                  id={item.set}
                  defaultChecked={[item.set]}
                  onChange={() => selectAdditional(item.fun, [item.set])}
                />
                <label htmlFor={item.set}>
                  <span />
                  {`${item.name}, ${item.price}p`}
                </label>
              </div>
            );
          })}
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
    // additional: state.ext.additional,
    dateCount: state.ext.dateCount,
    tank: state.ext.tank,
    chair: state.ext.chair,
    wheel: state.ext.wheel,
    car: state.mod.selectCar,
  };
};
const mapDispatchToProps = {
  setColorText,
  setDateStartText,
  setDateFinishText,
  setRateText,
  // setAdditionalText,
  setDateCountText,
  setTankText,
  setChairText,
  setWheelText,
};

export default connect(mapStateToProps, mapDispatchToProps)(Extra);
