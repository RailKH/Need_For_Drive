import React from "react";
import "./admin-menu.scss";
import { ReactComponent as Pen } from "../../../assets/icons/admin-menu/pen.svg";
import { ReactComponent as Form1 } from "../../../assets/icons/admin-menu/form1.svg";
import { ReactComponent as Order } from "../../../assets/icons/admin-menu/order.svg";
import { ReactComponent as Form2 } from "../../../assets/icons/admin-menu/form2.svg";
import { ReactComponent as Form3 } from "../../../assets/icons/admin-menu/form3.svg";
import { Link } from "react-router-dom";

export default function MenuBlock() {
  return (
    <div className="menu-block">
      <div className="menu-block_logo admin_logo">Need for car</div>
      <Link to="/admin/admin-car-setting">
        <div className="menu-block_auto admin_cart">
          <Pen className="block-logo" />
          Карточка автомобиля
        </div>
      </Link>
      <Link to="/admin/admin-error">
        <div className="menu-block_auto admin_list">
          <Form1 className="block-logo" />
          Список авто
        </div>
      </Link>
      <Link to="/admin/admin-main">
        <div className="menu-block_auto admin_order">
          <Order className="block-logo" />
          Заказы
        </div>
      </Link>
      <Link to="/admin/admin-point">
        <div className="menu-block_auto admin_menu1">
          <Form2 className="block-logo" />
          Добавление пунктов выдачи
        </div>
      </Link>
      <div className="menu-block_auto admin_menu2">
        <Form3 className="block-logo" />
        Menu 5
      </div>
    </div>
  );
}
