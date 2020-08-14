from flask import Blueprint, jsonify, render_template
from flask.views import MethodView

from portfolio import engine
from .models import Project

bp = Blueprint('project', __name__, url_prefix='/',
               template_folder='templates',
               static_folder='static',
               static_url_path=f'{engine.app.static_url_path}/project')


@bp.route('/')
def main_page():
    return render_template('main_page.html')


class PostView(MethodView):

    def get(self):
        query = engine.session.query(Project).all()
        return jsonify({
            'data': [row.to_dict() for row in query]
        })


bp.add_url_rule('/projects', view_func=PostView.as_view('postview'))
