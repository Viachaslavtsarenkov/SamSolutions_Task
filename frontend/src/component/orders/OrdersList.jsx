import React, {useEffect, useState} from "react";
import axios from "axios";
import Pagination from "../commom/Pagination";
import {Link, Redirect, useHistory} from "react-router-dom";
import Util from "../../service/Util";
import loading from "../../icon/loading.gif";
import AuthorizationService from "../../service/AuthorizationService";
import OrderLocalization from "../localization/OrderLocalization";

function OrdersList() {

    let [orders, setOrders] =  useState([]);
    let [lang] = "ru";
    const history = useHistory()
    let [page, setPage] = useState(Util.getPage);
    let [totalPages, setTotalPages] = useState(-1);
    let [url] = useState({
        baseUrl : '/orders?',
        pageParam : '',
        sizeParam : '',
        sortParam : ''
    })


    useEffect(() => {
        getOrders();
    }, [page])

    function toPage(el) {
        Util.setUrl(Util.setPageParam(el),history)
        setPage(el);
    }

    function getOrders() {
        axios.get(url.baseUrl + url.pageParam)
            .then((response) => {
            setOrders(response.data['orders']);
            setTotalPages(response.data['totalPages']);
        })
    }

    if(!AuthorizationService.currentUserHasRole("ROLE_ADMIN")) {
        return <Redirect to={"/"}/>
    }

  return (
      <div>
          <table className={"book_list_table"}>
              <tr>
                  <th>ID</th>
                  <th>Дата</th>
                  <th>Статус</th>
                  <th>Количество товаров</th>
                  <th>Сумма</th>
              </tr>
              {orders.map((order) => (
                  <tr key={order.id}>
                      <td>{order.id}</td>
                      <td>{order.date}</td>
                      <td>
                          {OrderLocalization.locale[lang].NEW}
                      </td>
                      <td>{order.amount}</td>
                      <td>
                          <Link to={{
                              pathname : "/orders/" + order.id
                          }}> Посмотреть</Link>
                      </td>
                  </tr>
              ))}
          </table>
          {totalPages === -1 && (
              <div className={"loading_container"}>
                  <img src={loading} width={50} alt={"loading"}/>
              </div>
          )}
          {totalPages >= 0 && (
              <Pagination
                  page={page}
                  totalPages={totalPages}
                  toPage={toPage}
              />
          )}

      </div>
  )
}

export default OrdersList;