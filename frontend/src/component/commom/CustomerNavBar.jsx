import React from 'react'
import {Button, Container, Form, FormControl, Nav, Navbar} from "react-bootstrap";
import logo from "../../icon/book.png";
import {Link} from "react-router-dom";
import cart from "../../icon/shopping-cart.png";
import user from "../../icon/user.png";

function CustomerNavBar() {

    function logOut() {
        localStorage.removeItem("user");
        window.location.reload();
    }

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
                        <Link to="/main">Главная страницы</Link>
                        <Link to="/signUp">Каталог книг</Link>
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
                        <Link to="/cart">
                            <img src={cart} width={"30px"} height={"30px"} alt={"cart"}/>
                        </Link>
                        <Link to="/person">
                            <img src={user} width={"30px"} height={"30px"} alt={"person"}/>
                        </Link>
                        <a onClick={logOut}> Выход</a>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </div>
    )
}

export default CustomerNavBar;