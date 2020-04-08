class FileTree:
    def __init__(self, text: str=None):
        self.text = text
        self.children = []

    def append(self, text: str=None):
        self.children.append(FileTree(text))

    def __repr__(self):
        return self.text if self.text else "None"