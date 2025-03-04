from flask import Flask, render_template, request, jsonify
from flask_sqlalchemy import SQLAlchemy 
import os

app = Flask(__name__)

# Configure database
basedir = os.path.abspath(os.path.dirname(__file__))
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'water_data.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# Database models
class WaterQualityReading(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    location = db.Column(db.String(100), nullable=False)
    parameter = db.Column(db.String(50), nullable=False)
    value = db.Column(db.Float, nullable=False)
    timestamp = db.Column(db.DateTime, nullable=False)

    def __repr__(self):
        return f'<WaterQualityReading {self.location} - {self.parameter}: {self.value}>'

class PollutionSource(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    source = db.Column(db.String(100), nullable=False)
    location = db.Column(db.String(100), nullable=False)
    type = db.Column(db.String(50), nullable=False)
    status = db.Column(db.String(50))

    def __repr__(self):
        return f'<PollutionSource {self.source} - {self.location}>'

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/water_data')
def get_water_data():
    readings = WaterQualityReading.query.all()
    return jsonify([{'location': r.location, 'parameter': r.parameter, 'value': r.value, 'timestamp': r.timestamp.strftime('%Y-%m-%d %H:%M:%S')} for r in readings])

@app.route('/api/pollution_sources')
def get_pollution_sources():
    sources = PollutionSource.query.all()
    return jsonify([{'source': s.source, 'location': s.location, 'type': s.type, 'status': s.status} for s in sources])

@app.route('/api/remediation_nearby')
def get_remediation_nearby():
    
    lat = request.args.get('lat')
    lon = request.args.get('lon')
    # Implement logic to find nearby pollution sources based on lat and lon
    # For simplicity, returning all sources here
    sources = PollutionSource.query.all()
    return jsonify([{'source': s.source, 'location': s.location, 'type': s.type, 'status': s.status} for s in sources])

if __name__ == '__main__':
    with app.app_context():
        db.create_all()  # Create database tables
    app.run(debug=True)