class FileTree:
    def __init__(self, text: str=None):
        self.text = text
        self.children = []

    def append(self, text: str=None):
        self.children.append(FileTree(text))

    def jsonify(self):
        """
        This creates a full JSON representation of the file tree
        with no assumptions made on the data.
        """

        ret = {self.text: []}

        for child in self.children:
            ret[self.text].append(child.jsonify())
        
        return ret

    def structured_jsonify(self):
        """
        This creates a more structured JSON representation with the assumed structure:
            - Major Topic
                - Sub Topic
                    - Question
                        - Answer
        """

        ret = []
        for major_topic in self.children:
            sub_topic_dicts = []
            major_topic_dict = {
                "major_topic": major_topic.text,
                "sub_topics": sub_topic_dicts
            }
            for sub_topic in major_topic.children:
                question_dicts = []
                sub_topic_dict = {
                    "sub_topic": sub_topic.text,
                    "questions": question_dicts
                }
                sub_topic_dicts.append(sub_topic_dict)
                for question in sub_topic.children:
                    question_dict = {
                        "question": question.text,
                        "answer": question.children[0].text
                    }
                    question_dicts.append(question_dict)
            ret.append(major_topic_dict)

        return ret

    def __repr__(self):
        return self.text