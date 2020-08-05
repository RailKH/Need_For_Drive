import React, { useState } from "react";
import classnames from "classnames";
import { connect } from "react-redux";

function Total(props) {
  return (
    <>
      {props.car.name && (
        <div
          className={classnames("order__content__total", {
            disabled: props.id !== 3,
          })}>
          <div className="total__form">
            {props.paramOrder && (
              <div className="total__form__title">
                <div>Ваш заказ подтверждён</div>
              </div>
            )}
            <div className="total__form__name">{props.car.name}</div>
            <div className="total__form__number">
              {props.car.number
                ? props.car.number.toUpperCase()
                : "K 761 HA 73"}
            </div>
            <div className="total__form__tank">
              <span>Топливо </span>
              {(props.additional[0].checked && `100`) || props.car.tank || `40`}
              %
            </div>
            <div className="total__form__date">
              <span>Доступна с </span>
              {new Date(props.dateStart).toLocaleString().slice(0, -3)}
            </div>
          </div>
          <div className="total__img">
            <img
              src={`http://api-factory.simbirsoft1.com${props.car.thumbnail.path}`}
            />
          </div>
        </div>
      )}
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    car: state.mod.selectCar,
    dateStart: state.ext.dateStart,
    additional: state.ext.additional,
  };
};
export default connect(mapStateToProps)(Total);