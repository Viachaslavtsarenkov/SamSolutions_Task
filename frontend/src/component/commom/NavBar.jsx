import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Navbar, Container, Nav, NavDropdown, Form, FormControl, Button} from 'react-bootstrap';
import cart from '../../icon/shopping-cart.png';
import logo from '../../icon/book.png'
import user from '../../icon/user.png'
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import LogIn from "../auth/LogIn";
import Main from "./Main";

class NavBar extends React.Component {

    render() {
        return (
            <div className={"wrapper"}>
                <Navbar bg="light" expand="lg">
                    <Container fluid>
                        <Navbar.Brand href="#">
                            <img src={logo} width={"50px"} height={"50px"} alt={"book store"}/>
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls="navbarScroll" />
                        <Navbar.Collapse id="navbarScroll">
                            <Nav
                                className="me-auto my-2 my-lg-0"
                                style={{ maxHeight: '100px' }}
                                navbarScroll
                            >
                                <Nav.Link href="/main">Главная страницы</Nav.Link>
                                <Nav.Link href="/signUp">Каталог книг</Nav.Link>
                                <NavDropdown title="Авторы" id="navbarScrollingDropdown">
                                    <NavDropdown.Item href="/authorNew">Добавить</NavDropdown.Item>
                                    <NavDropdown.Item href="/authors">Все</NavDropdown.Item>
                                </NavDropdown>
                                <NavDropdown title="Жанры" id="navbarScrollingDropdown">
                                    <NavDropdown.Item href="#action3">Драма</NavDropdown.Item>
                                    <NavDropdown.Item href="#action4">Фэнтези</NavDropdown.Item>
                                    <NavDropdown.Item href="#action4">Приключение</NavDropdown.Item>
                                    <NavDropdown.Item href="#action4">Научная литература</NavDropdown.Item>
                                </NavDropdown>
                            </Nav>
                            <Form className="d-flex">
                                <FormControl
                                    type="search"
                                    placeholder="Введите что-нибудь"
                                    className="me-2"
                                    aria-label="Search"
                                />
                                <Button variant="outline-success">Поиск</Button>
                            </Form>
                            <Nav>
                                <Nav.Link href="/cart">
                                    <img src={cart} width={"30px"} height={"30px"} alt={"cart"}/>
                                </Nav.Link>
                                <Nav.Link href="/login">
                                    <img src={user} width={"30px"} height={"30px"} alt={"person"}/>
                                </Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </div>

        );
    }
}
export default NavBar;