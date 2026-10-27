from flask import Flask, render_template, request, jsonify
app = Flask(__name__)

def calcular_porta(porta, a, b):
    if porta == "AND":
        return a and b
    elif porta == "OR":
        return a or b
    elif porta == "NOT":
        return not a
    elif porta == "NAND":
        return not(a and b)
    elif porta == "NOR":
        return not(a or b)
    elif porta == "XOR":
        return a != b
    elif porta == "XNOR":
        return a == b
    
@app.route('/')
def index():
    return render_template('index.html')

@app.route("/calcular", methods=["POST"])
def calcular():
    dados = request.get_json()
    
    porta = dados.get("porta")
    a = dados.get("a")
    b = dados.get("b")
    
    if porta not in ["AND", "OR", "NOT", "NAND", "NOR", "XOR", "XNOR"]:
        return jsonify({"erro": "Porta lógica inválida"}), 400
    
    if a not in [0, 1] or (porta != "NOT" and b not in [0, 1]):
        return jsonify({"erro": "Entradas inválidas. Use 0 ou 1."}), 400
    
    resultado = int(calcular_porta(porta, a, b))        
    return jsonify({
        "porta": porta,
        "a": a, 
        "b": b if porta != "NOT" else None,
        "resultado": resultado,
        "lampada": "acesa" if resultado == 1 else "apagada"
    })
    
if __name__ == "__main__":
    app.run(debug=True)