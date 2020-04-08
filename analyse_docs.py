from init_service import init_service
from file_tree import FileTree
from pprint import pprint

SERVICE = init_service()
DOCUMENT_ID = "1oYETJ2JJyspM5ssraM0BD9ha4nCxVCgwf7B8bwyh5BI"


def parse_document(elements):
    """
    Parses a document with content heirarchy defined by bullet indentation
    into a tree data structure.
    """

    file_tree = FileTree("Base")

    for index, element in enumerate(elements[1::]):
        # Base level only contains elements that are not indented.
        if "bullet" not in element.get("paragraph"):
            file_tree.children.append(depth_first_traversal(element, elements[1 + index + 1::]))

    return file_tree


def depth_first_traversal(parent_element, elements):
    """
    Depth first traversal helper to generate the parent-child
    relationships by elements on the document.
    """

    file_tree = FileTree(parent_element.get("paragraph").get("elements")[0] \
                                .get("textRun").get("content").strip())

    # Base elements: elements that are not indented.
    if "bullet" not in parent_element.get("paragraph"):
        parent_nesting_level = -1
    elif "nestingLevel" not in parent_element.get("paragraph")["bullet"]:
        parent_nesting_level = 0
    else:
        parent_nesting_level = parent_element.get("paragraph")["bullet"]["nestingLevel"]

    for index, element in enumerate(elements):
        try:
            cur_nesting_level = element.get("paragraph")["bullet"]["nestingLevel"]
        except:
            cur_nesting_level = 0

        # Append direct descendents to the children list of the current node
        # while recursing on the direct descendent. 
        if cur_nesting_level == parent_nesting_level + 1:
            file_tree.children.append(depth_first_traversal(element, elements[index + 1::]))
        # All child elements have been found, exit loop.
        elif cur_nesting_level <= parent_nesting_level:
            break

    return file_tree
        

if __name__ == "__main__":
    doc = SERVICE.documents().get(documentId=DOCUMENT_ID).execute()
    doc_content = doc.get('body').get('content')
    file_tree = parse_document(doc_content)
    print(file_tree.children[0].children[0].children[0].children)