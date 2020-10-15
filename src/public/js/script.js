function renderUserTable({ users }) {
  document.getElementById('userTable').innerHTML = users.map((item, index) => (
    `<tr><td>${
      item.userid
    }</td><td>${
      item.email
    }</td><td>${
      item.firstname
    }</td><td>${
      item.lastname
    }</td><td>${
      item.avatar
    }</td></tr>`
  ));
}

function renderPerformanceTable({ data }) {
  document.getElementById('performanceTable').innerHTML = data.map((item, index) => (
    `<tr><td>${
      index
    }</td><td>${
      item.date
    }</td><td>${
      item.totalComm
    }</td><td>${
      item.netSaleCount
    }</td><td>${
      item.netLeadCount
    }</td><td>${
      item.clickCount
    }</td><td>${
      item.EPC
    }</td></tr>`
  ));
}

function ajax(url, renderFunction) {
  const xhr = new XMLHttpRequest();

  xhr.onload = function () {
    if (xhr.status >= 200 && xhr.status < 300) {
      // console.log('success!', JSON.parse(xhr.response));
      const resp = JSON.parse(xhr.response);
      // console.log(resp.data);
      renderFunction(resp);
    } else {
      console.log('The request failed!');
    }
  };

  xhr.open('GET', url);
  xhr.send();
}

ajax('/v1/users', renderUserTable);
ajax('/v1/performance', renderPerformanceTable);
