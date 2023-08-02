const server = 'http://localhost:3000';
var itemName;
var itemCost;
var year;

//creating Arrays to store the data collected
var itemNames = [];
var itemCosts = [];
var years = [];


async function fetchitems() {
    const url = server + '/items';
    const options = {
        method: 'GET',
        headers: {
            'Accept' : 'application/json'
        }
    }
    const response = await fetch(url, options);
    const items = await response.json();
    populateContent(items);

}

async function additems() {
    const url = server + '/items';
    const items = {name: itemName, cost: itemCost,year: year};
    const options = {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify(items)
    }
    const response = await fetch(url, options);
}

//Edit items 
// async function editProducts(items){
//     const url = server + '/edit-items';
//     const options={
//         method: 'POST',
//         headers: {
//             'content-Type': 'application/json',
//         },
//         body:JSON.stringify(items),
//     };
//     const response = await fetch(url,options)
// }



//new populate function with graph 

function populateContent(items) {
    var table = document.getElementById('content');
    table.innerHTML = "<tr><th> Item Name </th><th>Item Cost</th><th>Item Year</th></tr>";

    items.forEach(item => {
        var row = document.createElement('tr');
        var dataName = document.createElement('td');
        var textName = document.createTextNode(item.name);
        dataName.appendChild(textName);

        var dataCost = document.createElement('td');
        var textCost = document.createTextNode(item.cost);
        dataCost.appendChild(textCost);

        var dataYear = document.createElement('td');
        var textYear = document.createTextNode(item.year);
        dataYear.appendChild(textYear);

        row.appendChild(dataName);
        row.appendChild(dataCost);
        row.appendChild(dataYear);
        table.appendChild(row);

        itemNames.push(item.name);
        itemCosts.push(item.cost);
        years.push(item.year);

        var delete1 = document.createElement('td');
        delete1.innerHTML = '<button onClick="onDelete(this)">DELETE</button>'
        row.append(delete1)
    });

    // Create the Chart.js line graph
    var ctx = document.getElementById('lineGraph').getContext('2d');
    var lineGraph = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: itemNames, // Item names on x-axis
            datasets: [{
                
                label: 'Prices',
                data: itemCosts, // Years on y-axis
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 2,
                fill: false,
                pointBackgroundColor: 'rgba(75, 192, 192, 1)',
                pointBorderColor: 'rgba(75, 192, 192, 1)',
                pointRadius: 5,
                pointHoverRadius: 8
                
            }]
        },
        options: {
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Item Name'

                    }
                    
                },
                y: {
                    title: {
                        display: true,
                        text: 'Costs'
                    },
                    beginAtZero: false,
                    ticks: {
                        min: 2015,
                        max: 2023
                    }
                }
            }
        }
    });
}

//delete function
function onDelete(td){
    if(confirm('Do you want to delete this record?')){
        row = td.parentElement.parentElement;
        document.getElementById('content').deleteRow(row.rowIndex); 
    }
    document.getElementById('product').value = 'deleted';
    document.getElementById('price').value = 'deleted';
    document.getElementById('year').value = 'deleted';
}


document.querySelector('form').addEventListener('submit', (e) => {
    
    e.preventDefault();
    itemName = document.getElementById('itemName').value;
    itemCost = document.getElementById('itemCost').value;
    year = document.getElementById('year').value;
   
    additems();
    fetchitems();
    
    
    
});




