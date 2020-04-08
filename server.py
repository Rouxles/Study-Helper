from flask import Flask, jsonify
from init_service import init_service
from analyse_docs import parse_document

SERVER = Flask(__name__)
SERVICE = init_service()
DOCUMENT_ID = "1oYETJ2JJyspM5ssraM0BD9ha4nCxVCgwf7B8bwyh5BI"


@SERVER.route("/get_cards", methods=["GET"])
def get_cards():
    doc = SERVICE.documents().get(documentId=DOCUMENT_ID).execute()
    doc_content = doc.get('body').get('content')
    file_tree = parse_document(doc_content)
    return file_tree.jsonify()


if __name__ == "__main__":
    SERVER.run(host='0.0.0.0', port=8000)