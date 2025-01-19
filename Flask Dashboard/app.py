from flask import Flask, render_template
import pandas as pd
import json

app = Flask(__name__)

# Load datasets
data = pd.read_csv('data/bert_final_results.csv')
sentiment_summary = pd.read_csv('data/sentiment_summary.csv')
model_comparison = pd.read_csv('data/model_comparison.csv')
rf_data = pd.read_csv('data/entity_sentiment_rf.csv')
bert_data = pd.read_csv('data/bert_entity_sentiment_results.csv')


@app.route('/')
def index():
    return render_template('index.html')

@app.route('/sentiment')
def sentiment():
    # Prepare sentiment data for the pie chart
    sentiment_data = sentiment_summary.set_index('Sentiment')['Count'].to_dict()
    return render_template('sentiment.html', sentiment_data=json.dumps(sentiment_data))

@app.route('/entity')
def entity():
    rf_data = pd.read_csv('data/entity_sentiment_rf.csv')
    bert_data = pd.read_csv('data/bert_entity_sentiment_results.csv')

    rf_heatmap_data = rf_data.groupby(['Entity', 'Sentiment'])['Count'].sum().unstack(fill_value=0).to_dict(orient='index')
    bert_heatmap_data = bert_data.groupby(['Entity', 'Sentiment'])['Count'].sum().unstack(fill_value=0).to_dict(orient='index')

    return render_template(
        'entity.html',
        rf_heatmap_data=json.dumps(rf_heatmap_data),
        bert_heatmap_data=json.dumps(bert_heatmap_data),
    )

@app.route('/comparison')
def comparison():
    metrics_data = [
        {"Metric": "Accuracy", "Random Forest": 0.7675, "BERT": 0.4078},
        {"Metric": "Precision", "Random Forest": 0.7610, "BERT": 0.5885},
        {"Metric": "Recall", "Random Forest": 0.7675, "BERT": 0.4078},
        {"Metric": "F1-Score", "Random Forest": 0.7624, "BERT": 0.3972},
    ]
    confusion_matrix_data = {
        "RandomForest": [[18953, 1286, 807],
        [2809, 6183, 1824],
        [1308, 1859, 7539]],
        "BERT": [[20325, 80764, 4313],
        [5316, 37566, 11140],
        [2556, 21937, 28921]]
    }
    return render_template(
        'comparison.html',
        metrics_data=json.dumps(metrics_data),
        confusion_matrix_data=json.dumps(confusion_matrix_data),
    )

if __name__ == '__main__':
    app.run(debug=True)
