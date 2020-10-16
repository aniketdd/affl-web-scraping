function renderUserTable({ users }) {
  document.getElementById('userTable').innerHTML = `
  <tr>
    <th>Id</th>
    <th>Email</th>
    <th>First name</th>
    <th>Last name</th>
    <th>Avatar</th>
  </tr>` +
  users.reduce((last, item, index) => (
    `${last}
    <tr>
      <td>${item.userid}</td>
      <td>${item.email}</td>
      <td>${item.firstname}</td>
      <td>${item.lastname}</td>
      <td>${item.avatar}</td>
    </tr>`
  ),'');
}

function renderPerformanceTable({ data }) {
  document.getElementById('performanceTable').innerHTML = `
  <tr>
    <th>Id</th>
    <th>Date</th>
    <th>Commissions - Total</th>
    <th>Sales - Net</th>
    <th>Leads - Net</th>
    <th>Clicks</th>
    <th>EPC</th>
    <th>Impressions</th>
    <th>CR</th>
    <th>Bonuses</th>
    <th>Comm Clicks</th>
    <th>Commissions - Approved</th>
    <th>Commissions - Bonus</th>
    <th>Commissions - Disputed</th>
    <th>Commissions - Gross</th>
    <th>Commissions - Net</th>
    <th>Commissions - Pending</th>
    <th>Leads - Approved</th>
    <th>Leads - Disputed</th>
    <th>Leads - Gross</th>
    <th>Leads - Pending</th>
    <th>Sale Amount - Approved</th>
    <th>Sale Amount - Disputed</th>
    <th>Sale Amount - Gross</th>
    <th>Sale Amount - Net</th>
    <th>Sale Amount - Pending</th>
    <th>Sales - Approved</th>
    <th>Sales - Disputed</th>
    <th>Sales - Gross</th>
    <th>Sales - Pending</th>
  </tr>` + data.reduce((last,item, index) => (
    `${last}
    <tr>
      <td>${index+1}</td>
      <td>${item.date}</td>
      <td>${item.totalComm}</td>
      <td>${item.netSaleCount}</td>
      <td>${item.netLeadCount}</td>
      <td>${item.clickCount}</td>
      <td>${item.EPC}</td>
      <td>${item.impCount}</td>
      <td>${item.CR}</td>
      <td>${item.bonusCount}</td>
      <td>${item.commClickCount}</td>
      <td>${item.apprComm}</td>
      <td>${item.bonusComm}</td>
      <td>${item.dispComm}</td>
      <td>${item.grossComm}</td>
      <td>${item.netComm}</td>
      <td>${item.pendComm}</td>
      <td>${item.apprLeadCount}</td>
      <td>${item.dispLeadCount}</td>
      <td>${item.grossLeadCount}</td>
      <td>${item.pendLeadCount}</td>
      <td>${item.apprSaleAmount}</td>
      <td>${item.dispSaleAmount}</td>
      <td>${item.grossSaleAmount}</td>
      <td>${item.netSaleAmount}</td>
      <td>${item.pendSaleAmount}</td>
      <td>${item.apprSaleCount}</td>
      <td>${item.dispSaleCount}</td>
      <td>${item.grossSaleCount}</td>
      <td>${item.pendSaleCount}</td>
    </tr>`
  ),'');
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
