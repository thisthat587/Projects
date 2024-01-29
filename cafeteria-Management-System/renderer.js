const mysql = require("mysql2");

class cafe {
  #queryString;
  #connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "cafe",
  });

  constructor() {}

  onClickOfAddCustomerDetail() {
    document.getElementById("add-food-item").style.display = "none";
    document.getElementById("add-food-category").style.display = "none";
    document.getElementById("manage-customer-detail").style.display = "none";
    document.getElementById("manage-food-item").style.display = "none";
    document.getElementById("manage-food-category").style.display = "none";
    document.getElementById("add-customer-detail").style.display = "flex";
    document.getElementById("add-customer-detail").innerHTML = `
            <form id="add-customer" action="#" method="post">
                <h2><u>Add New Customer</u></h2>
                <table>
                    <tr>
                        <td id="td-padding">Name </td>
                        <td id="td-padding"><input id="cname" type="text" name="name" required></td>
                    </tr>
                    <tr>
                        <td id="td-padding">Gender </td>
                        <td id="td-padding">
                            <select style="margin-top: 5px" id="cgen" name="category" required>
                                <option value="" disabled selected>--SELECT--</option>
                                <option>MALE</option>
                                <option>FEMALE</option>
                                <option>OTHER</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td id="td-padding">Mobile </td>
                        <td id="td-padding"><input id="cmobile" type="text" name="mobile" required></td>
                    </tr>
                    <tr>
                        <td id="td-padding">Referred By </td>
                        <td id="td-padding"><input id="crefer" type="text" name="referring" required></td>
                    </tr>
                    <tr>
                        <td id="td-padding">Address </td>
                        <td id="td-padding"><textarea id="caddress" name="address" rows="4" required></textarea></td>
                    </tr>
                    </table>
                    <input id="add-customer-submit" type="submit" value="Submit">
                    </form>
                    `;
    // <button id="add-customer-submit">Submit</button>

    document
      .getElementById("add-customer-submit")
      .addEventListener("click", (event) => {
        event.preventDefault();
        const cName = document.getElementById("cname").value;
        const cGen = document.getElementById("cgen").value;
        const cMobile = document.getElementById("cmobile").value;
        const cRefer = document.getElementById("crefer").value;
        const cAddress = document.getElementById("caddress").value;

        this.#queryString = `INSERT INTO customers (name, gen, mobile, referring, address) VALUES (?, ?, ?, ?, ?)`;
        const values = [cName, cGen, cMobile, cRefer, cAddress];

        this.#connection.query(this.#queryString, values, (error, result) => {
          if (error) {
            return console.error("Error executing query: " + error.message);
          }
          // Query executed successfully
          console.log("Query result:", result);
        });
      });
  }

  onClickOfManageCustomerDetail() {
    document.getElementById("add-customer-detail").style.display = "none";
    document.getElementById("add-food-item").style.display = "none";
    document.getElementById("add-food-category").style.display = "none";
    document.getElementById("manage-food-item").style.display = "none";
    document.getElementById("manage-food-category").style.display = "none";
    document.getElementById("manage-customer-detail").style.display = "block";

    this.#queryString = `select * from customers`;
    try {
      this.#connection.query(this.#queryString, (error, result) => {
        if (error) {
          console.error("Error executing query.....");
          return;
        }
        const customerData = result;
        let manageCustomerDetailHtml = `
                        <h2><u>View Customers</u></h2>
                        <button class="add-client-btn" onclick=myCafe.onClickOfAddCustomerDetail()>Add New Customer</button>
                        <table id="manage-customer">
                        <thead>
                        <tr>
                        <th id="customer-manage-td-th">#</th>
                        <th id="customer-manage-td-th">Client Name</th>
                        <th id="customer-manage-td-th">Gender</th>
                        <th id="customer-manage-td-th">Mobile No</th>
                        <th id="customer-manage-td-th">Referring</th>
                        <th id="customer-manage-td-th">Address</th>
                        <th id="customer-manage-td-th">Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        
                    `;
        for (let i = 0; i < customerData.length; i++) {
          manageCustomerDetailHtml += `
                        <tr>
                        <td id="customer-manage-td-th">${i + 1}</td>
                        <td id="customer-manage-td-th">${
                          customerData[i].name
                        }</td>
                        <td id="customer-manage-td-th">${
                          customerData[i].gen
                        }</td>
                        <td id="customer-manage-td-th">${
                          customerData[i].mobile
                        }</td>
                        <td id="customer-manage-td-th">${
                          customerData[i].referring
                        }</td>
                        <td id="customer-manage-td-th">${
                          customerData[i].address
                        }</td>
                        <td id="customer-manage-td-th">
                        <i id="${i}" style="color: white;background-color:rgb(3, 100, 3);padding:7px;border-radius: 5px; margin-left: 8px"
                        class="fas fa-pencil-alt"></i>
                        <i id="${i}" style="color: white;background-color:red;padding:7px ;border-radius: 5px; margin-left: 8px"
                        class="fas fa-trash-alt"></i>
                        </td>
                        </tr>
                    `;
        }
        manageCustomerDetailHtml += `
                        </tbody>
                        </table>
                    `;
        document.getElementById("manage-customer-detail").innerHTML =
          manageCustomerDetailHtml;
        // this.#connection.end();
      });
    } catch (error) {
      console.error("Error eXecuting query.....");
      return;
    }
  }

  onClickOfAddFoodCategory() {
    document.getElementById("add-customer-detail").style.display = "none";
    document.getElementById("add-food-item").style.display = "none";
    document.getElementById("manage-food-item").style.display = "none";
    document.getElementById("manage-customer-detail").style.display = "none";
    document.getElementById("manage-food-category").style.display = "none";
    document.getElementById("add-food-category").style.display = "flex";
    document.getElementById("add-food-category").innerHTML = `
            <form id="add-category" action="#" method="post">
                <h2><u>Add Food Category </u></h2>
                <table>
                    <tr>
                        <td id="td-padding">Category Name </td>
                        <td id="td-padding"><input id="fcname" type="text" name="name" required></td>
                    </tr>
                    <tr>
                        <td id="td-padding">Status </td>
                        <td id="td-padding">
                            <select style="margin-top:5px;" id="fcstatus" name="status" required>
                                <option>--SELECT--</option>
                                <option>AVAILABLE</option>
                                <option>UNAVAILABLE</option>
                            </select>
                        </td>
                    </tr>
                </table>
                <input id="add-food-submit" type="submit" value="Submit">
            </form>
            `;
    document
      .getElementById("add-food-submit")
      .addEventListener("click", (event) => {
        event.preventDefault();

        const fcName = document.getElementById("fcname").value;
        const fcStatus = document.getElementById("fcstatus").value;
        const values = [fcName, fcStatus];
        document.getElementById("add-category").reset();
        this.#queryString = `insert into foodcategorylist(name,status) values (?,?)`;

        this.#connection.query(this.#queryString, values, (error, result) => {
          if (error) {
            return console.error("Error executing query.....");
          }
          console.log(result);
        });
      });
  }

  onClickOfmanageFoodCategory() {
    document.getElementById("add-food-item").style.display = "none";
    document.getElementById("add-food-category").style.display = "none";
    document.getElementById("manage-customer-detail").style.display = "none";
    document.getElementById("manage-food-item").style.display = "none";
    document.getElementById("add-customer-detail").style.display = "none";
    document.getElementById("manage-food-category").style.display = "block";
    this.#queryString = "select * from foodcategorylist";

    try {
      this.#connection.query(this.#queryString, (error, result) => {
        if (error) {
          console.error("Error executing query.....");
        }

        const foodCategoryData = result;
        let manageFoodCategoryHtml = `
                    <h2><u>View Food Categories</u></h2>
                    <button class="add-client-btn" onClick=myCafe.onClickOfAddFoodCategory()>Add New Category</button>
                    <table id="manage-customer">
                    <thead>
                    <tr>
                            <th id="customer-manage-td-th">#</th>
                            <th id="customer-manage-td-th">Category Name</th>
                            <th id="customer-manage-td-th">Status</th>
                            <th id="customer-manage-td-th">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                    `;
        for (let i = 0; i < foodCategoryData.length; i++) {
          let color;
          const status = foodCategoryData[i].status.toUpperCase();
          if (status === "AVAILABLE") {
            color = "green";
          } else if (status === "UNAVAILABLE") {
            color = "red";
          }

          manageFoodCategoryHtml += `
                        <tr>
                        <td id="customer-manage-td-th">${i + 1}</td>
                        <td id="customer-manage-td-th">${
                          foodCategoryData[i].name
                        }</td>
                        <td id="customer-manage-td-th"><i class="fa fa-check-circle fa-2x" style="color: ${color};"></i></td>
                        <td id="customer-manage-td-th">
                        <i style="color: white;background-color:rgb(3, 105, 3);padding:7px;border-radius: 5px; margin-left: 8px"
                                class="fas fa-pencil-alt"></i>
                            <i style="color: white;background-color:red;padding:7px ;border-radius: 5px; margin-left: 8px"
                            class="fas fa-trash-alt"></i>
                        </td>
                    </tr>
                    `;
        }
        manageFoodCategoryHtml += `
                    </tbody>
                    </table>
                    `;
        document.getElementById("manage-food-category").innerHTML =
          manageFoodCategoryHtml;
        // this.#connection.end();
      });
    } catch (error) {
      console.error("Some error occured.....");
    }
  }

  onClickOfAddFoodItem() {
    document.getElementById("add-customer-detail").style.display = "none";
    document.getElementById("add-food-category").style.display = "none";
    document.getElementById("manage-customer-detail").style.display = "none";
    document.getElementById("manage-food-category").style.display = "none";
    document.getElementById("manage-food-item").style.display = "none";
    document.getElementById("add-food-item").style.display = "flex";
    const query = [
      `select name from foodcategorylist`,
      `insert into fooditemlist(name,rate,category,status,quantity) values (?,?,?,?,?)`,
    ];
    let addFoodItemHtml = `
        <form id="add-food" action="#" method="post">
        <h2><u>Add New Food Item </u></h2>
        <table>
                <tr>
                    <td id="td-padding">Name </td>
                    <td id="td-padding"><input id="fname" type="text" name="name" required></td>
                </tr>
                <tr>
                <td id="td-padding">Quantity </td>
                <td id="td-padding"><input id="fquan" type="text" name="quantity"  required></td>
                </tr>
                <tr>
                    <td id="td-padding">Rate </td>
                    <td id="td-padding"><input id="frate" type="text" name="rate" required></td>
                </tr>
                <tr>
                    <td id="td-padding">Category Name </td>
                    <td id="td-padding">
                        <select style="margin-top:5px;" id="fcategory" name="category" required>
                            <option>--SELECT--</option>
                        `;

    this.#queryString = query[0];
    this.#connection.query(this.#queryString, (error, result) => {
      const foorCategorySelectTag = document.getElementById("fcategory");
      if (error) {
        console.error("Error executing query.....");
      }
      for (let i = 0; i < result.length; i++) {
        const option = document.createElement("option");
        option.text = result[i].name;
        foorCategorySelectTag.appendChild(option);
      }
    });

    addFoodItemHtml += `
                            </select>
                    </td>
                </tr>
                <tr>
                <td id="td-padding">Status  </td>
                    <td id="td-padding">
                        <select style="margin-top:18px; id="fstatus" name="status" required>
                            <option>--SELECT--</option>
                            <option>Available</option>
                            <option>Unavailable</option>
                        </select>
                    </td>
                </tr>
                </table>
            <input id="add-food-submit" type="submit" value="Submit">
            </form>
            `;
    document.getElementById("add-food-item").innerHTML = addFoodItemHtml;

    document
      .getElementById("add-food-submit")
      .addEventListener("click", (event) => {
        event.preventDefault();
        const fName = document.getElementById("fname").value;
        const fRate = document.getElementById("frate").value;
        const fCategory = document.getElementById("fcategory").value;
        const fStatus = document.getElementById("fstatus").value;
        const fQuan = document.getElementById("fquan").value;
        const values = [fName, fRate, fCategory, fStatus, fQuan];
        document.getElementById("add-food").reset();
        this.#queryString = query[1];
        this.#connection.query(this.#queryString, values, (error, result) => {
          if (error) {
            return console.error("Error executing query.....");
          }
          console.log(result);
        });
      });
  }

  onClickOfManageFoodItem() {
    document.getElementById("add-customer-detail").style.display = "none";
    document.getElementById("add-food-item").style.display = "none";
    document.getElementById("add-food-category").style.display = "none";
    document.getElementById("manage-food-category").style.display = "none";
    document.getElementById("manage-customer-detail").style.display = "none";
    document.getElementById("manage-food-item").style.display = "block";
    this.#queryString = "select * from fooditemlist";
    try {
      this.#connection.query(this.#queryString, (error, result) => {
        if (error) {
          console.error("Error executing query.....");
        }
        const foodItemData = result;
        let manageFoodItemHtml = `
                        <h2><u>View Food Items</u></h2>
                        <button class="add-client-btn" onClick=myCafe.onClickOfAddFoodItem()>Add New Food Item</button>
                        <table id="manage-customer">
                        <thead>
                        <tr>
                            <th id="customer-manage-td-th">#</th>
                            <th id="customer-manage-td-th">Food Name</th>
                            <th id="customer-manage-td-th">Quantity</th>
                            <th id="customer-manage-td-th">Rate</th>
                            <th id="customer-manage-td-th">Category</th>
                            <th id="customer-manage-td-th">Status</th>
                            <th id="customer-manage-td-th">Action</th>
                        </tr>
                        </thead>
                        <tbody>
                    `;
        for (let i = 0; i < foodItemData.length; i++) {
          let color;
          const status = foodItemData[i].status.toUpperCase();
          if (status === "AVAILABLE") {
            color = "green";
          } else if (status === "UNAVAILABLE") {
            color = "red";
          }
          manageFoodItemHtml += `
                            <tr>
                                <td id="customer-manage-td-th">${i + 1}</td>
                                <td id="customer-manage-td-th">${
                                  foodItemData[i].name
                                }</td>
                                <td id="customer-manage-td-th">${
                                  foodItemData[i].quantity
                                }</td>
                                <td id="customer-manage-td-th">Rs. ${
                                  foodItemData[i].rate
                                }</td>
                                <td id="customer-manage-td-th">${
                                  foodItemData[i].category
                                }</td>
                                <td id="customer-manage-td-th"><i class="fa fa-check-circle fa-2x" style="color: ${color};"></i></td>
                                <td id="customer-manage-td-th">
                                    <i style="color: white;background-color:rgb(3, 105, 3);padding:7px;border-radius: 5px; margin-left: 8px"
                                        class="fas fa-pencil-alt"></i>
                                    <i style="color: white;background-color:red;padding:7px ;border-radius: 5px; margin-left: 8px"
                                    class="fas fa-trash-alt"></i>
                                </td>
                            </tr>
                        `;
        }
        manageFoodItemHtml += `
                        </tbody>
                        </table>
                    `;
        document.getElementById("manage-food-item").innerHTML =
          manageFoodItemHtml;
      });
    } catch (error) {
      console.log("Some error Occured.....");
    }
  }

  onClickOfAddInvoice() {
    document.getElementById("add-customer-detail").style.display = "none";
    document.getElementById("add-food-item").style.display = "none";
    document.getElementById("add-food-category").style.display = "none";
    document.getElementById("manage-food-category").style.display = "none";
    document.getElementById("manage-customer-detail").style.display = "none";
    document.getElementById("manage-food-item").style.display = "none";
    document.getElementById("add-invoice").style.display = "flex";
    const query = [
      "select name from customers;",
      "select name from fooditemlist",
    ];
    this.#queryString = query[0];
    this.#connection.query(this.#queryString, (error, result) => {
      if (error) {
        return console.error("Error executing query.....");
      }
      const customerList = document.getElementById("customer-name");

      for (let i = 0; i < result.length; i++) {
        const option = document.createElement("option");
        option.text = result[i].name;
        customerList.appendChild(option);
      }
    });

    this.#queryString = query[1];
    this.#connection.query(this.#queryString, (error, result) => {
      if (error) {
        return console.error("Error executing query.....");
      }

      const foodItemSelectTag = document.querySelectorAll("#food-name");
      for (let i = 0; i < result.length; i++) {
        const option = document.createElement("option");
        option.text = result[i].name;
        foodItemSelectTag.forEach((selectTag) => {
          selectTag.appendChild(option.cloneNode(true));
        });
      }
    });
  }

  updateContactHtml() {
    const name = document.getElementById("customer-name").value;
    this.#queryString = `SELECT mobile FROM customers WHERE name = ?;`;
    this.#connection.query(this.#queryString, [name], (error, result) => {
      if (error) {
        return console.error("Error executing query.....");
      }
      document.getElementById("contact-no").value = result[0].mobile;
    });
  }

  updateFoodRateAndTotalHtml() {
    // const foodName = document.getElementById("food-name").value;
    const foodNameSelect = document.querySelectorAll("#food-name");
    const foodName = [];
    foodNameSelect.forEach((item) => {
      if (item.value !== "--SELECT--") {
        foodName.push(item.value);
      }
    });
    console.log(foodName);

    this.#queryString = `select rate from fooditemlist where name=?;`;
    this.#connection.query(this.#queryString, [foodName[0]], (error, result) => {
      if (error) {
        return console.error("Error executing query.....");
      }
      const rate = result[0].rate;
      document.getElementById("food-rate").value = rate;
      const quantity = parseFloat(
        document.getElementById("food-quantity").value
      );
      document.getElementById("total").value = quantity * parseFloat(rate);
    });
  }

  onClickOfManageInvoice() {}
}

const myCafe = new cafe();
