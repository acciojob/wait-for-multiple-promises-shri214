function getRandomTime() {
    return Math.floor(Math.random() * 3000) + 1000; // random time between 1 and 3 seconds in milliseconds
  }

  const promise1 = new Promise(resolve => {
    setTimeout(() => {
      resolve(getRandomTime());
    }, getRandomTime());
  });

  const promise2 = new Promise(resolve => {
    setTimeout(() => {
      resolve(getRandomTime());
    }, getRandomTime());
  });

  const promise3 = new Promise(resolve => {
    setTimeout(() => {
      resolve(getRandomTime());
    }, getRandomTime());
  });

  Promise.all([promise1, promise2, promise3]).then(values => {
    const loadingRow = document.querySelector('tbody tr');
    const tableBody = document.querySelector('tbody');

    tableBody.removeChild(loadingRow); // remove loading row

    // add rows with promise and time taken
    for (let i = 0; i < values.length; i++) {
      const row = document.createElement('tr');
      const promiseCell = document.createElement('td');
      const timeCell = document.createElement('td');

      promiseCell.textContent = `Promise ${i + 1}`;
      timeCell.textContent = `${(values[i] / 1000).toFixed(3)}`; // convert to seconds and round to 3 decimal places

      row.appendChild(promiseCell);
      row.appendChild(timeCell);
      tableBody.appendChild(row);
    }

    // add row with total time taken
    const totalTime = values.reduce((accumulator, currentValue) => accumulator + currentValue) / 1000;
    const totalRow = document.createElement('tr');
    const totalPromiseCell = document.createElement('td');
    const totalTimeCell = document.createElement('td');

    totalPromiseCell.textContent = 'Total';
    totalTimeCell.textContent = `${totalTime.toFixed(3)}`;

    totalRow.appendChild(totalPromiseCell);
    totalRow.appendChild(totalTimeCell);
    tableBody.appendChild(totalRow);
  });