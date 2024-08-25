document.getElementById('submit-btn').addEventListener('click', function() {
    const jsonInput = document.getElementById('json-input').value;
    const errorMessage = document.getElementById('error-message');
    const dropdownContainer = document.getElementById('dropdown-container');
    const responseContainer = document.getElementById('response-container');
    const responseOutput = document.getElementById('response-output');
    const responseOptions = document.getElementById('response-options');

    
    errorMessage.textContent = '';
    responseOutput.textContent = '';

    try {
      
        const requestData = JSON.parse(jsonInput);

        if (!requestData.data || !Array.isArray(requestData.data)) {
            throw new Error('Invalid JSON structure. Make sure "data" is an array.');
        }


        fetch('https://nirajnn.pythonanywhere.com/bfhl', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestData)
        })
        .then(response => response.json())
        .then(data => {
            dropdownContainer.style.display = 'block';
            responseContainer.style.display = 'block';

            responseOptions.addEventListener('change', function() {
                const selectedOptions = Array.from(responseOptions.selectedOptions).map(option => option.value);
                let filteredData = {};

                selectedOptions.forEach(option => {
                    filteredData[option] = data[option];
                });

                responseOutput.textContent = JSON.stringify(filteredData, null, 2);
            });

            
            const event = new Event('change');
            responseOptions.dispatchEvent(event);
        })
        .catch(error => {
            console.log(error)
            errorMessage.textContent = 'Failed to fetch data from API';
        });

    } catch (e) {
        errorMessage.textContent = `Invalid JSON: ${e.message}`;
    }
});
