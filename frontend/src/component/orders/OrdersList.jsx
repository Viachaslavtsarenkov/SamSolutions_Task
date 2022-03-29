import React, {useEffect, useState} from "react";
import axios from "axios";
import Pagination from "../commom/Pagination";
import {Link} from "react-router-dom";

function OrdersList() {

    let [orders, setOrders] =  useState([]);
    let [page, setPage] = useState();
    let [totalPages, setTotalPages] = useState();
    let [url, setUrl] = useState({
        baseUrl : '/orders?',
        pageParam : '',
        sizeParam : '',
        sortParam : ''
    })


    useEffect(() => {
        getOrders();
    }, [page])

    function toPage(el) {
        setUrl({
            ...url,
            pageParam: "page=" + el + "&"
        });
        setPage(el);
    }

    function getOrders() {
        axios.get(url.baseUrl + url.pageParam)
            .then((response) => {
            setOrders(response.data['orders']);
            setTotalPages(response.data['totalPages']);
        })
    }

  return (
      <div>
          <table className={"book_list_table"}>
              <tr>
                  <th>ID</th>
                  <th>Пользователь</th>
                  <th>Дата</th>
                  <th>Статус</th>
                  <th>Количество товаров</th>
                  <th>Сумма</th>
              </tr>
              {orders.map((order, index) => (
                  <tr>
                      <td>{order.id}</td>
                      <td> f</td>
                      <td>{order.date}</td>
                      <td>{order.status}</td>
                      <td>{order.amount}</td>
                      <td>
                          <Link to={{
                              pathname : "/orders/" + order.id
                          }}> Посмотреть</Link>
                      </td>
                  </tr>
              ))}
          </table>
          <Pagination
              page={page}
              totalPages={totalPages}
              toPage={toPage}
          />
      </div>
  )
}

export default OrdersList;