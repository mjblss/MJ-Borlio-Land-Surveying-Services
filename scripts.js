function calculateCost() {
    const areaSize = parseFloat(document.getElementById('area-size').value); // Area size in square meters
    const surveyType = document.getElementById('survey-type').value;
    const numLots = parseInt(document.getElementById('num-lots').value);
    const landClassification = document.getElementById('land-classification').value;
    const location = document.getElementById('location').value;

    let totalCost = 0;

    // Check if the survey type is a Relocation Survey
    if (surveyType === 'relocation') {
        // Convert area size to hectares (assuming the input is in square meters)
        const areaInHectares = areaSize / 10000;

        if (areaInHectares <= 1) {
            // Cost for the first hectare or less
            totalCost = 20000;
        } else {
            // Cost for the first hectare + additional hectares
            totalCost = 20000 + (8000 * (areaInHectares - 1));
        }
    } else {
        // Base rate for other survey types
        let baseRate = 0;

        switch (surveyType) {
            case 'subdivision': baseRate = 1; break;	// per numLots
            case 'consolidation': baseRate = 12; break;
            case 'topographic': baseRate = 5; break;
            case 'verification': baseRate = 8; break;
            case 'engineering': baseRate = 25; break;
        }

        // Adjust rate based on land classification
        switch (landClassification) {
            case 'residential': baseRate *= 1; break;
            case 'commercial': baseRate *= 1.5; break;
            case 'agricultural': baseRate *= 0.8; break;
            case 'industrial': baseRate *= 1.8; break;
        }

        // Adjust rate based on location
        switch (location) {
            case 'urban': baseRate *= 1.2; break;
            case 'suburban': baseRate *= 1; break;
            case 'rural': baseRate *= 0.8; break;
        }

        // Calculate cost based on area for other survey types
        const areaCost = baseRate * areaSize;
        const lotCost = numLots * 10000; // Additional cost per lot
        totalCost = areaCost + lotCost;
    }

    // Display the total estimated cost
    document.getElementById('cost-output').innerHTML = `Estimated Cost: PHP ${totalCost.toFixed(2)}`;
}