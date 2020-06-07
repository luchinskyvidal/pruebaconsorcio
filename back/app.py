from flask import Flask, jsonify
from flask_cors import CORS
app = Flask(__name__)
CORS(app)
import requests
import dotenv
import re

# API QUE TRAE DATOS DE FARMACIA Y FILTRA SEGUN LA ENTRADA DE DATOS SELECCIONADOS EN EL FRONT
@app.route('/farmacia/<int:idregion>/<int:idcomuna>/<int:idlocal>')
def getFarm(idregion, idcomuna, idlocal):
    url = 'https://farmanet.minsal.cl/maps/index.php/ws/getLocalesRegion'
    payload = {'id_region': idregion}
    l = requests.get(url, params=payload)
    farmfound = [farm for farm in l.json() if farm['local_id'] == str(idlocal) and farm['fk_comuna'] == str(idcomuna) ]
    print(farmfound)
    if (len(farmfound) > 0):
        return str(farmfound).replace("'", '"')
    return jsonify({"message": "farmacia not found"})

# API QUE COMPREBA EL STATUS DE LA APP
@app.route('/status')
def ping():
    return jsonify({"message": "ok!"})

# API QUE TRAE LAS COMUNAS SEGUN UNA REGION
@app.route('/buscar/comuna/<int:idregion>/<int:idcomuna>')
def getFarmxComuna(idregion, idcomuna):
    url = 'https://farmanet.minsal.cl/maps/index.php/ws/getLocalesRegion'
    payload = {'id_region': idregion}
    l = requests.get(url, params=payload)
    print(idregion, idcomuna)
    farmfound = [farm for farm in l.json() if farm['fk_comuna'] == str(idcomuna) ]
   
    if (len(farmfound) > 0):
        return str(farmfound).replace("'", '"')
    return jsonify({"message": "no se encuentran farmacias en la comuna"})
 

if __name__ == '__main__':
    app.run(debug=True, port=4000)