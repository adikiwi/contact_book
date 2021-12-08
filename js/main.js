const API = "  http://localhost:8000/contacts";

let inpName = $(".inp-name");
let inpLastname = $(".inp-lastname");
let inpNumber = $(".inp-number");
let form = $(".addUser");

// add User

function addUser(event) {
  event.preventDefault();
  let firstname = inpName.val();
  let lastname = inpLastname.val();
  let number = inpNumber.val();
  let user = {
    firstname: firstname,
    lastname: lastname,
    number: number,
  };
  fetch(API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  }).then(() => {
    getUser(API);
  });
  inpName.val("");
  inpLastname.val("");
  inpNumber.val("");
}
form.on("submit", addUser);

let tbody = $("tbody");

// get User

function getUser(API) {
  fetch(API)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      tbody.html("");
      data.forEach((item, index) => {
        tbody.append(`
          <tr>
          <td>${index + 1}</td>
          <td>${item.firstname}</td>
          <td>${item.lastname}</td>
          <td>${item.number}</td>
          <td>
            <button id="${item.id}"
            class="btn btn-danger btn-delete delete-user">Удалить</button>
            <button id="${item.id}"
            class="btn btn-primary btn-edit edit-user" data-bs-toggle="modal" data-bs-target="#exampleModal">Изменить</button>
          </td>
          </tr>`);
      });
    });
}
getUser(API);

// DELETE user

function deleteUser(event) {
  let id = event.target.id;
  fetch(`${API}/${id}`, {
    method: "DELETE",
  }).then(() => getUser(API));
}
$(document).on("click", ".btn-delete", deleteUser);

// UPDATE user

let formEdit = $(".form-edit");
let editName = $(".edit-name");
let editlastName = $(".edit-lastname");
let editNumber = $(".edit-number");
let modal = $(".modal");

function getUserToEdit(event) {
  let id = event.target.id;
  formEdit.attr("id", id);
  fetch(`${API}/${id}`)
    .then((response) => response.json())
    .then((data) => {
      editName.val(data.firstname);
      editlastName.val(data.lastname);
      editNumber.val(data.number);
    });
}

function saveEditedUser(event) {
  event.target.id;
  let id = event.target.id;
  let firstname = editName.val();
  let lastname = editlastName.val();
  let number = editNumber.val();
  let editedUser = {
    firstname: firstname,
    lastname: lastname,
    number: number,
  };
  fetch(`${API}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(editedUser),
  }).then(() => getUser(API));
  modal.modal("hide");
}

$(document).on("click", ".btn-edit", getUserToEdit);
formEdit.on("submit", saveEditedUser);
