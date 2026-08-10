let employees = [
  {
    id: 1,
    name: "Thanh Tùng",
    email: "tung@example.com",
    avatarUrl: null,
  },
  {
    id: 2,
    name: "Nguyễn Văn A",
    email: "a@example.com",
    avatarUrl: null,
  },
];

const getAll = () => employees;

const findById = (id) => employees.find((e) => e.id === +id);

const findByEmail = (email) => employees.find((e) => e.email === email);

const create = (data) => {
  const newEmployee = {
    id: employees.length + 1,
    name: data.name,
    email: data.email,
    avatarUrl: null,
  };

  employees.push(newEmployee);

  return newEmployee;
};

const updateAvatar = (id, avatarUrl) => {
  const employee = findById(id);

  if (employee) {
    employee.avatarUrl = avatarUrl;
    return employee;
  }

  return null;
};

export default {
  getAll,
  findById,
  findByEmail,
  create,
  updateAvatar,
};
