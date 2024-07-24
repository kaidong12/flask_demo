import json
import os
from werkzeug.utils import secure_filename

from flask import Flask, request, jsonify
from flask_cors import CORS
from flask.views import MethodView

from extension import db
from models import Book

from robot.api.parsing import get_model, ModelVisitor

app = Flask(__name__)
CORS().init_app(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///books.sqlite'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db.init_app(app)


@app.cli.command()
def create():
    db.drop_all()
    db.create_all()
    Book.init_db()

# @app.route('/')
# def hello_world():  # put application's code here
#     return 'Welcome Books!'

@app.route('/string', methods=['GET'])
def get_data1():
    return json.dumps('hello world from backend!')

@app.route('/json1', methods=['GET'])
def get_data2():
    data = """{"sites": [
    {"id": 1, "name": "Google"},
    {"id": 2, "name": "Runoob"},
    {"id": 3, "name": "Taobao"}
]}"""
    return {
            'status': 'success',
            'message': '数据查询成功',
            'results': json.loads(data)
        }

UPLOAD_FOLDER = 'uploads/'  
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER  

@app.route('/upload', methods=['POST'])
def upload_file(): 
    print(request)
    print("-----------------------")
    print(request.files)

    if 'file' in request.files: 
        message = []
        file = request.files.getlist('file')[0]
        print()
        print("====================== file=> " + file.filename)
        if file.filename == '':
                return jsonify({'error': 'No selected file'}), 400
        if file:
            filename = secure_filename(file.filename)  # 使用secure_filename确保文件名安全，但需要先导入该函数
            file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename)) 
            message.append(f'File {filename} uploaded successfully')
        return jsonify({'message': '\n'.join(message)}), 200
    elif 'files' in request.files: 
        # file = request.files['files'] 
        # print("-----------------------")
        # print(file)
        message = []
        for file in request.files.getlist('files'):  
            # print("-----------------------")
            # print(f)
            # print("-----------------------")
            # print(f.filename)
            # print("-----------------------")
            # print(f.content_type)
            # print("-----------------------")
            print("====================== files=> "  + file.filename)
            if file.filename == '':
                return jsonify({'error': 'No selected file'}), 400
            if file:
                filename = secure_filename(file.filename)  # 使用secure_filename确保文件名安全，但需要先导入该函数
                file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename)) 
                message.append(f'File {filename} uploaded successfully')
        return jsonify({'message': '\n'.join(message)}), 200
    else:
        return jsonify({'error': 'No files part in the request'}), 400 

class TestNamePrinter(ModelVisitor):
    def __init__(self):
        self.label = ''
        self.children = []

    def visit_File(self, node):
        # print(node)
        # print(f"File '{node.source}' '{node.source.name}' '{node.source.stem}' has the following tests:")
        # Call `generic_visit` to visit also child nodes.

        self.label = node.source.stem
        self.generic_visit(node)

    def visit_TestCaseName(self, node):
        # print(f"- {node.name} (on line {node.lineno})")
        self.children.append({"label": node.name})

    def get_test_names(self):
        test_cases = {}
        test_cases["label"] = self.label
        test_cases["children"] = self.children
        return test_cases

@app.route('/getalltests_1', methods=['POST']) 
def get_all_test_1():  
    model = get_model(os.path.join(app.config['UPLOAD_FOLDER'], "Acceptance.robot"))
    printer = TestNamePrinter()
    printer.visit(model)

    test_dict = printer.get_test_names()
    for k, v in test_dict.items():
        print(f"{k}: {v}")
    print()

    test_list = []
    test_list.append(test_dict)
    print(test_list)
    return jsonify({
        'status': 'success',
        'message': 'get all tests success',
        'results': test_list
    })

@app.route('/getallsuites', methods=['POST']) 
def get_all_suite():  
    path = app.config['UPLOAD_FOLDER']
    test_list = []

    files = os.listdir(path)
    for name in files:
        print(name)
        full_path = os.path.join(path, name)
        if os.path.isfile(full_path) and name.endswith(".robot"):
            print(full_path)

            test_dict = {"label": name}

            test_list.append(test_dict)

    print(test_list)
    return jsonify({
        'status': 'success',
        'message': 'get all suite success',
        'results': test_list
    })


@app.route('/getalltests', methods=['POST']) 
def get_all_test(): 
    path = app.config['UPLOAD_FOLDER']
    test_list = []

    files = os.listdir(path)
    for name in files:
        print(name)
        full_path = os.path.join(path, name)
        if os.path.isfile(full_path) and name.endswith(".robot"):
            print(full_path)

            # model = get_model('../testdata/Acceptance.robot')
            # model = get_model(os.path.join("../testdata/", "Acceptance.robot"))
            model = get_model(full_path)

            printer = TestNamePrinter()
            printer.visit(model)

            test_dict = printer.get_test_names()
            for k, v in test_dict.items():
                print(f"{k}: {v}")
            print()

            test_list.append(test_dict)

    # model = get_model(os.path.join(app.config['UPLOAD_FOLDER'], "Acceptance.robot"))
    # printer = TestNamePrinter()
    # printer.visit(model)

    # test_dict = printer.get_test_names()
    # for k, v in test_dict.items():
    #     print(f"{k}: {v}")
    # print()

    # test_list = []
    # test_list.append(test_dict)
    print(test_list)
    return jsonify({
        'status': 'success',
        'message': 'get all tests success',
        'results': test_list
    })

@app.route('/runrobot', methods=['POST']) 
def run_robot():  
    print("in run_robot")
    print(request)
    f = request.form["robotsuites"]

    print(f)
    return jsonify({
        'status': 'success',
        'message': 'run robot success',
        'results': []
    })

# @app.route("/uploadfile", methods=["POST"])
# def upload_file():
#     print("-----------------------")
#     if request.method == 'POST':
#         shop_id = request.args.get('shop_id', '')
#         BASE_DIR = os.path.dirname(os.path.realpath(sys.argv[0]))
#         if shop_id != "":
#             shop_path = 'utils/cert/' + str(shop_id)
#
#             dstpath = os.path.join(BASE_DIR, shop_path)
#             if not os.path.exists(dstpath):
#                 os.makedirs(dstpath)
#                 print(f"文件夹 {dstpath} 创建成功！")
#             else:
#                 print(f"文件夹 {dstpath} 已经存在。")
#         ts = request.files.getlist("file")
#         obj = ShopInfo.query.filter(ShopInfo.id == int(shop_id)).first()
#
#         if len(ts) > 0:
#             for item in ts:
#                 secure_filename(item.filename)
#                 file = item.filename.split('/')[1]
#                 item.save(dstpath + '/' + file)
#                 if 'key' in file:
#                     obj.user_account = dstpath + '/' + file
#                     db.session.commit()
#
#         return jsonify({
#             "code": "200",
#             "data": "",
#             "msg": "文件上传成功"
#         })

class BookApi(MethodView):
    def get(self, book_id):
        if not book_id:
            books: [Book] = Book.query.all()
            results = [
                {
                    'id': book.id,
                    'book_name': book.book_name,
                    'book_type': book.book_type,
                    'book_prize': book.book_prize,
                    'book_number': book.book_number,
                    'book_publisher': book.book_publisher,
                    'author': book.author,
                } for book in books
            ]
            return {
                'status': 'success',
                'message': '数据查询成功',
                'results': results
            }
        book: Book = Book.query.get(book_id)
        return {
            'status': 'success',
            'message': '数据查询成功',
            'result': {
                'id': book.id,
                'book_name': book.book_name,
                'book_type': book.book_type,
                'book_prize': book.book_prize,
                'book_number': book.book_number,
                'book_publisher': book.book_publisher,
                'author': book.author,
            }
        }

    def post(self):
        form = request.json
        book = Book()
        book.book_number = form.get('book_number')
        book.book_name = form.get('book_name')
        book.book_type = form.get('book_type')
        book.book_prize = form.get('book_prize')
        book.author = form.get('author')
        book.book_publisher = form.get('book_publisher')
        db.session.add(book)
        db.session.commit()
        # id, book_number, book_name, book_type, book_prize, author, book_publisher

        return {
            'status': 'success',
            'message': '数据添加成功'
        }

    def delete(self, book_id):
        book = Book.query.get(book_id)
        db.session.delete(book)
        db.session.commit()
        return {
            'status': 'success',
            'message': '数据删除成功'
        }

    def put(self, book_id):
        book: Book = Book.query.get(book_id)
        book.book_type = request.json.get('book_type')
        book.book_name = request.json.get('book_name')
        book.book_prize = request.json.get('book_prize')
        book.book_number = request.json.get('book_number')
        book.book_publisher = request.json.get('book_type')
        book.author = request.json.get('book_type')
        db.session.commit()
        return {
            'status': 'success',
            'message': '数据修改成功'
        }


book_api = BookApi.as_view('book_api')
app.add_url_rule('/books', view_func=book_api, methods=['GET', ], defaults={'book_id': None})
app.add_url_rule('/books', view_func=book_api, methods=['POST', ])
app.add_url_rule('/books/<int:book_id>', view_func=book_api, methods=['GET', 'PUT', 'DELETE'])


if __name__ == "__main__":
    app.run('127.0.0.1', port = 5000)