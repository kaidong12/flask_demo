import json

data = """{"sites": [
    {"id": 1, "name": "Google"},
    {"id": 2, "name": "Runoob"},
    {"id": 3, "name": "Taobao"}
]}"""
print(json.loads(data))