from flask import Flask, jsonify
from flask_cors import CORS
from init_service import init_service
from analyse_docs import parse_document

SERVER = Flask(__name__)
CORS(SERVER)
SERVICE = init_service()
DOCUMENT_ID = "1oYETJ2JJyspM5ssraM0BD9ha4nCxVCgwf7B8bwyh5BI"


@SERVER.route("/get_cards", methods=["GET"])
def get_cards():
    doc = SERVICE.documents().get(documentId=DOCUMENT_ID).execute()
    doc_content = doc.get('body').get('content')
    file_tree = parse_document(doc_content)
    return file_tree.jsonify()


@SERVER.route("/get_structured_cards", methods=["GET"])
def get_leaf_cards():
    doc = SERVICE.documents().get(documentId=DOCUMENT_ID).execute()
    doc_content = doc.get('body').get('content')
    file_tree = parse_document(doc_content)
    return jsonify({
        "data": file_tree.structured_jsonify()
    })


if __name__ == "__main__":
    SERVER.run(host='0.0.0.0', port=8000)