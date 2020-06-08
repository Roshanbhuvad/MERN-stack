var CustomerAll = React.createClass({
  getInitialState: function () {
    return {
      customerid: "",
      name: "",
      age: "",
      sex: "",
      address: "",
      Buttontxt: "Save",
      data1: [],
    };
  },
  handleChange: function (e) {
    this.setState({ [e.target.name]: e.target.value });
  },

  componentDidMount() {
    $.ajax({
      url: "api/getdata",
      type: "GET",
      dataType: "json",
      ContentType: "application/json",
      success: function (data) {
        this.setState({ data1: data });
      }.bind(this),
      error: function (jqXHR) {
        console.log(jqXHR);
      }.bind(this),
    });
  },

  DeleteData(customerid) {
    var customerDelete = {
      customerid: customerid,
    };
    $.ajax({
      url: "/api/Removedata/",
      dataType: "json",
      type: "POST",
      data: customerDelete,
      success: function (data) {
        alert(data.data);
        this.componentDidMount();
      }.bind(this),
      error: function (xhr, status, err) {
        alert(err);
      }.bind(this),
    });
  },

  EditData(item) {
    this.setState({
      customerid: item._id,
      name: item.name,
      age: item.age,
      sex: item.sex,
      address: item.address,
      Buttontxt: "Update",
    });
  },

  handleClick: function () {
    var Url = "";
    if (this.state.Buttontxt == "Save") {
      Url = "/api/savedata";
    } else {
      Url = "/api/UpdateData";
    }
    var customerdata = {
      customerid: this.state.customerid,
      name: this.state.name,
      age: this.state.age,
      sex: this.state.sex,
      address: this.state.address,
    };
    $.ajax({
      url: Url,
      dataType: "json",
      type: "POST",
      data: customerdata,
      success: function (data) {
        alert(data.data);
        this.setState(this.getInitialState());
        this.componentDidMount();
      }.bind(this),
      error: function (xhr, status, err) {
        alert(err);
      }.bind(this),
    });
  },

  render: function () {
    return (
      <div className="container" style={{ marginTop: "50px" }}>
        <p className="text-center" style={{ fontSize: "25px" }}>
          <b> CRUD Operation Using React,Nodejs,Express,MongoDB</b>
        </p>
        <form>
          <div className="col-sm-12 col-md-12" style={{ marginLeft: "400px" }}>
            <table className="table-bordered">
              <tbody>
                <tr>
                  <td>
                    <b>CustomerID</b>
                  </td>
                  <td>
                    <input
                      className="form-control"
                      type="text"
                      value={this.state.customerid}
                      name="customerid"
                      onChange={this.handleChange}
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <b>Name</b>
                  </td>
                  <td>
                    <input
                      className="form-control"
                      type="text"
                      value={this.state.name}
                      name="name"
                      onChange={this.handleChange}
                    />
                  </td>
                </tr>

                <tr>
                  <td>
                    <b>Age</b>
                  </td>
                  <td>
                    <input
                      type="text"
                      className="form-control"
                      value={this.state.age}
                      name="age"
                      onChange={this.handleChange}
                    />
                  </td>
                </tr>

                <tr>
                  <td>
                    <b>Sex</b>
                  </td>
                  <td>
                    <input
                      type="text"
                      className="form-control"
                      value={this.state.sex}
                      name="sex"
                      onChange={this.handleChange}
                    />
                  </td>
                </tr>

                <tr>
                  <td>
                    <b>Address</b>
                  </td>
                  <td>
                    <input
                      type="text"
                      className="form-control"
                      value={this.state.address}
                      name="address"
                      onChange={this.handleChange}
                    />
                  </td>
                </tr>

                <tr>
                  <td></td>
                  <td>
                    <input
                      className="btn btn-primary"
                      type="button"
                      value={this.state.Buttontxt}
                      onClick={this.handleClick}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div
            className="col-sm-12 col-md-12 "
            style={{ marginTop: "50px", marginLeft: "300px" }}
          >
            <table className="table-bordered">
              <tbody>
                <tr>
                  <th>
                    <b>CustomerID</b>
                  </th>
                  <th>
                    <b>NAME</b>
                  </th>
                  <th>
                    <b>AGE</b>
                  </th>
                  <th>
                    <b>SEX</b>
                  </th>
                  <th>
                    <b>ADDRESS</b>
                  </th>
                </tr>
                {this.state.data1.map((item, index) => (
                  <tr>
                    <td>{item.customerid}</td>
                    <td>{item.name}</td>
                    <td>{item.age}</td>
                    <td>{item.sex}</td>
                    <td>{item.address}</td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-success"
                        onClick={(e) => {
                          this.EditData(item);
                        }}
                      >
                        Edit
                      </button>
                    </td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-info"
                        onClick={(e) => {
                          this.DeleteData(item._id);
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </form>
      </div>
    );
  },
});

ReactDOM.render(<CustomerAll />, document.getElementById("root"));
