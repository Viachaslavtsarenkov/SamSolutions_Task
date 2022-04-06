# Book store

 ### Technologies used
* Spring, Spring Boot, Spring Security, Spring Data JPA
* React
* PostgreSQL
* Slf4j
* JUnit 5, Mockito, H2 db
 ***
 ### DB Schema
 ![image](https://user-images.githubusercontent.com/44998184/162007222-8667b398-fb0c-4726-a3af-719a678b6538.png)
 ***
 ### Roles
  * Guest
  * Admin
  * Customer
 ***  
 ### Authorized customers's scope
 * Login
 * Activate profile via email
 * View profile
 * View orders
 * Place order
 * Order payment
 * Cart(adding/removing books)
***
### Authorized admin's scope
 * Login
 * Books CRUD
 * Authors CRUD
 * Discounts CRUD
 * View Orders
 * Change order status
 * View users
***
### Guest's scope
* View books 
* registation 
* Cart(adding/removing books)

### Additional Info
 * Don't forget to enter email address and password in the properties file for correct email sending 
 **mail.username = your email**
 **mail.password = your password**
 * Also for payment systems(PayPal) you have to add: payment client id and payment secret key
 **paypal.client.id = your id**
 **paypal.client.secret = your key**
 
 
