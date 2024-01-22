const mysql = require('mysql2');

class cafe {
    #queryString;
    #connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '1234',
        database: 'cafe'
    });

    constructor() {

    }

    onClickOfAddCustomerDetail() {
        document.getElementById('add-food-item').style.display = 'none';
        document.getElementById('add-food-category').style.display = 'none';
        document.getElementById('manage-customer-detail').style.display = 'none';
        document.getElementById('manage-food-item').style.display = 'none';
        document.getElementById('manage-food-category').style.display = 'none';
        document.getElementById('add-customer-detail').style.display = 'flex';
        document.getElementById('add-customer-detail').innerHTML =
            `
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
                            <select id="cgen" name="category" required>
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

        document.getElementById('add-customer-submit').addEventListener('click', () => {
            const cName = document.getElementById('cname').value;
            const cGen = document.getElementById('cgen').value;
            const cMobile = document.getElementById('cmobile').value;
            const cRefer = document.getElementById('crefer').value;
            const cAddress = document.getElementById('caddress').value;

            this.#queryString = `INSERT INTO customers (name, gen, mobile, referring, address) VALUES (?, ?, ?, ?, ?)`;
            const values = [cName, cGen, cMobile, cRefer, cAddress];

            this.#connection.query(this.#queryString, values, (error, result) => {
                if (error) {
                    return console.error('Error executing query: ' + error.message);
                }
                // Query executed successfully
                console.log('Query result:', result);
            });
        });
    }

    onClickOfManageCustomerDetail() {
        document.getElementById('add-customer-detail').style.display = 'none';
        document.getElementById('add-food-item').style.display = 'none';
        document.getElementById('add-food-category').style.display = 'none';
        document.getElementById('manage-food-item').style.display = 'none';
        document.getElementById('manage-food-category').style.display = 'none';
        document.getElementById('manage-customer-detail').style.display = 'block';

        this.#queryString = `select * from customers`;
        try {
            this.#connection.query(this.#queryString, (error, result) => {
                if (error) {
                    console.error("Error executing query.....");
                    return;
                }
                const customerData = result;
                let manageCustomerDetailHtml =
                    `
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
                        
                    `
                    ;

                for (let i = 0; i < customerData.length; i++) {
                    manageCustomerDetailHtml +=
                        `
                        <tr>
                        <td id="customer-manage-td-th">${customerData[i].id}</td>
                        <td id="customer-manage-td-th">${customerData[i].name}</td>
                        <td id="customer-manage-td-th">${customerData[i].gen}</td>
                        <td id="customer-manage-td-th">${customerData[i].mobile}</td>
                        <td id="customer-manage-td-th">${customerData[i].referring}</td>
                        <td id="customer-manage-td-th">${customerData[i].address}</td>
                        <td id="customer-manage-td-th">
                        <i id="${i}" style="background-color:rgb(3, 105, 3);padding:7px;border-radius: 5px; margin-left: 8px"
                        class="fas fa-pencil-alt"></i>
                        <i id="${i}" style="background-color:red;padding:7px ;border-radius: 5px; margin-left: 8px"
                        class="fas fa-trash-alt"></i>
                        </td>
                        </tr>
                    `
                }
                manageCustomerDetailHtml +=
                    `
                        </tbody>
                        </table>
                    `
                document.getElementById('manage-customer-detail').innerHTML = manageCustomerDetailHtml;
                // this.#connection.end();
            });
        } catch (error) {
            console.error("Error eXecuting query.....");
            return;
        }
    }

    onClickOfAddFoodCategory() {
        document.getElementById('add-customer-detail').style.display = 'none';
        document.getElementById('add-food-item').style.display = 'none';
        document.getElementById('manage-food-item').style.display = 'none';
        document.getElementById('manage-customer-detail').style.display = 'none';
        document.getElementById('manage-food-category').style.display = 'none';
        document.getElementById('add-food-category').style.display = 'flex';
        document.getElementById('add-food-category').innerHTML =
            `
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
                            <select id="fcstatus" name="status" required>
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
        document.getElementById('add-food-submit').addEventListener('click', () => {
            const fcName = document.getElementById('fcname').value;
            const fcStatus = document.getElementById('fcstatus').value;
            const values = [fcName, fcStatus];
            this.#queryString = `insert into foodcategorylist(name,status) values (?,?)`

            this.#connection.query(this.#queryString, values, (error, result) => {
                if (error) {
                    return console.error("Error executing query.....");
                }
                console.log(result);
            });
        });
    }

    onClickOfmanageFoodCategory() {
        document.getElementById('add-food-item').style.display = 'none';
        document.getElementById('add-food-category').style.display = 'none';
        document.getElementById('manage-customer-detail').style.display = 'none';
        document.getElementById('manage-food-item').style.display = 'none';
        document.getElementById('add-customer-detail').style.display = 'none';
        document.getElementById('manage-food-category').style.display = 'block';
        this.#queryString = 'select * from foodcategorylist';

        try {
            this.#connection.query(this.#queryString, (error, result) => {
                if (error) {
                    console.error("Error executing query.....");
                }

                const foodCategoryData = result;
                let manageFoodCategoryHtml =
                    `
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
                    manageFoodCategoryHtml +=
                        `
                        <tr>
                        <td id="customer-manage-td-th">${foodCategoryData[i].id}</td>
                        <td id="customer-manage-td-th">${foodCategoryData[i].name}</td>
                        <td id="customer-manage-td-th">${foodCategoryData[i].status}</td>
                        <td id="customer-manage-td-th">
                        <i style="background-color:rgb(3, 105, 3);padding:7px;border-radius: 5px; margin-left: 8px"
                                class="fas fa-pencil-alt"></i>
                            <i style="background-color:red;padding:7px ;border-radius: 5px; margin-left: 8px"
                            class="fas fa-trash-alt"></i>
                        </td>
                    </tr>
                    `;
                }
                manageFoodCategoryHtml +=
                    `
                    </tbody>
                    </table>
                    `;
                document.getElementById('manage-food-category').innerHTML = manageFoodCategoryHtml;
                // this.#connection.end();
            });
        } catch (error) {
            console.error('Some error occured.....');
        }

    }

    onClickOfAddFoodItem() {
        document.getElementById('add-customer-detail').style.display = 'none';
        document.getElementById('add-food-category').style.display = 'none';
        document.getElementById('manage-customer-detail').style.display = 'none';
        document.getElementById('manage-food-category').style.display = 'none';
        document.getElementById('manage-food-item').style.display = 'none';
        document.getElementById('add-food-item').style.display = 'flex';
        document.getElementById('add-food-item').innerHTML =
            `
            <form id="add-food" action="#" method="post">
            <h2><u>Add New Food Item </u></h2>
            <table>
                <tr>
                    <td id="td-padding">Name </td>
                    <td id="td-padding"><input type="text" name="name" required></td>
                </tr>
                <tr>
                <td id="td-padding">Quantity </td>
                    <td id="td-padding"><input type="text" name="quantity"  required></td>
                </tr>
                <tr>
                    <td id="td-padding">Rate </td>
                    <td id="td-padding"><input type="text" name="rate" required></td>
                </tr>
                <tr>
                    <td id="td-padding">Category Name </td>
                    <td id="td-padding">
                        <select name="category" required>
                            <option value="" disabled selected>--SELECT--</option>
                            <option value="category1">Category 1</option>
                            <option value="category2">Category 2</option>
                            <option value="category3">Category 3</option>
                            </select>
                    </td>
                </tr>
                <tr>
                <td id="td-padding">Status  </td>
                    <td id="td-padding">
                        <select name="status" required>
                            <option value="" disabled selected>--SELECT--</option>
                            <option value="active">AVAILABLE</option>
                            <option value="inactive">UNAVAILABLE</option>
                        </select>
                        </td>
                </tr>
                </table>
            <input id="add-food-submit" type="submit" value="Submit">
            </form>
            `;
    }

    onClickOfManageFoodItem() {
        document.getElementById('add-customer-detail').style.display = 'none';
        document.getElementById('add-food-item').style.display = 'none';
        document.getElementById('add-food-category').style.display = 'none';
        document.getElementById('manage-food-category').style.display = 'none';
        document.getElementById('manage-customer-detail').style.display = 'none';
        document.getElementById('manage-food-item').style.display = 'block';
        this.#queryString = 'select * from fooditemlist';
        try {
            this.#connection.query(this.#queryString, (error, result) => {
                if (error) {
                    console.error("Error executing query.....")
                }
                const foodItemData = result;
                let manageFoodItemHtml =
                    `
                        <h2><u>View Food Items</u></h2>
                        <button class="add-client-btn" onClick=myCafe.onClickOfAddFoodItem()>Add New Food Item</button>
                        <table id="manage-customer">
                        <thead>
                        <tr>
                            <th id="customer-manage-td-th">#</th>
                            <th id="customer-manage-td-th">Food Name</th>
                            <th id="customer-manage-td-th">Rate</th>
                            <th id="customer-manage-td-th">Category</th>
                            <th id="customer-manage-td-th">Status</th>
                            <th id="customer-manage-td-th">Action</th>
                        </tr>
                        </thead>
                        <tbody>
                    `;
                for (let i = 0; i < foodItemData.length; i++) {

                    manageFoodItemHtml +=
                        `
                            <tr>
                                <td id="customer-manage-td-th">${foodItemData[i].id}</td>
                                <td id="customer-manage-td-th">${foodItemData[i].name}</td>
                                <td id="customer-manage-td-th">Rs. ${foodItemData[i].rate}</td>
                                <td id="customer-manage-td-th">${foodItemData[i].category}</td>
                                <td id="customer-manage-td-th">${foodItemData[i].status}</td>
                                <td id="customer-manage-td-th">
                                    <i style="background-color:rgb(3, 105, 3);padding:7px;border-radius: 5px; margin-left: 8px"
                                        class="fas fa-pencil-alt"></i>
                                    <i style="background-color:red;padding:7px ;border-radius: 5px; margin-left: 8px"
                                    class="fas fa-trash-alt"></i>
                                </td>
                            </tr>
                        `;
                }
                manageFoodItemHtml +=
                    `
                        </tbody>
                        </table>
                    `;
                document.getElementById('manage-food-item').innerHTML = manageFoodItemHtml;

            });
        } catch (error) {
            console.log("Some error Occured.....");
        }
    }

    onClickOfAddInvoice() {

    }

    onClickOfManageInvoice() {

    }

}

const myCafe = new cafe();