class FileTree:
    def __init__(self, text: str=None):
        self.text = text
        self.children = []

    def append(self, text: str=None):
        self.children.append(FileTree(text))

    def jsonify(self):
        ret = {self.text: []}

        for child in self.children:
            ret[self.text].append(child.jsonify())
        
        return ret

    def __repr__(self):
        return self.text