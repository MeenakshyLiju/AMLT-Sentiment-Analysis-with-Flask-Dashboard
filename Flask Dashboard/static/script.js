// Display Sentiment Analysis Data
async function fetchSentimentData() {
    try {
        const response = await fetch('/sentiment');
        const data = await response.json();
        const sentimentChart = document.getElementById('sentiment-chart');
        
        if (sentimentChart) {
            let labels = [];
            let positive = [];
            let neutral = [];
            let negative = [];
            
            data.forEach(item => {
                labels.push(item.Entity);
                positive.push(item.Positive || 0);
                neutral.push(item.Neutral || 0);
                negative.push(item.Negative || 0);
            });
            
            new Chart(sentimentChart, {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [
                        { label: 'Positive', data: positive, backgroundColor: '#4CAF50' },
                        { label: 'Neutral', data: neutral, backgroundColor: '#FFC107' },
                        { label: 'Negative', data: negative, backgroundColor: '#F44336' }
                    ]
                },
                options: { responsive: true }
            });
        }
    } catch (error) {
        console.error('Error fetching sentiment data:', error);
    }
}

// Display Entity Data
async function fetchEntityData() {
    try {
        const response = await fetch('/entity');
        const data = await response.json();
        const entityChart = document.getElementById('entity-chart');
        
        if (entityChart) {
            let labels = data.map(item => item.Entity);
            let frequencies = data.map(item => item.Count);
            
            new Chart(entityChart, {
                type: 'pie',
                data: {
                    labels: labels,
                    datasets: [
                        { data: frequencies, backgroundColor: ['#4CAF50', '#FFC107', '#F44336', '#03A9F4', '#E91E63'] }
                    ]
                },
                options: { responsive: true }
            });
        }
    } catch (error) {
        console.error('Error fetching entity data:', error);
    }
}

// Display Model Comparison Data
async function fetchComparisonData() {
    try {
        const response = await fetch('/comparison');
        const data = await response.json();
        const comparisonChart = document.getElementById('sentiment-comparison-chart');
        
        if (comparisonChart) {
            let labels = data.map(item => item.Metric);
            let randomForest = data.map(item => item['Random Forest']);
            let bert = data.map(item => item.BERT);
            
            new Chart(comparisonChart, {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [
                        { label: 'Random Forest', data: randomForest, backgroundColor: '#03A9F4' },
                        { label: 'BERT', data: bert, backgroundColor: '#E91E63' }
                    ]
                },
                options: { responsive: true }
            });
        }
    } catch (error) {
        console.error('Error fetching comparison data:', error);
    }
}

// Initialize Charts on Page Load
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('sentiment-chart')) fetchSentimentData();
    if (document.getElementById('entity-chart')) fetchEntityData();
    if (document.getElementById('sentiment-comparison-chart')) fetchComparisonData();
});
