class cafe {

    constructor() {

    }

    onClickOfAddCustomerDetail() {
        document.getElementById('add-food-item').style.display = 'none';
        document.getElementById('add-food-category').style.display = 'none';
        document.getElementById('add-customer-detail').style.display = 'flex';
        document.getElementById('add-customer-detail').innerHTML =
            `
            <form id="add-customer" action="#" method="post">
                <h2><u>Add New Customer</u></h2>
                <table>
                    <tr>
                        <td>Name </td>
                        <td><input type="text" name="name" required></td>
                    </tr>
                    <tr>
                        <td>Gender </td>
                        <td>
                            <select name="category" required>
                                <option value="" disabled selected>--SELECT--</option>
                                <option value="category1">MALE</option>
                                <option value="category2">FEMALE</option>
                                <option value="category3">OTHER</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td>Mobile </td>
                        <td><input type="text" name="mobile" required></td>
                    </tr>
                    <tr>
                        <td>Address </td>
                        <td><textarea name="address" rows="4" required></textarea></td>
                    </tr>
                </table>
                <input id="add-customer-submit" type="submit" value="Submit">
            </form>
            `;
    }

    onClickOfAddFoodCategory() {
        document.getElementById('add-customer-detail').style.display = 'none';
        document.getElementById('add-food-item').style.display = 'none';
        document.getElementById('add-food-category').style.display = 'flex';
        document.getElementById('add-food-category').innerHTML =
            `
            <form id="add-category" action="#" method="post">
                <h2><u>Add Food Category </u></h2>
                <table>
                    <tr>
                        <td>Category Name </td>
                        <td><input type="text" name="name" required></td>
                    </tr>
                    <tr>
                        <td>Status </td>
                        <td>
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

    onClickOfAddFoodItem() {
        document.getElementById('add-customer-detail').style.display = 'none';
        document.getElementById('add-food-category').style.display = 'none';
        document.getElementById('add-food-item').style.display = 'flex';
        document.getElementById('add-food-item').innerHTML =
            `
            <form id="add-food" action="#" method="post">
            <h2><u>Add New Food Item </u></h2>
            <table>
                <tr>
                    <td>Name </td>
                    <td><input type="text" name="name" required></td>
                </tr>
                <tr>
                <td>Quantity </td>
                    <td><input type="text" name="quantity"  required></td>
                </tr>
                <tr>
                    <td>Rate </td>
                    <td><input type="text" name="rate" required></td>
                </tr>
                <tr>
                    <td>Category Name </td>
                    <td>
                        <select name="category" required>
                            <option value="" disabled selected>--SELECT--</option>
                            <option value="category1">Category 1</option>
                            <option value="category2">Category 2</option>
                            <option value="category3">Category 3</option>
                            </select>
                    </td>
                </tr>
                <tr>
                <td>Status  </td>
                    <td>
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

}

const myCafe = new cafe();