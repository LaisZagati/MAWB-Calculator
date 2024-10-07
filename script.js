document.getElementById('storageForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const weight = parseFloat(document.getElementById('weight').value);
    const airline = document.getElementById('airline').value;
    const includeServiceSecurity = document.getElementById('service-security').value === 'yes';
    const includeCargoHandling = document.getElementById('cargo-handling').value === 'yes';
    const includeULD = document.getElementById('uld').value === 'yes';


    // Log inputs
    console.log('Inputs:', { weight, airline, includeServiceSecurity, includeCargoHandling, includeULD });



    
    let numDays = parseInt(document.getElementById('numDays').value) || 0;
    let numULDs = parseInt(document.getElementById('numULDs').value) || 0;

    // Prompt for number of ULDs if needed
    if (includeULD && (airline === 'IAG' || airline === 'WFS')) {
        numULDs = parseInt(prompt("Enter the number of ULDs used:")) || 0;
        console.log('Number of ULDs after prompt:', numULDs);
    }

    // Prompt for number of extra days if needed
    if (airline === 'SWISSPORT' && numDays > 0) {
        alert(`The shipment was recovered after 12 hours. Storage charges for ${numDays} days have been applied.`);
        console.log('Number of days for Swissport (manual entry):', numDays);
    } else if (airline === 'SWISSPORT' && includeULD) {
        const recoveredAfter12Hours = confirm("Was the shipment recovered after 12 hours? If yes, input the number of extra days.");
        if (recoveredAfter12Hours) {
            numDays = parseInt(prompt("Enter the number of extra days:")) || 0;
            console.log('Number of extra days after prompt:', numDays);
        }
    }





    let serviceSecurityCharge = 0;
    let cargoHandlingCharge = 0;
    let uldCharge = 0;

    if (airline === 'WFS') {
        if (includeServiceSecurity) {
            serviceSecurityCharge = Math.max(weight * 0.043, 20.61);
        }
        if (includeCargoHandling) {
            cargoHandlingCharge = Math.max(weight * 0.26, 35.08);
        }
        if (includeULD) {
            uldCharge = Math.max(weight * 0.156, 227.99 * numULDs);
        }
    } else if (airline === 'SWISSPORT') {
        if (includeServiceSecurity) {
            serviceSecurityCharge = Math.max(weight * 0.038, 18.34);
        }
        if (includeCargoHandling) {
            cargoHandlingCharge = Math.max(weight * 0.265, 33.32);
        }
        if (includeULD) {
            uldCharge = Math.max(weight * 0.155, 228.20) + (numDays * 33.63);
        }
    } else if (airline === 'IAG') {
        if (includeServiceSecurity) {
            // serviceSecurityCharge = Math.max(weight * 0.009, 12.00) + 5.00;
            serviceSecurityCharge = Math.max(weight * 0.009, 12.00);
        // Add +5 only if the charge is less than or equal to 12.00
        if (serviceSecurityCharge <= 12.00) {
            serviceSecurityCharge += 5.00;
        }
        }
        if (includeCargoHandling) {
            cargoHandlingCharge = Math.max(weight * 0.265, 33.00);
        }
        if (includeULD) {
            uldCharge = Math.max(weight * 0.14, 205.00 * numULDs);
        }
    }

      // Log calculated charges
    console.log('Service & Security Charge:', serviceSecurityCharge);
    console.log('Cargo Handling Charge:', cargoHandlingCharge);
    console.log('ULD Charge:', uldCharge);


    let totalCharge = serviceSecurityCharge + cargoHandlingCharge + uldCharge;

    if (weight <= 225) {
        totalCharge = Math.max(totalCharge, 80); // Minimum charge for weights up to 225 kg
        console.log('Applied minimum charge for weight <= 225kg:', totalCharge);
    }

        console.log('Total Charge:', totalCharge);


    document.getElementById('totalCharge').innerHTML = `
        <strong>Total Charge:</strong> <span class="charge-amount">€${totalCharge.toFixed(2)}</span><br>
        <strong>Airline:</strong> <span class="airline">${airline}</span><br>
        <strong>Service & Security:</strong> <span class="service-security">${includeServiceSecurity ? 'Yes' : 'No'}</span><br>
        <strong>Cargo Handling:</strong> <span class="cargo-handling">${includeCargoHandling ? 'Yes' : 'No'}</span><br>
        <strong>ULD:</strong> <span class="uld">${includeULD ? 'Yes' : 'No'}</span><br>
        <strong>Weight:</strong> <span class="weight">${weight} kg</span>
    `;

    // Reset form fields
    document.getElementById('storageForm').reset();
});
