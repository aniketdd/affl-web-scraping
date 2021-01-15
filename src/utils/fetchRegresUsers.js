const axios = require('axios');

async function getUsersFromRegresApi(url, page = 1) {
  const response = await axios.get(`${url}${page}`);
  if (response.status >= 200 && response.status < 300) {
    const { data } = response;
    const { page: currentPage, total_pages: totalPages, data: users } = data;
    return { currentPage, totalPages, users };
  }
  throw new Error('ErrorResponse');
}

export default async function getAllUsers(url) {
  try {
    let allUsers = [];
    const pageResult = await getUsersFromRegresApi(url);
    const { totalPages, users } = pageResult;
    allUsers = allUsers.concat(users);
    const pageNumbers = Array.from(
      new Array(totalPages - 1),
      (item, index) => index + 2
    );

    const pages = await Promise.all(
      pageNumbers.map(async (pageNumber) => getUsersFromRegresApi(url, pageNumber))
    );
    pages.forEach((page) => {
      allUsers = allUsers.concat(page.users);
    });
    return {
      success: true,
      users: allUsers,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
    };
  }
}
