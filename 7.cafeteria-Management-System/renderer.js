const mysql = require("mysql2");

// let i = 0;
class cafe {
        #queryString;
        #connection = mysql.createConnection({
                host: "localhost",
                user: "root",
                password: "root",
                database: "cafe",
        });

        constructor() { }

        onClickOfAddCustomerDetail(htmlText) {
                document.getElementById("add-food-item").style.display = "none";
                document.getElementById("add-food-category").style.display = "none";
                document.getElementById("manage-customer-detail").style.display = "none";
                document.getElementById("manage-food-item").style.display = "none";
                document.getElementById("manage-food-category").style.display = "none";
                document.getElementById('add-invoice').style.display = "none";
                document.getElementById("add-customer-detail").style.display = "flex";
                if (htmlText === 'fromSidebar') {
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

                                        this.#connection.query(this.#queryString, values);
                                        alert("New Record Added");
                                        this.onClickOfManageCustomerDetail();
                                });
                } else {
                        document.getElementById("add-customer-detail").innerHTML = htmlText;
                        let cName = document.getElementById("cname").value;
                        this.#queryString = `UPDATE customers SET name = ?, gen = ?, mobile = ?, referring = ?, address = ? WHERE name = '${cName}'`;
                        document
                                .getElementById("add-customer-submit")
                                .addEventListener("click", (event) => {
                                        event.preventDefault();
                                        cName = document.getElementById("cname").value;
                                        const cGen = document.getElementById("cgen").value;
                                        const cMobile = document.getElementById("cmobile").value;
                                        const cRefer = document.getElementById("crefer").value;
                                        const cAddress = document.getElementById("caddress").value;

                                        const values = [cName, cGen, cMobile, cRefer, cAddress];

                                        this.#connection.query(this.#queryString, values);
                                        alert("Details Updated");
                                        this.onClickOfManageCustomerDetail();
                                });
                }
        }

        onClickOfManageCustomerDetail() {
                document.getElementById("add-customer-detail").style.display = "none";
                document.getElementById("add-food-item").style.display = "none";
                document.getElementById("add-food-category").style.display = "none";
                document.getElementById("manage-food-item").style.display = "none";
                document.getElementById("manage-food-category").style.display = "none";
                document.getElementById('add-invoice').style.display = "none";
                document.getElementById("manage-customer-detail").style.display = "block";

                this.#queryString = `select * from customers`;
                try {
                        this.#connection.query(this.#queryString, (error, result) => {
                                if (error) {
                                        console.error("Error executing query.....");
                                        return;
                                }
                                var customerData = result;
                                let manageCustomerDetailHtml = `
                        <h2><u>View Customers</u></h2>
                        <button class="add-client-btn" onclick="myCafe.onClickOfAddCustomerDetail('fromSidebar')">Add New Customer</button>
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
                        <td id="customer-manage-td-th">${customerData[i].name
                                                }</td>
                        <td id="customer-manage-td-th">${customerData[i].gen
                                                }</td>
                        <td id="customer-manage-td-th">${customerData[i].mobile
                                                }</td>
                        <td id="customer-manage-td-th">${customerData[i].referring
                                                }</td>
                        <td id="customer-manage-td-th">${customerData[i].address
                                                }</td>
                        <td id="customer-manage-td-th">
                        <i  style="color: white;background-color:rgb(3, 100, 3);padding:7px;border-radius: 5px; margin-left: 8px"
                        class="fas fa-pencil-alt" onclick="myCafe.editCustomerDetail('${customerData[i].name}','${customerData[i].gen}','${customerData[i].mobile}','${customerData[i].referring}','${customerData[i].address}')"></i>
                        <i  style="color: white;background-color:red;padding:7px ;border-radius: 5px; margin-left: 8px"
                        class="fas fa-trash-alt" onclick="myCafe.deleteCustomerDetail('${customerData[i].name}')"></i>
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

        editCustomerDetail(name, gen, mobile, referring, address) {
                const htmlTextToSend = `<form id="add-customer" action="#" method="post">
                <h2><u>Edit</u></h2>
                <table>
                <tr>
                <td id="td-padding">Name </td>
                <td id="td-padding"><input id="cname" type="text" name="name" value="${name}" required></td>
                </tr>
                <tr>
                <td id="td-padding">Gender </td>
                <td id="td-padding">
                <select style="margin-top: 5px" id="cgen" name="category" required>
                <option selected>${gen}</option>
                <option>MALE</option>
                <option>FEMALE</option>
                <option>OTHER</option>
                </select>
                </td>
                </tr>
                <tr>
                <td id="td-padding">Mobile </td>
                <td id="td-padding"><input id="cmobile" type="text" name="mobile" value="${mobile}" required></td>
                </tr>
                <tr>
                <td id="td-padding">Referred By </td>
                <td id="td-padding"><input id="crefer" type="text" name="referring" value="${referring}" required></td>
                </tr>
                <tr>
                <td id="td-padding">Address </td>
                <td id="td-padding"><textarea id="caddress" name="address" required>${address}</textarea></td>
                </tr>
                </table>
                <input id="add-customer-submit" type="submit" value="Submit">
                </form>`;
                this.onClickOfAddCustomerDetail(htmlTextToSend);
                // this.#queryString=`update in customers set`
        }

        deleteCustomerDetail(name) {
                const isConfirmed = confirm("Are You sure you Want to delete this record ?");
                if (isConfirmed) {
                        this.#queryString = `delete from customers where name='${name}'`
                        this.#connection.query(this.#queryString)
                        alert("Record Deleted");
                        this.onClickOfManageCustomerDetail();
                } else {
                        alert("Cancled");
                        this.onClickOfManageCustomerDetail();
                }
        }

        onClickOfAddFoodCategory(htmlText) {
                document.getElementById("add-customer-detail").style.display = "none";
                document.getElementById("add-food-item").style.display = "none";
                document.getElementById("manage-food-item").style.display = "none";
                document.getElementById("manage-customer-detail").style.display = "none";
                document.getElementById("manage-food-category").style.display = "none";
                document.getElementById('add-invoice').style.display = "none";
                document.getElementById("add-food-category").style.display = "flex";
                if (htmlText === 'fromSidebar') {

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
                                        });
                                        alert("One Food Category Added")
                                        this.onClickOfmanageFoodCategory();
                                });
                } else {
                        document.getElementById("add-food-category").innerHTML = htmlText
                        let fcName = document.getElementById("fcname").value;
                        this.#queryString = `update foodcategorylist set name=? , status=? where name='${fcName}'`;
                        document
                                .getElementById("add-food-submit")
                                .addEventListener("click", (event) => {
                                        event.preventDefault();
                                        fcName = document.getElementById("fcname").value;
                                        const fcStatus = document.getElementById("fcstatus").value;
                                        const values = [fcName, fcStatus];
                                        document.getElementById("add-category").reset();
                                        // this.#queryString = `insert into foodcategorylist(name,status) values (?,?)`;
                                        this.#connection.query(this.#queryString, values, (error, result) => {
                                                if (error) {
                                                        return console.error("Error executing query.....", error);
                                                }
                                        });
                                        alert("Details Updated");
                                        this.onClickOfmanageFoodCategory();
                                });
                }
        }

        onClickOfmanageFoodCategory() {
                document.getElementById("add-food-item").style.display = "none";
                document.getElementById("add-food-category").style.display = "none";
                document.getElementById("manage-customer-detail").style.display = "none";
                document.getElementById("manage-food-item").style.display = "none";
                document.getElementById("add-customer-detail").style.display = "none";
                document.getElementById('add-invoice').style.display = "none";
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
                    <button class="add-client-btn" onClick="myCafe.onClickOfAddFoodCategory('fromSidebar')">Add New Category</button>
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
                        <td id="customer-manage-td-th">${foodCategoryData[i].name}</td>
                        <td id="customer-manage-td-th"><i class="fa fa-check-circle fa-2x" style="color: ${color};"></i></td>
                        <td id="customer-manage-td-th">
                        <i style="color: white;background-color:rgb(3, 105, 3);padding:7px;border-radius: 5px; margin-left: 8px"
                                class="fas fa-pencil-alt" onclick="myCafe.editFoodCategoryDetail('${foodCategoryData[i].name}','${foodCategoryData[i].status}')"></i>
                            <i style="color: white;background-color:red;padding:7px ;border-radius: 5px; margin-left: 8px"
                            class="fas fa-trash-alt" onclick="myCafe.deleteFoodCategoryDetail('${foodCategoryData[i].name}')"></i>
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

        editFoodCategoryDetail(name, status) {
                const htmlTextToSend = `<form id="add-category" action="#" method="post">
                <h2><u>Add Food Category </u></h2>
                <table>
                    <tr>
                        <td id="td-padding">Category Name </td>
                        <td id="td-padding"><input id="fcname" type="text" name="name" value="${name}" required></td>
                    </tr>
                    <tr>
                        <td id="td-padding">Status </td>
                        <td id="td-padding">
                            <select style="margin-top:5px;" id="fcstatus" name="status" required>
                                <option selected>${status}</option>
                                <option>AVAILABLE</option>
                                <option>UNAVAILABLE</option>
                            </select>
                        </td>
                    </tr>
                </table>
                <input id="add-food-submit" type="submit" value="Submit">
            </form>`;
                this.onClickOfAddFoodCategory(htmlTextToSend);
        }

        deleteFoodCategoryDetail(name) {
                const isConfirmed = confirm("Are You sure you Want to delete this record ?");
                if (isConfirmed) {
                        this.#queryString = `delete from foodcategorylist where name='${name}'`;
                        this.#connection.query(this.#queryString)
                        alert("Record Deleted");
                        this.onClickOfmanageFoodCategory();
                } else {
                        alert("Cancelled");
                        this.onClickOfmanageFoodCategory();
                }
        }

        onClickOfAddFoodItem() {
                document.getElementById("add-customer-detail").style.display = "none";
                document.getElementById("add-food-category").style.display = "none";
                document.getElementById("manage-customer-detail").style.display = "none";
                document.getElementById("manage-food-category").style.display = "none";
                document.getElementById("manage-food-item").style.display = "none";
                document.getElementById('add-invoice').style.display = "none";
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
                                });
                        });
        }

        onClickOfManageFoodItem() {
                document.getElementById("add-customer-detail").style.display = "none";
                document.getElementById("add-food-item").style.display = "none";
                document.getElementById("add-food-category").style.display = "none";
                document.getElementById("manage-food-category").style.display = "none";
                document.getElementById("manage-customer-detail").style.display = "none";
                document.getElementById('add-invoice').style.display = "none";
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
                                                        <td id="customer-manage-td-th">${foodItemData[i].name}</td>
                                                        <td id="customer-manage-td-th">${foodItemData[i].quantity}</td>
                                                        <td id="customer-manage-td-th">Rs. ${foodItemData[i].rate}</td>
                                                        <td id="customer-manage-td-th">${foodItemData[i].category}</td>
                                                        <td id="customer-manage-td-th"><i class="fa fa-check-circle fa-2x" style="color: ${color};"></i></td>
                                                        <td id="customer-manage-td-th">
                                                        <i style="color: white;background-color:rgb(3, 105, 3);padding:7px;border-radius: 5px; margin-left: 8px"
                                                                class="fas fa-pencil-alt" onclick="myCafe.editFoodItemDetails('${foodItemData[i]}')"></i>
                                                        <i style="color: white;background-color:red;padding:7px ;border-radius: 5px; margin-left: 8px"
                                                        class="fas fa-trash-alt" onclick="myCafe.deleteFoodItemDetails('${foodItemData[i].name}')"></i>
                                                        </td>
                                                </tr>`;
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

        editFoodItemDetails(data) {

        }

        deleteFoodItemDetails(name) {
                const isConfirmed = confirm("Are You sure you Want to delete this record ?");
                if (isConfirmed) {
                        this.#queryString = `delete from fooditemlist where name='${name}'`;
                        this.#connection.query(this.#queryString)
                        alert("Record Deleted");
                        this.onClickOfManageFoodItem();
                } else {
                        alert("Cancelled");
                        this.onClickOfManageFoodItem();
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
                        "select name from customers;"
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
                this.getFoodListNames();
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

        getFoodListNames() {
                this.#queryString = "select name from fooditemlist";
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


        // i = 0;
        updateFoodRateAndTotalHtml() {
                let i = 0;
                const foodNameSelect = document.querySelectorAll("#food-name");
                foodNameSelect.forEach((foodName) => {
                        const foodRateInput = document.querySelectorAll('#food-rate');
                        const foodQuantity = document.querySelectorAll('#food-quantity');
                        const total = document.querySelectorAll('#total');
                        this.#queryString = `select rate from fooditemlist where name=?`
                        this.#connection.query(this.#queryString, [foodName.value], (error, result) => {
                                foodRateInput[i].value = result[0].rate;
                                const quantity = foodQuantity[i].value;
                                let totalValue = parseFloat(quantity) * parseFloat(result[0].rate);
                                if (isNaN(totalValue)) {
                                        totalValue = 0;
                                }
                                total[i].value = parseFloat(totalValue);
                                this.updateTotalAmountAndRemaining();
                                i++;
                        })
                })

        }

        updateTotalAmountAndRemaining() {
                let totalAmount = 0;
                const totalInputTag = document.querySelectorAll('#total');
                totalInputTag.forEach((amount) => {
                        totalAmount += parseFloat(amount.value);
                });
                document.getElementById('total-amount').value = totalAmount;
                document.getElementById('gst').value = (18 * totalAmount) / 100;
                document.getElementById('net-amount').value = totalAmount + parseFloat(document.getElementById('gst').value)
        }

        addFoodItemRow() {
                const foodItemListTable = document.getElementById('food-item-list-table');
                const foodItemRowHtml =
                        `<tr>
                                <td id="td-padding">
                                <select style="width: 350%;" id="food-name" onchange=myCafe.updateFoodRateAndTotalHtml()>
                                        <option>--SELECT--</option>
                                </select>
                                </td>
                                <td id="td-padding"><input style="width: 350%;" type="text" name="" id="food-rate" readonly>
                                </td>
                                <td id="td-padding"><input type="number" name="" id="food-quantity" oninput=myCafe.updateFoodRateAndTotalHtml()>
                                </td>
                                <td id="td-padding"><input style="width: 350%;" type="number" name="" id="total" step="any"
                                        readonly></td>
                                <td>
                                <i style="color: white;background-color:rgb(3, 105, 3);padding:8px;border-radius: 5px;"
                                        class="fa fa-plus" onclick=myCafe.addFoodItemRow()></i>
                                <i style="color: white;background-color:red;padding:8px ;border-radius: 5px; margin-left: 8px"
                                        class="fa fa-trash"></i>
                                </td>
                        </tr>`;
                const foodItemRow = document.createElement('tr');
                foodItemRow.innerHTML = foodItemRowHtml;
                foodItemListTable.appendChild(foodItemRow);
                this.getFoodListNames();
        }

        onClickOfManageInvoice() { }
}

const myCafe = new cafe();
