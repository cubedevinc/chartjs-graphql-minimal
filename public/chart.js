fetch('/data')
  .then(response => response.json())
  .then(data => {
    const ctx = document.getElementById('myChart').getContext('2d');
    // console.log(data);
    const chartData = {
      labels: data.map(item => item.item_information.created_at.year),
      datasets: [{
        label: 'Items Count',
        data: data.map(item => item.item_information.number_of_items),
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      }]
    };

    new Chart(ctx, {
      type: 'bar',
      data: chartData,
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  });