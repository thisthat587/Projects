const mysql=require('mysql');

class cafe {

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
                        <td id="td-padding"><input type="text" name="name" required></td>
                    </tr>
                    <tr>
                        <td id="td-padding">Gender </td>
                        <td id="td-padding">
                            <select name="category" required>
                                <option value="" disabled selected>--SELECT--</option>
                                <option value="category1">MALE</option>
                                <option value="category2">FEMALE</option>
                                <option value="category3">OTHER</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td id="td-padding">Mobile </td>
                        <td id="td-padding"><input type="text" name="mobile" required></td>
                    </tr>
                    <tr>
                        <td id="td-padding">Address </td>
                        <td id="td-padding"><textarea name="address" rows="4" required></textarea></td>
                    </tr>
                </table>
                <input id="add-customer-submit" type="submit" value="Submit">
            </form>
            `;
    }

    onClickOfManageCustomerDetail() {
        document.getElementById('add-customer-detail').style.display = 'none';
        document.getElementById('add-food-item').style.display = 'none';
        document.getElementById('add-food-category').style.display = 'none';
        document.getElementById('manage-food-item').style.display = 'none';
        document.getElementById('manage-food-category').style.display = 'none';
        document.getElementById('manage-customer-detail').style.display = 'block';
        document.getElementById('manage-customer-detail').innerHTML =
            `
            <h2><u>View Customers</u></h2>
            <button class="add-client-btn">Add Client</button>
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
                    <tr>
                        <td id="customer-manage-td-th">1</td>
                        <td id="customer-manage-td-th">Rammolli Kallathil</td>
                        <td id="customer-manage-td-th">Male</td>
                        <td id="customer-manage-td-th">8090809080</td>
                        <td id="customer-manage-td-th">Subodh</td>
                        <td id="customer-manage-td-th">Old Kanakapura Rd, Basavanagudi, Bengaluru, Karnataka</td>
                        <td id="customer-manage-td-th">
                            <i style="background-color:rgb(3, 105, 3);padding:7px;border-radius: 5px; margin-left: 8px"
                                class="fas fa-pencil-alt"></i>
                            <i style="background-color:red;padding:7px ;border-radius: 5px; margin-left: 8px"
                                class="fas fa-trash-alt"></i>
                        </td>
                    </tr>
                    <!-- More rows here -->
                </tbody>
            </table>
            `;
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
                        <td id="td-padding"><input type="text" name="name" required></td>
                    </tr>
                    <tr>
                        <td id="td-padding">Status </td>
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

    onClickOfmanageFoodCategory() {
        document.getElementById('add-food-item').style.display = 'none';
        document.getElementById('add-food-category').style.display = 'none';
        document.getElementById('manage-customer-detail').style.display = 'none';
        document.getElementById('manage-food-item').style.display = 'none';
        document.getElementById('add-customer-detail').style.display = 'none';
        document.getElementById('manage-food-category').style.display = 'block';
        document.getElementById('manage-food-category').innerHTML =
            `
            <h2><u>View Food Categories</u></h2>
            <button class="add-client-btn">Add Category</button>
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
                    <tr>
                        <td id="customer-manage-td-th">1</td>
                        <td id="customer-manage-td-th">Sweet</td>
                        <td id="customer-manage-td-th">Available</td>
                        <td id="customer-manage-td-th">
                            <i style="background-color:rgb(3, 105, 3);padding:7px;border-radius: 5px; margin-left: 8px"
                                class="fas fa-pencil-alt"></i>
                            <i style="background-color:red;padding:7px ;border-radius: 5px; margin-left: 8px"
                                class="fas fa-trash-alt"></i>
                        </td>
                    </tr>
                    <!-- More rows here -->
                </tbody>
            </table>
            `;

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
        document.getElementById('manage-food-item').innerHTML =
            `
            <h2><u>View Food Items</u></h2>
            <button class="add-client-btn">Add Client</button>
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
                    <tr>
                        <td id="customer-manage-td-th">1</td>
                        <td id="customer-manage-td-th">Gulab Jamun</td>
                        <td id="customer-manage-td-th">25</td>
                        <td id="customer-manage-td-th">Sweet</td>
                        <td id="customer-manage-td-th">Available</td>
                        <td id="customer-manage-td-th">
                            <i style="background-color:rgb(3, 105, 3);padding:7px;border-radius: 5px; margin-left: 8px"
                                class="fas fa-pencil-alt"></i>
                            <i style="background-color:red;padding:7px ;border-radius: 5px; margin-left: 8px"
                                class="fas fa-trash-alt"></i>
                        </td>
                    </tr>
                    <!-- More rows here -->
                </tbody>
            </table>
            `;
    }

    onClickOfAddInvoice() {

    }

    onClickOfManageInvoice() {

    }

}

const myCafe = new cafe();