// mysql -u u932299896_eduware -p -h 89.117.188.154 -D u932299896_sisdb
const mysql = require('mysql2');
const Con = require('./feeStatusRenderer');


class SchoolApp
{

        #queryString;

        constructor()
        {
                this.keepConnectionAlive();
        }
        #connection = mysql.createConnection({
                host: "89.117.188.154",
                user: "u932299896_eduware",
                password: "Webgen@220310",
                database: "u932299896_sisdb",
        });


        keepConnectionAlive ()
        {
                setInterval(() =>
                {
                        this.#connection.query('select 1');
                }, 5000)
        }


        checkInput ()
        {
                // document.getElementById('entry').style.display = 'none';
                // document.getElementById('student-list').style.display = '';
                const name = document.getElementById('name').value.toUpperCase();
                const fname = document.getElementById('fname').value.toUpperCase();
                const mob = document.getElementById('mob').value.toUpperCase();

                if (name !== "" && fname === '' && mob === '')
                {
                        this.#queryString = `SELECT admno,name, fname, fmob FROM tbl_admission WHERE name='${name}' AND session = "2023-2024" AND active = 1`;
                        this.listStudents(this.#queryString);
                } else if (fname !== "" && name === '' && mob === '')
                {
                        this.#queryString = `SELECT admno,name, fname, fmob FROM tbl_admission WHERE fname='${fname}' AND session = "2023-2024" AND active = 1`;
                        this.listStudents(this.#queryString);
                } else if (mob !== "" && name === '' && fname === '')
                {
                        this.#queryString = `SELECT admno,name, fname, fmob FROM tbl_admission WHERE fmob='${mob}' AND session = "2023-2024" AND active = 1`;
                        this.listStudents(this.#queryString);
                } else
                {
                        alert("Please Enter valid data...")
                        document.location.reload();
                }


        }


        listStudents ()
        {
                // try {
                this.#connection.query(this.#queryString, (error, result) =>
                {
                        console.table(result);
                        if (result.length > 0)
                        {
                                document.getElementById('entry').style.display = 'none';
                                document.getElementById('student-list').style.display = '';

                                let studentListHtml = `<form action="">
                <table class="table">
                <thead>
                <tr>
                <th>Name</th>
                <th>Father</th>
                <th>Mobile</th>
                <th>Action</th>
                </tr>
                </thead>
                <tbody>`;
                                result.forEach((each) =>
                                {
                                        studentListHtml += `<tr>
                    <td>${each.name}</td>
                    <td>${each.fname}</td>
                    <td>${each.fmob}</td>
                    <td><i class="fa fa-arrow-right custom-button" id="dashboard-referring-btn" onclick="myApp.showDashboard('${each.admno}')"></i></td></tr>`;
                                })

                                studentListHtml += `</tbody>
                </table>
                </form>`;
                                document.getElementById('student-list').innerHTML = studentListHtml;
                        } else
                        {
                                alert("Data not found");
                                document.location.reload();
                        }
                })
                // } catch (error) {
                //         if (error) {
                //                 console.log(error);
                //                 document.location.reload();
                //         }
                // }
        }


        showDashboard (admno)
        {
                let dashboardHtml = `<h4 style="text-align: center; background-color: aqua;">DASHBOARD</h4>
                <hr>`;
                document.getElementById('entry').style.display = 'none';
                document.getElementById('student-list').style.display = 'none';
                document.getElementById('profile').style.display = 'none';
                document.getElementById('fee-status').style.display = 'none';
                document.getElementById('dashboard').style.display = '';
                this.#queryString = `SELECT admno, name, fname, class, section, roll, fmob, session FROM tbl_admission WHERE admno='${admno}' AND session = '2023-2024' AND active = 1`
                this.#connection.query(this.#queryString, (error, result) =>
                {
                        result.forEach((each) =>
                        {
                                console.log(each)
                                dashboardHtml += `<table style="margin-top: 20px;">
                                <tr>
                                    <th><label>Admission No</label></th>
                                    <td><input class="form-control" value="${each.admno}" readonly></input></td>
                                </tr>
                                <tr>
                                    <th><label>Name</label></th>
                                    <td><input class="form-control" value="${each.name}" readonly></input></td>
                                </tr>
                                <tr>
                                    <th><label>Father's Name</label></th>
                                    <td><input class="form-control" value="${each.fname}" readonly></td>
                                </tr>
                                <tr>
                                    <th><label>Mobile</label></th>
                                    <td><input class="form-control" value="${each.fmob}" readonly></td>
                                </tr>
                                <tr>
                                    <th><label>Session</label></th>
                                    <td><input class="form-control" value="${each.session}" readonly></td>
                                </tr>
                            </table>
                            <table>
                                <tr>
                                    <th><label>class</label></th>
                                    <td><input class="form-control" value="${each.class}" readonly></td>
                                    <th><label>Section</label></th>
                                    <td><input class="form-control" value="${each.section}" readonly></td>
                                    <th><label>Roll</label></th>
                                    <td><input class="form-control" value="${each.roll}" readonly></td>
                                </tr>
                              </table>`;
                        })
                        dashboardHtml += `<hr>
                        <table style="margin-top: 30px;">
                        <tr>
                        <td style="padding: 10px;">
                        <div class="card" style="width:100px; height: 100px; background-color:azure;">
                        <img src="profile.png" alt="Card image" style="height: 100px; width: 100px; padding: 10px;">
                        <a href="#" class="btn btn-primary" style="width: 100px;" onclick="myApp.showProfile('${admno}')">Profile</a>
                        </div>
                        </td>
                        <td style="padding: 10px;">
                        <div class="card" style="width:100px; height: 100px;background-color:azure;">
                        <img src="profile.png" alt="Card image" style="height: 100px; width: 100px; padding: 10px;">
                        <a href="#" class="btn btn-primary" style="width: 100px;" onclick="myApp.showFeeStatus('${admno}')">Fees</a>
                        </div>
                        </td>
                        <td style="padding: 10px;">
                        <div class="card" style="align-items: center; width:100px; height: 100px;background-color:azure;">
                        <img src="profile.png" alt="Card image" style="height: 100px; width: 100px; padding: 10px;">
                        <a href="#" class="btn btn-primary" style="width: 100px;">Notice</a>
                        </div>
                        </td>
                        </tr>
                        </table>
                        <table style="margin-top: 50px;">
                        <tr>
                        <td style="padding: 10px;">
                        <div class="card" style="width:100px; height: 100px; background-color:azure;">
                        <img src="profile.png" alt="Card image" style="height: 100px; width: 100px; padding: 10px;">
                        <a href="#" class="btn btn-primary" style="width: 100px;">Profile</a>
                        </div>
                        </td>
                        <td style="padding: 10px;">
                        <div class="card" style="width:100px; height: 100px;background-color:azure;">
                        <img src="profile.png" alt="Card image" style="height: 100px; width: 100px; padding: 10px;">
                        <a href="#" class="btn btn-primary" style="width: 100px;">Fees</a>
                        </div>
                        </td>
                        <td style="padding: 10px;">
                        <div class="card" style="align-items: center; width:100px; height: 100px;background-color:azure;">
                        <img src="profile.png" alt="Card image" style="height: 100px; width: 100px; padding: 10px;">
                        <a href="#" class="btn btn-primary" style="width: 100px;">Notice</a>
                        </div>
                        </td>
                        </tr>
                        </table>`;
                        document.getElementById('dashboard').innerHTML = dashboardHtml;
                });
        }

        showProfile (admno)
        {
                document.getElementById('entry').style.display = 'none';
                document.getElementById('student-list').style.display = 'none';
                document.getElementById('dashboard').style.display = 'none';
                document.getElementById('profile').style.display = '';
                let profileHtml = '';
                this.#queryString = `SELECT admno,name, fname, class, section, roll, fmob, session, active,transport FROM tbl_admission WHERE admno='${admno}' AND session = '2023-2024' AND active = 1`
                this.#connection.query(this.#queryString, (error, result) =>
                {
                        result.forEach((each) =>
                        {
                                profileHtml += `<table style="margin-bottom: 10px;">
                                <tr>
                                    <div class="d-grid">
                                        <button style="text-align: left;" class="btn btn-primary btn-block" onclick="myApp.showDashboard('${admno}')"><i
                                                class="fas fa-arrow-left"></i></button>
                                    </div>
                                </tr>
                                <tr>
                                    <div style="margin-top: 10px; margin-bottom: 5px;" class="card-header bg-transparent text-center">
                                        <img src="face.png" class="rounded-circle" alt="student dp" width="80" height="80">
                                    </div>
                                </tr>
                                <tr>
                                    <th>Name</th>
                                    <td><input class="form-control" id="p-name" value="${each.name}" readonly></input></td>
                                    <td id="p-name-td">
                                        <i onclick="myApp.changeStudentName('${admno}')" style="color: white;background-color:rgb(3, 100, 3);padding:7px;border-radius: 5px; "
                                        class="fas fa-pencil-alt"></i>
                                    </td>
                                </tr>
                                <tr>
                                    <th>Father's Name</th>
                                    <td><input class="form-control" id="p-fname" value="${each.fname}" readonly></input></td>
                                    <td id="p-fname-td">
                                        <i onclick="myApp.changeStudentFname('${admno}')" style="color: white;background-color:rgb(3, 100, 3);padding:7px;border-radius: 5px; "
                                        class="fas fa-pencil-alt"></i>
                                    </td>
                                </tr>
                                <tr>
                                    <th>Mobile</th>
                                    <td><input class="form-control" id="p-mob" value="${each.fmob}" readonly></input></td>
                                    <td id="p-mob-td">
                                        <i onclick="myApp.changeStudentMob('${admno}')" style="color: white;background-color:rgb(3, 100, 3);padding:7px;border-radius: 5px; "
                                        class="fas fa-pencil-alt"></i>
                                    </td>
                                </tr>
                            </table>
                            <table style="margin-top: 5px;" class="table table-bordered">
                                <h4 style="margin-left: 5px;" ><i class="far fa-clone pr-1"></i>GENERAL INFORMATION</h4>
                                <tr>
                                    <th width="40%">ADMISSION NO.</th>
                                    <td width="2%">:</td>
                                    <td>${each.admno}</td>
                                </tr>
                                <tr>
                                    <th width="30%">CLASS</th>
                                    <td width="2%">:</td>
                                    <td>${each.class}</td>
                                </tr>
                                <tr>
                                    <th width="30%">SECTION</th>
                                    <td width="2%">:</td>
                                    <td>${each.section}</td>
                                </tr>
                                <tr>
                                    <th width="30%">ROLL</th>
                                    <td width="2%">:</td>
                                    <td>${each.roll}</td>
                                </tr>
                                <tr>
                                    <th width="30%">SESSION</th>
                                    <td width="2%">:</td>
                                    <td>${each.session}</td>
                                </tr>
                                <tr>
                                    <th width="30%">TRANSPORT</th>
                                    <td width="2%">:</td>
                                    <td>${each.transport}</td>
                                </tr>
                                
                                `

                        });
                });
                this.#queryString = `select transportfee from tbl_stdfeemaster where admno='${admno}' AND session = '2023-2024'`
                this.#connection.query(this.#queryString, (error, result) =>
                {
                        profileHtml += `<tr>
                                <th width="30%">TRANSPORT FEE</th>
                                <td width="2%">:</td>
                                <td>${result[0].transportfee}</td>
                            </tr>`

                });
                this.#queryString = `select destination from tbl_stdtransdetail where admno='${admno}'`;
                this.#connection.query(this.#queryString, (error, result) =>
                {
                        profileHtml += `<tr>
                                <th width="30%">DESTINATION</th>
                                <td width="2%">:</td>
                                <td>${result[0].destination}</td>
                            </tr>
                        </table>`
                        profileHtml += `<div class="d-grid">
                                        <button id="pay-now" class="btn btn-primary btn-block" onclick="myApp.showFeeStatus('${admno}')">Pay Now</button>
                                        </div>
                                <br>`;
                        document.getElementById('profile').innerHTML = profileHtml;
                });
        }

        showFeeStatus (admno)
        {
                document.getElementById('entry').style.display = 'none';
                document.getElementById('student-list').style.display = 'none';
                document.getElementById('dashboard').style.display = 'none';
                document.getElementById('profile').style.display = 'none';
                document.getElementById('fee-status').style.display = '';
                // const pay = new Con(admno);
                pay.setAdmission(admno);
        }

        changeStudentName (admno)
        {
                const isReadOnly = document.getElementById('p-name').hasAttribute('readonly')
                if (isReadOnly)
                {
                        document.getElementById('p-name').removeAttribute('readonly')
                        document.getElementById('p-name-td').innerHTML =
                                `<i onclick="myApp.changeStudentName('${admno}')" style="color: white;background-color:rgb(3, 100, 3);padding:7px;border-radius: 5px; "
                                class="fas fa-check"></i>`;
                        document.getElementById('p-name').focus();
                } else
                {
                        document.getElementById('p-name').setAttribute('readonly', 'true');
                        document.getElementById('p-name-td').innerHTML =
                                `<i onclick="myApp.changeStudentName('${admno}')" style="color: white;background-color:rgb(3, 100, 3);padding:7px;border-radius: 5px; "
                class="fas fa-pencil-alt"></i>`;
                }
                const pName = document.getElementById('p-name').value;
                console.log(pName);
                this.#queryString = `UPDATE tbl_admission SET name = '${pName}' WHERE admno = '${admno}' AND session = '2023-2024' AND active = 1`;
                this.#connection.query(this.#queryString);
        }

        changeStudentFname (admno)
        {
                const isReadOnly = document.getElementById('p-fname').hasAttribute('readonly')
                if (isReadOnly)
                {
                        document.getElementById('p-fname').removeAttribute('readonly')
                        document.getElementById('p-fname-td').innerHTML =
                                `<i onclick="myApp.changeStudentFname('${admno}')" style="color: white;background-color:rgb(3, 100, 3);padding:7px;border-radius: 5px; "
                                class="fas fa-check"></i>`;
                        document.getElementById('p-fname').focus();
                } else
                {
                        document.getElementById('p-fname').setAttribute('readonly', 'true');
                        document.getElementById('p-fname-td').innerHTML =
                                `<i onclick="myApp.changeStudentFname('${admno}')" style="color: white;background-color:rgb(3, 100, 3);padding:7px;border-radius: 5px; "
                class="fas fa-pencil-alt"></i>`;
                }
                const pFname = document.getElementById('p-fname').value;
                console.log(pFname);
                this.#queryString = `UPDATE tbl_admission SET fname = '${pFname}' WHERE admno = '${admno}' AND session = '2023-2024' AND active = 1`;
                this.#connection.query(this.#queryString);
        }

        changeStudentMob (admno)
        {
                const isReadOnly = document.getElementById('p-mob').hasAttribute('readonly')
                if (isReadOnly)
                {
                        document.getElementById('p-mob').removeAttribute('readonly')
                        document.getElementById('p-mob-td').innerHTML =
                                `<i onclick="myApp.changeStudentMob('${admno}')" style="color: white;background-color:rgb(3, 100, 3);padding:7px;border-radius: 5px; "
                                class="fas fa-check"></i>`;
                        document.getElementById('p-mob').focus();
                } else
                {
                        document.getElementById('p-mob').setAttribute('readonly', 'true');
                        document.getElementById('p-mob-td').innerHTML =
                                `<i onclick="myApp.changeStudentMob('${admno}')" style="color: white;background-color:rgb(3, 100, 3);padding:7px;border-radius: 5px; "
                class="fas fa-pencil-alt"></i>`;
                }
                const pMob = document.getElementById('p-mob').value;
                console.log(pMob);
                this.#queryString = `UPDATE tbl_admission SET fmob = '${pMob}' WHERE admno = '${admno}' AND session = '2023-2024' AND active = 1`;
                this.#connection.query(this.#queryString);
        }
}

const myApp = new SchoolApp();
const pay = new Con();

// const pay = new Con;
// module.exports = SchoolApp;
