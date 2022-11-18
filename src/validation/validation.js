const isValidEmail = function (value) {
  let email = /^[a-z0-9_]{3,}@gmail.com$/;
  if (email.test(value)) return true;
};



const firstName = function (value) {
  let name = /^[a-z ]{3,8}$/;
  if (name.test(value)) return true;
};

const lastName = function (value) {
  let name = /^[a-z ]{3,8}$/;
  if (name.test(value)) return true;
};

const Password = function (value) {
  let password= /^[a-z ]{3,8}$/;
  if (password.test(value)) return console.log(true);
};

// ===== blogs ka liye
const body = function (value) {
  let body = /^[a-z ]{3,}$/;
  if (body.test(value)) return true;
};

const authorId = function (value) {
  let authorId = /^[a-z0-9_]{10,}$/;
  if (authorId.test(value)) return true;
};

const category = function (value) {
  let category = /^[a-zA-Z ]{3,}$/;
  if (category.test(value)) return true  
}
const tags = function (value) {
  let tags = /^[a-zA-Z ]{3,}$/;
  for(i of value){
  if (tags.test(value)) return true
}}
const subcategory = function (value) {
  let subcategory = /^[a-z ]{3,}$/;
  if (subcategory.test(value)) return true
}

const title2 = function (value) {
  let title2 = /^[a-z ]{3,}$/;
  if (title2.test(value)) return true;
};



module.exports.subcategory = subcategory
module.exports.tags = tags
module.exports.category = category
module.exports.authorId = authorId
module.exports.body = body


module.exports.isValidEmail = isValidEmail
// module.exports.Password = Password
module.exports.firstName = firstName
module.exports.lastName = lastName
module.exports.title2 = title2