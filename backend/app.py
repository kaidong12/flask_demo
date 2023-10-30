import json

from flask import Flask, request, render_template, jsonify
from flask_cors import CORS
from flask.views import MethodView

from extension import db
from models import Book

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
    return json.dumps('hello world!')

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

@app.route("/uploadfile", methods=["POST"])
def upload_file():
    print("-----------------------")
    if request.method == 'POST':
        shop_id = request.args.get('shop_id', '')
        BASE_DIR = os.path.dirname(os.path.realpath(sys.argv[0]))
        if shop_id != "":
            shop_path = 'utils/cert/' + str(shop_id)

            dstpath = os.path.join(BASE_DIR, shop_path)
            if not os.path.exists(dstpath):
                os.makedirs(dstpath)
                print(f"文件夹 {dstpath} 创建成功！")
            else:
                print(f"文件夹 {dstpath} 已经存在。")
        ts = request.files.getlist("file")
        obj = ShopInfo.query.filter(ShopInfo.id == int(shop_id)).first()

        if len(ts) > 0:
            for item in ts:
                secure_filename(item.filename)
                file = item.filename.split('/')[1]
                item.save(dstpath + '/' + file)
                if 'key' in file:
                    obj.user_account = dstpath + '/' + file
                    db.session.commit()

        return jsonify({
            "code": "200",
            "data": "",
            "msg": "文件上传成功"
        })

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